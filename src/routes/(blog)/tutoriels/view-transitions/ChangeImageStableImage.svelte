<script lang="ts">
	import { tick } from 'svelte';

	let isZoomed = false;
	let imageSrc = `/images/posts/view-transitions/the-strokes-cover-small.jpg?${Date.now()}`;

	async function loadImage(src: string) {
		return new Promise((resolve, reject) => {
			const img = document.createElement('img');
			img.addEventListener('load', () => {
				resolve(src);
			});
			img.addEventListener('error', (error) => {
				reject(error);
			});

			img.src = src;
			if (img.complete) {
				resolve(src);
			}
		});
	}

	function toggleZoom() {
		isZoomed = !isZoomed;

		const newImageSrc = isZoomed
			? `/images/posts/view-transitions/the-strokes-cover.jpg?${Date.now()}`
			: `/images/posts/view-transitions/the-strokes-cover-small.jpg?${Date.now()}`;

		loadImage(newImageSrc).then(async () => {
			imageSrc = newImageSrc;
		});
	}

	async function toggleZoomTransition() {
		if ('startViewTransition' in document) {
			document.startViewTransition(async () => {
				toggleZoom();
				await tick();
			});
		} else {
			toggleZoom();
		}
	}
</script>

<section class={isZoomed ? 'zoom' : ''}>
	<button on:click={toggleZoomTransition}>Toggle zoom</button>
	<div>
		{#if isZoomed}
			<img
				src={imageSrc}
				alt="Album de The Strokes : First Impressions of Earth"
				width="500"
				height="500"
			/>
		{:else}
			<img
				src={imageSrc}
				alt="Album de The Strokes : First Impressions of Earth"
				width="200"
				height="200"
			/>
		{/if}
	</div>
</section>

<style>
	img {
		view-transition-name: stable-zoom-image;
	}

	div {
		min-height: 500px;
	}

	button {
		all: unset;
		display: block;
		inline-size: fit-content;
		margin-inline: auto;
		margin-block-end: 1rem;
		padding: 0.5rem 1rem;
		background: var(--color-primary);
		color: var(--color-white);
		font-weight: var(--weight-bold);
		cursor: pointer;
	}
</style>
