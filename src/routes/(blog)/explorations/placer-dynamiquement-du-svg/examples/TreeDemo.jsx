// @ts-nocheck
import React from 'react';

const width = 80;
const height = 30;

const Node = () => null;

Node.getContext = (props) => {
	// Contexte du noeud sans ses enfants
	const parentContext = {
		width: 80,
		height: 30,
		element: (
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
		)
	};

	if (!props.children) {
		return parentContext;
	}

	// Contexte des enfants du noeud
	let childrenContext = {
		width: 0,
		height: 0,
		children: []
	};

	// Chaque enfant vient ajouter sa largeur
	// et sa hauteur au context global
	props.children.forEach((child, index) => {
		if (child.type === Node) {
			const childContext = Node.getContext(child.props);

			// Chaque enfant est décallé vers la gauche
			// en fonction du nombre d'enfant qui le précède.
			// Sinon, les enfants se superposent
			const childElement = (
				<g key={index} transform={`translate(${childrenContext.width}, 0)`}>
					{childContext.element}
				</g>
			);
			childrenContext.children.push(childElement);

			// Maintenat qu'il y a un nouvel enfant, on
			// indique au contexte qu'il faudra décaler
			// le suivant d'un peu plus sur la droite.
			childrenContext.width += childContext.width;

			// La hauteur de tous les enfants est égale
			// a la plus grande des hauteurs de chaque enfant
			childrenContext.height = Math.max(childrenContext.height, childContext.height);
		} else {
			console.warn("Type d'enfant inconnu", child);
		}
	});

	const parentHorizontalMargin = childrenContext.width / 2 - parentContext.width / 2;

	const childrenVerticalMargin = parentContext.height;

	return {
		// Les enfants sont en dessous, donc la largeur
		// totale est le max entre la largeur du parent
		// et des enfants
		width: Math.max(parentContext.width, childrenContext.width),
		// Les enfants sont en dessous, donc les hauteurs
		// s'additionnent.
		height: parentContext.height + childrenContext.height,
		// On reconstruit l'élément complet en ajoutant
		// des transformations pour placer les enfants
		// sous le parent et le parent au milieu de sa
		// ligne
		element: (
			<g>
				<g transform={`translate(${parentHorizontalMargin}, 0)`}>{parentContext.element}</g>
				<g transform={`translate(0, ${childrenVerticalMargin})`}>{childrenContext.children}</g>
			</g>
		)
	};
};

const Tree = (props) => {
	const nodeElement = props.children;

	let context;
	if (nodeElement.type === Node) {
		context = Node.getContext(nodeElement.props);
	} else {
		// Je ne connais le composant fils
		// alors je n'affiche rien
		return null;
	}

	return <svg viewBox={`0 0 ${context.width} ${context.height}`}>{context.element}</svg>;
};

const Demo = () => {
	return (
		<Tree>
			<Node name="Camille">
				<Node name="Bob" />
				<Node name="Alice" />
			</Node>
		</Tree>
	);
};

export default Demo;
