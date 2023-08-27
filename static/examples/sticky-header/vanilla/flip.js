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
	duration: 200,
	updateTranslate: true,
	updateScale: true,
	updateOpacity: true,
	delay: 0
};

const slowMotionFactor = 1; // Debugging purpose

/**
 * Extracted from https://www.julienpradet.fr/tutoriels/introduction-aux-animations-flips/
 * The goal is to have a helper class that will be used in `animate.js`
 * This class is an internal from `animate.js`: do not use it as a stand alone
 */
class Flip {
	constructor(element) {
		this.element = element;
		this.options = {
			...defaultOptions,
			updateScale: element.dataset.animateScale !== 'false',
			updateTranslate: element.dataset.animateTranslate !== 'false'
		};
		this.animate = this.animate.bind(this);
	}

	first() {
		this._first = getDataFromElement(this.element);
	}

	last() {
		this._last = getDataFromElement(this.element);
	}

	invert() {
		if (!this._first || !this._last) return;
		this._invert = {
			translateX: 0,
			translateY: 0,
			scaleX: 1,
			scaleY: 1,
			opacity: 0
		};

		if (this.options.updateTranslate) {
			this._invert.translateX = this._first.boundingBox.left - this._last.boundingBox.left;
			this._invert.translateY = this._first.boundingBox.top - this._last.boundingBox.top;
		}
		if (this.options.updateScale) {
			this._invert.scaleX = this._first.boundingBox.width / this._last.boundingBox.width;
			this._invert.scaleY = this._first.boundingBox.height / this._last.boundingBox.height;
		}
		if (this.options.updateOpacity) {
			this._invert.opacity = this._last.opacity - this._first.opacity;
		}

		if (
			this._invert.translateX === 0 &&
			this._invert.translateY === 0 &&
			this._invert.scaleX === 1 &&
			this._invert.scaleY === 1 &&
			this._invert.opacity === 0
		) {
			this.resetStyle();
			return;
		}

		this.updateStyle(0);
		this.element.style.zIndex = Math.min(
			parseInt(this._first.zIndex, 10) || 0,
			parseInt(this._last.zIndex, 10) || 0
		);
		this.element.style.transformOrigin = '0 0';
		this.element.style.willChange = 'transform, opacity';
		return Promise.resolve(true);
	}

	play() {
		if (!this._invert) return;

		this._start = window.performance.now() + this.options.delay * slowMotionFactor;

		const promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
		window.requestAnimationFrame(this.animate);

		return promise;
	}

	animate() {
		if (!this._invert) {
			return;
		}
		let time =
			(window.performance.now() - this._start) / (this.options.duration * slowMotionFactor);
		if (time > 1) time = 1;
		if (time < 0) time = 0;

		this.updateStyle(Math.pow(time, 2) / (Math.pow(time, 2) + Math.pow(1 - time, 2)));

		if (time < 1) {
			window.requestAnimationFrame(this.animate);
		} else {
			this.resetStyle();
		}
	}

	updateStyle(time) {
		const transform = {
			translateX: this._invert.translateX * (1 - time),
			translateY: this._invert.translateY * (1 - time),
			scaleX: this._invert.scaleX + (1 - this._invert.scaleX) * time,
			scaleY: this._invert.scaleY + (1 - this._invert.scaleY) * time,
			opacity: this._first.opacity + this._invert.opacity * time
		};
		let transformString = '';
		if (this.options.updateTranslate) {
			transformString += ` translate(${transform.translateX}px, ${transform.translateY}px)`;
		}
		if (this.options.updateScale) {
			transformString += ` scale(${transform.scaleX}, ${transform.scaleY})`;
		}
		this.element.style.transform = transformString;
		this.element.style.opacity = transform.opacity;
	}

	resetStyle() {
		this._invert = null;
		this.element.style.transformOrigin = null;
		this.element.style.transform = null;
		this.element.style.opacity = null;
		this.element.style.willChange = null;
		this.element.style.zIndex = null;
		this.resolve && this.resolve();
	}
}

export default Flip;
