import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'PWA : Rendre un site web disponible grâce aux Services Workers',
	date: new Date('2017-12-01'),
	description: `Les Progressives Web Apps (PWA) est une des actualités du web qui a le plus de hype en ce moment. En quoi ça consiste, et comment le mettre en place ?`,
	category: ArticleCategory['fiches-techniques'],
	next: '/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/'
};

export default meta;
