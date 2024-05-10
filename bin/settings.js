import {
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';
import chalk from 'chalk';

class Settings {

	constructor(state, ui) {
		this.state = state;
		this.ui = ui;

		this.opt = this.state.data.settings;
	}

	async globalSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Global settings',
				choices: [
					{	// INFO: Boolean
						value: 'Confirm on delete',
						description: this.ui.dim(`\n${this.opt.global.confirmOnDelete}\nGet confirmation before deleting anything`),
					},
					{	// INFO: Boolean
						value: 'Confirm on exit',
						description: this.ui.dim(`\n${this.opt.global.confirmOnExit}\nGet confirmation before exiting Penguin CLI`),
					},
					{	// INFO: Boolean
						value: 'Confirm unsaved changes',
						description: this.ui.dim(`\n${this.opt.global.confirmUnsavedChanges}\nGet confirmation when leaving a menu without saving changes`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});

		}
	}

	async tokenSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Token settings',
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.opt.accessToken.autoSaveFromRequest}\nAutomatically extract and save access token from login requests`),
					},
					{	// INFO: Boolean
						value: 'Auto add in request',
						description: this.ui.dim(`\n${this.opt.accessToken.autoAddInRequest}\nAutomatically add access token in headers on all requests`),
					},
					{	// INFO: Boolean
						value: 'Clear on exit',
						description: this.ui.dim(`\n${this.opt.accessToken.clearOnExit}\nAutomatically remove access token when exiting Penguin CLI`),
					},
					{	// INFO: String
						value: 'Value',
						description: this.ui.dim(`\n${this.opt.accessToken.value}\nView/edit the access token`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async bodySettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Body settings',
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.opt.body.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.opt.body.skipInCreate}\nDon't ask to add body, always add default`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async contentTypeSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Content-Type settings',
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.opt.contentType.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.opt.contentType.skipInCreate}\nDon't ask to add content type, always add default`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async endpointSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Endpoint settings',
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.opt.endpoint.autoSaveFromRequest}\nAutomatically extract and save endpoints from requests`),
					},
					{	// INFO: Boolean
						value: 'Skip list in create',
						description: this.ui.dim(`\n${this.opt.endpoint.skipListInCreate}\nDon't show list of saved endpoints when making new request`),
					},
					{	// INFO: Array<String>
						value: 'List',
						description: this.ui.dim(`\n${this.opt.endpoint.list}\nView/edit list of saved endpoints`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async headerSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Header settings',
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.opt.header.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.opt.header.skipInCreate}\nDon't ask to add headers, always add default`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async nameSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Name settings',
				choices: [
					{	// INFO: Boolean
						value: 'Auto generate',
						description: this.ui.dim(`\n${this.opt.name.autoGenerate}\nAutomatically generate name from data in request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.opt.name.skipInCreate}\nDon't ask to add name when making new request`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async responseSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'Response settings',
				choices: [
					{	// INFO: Boolean
						value: 'View in editor',
						description: this.ui.dim(`\n${this.opt.response.viewInEditor}\nView response in default editor`),
					},
					{	// INFO: Boolean
						value: 'Require keypress on print',
						description: this.ui.dim(`\n${this.opt.response.requireKeypressOnPrint}\nRequire keypress between each table of data printed`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async urlSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: 'URL settings',
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.opt.endpoint.autoSaveFromRequest}\nAutomatically extract and save URL's from requests`),
					},
					{	// INFO: Boolean
						value: 'Skip list in create',
						description: this.ui.dim(`\n${this.opt.endpoint.skipListInCreate}\nDon't show list of saved URL's when making new request`),
					},
					{	// INFO: Array<String>
						value: 'List',
						description: this.ui.dim(`\n${this.opt.endpoint.list}\nView/edit list of saved URL's`),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});
		}
	}

	async options() {
		let action = null;
		while (action !== 'Go back' || action !== 'Save changes') {
			action = await select({
				type: 'multiselect',
				loop: false,
				message: 'Settings',
				choices: [
					{
						value: 'Global settings',
						description: this.ui.dim('Penguin CLI global settings'),
					},
					{
						value: 'Token settings',
						description: this.ui.dim('Access token settings'),
					},
					{
						value: 'Body settings',
						description: this.ui.dim('Request body settings'),
					},
					{
						value: 'Content-Type settings',
						description: this.ui.dim('Content-Type settings'),
					},
					{
						value: 'Endpoint settings',
						description: this.ui.dim('API endpoint settings'),
					},
					{
						value: 'Header settings',
						description: this.ui.dim('Request headers settings'),
					},
					{
						value: 'Name settings',
						description: this.ui.dim('Request name/identifier settings'),
					},
					{
						value: 'Response settings',
						description: this.ui.dim('Fetch response settings'),
					},
					{
						value: 'URL settings',
						description: this.ui.dim('API URL settings'),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Save changes',
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			}); // await select

			if (action === 'Save changes') {
				// TODO: Save changes!
				action = 'Go back';
				return;
			} else if (action === 'Go back') {
				return;
			}
		} // while action

		return;
	} // async options()

}

export default Settings;

// INFO:
// settings: {
// 	global: {
// 		confirmOnDelete: false,
// 		confirmOnExit: false,
// 		confirmUnsavedChanges: false,
// 	},
// 	accessToken: {
// 		autoSaveFromRequest: true,
// 		autoAddInRequest: true,
// 		clearOnExit: false,
// 		value: "",
// 	},
// 	body: {
// 		defaultValue: "",
// 		skipInCreate: false,
// 	},
// 	contentType: {
// 		defaultValue: "",
// 		skipInCreate: false,
// 	},
// 	endpoint: {
// 		autoSaveFromRequest: true,
// 		skipListInCreate: false,
// 		list: [],
// 	},
// 	header: {
// 		defaultValue: "",
// 		skipInCreate: false,
// 	},
// 	name: {
// 		autoGenerate: false,
// 		skipInCreate: false,
// 	},
// 	response: {
// 		viewInEditor: false,
// 		requireKeypressOnPrint: false,
// 	},
// 	url: {
// 		autoSaveFromRequest: true,
// 		skipListInCreate: false,
// 		list: [],
// 	},
// },
