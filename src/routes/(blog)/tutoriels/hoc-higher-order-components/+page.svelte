<script lang="ts">
	import Content from '../../../../components/Content.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import { html as content } from './content.md';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/tutoriels/hoc-higher-order-components/" />

<Headline headline="HOC pour Higher Order Component" subtitle="vendredi 27 janvier 2017" />

<MainContent>
	<Content>
		<Prism>
			{@html content}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
