import { map, mergeMap, tap } from 'rxjs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { join } from 'path';
import createLog from '../util/log';
import { getMetas } from './getMetas';
import { mkdirp, writefile } from '../util/fs';
import paths from '../paths';

const log = createLog('SEO');

const createSitemap = () => {
	log('info', 'Creating sitemap');

	const url = 'https://www.julienpradet.fr/';

	return mkdirp(paths.buildPath).pipe(
		mergeMap(() => getMetas()),
		mergeMap((metas) => {
			const sitemapStream = new SitemapStream({ hostname: url });

			const links = [
				{ url: '/', changefreq: 'weekly' },
				...metas
					.filter((meta) => !meta.removeFromSitemap)
					.filter((meta) => {
						if (!meta.date) {
							log(
								'warn',
								`Page removed from sitemap because there is no date in meta.js "/${meta.location}" `
							);
						}
						return meta.date;
					})
					.map((meta) => ({
						url: meta.location,
						lastmodISO: new Date(meta.date).toISOString()
					}))
			];

			return streamToPromise(Readable.from(links).pipe(sitemapStream));
		}),
		map((sitemap) => sitemap.toString()),
		mergeMap((sitemap) => writefile(join(paths.buildPath, 'sitemap.xml'), sitemap)),
		tap(() => log('success', `Sitemap created`)),
		map(() => true)
	);
};

export { createSitemap };
