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
		title: 'Blog tech',
		description: `Je suis un agglomérat de plein de choses. Je fais de l'illustration, de la 3D (surtout de la sculpture) et un peu de graphisme. Mais je suis surtout un furieux optimiste qui a envie de partager avec les autres.`,
		date: new Date()
	};
</script>

<Meta {meta} location="/tutoriels/introduction-aux-animations-flips/" />

<Headline
	headline="Enchanté, Julien&nbsp;Pradet,"
	subtitle="Mes valeurs sont la bienveillance et le partage."
/>

<Content>
	<p>
		Je suis une espèce d'agglomérat de plein de choses. Je fais du dev, de l'<a
			href="https://portfolio.julienpradet.fr">art génératif</a
		>, de la 3D (surtout de la sculpture), un peu de graphisme, et d'autres trucs encore. Mais je
		suis surtout un furieux optimiste.
	</p>
	<p>
		Sur ce blog, je veux écrire sur des choses qui me plaisent. Généralement, ce sera sur du
		développement web, mais vous n'êtes pas à l'abri de quelques surprises.
	</p>
	<p>
		Vous pouvez me trouver à Toulouse, mais aussi sur <a href="https://twitter.com/JulienPradet"
			>Twitter</a
		>
		ou à l'occasion de meetups. N'hésitez pas à me
		<a href="mailto:julien@pradet.me?subject=Salut%20!">contacter</a>. C'est toujours un plaisir.
	</p>
</Content>

<MainContent>
	<Content>
		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
