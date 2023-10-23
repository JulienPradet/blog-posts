import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Comment alléger son JavaScript',
	date: new Date('2023-10-23'),
	description: `Quand on parle web performance, dans le web d'aujourd'hui, le plus grand coupable est souvent JavaScript. Voyons ensemble les techniques pour optimiser celui-ci.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
