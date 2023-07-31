import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Optimiser le chargement des webfonts',
	date: new Date('2023-07-31'),
	description: `Quand on parle de charte graphique, les polices d'écritures arrivent rapidement sur la table. Comment respecter celles-ci tout en gardant un site rapide ? Format, Subsetting, Fallback, j'essaye de vous fournir la recette idéale pour vous en sortir.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
