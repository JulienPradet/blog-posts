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
		<a href="/developpeur-web-performance/">services autour de la Web Performance</a> que je propose.
	</p>
	<p>
		<strong>Ou bien êtes-vous tombé sur un des articles que j'ai écrit ?</strong> En effet, j'aime
		partager autour du web. Généralement ça tourne autour de la Web Performance, du développement
		front-end ou de l'organisation d'équipe. Mais je suis une espèce d'agglomérat de plein de choses
		alors il m'arrive de vagabonder vers d'autres contrées. Par exemple, j'ai pas mal exploré
		<a href="https://portfolio.julienpradet.fr">l'Art Génératif</a> récemment ou, si on remonte plus
		loin, la 3D (sculpture notamment).
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
	<div class="summary">
		<Content>
			<h2 class="content-title">
				Pour découvrir la <abbr tabIndex="-1" title="Web Performance">WebPerf</abbr>
			</h2>

			<ul>
				<li>
					<a href="/tutoriels/pourquoi-ameliorer-le-lcp/">
						Pourquoi et comment accélérer le chargement de vos pages ?
					</a>
					(juil. 2023)
					<p>
						Comprendre pourquoi la WebPerf c'est important et découvrir les outils pour démarrer
					</p>
				</li>
				<li>
					<a href="/tutoriels/reseau-et-core-web-vitals/">
						Analyser et accélérer le chargement d'une page
					</a>
					(juil. 2023)
					<p>
						Apprendre à lire les audits de performance afin d'être capable de comprendre quoi
						améliorer sur votre site
					</p>
				</li>
				<li>
					<a href="/tutoriels/optimiser-le-chargement-des-images/">
						Optimiser les images sur le web : checklist des bonnes pratiques
					</a>
					(juil. 2023)
					<p>
						Bien comprendre les techniques d'optimisation afin de ne plus servir d'images
						sous-optimisées
					</p>
				</li>
			</ul>
		</Content>

		<Content>
			<h2 class="content-title">Mes articles préférés</h2>

			<ul>
				<li>
					<a href="/tutoriels/mener-au-changement/"> Mener au changement </a>
					(juil. 2023)
					<p>
						Un retour d'expérience sur comment apporter du changement au sein d'une équipe étape par
						étape
					</p>
				</li>
				<li>
					<a href="/tutoriels/sticky-header-avec-hauteur-dynamique-performant/">
						Comment faire un header sticky animé et performant ?
					</a>
					(sept. 2023)
					<p>Un condensé d'astuces front-end pour faire des animations front au quotidien</p>
				</li>
				<li>
					<a href="/tutoriels/des-animations-performantes-1/"> Des animations performantes </a>
					(fev. 2017)
					<p>Plonger dans le fonctionnement des navigateurs pour en tirer des animations à 60fps</p>
				</li>
			</ul>
		</Content>
	</div>

	<hr />

	<Content>
		<h2 class="content-title">Tous les articles</h2>

		<ArticleList {articles} />
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>

<style>
	h2.content-title {
		margin-bottom: 2rem;
	}

	.summary {
		display: flex;
		flex-direction: column;
		gap: 2rem 4rem;
	}

	.summary ul {
		padding: 0;
		margin-bottom: 0;
	}

	.summary li {
		margin: 0.5rem 0;
		list-style: none;
	}

	.summary li p {
		margin: 0;
	}

	@media (min-width: 75rem) {
		.summary {
			flex-direction: row;
		}
	}
</style>
