#!/usr/bin/env node

// FIX: Update local files imports!

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
import chalk from 'chalk';

import UI from './ui.js';
import State from './state.js';
import Settings from './settings.js';
import SelectedRequest from './selected.js';

const ui = new UI();
const state = new State(ui);
const settings = new Settings(state, ui);
const selectedRequest = new SelectedRequest(state, ui);

// TODO: Make function for args
// const argv = yargs(hideBin(process.argv)).parse()
// console.log(argv);

// FIX: Change banner and add if hide settings
ui.printBgMagenta(ui.welcomeBanner);

// FIX: ?? Create collections/projects?
// Automatic testing?

const mainMenu = async () => {
	const menuItems = state.init();
	const quit = chalk.red('Quit');

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
	} else if (selected === 'Settings') {
		await settings.options();
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
