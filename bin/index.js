#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import ora from 'ora';
import chalk from 'chalk';
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

const ui = new UI();
const state = new State(ui);
const selectedRequest = new SelectedRequest(state, ui);
// const argv = yargs(hideBin(process.argv)).parse()
// console.log(argv);

ui.printBgMagenta(ui.welcomeBanner);

const mainMenu = async () => {
	const menuItems = state.init();
	menuItems.unshift(new Separator());
	menuItems.unshift({
		value: 'Quit',
		description: 'Exit Penguin CLI'
	});
	menuItems.unshift({
		value: 'View saved data',
		description: 'Print your saved data'
	});
	menuItems.unshift({
		value: 'New request',
		description: 'Build a new HTTP request'
	});
	menuItems.unshift(new Separator());
	menuItems.push(new Separator());

	const selected = await select({
		type: 'multiselect',
		loop: false,
		name: 'Main menu',
		message: 'MENU',
		choices: menuItems,
	});

	if (selected === 'New request') {
		await state.createNewRequest();
		return false;
	} else if (selected === 'View saved data') {
		ui.setTitle('Your saved data');
		console.log(state.data);
		ui.setFooter();
		return false;
	} else if (selected === 'Quit') {
		return true;
	}

	if (selected) {
		const request = state.getSelected(selected);
		ui.setTitle(`Selected request: ${request.name}`);
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
