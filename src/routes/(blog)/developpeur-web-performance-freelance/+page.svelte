<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import Headline from '../../../components/Headline.svelte';
	import MainContent from '../../../components/MainContent.svelte';

	import type { PageMeta } from '../../../components/ArticleMeta';
	import Meta from '../../../components/Meta.svelte';

	const date = new Date();
	const dayType = date.getHours() > 6 && date.getHours() < 17 ? 'journée' : 'soirée';

	let meta: PageMeta = {
		title: 'Développeur Front-End & Web Performance Freelance',
		description: `Bonjour, je m'appelle Julien Pradet et je suis développeur front-end freelance, spécialisé en Web Performance.`,
		date: date
	};
</script>

<Meta {meta} location="/developpeur-web-performance-freelance/" />

<Headline
	isMainTitle={false}
	headline="Enchanté, Julien&nbsp;Pradet,"
	subtitle="Ça vous dit de travailler ensemble&nbsp;?"
/>

<Content>
	<h1 class="main-title">
		Je suis un <strong>développeur front-end freelance</strong> spécialisé dans la
		<strong>Web Performance</strong>.
	</h1>

	<p>Avec plus de <strong>8 ans d'expérience</strong> dans le web je peux&nbsp;:</p>

	<ul>
		<li>
			auditer et prioriser les chantiers à mettre en place pour améliorer la rapidité de votre site
		</li>
		<li>former vos équipes afin de les rendre autonomes sur ces problématiques</li>
		<li>réaliser les chantiers ou vous débloquer sur un problème épineux</li>
		<li>effectuer des missions de développement front-end plus classiques</li>
		<li>apporter simplicité et bonne humeur</li>
	</ul>

	<p>
		Je m'intègre facilement au sein d'un <strong>collectif</strong>, je prends les décisions en
		fonction des <strong>enjeux produits</strong>, je mesure avant et après mes développements pour
		guider les choix et je participe à l'<strong>apprentissage continu</strong> en documentant les changements.
	</p>

	<p>
		Les technologies principales sur lesquelles je travaille sont génériques au web : <strong
			>HTML</strong
		>,
		<strong>CSS</strong>, <strong>JS</strong>. J'ai aussi une expertise en <strong>React</strong> et
		<strong>Svelte</strong> mais ne rechigne pas à travailler sur des stacks dîtes
		<em>à l'ancienne</em>. Côté back-end, même s'il ne s'agit pas de mon coeur de métier, je suis à
		l'aise sur du Node.js & PHP (Symfony). Mais l'outil n'est qu'un moyen et mes connaissances sont
		suffisamment génériques pour m'adapter à votre stack.
	</p>

	<p>
		Si cette courte description a piqué votre curiosité, vous pouvez me contacter sur <a
			href="https://www.linkedin.com/in/julienpradet/">LinkedIn</a
		>
		ou par <a href="mailto:julien.pradet+travailler-ensemble@gmail.com">mail</a>.
	</p>
</Content>

<MainContent>
	<Content>
		<h2>Références</h2>

		<p>
			J'ai participé à la création de <a href="https://www.front-commerce.com/">Front-Commerce</a>,
			un framework e-commerce orienté performance en React & GraphQL, qui a permis entre autre à
			<a
				href="https://www.front-commerce.com/double-your-conversion-rate-in-16-weeks-devialet-case-study/"
				>Devialet d'augmenter son taux de conversion de +100%</a
			>
			et à
			<a href="https://www.front-commerce.com/improve-online-engagement-kaporal-case-study/"
				>Kaporal qui a diminué son taux de rebond de -60%</a
			>. Au delà du développement au quotidien du framework, j'ai été en charge de la formation des
			équipes utilisant Front-Commerce ainsi que des audits de leurs projets (qualité et
			performance).
		</p>
		<p>
			En tant que Staff Engineer à <a href="https://www.singulart.com/">SINGULART</a>, leader de la
			vente d'art en ligne, j'ai aussi contribué à améliorer l'expérience sur mobile en augmentant
			la part de LCP &lt; 2.5s de 65% à 92%. Mon rôle est de
			<a href="/tutoriels/mener-au-changement/">mettre en place l'architecture front-end</a>,
			travailler sur l'implémentation des projets critiques, former les équipes et mener les
			chantiers globaux de Web Performance.
		</p>

		<p>Vous pouvez retrouver le détail de mes expériences sur mon <a href="/cv/">CV</a>.</p>
	</Content>

	<Content>
		<h2>Me contacter</h2>

		<p>
			Si vous êtes arrivés jusqu'ici, que vous souhaitez travailler ensemble (remote ou Toulouse) et
			que, point bonus, vous aimez les chocolatines, je serai ravi d'en savoir plus. N'hésitez pas à
			m'envoyer un mail à <a href="mailto:julien.pradet+chocolatine@gmail.com"
				>julien.pradet+chocolatine@gmail.com</a
			>.
		</p>

		<p>En vous souhaitant une belle {dayType}.</p>
	</Content>
</MainContent>

<style>
	h1.main-title {
		font-size: 1.44rem;
		line-height: inherit;
		font-weight: inherit;
		margin-bottom: 2rem;
	}

	@media (max-width: 400px) {
		h1.main-title {
			font-size: 1.2rem;
		}
	}
</style>
