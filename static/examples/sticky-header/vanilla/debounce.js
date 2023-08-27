function debounce(fn, timeout) {
	var timeoutRef;

	return function () {
		var that = this;
		var args = arguments;

		if (timeoutRef) {
			clearTimeout(timeoutRef);
		}

		timeoutRef = setTimeout(function () {
			fn.apply(that, args);
			timeoutRef = null;
		}, timeout);
	};
}

export { debounce };
