import { pages } from '../../../../.svelte-kit/custom/pages';

export function load({ url }) {
	const page = pages.find((page) => page.location === url.searchParams.get('path'));
	return {
		meta: page
	};
}
