import { ArticleCategory } from '../../../components/ArticleCategory';
import type { CategoryMeta } from '../../../components/ArticleMeta';

const meta: CategoryMeta = {
	type: 'category',
	title: 'Autres',
	description: `Les articles à propos de tout et de rien de Julien Pradet. Ce sont des articles que je n'ai pas su ranger. Je ne suis pas fermé à l'idée d'écrire sur d'autres sujets que le développement web. Alors forcément, j'ai des articles qui rentrent dans aucune case. Et tant mieux parce que les cases, c'est triste !`,

	filter: (page) => page.category === ArticleCategory.autres,
	category: ArticleCategory.autres,
	date: new Date('2017-09-22')
};

export default meta;
