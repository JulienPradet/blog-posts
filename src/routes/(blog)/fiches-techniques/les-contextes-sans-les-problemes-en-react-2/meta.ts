import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Les contextes sans les problèmes en React - Partie 2',
	date: new Date('2017-01-20'),
	description: `Nous avons vu dans le post de la semaine dernière que les contextes pouvaient poser des problèmes de mise à jour des composants. Comment peut-on les contourner ?`,
	category: ArticleCategory['fiches-techniques'],
	redirect: [
		'/posts/Les-contextes-sans-les-problemes-en-react-2',
		'/fiches-techniques/Les-contextes-sans-les-problemes-en-react-2'
	],
	prev: '/fiches-techniques/les-contextes-sans-les-problemes-en-react'
};

export default meta;
