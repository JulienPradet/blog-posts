import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Comment faire un header sticky animé et performant ?',
	date: new Date('2023-09-04'),
	description: `A l'aube des Scroll Driven Animations, est-ce la meilleure façon d'animer un header sticky ? Pas forcément. Dans ce tutoriel, je vous explique pourquoi et comment faire autrement.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
