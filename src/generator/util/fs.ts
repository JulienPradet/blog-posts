import { EMPTY, expand, filter, map, mergeMap, Observable, ObservableInput, of } from 'rxjs';
import fs from 'fs';
import path from 'path';
import { mkdirp as mkdirpLib } from 'mkdirp';
import chokidar from 'chokidar';

function exists(filePath: string) {
	return new Observable<boolean>((observer) => {
		fs.access(filePath, (err) => {
			if (err) {
				observer.next(false);
			} else {
				observer.next(true);
			}
			observer.complete();
		});
	});
}

function watchfile(filePath: string) {
	return new Observable<void>((observer) => {
		const watcher = chokidar.watch(filePath, { persistent: true }).on('change', () => {
			observer.next();
		});

		return () => {
			watcher.close();
		};
	});
}

function readdir(dirPath: string) {
	return new Observable<string[]>((observer) => {
		fs.readdir(dirPath, (e, files) => {
			if (e) return observer.error(e);

			files = files.map((file) => path.join(dirPath, file));
			observer.next(files);
			observer.complete();
		});
	});
}

function readfile(filepath: string) {
	return new Observable<{ filepath: string; file: string }>((observer) => {
		fs.readFile(filepath, (e, file) => {
			if (e) return observer.error(e);

			const data = { filepath: filepath, file: file.toString() };
			observer.next(data);
			observer.complete();
		});
	});
}

function writefile(filePath: string, content: string, options: fs.WriteFileOptions = {}) {
	return new Observable<string>((observer) => {
		fs.writeFile(filePath, content, options, (e) => {
			if (e) return observer.error(e);

			observer.next(filePath);
			observer.complete();
		});
	});
}

function stat(filePath: string) {
	return new Observable<{ filepath: string; stats: fs.Stats }>((observer) => {
		fs.stat(filePath, (e, stats) => {
			if (e) return observer.error(e);

			observer.next({ filepath: filePath, stats });
			observer.complete();
		});
	});
}

function mkdirp(path: string) {
	return new Observable((observer) => {
		mkdirpLib(path)
			.then((path) => {
				observer.next(path);
				observer.complete();
			})
			.catch((e) => {
				observer.error(e);
			});
	});
}

function getRecursiveFiles(inputDir$: Observable<string>) {
	return inputDir$.pipe(
		mergeMap((dirpath) => readdir(dirpath)),
		mergeMap((files) => files), // flatten all files
		mergeMap((filepath) => stat(filepath)),
		map(({ filepath, stats }) => ({
			filepath,
			stats,
			isDirectory: stats.isDirectory()
		})),
		expand<
			{ filepath: string; isDirectory: boolean },
			ObservableInput<{ filepath: string; isDirectory: boolean }>
		>(({ filepath, isDirectory }) => (isDirectory ? getRecursiveFiles(of(filepath)) : EMPTY)),
		filter(({ isDirectory }) => !isDirectory),
		map(({ filepath }: { filepath: string }) => ({ filepath }))
	);
}

export { exists, watchfile, readdir, readfile, writefile, stat, mkdirp, getRecursiveFiles };
