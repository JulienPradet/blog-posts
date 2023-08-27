import { animate } from './animate.js';
import { throttle } from './throttle.js';

const author = document.querySelector('.js-author');
const authorInfo = document.querySelector('.author__info');
const scrollLimit =
	document.querySelector('.main-header').clientHeight -
	(0.6 * author.clientHeight + 0.4 * authorInfo.clientHeight);

const updateStickyAuthorIfNeeded = throttle(function () {
	const isSticky = window.scrollY > scrollLimit;

	if (
		(author.classList.contains('author--sticky') && isSticky) ||
		(!author.classList.contains('author--sticky') && !isSticky)
	) {
		return;
	}

	const elementsToAnimate = author.querySelectorAll('.js-animate');
	animate(elementsToAnimate, () => {
		author.classList.toggle('author--sticky', isSticky);
	});
}, 50);

updateStickyAuthorIfNeeded();
document.addEventListener('scroll', updateStickyAuthorIfNeeded, { passive: true });
