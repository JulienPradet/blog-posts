import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Placer dynamiquement du SVG',
	date: new Date('2017-10-27'),
	description:
		"J'aime bien faire des choses en SVG. Mais je n'aime pas placer mes éléments. Alors il faut bien trouver des solutions pour que du code le fasse à ma place.",
	category: ArticleCategory.explorations,
	redirect: ['/explorations/svg-bizarre-en-react']
};

export default meta;
