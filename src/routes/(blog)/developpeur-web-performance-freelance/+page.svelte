<script lang="ts">
	import Content from '../../../components/Content.svelte';
	import Headline from '../../../components/Headline.svelte';
	import MainContent from '../../../components/MainContent.svelte';

	import type { PageMeta } from '../../../components/ArticleMeta';
	import FollowIncentive from '../../../components/FollowIncentive.svelte';
	import Meta from '../../../components/Meta.svelte';

	const date = new Date();
	const dayType = date.getHours() > 6 && date.getHours() < 17 ? 'journée' : 'soirée';

	let meta: PageMeta = {
		title: 'Travaillons ensemble',
		description: `Bonjour, je m'appelle Julien Pradet et je suis développeur front-end freelance, spécialisé en Web Performance.`,
		date: date
	};
</script>

<Meta {meta} location="/" />

<Headline
	headline="Enchanté, Julien&nbsp;Pradet,"
	subtitle="Ça vous dit de travailler ensemble&nbsp;?"
/>

<Content>
	<p>
		Je suis un <strong>développeur front-end freelance</strong> spécialisé dans la
		<strong>Web Performance</strong>.
	</p>

	<p>Avec plus de <strong>8 ans d'expérience</strong> dans le web je peux&nbsp;:</p>

	<ul>
		<li>
			vous aider à rassembler les arguments pour débloquer un budget performance au service de vos
			utilisateurs
		</li>
		<li>auditer et prioriser les chantiers à mettre en place</li>
		<li>former vos équipes afin de les rendre autonomes sur ces problématiques</li>
		<li>réaliser les chantiers ou vous débloquer sur un problème épineux</li>
	</ul>

	<p>
		Mes atouts sont que je m'intègre facilement au sein d'un <strong>collectif</strong>, je prends
		les décisions en fonction des <strong>enjeux produits</strong> et je mesure avant/après les changements
		pour orienter les choix et participer à la vulgarisation des problèmes.
	</p>

	<p>
		Les technologies principales sur lesquelles je travaille sont génériques au web : <strong
			>HTML</strong
		>,
		<strong>CSS</strong>, <strong>JS</strong>. J'ai aussi une expertise en <strong>React</strong> et
		<strong>Svelte</strong> mais ne rechigne pas à travailler sur des stacks <em>à l'ancienne</em>.
		Côté back-end, je suis à l'aise sur du <strong>Node.js</strong> &
		<strong>PHP</strong> (Symfony). Mais l'outil n'est qu'un moyen et mes connaissances sont suffisamment
		génériques pour m'adapter à votre stack.
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
			un thème e-commerce orienté performance en React & GraphQL, qui a permis entre autre à
			<a
				href="https://www.front-commerce.com/double-your-conversion-rate-in-16-weeks-devialet-case-study/"
				>Devialet d'augmenter son taux de conversion de +100%</a
			>
			et à
			<a href="https://www.front-commerce.com/improve-online-engagement-kaporal-case-study/"
				>Kaporal qui a diminué son taux de rebond de -60%</a
			>.
		</p>
		<p>
			En tant que Staff Engineer à <a href="https://www.singulart.com/">SINGULART</a>, leader de la
			vente d'art en ligne, j'ai aussi contribué à améliorer l'expérience sur mobile en augmentant
			la part de LCP &lt; 2.4s de 65% à 88%.
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

	<hr />

	<FollowIncentive />
</MainContent>
