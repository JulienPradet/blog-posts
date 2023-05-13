<section>
	<slot />
</section>

<style>
	section {
		margin-top: 3rem;
		padding-top: 3rem;
		padding-bottom: 3rem;
		margin-left: calc(-1 * var(--global-margin));
		margin-right: calc(-1 * var(--global-margin));
		padding-left: var(--global-margin);
		padding-right: var(--global-margin);
		background: var(--color-white);
		border-top: 1px solid rgb(24 23 22 / 15%);
		border-bottom: 1px solid rgb(24 23 22 / 15%);
	}
</style>
