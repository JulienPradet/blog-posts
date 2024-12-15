<script>
	import NavigationItem from './NavigationItem.svelte';
</script>

<ul>
	<NavigationItem href="/item/1/">
		<svelte:fragment slot="label">Item 1</svelte:fragment>
	</NavigationItem>
	<NavigationItem href={null}>
		<svelte:fragment slot="label">Item 2</svelte:fragment>
		<svelte:fragment slot="children">
			<NavigationItem href="/item/2/child/1/">
				<svelte:fragment slot="label">Item 2 Child 1</svelte:fragment>
			</NavigationItem>
			<NavigationItem href="/item/2/child/2/">
				<svelte:fragment slot="label">Item 2 Child 2</svelte:fragment>
			</NavigationItem>
			<NavigationItem href="/item/2/child/3/">
				<svelte:fragment slot="label">Item 2 Child 3</svelte:fragment>
			</NavigationItem>
		</svelte:fragment>
	</NavigationItem>
	<NavigationItem href={null}>
		<svelte:fragment slot="label">Item 3</svelte:fragment>
		<svelte:fragment slot="children">
			<NavigationItem href="/item/2/child/1/">
				<svelte:fragment slot="label">Item 3 Child 1</svelte:fragment>
			</NavigationItem>
			<NavigationItem href="/item/2/child/2/">
				<svelte:fragment slot="label">Item 3 Child 2</svelte:fragment>
			</NavigationItem>
			<NavigationItem href="/item/2/child/3/">
				<svelte:fragment slot="label">Item 3 Child 3</svelte:fragment>
			</NavigationItem>
		</svelte:fragment>
	</NavigationItem>
</ul>
