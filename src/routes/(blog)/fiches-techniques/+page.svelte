<script lang="ts">
	import Headline from '../../../components/Headline.svelte';
	import MainContent from '../../../components/MainContent.svelte';
	import Content from '../../../components/Content.svelte';
	import ArticleList from '../../../components/ArticleList.svelte';

	import { pages } from '../../../../.svelte-kit/custom/pages';
	import meta from './meta';
	import type { ArticleMeta, WithLocation } from '../../../components/ArticleMeta';
	import { sortByDate } from '../../../components/util/sortByDate';
	import Meta from '../../../components/Meta.svelte';

	const articles = pages.filter(
		(page) => page.type === 'article' && meta.filter(page)
	) as WithLocation<ArticleMeta>[];

	articles.sort(sortByDate);
</script>

<Meta {meta} location="/fiches-techniques/" />

<Headline headline="Fiches techniques" />

<Content>
	<p>
		Ce sont des articles <strong>mémos</strong>. Leur but principal est d'exposer comment fonctionne
		une certaine technique en mettant à disposition des <strong>exemples de code</strong> et de{' '}
		<strong>brèves explications</strong>. A la fin de ceux-ci, si vous faites des copier/coller,
		vous devriez avoir quelque chose qui fonctionne.
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>
</MainContent>
