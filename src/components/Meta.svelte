<script lang="ts">
	import { siteInfo } from '../../.svelte-kit/custom/pages';
	import type { PageType } from './ArticleMeta';
	import { jsonLd } from './jsonLd';
	import { formatIsoDate } from './util/dateFormats';

	export let meta: PageType;
	export let location: string;

	const image = `/images/cover${location}image.jpg`;

	const jsonDescription =
		'type' in meta && meta.type === 'article'
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
	<meta name="twitter:site" content="@JulienPradet" />
	<meta name="twitter:url" content="https://www.julienpradet.fr/" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@JulienPradet" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={`${siteInfo.homepage}${image}`} />
	<meta name="twitter:image:src" content={`${siteInfo.homepage}${image}`} />
	<meta property="og:site_name" content={siteInfo.site_name} />
	<meta property="og:type" content="page" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:url" content={`${siteInfo.homepage}${location}`} />
	<meta property="og:image" content={`${siteInfo.homepage}${image}`} />
	<meta property="og:description" content={meta.description} />
	<link rel="canonical" href={`${siteInfo.homepage}${location}`} />
	<link
		rel="alternate"
		type="application/atom+xml"
		title="Articles"
		href="${siteInfo.homepage}/feed.xml"
	/>
	{#if jsonDescription !== null}
		{@html jsonLd(jsonDescription)}
	{/if}
</svelte:head>
