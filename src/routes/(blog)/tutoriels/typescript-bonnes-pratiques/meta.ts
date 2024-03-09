import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: "3 Règles d'or en TypeScript",
	date: new Date('2024-03-04'),
	description: `On peut vite se retrouver avec une code base remplie de \`any\` qui ne vérifie plus grand chose. Quelles bonnes pratiques pour éviter ça ?`,
	category: ArticleCategory['tutoriels'],
	next: '/tutoriels/typescript-types-avances/'
};

export default meta;
