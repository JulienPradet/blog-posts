import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/svelte';
import { expect, afterEach } from 'vitest';

expect.extend(matchers);

afterEach(() => {
	cleanup();
});

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface Matchers<R>
			extends matchers.TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, R> {}
	}
}
