import { join } from 'path';
import RSS from 'rss';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { getSiteInfo } from '../getSiteInfo';
import paths from '../paths';
import { mkdirp, writefile } from '../util/fs';
import createLog from '../util/log';
import { getMetas } from './getMetas';

const log = createLog('SEO');

const createRss = () => {
	log('info', 'Creating feed');

	const url = 'https://www.julienpradet.fr/';

	const rss = new RSS({
		title: 'Enchanté, Julien Pradet',
		description:
			'Un blog qui parle surtout de développement web. Peut-être un peu de culture et de vie aussi. Sait-on jamais.',
		site_url: url,
		feed_url: url + 'feed.xml',
		language: 'fr',
		ttl: 60
	});

	const siteInfo$ = getSiteInfo();

	return mkdirp(paths.buildPath).pipe(
		mergeMap(() => getMetas()),
		withLatestFrom(siteInfo$, (metas, siteInfo) => ({ metas, siteInfo })),
		tap(({ metas, siteInfo }) => {
			metas
				.filter((meta) => (meta.type === 'article' ? meta.isListed : true))
				.sort((metaA, metaB) => {
					if (metaA.date < metaB.date) {
						return 1;
					} else if (metaA.date > metaB.date) {
						return -1;
					}
					return 0;
				})
				.forEach((meta) => {
					rss.item({
						title: meta.title,
						url: url + meta.location,
						description: meta.description,
						author: siteInfo.author.name,
						date: new Date(meta.date)
					});
				});
		}),
		map(() => rss.xml()),
		mergeMap((feed) => writefile(join(paths.buildPath, 'feed.xml'), feed)),
		tap(() => log('success', `Feed created`)),
		map(() => true)
	);
};

export { createRss };
