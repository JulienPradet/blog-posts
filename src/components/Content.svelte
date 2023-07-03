<section><slot /></section>

<style>
	section {
		max-width: 56rem; /* 80ch */
	}

	section :global(> :first-child) {
		margin-top: 0;
	}
</style>
