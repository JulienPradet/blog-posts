<script lang="ts">
	import Prism from './Prism.svelte';

	export let lang: string = 'jsx';
</script>

<Prism>
	<pre class={`language-${lang}`} data-lang={lang}><code><slot /></code></pre>
</Prism>
