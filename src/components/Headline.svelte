<script lang="ts">
	export let headline: string;
	export let subtitle: string = '';

	export let isMainTitle = true;
</script>

<div class="headline">
	{#if isMainTitle}
		<h1>{headline}</h1>
	{:else}
		<p class="h1">{headline}</p>
	{/if}
	{#if subtitle.length > 0}
		<p class="subline">{subtitle}</p>
	{/if}
</div>

<style>
	.headline {
		margin-bottom: 2rem;
	}

	h1,
	.h1 {
		margin: 0;
		font-weight: normal;
		line-height: 0.95;
	}

	.subline {
		display: block;
		margin: 0.2rem 0 0 0;
		font-size: 1.8rem;
		line-height: 1.2;
		color: #605d59;
	}
</style>
