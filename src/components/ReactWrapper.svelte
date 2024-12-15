<script lang="ts">
	import { onMount } from 'svelte';
	import type { ReactElement } from 'react';
	import { createRoot } from 'react-dom/client';

	export let render: () => ReactElement;

	let container: HTMLDivElement | null = null;

	onMount(async () => {
		if (container === null) {
			return null;
		}

		const root = createRoot(container);
		root.render(render());
	});
</script>

<div bind:this={container}></div>
