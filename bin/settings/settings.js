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
	}

	async globalSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: chalk.yellow('Global settings'),
				choices: [
					{	// INFO: Boolean
						value: 'Confirm on delete',
						description: this.ui.dim(`\n${this.state.data.settings.global.confirmOnDelete}\nGet confirmation before deleting anything`),
					},
					{	// INFO: Boolean
						value: 'Confirm on exit',
						description: this.ui.dim(`\n${this.state.data.settings.global.confirmOnExit}\nGet confirmation before exiting Penguin CLI`),
					},
					{	// INFO: Boolean
						value: 'Confirm unsaved changes',
						description: this.ui.dim(`\n${this.state.data.settings.global.confirmUnsavedChanges}\nGet confirmation when leaving a menu without saving changes`),
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
				message: chalk.yellow('Token settings'),
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.state.data.settings.accessToken.autoSaveFromRequest}\nAutomatically extract and save access token from login requests`),
					},
					{	// INFO: Boolean
						value: 'Auto add in request',
						description: this.ui.dim(`\n${this.state.data.settings.accessToken.autoAddInRequest}\nAutomatically add access token in headers on all requests`),
					},
					{	// INFO: Boolean
						value: 'Clear on exit',
						description: this.ui.dim(`\n${this.state.data.settings.accessToken.clearOnExit}\nAutomatically remove access token when exiting Penguin CLI`),
					},
					{	// INFO: String
						value: 'Value',
						description: this.ui.dim(`\n${this.state.data.settings.accessToken.value}\nView/edit the access token`),
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
				message: chalk.yellow('Body settings'),
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.state.data.settings.body.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.state.data.settings.body.skipInCreate}\nDon't ask to add body, always add default`),
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
				message: chalk.yellow('Content-Type settings'),
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.state.data.settings.contentType.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.state.data.settings.contentType.skipInCreate}\nDon't ask to add content type, always add default`),
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
				message: chalk.yellow('Endpoint settings'),
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.autoSaveFromRequest}\nAutomatically extract and save endpoints from requests`),
					},
					{	// INFO: Boolean
						value: 'Skip list in create',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.skipListInCreate}\nDon't show list of saved endpoints when making new request`),
					},
					{	// INFO: Array<String>
						value: 'List',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.list}\nView/edit list of saved endpoints`),
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
				message: chalk.yellow('Header settings'),
				choices: [
					{	// INFO: String
						value: 'Default value',
						description: this.ui.dim(`\n${this.state.data.settings.header.defaultValue}\nThe default value when making a new request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.state.data.settings.header.skipInCreate}\nDon't ask to add headers, always add default`),
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
				message: chalk.yellow('Name settings'),
				choices: [
					{	// INFO: Boolean
						value: 'Auto generate',
						description: this.ui.dim(`\n${this.state.data.settings.name.autoGenerate}\nAutomatically generate name from data in request`),
					},
					{	// INFO: Boolean
						value: 'Skip in create',
						description: this.ui.dim(`\n${this.state.data.settings.name.skipInCreate}\nDon't ask to add name when making new request`),
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
				message: chalk.yellow('Response settings'),
				choices: [
					{	// INFO: Boolean
						value: 'View in editor',
						description: this.ui.dim(`\n${this.state.data.settings.response.viewInEditor}\nView response in default editor`),
					},
					{	// INFO: Boolean
						value: 'Require keypress on print',
						description: this.ui.dim(`\n${this.state.data.settings.response.requireKeypressOnPrint}\nRequire keypress between each table of data printed`),
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

			if (selection === 'View in editor') {
				this.state.data.settings.response.viewInEditor = !this.state.data.settings.response.viewInEditor;
				await this.state.save();
			}
		}
	}

	async urlSettings() {
		let selection = null;
		while (selection !== 'Go back') {
			selection = await select({
				type: 'multiselect',
				loop: false,
				message: chalk.yellow('URL settings'),
				choices: [
					{	// INFO: Boolean
						value: 'Auto save from request',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.autoSaveFromRequest}\nAutomatically extract and save URL's from requests`),
					},
					{	// INFO: Boolean
						value: 'Skip list in create',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.skipListInCreate}\nDon't show list of saved URL's when making new request`),
					},
					{	// INFO: Array<String>
						value: 'List',
						description: this.ui.dim(`\n${this.state.data.settings.endpoint.list}\nView/edit list of saved URL's`),
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
				message: chalk.yellow('Settings'),
				choices: [
					{
						value: 'Global',
						description: this.ui.dim('Penguin CLI global settings'),
					},
					{
						value: 'Token',
						description: this.ui.dim('Access token settings'),
					},
					{
						value: 'Body',
						description: this.ui.dim('Request body settings'),
					},
					{
						value: 'Content-Type',
						description: this.ui.dim('Content-Type settings'),
					},
					{
						value: 'Endpoint',
						description: this.ui.dim('API endpoint settings'),
					},
					{
						value: 'Header',
						description: this.ui.dim('Request headers settings'),
					},
					{
						value: 'Name',
						description: this.ui.dim('Request name/identifier settings'),
					},
					{
						value: 'Response',
						description: this.ui.dim('Fetch response settings'),
					},
					{
						value: 'URL',
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

			if (action === 'Global') {
				await this.globalSettings();
			} else if (action === 'Token') {
				await this.tokenSettings();
			} else if (action === 'Body') {
				await this.bodySettings();
			} else if (action === 'Content-Type') {
				await this.contentTypeSettings();
			} else if (action === 'Endpoint') {
				await this.endpointSettings();
			} else if (action === 'Header') {
				await this.headerSettings();
			} else if (action === 'Name') {
				await this.nameSettings();
			} else if (action === 'Response') {
				await this.responseSettings();
			} else if (action === 'URL') {
				await this.urlSettings();
			} else if (action === 'Save changes') {
				// FIX: Save changes!
				// TODO: Save changes!
				return;
			} else if (action === 'Go back') {
				return;
			}
		} // while action

		return;
	} // async options()

}

export default Settings;
