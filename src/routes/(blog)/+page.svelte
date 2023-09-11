<script lang="ts">
	import Content from '../../components/Content.svelte';
	import Headline from '../../components/Headline.svelte';
	import MainContent from '../../components/MainContent.svelte';

	import { pages } from '../../../.svelte-kit/custom/pages';
	import type { ArticleMeta, PageMeta, WithLocation } from '../../components/ArticleMeta';
	import { sortByDate } from '../../components/util/sortByDate';
	import ArticleList from '../../components/ArticleList.svelte';
	import FollowIncentive from '../../components/FollowIncentive.svelte';
	import Meta from '../../components/Meta.svelte';

	const articles = pages.filter((page) => page.type === 'article') as WithLocation<ArticleMeta>[];

	articles.sort(sortByDate);

	let meta: PageMeta = {
		title: 'Blog tech sur le web, le front-end et la web performance',
		description: `Je suis un dev qui espère rendre le web un peu meilleur en partageant ce que j'ai appris au fil des années.`,
		date: new Date()
	};
</script>

<Meta {meta} location="/" />

<Headline
	headline="Enchanté, Julien&nbsp;Pradet,"
	subtitle="Mes valeurs sont la bienveillance et le partage."
/>

<Content>
	<p>Je vous souhaite la bienvenue, à vous qui venez visiter mon petit espace sur le web.</p>
	<p>
		<strong>Est-ce que vous êtes arrivé dans le coin parce que votre site web est lent ?</strong>
		Alors peut-être que vous serez intéressé par les
		<a href="/developpeur-web-performance/">services web performance</a> que je propose.
	</p>
	<p>
		<strong>Ou bien êtes-vous tombé sur un des articles que j'ai écrit ?</strong> En effet, j'aime
		partager autour du web. Généralement ça tourne autour de la web performance, du développement
		front-end ou de l'organisation d'équipe. Mais je suis une espèce d'agglomérat de plein de choses
		alors il m'arrive de vagabonder vers d'autres contrées. Par exemple, j'ai pas mal exploré
		<a href="https://portfolio.julienpradet.fr">l'Art Génératif</a> récemment.
	</p>
	<p>
		<strong>Dans tous les cas, je serais heureux d'entendre parler de vous.</strong> Alors n'hésitez
		pas à me contacter, que ce soit
		<a href="/developpeur-web-performance/#contact">via le formulaire</a>, ou sur mes réseaux
		sociaux :
		<a href="https://piaille.fr/@julienpradet">Mastodon</a>,
		<a href="https://twitter.com/JulienPradet">Twitter</a>
		ou <a href="https://www.linkedin.com/in/julienpradet/">LinkedIn</a>.
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
