<script lang="ts">
	import Content from '../../../../components/Content.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import { html as content } from './content.md';
	import meta from './meta';
</script>

<Meta {meta} location="/autres/changement-de-rythme/" />

<Headline headline="Changement de rythme" subtitle="vendredi 6 janvier 2017" />

<MainContent>
	<Content>
		{@html content}
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
