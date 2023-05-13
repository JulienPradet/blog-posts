import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Changement de rythme',
	date: new Date('2017-01-06'),
	description:
		"Aujourd'hui est le premier jour de mon temps partiel. Ca ne fait que 2 ans que je suis dans la vie active et pourtant j'ai fait le choix de travailler moins. Pourquoi ?",
	category: ArticleCategory.autres,
	redirect: ['/posts/changement-de-rythme']
};

export default meta;
