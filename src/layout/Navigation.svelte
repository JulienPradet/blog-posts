<script>
	import twitterSvg from '../components/icons/iconmonstr-twitter-1.svg?raw';
	import githubSvg from '../components/icons/iconmonstr-github-1.svg?raw';
	import linkedInSvg from '../components/icons/icon-linkedin.svg?raw';
	import mastodonSvg from '../components/icons/icon-mastodon.svg?raw';
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav>
	<ul>
		<NavigationItem href="/">
			<span aria-label="Accueil" slot="label">🏠</span>
		</NavigationItem>
		<NavigationItem href={null}>
			<svelte:fragment slot="label">Menu</svelte:fragment>
			<svelte:fragment slot="children">
				<NavigationItem href="/">
					<svelte:fragment slot="label">Accueil</svelte:fragment>
				</NavigationItem>
				<hr />
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
					<svelte:fragment slot="label">Autres</svelte:fragment>
				</NavigationItem>
				<hr />
				<NavigationItem href="/cv/">
					<svelte:fragment slot="label">CV</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/conferences/">
					<svelte:fragment slot="label">Conférences</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="https://portfolio.julienpradet.fr">
					<svelte:fragment slot="label">Art Génératif (sans IA)</svelte:fragment>
				</NavigationItem>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="/developpeur-web-performance/">
			<svelte:fragment slot="label"><strong>Travailler ensemble</strong></svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://piaille.fr/@julienpradet">
			<svelte:fragment slot="label">
				<span class="icon">{@html mastodonSvg}</span>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://twitter.com/JulienPradet">
			<svelte:fragment slot="label">
				<span class="icon">{@html twitterSvg}</span>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://www.linkedin.com/in/julienpradet/">
			<svelte:fragment slot="label">
				<span class="icon">{@html linkedInSvg}</span>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://github.com/JulienPradet">
			<svelte:fragment slot="label">
				<span class="icon">{@html githubSvg}</span>
			</svelte:fragment>
		</NavigationItem>
	</ul>
</nav>

<style>
	nav {
		color: #605d59;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		margin: 0;
		padding: 0;
		gap: 0.75rem 1.5rem;
		max-width: 16rem;
	}

	.icon {
		position: relative;
		display: flex;
		padding-top: 1px;
		color: #5b5b56c0;
	}

	.icon :global(svg) {
		display: block;
		width: 1em;
	}

	hr {
		height: 1px;
		border: none;
		margin: 0.8rem 0 0.6rem;
	}

	@media (min-width: 30rem) {
		ul {
			max-width: 100%;
		}
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
