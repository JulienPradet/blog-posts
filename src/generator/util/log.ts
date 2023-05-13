import chalk from 'chalk';

const typeToColor = {
	error: chalk.red,
	warn: chalk.yellow,
	log: chalk.white,
	info: chalk.gray,
	debug: chalk.blue,
	success: chalk.green
};
const typeToTitleColor = {
	error: chalk.white.bgRed.bold,
	warn: chalk.black.bgYellow.bold,
	log: chalk.black.bgWhite.bold,
	info: chalk.white.bgBlack.bold,
	debug: chalk.bgBlue.white.bold,
	success: chalk.bgGreen.white.bold
};

const appendChar = ' ';
let longestTitle = 10;

const appendSpaces = (n, subject = '') => {
	while (subject.length < n) {
		subject = appendChar + subject;
	}
	return subject;
};

const createLog =
	(subject: string) =>
	(type: keyof typeof typeToColor, string: string, displayTitle = true) => {
		if (!typeToColor[type]) {
			console.log(typeToColor.warn(`Type ${type} is not defined as logging type`));
			type = 'info';
		}

		if (subject.length < longestTitle) {
			subject = appendSpaces(longestTitle, subject);
		} else {
			longestTitle = subject.length;
		}

		const title = displayTitle
			? typeToTitleColor[type](subject + ' ')
			: appendSpaces(longestTitle + 1);
		const message = typeToColor[type](string);
		console.log(title + ' ' + message);
	};

export default createLog;
