// @ts-nocheck
import React from 'react';
import getChildrenContext from './getChildrenContext';

const tileDefinition = {
	x: 0,
	y: 0,
	width: 80,
	height: 30,
	strokeWidth: 1,
	stroke: '#484848',
	fill: 'white'
};

const HORIZONTAL_PADDING = 10;
const VERTICAL_PADDING = 20;

const NodeTile = (props) => {
	return (
		<g>
			<clipPath id={`node-clip-${1}`}>
				<rect
					x={1}
					y={1}
					width={tileDefinition.width - 2}
					height={tileDefinition.height - 2}
					strokeWidth={1}
					stroke="#484848"
					fill="white"
					rx={5}
					ry={5}
				/>
			</clipPath>
			<rect
				x={1}
				y={1}
				width={tileDefinition.width - 2}
				height={tileDefinition.height - 2}
				strokeWidth={1}
				stroke="#484848"
				fill="white"
				rx={5}
				ry={5}
			/>
			<text
				clipPath={`url(#node-clip-${1})`}
				x={tileDefinition.width / 2}
				y={tileDefinition.height / 2 + 1}
				textAnchor="middle"
				alignmentBaseline="middle"
				fontSize={14}
			>
				{props.name}
			</text>
		</g>
	);
};

const addNodeToContext = (context, nodeContext) => {
	if (!nodeContext.element.key) {
		console.warn('Node element should return a key');
	}

	return {
		width: context.width + HORIZONTAL_PADDING + nodeContext.width,
		height: Math.max(context.height, nodeContext.height),
		anchors: [
			...context.anchors,
			{
				x: context.width + HORIZONTAL_PADDING + nodeContext.width / 2,
				y: 0
			}
		],
		children: [
			...context.children,
			<g
				key={nodeContext.element.key}
				transform={`translate(${context.width + HORIZONTAL_PADDING}, 0)`}
			>
				{nodeContext.element}
			</g>
		]
	};
};

const computeContext = (props) => {
	const parentContext = {
		width: tileDefinition.width,
		height: tileDefinition.height,
		element: <NodeTile key={props.name} {...props} />
	};

	const childrenContext = getChildrenContext(
		(context, childContext) => {
			if (childContext.__type === Node) {
				return addNodeToContext(context, childContext);
			} else {
				console.warn('Unkown child context type', childContext.__type);
			}
		},
		{
			width: -HORIZONTAL_PADDING,
			height: 0,
			anchors: [],
			children: []
		},
		props.children
	);

	if (childrenContext.children.length > 0) {
		return {
			width: Math.max(parentContext.width, childrenContext.width),
			height: parentContext.height + VERTICAL_PADDING + childrenContext.height,
			element: (
				<g key={parentContext.element.key}>
					<g transform={`translate(${childrenContext.width / 2 - parentContext.width / 2}, 0)`}>
						{parentContext.element}
					</g>
					<g transform={`translate(0, ${parentContext.height + VERTICAL_PADDING})`}>
						{childrenContext.children}
					</g>
					<g transform={`translate(0, ${parentContext.height})`}>
						{childrenContext.anchors.map((anchor, index) => (
							<line
								key={index}
								x1={childrenContext.width / 2}
								y1={-1}
								x2={anchor.x}
								y2={VERTICAL_PADDING + anchor.y + 1}
								stroke="#484848"
								strokeWidth={1}
							/>
						))}
					</g>
				</g>
			)
		};
	} else {
		return parentContext;
	}
};

const Node = () => null;

Node.getContext = (props) => {
	return computeContext(props);
};

export default Node;
