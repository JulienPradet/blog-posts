<script lang="ts">
	import Section from '../../../../components/cv/Section.svelte';
	import Experience from '../../../../components/cv/Experience.svelte';
	import Formation from '../../../../components/cv/Formation.svelte';
	import Competence from '../../../../components/cv/Competence.svelte';
	import Projet from '../../../../components/cv/Projet.svelte';
	import Info from '../../../../components/cv/Info.svelte';
	import Conference from '../../../../components/cv/Conference.svelte';
	import Header from '../../../../components/cv/Header.svelte';
</script>

<svelte:head>
	<html lang="en-us" />
	<title>Julien Pradet's Resume</title>
	<meta
		name="description"
		content="I am a web developer, happy to explore many fields, and looking for ways to solve the users' problems."
	/>
	<link rel="alternate" href="/cv/" hreflang="fr-fr" />
</svelte:head>

<Header translationHref="/cv" translationHreflang="fr-fr" translationLang="fr">
	<svelte:fragment slot="title"
		>Staff Engineer <span class="inline-block">(Focused&nbsp;on&nbsp;Front-End)</span
		></svelte:fragment
	>
	<svelte:fragment slot="translation">
		Afficher la version <strong><span>française</span></strong>
	</svelte:fragment>
	<svelte:fragment slot="moto">
		I care about <strong><span>kindness</span></strong> and
		<strong><span>sharing</span></strong>.<br />
		I am an <strong><span>empathetic team player</span></strong> with strong communication skills.
	</svelte:fragment>
</Header>

<Section title="Work Experience">
	<Experience lang="en-US" startDate={new Date('2021-04-06')} title="SINGULART" type="Remote">
		<h4>
			Staff Front-End Engineer &ndash; 1st online art gallery representing over 10,000 artists
			worldwide
		</h4>
		<p>
			My role went from Senior Engineer to Staff Engineer in a team that scaled from 5 to 25
			persons:
		</p>
		<ul>
			<li>
				Structured best practices in Front-End development (Components, Atomic Design,
				<abbr title="Block Element Modifier">BEM</abbr>, automated tests, CI, etc.)
			</li>
			<li>
				Architect on strategic product projects (product minded feedbacks, progressive delivery, AB
				tests analysis)
			</li>
			<li>
				Improved Web Performance and Core Web Vitals (Mobile <abbr title="Largest Contentful Paint"
					>LCP</abbr
				>
				{'<'} 2.4s from 65% to 92%)
			</li>
			<li>
				Proposals & development of tools to improve back/front collaboration & efficiency (<abbr
					title="Request For Comments">RFC</abbr
				>, <abbr title="Architecture Decision Record">ADR</abbr>, Roadmaps)
			</li>
			<li>
				Led the Front-End Guild owning the creation and the progressive adoption of the Design
				System
			</li>
			<li>Recruted the Front-End team (technical tests & interviews)</li>
			<li>
				Mentored 15 Front-End & Full-Stack developers (trainings, internal meetups, reviews, pair
				programming)
			</li>
		</ul>
	</Experience>
	<Experience
		lang="en-US"
		startDate={new Date('2018-12-01')}
		endDate={new Date('2021-03-31')}
		title="Front-Commerce"
		type="Remote"
	>
		<h4>
			Front-End Software Engineer &ndash; A developer tool enabling the usage of headless eCommerce
			services
		</h4>
		<ul>
			<li>eCommerce themes & Design System (React, Sass, Apollo, Storybook…)</li>
			<li>Advanced JavaScript tooling (Webpack, SSR, tests…)</li>
			<li>Advanced GraphQL API (NodeJS, Redis, Elasticsearch…)</li>
		</ul>
		<h4>Lead the development of the tooling</h4>
		<ul>
			<li>Evaluted and recommended many of the technologies currently in use</li>
			<li>Kept the stack up to date, following the evolution of the ecosystem</li>
			<li>
				Always watching technologies around the Front-End ecosystem (frameworks, bundlers, JAMStack,
				Web perf…)
			</li>
		</ul>
		<h4>Trained developers and provided support to the teams relying on our product</h4>
		<ul>
			<li>Remote and inhouse trainings</li>
			<li>Support and consulting on client cases</li>
			<li>Documentation and tutorials</li>
			<li>Provided easy to follow migration paths</li>
		</ul>
	</Experience>
	<Experience
		lang="en-US"
		startDate={new Date('2016-03-07')}
		endDate={new Date('2020-02-01')}
		title="Occitech"
	>
		<h4>
			Full-Stack Software Engineer &ndash; Developing web applications & eCommerce websites for
			external clients (React, PHP, Symfony, Magento…)
		</h4>
		<ul>
			<li>Translated the business needs of the clients into technical solutions</li>
			<li>
				Adapted to complex environments using well architectured solutions (Event Sourcing, CQRS…)
			</li>
		</ul>
	</Experience>

	<Experience
		lang="en-US"
		startDate={new Date('2015-05-01')}
		endDate={new Date('2016-03-01')}
		title="Capgemini"
	>
		<h4>
			Full-Stack Software Engineer &ndash; Web Front-Office for one of the Ministry of the Armed
			Forces's services (PHP, Symfony)
		</h4>
	</Experience>

	<Experience
		lang="en-US"
		startDate={new Date('2014-04-01')}
		endDate={new Date('2014-09-01')}
		title="Kerdos-Energy"
	>
		<h4>
			Internship &ndash; Developed a platform referencing solutions to improve energy consumptions
			(PHP, MySQL, Javascript)
		</h4>
	</Experience>
