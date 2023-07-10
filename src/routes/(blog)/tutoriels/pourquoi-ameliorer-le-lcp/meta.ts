import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Pourquoi et comment améliorer le LCP de vos pages ?',
	date: new Date('2023-07-10'),
	description: `Concentrons nous sur un aspect de la performance web : le Largest Contentful Paint. Pourquoi est-ce important pour vos utilisateurices ? Quels outils utiliser pour l'analyser ?`,
	category: ArticleCategory['tutoriels']
};

export default meta;
