<script lang="ts">
	import { formatSimpleDate } from '../dateFormats';

	export let date: Date | null;
	export let lang: string = 'fr-FR';
</script>

{#if date}
	<time>{formatSimpleDate(date, lang)}</time>
{:else}
	<time>{lang === 'fr-FR' ? "aujourd'hui" : 'Present'}</time>
{/if}
