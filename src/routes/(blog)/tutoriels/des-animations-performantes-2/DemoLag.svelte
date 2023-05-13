<script lang="ts">
	import { onDestroy } from 'svelte';

	let animationFrame: number | null = null;
	let node: HTMLElement;
	export let fast: boolean = false;

	function animate(t: number) {
		const pos = Math.sin(t / 1000) * 80 + 80;
		node.style.transform = `translate(${pos}px)`;
		animationFrame = requestAnimationFrame(animate);
	}

	function start() {
		if (animationFrame) {
			return;
		}

		animationFrame = requestAnimationFrame(animate);
	}

	function stop() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = null;
		}
	}

	function toggleAnimation() {
		if (animationFrame) {
			stop();
		} else {
			start();
		}
	}

	onDestroy(() => {
		stop();
	});
</script>

<div class="container">
	<div class={`box ${fast ? 'fast' : ''}`} bind:this={node}>
		Bonjour, Je suis une boîte avec des propriétés couteuses.
	</div>
	<button class="button" on:click={toggleAnimation}>
		{animationFrame === null ? 'Cliquer pour animer' : 'Cliquer pour mettre en pause'}
	</button>
</div>

<style>
	.container {
		position: relative;
		margin: 0em auto;
		height: 300px;
		overflow: hidden;
	}
	.container .button {
		position: absolute;
		bottom: 0;
		width: 100%;
		opacity: 0.7;
		font-size: 0.8em;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
	}
	.box {
		position: absolute;
		top: 80px;
		left: 80px;
		width: 200px;
		padding: 20px;
		background: #ffffff;
		box-shadow: 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77, 0.25em 0.25em 3em #ffff77,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff, 0.25em 0.25em 5em #ff77ff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff,
			0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff, 0.25em 0.25em 7em #77ffff;
	}

	.fast {
		will-change: transform;
	}
</style>
