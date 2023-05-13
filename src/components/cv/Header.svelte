<script lang="ts">
	import twitterSvg from './icons/iconmonstr-twitter-1.svg?raw';
	import githubSvg from './icons/iconmonstr-github-1.svg?raw';
	import emailSvg from './icons/iconmonstr-email-3.svg?raw';
	import globeSvg from './icons/iconmonstr-globe-3.svg?raw';

	export let translationHref: string;
	export let translationHreflang: string;
	export let translationLang: string;
</script>

<header class="head">
	<div>
		<h1 class="page__title">Julien Pradet</h1>
		<h2 class="page__subtitle"><slot name="title" /></h2>
	</div>
	<ul class="contact">
		<li class="screen-only">
			<a href={translationHref} hreflang={translationHreflang} lang={translationLang}>
				<span class="name">
					<slot name="translation" />
				</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="mobile-only">{@html globeSvg}</span>
				<span class="name">https://www.julienpradet.fr</span>
			</a>
		</li>
		<li>
			<a href="mailto:julien.pradet@gmail.com">
				<span class="mobile-only">{@html emailSvg}</span>
				<span class="name">julien.pradet@gmail.com</span>
			</a>
		</li>
		<li>
			<a href={`https://twitter.com/JulienPradet`}>
				<span>{@html twitterSvg}</span>
				<span class="name">@JulienPradet</span>
			</a>
		</li>
		<li>
			<a href={`https://github.com/JulienPradet/blog-posts`}>
				<span>{@html githubSvg}</span>
				<span class="name">JulienPradet</span>
			</a>
		</li>
	</ul>
</header>

<p class="page__moto">
	<slot name="moto" />
</p>

<style>
	.contact {
		margin: 0.5em 0 0 0;
		padding: 0;
		list-style: none;
		font-size: 1em;
		display: flex;
		gap: 0 0.5em;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.contact > * {
		margin: 0.5em;
	}
	.contact a {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.contact a :global(svg),
	.contact a :global([role='img']) {
		width: 1.2em;
		height: 1.2em;
		line-height: 1;
		display: block;
	}
	.contact > :first-child {
		width: 100%;
	}
	.contact > :first-child a {
		justify-content: flex-start;
	}

	.name {
		white-space: nowrap;
	}

	@media (max-width: 32em) {
		.contact > :nth-child(n + 2) .name {
			border: 0 !important;
			clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
			-webkit-clip-path: inset(50%) !important;
			clip-path: inset(50%) !important; /* 2 */
			height: 1px !important;
			margin: -1px !important;
			overflow: hidden !important;
			padding: 0 !important;
			position: absolute !important;
			width: 1px !important;
			white-space: nowrap !important; /* 3 */
		}
	}
	@media (min-width: 32em) {
		.mobile-only {
			display: none;
		}

		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.contact {
			margin-top: 0;
			margin-left: 1em;
			margin-right: 0;
			text-align: right;
			font-size: 0.9em;

			flex-wrap: nowrap;
			flex-direction: column;
		}
		.contact > * {
			margin: 0.2em 0;
		}
		.contact a {
			flex-direction: row-reverse;
			justify-content: flex-start;
		}
		.contact a :global(svg),
		.contact a :global([role='img']) {
			margin-left: 0.5em;
		}
	}

	.page__title {
		margin-top: 0;
		margin-bottom: 0;
	}
	.page__subtitle {
		margin-top: 0;
		margin-bottom: 0;
	}
	.page__moto {
		text-align: left;
		font-size: 1.1em;
		margin-top: 2rem;
		margin-bottom: 0;
	}
	@media screen and (min-width: 47em), print and (min-width: 30em) {
		.page__moto {
			text-align: center;
			padding-top: 1.5rem;
			margin-top: 2rem;
			border-top: 1px solid var(--color-accent);
			padding-bottom: 1.5rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid var(--color-accent);
		}
	}
</style>
