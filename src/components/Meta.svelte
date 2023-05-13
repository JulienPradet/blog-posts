<script lang="ts">
	import { siteInfo } from '../../.svelte-kit/custom/pages';
	import type { PageMeta } from './ArticleMeta';

	export let meta: PageMeta;
	export let location: string;

	const image = `${siteInfo.homepage}/android-chrome-512x512.png`;
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
</svelte:head>
