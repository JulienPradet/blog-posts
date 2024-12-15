import userEvent from '@testing-library/user-event';
import { render, fireEvent, act } from '@testing-library/svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { waitFor } from '@testing-library/dom';
import { tick } from 'svelte';

const { click, hover, unhover, keyboard, pointer } = userEvent;

declare module '$app/navigation' {
	function navigate(): void;
}

vi.mock('$app/navigation', () => {
	const _callbacks = new Set<() => void>();

	return {
		afterNavigate(callback: () => void) {
			_callbacks.add(callback);
		},
		navigate: () => {
			Array.from(_callbacks.keys()).forEach((key) => {
				if (!_callbacks.has(key)) {
					return;
				}

				key();
				_callbacks.delete(key);
			});
		}
	};
});

describe('NavigationItem', () => {
	let NavigationItem;

	beforeEach(async () => {
		NavigationItem = await import('./NavigationItem.test.svelte');

		global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
			tick().then(() => {
				callback(0);
			});
			return 0;
		});
	});

	afterEach(() => {
		vi.resetModules();
		vi.resetAllMocks();
	});

	it('should display a link if an href is defined', async () => {
		const { findByText } = render(NavigationItem, {});

		const simpleItem = await findByText('Item 1');
		expect(simpleItem).toBeVisible();
		expect(simpleItem).toHaveAttribute('href', '/item/1/');
	});

	it('should not display a link if href is not defined', async () => {
		const { findByText } = render(NavigationItem, {});

		const simpleItem = await findByText('Item 3');
		expect(simpleItem).toBeVisible();
		expect(simpleItem).not.toHaveAttribute('href');
	});

	describe.each([
		{ id: 2, type: 'link' },
		{ id: 3, type: 'button' }
	])('for items with children (when item is a $type)', ({ id }) => {
		it('should open and close sub navigation on hover', async () => {
			const { findByText, queryByText } = render(NavigationItem, {});

			let firstChild = queryByText(`Item ${id} Child 1`);
			expect(firstChild).not.toBeInTheDocument();

			const simpleItem = await findByText(`Item ${id}`);
			await click(simpleItem);

			firstChild = await findByText(`Item ${id} Child 1`);
			expect(firstChild).toBeVisible();
			expect(firstChild).not.toHaveAttribute('href="/item/2/child/1/"');

			await click(simpleItem);

			fireEvent(
				firstChild.closest('ul') as HTMLUListElement,
				new Event('transitionend', { bubbles: true, cancelable: true })
			);

			await waitFor(() => {
				expect(firstChild).not.toBeVisible();
			});
		});

		it('should be navigable with keyboard', async () => {
			const { findByText } = render(NavigationItem, {});

			const simpleItem = await findByText(`Item ${id}`);
			simpleItem.focus();

			await act(async () => {
				await keyboard('[Enter]');
			});

			const firstChild = await findByText(`Item ${id} Child 1`);
			expect(firstChild).toBeVisible();

			expect(document.activeElement).toHaveTextContent('Fermer');
			await keyboard('[Enter]');

			await act(() => {
				fireEvent(
					firstChild.closest('ul') as HTMLUListElement,
					new Event('transitionend', { bubbles: true, cancelable: true })
				);
			});

			expect(firstChild).not.toBeVisible();
		});

		it('should be navigable with touch', async () => {
			const { findByText } = render(NavigationItem, {});

			const simpleItem = await findByText(`Item ${id}`);

			await pointer([{ keys: '[TouchA>]', target: simpleItem }, { keys: '[/TouchA]' }]);

			const firstChild = await findByText(`Item ${id} Child 1`);
			expect(firstChild).toBeVisible();
		});

		it('should close children on navigate', async () => {
			const { findByText, queryByText } = render(NavigationItem, {});

			let firstChild = queryByText(`Item ${id} Child 1`);
			expect(firstChild).not.toBeInTheDocument();

			const simpleItem = await findByText(`Item ${id}`);
			await click(simpleItem);

			const visibleChild = await findByText(`Item ${id} Child 1`);

			await import('$app/navigation').then(({ navigate }) => navigate());
			await act(() => {
				fireEvent(
					visibleChild.closest('ul') as HTMLUListElement,
					new Event('transitionend', { bubbles: true, cancelable: true })
				);
			});

			await waitFor(() => {
				firstChild = queryByText(`Item ${id} Child 1`);
				expect(firstChild).not.toBeInTheDocument();
			});
		});
	});
});
