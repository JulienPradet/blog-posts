<script lang="ts">
	export let data;

	const title = data?.meta?.title ?? 'Enchanté, Julien Pradet';
	const date = data?.meta?.date ?? null;
</script>

<div class="container">
	<div class="info">
		<p class="logo">🏠</p>
		<img class="avatar" src="/images/avatar.png" alt="Julien Pradet" width={180} height={180} />
		<h1>{title}</h1>
		<div class="subline">
			<p>
				julienpradet.fr{#if date}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{Intl.DateTimeFormat(
						'fr-FR',
						{
							dateStyle: 'short'
						}
					).format(date)}{/if}
			</p>
		</div>
	</div>
</div>

<style>
	:root {
		--color-white: #fffdfd;
		--color-creme: #fff7f1;
		--color-border: rgb(24 23 22 / 15%);
		--color-dark: #181716;
		--color-dark-lighter: #181716e0;
		--color-primary: rgb(207 58 0);
		--color-shade: #605d59;
	}
	:global(body) {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: black;
		font-size: 300%;
	}
	.container {
		position: relative;
		z-index: 0;
		height: 826px;
		width: 1600px;
		overflow: hidden;
		background: var(--color-creme);
		padding: 2em 2em 2em 2em;
		display: grid;
		grid-template-areas:
			'. .'
			'Author .'
			'Info .';
		grid-template-rows: 1fr auto auto;
		border-bottom: 0.5em solid var(--color-primary);
	}

	.info {
		grid-area: Info;
	}

	.logo {
		font-size: 8em;
		position: absolute;
		top: 0;
		right: 1rem;
		opacity: 0.3;
		z-index: -1;
	}

	.avatar {
		display: block;
		width: 3.5em;
		height: 3.5em;
		margin-bottom: 1em;
		border-radius: 2em;
		background: var(--color-primary);
		border: 0.25em solid var(--color-primary);
	}

	.avatar::before {
		content: '';
		position: absolute;
		top: -2em;
		left: -2em;
		right: -2em;
		height: 1em;
		background: var(--color-primary);
	}

	h1 {
		margin: 0;
		color: var(--color-primary);
		font-size: 2em;
		padding-right: 1em;
		line-height: 1.1;
		text-wrap: balance;
	}

	.subline {
		display: flex;
		align-items: center;
		margin: 1rem 0 0 0;
		gap: 0.75em;
		color: var(--color-shade);
		font-size: 1.1em;
	}

	.subline p {
		margin: 0;
	}
</style>
