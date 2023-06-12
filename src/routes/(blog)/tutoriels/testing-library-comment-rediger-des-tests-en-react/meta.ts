import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Testing Library : Comment rédiger des tests front-end ?',
	date: new Date('2023-06-12'),
	description: `Dans un écosystème front-end aussi fragmenté, Testing Library est un vrai bol d'air : cette librarie nous permet de tester unitairement nos composants quelque soit le framework. Dans cette partie, nous verrons comment ça marche et comment l'adapter à React.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
