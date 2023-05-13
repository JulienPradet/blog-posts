import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Alors, ce temps partiel ?',
	date: new Date('2017-03-31'),
	description:
		"Cela fait maintenant 3 mois que je suis passé à temps partiel et que j'ai ouvert ce blog. Conclusion ?",
	category: ArticleCategory.autres,
	redirect: ['/posts/alors-ce-temps-partiel']
};

export default meta;
