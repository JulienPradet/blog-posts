import { ArticleCategory } from '../../../components/ArticleCategory';
import type { CategoryMeta } from '../../../components/ArticleMeta';

const meta: CategoryMeta = {
	type: 'category',
	title: 'Tutoriels',
	description: `Les tutoriels de Julien Pradet. J'y présente comment et surtout pourquoi faire les choses. Le contenu y est souvent dense et se concentre sur les bonnes pratiques plutôt que sur la technique.`,
	filter: (page) => page.category === ArticleCategory.tutoriels,
	category: ArticleCategory.tutoriels,
	date: new Date('2017-09-22')
};

export default meta;
