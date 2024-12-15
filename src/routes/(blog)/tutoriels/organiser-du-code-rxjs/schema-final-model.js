import React from 'react';
import { Viz, Line, SkipElement, StartElement, Element } from '../../../site/Viz';

const SendMessageViz = () => {
	const viz = (
		<Viz>
			<Line legend="receiveMessage$">
				<Element
					color="#b7e"
					preview="r1"
					value={{
						action: 'ajouter_message',
						message: { content: 'Bonjour!', type: 'received_message' }
					}}
				/>
				<SkipElement />
				<SkipElement />
				<Element
					color="#7be"
					preview="r2"
					value={{
						action: 'ajouter_message',
						message: { content: 'Comment ça va ?', type: 'received_message' }
					}}
				/>
			</Line>
			<Line legend="optimisticSendMessage$">
				<SkipElement />
				<Element
					color="#7eb"
					preview="s1"
					value={{
						action: 'ajouter_message',
						message: {
							content: 'Salut !',
							is_confirmed: false,
							type: 'sent_message'
						}
					}}
				/>
				<SkipElement />
				<SkipElement />
				<Element
					color="#be7"
					preview="s2"
					value={{
						action: 'ajouter_message',
						message: {
							content: 'Ca va et toi ?',
							is_confirmed: false,
							type: 'sent_message'
						}
					}}
				/>
			</Line>
			<Line legend="confirmSentMessage$">
				<SkipElement />
				<SkipElement />
				<Element
					color="#7eb"
					preview="c1"
					value={{
						action: 'confirmer_message',
						message: {
							content: 'Salut !',
							is_confirmed: true,
							type: 'sent_message'
						}
					}}
				/>
				<SkipElement />
				<SkipElement />
				<Element
					color="#be7"
					preview="c2"
					value={{
						action: 'confirmer_message',
						message: {
							content: 'Ca va et toi ?',
							is_confirmed: true,
							type: 'sent_message'
						}
					}}
				/>
			</Line>
			<Line legend="model$">
				<StartElement preview="[]" />
				<Element
					color="#b7e"
					preview="[.]"
					value={[{ content: 'Bonjour !', type: 'received_message' }]}
				/>
				<Element
					color="#7eb"
					preview="[..]"
					value={[
						{ content: 'Bonjour !', type: 'received_message' },
						{ content: 'Salut !', type: 'sent_message', is_confirmed: false }
					]}
				/>
				<Element
					color="#7eb"
					preview="[..]"
					value={[
						{ content: 'Bonjour !', type: 'received_message' },
						{ content: 'Salut !', type: 'sent_message', is_confirmed: true }
					]}
				/>
				<Element
					color="#7be"
					preview="[...]"
					value={[
						{ content: 'Bonjour !', type: 'received_message' },
						{ content: 'Salut !', type: 'sent_message', is_confirmed: true },
						{ content: 'Comment ça va ?', type: 'received_message' }
					]}
				/>
				<Element
					color="#be7"
					preview="[....]"
					value={[
						{ content: 'Bonjour !', type: 'received_message' },
						{ content: 'Salut !', type: 'sent_message', is_confirmed: true },
						{ content: 'Comment ça va ?', type: 'received_message' },
						{
							content: 'Ca va et toi ?',
							type: 'sent_message',
							is_confirmed: false
						}
					]}
				/>
				<Element
					color="#be7"
					preview="[....]"
					value={[
						{ content: 'Bonjour !', type: 'received_message' },
						{ content: 'Salut !', type: 'sent_message', is_confirmed: true },
						{ content: 'Comment ça va ?', type: 'received_message' },
						{
							content: 'Ca va et toi ?',
							type: 'sent_message',
							is_confirmed: true
						}
					]}
				/>
			</Line>
		</Viz>
	);

	return viz;
};

export default SendMessageViz;
