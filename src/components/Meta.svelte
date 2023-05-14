<script lang="ts">
	import { siteInfo } from '../../.svelte-kit/custom/pages';
	import type { PageType } from './ArticleMeta';
	import { jsonLd } from './jsonLd';
	import { formatIsoDate } from './util/dateFormats';

	export let meta: PageType;
	export let location: string;

	const image = `${siteInfo.homepage}/android-chrome-512x512.png`;

	const jsonDescription =
		meta.type === 'article'
			? {
					'@context': 'https://schema.org',
					'@type': 'Article',
					author: {
						'@type': 'Person',
						name: siteInfo.author.name
					},
					name: meta.title,
					description: meta.description,
					datePublished: formatIsoDate(meta.date)
			  }
			: null;
</script>

<svelte:head>
	<title>{`${meta.title} | ${siteInfo.author.name}`}</title>
	<meta name="author" content={siteInfo.author.name} />
	<meta name="description" content={meta.description} />
	<meta property="twitter:site" content="@JulienPradet" />
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:creator" content="@JulienPradet" />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content={image} />
	<meta property="og:site_name" content={siteInfo.site_name} />
	<meta property="og:type" content="page" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:url" content={`${siteInfo.homepage}${location}`} />
	<meta property="og:image" content={image} />
	<meta property="og:description" content={meta.description} />
	<link rel="canonical" href={`${siteInfo.homepage}${location}`} />
	{#if jsonDescription !== null}
		{@html jsonLd(jsonDescription)}
	{/if}
</svelte:head>
