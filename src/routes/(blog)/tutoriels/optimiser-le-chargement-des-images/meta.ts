import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Optimiser les images sur le web : checklist des bonnes pratiques',
	date: new Date('2023-07-24'),
	description: `Les images, sûrement une des premières choses qu'on pense à optimiser quand on parle de performance web. On les passe par exemple dans une moulinette pour diminuer leur poids, mais est-ce suffisant ? Dans cet article je liste tout ce qu'il faut savoir quand vous ajoutez une nouvelle image dans votre HTML.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
