import { merge } from 'rxjs';
import createLog from './util/log';
import { createCoverImages } from './createCoverImages';

const log = createLog('POST BUILD');

merge(createCoverImages()).subscribe({
	complete: () => {
		log('success', 'done');
	}
});
