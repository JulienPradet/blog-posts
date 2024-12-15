<script lang="ts">
	import type { ArticleMeta, WithLocation } from './ArticleMeta';
	import Tag from './Tag.svelte';
	import { categoryLink } from './categoryLink';
	import { formatDate } from './util/dateFormats';

	export let article: WithLocation<ArticleMeta>;
</script>

<article class="article-preview">
	<p class="metadata small"></p>
	<h2 class="h4">
		<a href={article.location}>{article.title}</a>
	</h2>
	<p class="metadata small">
		<time>{formatDate(article.date)}</time>
		&ndash;
		<Tag href={categoryLink(article.category)} label={article.category} />
	</p>
	<p class="description">{article.description}</p>
</article>

<style>
	.article-preview + :global(.article-preview) {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid rgb(24 23 22 / 15%);
	}

	.article-preview h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}
	.metadata {
		margin: 0.5rem 0 0 0;
	}
	.description {
		margin: 0.5rem 0 0 0;
	}
</style>
