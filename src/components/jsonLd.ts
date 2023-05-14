function jsonLd(content: any) {
	return `<script type="application/json+ld">${JSON.stringify(content)}</script>`;
}

export { jsonLd };
