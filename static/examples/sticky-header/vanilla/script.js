import { animate } from './animate.js';

document.addEventListener('DOMContentLoaded', () => {
	const cover = document.querySelector('.js-cover');
	const author = document.querySelector('.js-author');
	const avatar = document.querySelector('.js-avatar');
	const mainHeader = document.querySelector('.js-header');

	switchToSpriteAvatar(avatar);

	// This is where the magic happens, see triggerStickyOnScroll for details
	const { isAnimating } = triggerStickyOnScroll(author, cover, function onAnimationEnd() {
		updateMinHeightIfNeeded();
	});

	// If you only care about the animation you can ignore the following part.
	const { updateMinHeightIfNeeded } = updateMinHeightOnResize(
		author,
		cover,
		mainHeader,
		function shouldConsiderResize() {
			return !isAnimating();
		}
	);
});

/**
 * The goal is to trigger an animation when the user has scrolled
 * just enough. We prefer this over a Scroll Driven Animation
 * @param {HTMLElement} author
 * @param {HTMLElement} cover
 * @param {() => void} onAnimationEnd triggered as soon as the animation finished transitioning
 * @returns
 */
function triggerStickyOnScroll(author, cover, onAnimationEnd) {
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
			author.classList.add('author--animating');
		}).then(() => {
			author.classList.remove('author--animating');
			isAnimating = false;
			onAnimationEnd();
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

	observer.observe(cover);

	return { isAnimating: () => isAnimating };
}

/**
 * Replace the avatar image with the sprite image.
 * The goal is to download a lightweight image on first paint and replace into the sprite image
 * afterward, when we know it'll be useful
 * @param {HTMLImageElement} avatar
 */
function switchToSpriteAvatar(avatar) {
	const sprite = document.createElement('img');
	sprite.src = avatar.dataset.spriteSrc;
	sprite.addEventListener('load', () => {
		console.log('load');
		avatar.src = sprite.src;
	});
}

/**
 * However, a final thing we will need to take care of is the resize of a device
 * For instance when a mobile device goes from portrait mode to landscape mode,
 * the minHeight will likely chance since the title "Enchanté, Julien Pradet"
 * will go from 2 lines to 1 line.
 * However we don't want to be too eager, there are a bunch of reason a resize
 * can happen be we don't want to recompute the minHeight:
 * - if the author just passed in sticky mode, it'll trigger a resize even though the minHeight shouldn't change
 * - if an animation was just triggered, it's too early to compute the minHeight. we'll have to wait for the animation to finish - this is why we've added a then to the `animate` above
 * - the view port only changed in height, not in width
 * @param {HTMLElement} author
 * @param {HTMLElement} cover
 * @param {HTMLElement} mainHeader
 * @param {() => boolean} shouldConsiderResize returns false if it's not the right time to update the header height
 * @returns {{updateMinHeightIfNeeded: () => void}} updateMinHeightIfNeeded allows to update the header height without being too eager to avoid unnecessary Layout steps
 */
function updateMinHeightOnResize(author, cover, mainHeader, shouldConsiderResize) {
	let previousCoverHeight = 0;
	let previousAuthorHeight = 0;
	function updateMinHeightIfNeeded() {
		// @todo ideally this should be refactored away to be able to make sure
		// responsibilities aren't mixed. But hey that's just a demo so it'll do :D
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
		} else if (cover.getBoundingClientRect().height !== previousCoverHeight) {
			shouldUpdateMainHeaderMinHeight = true;
		}

		if (!shouldUpdateMainHeaderMinHeight) {
			return;
		}

		previousAuthorHeight = author.getBoundingClientRect().height;
		previousCoverHeight = cover.getBoundingClientRect().height;
		// Set it to null before defining the new height because otherwise
		// the header will only ever be able to grow and won't shrink back to
		// smaller sizes
		mainHeader.style.minHeight = null;
		mainHeader.style.minHeight = `${mainHeader.clientHeight}px`;
	}

	const resizeObserver = new ResizeObserver(async () => {
		if (!shouldConsiderResize()) {
			return;
		}

		updateMinHeightIfNeeded();
	});

	resizeObserver.observe(mainHeader);

	return {
		updateMinHeightIfNeeded
	};
}
