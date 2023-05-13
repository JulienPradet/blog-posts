import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Introduction aux animations FLIP',
	date: new Date('2017-03-17'),
	description:
		"Voici une technique d'animation web pour ne pas (trop) se prendre la tête avec les propriétés `transform` et `opacity`. Mais est-ce vraiment une solution miracle ?",
	category: ArticleCategory.tutoriels,
	redirect: ['/posts/introduction-aux-animations-flips']
};

export default meta;
