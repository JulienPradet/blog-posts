import { sveltekit } from '@sveltejs/kit/vite';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vitest/config';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

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
				}).use(markdownItAnchor, {
					permalink: true,
					slugify: (text: string) =>
						text
							.replaceAll(/'"’/g, '')
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.toLowerCase()
							.replaceAll(/[^a-z0-9-_]+/g, '-')
							.replace(/(^-+)|(-+$)/, '')
				});
				return md.render(body);
			}
		})
	],
	test: {
		deps: { inline: ['@sveltejs/kit'] },
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['./tests/setup.ts']
	}
});
