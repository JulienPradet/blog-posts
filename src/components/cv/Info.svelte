<script lang="ts">
	import Line from './Line.svelte';

	export let type: string;
</script>

<Line>
	<h3 slot="left">{type}</h3>
	<svelte:fragment slot="children"><slot /></svelte:fragment>
</Line>
