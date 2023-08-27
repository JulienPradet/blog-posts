import { debounce } from './debounce.js';

function throttle(fn, timeout) {
	var timeoutRef;

	const debounced = debounce(fn, timeout);

	return function () {
		if (!timeoutRef) {
			fn.apply(this, arguments);
			timeoutRef = setTimeout(function () {
				timeoutRef = null;
			}, timeout);
		}
		debounced.apply(this, arguments);
	};
}

export { throttle };
