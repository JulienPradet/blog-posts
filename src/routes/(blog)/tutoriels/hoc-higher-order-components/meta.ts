import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'HOC pour Higher Order Component',
	date: new Date('2017-01-27'),
	description: `Plutôt que de vous parler pûrement de React, dans cet article, je vais plutôt essayer de présenter l'essence d'un HOC parce que ça peut aussi vous être utile dans d'autres domaines.`,
	category: ArticleCategory.tutoriels,
	redirect: ['/posts/hoc-higher-order-components']
};

export default meta;
