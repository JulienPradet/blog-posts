import { relative, dirname } from 'path';
import { filter, mergeMap, of } from 'rxjs';
import { type PageType, type WithLocation } from '../../components/ArticleMeta';
import paths from '../paths.js';
import { getRecursiveFiles } from '../util/fs';
import reduceObservable from '../util/reduceObservable';

const getMetas = () => {
	const meta$ = getRecursiveFiles(of(paths.contentPath)).pipe(
		filter(({ filepath }) => filepath.endsWith('meta.ts')),
		mergeMap(async ({ filepath }) => {
			let meta: PageType;
			try {
				meta = (await import(filepath)).default;
			} catch (e) {
				console.error(e);
				return null;
			}

			return Object.assign(
				{},
				{
					isPublic: true,
					location: relative(paths.contentPath, dirname(filepath)) + '/'
				},
				meta
			);
		}),
		filter((meta: WithLocation<PageType> | null) => Boolean(meta))
	);

	return reduceObservable<WithLocation<PageType>[], WithLocation<PageType>>(
		(acc, meta) => (meta === null ? acc : [...acc, meta]),
		[],
		meta$.pipe(filter((meta) => meta !== null))
	);
};

export { getMetas };
