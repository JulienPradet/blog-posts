function jsonLd(content: unknown) {
	return `<script type="application/json+ld">${JSON.stringify(content)}</script>`;
}

export { jsonLd };
