// @ts-nocheck
import React from 'react';
import {
	Viz,
	Line,
	StartElement,
	SkipElement,
	Element,
	ObservableElement
} from '../../../../components/Viz';

const firstColor = '#5C6BC0';
const secondColor = '#9CCC65';

const SendMessageViz = () => {
	const viz = (
		<Viz>
			<Line legend="sendMessageRequest$">
				<Element
					color={firstColor}
					preview="req1"
					value={{
						action: 'send_message',
						message: { content: 'Bonjour !' }
					}}
				/>
				<SkipElement />
				<Element
					color={secondColor}
					preview="req2"
					value={{
						action: 'send_message',
						message: { content: 'Comment ça va ?' }
					}}
				/>
			</Line>
			<Line legend="sendMessageResponse$$">
				<ObservableElement color={firstColor}>
					<Element
						preview="rep1"
						value={{
							content: 'Bonjour !',
							type: 'sent_message'
						}}
					/>
				</ObservableElement>
				<SkipElement />
				<ObservableElement color={secondColor}>
					<Element
						preview="rep2"
						value={{
							content: 'Comment ça va ?',
							type: 'sent_message'
						}}
					/>
				</ObservableElement>
			</Line>
			<Line legend="sentMessage$">
				<SkipElement />
				<Element
					color={firstColor}
					preview="rep1"
					value={{
						content: 'Bonjour !',
						type: 'sent_message'
					}}
				/>
				<SkipElement />
				<Element
					color={secondColor}
					preview="rep2"
					value={{
						content: 'Comment ça va ?',
						type: 'sent_message'
					}}
				/>
			</Line>
			<Line legend="sentMessageList$">
				<StartElement preview="[]" />
				<SkipElement />
				<Element
					color={firstColor}
					preview="[.]"
					value={[
						{
							content: 'Bonjour !',
							type: 'sent_message'
						}
					]}
				/>
				<SkipElement />
				<Element
					color={secondColor}
					preview="[..]"
					value={[
						{
							content: 'Bonjour !',
							type: 'sent_message'
						},
						{
							content: 'Comment ça va ?',
							type: 'sent_message'
						}
					]}
				/>
			</Line>
		</Viz>
	);

	return viz;
};

export default SendMessageViz;
