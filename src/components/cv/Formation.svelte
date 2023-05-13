<script lang="ts">
	import Line from './Line.svelte';
	import Time from './Time.svelte';

	export let startDate: Date;
	export let endDate: Date;
	export let lang: string = 'fr-FR';
</script>

<Line>
	<div class="time time--alone" slot="left">
		<Time date={startDate} {lang} /> – <Time date={endDate} {lang} />
	</div>
	<svelte:fragment slot="children"><slot /></svelte:fragment>
</Line>
