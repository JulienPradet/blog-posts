<script>
	import twitterSvg from '../components/icons/iconmonstr-twitter-1.svg?raw';
	import githubSvg from '../components/icons/iconmonstr-github-1.svg?raw';
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav>
	<ul>
		<NavigationItem href="/">
			<svelte:fragment slot="label">
				<span aria-label="Accueil" slot="label">🏠</span>
				Blog tech
			</svelte:fragment>
			<svelte:fragment slot="children">
				<NavigationItem href="/">
					<svelte:fragment slot="label">Tous les articles</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/tutoriels/">
					<svelte:fragment slot="label">Tutoriels</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/fiches-techniques/">
					<svelte:fragment slot="label">Fiches Techniques</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/explorations/">
					<svelte:fragment slot="label">Explorations</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/autres/">
					<svelte:fragment slot="label">Autres liens</svelte:fragment>
				</NavigationItem>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://portfolio.julienpradet.fr">
			<svelte:fragment slot="label">Portfolio</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="/cv/">
			<svelte:fragment slot="label">CV</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://twitter.com/JulienPradet">
			<svelte:fragment slot="label">
				<span class="icon" aria-label="Twitter @JulienPradet">{@html twitterSvg}</span>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://github.com/JulienPradet">
			<svelte:fragment slot="label">
				<span class="icon" aria-label="GitHub JulienPradet">{@html githubSvg}</span>
			</svelte:fragment>
		</NavigationItem>
	</ul>
</nav>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		gap: 0.5rem 1rem;
	}

	.icon {
		position: relative;
		display: flex;
		color: #5b5b56;
	}
	.icon::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: rgb(118 114 110 / 50%);
	}

	.icon:hover::after,
	.icon:focus::after {
		height: 2px;
		background: rgb(118 114 110 / 100%);
	}

	.icon :global(svg) {
		display: block;
		width: 1em;
	}

	@media (min-width: 720px) {
		.icon {
			margin-top: 0.05em;
		}
		.icon::after {
			bottom: -0.1em;
		}
	}
</style>
