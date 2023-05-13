import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'PWA : Intercepter les requêtes HTTP et les mettre en cache',
	date: new Date('2017-12-24'),
	description: `Après avoir installé notre Service Worker, il est temps de lui faire faire des choses. Nous verrons comment utiliser l'interception de requêtes et la Cache API afin d'améliorer l'expérience de nos utilisateurs⋅rices.`,
	category: ArticleCategory['fiches-techniques'],
	prev: '/fiches-techniques/pwa-declarer-un-service-worker-et-gerer-son-cycle-de-vie/'
};

export default meta;
