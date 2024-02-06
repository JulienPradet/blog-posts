import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: "Comment utiliser l'API View Transitions ? Du hello world aux cas complexes.",
	date: new Date('2024-02-06'),
	description: `Animer le contenu de son site web, c'est à la fois tellement compliqué et tellement important pour avoir un site quali. A l'aube des View Transitions, ça va peut-être devenir plus simple. Voyons comment ça fonctionne en détail, au delà du hello world.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
