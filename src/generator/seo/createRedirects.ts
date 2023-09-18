import { join } from 'path';
import { map, mergeMap, tap } from 'rxjs';
import { PageMeta } from '../../components/ArticleMeta';
import paths from '../paths';
import { mkdirp, writefile } from '../util/fs';
import createLog from '../util/log';
import { getMetas } from './getMetas';

const log = createLog('SEO');

const removeTrailingSlash = (location: string) => {
	if (location === '/') {
		return '/';
	}
	if (location.endsWith('/')) {
		location = location.substr(0, location.length - 1);
	}
	return location;
};

const getRedirectsFromMeta = (meta: PageMeta) => {
	return (meta.redirect ?? []).map(removeTrailingSlash).map((url) => url);
};

const createRedirects = () => {
	log('info', 'Creating redirects');

	return mkdirp(paths.buildPath).pipe(
		mergeMap(() => getMetas()),
		map((metas) =>
			metas
				.map((meta) => {
					return Object.assign({}, meta, {
						redirect: getRedirectsFromMeta(meta)
					});
				})
				.filter((meta) => meta.redirect)
				.map((meta) => meta.redirect.map((redirect) => `${redirect}    /${meta.location}   301`))
				.reduce(
					(acc, redirects) => acc.concat(redirects),
					[
						`/en/cv    /cv/en/    301`,
						`/en/cv/    /cv/en/    301`,
						`/images-transform/*    https://julienpradet.twic.pics/images/:splat    200`,
						`/developpeur-web-performance-freelance/ /developpeur-web-performance/    301`,
						`/reactions/la-parole-et-le-genre/ /404.html 410`,
						`/reactions/ /404.html 410`
					]
				)
				.join('\n')
		),
		mergeMap((sitemap) => writefile(join(paths.buildPath, '_redirects'), sitemap + '\n')),
		tap(() => log('success', 'redirects created')),
		map(() => true)
	);
};

export { createRedirects };
