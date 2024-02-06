<script lang="ts">
	import { tick } from 'svelte';

	export let html: string;
	export let style: string | null = null;
	export let callback: (container: HTMLDivElement) => void;

	let standby: boolean = true;
	let container: HTMLDivElement;

	async function runDemo() {
		standby = false;

		await tick();

		const scope = `demo-vanilla-${(Math.random() * Number.MAX_SAFE_INTEGER).toFixed(0)}`;
		container.classList.add(scope);
		container.innerHTML = `
            <style>
                .${scope} {
                    ${style}
                }
            </style>${html}`;
		callback(container);
	}
</script>

<div class="demo">
	{#if standby}
		<button on:click={runDemo} class="demo__launch"> Run demo </button>
	{:else}
		<div bind:this={container}></div>
	{/if}
</div>

<style>
	.demo {
		min-height: 6em;
		background: #e6e6e6;
		padding: 1em;
	}
	.demo__launch {
		display: block;
		width: calc(100% + 2em);
		padding: 3em;
		margin: -1em;
		border: none;
		text-align: center;
		position: relative;
		color: transparent;
		background: transparent;
	}
	.demo__launch::before {
		content: '';
		display: block;
		position: absolute;
		margin: 0 auto;
		top: calc(50% - 1.5em);
		left: calc(50% - 1.5em);
		width: 3em;
		height: 3em;
		background: #000000;
		border-radius: 50%;
		cursor: pointer;
	}
	.demo__launch::after {
		content: '';
		display: block;
		position: absolute;
		margin: 0 auto;
		top: calc(50% - 3em);
		left: calc(50% - 1.5em);
		width: 0;
		height: 0;
		border-left: 3em solid #fff;
		border-top: 3em solid transparent;
		border-bottom: 3em solid transparent;
		transform: scale(0.45, 0.3) translate(0.5em);
		cursor: pointer;
	}
</style>
