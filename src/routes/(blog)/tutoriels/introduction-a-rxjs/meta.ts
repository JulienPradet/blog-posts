import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Introduction à RxJS',
	date: new Date('2017-05-11'),
	description: `Le but de cet article est d'apprendre à utiliser RxJS en comprenant comment ça marche et en utilisant le minimum d'outils.`,
	category: ArticleCategory.tutoriels,
	redirect: ['/posts/introduction-a-rxjs']
};

export default meta;
