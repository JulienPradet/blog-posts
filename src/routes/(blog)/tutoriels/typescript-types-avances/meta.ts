import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Maîtriser les types avancés en TypeScript',
	date: new Date('2024-03-11'),
	description: `TypeScript c'est bien, à condition de pas avoir à dupliquer les types à travers toute la codebase. Voyons les notions qui nous évitent ces problèmes.`,
	category: ArticleCategory['tutoriels'],
	prev: '/tutoriels/typescript-bonnes-pratiques/'
};

export default meta;
