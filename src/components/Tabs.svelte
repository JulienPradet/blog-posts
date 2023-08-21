<script lang="ts">
	export let tabs: { label: string; img: string }[];

	let currentTab = 0;
</script>

<div class="font-tab">
	<ul class="font-tab__list">
		{#each tabs as tab, index}
			<li>
				<button
					class={'font-tab__button ' + (index === currentTab ? 'active' : '')}
					on:click={() => (currentTab = index)}
				>
					{tab.label}
				</button>
			</li>
		{/each}
	</ul>
	<div class="font-tab__content">
		{#key currentTab}
			<img
				src={tabs[currentTab].img}
				alt={tabs[currentTab].label}
				loading="lazy"
				width="376"
				height="668"
			/>
		{/key}
	</div>
</div>

<style>
	.font-tab {
		margin: 1em 0;
	}

	.font-tab__list {
		padding: 0;
		margin: 0 0;
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
	}

	.font-tab__list > li {
		display: block;
		flex: 1;
	}
	.font-tab__button {
		width: 100%;
		height: 100%;
		font-family: inherit;
		font-size: 1rem;
		background: none;
		border: none;
		border-top: 1px solid transparent;
		border-bottom: 1px solid var(--color-dark-lighter);
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
		padding: 0.5rem 0.25rem;
		cursor: pointer;
	}
	.font-tab__button.active {
		opacity: 1;
		/* font-weight: var(--weight-bold); */
		background: var(--color-creme);
		border-bottom: none;
		border-style: inset;
		border-bottom-color: transparent;
		border-top: 1px solid var(--color-dark-lighter);
		border-left: 1px solid var(--color-dark-lighter);
		border-right: 1px solid var(--color-dark-lighter);
		cursor: default;
	}

	.font-tab__content {
		padding-top: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-dark-lighter);
	}
	.font-tab__content img {
		max-height: 400px;
		width: auto;
	}
</style>
