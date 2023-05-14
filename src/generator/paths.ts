import path from 'path';

export default {
	contentPath: path.join(process.cwd(), './src/routes/(blog)'),
	publicPath: path.join(process.cwd(), './static'),
	buildPath: path.join(process.cwd(), './static'),
	tmp: path.join(process.cwd(), './.svelte-kit/custom')
};
