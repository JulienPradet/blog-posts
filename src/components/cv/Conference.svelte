<script lang="ts">
	import Line from './Line.svelte';
	import Time from './Time.svelte';

	export let date: Date | null = null;
	export let lang = 'fr-FR';
</script>

<Line>
	<div slot="left">
		<h3><slot name="conf" /></h3>
		{#if date}<Time {date} {lang} />{/if}
	</div>
	<svelte:fragment slot="children"><slot name="children" /></svelte:fragment>
</Line>
