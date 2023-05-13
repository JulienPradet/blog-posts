import { ArticleCategory } from '../../../components/ArticleCategory';
import type { CategoryMeta } from '../../../components/ArticleMeta';

const meta: CategoryMeta = {
	type: 'category',
	title: 'Fiches techniques',
	description: `Les fiches techniques de Julien Pradet. Ce sont des mémos qui permettent de savoir comment fonctionne une certaine technique. Les explications peuvent être partielles, mais des exemples fonctionnels sont mis à disposition.`,
	filter: (meta) => meta.category === ArticleCategory['fiches-techniques'],
	category: ArticleCategory['fiches-techniques'],
	date: new Date('2017-09-22')
};

export default meta;
