import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Comment et pourquoi mocker une API navigateur dans des tests unitaires ?',
	date: new Date('2023-06-26'),
	description: `jsdom est une librairie mircale qui permet d'executer des tests comme dans un navigateur, mais sans navigateur. Le problème c'est que tout n'est pas forcément à disposition. Comment mocker des APIs telles que window.matchMedia, IntersectionObserver, etc. ?`,
	category: ArticleCategory['tutoriels']
};

export default meta;
