<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import { html as content } from './content.md';
	import { html as content2 } from './content2.md';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
	import Tabs from '../../../../components/Tabs.svelte';
	import fontWithoutSizeAdjust from './screen-font-fallback-without-adjust.png';
	import fontWithSizeAdjust from './screen-font-fallback-with-adjust.png';
	import font from './screen-font.png';
</script>

<Meta {meta} location="/tutoriels/optimiser-le-chargement-des-fonts/" />

<Headline headline={meta.title} subtitle="lundi 31 juillet 2023" />

<MainContent>
	<Content>
		<Prism>
			{@html content}
			<Tabs
				tabs={[
					{ label: 'Fallback sans size-adjust', img: fontWithoutSizeAdjust },
					{ label: 'Fallback avec size-adjust', img: fontWithSizeAdjust },
					{ label: 'Font finale', img: font }
				]}
			/>
			{@html content2}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
