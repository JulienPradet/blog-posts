import { sveltekit } from '@sveltejs/kit/vite';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vitest/config';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItCheckbox from 'markdown-it-checkbox';

export default defineConfig({
	plugins: [
		sveltekit(),
		babel({
			filter: /\.(mdx|jsx|tsx)$/,
			babelConfig: {
				presets: ['@babel/preset-react']
			}
		}),
		mdPlugin({
			mode: [Mode.HTML],
			markdown: (body: string) => {
				const md = markdownIt({
					html: true,
					linkify: true,
					typographer: true
				})
					.use(markdownItAnchor, {
						permalink: markdownItAnchor.permalink.ariaHidden({
							symbol: '§',
							space: true,
							placement: 'after'
						}),
						slugify: (text: string) =>
							text
								.replaceAll(/'"’/g, '')
								.normalize('NFD')
								.replace(/[\u0300-\u036f]/g, '')
								.toLowerCase()
								.replaceAll(/[^a-z0-9-_]+/g, '-')
								.replace(/(^-+)|(-+$)/, '')
					})
					.use(markdownItCheckbox);

				md.core.ruler.before('inline', 'french-typo', function replace(state) {
					const tokens = state.tokens;
					for (let i = 2; i < tokens.length; i++) {
						const token = tokens[i];
						if (token.type === 'inline') {
							token.content = token.content
								.replaceAll(/ ([?!;])/g, '&#8239;$1')
								.replaceAll(/ :/g, '&nbsp;:');
						}
					}
				});

				return md.render(body);
			}
		})
	],
	test: {
		server: {
			deps: { inline: ['@sveltejs/kit'] }
		},
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts']
	},
	server: {
		host: '0.0.0.0'
	}
});
