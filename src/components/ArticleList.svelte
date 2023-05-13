<script lang="ts">
	import type { ArticleMeta, WithLocation } from './ArticleMeta.js';
	import ArticlePreview from './ArticlePreview.svelte';

	export let articles: WithLocation<ArticleMeta>[];
</script>

<div>
	{#each articles as article}
		<ArticlePreview {article} />
	{/each}
</div>
