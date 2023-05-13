<script>
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
				<NavigationItem href="/tutoriels">
					<svelte:fragment slot="label">Tutoriels</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/fiches-techniques">
					<svelte:fragment slot="label">Fiches Techniques</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/explorations">
					<svelte:fragment slot="label">Explorations</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="/autres">
					<svelte:fragment slot="label">Autres</svelte:fragment>
				</NavigationItem>
			</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://twitter.com/JulienPradet">
			<svelte:fragment slot="label">@JulienPradet</svelte:fragment>
		</NavigationItem>
		<NavigationItem href="https://github.com/JulienPradet">
			<svelte:fragment slot="label">Github</svelte:fragment>
		</NavigationItem>
		<NavigationItem href={null}>
			<svelte:fragment slot="label">Autres</svelte:fragment>
			<svelte:fragment slot="children">
				<NavigationItem href="/cv">
					<svelte:fragment slot="label">CV</svelte:fragment>
				</NavigationItem>
				<NavigationItem href="https://portfolio.julienpradet.fr">
					<svelte:fragment slot="label">Portfolio</svelte:fragment>
				</NavigationItem>
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
</style>
