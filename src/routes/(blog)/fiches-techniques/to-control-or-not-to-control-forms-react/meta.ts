import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Contrôler ou ne pas contrôler ses formulaires React ?',
	date: new Date('2017-04-21'),
	description: `Si vous gérez vous même vos formulaires, est-ce que ça vaut vraiment le coup de stocker les valeurs dans un composant ?`,
	category: ArticleCategory['fiches-techniques'],
	redirect: ['/posts/to-control-or-not-to-control-forms-react']
};

export default meta;
