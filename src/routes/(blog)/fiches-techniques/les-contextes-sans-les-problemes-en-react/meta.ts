import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Les contextes sans les problèmes en React',
	date: new Date('2017-01-13'),
	description: `Un des inconvenients de React est le passage d'informations d'un composant à un autre. Une des solutions est d'utiliser les contextes. Mais il peut y avoir des problèmes. Lesquels et comment les éviter ?`,
	category: ArticleCategory['fiches-techniques'],
	redirect: ['/posts/Les-contextes-sans-les-problemes-en-react'],
	next: '/fiches-techniques/les-contextes-sans-les-problemes-en-react-2'
};

export default meta;
