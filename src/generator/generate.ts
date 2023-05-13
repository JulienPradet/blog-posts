import { merge } from 'rxjs';
import createLog from './util/log';
import { createPagesDefinition } from './createPagesDefinition';
import { createSitemap } from './seo/createSitemap';
import { createRss } from './seo/createRss';
import { createRedirects } from './seo/createRedirects';

const log = createLog('GENERATE');

merge(createPagesDefinition(), createSitemap(), createRss(), createRedirects()).subscribe(() => {
	log('success', 'done');
});
