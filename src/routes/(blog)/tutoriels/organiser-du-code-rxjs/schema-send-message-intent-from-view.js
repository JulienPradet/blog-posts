import React from 'react';
import { Viz, Line, Element, SkipElement, ObservableElement } from '../../../site/Viz';

const ReceiveMessageViz = () => {
	const viz = (
		<Viz>
			<Line legend="view$">
				<Element
					color="#7eb"
					preview="v1"
					value={`{
  submitMessageEvent$: ...
}`}
				/>
				<SkipElement />
				<Element
					color="#be7"
					preview="v2"
					value={`{
  submitMessageEvent$: ...
}`}
				/>
			</Line>
			<Line legend="submitMessageEvent$$">
				<ObservableElement color="#7eb">
					<Element
						preview="e1"
						value={`{
  target: ...
}`}
					/>
				</ObservableElement>
				<SkipElement />
				<ObservableElement color="#be7">
					<Element
						preview="e2"
						value={`{
  target: ...
}`}
					/>
				</ObservableElement>
			</Line>
			<Line legend="submitMessageEvent$">
				<SkipElement />
				<Element
					color="#7eb"
					preview="e1"
					value={`{
  target: ...
}`}
				/>
				<SkipElement />
				<Element
					color="#be7"
					preview="e2"
					value={`{
  target: ...
}`}
				/>
			</Line>
			<Line legend="sendMessageIntent$">
				<SkipElement />
				<Element color="#7eb" preview="m1" value={{ content: 'Salut!' }} />
				<SkipElement />
				<Element color="#be7" preview="m2" value={{ content: 'Ca va et toi ?' }} />
			</Line>
		</Viz>
	);

	return viz;
};

export default ReceiveMessageViz;
