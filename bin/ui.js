import chalk from 'chalk';

class UI {

	constructor() {
		this.welcomeBanner = `
	┌─────────────────────────────────────────┐
	│                                         │
	│               Penguin CLI               │
	│                                         │
	│     Tool for testing and using APIs     │
	│         Inspect and easily debug        │
	│                                         │
	│           by IncognitoPenguin           │
	│                                         │
	└─────────────────────────────────────────┘
`;
	}

	printBgMagenta(text) {
		console.log(
			chalk.bgMagenta(
				chalk.black(text)
			)
		);
	}

	printBlue(text) {
		console.log(chalk.blue(text));
	}

	setTitle(text) {
		const title = `│
│ ${chalk.yellowBright(text)}
└─────────────────────────────────────────────────┐

		`;

		this.printBlue(title);
	}

	setFooter() {
		const footer = `
┌─────────────────────────────────────────────────┘
│		`;

		this.printBlue(footer);
	}

}

export default UI;
