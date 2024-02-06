<script lang="ts">
	import { tick } from 'svelte';

	const list = new Array(5).fill(null).map((_, index) => index);
	let oldItem: number;
	let selected: number | null = null;

	async function selectItem(button: HTMLButtonElement, item: number | null) {
		if ('startViewTransition' in document) {
			if (item !== null) {
				oldItem = item;
				await tick();
			}

			document.startViewTransition(async () => {
				selected = item;
				await tick();
			});
		} else {
			selected = item;
		}
	}
</script>

<section>
	{#if selected !== null}
		<div class="page">
			<h4 class="header">{selected + 1}</h4>
			<button
				class="close"
				on:click={function (event) {
					selectItem(event.currentTarget, null);
				}}><span aria-hidden="true">⬅️</span> Revenir à la liste</button
			>
		</div>
	{:else}
		<ul class="list">
			{#each list as item}
				<li>
					<button
						style={oldItem === item ? 'view-transition-name: list-element' : ''}
						on:click={function (event) {
							selectItem(event.currentTarget, item);
						}}>{item + 1}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	:root {
		--header-height: 200px;
	}

	section {
		min-height: 23.1rem;
	}

	ul.list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 600px) {
		section {
			min-height: 16rem;
		}

		ul.list {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	li {
		margin: 0;
		padding: 0;
	}

	.list button,
	.header {
		appearance: none;
		width: 100%;
		margin: 0;
		padding: 2rem 1rem;
		background: var(--color-primary);
		border: 0;
		font-family: inherit;
		font-size: 2rem;
		font-weight: var(--weight-black);
		line-height: 1.5;
		color: var(--color-white);
		text-align: center;
	}

	.page {
		position: relative;
		padding-bottom: 3rem;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--header-height);
		view-transition-name: list-element;
	}

	.close {
		all: unset;
		position: absolute;
		left: 1rem;
		top: 1rem;
		color: var(--color-white);
	}

	.list button,
	.close {
		cursor: pointer;
	}
</style>
