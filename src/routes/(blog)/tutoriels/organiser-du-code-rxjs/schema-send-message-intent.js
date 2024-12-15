import React from 'react';
import { Viz, Line, Element } from '../../../site/Viz';

const ReceiveMessageViz = () => {
	const viz = (
		<Viz>
			<Line legend="sendMessageEvent$">
				<Element color="#7eb" preview="e1" value={{ target: { sourceTarget: '...' } }} />
				<Element color="#be7" preview="e2" value={{ target: { sourceTarget: '...' } }} />
			</Line>
			<Line legend="sendMessageIntent$">
				<Element color="#7eb" preview="m1" value={{ content: 'Salut !' }} />
				<Element color="#be7" preview="m2" value={{ content: 'Ca va et toi ?' }} />
			</Line>
		</Viz>
	);

	return viz;
};

export default ReceiveMessageViz;
