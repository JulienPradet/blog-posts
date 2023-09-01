import { animate } from './animate.js';

document.addEventListener('DOMContentLoaded', () => {
	const author = document.querySelector('.js-author');
	const mainHeader = document.querySelector('.main-header');
	const banner = document.querySelector('.main-header > img');

	let isAnimating = false;

	const updateStickyAuthorIfNeeded = function (isSticky) {
		if (
			(author.classList.contains('author--sticky') && isSticky) ||
			(!author.classList.contains('author--sticky') && !isSticky)
		) {
			return;
		}

		const elementsToAnimate = author.querySelectorAll('.js-animate');

		isAnimating = true;
		animate(elementsToAnimate, () => {
			author.classList.toggle('author--sticky', isSticky);
		}).then(() => {
			isAnimating = false;
			updateMinHeightIfNeeded();
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
			// The reason we choose 32 here is because :
			// - the avatar in its non sticky version is 8rem (= 128px) height
			// - only half of it overlaps on the cover image (64px)
			// - and we don't want the sticky to be displayed too early to avoid so we only take half of it
			// In practice it means that the animation triggers once 1/4 of the height of the avatar has
			// been hidden
			rootMargin: '-32px 0px'
		}
	);

	observer.observe(banner);

	// If you only care about the animation you can ignore the following part.
	// However, a final thing we will need to take care of is the resize of a device
	// For instance when a mobile device goes from portrait mode to landscape mode,
	// the minHeight will likely chance since the title "Enchanté, Julien Pradet"
	// will go from 2 lines to 1 line.
	// However we don't want to be too eager, there are a bunch of reason a resize
	// can happen be we don't want to recompute the minHeight:
	// - if the author just passed in sticky mode, it'll trigger a resize even though the minHeight shouldn't change
	// - if an animation was just triggered, it's too early to compute the minHeight. we'll have to wait for the animation to finish - this is why we've added a then to the `animate` above
	// - the view port only changed in height, not in width
	let previousBannerHeight = 0;
	let previousAuthorHeight = 0;
	function updateMinHeightIfNeeded() {
		const isSticky = author.classList.contains('author--sticky');
		if (isSticky) {
			// Not useful to recalculate minHeight because the author
			// is displayed in a minimized style
			return;
		}

		// There is no need to update the total minHeight if neither the author nor the cover image
		// changed its height.
		let shouldUpdateMainHeaderMinHeight = false;
		if (author.getBoundingClientRect().height !== previousAuthorHeight) {
			shouldUpdateMainHeaderMinHeight = true;
		} else if (banner.getBoundingClientRect().height !== previousBannerHeight) {
			shouldUpdateMainHeaderMinHeight = true;
		}

		if (!shouldUpdateMainHeaderMinHeight) {
			return;
		}

		previousAuthorHeight = author.getBoundingClientRect().height;
		previousBannerHeight = banner.getBoundingClientRect().height;
		mainHeader.style.minHeight = null;
		mainHeader.style.minHeight = `${mainHeader.clientHeight}px`;
	}

	const resizeObserver = new ResizeObserver(async () => {
		if (isAnimating) {
			return;
		}

		updateMinHeightIfNeeded();
	});

	resizeObserver.observe(document.body);
});
