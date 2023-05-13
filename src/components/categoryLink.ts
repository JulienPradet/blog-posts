import { ArticleCategory } from './ArticleCategory';

export const categoryLink = (category: ArticleCategory) => {
	switch (category) {
		case ArticleCategory.autres:
			return '/autres/';
		case ArticleCategory.explorations:
			return '/explorations/';
		case ArticleCategory['fiches-techniques']:
			return '/fiches-techniques/';
		case ArticleCategory.tutoriels:
			return '/tutoriels/';
		default:
			throw new Error('Invalid category');
	}
};
