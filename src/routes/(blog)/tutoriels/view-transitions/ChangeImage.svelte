<script lang="ts">
	import { tick } from 'svelte';

	let isZoomed = false;
	let randomId = Date.now();

	async function toggleZoom() {
		randomId = Date.now();

		if ('startViewTransition' in document) {
			document.startViewTransition(async () => {
				isZoomed = !isZoomed;
				await tick();
			});
		} else {
			isZoomed = !isZoomed;
		}
	}
</script>

<section class={isZoomed ? 'zoom' : ''}>
	<button on:click={toggleZoom}>Toggle zoom</button>
	<div>
		{#if isZoomed}
			<img
				src="/images/posts/view-transitions/the-strokes-cover.jpg?{randomId}"
				alt="Album de The Strokes : First Impressions of Earth"
				width="500"
				height="500"
			/>
		{:else}
			<img
				src="/images/posts/view-transitions/the-strokes-cover-small.jpg?{randomId}"
				alt="Album de The Strokes : First Impressions of Earth"
				width="200"
				height="200"
			/>
		{/if}
	</div>
</section>

<style>
	img {
		view-transition-name: zoom-image;
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
