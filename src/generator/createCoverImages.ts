import puppeteer, { Browser } from 'puppeteer';
import { concat, mergeMap, of, tap } from 'rxjs';
import { readPages } from './readPages';
import createLog from './util/log';
import paths from './paths';
import { join } from 'path';
import { access, mkdir, writeFile } from 'fs/promises';

const log = createLog('IMAGES');

const imagesPath = join(process.cwd(), 'static/images/cover/');

let browser: Browser;
const renderQueue: { location: string; resolve: () => void; reject: (error: unknown) => void }[] =
	[];
let closeTimeout: NodeJS.Timeout;
let isQueueRunning = false;

const launchQueue = async () => {
	if (renderQueue.length === 0) {
		closeTimeout = setTimeout(() => {
			browser.close();
		}, 500);
		return;
	}

	if (isQueueRunning) {
		return;
	}

	isQueueRunning = true;

	clearTimeout(closeTimeout);
	const firstElement = renderQueue.shift();
	if (!firstElement) {
		return;
	}

	const { location, resolve, reject } = firstElement;

	try {
		if (!browser) {
			browser = await puppeteer.launch({ headless: true });
		}

		const page = await browser.newPage();
		await page.setViewport({
			width: 1600,
			height: 826,
			deviceScaleFactor: 1
		});
		await page.goto(`http://localhost:5173/cover-image/?path=${location}`, {
			waitUntil: 'load'
		});
		await page.waitForNetworkIdle({ idleTime: 0 }); // wait for everything to be done loading
		const image = await page.screenshot();
		await mkdir(join(imagesPath, location), { recursive: true });
		await writeFile(join(imagesPath, location, 'image.jpg'), image);
		await page.close();
		resolve();

		isQueueRunning = false;
		launchQueue();
	} catch (error) {
		console.error(error);
		reject(error);
	}
};

const renderCover = async (location: string) => {
	try {
		await access(join(imagesPath, location, 'image.jpg'));
		return Promise.resolve();
	} catch {
		return new Promise<void>((resolve, reject) => {
			renderQueue.push({ resolve, reject, location });
			launchQueue();
		});
	}
};

const createCoverImages = () => {
	log('debug', 'Reading pages');

	const pages$ = concat(readPages(paths.contentPath), of('/')).pipe(
		mergeMap(async (page) => {
			const location = page.replace('meta.ts', '');
			await renderCover(location);
			return page;
		}),
		tap((page) => log('debug', page))
	);

	return pages$;
};

export { createCoverImages };
