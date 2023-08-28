import { animate } from './animate.js';

document.addEventListener('DOMContentLoaded', () => {
	const author = document.querySelector('.js-author');
	const mainHeader = document.querySelector('.main-header');
	const banner = document.querySelector('.main-header > img');

	mainHeader.style.minHeight = `${mainHeader.clientHeight}px`;

	const updateStickyAuthorIfNeeded = function (isSticky) {
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
	};

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				updateStickyAuthorIfNeeded(!entry.isIntersecting);
			});
		},
		{
			threshold: 0,
			rootMargin: '-30px 0px'
		}
	);

	observer.observe(banner);
});
