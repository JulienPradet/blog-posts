import React from 'react';
import Helmet from 'react-helmet';
import css from './tchat/css/index.scss';

class TchatDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			mounted: false
		};
	}

	componentDidMount() {
		this.setState({ mounted: true });

		this.props.App().then((app) => {
			if (this.demoContainer) {
				app.default(this.demoContainer);
			}
		});
	}

	render() {
		const githubLink = 'https://github.com/JulienPradet/blog-posts/tree/master/' + this.props.path;

		return [
			this.state.mounted && (
				<Helmet key="css">
					<link rel="stylesheet" href={css} />
				</Helmet>
			),
			<div key="container" ref={(ref) => (this.demoContainer = ref)} />,
			<div key="github" className="demo-github-link">
				<a href={githubLink}>Voir le code sur github</a>
			</div>
		];
	}
}

export default TchatDemo;
