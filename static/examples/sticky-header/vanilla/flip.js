/**
 * Retrieves the data needed during the first/last phase to compute the animation
 * @param {HTMLElement} element
 * @returns {{boundingBox: {left: number, top: number, width: number, height: number}, opacity: number, zIndex: string}}
 */
const getDataFromElement = (element) => {
	const style = window.getComputedStyle(element);
	return {
		boundingBox: element.getBoundingClientRect(),
		opacity: parseFloat(style.opacity),
		zIndex: style.zIndex
	};
};

const defaultOptions = {
	duration: 400,
	updateTranslate: true,
	updateScale: true,
	updateOpacity: true,
	delay: 0
};

const slowMotionFactor = 1; // Debugging purpose

/**
 * Extracted and updated from https://www.julienpradet.fr/tutoriels/introduction-aux-animations-flips/
 * The goal is to have a helper class that will be used in `animate.js`
 * This class is an internal from `animate.js`: do not use it as a stand alone
 */
class Flip {
	constructor(element) {
		this.element = element;

		// For now only data-animate-scale & data-animate-translate are configurable.
		// This is because I didn't have a use case where I needed to
		this.options = {
			...defaultOptions,
			duration: defaultOptions.duration * slowMotionFactor,
			updateScale: element.dataset.animateScale !== 'false',
			updateTranslate: element.dataset.animateTranslate !== 'false'
		};
	}

	first() {
		this._first = getDataFromElement(this.element);
	}

	last() {
		// Before computing the last position, we need to make sure
		// to remove any ongoing transition or animation
		// This allows to make sure that if one toggles an animation
		// quickly, the transition still seems seamless
		this.element.style.transition = null;
		this.element.style.transformOrigin = null;
		this.element.style.transform = null;
		this.element.style.opacity = null;
		this.element.style.zIndex = null;
		this._last = getDataFromElement(this.element);
	}

	invert() {
		// If there was no first or no last, this means that for
		if (!this._first || !this._last) {
			throw new Error(
				'You forgot to either call flip.first or flip.last before calling flip.invert.'
			);
		}

		this._invert = {
			translateX: 0,
			translateY: 0,
			scaleX: 1,
			scaleY: 1
		};

		if (this.options.updateTranslate) {
			this._invert.translateX = this._first.boundingBox.left - this._last.boundingBox.left;
			this._invert.translateY = this._first.boundingBox.top - this._last.boundingBox.top;
		}
		if (this.options.updateScale) {
			this._invert.scaleX = this._first.boundingBox.width / this._last.boundingBox.width;
			this._invert.scaleY = this._first.boundingBox.height / this._last.boundingBox.height;
		}

		if (
			this._invert.translateX === 0 &&
			this._invert.translateY === 0 &&
			this._invert.scaleX === 1 &&
			this._invert.scaleY === 1 &&
			this._first.opacity === this._last.opacity
		) {
			// There is absolutely nothing to animate.
			this._invert = null;
			return;
		}

		// If there is an animation, then we should update its style attribute
		// to position the element as if it did not move yet (= _first position,
		// even though the rest of the CSS is already at _last).
		let transformString = '';
		if (this.options.updateTranslate) {
			transformString += ` translate3d(${this._invert.translateX}px, ${this._invert.translateY}px, 0)`;
		}
		if (this.options.updateScale) {
			transformString += ` scale(${this._invert.scaleX}, ${this._invert.scaleY})`;
		}
		this.element.style.transform = transformString;
		if (this.options.updateOpacity) {
			this.element.style.opacity = this._first.opacity;
		}

		// I'm not quite sure about this part yet.
		// Is it more relevant to put the element in front or behind during the animation?
		// I guess it depends on the scenario and should be configurable.
		this.element.style.zIndex = Math.min(
			parseInt(this._first.zIndex, 10) || 0,
			parseInt(this._last.zIndex, 10) || 0
		);
		// The transformOrigin is important because this is what makes transform & scale work
		this.element.style.transformOrigin = '0 0';
	}

	play() {
		if (!this._invert) return;

		return new Promise((resolve, reject) => {
			try {
				const handleTransitionEnd = () => {
					this.element.removeEventListener('transitionend', handleTransitionEnd);

					// Remove any other style that was added for the animation's sake
					this.element.style.transition = null;
					this.element.style.transformOrigin = null;
					this.element.style.willChange = null;
					this.element.style.zIndex = null;
					this._invert = null;
					this._first = null;
					this._last = null;

					resolve();
				};

				this.element.addEventListener('transitionend', handleTransitionEnd);
				this.element.style.transition = `transform ${this.options.duration}ms ease-in-out, opacity ${this.options.duration}ms ease-in-out`;
				// Trigger animation by removing transforms => element will starting transitioning
				// to its final position
				this.element.style.transform = null;
				this.element.style.opacity = null;
			} catch (e) {
				reject(e);
			}
		});
	}
}

export default Flip;
