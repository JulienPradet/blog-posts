<script lang="ts">
	import { html as introduction } from './introduction.md';
	import { html as tldr } from './tl-dr.md';
	import { html as layers } from './layers.md';
	import { html as willChange } from './will-change.md';
	import { html as willChange2 } from './will-change-2.md';
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import Demo from '../../../../components/Demo.svelte';
	import DemoLag from './DemoLag.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/tutoriels/des-animations-performantes-2/" />

<Headline headline="Des animations performantes - Partie 2" subtitle="vendredi 24 février 2017" />

<MainContent>
	<Content>
		<Prism>
			{@html introduction}
			{@html tldr}
			{@html layers}
			<Demo><DemoLag /></Demo>
			{@html willChange}
			<Demo><DemoLag fast={true} /></Demo>
			{@html willChange2}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
