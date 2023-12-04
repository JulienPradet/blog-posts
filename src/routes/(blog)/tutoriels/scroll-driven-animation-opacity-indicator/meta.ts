import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Utiliser les Scroll Driven Animations en CSS comme indicateur de scroll',
	date: new Date('2023-12-04'),
	description: `Une nouvelle API débarque dans les navigateurs : les Scroll Driven Animations. Plus besoin de JS pour changer le style de vos élements en fonction du scroll. Voyons ça en détail avec un exemple d'indicateur de scroll.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
