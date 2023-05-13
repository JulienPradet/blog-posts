<script lang="ts">
	import Headline from '../../../components/Headline.svelte';
	import MainContent from '../../../components/MainContent.svelte';
	import Content from '../../../components/Content.svelte';
	import ArticleList from '../../../components/ArticleList.svelte';

	import { pages } from '../../../../.svelte-kit/custom/pages';
	import meta from './meta';
	import type { ArticleMeta, WithLocation } from '../../../components/ArticleMeta';
	import { sortByDate } from '../../../components/util/sortByDate';
	import FollowIncentive from '../../../components/FollowIncentive.svelte';
	import Meta from '../../../components/Meta.svelte';

	const articles = pages.filter(
		(page) => page.type === 'article' && meta.filter(page)
	) as WithLocation<ArticleMeta>[];

	articles.sort(sortByDate);
</script>

<Meta {meta} location="/tutoriels/" />

<Headline headline="Tutoriels" />

<Content>
	<p>
		Les tutoriels sont pour moi l'occasion de présenter{' '}
		<strong>comment</strong> et surtout <strong>pourquoi</strong> faire les choses. Le contenu y est
		souvent dense et se concentre sur les{' '}
		<strong>bonnes pratiques</strong> et les <strong>concepts</strong> plutôt que sur la technique.
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
