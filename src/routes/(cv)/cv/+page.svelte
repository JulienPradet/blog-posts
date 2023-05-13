<script lang="ts">
	import Section from '../../../components/cv/Section.svelte';
	import Experience from '../../../components/cv/Experience.svelte';
	import Formation from '../../../components/cv/Formation.svelte';
	import Competence from '../../../components/cv/Competence.svelte';
	import Projet from '../../../components/cv/Projet.svelte';
	import Info from '../../../components/cv/Info.svelte';
	import Conference from '../../../components/cv/Conference.svelte';
	import Header from '../../../components/cv/Header.svelte';

	let anneesASingulart = Math.floor(
		(new Date().getTime() - new Date('2021-04-06').getTime()) / (1000 * 60 * 60 * 24 * 365)
	);
</script>

<svelte:head>
	<title>Julien Pradet - CV</title>
	<meta
		name="description"
		content="Je suis un développeur web, touche-à-tout, et curieux d'apprendre de nouvelles manières de répondre aux besoins des utilisateurs et utilisatrices."
	/>
	<link rel="alternate" href="/cv/en" hreflang="en-us" />
</svelte:head>

<Header translationHref="/cv/en/" translationHreflang="en-us" translationLang="en">
	<svelte:fragment slot="title"
		>Staff Engineer <span class="inline-block">(Spécialisé&nbsp;Front-End)</span></svelte:fragment
	>
	<svelte:fragment slot="translation">
		Switch to <strong><span>english</span></strong> version
	</svelte:fragment>
	<svelte:fragment slot="moto">
		Mes valeurs sont la <strong><span>bienveillance</span></strong> et le{' '}
		<strong><span>partage</span></strong>.<br />
		Mes atouts sont mon <strong><span>empathie</span></strong>, mon{' '}
		<strong><span>esprit d'équipe</span></strong> et mon <strong><span>initiative</span></strong>.
	</svelte:fragment>
</Header>

<Section title="Expérience Professionnelle">
	<Experience startDate={new Date('2021-04-06')} title="SINGULART" type="Remote">
		<h4>
			Staff Front-End Engineer &ndash; 1ère galerie d'art en ligne de plus de 10&nbsp;000 artistes
			internationaux (Scale-up)
		</h4>
		<p>
			En tant que premier développeur front-end à rejoindre cette entreprise internationale, mon
			rôle a évolué de Senior Engineer dans une équipe de 5 personnes à Staff Engineer avec 25
			personnes réparties en 3 équipes :
		</p>
		<ul>
			<li>
				Structuration des bonnes pratiques de développement front-end (Composants, Atomic Design,
				<abbr title="Block Element Modifier">BEM</abbr>, tests automatisés, CI, etc.) améliorant
				ainsi la déliverabilité de 30%
			</li>
			<li>Création et réalisation de tests technique pour le recrutement de l'équipe front-end</li>
			<li>
				Mentoring de 15 développeur·se·s front-end & full-stack (formations, meetups internes,
				review, pair programming)
			</li>
			<li>
				Analyse et amélioration des WebPerfs et des Core Web Vitals (Good mobile <abbr
					title="Largest Contentful Paint">LCP</abbr
				>
				65% -> 87%, Good mobile <abbr title="Cumulative Layout Shift">CLS</abbr> 70% -> 95%)
			</li>
			<li>
				Proposition et développement d'outils afin d'améliorer la collaboration front-end/back-end (<abbr
					title="Request For Comments">RFC</abbr
				>,
				<abbr title="Architecture Decision Record">ADR</abbr>, Roadmaps)
			</li>
			<li>
				Animation de la Guild front-end responsable de la création du Design System et de son
				adoption progressive
			</li>
			<li>
				Architecte des sujets produits stratégiques (feedbacks orientés produit, livraison
				progressive, analyse d'AB tests)
			</li>
			<li>Référent auprès des autres équipes sur les sujets front-end</li>
		</ul>
	</Experience>
	<Experience
		startDate={new Date('2018-12-01')}
		endDate={new Date('2021-03-31')}
		title="Front-Commerce"
		type="Remote"
	>
		<h4>
			Développeur Front-End &ndash; Création et maintenance d'un outil pour développeur·se·s dédié à
			la mise en place de boutiques e-commerce headless
		</h4>
		<ul>
			<li>
				Création d'un thème e-commerce et de son Design System (React, Sass, Apollo, SSR, Storybook)
			</li>
			<li>Création d'une API GraphQL (NodeJS)</li>
			<li>
				Gestion des mises à jour et des processus de migration (Migration progressive, Breaking
				changes, Changelog)
			</li>
			<li>Rédaction technique pour la documentation du produit</li>
			<li>Moteur au sujet des décisions techniques</li>
			<li>
				Veille importante autour de l'écosystème front-end (Framworks, Tooling, WebPerfs,
				Accessibilité, PWAs, etc.)
			</li>
			<li>Formation des développeur·se·s utilisants le produit</li>
			<li>Support technique et aide à l'avant vente auprès des partenaires</li>
		</ul>
	</Experience>
	<Experience startDate={new Date('2016-03-07')} endDate={new Date('2020-02-01')} title="Occitech">
		<h4>
			Développeur Full-Stack &ndash; Réalisation & maintenance d'applications web spécifiques ou
			e-commerce (React, PHP, Symfony, Magento…)
		</h4>
		<ul>
			<li>Étude du besoin et conseils de solutions</li>
			<li>Mise en place de systèmes complexes (Event Sourcing, CQRS…)</li>
			<li>Mise en avant de la culture front-end au sein de l'agence</li>
			<li>Formation et encadrement des développeurs juniors</li>
		</ul>
	</Experience>

	<Experience startDate={new Date('2015-05-01')} endDate={new Date('2016-03-01')} title="Capgemini">
		<h4>
			Développeur Full-Stack &ndash; Front-Office d’une application web pour le Ministère de la
			Défense (PHP, Symfony)
		</h4>
	</Experience>

	<Experience
		startDate={new Date('2014-04-01')}
		endDate={new Date('2014-09-01')}
		title="Kerdos-Energy"
	>
		<h4>
			Stage &ndash; Création d'une plateforme de recensement des solutions d’optimisation en énergie
			(PHP, MySQL)
		</h4>
	</Experience>
