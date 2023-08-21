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
	import before from './webtoon-before.jpg';
	import after from './webtoon-after.jpg';
</script>

<Meta {meta} location="/tutoriels/comment-detecter-du-cls/" />

<Headline headline={meta.title} subtitle="lundi 21 août 2023" />

<MainContent>
	<Content>
		<Prism>
			{@html content}
			<Tabs
				tabs={[
					{ label: 'Premier affichage', img: before },
					{ label: 'Chargement terminé', img: after }
				]}
			/>
			{@html content2}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
