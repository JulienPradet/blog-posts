import { ArticleCategory } from '../../../../components/ArticleCategory';
import type { ArticleMeta } from '../../../../components/ArticleMeta';

const meta: ArticleMeta = {
	type: 'article',
	isListed: true,
	title: 'Analyser le comportement réseau pour améliorer FCP et LCP',
	date: new Date('2023-07-17'),
	description: `Le Web Performance commence par bien comprendre le fonctionnement du navigateur. Dans cet article, je vous présente quels outils j'utilise et liste les bonnes pratiques à avoir en tête pour maîtriser votre réseau et accélérer le chargement de vos pages.`,
	category: ArticleCategory['tutoriels']
};

export default meta;
