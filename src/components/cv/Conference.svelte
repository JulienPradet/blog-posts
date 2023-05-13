<script lang="ts">
	import Line from './Line.svelte';
	import Time from './Time.svelte';

	export let date: Date;
	export let lang: string = 'fr-FR';
</script>

<Line>
	<div slot="left">
		<h3><slot name="conf" /></h3>
		<Time {date} {lang} />
	</div>
	<svelte:fragment slot="children"><slot name="children" /></svelte:fragment>
</Line>
