<script lang="ts">
	import Code from './Code.svelte';

	export let tabs: { label: string; code: string }[];

	let currentTab = 0;
</script>

<div class="code-tab">
	<ul class="code-tab__list">
		{#each tabs as tab, index}
			<li>
				<button
					class={'code-tab__button ' + (index === currentTab ? 'active' : '')}
					on:click={() => (currentTab = index)}>{tab.label}</button
				>
			</li>
		{/each}
	</ul>
	{#key currentTab}
		<Code>{tabs[currentTab].code}</Code>
	{/key}
</div>

<style>
	.code-tab {
		margin: 1em 0;
	}

	ul.code-tab__list {
		padding: 0;
		margin: 0 0;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
	}

	.code-tab__list > li {
		display: block;
		flex: 1;
	}
	.code-tab__button {
		width: 100%;
		height: 100%;
		font-size: 1em;
		opacity: 0.6;
		border: none;
		border-top: 1px solid #282c34;
		border-right: 1px solid #282c34;
		padding: 0.5em;
		font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		cursor: pointer;
	}
	.code-tab__button.active {
		opacity: 1;
		background: #282c34;
		color: #abb2bf;
		border-color: #282c34;
		cursor: default;
	}
	.code-tab :global(pre[class*='language-']),
	.code-tab :global(pre) {
		margin-top: 0;
	}

	@media screen and (min-width: 52em) {
		.code-tab__button {
			border-right: none;
		}
	}
</style>
