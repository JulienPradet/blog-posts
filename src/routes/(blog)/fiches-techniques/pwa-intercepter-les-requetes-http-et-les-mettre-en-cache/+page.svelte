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
	location="/fiches-techniques/pwa-intercepter-les-requetes-http-et-les-mettre-en-cache/"
/>

<Headline
	headline="PWA : Intercepter les requêtes HTTP et les mettre en cache"
	subtitle="dimanche 24 décembre 2017"
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
