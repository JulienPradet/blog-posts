import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Comment diagnostiquer et corriger du Cumulative Layout Shift (CLS) ?',
	date: new Date('2023-08-14'),
	description: `On a tous en tête ces sites qui clignotent dans tous les sens pendant leur chargement. Cet effet se mesure via le Cumulative Layout Shift. Qu'est-ce que c'est exactement ? Comment le diagnostiquer ? Quelles bonnes pratiques avoir en tête ?`,
	category: ArticleCategory['tutoriels']
};

export default meta;
