import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Optimiser le chargement des icones',
	date: new Date('2023-08-07'),
	description: `Quand votre site grossit, le nombre d'icones et leur poids augmente. Ils finissent par impacter vos performances et ralentissent le chargement de vos pages. Comment faire pour limiter l'impact de ceux-ci et faire face à un Design System qui grossit ?`,
	category: ArticleCategory['tutoriels']
};

export default meta;
