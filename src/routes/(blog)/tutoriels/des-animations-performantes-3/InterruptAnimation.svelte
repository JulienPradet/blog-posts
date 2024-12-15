<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';

	const CLOSED_SCALE = 1;
	const EXPANDED_SCALE = 1.5;
	const DURATION = 2000;

	export let length = 1;
	export let checkStart = false;
	export let withoutLayoutThrashing = false;

	let opened = false;

	let start: number;
	let node: { [key in number]: HTMLElement } = {};
	let initialScale: { [key in number]: number } = {};

	let animation: number | null = null;

	function getScaleFromNode(node: HTMLElement) {
		return node.getBoundingClientRect().width / 180 || CLOSED_SCALE;
	}

	function getScale(progress: number, index: number) {
		if (!initialScale[index]) {
			if (checkStart) {
				initialScale[index] = getScaleFromNode(node[index]);
			} else {
				initialScale[index] = opened ? CLOSED_SCALE : EXPANDED_SCALE;
			}
		}

		if (opened) {
			return initialScale[index] + (EXPANDED_SCALE - initialScale[index]) * progress;
		} else {
			return initialScale[index] - (initialScale[index] - CLOSED_SCALE) * progress;
		}
	}

	function animate() {
		let progress = (window.performance.now() - start) / DURATION;
		if (progress > 1) progress = 1;

		Object.keys(node)
			.map((key) => node[key as unknown as number])
			.forEach((node, index) => {
				const scale = getScale(progress, index);
				node.style.transform = `scale(${scale}, 1)`;
			});

		if (progress < 1) {
			animation = window.requestAnimationFrame(animate);
		} else {
			animation = null;
		}
	}

	function toggle() {
		opened = !opened;
		if (animation) {
			cancelAnimationFrame(animation);
		}
	}

	onMount(() => {
		Object.keys(node)
			.map((key) => node[key as unknown as number])
			.forEach((node) => {
				node.style.transform = `scale(${CLOSED_SCALE}, 1)`;
			});
	});

	afterUpdate(() => {
		if (animation !== null) {
			cancelAnimationFrame(animation);
			animation = null;
		}

		if (withoutLayoutThrashing) {
			initialScale = Object.keys(node)
				.map((key) => node[key as unknown as number])
				.map((node) => {
					let scale;
					if (checkStart) {
						scale = getScaleFromNode(node);
					} else {
						scale = opened ? CLOSED_SCALE : EXPANDED_SCALE;
					}
					return scale;
				})
				.reduce(
					(initialScale, scale, index) => ({
						...initialScale,
						[index]: scale
					}),
					{}
				);
		} else {
			initialScale = {};
		}

		start = window.performance.now();
		animation = window.requestAnimationFrame(animate);
	});
</script>

<div class="container">
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each new Array(length).fill(0) as _, index}
		<button bind:this={node[index]} on:click={toggle}>
			{opened ? 'Click to close' : 'Click to expand'}
		</button>
	{/each}
</div>

<style>
	.container {
		max-height: 180px;
		overflow-y: auto;
	}

	button {
		display: block;
		border: none;
		cursor: pointer;
		background: #00c9c9;
		color: white;
		padding: 1em;
		margin: 0.2em auto;
		font-size: 1.1em;
		will-change: transform;
		width: 180px;
		touch-action: manipulation;
	}
</style>
