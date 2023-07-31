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
	import DemoFont from './DemoFont.svelte';
</script>

<Meta {meta} location="/tutoriels/optimiser-le-chargement-des-fonts/" />

<Headline headline={meta.title} subtitle="lundi 31 juillet 2023" />

<MainContent>
	<Content>
		<Prism>
			{@html content}
			<DemoFont />
			{@html content2}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
