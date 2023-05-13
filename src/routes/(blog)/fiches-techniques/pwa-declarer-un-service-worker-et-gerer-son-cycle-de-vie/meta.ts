import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'PWA : Déclarer un Service Worker et gérer son cycle de vie',
	date: new Date('2017-12-08'),
	description: `Après avoir expliqué ce qu'était une PWA et un Service Worker, attaquons nous à l'implémentation de ce dernier. J'y présenterai les bonnes pratiques que j'aurai bien aimé connaître avant de m'y mettre.`,
	category: ArticleCategory['fiches-techniques'],
	prev: '/fiches-techniques/pwa-rendre-un-site-web-disponible-grace-aux-services-workers/',
	next: '/fiches-techniques/pwa-intercepter-les-requetes-http-et-les-mettre-en-cache/'
};

export default meta;
