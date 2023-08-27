import Flip from './flip.js';

/**
 * Animate some elements using FLIP animations
 * https://aerotwist.com/blog/flip-your-animations/
 * See animate.stories.js for an usage example
 *
 * @param {HTMLElement[]|HTMLElement} elements the element(s) that will be animated
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

	// Compute initial position of the elements
	flipList.forEach((flip) => flip.first());

	// Move all elements to their final position
	changeCallback();

	// Compute final position of the elements
	flipList.forEach((flip) => flip.last());

	// Move all elements to their first position by faking it with transforms in CSS
	// DO NOT merge this forEach with the forEach of `flip.last`. This could result in performance issues.
	flipList.forEach((flip) => flip.invert());

	// Once all the heavy calculations are done, launch the animation
	return Promise.all(flipList.map((flip) => flip.play())).then(() => {
		// hide implementation details of flip in the returned response by returning nothgin
	});
}

export { animate };
