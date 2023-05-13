<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import Flip from './flip/flip';

	let container: HTMLDivElement | null = null;
	let opened = false;
	let flip: Flip | null = null;

	beforeUpdate(() => {
		if (!container) {
			return;
		}

		flip = new Flip({
			element: container,
			options: { duration: 300 }
		});
		flip?.first();
	});

	afterUpdate(() => {
		flip?.last();
		flip?.invert();
		flip?.play();
	});
</script>

<div class="wrapper">
	<div bind:this={container} class="container">
		<button on:click={() => (opened = !opened)}>
			{opened ? 'Fermer' : 'Ouvrir'}
		</button>
		{#if opened}
			<div class="child">Salut, moi c'est le contenu&nbsp;!</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		min-height: 7em;
	}

	.container {
		background: white;
		padding: 1em;
		max-width: 20em;
		margin: 0 auto;
		text-align: center;
	}

	button {
		border: none;
		background: #00c9c9;
		color: white;
		font-weight: bold;
		padding: 1em;
	}

	.child {
		margin-top: 1em;
	}
</style>
