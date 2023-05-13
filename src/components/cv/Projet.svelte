<script lang="ts">
	import Line from './Line.svelte';

	export let name: string;
</script>

<Line>
	<h3 slot="left">{name}</h3>
	<svelte:fragment slot="children"><slot /></svelte:fragment>
</Line>
