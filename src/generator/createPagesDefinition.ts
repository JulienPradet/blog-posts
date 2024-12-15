import path from 'path';
import { map, mergeMap, Observable, share, tap, withLatestFrom } from 'rxjs';
import { mkdirp, writefile } from './util/fs';
import reduceObservable from './util/reduceObservable';
import { readPages } from './readPages';
import createLog from './util/log';
import paths from './paths';
import { getSiteInfo, type SiteInfo } from './getSiteInfo';

const log = createLog('PAGES');

const makeEntry = (
	pages$: Observable<string>,
	siteInfo$: Observable<SiteInfo>
): Observable<string> => {
	return reduceObservable<string[], string>((pages, page) => [...pages, page], [], pages$).pipe(
		withLatestFrom(siteInfo$, (pages, siteInfo) => ({ pages, siteInfo })),
		map(({ pages, siteInfo }) => {
			log('debug', `${pages.length} pages detected`);
			const importPages = pages.map((metaPath, index) => {
				const importPath = path
					.join(path.relative(paths.tmp, paths.contentPath), metaPath)
					.replace('meta.ts', 'meta');
				return `import page${index} from ${JSON.stringify(importPath)};`;
			});
			const pagesArray = pages.map(
				(page, index) =>
					`{...page${index}, location: ${JSON.stringify(page.replace('meta.ts', ''))}}`
			);

			return `
                import type { ArticleMeta, CategoryMeta, WithLocation } from '../../src/components/ArticleMeta';
                ${importPages.join('\n')}
                export const siteInfo = ${JSON.stringify(siteInfo)};

                export const pages: WithLocation<ArticleMeta|CategoryMeta>[] = [
                    ${pagesArray.join(',\n')}
                ];
            `;
		})
	);
};

const saveEntry = (entry$: Observable<string>) => {
	const savePath = path.join(paths.tmp, '/pages.ts');
	return mkdirp(paths.tmp).pipe(
		mergeMap(() => entry$),
		mergeMap((entry) => writefile(savePath, entry))
	);
};

const createPagesDefinition = () => {
	log('debug', 'Reading pages');

	const siteInfo$ = getSiteInfo();

	const pages$ = readPages(paths.contentPath).pipe(
		tap((page) => log('debug', page)),
		share()
	);

	const entry$ = makeEntry(pages$, siteInfo$);

	return saveEntry(entry$).pipe(map(() => true));
};

export { createPagesDefinition };
