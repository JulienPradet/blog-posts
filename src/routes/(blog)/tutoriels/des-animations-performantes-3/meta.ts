import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Des animations performantes - Partie 3',
	date: new Date('2017-03-03'),
	description: `Faire des animations, c'est cool. Faire des animations qui ne lag pas, c'est mieux. Troisème partie, axée JavaScript.`,
	category: ArticleCategory.tutoriels,
	redirect: ['/posts/des-animations-performantes-3'],
	prev: '/tutoriels/des-animations-performantes-2'
};

export default meta;
