import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'SudWeb 2018',
	date: new Date('2018-06-09'),
	description: `J'ai trouvé ça cool. Voilà un petit retour d'expérience pour vous montrer un peu comment j'ai vécu tout ça.`,
	category: ArticleCategory.autres
};

export default meta;
