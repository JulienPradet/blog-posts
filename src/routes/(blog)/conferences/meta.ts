import { ArticleCategory } from '../../../components/ArticleCategory';
import type { CategoryMeta } from '../../../components/ArticleMeta';

const meta: CategoryMeta = {
	type: 'category',
	title: 'Conférences',
	description: `Liste des conférences données par Julien Pradet.`,
	filter: () => false,
	category: ArticleCategory.conferences,
	date: new Date()
};

export default meta;
