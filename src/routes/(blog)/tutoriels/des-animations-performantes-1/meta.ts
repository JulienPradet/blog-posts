import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Des animations performantes - Partie 1',
	date: new Date('2017-02-17'),
	description: `Faire des animations, c'est cool. Faire des animations qui ne lag pas, c'est mieux. Voici la première des trois techniques dont je vais vous parler.`,
	category: ArticleCategory.tutoriels,
	redirect: ['/posts/des-animations-performantes-1'],
	next: '/tutoriels/des-animations-performantes-2'
};

export default meta;
