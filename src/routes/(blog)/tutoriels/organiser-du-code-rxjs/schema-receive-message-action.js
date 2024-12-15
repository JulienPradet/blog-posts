import React from 'react';
import { Viz, Line, Element } from '../../../site/Viz';

const ReceiveMessageViz = () => {
	const viz = (
		<Viz>
			<Line legend="receiveServerMessage$">
				<Element value={{ content: 'Bonjour !' }} preview="m1" color="#b7e" />
				<Element value={{ content: 'Comment ça va ?' }} preview="m2" color="#7be" />
			</Line>
			<Line legend="receiveMessage$">
				<Element
					color="#b7e"
					preview="r1"
					value={{
						action: 'ajouter_message',
						message: { content: 'Bonjour !', type: 'received_message' }
					}}
				/>
				<Element
					color="#7be"
					preview="r1"
					value={{
						action: 'ajouter_message',
						message: { content: 'Comment ça va ?', type: 'received_message' }
					}}
				/>
			</Line>
		</Viz>
	);

	return viz;
};

export default ReceiveMessageViz;
