<script lang="ts">
	import { html as introduction } from './introduction.md';
	import { html as tldr } from './tl-dr.md';
	import { html as cssTransition1 } from './css-transition1.md';
	import { html as cssTransition2 } from './css-transition2.md';
	import { html as cssTransition3 } from './css-transition3.md';
	import cssTransitionSimpleCode from './css-transition-simple.css?inline';
	import cssTransitionFullCode from './css-transition-full.css?inline';
	import { html as howItWorks } from './how-it-works.md';
	import { html as whatAboutLayout1 } from './what-about-layout1.md';
	import { html as whatAboutLayout2 } from './what-about-layout2.md';
	import whatAboutLayoutHtmlCode from './what-about-layout-html.txt?raw';
	import whatAboutLayoutCssCode from './what-about-layout-css.txt?raw';
	import HoverButton from './HoverButton.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import TabCode from '../../../../components/TabCode.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/tutoriels/des-animations-performantes-1/" />

<Headline headline="Des animations performantes - Partie 1" subtitle="vendredi 17 février 2017" />

<MainContent>
	<Content>
		<Prism>
			{@html introduction}
			{@html tldr}
			{@html cssTransition1}
			<HoverButton />
			{@html cssTransition2}
			<TabCode
				tabs={[
					{ label: 'Simplifié', code: cssTransitionSimpleCode },
					{ label: 'Complet', code: cssTransitionFullCode }
				]}
			/>
			{@html cssTransition3}
			{@html howItWorks}
			{@html whatAboutLayout1}
			<TabCode
				tabs={[
					{ label: 'HTML', code: whatAboutLayoutHtmlCode },
					{ label: 'CSS', code: whatAboutLayoutCssCode }
				]}
			/>
			{@html whatAboutLayout2}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
