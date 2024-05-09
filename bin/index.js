#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ora from 'ora';
import {
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';
import State from './state.js';
import SelectedRequest from './selected.js';
import UI from './ui.js';
import chalk from 'chalk';

const ui = new UI();
const state = new State(ui);
const selectedRequest = new SelectedRequest(state, ui);
// const argv = yargs(hideBin(process.argv)).parse()
// console.log(argv);

ui.printBgMagenta(ui.welcomeBanner);

// FIX: ?? Create collections/projects?
// Automatic testing?

const mainMenu = async () => {
	const menuItems = state.init();
	const quit = chalk.red('Quit');

	// menuItems.unshift(new Separator(chalk.gray('---   REQUESTS   ---')));
	menuItems.unshift(new Separator(chalk.gray('--------------------------------------------------')));
	menuItems.unshift({
		value: quit,
		description: ui.dim('\nExit Penguin CLI')
	});
	menuItems.unshift({
		value: 'Settings',
		description: ui.dim('\nEnter Penguin CLI settings')
	});
	// TODO: Move to settings
	// menuItems.unshift({
	// 	value: 'View saved data',
	// 	description: 'Print your saved data'
	// });
	menuItems.unshift({
		value: 'New request',
		description: ui.dim('\nBuild a new HTTP request')
	});
	// menuItems.unshift(new Separator(chalk.gray('____________________')));
	// menuItems.push(new Separator(chalk.gray('____________________')));

	const selected = await select({
		type: 'multiselect',
		loop: false,
		name: 'Main menu',
		message: chalk.yellow('Menu:'),
		choices: menuItems,
	});

	if (selected === 'New request' || selected === 'No requests found! Create a new request') {
		await state.createNewRequest();
		return false;
	} else if (selected === 'View saved data') {
		ui.setTitle('Your saved data');
		console.log(state.data);
		ui.setFooter();
		return false;
	} else if (selected === quit) {
		return true;
	}

	if (selected) {
		const request = state.getSelected(selected);
		await selectedRequest.options(request);

		return false;
	}
}

const start = async () => {
	let quit = false;
	while (!quit) {
		quit = await mainMenu();
	}
	return;
}

start();
