import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/svelte';
import { expect, afterEach } from 'vitest';

expect.extend(matchers);

afterEach(() => {
	cleanup();
});
