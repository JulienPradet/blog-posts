<script lang="ts">
	import Headline from '../../../../components/Headline.svelte';
	import MainContent from '../../../../components/MainContent.svelte';
	import Content from '../../../../components/Content.svelte';
	import Prism from '../../../../components/Prism.svelte';
	import { html as content } from './content.md';
	import { html as content2 } from './content-2.md';
	import { html as content3 } from './content-3.md';
	import { html as content4 } from './content-4.md';
	import { html as content5 } from './content-5.md';
	import { html as content6 } from './content-6.md';
	import { html as content7 } from './content-7.md';
	import React from 'react';
	import VizExample from './viz-example.jsx';
	import { Tree, Node } from './demo/index.jsx';
	import NodeDemo from './examples/NodeDemo.jsx';
	import SizedNodeDemo from './examples/SizedNodeDemo.jsx';
	import ContextNodeDemo from './examples/ContextNodeDemo.jsx';
	import TreeDemo from './examples/TreeDemo.jsx';
	import ReactWrapper from '../../../../components/ReactWrapper.svelte';
	import FollowIncentive from '../../../../components/FollowIncentive.svelte';
	import Meta from '../../../../components/Meta.svelte';
	import meta from './meta';
</script>

<Meta {meta} location="/explorations/placer-dynamiquement-du-svg/" />

<Headline
	headline="Les contextes sans les problèmes en React"
	subtitle="vendredi 13 janvier 2017"
/>

<MainContent>
	<Content>
		<Prism>
			{@html content}

			<figure>
				<ReactWrapper render={() => React.createElement(VizExample)} />
				<figcaption>Un tas de lignes avec des bulles dessus, quoi.</figcaption>
			</figure>

			{@html content2}

			<figure>
				<ReactWrapper
					render={() => {
						return React.createElement(
							Tree,
							{},
							React.createElement(Node, { key: '1', name: 'Camille' }, [
								React.createElement(Node, { key: '1', name: 'Bob' }, [
									React.createElement(Node, { key: '1', name: 'Raymonde' }, [
										React.createElement(Node, { key: '1', name: 'Jules' }, []),
										React.createElement(Node, { key: '2', name: 'Pierre' }, [])
									])
								]),
								React.createElement(Node, { key: '2', name: 'Alice' }, [
									React.createElement(Node, { key: '1', name: 'Alphonse' }, []),
									React.createElement(Node, { key: '2', name: 'Gertrude' }, [])
								])
							])
						);
					}}
				/>
				<figcaption>Un tas de lignes avec des bulles dessus, quoi.</figcaption>
			</figure>

			{@html content3}

			<figure>
				<ReactWrapper render={() => React.createElement(NodeDemo)} />
			</figure>

			{@html content4}

			<figure>
				<ReactWrapper render={() => React.createElement(SizedNodeDemo)} />
			</figure>

			{@html content5}

			<figure>
				<ReactWrapper render={() => React.createElement(ContextNodeDemo)} />
			</figure>

			{@html content6}

			<figure>
				<ReactWrapper render={() => React.createElement(TreeDemo)} />
			</figure>

			{@html content7}
		</Prism>
	</Content>

	<hr />

	<FollowIncentive />
</MainContent>
