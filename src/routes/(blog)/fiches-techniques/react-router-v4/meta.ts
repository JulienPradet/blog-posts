import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'React Router V4',
	date: new Date('2017-02-03'),
	description: `La librairie la moins concurrencée de l'écosystème React se refond. Cette fois elle embrasse totalement l'esprit React. Pourquoi c'est cool ?`,
	category: ArticleCategory['fiches-techniques'],
	redirect: ['/posts/react-router-v4']
};

export default meta;