</Section>

<Section title="Education and Training">
	<Formation lang="en-US" startDate={new Date('2012-09-01')} endDate={new Date('2015-10-01')}>
		<h4>École Internationale des Sciences du Traitement de l’Information - EISTI</h4>
		<p>Computer Science school delivering the renowned Engineer title in France</p>
		<p>School renamed to Cy Tech - <a href="https://cytech.cyu.fr/">https://cytech.cyu.fr/</a></p>
	</Formation>
	<Formation lang="en-US" startDate={new Date('2010-09-01')} endDate={new Date('2012-07-01')}>
		<h4>Lycée Louis Barthou</h4>
		<p>Undergraduate studies to prepare for competitive entry exams to engineering schools</p>
	</Formation>
</Section>

<Section title="Technical Skills">
	<Competence type="Paradigms">
		<p>
			Programmation Fonctionnelle, Programmation Réactive,{' '}
			<abbr title="Programmation Orienté Objet">POO</abbr>
		</p>
	</Competence>
	<Competence type="Languages">
		<p>JavaScript, HTML, CSS, PHP, Java, OCaml</p>
	</Competence>
	<Competence type="Web">
		<p>React, RxJS, Babel, Webpack, Jest, Vite, Vitest, Cypress, Svelte, Next</p>
		<p>Symfony, Express, Fastify</p>
	</Competence>
</Section>

<Section title="Conferences (non exhaustive)">
	<Conference lang="en-US" date={new Date('2020-09-27')}>
		<a slot="conf" href="https://france.sveltesociety.dev/">Svelte Society FR</a>
		<svelte:fragment slot="children">
			<h4>How to translate your application for only 1kb of JS</h4>
			<p>
				<a href="https://www.youtube.com/watch?v=aY-e0Ph4ub0">
					https://www.youtube.com/watch?v=aY-e0Ph4ub0
				</a>
			</p>
		</svelte:fragment>
	</Conference>
	<Conference lang="en-US" date={new Date('2018-11-20')}>
		<a slot="conf" href="https://react-toulouse.js.org/meetup/4/">React Toulouse</a>

		<svelte:fragment slot="children">
			<h4>Transforming Storybook into a Design System</h4>
			<p>
				<a href="https://www.youtube.com/watch?v=lVwTOb9Nn18">
					https://www.youtube.com/watch?v=lVwTOb9Nn18
				</a>
			</p>
		</svelte:fragment>
	</Conference>
	<Conference lang="en-US" date={new Date('2017-06-12')}>
		<a slot="conf" href="http://toulouse.aperoweb.fr/">Aperoweb Toulouse</a>

		<svelte:fragment slot="children">
			<h4>Performant animations</h4>
			<p>
				<a href="https://julienpradet.github.io/slides/animations-performantes/">
					https://julienpradet.github.io/slides/animations-performantes/
				</a>
			</p>
		</svelte:fragment>
	</Conference>
</Section>

<Section title="Side Projects">
	<Projet name="Generative art">
		<h4>
			<a href="https://portfolio.julienpradet.fr/">https://portfolio.julienpradet.fr/</a>
		</h4>
		<p>Generate artistic images from homemade algorithms and code.</p>
	</Projet>
	<Projet name="Blog">
		<h4>
			<a href="https://www.julienpradet.fr/">https://www.julienpradet.fr/</a>
		</h4>
		<p>A blog where I share my knownledge and experiences related to the web.</p>
	</Projet>
	<Projet name="Side projects">
		<h4>
			<a href="https://github.com/JulienPradet"> https://github.com/JulienPradet </a>
		</h4>
		<p>
			I often publish new projects on github to have a playground allowing me to discover new
			technologies. (Animation library, Design System tool,{' '}
			<abbr title="Static Site Generator">SSG</abbr>…)
		</p>
	</Projet>
	<Projet name="Ter Aelis">
		<h4>
			<a href="http://ter-aelis.fr/">http://ter-aelis.fr/</a>
		</h4>
		Created a community forum using Symfony for an artists assocation.
	</Projet>
</Section>

<Section title="Additional information">
	<Info type="Languages">
		<p>French (native), English (TOEIC: 945/990)</p>
	</Info>
	<Info type="Hobbies">
		<p>Illustration, Design and Sculpture</p>
		<ul>
			<li>2D : Photoshop, Illustrator</li>
			<li>3D : Blender, Clay</li>
			<li>Generative art : Canvas, WebGL, SVG</li>
		</ul>
	</Info>

	<Info type="Other">
		<p>Lived 9 years aboard: Scotland, Indonesia, United Arab Emirates (Dubaï)</p>
	</Info>
</Section>

<style>
	.inline-block {
		display: inline-block;
	}
</style>
