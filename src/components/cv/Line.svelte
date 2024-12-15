<div class="line">
	<div class="line__left"><slot name="left" /></div>
	<div class="line__content"><slot name="children" /></div>
</div>

<style>
	.line {
		margin-top: 2em;
	}
	.line__left :global(h3) {
		margin-top: 0;
		margin-bottom: 0;
	}
	.line__left :global(.small) {
		font-size: 0.9em;
	}
	.line__content {
		margin-top: 0.5em;
	}
	.line__content :global(h4),
	.line__content :global(.h4) {
		margin: 0;
	}
	.line__content :global(ul) {
		margin: 0;
		padding-left: 1em;
	}

	.line__content :global(ul + h4),
	.line__content :global(ul + .h4) {
		margin-top: 0.5em;
	}
	.line__content :global(p) {
		margin: 0;
	}
	@media screen and (min-width: 47em), print and (min-width: 30em) {
		.line {
			display: flex;
			margin-top: 0;
		}
		.line__left {
			text-align: right;
			width: 13rem;
		}
		.line__left :global(.small) {
			line-height: 1.6;
		}
		.line__left :global(.time) {
			margin-top: 0.08em;
		}
		.line__left :global(.time--alone) {
			margin-top: 0.45rem;
		}
		.line__content {
			margin-top: 0;
			margin-left: 1.5rem;
			flex: 1;
		}
		.line__content > :global(:first-child) {
			margin-top: 0;
		}
		.line__content > :global(p:first-child) {
			margin-top: 0.2rem;
		}
		.line__content > :global(h4),
		.line__content > :global(h4:first-child),
		.line__content > :global(.h4),
		.line__content > :global(.h4:first-child) {
			margin-top: 0.15rem;
			margin-bottom: 0;
		}
		.line + :global(.line) {
			margin-top: 1rem;
			padding-top: 0;
			border: none;
		}
	}

	@media print {
		.line__left {
			width: 7rem;
		}
		.line__left :global(.time--alone) {
			margin-top: 0.07rem;
		}

		.line__content > :global(p:first-child) {
			margin-top: 0.07rem;
		}
		.line__content > :global(h4),
		.line__content > :global(h4:first-child),
		.line__content > :global(.h4),
		.line__content > :global(.h4:first-child) {
			margin-top: 0.07rem;
			margin-bottom: 0.07rem;
		}
	}
</style>
