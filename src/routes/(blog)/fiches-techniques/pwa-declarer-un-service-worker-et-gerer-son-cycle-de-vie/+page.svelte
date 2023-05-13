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

<Meta
	{meta}
	location="/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/"
/>

<Headline
	headline="PWA : Déclarer un Service Worker et gérer son cycle de vie"
	subtitle="vendredi 8 décembre 2017"
/>

<MainContent>
	<Content>
		<Prism>
			{@html content}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
