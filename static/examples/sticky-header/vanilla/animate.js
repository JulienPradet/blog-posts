import Flip from './flip.js';

/**
 * Animate some elements using FLIP animations
 * https://aerotwist.com/blog/flip-your-animations/
 *
 * Something important to keep in mind is that for now it's not
 * able to animate anything that relies on `transform` or `scale`.
 * Instead use the CSS you are used to to position your elements
 * (margin, flex, grid, whatever). `animate` will make sure to
 * transform these in `transform` or `opacity` transitions instead.
 *
 * In practice this makes animations 10x easier because you only need
 * to consider the starting position and the ending position without
 * having to calculate every single transform manually to keep a performant
 * animation.
 *
 * @param {HTMLElement[]|HTMLElement|NodeList<HTMLElement>} elements the element(s) that will be animated
 * @param {() => void} changeCallback the function that moves the elements to their final position
 * @return {Promise<void>} the promise will resolve once the animation has ended
 */
function animate(elements, changeCallback) {
	if (window.matchMedia('(prefers-reduced-motion)').matches) {
		changeCallback();
		return Promise.resolve();
	}

	const elementsArray = Array.isArray(elements)
		? elements
		: elements.length
		? [...elements]
		: [elements];

	const flipList = elementsArray.filter(Boolean).map((element) => new Flip(element));

	return new Promise((resolve, reject) => {
		// Compute initial position of the elements
		flipList.forEach((flip) => flip.first());

		// Move all elements to their final position
		changeCallback();

		// Compute final position of the elements
		flipList.forEach((flip) => flip.last());

		// Set a first requestAnimationFrame in order to make sure
		// that all the flip computation happens in a single frame and
		// that `play` happens in another frame.
		// If that was not the case, then the transition wouldn't happen
		// at all.
		requestAnimationFrame(() => {
			// Move all elements to their first position by faking it with transforms in CSS
			// DO NOT merge this forEach with the forEach of `flip.last`. This could result in performance issues.
			flipList.forEach((flip) => flip.invert());

			// Once all the heavy calculations are done, launch the animation
			requestAnimationFrame(() => {
				try {
					Promise.all(flipList.map((flip) => flip.play()))
						// hide the implementation details of animation by making sure nothing is exposed
						.then(() => resolve())
						.catch((error) => reject(error));
				} catch (error) {
					reject(error);
				}
			});
		});
	});
}

export { animate };
