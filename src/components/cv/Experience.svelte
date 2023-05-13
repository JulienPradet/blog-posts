<script lang="ts">
	import Line from './Line.svelte';
	import Time from './Time.svelte';

	export let title: string;
	export let lang: string = 'fr-FR';
	export let startDate: Date;
	export let endDate: Date | null = null;
	export let type: string | null = null;
</script>

<Line>
	<div slot="left">
		<h3>{title}</h3>
		<div class="small">
			<Time {lang} date={startDate} /> – <Time {lang} date={endDate} />
		</div>
		{#if type}
			<div class="small">{type}</div>
		{/if}
	</div>

	<svelte:fragment slot="children"><slot /></svelte:fragment>
</Line>
