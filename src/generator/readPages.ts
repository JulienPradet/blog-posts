import { filter, map, mergeMap, Observable, of } from 'rxjs';
import paths from './paths.js';
import { exists, getRecursiveFiles } from './util/fs.js';

export const readPages = (path: string): Observable<string> => {
	return getRecursiveFiles(of(path)).pipe(
		filter(({ filepath }) => filepath.endsWith('+page.svelte')),
		mergeMap(({ filepath }) =>
			exists(filepath.replace('+page.svelte', 'meta.ts')).pipe(
				filter((exists) => exists),
				map(() => filepath.replace(paths.contentPath, '').replace('+page.svelte', 'meta.ts'))
			)
		)
	);
};
