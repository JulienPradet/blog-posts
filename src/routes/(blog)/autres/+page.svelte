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

<Meta {meta} location="/autres/" />

<Headline headline="Autres" />

<Content>
	<p>
		Ce sont des articles <strong>que je n'ai pas su ranger</strong>. Je ne suis pas fermé à l'idée
		d'écrire sur d'autres sujets que le développement web. Alors forcément, j'ai des articles qui
		rentrent dans aucune case. Et tant mieux parce que les cases, c'est triste !
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
