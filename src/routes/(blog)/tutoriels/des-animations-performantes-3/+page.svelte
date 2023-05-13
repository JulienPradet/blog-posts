<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import Demo from '../../../../components/Demo.svelte';
	import Code from '../../../../components/Code.svelte';
	import { html as introduction } from './introduction.md';
	import { html as tldr } from './tl-dr.md';
	import { html as layout } from './pourquoi-layout.md';
	import { html as layout2 } from './pourquoi-layout-2.md';
	import { html as layout3 } from './pourquoi-layout-3.md';
	import { html as layout4 } from './pourquoi-layout-4.md';
	import { html as layout5 } from './pourquoi-layout-5.md';
	import { html as eviter } from './eviter-layout.md';
	import { html as eviter2 } from './eviter-layout-2.md';
	import { html as eviter3 } from './eviter-layout-3.md';
	import { html as animation } from './animation.md';
	import { html as animation2 } from './animation-2.md';
	import { html as conclusion } from './conclusion.md';
	import layoutThrashingCode from './layout-thrashing.js.code?raw';
	import noLayoutThrashingCode from './no-layout-thrashing.js.code?raw';
	import noLayoutThrashingRafCode from './no-layout-thrashing-raf.js.code?raw';
	import rafLoopCode from './raf-loop.js.code?raw';
	import InterruptAnimation from './InterruptAnimation.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/tutoriels/des-animations-performantes-3/" />

<Headline headline="Des animations performantes - Partie 3" subtitle="vendredi 3 mars 2017" />

<MainContent>
	<Content>
		<Prism>
			{@html introduction}
			{@html tldr}
			{@html layout}
			<Demo><InterruptAnimation length={3} /></Demo>
			{@html layout2}
			<Demo><InterruptAnimation length={3} checkStart /></Demo>
			{@html layout3}
			<Code>{layoutThrashingCode}</Code>
			{@html layout4}
			<Demo><InterruptAnimation length={400} checkStart /></Demo>
			{@html layout5}
			{@html eviter}
			<Code>{noLayoutThrashingCode}</Code>
			{@html eviter2}
			<Code>{noLayoutThrashingRafCode}</Code>
			{@html eviter3}
			<Demo>
				<InterruptAnimation length={400} checkStart withoutLayoutThrashing />
			</Demo>
			{@html animation}
			<Code>{rafLoopCode}</Code>
			{@html animation2}
			{@html conclusion}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
