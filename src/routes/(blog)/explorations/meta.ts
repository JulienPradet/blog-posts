import { ArticleCategory } from '../../../components/ArticleCategory';
import type { CategoryMeta } from '../../../components/ArticleMeta';

const meta: CategoryMeta = {
	type: 'category',
	title: 'Explorations',
	description: `Les explorations de Julien Pradet. Ce sont des articles où je montre certaines de mes expérimentations qui ne sont pas toujours bonnes ou saines à reproduire.`,
	filter: (page) => page.category === ArticleCategory.explorations,
	category: ArticleCategory.explorations,
	date: new Date('2017-09-22')
};

export default meta;
