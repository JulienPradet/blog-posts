<script lang="ts">
	import { tick } from 'svelte';

	let quantity = 50;

	let list: number[];
	let selected: number | null;
	$: {
		list = new Array(quantity).fill(null).map((_, index) => index);
		selected = null;
	}

	async function selectItem(button: HTMLButtonElement, item: number | null) {
		if ('startViewTransition' in document) {
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
	<ul>
		<li>
			<strong><a href="/tutoriels/view-transitions/#performance">Revenir à l'article</a></strong>
		</li>
		<li>
			<a
				href="https://docs.google.com/spreadsheets/d/1v1RJdqrwW5Sn_hc41ErifvLJMWXT5xqquAz5yax0kIw/edit?usp=sharing"
				>Détails des résultats</a
			>
		</li>
		<li>
			<a
				href="https://github.com/JulienPradet/blog-posts/tree/main/src/routes/(blog)/tutoriels/view-transitions/performance-test/"
				>Code source</a
			>
		</li>
	</ul>

	<p>
		Ci-dessous, il y a une `view-transition-name` par élément. Le but est de jouer sur le nombre
		d'éléments afin de constater l'impact sur la performance de l'animation.
	</p>

	<form>
		<label for="quantity">Nombre d'éléments dans la liste :</label>
		<input name="quantity" type="number" bind:value={quantity} />
	</form>

	{#if selected !== null}
		<div class="page">
			<h4 class="header" style="view-transition-name: element-{selected}">{selected + 1}</h4>
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
						style="view-transition-name: element-{item}"
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

	:global(html::view-transition-old, html::view-transition-new) {
		block-size: unset;
		inline-size: unset;
		translate: -50% -50%;
		top: 50%;
		left: 50%;
	}
	:global(html::view-transition-image-pair) {
		overflow: hidden;
	}

	:global(::view-transition-old, ::view-transition-new) {
		animation-name: unset;
	}

	form {
		margin-bottom: 1rem;
	}

	input {
		all: unset;
		width: 3rem;
		margin-left: 0.5rem;
		padding: 0.25rem 0.5rem;
		background: var(--color-white);
		border: 1px solid var(--color-dark);
	}
</style>
