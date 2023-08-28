<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import { html as content } from './content.md';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/fiches-techniques/aligner-avec-css-grid-et-display-contents/" />

<Headline headline={meta.title} subtitle="lundi 28 août 2023" />

<MainContent>
	<Content>
		<Prism>
			{@html content}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
