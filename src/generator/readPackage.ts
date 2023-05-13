import { map } from 'rxjs';
import { readfile } from './util/fs.js';

export const readPackage = () => {
	return readfile(new URL('../../package.json', import.meta.url).pathname).pipe(
		map(({ file }) => JSON.parse(file))
	);
};
