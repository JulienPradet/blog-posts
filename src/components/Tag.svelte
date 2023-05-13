<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<a class="tag" {href}><span>{label}</span></a>

<style>
	:global(.page) .tag {
		position: relative;
		text-decoration: none;
		padding: 0.25rem 0.5rem;
	}

	:global(.page) .tag:hover,
	:global(.page) .tag:focus {
		background: var(--color-white);
	}

	.tag span {
		position: relative;
		z-index: 1;
	}

	.tag::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		background: var(--color-creme);
		transition: opacity 0.15s ease-in-out;
	}

	.tag::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0.5rem;
		right: 0.5rem;
		height: 0;
		background: var(--color-creme);
		transition: height 0.15s ease-in-out, background-color 0.15s ease-in-out;
	}

	:global(.page) .tag:hover::before,
	:global(.page) .tag:focus::before {
		opacity: 0;
	}

	:global(.page) .tag:hover::after,
	:global(.page) .tag:focus::after {
		top: auto;
		height: 2px;
		background-color: rgb(207 58 0 / 100%);
	}
</style>
