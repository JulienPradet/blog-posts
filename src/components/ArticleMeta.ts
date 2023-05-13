import type { ArticleCategory } from './ArticleCategory';

export type PageMeta = {
	title: string;
	date: Date;
	description: string;
	redirect?: string[];
	prev?: string;
	next?: string;
	removeFromSitemap?: boolean;
};

export type ArticleMeta = PageMeta & {
	type: 'article';
	isListed: boolean;
	category: ArticleCategory;
};

export type CategoryMeta = PageMeta & {
	type: 'category';
	filter: <T extends ArticleMeta>(meta: T) => boolean;
	category: ArticleCategory;
};

export type WithLocation<T> = T & {
	location: string;
};

export type PageType = ArticleMeta | CategoryMeta;
