<script lang="ts">
	import Headline from '../../../components/Headline.svelte';
	import MainContent from '../../../components/MainContent.svelte';
	import Content from '../../../components/Content.svelte';
	import meta from './meta';
	import FollowIncentive from '../../../components/FollowIncentive.svelte';
	import Meta from '../../../components/Meta.svelte';
</script>

<Meta {meta} location="/conferences/" />

<Headline headline="Conférences" />

<Content>
	<p>Liste des conférences que j'ai pu donner sur des sujets tech.</p>

	<p>
		J'ai aussi eu l'occasion de faire des livestream sur <a
			href="https://www.twitch.tv/superroipatate">Twitch</a
		>, principalement pendant l'autonmne/hiver 2021-2022. Certains replay sont disponible sur
		<a href="https://www.youtube.com/@julienpradet1320">YouTube</a>.
	</p>
</Content>

<MainContent>
	<Content>
		<ul>
			<li>
				<a href="https://www.youtube.com/watch?v=aY-e0Ph4ub0">
					Internationaliser son application avec Svelte
				</a>
				&ndash; <time>Septembre 2020</time>
			</li>
			<li>
				<a href="https://julienpradet.github.io/slides/storybook-design-system/">
					Passer de Storybook à un Design System
				</a>
				&ndash; <time>Novembre 2018</time>
			</li>
			<li>
				<a href="https://julienpradet.github.io/slides/animations-performantes/">
					Animations performantes
				</a>
				&ndash; <time>Juin 2017</time>
			</li>
			<li>
				<a href="https://julienpradet.github.io/slides/separtion-composants/">
					Comment séparer ses composants ?
				</a>
				&ndash; <time>Avril 2017</time>
			</li>
			<li>
				<a href="https://julienpradet.github.io/slides/hoc/"> Higher Order Components </a>
				&ndash; <time>Janvier 2017</time>
			</li>
		</ul>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
