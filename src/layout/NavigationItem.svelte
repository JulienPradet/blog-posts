<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { afterUpdate } from 'svelte';
	import { trapFocus } from '../components/trapFocus';

	export let href: string | null;

	let closeButton: HTMLButtonElement;
	let openButton: HTMLAnchorElement | HTMLButtonElement;
	let children: Node;

	enum State {
		closed = 'closed',
		closing = 'closing',
		opened = 'opened',
		opening = 'opening'
	}
	let state: State = State.closed;

	const onClickOutside = (event: MouseEvent | TouchEvent) => {
		if (event.target !== null && !children.contains(event.target as Node)) {
			close();
		}
	};
	const close = async (event?: Event) => {
		if (state === State.closed) {
			return;
		}
		if (event) {
			event.stopPropagation();
		}
		document.body.removeEventListener('click', onClickOutside);
		state = $$slots.children ? State.closing : State.closed;
	};
	const open = async () => {
		state = $$slots.children ? State.opening : State.opened;
		document.body.addEventListener('click', onClickOutside);
	};

	const onTransitionEnd = () => {
		if (state === State.closing) {
			state = State.closed;
		}
	};

	afterUpdate(() => {
		if (state === State.opening) {
			setTimeout(() => {
				state = State.opened;
			}, 0);
		}
	});

	const onClick = (event: Event) => {
		if ($$slots.children) {
			if (state !== State.opened) {
				event.preventDefault();
				event.stopPropagation();
				open();
				return;
			}
		}
	};

	const onKeydown = (event: KeyboardEvent) => {
		if (!$$slots.children) {
			return;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			open();
			requestAnimationFrame(() => {
				closeButton.focus();
			});
		}
	};

	const onCloseButton = (event: Event) => {
		close(event);
		openButton.focus();
	};

	afterNavigate(() => {
		close();
	});
</script>

<li class={state}>
	{#if href}
		<a {href} bind:this={openButton} on:keydown={onKeydown} on:click={onClick}>
			<slot name="label" />
		</a>
	{:else}
		<button class="link" bind:this={openButton} on:keydown={onKeydown} on:click={onClick}>
			<slot name="label" />
		</button>
	{/if}
	{#if $$slots.children && state !== State.closed}
		<ul use:trapFocus on:transitionend={onTransitionEnd} bind:this={children}>
			<button
				on:click={onCloseButton}
				bind:this={closeButton}
				class="screen-reader screen-reader-focusable"
			>
				Fermer
			</button>
			<slot name="children" />
		</ul>
	{/if}
</li>

<style>
	li {
		display: block;
		margin: 0;
		padding: 0;
	}

	ul {
		position: absolute;
		z-index: 1;
		left: 0;
		margin-top: 0.5rem;
		padding: 1.5rem;
		background: var(--color-white);
		border-bottom: 1px solid rgb(24 23 22 / 10%);
		width: 100%;
		transition:
			transform 0.1s ease-in-out,
			opacity 0.1s ease-in-out;
		color: var(--color-dark);
	}

	li a:hover,
	li a:focus,
	li a:hover > :global(.icon),
	li a:focus > :global(.icon),
	li .link:hover,
	li .link:focus {
		color: var(--color-dark);
		text-decoration-color: var(--color-dark);
	}

	ul,
	.closing ul {
		opacity: 0;
		transform: translate(0, -3rem) scale(1, 0.8);
	}
	.opened ul {
		opacity: 1;
		transform: none;
	}

	ul::before {
		content: '';
		position: absolute;
		top: -0.5rem;
		left: 0;
		right: 0;
		height: 0.5rem;
		background: linear-gradient(0deg, rgba(255, 253, 253, 1) 0%, rgba(255, 253, 253, 0) 100%);
	}

	@media (min-width: 480px) {
		li {
			position: relative;
		}
		ul,
		.closing > ul {
			width: 20rem;
			transform: translate(-3rem) scale(0.9, 1);
		}
	}
</style>
