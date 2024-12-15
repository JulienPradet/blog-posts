// @ts-nocheck
import React from 'react';

const width = 80;
const height = 30;

const Node = (props) => (
	<g>
		<rect
			x="1"
			y="1"
			width={width - 2}
			height={height - 2}
			strokeWidth="1"
			stroke="#484848"
			fill="white"
			rx={5}
			ry={5}
		/>
		<text
			x={width / 2}
			y={height / 2 + 1}
			textAnchor="middle"
			alignmentBaseline="middle"
			fill="#484848"
			fontSize={14}
		>
			{props.name}
		</text>
	</g>
);

const Tree = (props) => <svg>{props.children}</svg>;

const Demo = () => (
	<Tree>
		<Node name="Camille" />
	</Tree>
);

export default Demo;
