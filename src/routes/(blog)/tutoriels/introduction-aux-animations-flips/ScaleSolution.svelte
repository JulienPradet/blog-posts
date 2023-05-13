<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import Flip from './flip/flip';

	let opened = false;

	let background: HTMLDivElement | null = null;
	let container: HTMLDivElement | null = null;
	let flips: Flip[] = [];

	beforeUpdate(() => {
		if (!background || !container) {
			return;
		}

		flips = [
			new Flip({
				element: container,
				options: { duration: 300, delay: opened ? 100 : 0 }
			}),
			new Flip({
				element: background,
				options: { duration: 300, delay: opened ? 0 : 100 }
			})
		];

		flips.forEach((flip) => flip.first());
	});

	afterUpdate(() => {
		flips.forEach((flip) => flip.last());
		flips.forEach((flip) => flip.invert());
		flips.forEach((flip) => flip.play());
	});
</script>

<div class={`container ${opened ? 'opened' : ''}`}>
	<div class="button-wrapper">
		<button on:click={() => (opened = !opened)}>
			{opened ? 'Fermer' : 'Ouvrir'}
		</button>
	</div>
	<div class="child">
		<div class="background" bind:this={background} />

		<div bind:this={container} class="content">
			<div class="inner-content">Salut, moi c'est le contenu&nbsp;! HOHO</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 20em;
		margin: 0 auto;
		text-align: center;
		min-height: 7em;
	}

	.button-wrapper {
		background: white;
		padding: 1em;
		position: relative;
		z-index: 2;
	}
	button {
		border: none;
		background: #00c9c9;
		color: white;
		font-weight: bold;
		padding: 1em;
	}

	.child {
		position: relative;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: white;
	}
	.opened .background {
		height: 100%;
	}
	.content {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: -1em;
		z-index: 3;
		opacity: 0;
		pointer-events: none;
	}
	.opened .content {
		margin-top: 0;
		opacity: 1;
		pointer-events: all;
	}
	.inner-content {
		padding: 0 1em 1em 1em;
	}
</style>
