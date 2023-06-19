import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: "Testing Library : Comment l'utiliser avec son propre framework ?",
	date: new Date('2023-06-19'),
	description: `Dans l'article précédent nous avons vu comment Testing Library pouvait améliorer nos tests front-end. Mais nous pouvons l'utiliser quelque soit le framework : démonstration avec du Twig.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