</Section>

<Section title="Formation">
	<Formation startDate={new Date('2012-09-01')} endDate={new Date('2015-10-01')}>
		<h3 class="h4">École Internationale des Sciences du Traitement de l’Information - EISTI</h3>
		<p>Diplôme Ingénieur en informatique - Option Ingénierie du Cloud Computing</p>
		<p>École renommée en Cy Tech - <a href="https://cytech.cyu.fr/">https://cytech.cyu.fr/</a></p>
	</Formation>
	<Formation startDate={new Date('2010-09-01')} endDate={new Date('2012-07-01')}>
		<h3 class="h4">Classes Préparatoires aux Grandes Écoles, Mathématiques et Physique (M.P.)</h3>
		<p>Lycée Louis Barthou à Pau</p>
	</Formation>
</Section>

<Section title="Compétences techniques">
	<Competence type="Concepts">
		<p>
			Programmation Fonctionnelle, Programmation Réactive,{' '}
			<abbr title="Programmation Orienté Objet">POO</abbr>
		</p>
	</Competence>
	<Competence type="Langages">
		<p>JavaScript, TypeScript, HTML, CSS, PHP, Java, OCaml</p>
	</Competence>
	<Competence type="Web">
		<p>React, Svelte, RxJS, Babel, Webpack, Jest, Vite, Vitest, Cypress</p>
		<p>Symfony, Express, Fastify, GraphQL</p>
	</Competence>
</Section>

<Section title="Conférences (non exhaustif)">
	<Conference date={new Date('2020-09-27')}>
		<a slot="conf" href="https://france.sveltesociety.dev/">Svelte Society FR</a>
		<svelte:fragment slot="children">
			<h4>Internationaliser son application pour seulement 1kb de JS</h4>
			<p>
				<a href="https://www.youtube.com/watch?v=aY-e0Ph4ub0">
					https://www.youtube.com/watch?v=aY-e0Ph4ub0
				</a>
			</p>
		</svelte:fragment>
	</Conference>
	<Conference date={new Date('2018-11-20')}>
		<a slot="conf" href="https://react-toulouse.js.org/meetup/4/">React Toulouse</a>

		<svelte:fragment slot="children">
			<h4>Passer de Storybook à un Design System</h4>
			<p>
				<a href="https://www.youtube.com/watch?v=lVwTOb9Nn18">
					https://www.youtube.com/watch?v=lVwTOb9Nn18
				</a>
			</p>
		</svelte:fragment>
	</Conference>
	<Conference date={new Date('2017-06-12')}>
		<a slot="conf" href="http://toulouse.aperoweb.fr/">Aperoweb Toulouse</a>

		<svelte:fragment slot="children">
			<h4>Animations Performantes</h4>
			<p>
				<a href="https://julienpradet.github.io/slides/animations-performantes/">
					https://julienpradet.github.io/slides/animations-performantes/
				</a>
			</p>
		</svelte:fragment>
	</Conference>
</Section>

<Section title="Projets et Expériences Personnelles">
	<Projet name="Art génératif">
		<h4>
			<a href="https://portfolio.julienpradet.fr/">https://portfolio.julienpradet.fr/</a>
		</h4>
		<p>Génération d'images artistiques à partir d'algorithmes et de code.</p>
	</Projet>
	<Projet name="Blog">
		<h4>
			<a href="https://www.julienpradet.fr/">https://www.julienpradet.fr/</a>
		</h4>
		<p>J'y partage mes connaissances et mes expériences dans le domaine du web.</p>
	</Projet>
	<Projet name="Side projects">
		<h4>
			<a href="https://github.com/JulienPradet"> https://github.com/JulienPradet </a>
		</h4>
		<p>
			Je publie régulièrement des projets sur github qui me servent de terrain de jeu pour découvrir
			de nouvelles technologies. (Bibliothèque d'animation, Outil pour Design System,{' '}
			<abbr title="Générateur de Site Statique">GSS</abbr>…)
		</p>
	</Projet>
	<Projet name="Ter Aelis">
		<h4>
			<a href="http://ter-aelis.fr/">http://ter-aelis.fr/</a>
		</h4>
		<p>Réalisation d'un forum communautaire en Symfony pour une association d'artistes.</p>
	</Projet>
</Section>

<Section title="Informations Complémentaires">
	<Info type="Langues">
		<p>Français (langue maternelle), Anglais (TOEIC : 945/990)</p>
	</Info>
	<Info type="Loisirs">
		<p>Illustration, Graphisme et Sculpture</p>
		<ul>
			<li>2D : Photoshop, Illustrator</li>
			<li>3D : Blender, Argile</li>
			<li>Art génératif : Canvas, WebGL, SVG</li>
		</ul>
	</Info>

	<Info type="Divers">
		<p>Permis B</p>
		<p>Neuf ans à l'étranger&nbsp;: Écosse, Indonésie, Émirats Arabes Unis (Dubaï)</p>
	</Info>
</Section>

<style>
	.inline-block {
		display: inline-block;
	}
</style>
