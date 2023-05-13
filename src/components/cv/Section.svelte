<script lang="ts">
	export let title: string;
</script>

<section>
	<h2>{title}</h2>
	<slot />
</section>

<style>
	section h2 {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 0.3rem solid var(--color-highlight);
		font-style: italic;
	}
	@media screen and (min-width: 47em), print and (min-width: 30em) {
		section h2 {
			margin-top: 3rem;
			margin-left: 14.5rem;
			border-top: none;
			padding-top: 0;
		}
		section h2::before {
			content: '';
			display: block;
			border-top: 0.4em solid var(--color-highlight);
			height: 0.4em;
			box-sizing: border-box;
			float: left;
			width: 13rem;
			margin-left: -14.5rem;
			margin-top: 0.65em;
		}
	}

	@media print {
		section {
			page-break-inside: avoid;
		}

		section h2 {
			margin-top: 2rem;
			margin-left: 10.5rem;
		}
		section h2::before {
			width: 9rem;
			margin-left: -10.5rem;
		}
	}
</style>
