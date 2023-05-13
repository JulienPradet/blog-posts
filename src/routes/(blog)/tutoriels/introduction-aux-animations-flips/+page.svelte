<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import Code from '../../../../components/Code.svelte';
	import Demo from '../../../../components/Demo.svelte';
	import { html as introduction } from './introduction.md';
	import { html as flip2 } from './flip2.md';
	import flipCode from './flip.js.code?raw';
	import { html as itsAKindOfMagic } from './itsAKindOfMagic.md';
	import { html as itsAKindOfMagic2 } from './itsAKindOfMagic2.md';
	import { html as itsAKindOfMagic3 } from './itsAKindOfMagic3.md';
	import ScaleProblem from './ScaleProblem.svelte';
	import ScaleSolution from './ScaleSolution.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/tutoriels/introduction-aux-animations-flips/" />

<Headline headline="Introduction aux animations FLIP" subtitle="vendredi 17 mars 2017" />

<MainContent>
	<Content>
		<Prism>
			{@html introduction}
			<Code>{flipCode}</Code>
			{@html flip2}
			{@html itsAKindOfMagic}
			<Demo><ScaleProblem /></Demo>
			{@html itsAKindOfMagic2}
			<Demo><ScaleSolution /></Demo>
			{@html itsAKindOfMagic3}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
