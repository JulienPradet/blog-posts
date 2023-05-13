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

<Meta {meta} location="/explorations/" />

<Headline headline="Explorations" />

<Content>
	<p>
		Ce sont des articles <strong>rigolos</strong>. Leur but principal est de montrer comment je suis
		arrivé à tel ou tel résultat. Ce ne sont pas toujours des bonnes pratiques, ou des choses qui
		pourront servir dans d'autres contextes, mais sait-on jamais ! Ca peut donner des idées.
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
