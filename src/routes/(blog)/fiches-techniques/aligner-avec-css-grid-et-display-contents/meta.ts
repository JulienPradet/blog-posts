import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Aligner des éléments avec CSS Grid et display: contents',
	date: new Date('2023-08-28'),
	description: `Dans vos maquettes, les éléments sont parfaitement alignés. Mais une fois les vrais contenus présents, rien ne va. Voyons comment, en attendant l'arrivée des subgrid, comment régler ce problème.`,
	category: ArticleCategory['fiches-techniques']
};

export default meta;
