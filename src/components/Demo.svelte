<script lang="ts">
	export let standby: boolean = true;

	function runDemo() {
		standby = false;
	}

	function stopDemo() {
		standby = true;
	}
</script>

<div class={`demo ${standby === false ? 'demo--live' : ''}`}>
	{#if standby}
		<button on:click={runDemo} class="demo__launch"> Run demo </button>
	{:else}
		<slot />
		<button on:click={stopDemo} class="demo__stop">Arrêter la demo</button>
	{/if}
</div>

<style>
	.demo {
		position: relative;
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
	.demo__stop {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		appearance: none;
		border: 0px;
		font-size: 1rem;
		color: inherit;
		background-color: transparent;
		opacity: 0.65;
		cursor: pointer;
	}

	.demo--live {
		padding-bottom: 3rem;
	}
</style>
