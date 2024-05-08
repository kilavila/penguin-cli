import {
	editor,
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';
import chalk from 'chalk';

class SelectedRequest {

	constructor(state, ui) {
		this.state = state;
		this.ui = ui;
	}

	async run(request) {
		const reqHeaders = new Headers(request.headers ? request.headers : {});
		reqHeaders.append('Content-Type', request.contentType);
		reqHeaders.append('Authorization', `Bearer ${this.state.data.accessToken}`)

		console.log(request.body);

		let response = await fetch(request.url, {
			method: request.method,
			headers: reqHeaders,
			body: request.body,
		});

		this.ui.setTitle(`Response from: ${request.url}`);
		console.log(response);
		this.ui.setFooter();

		if (response) {
			response = await response.json();
			this.ui.setTitle(`Response JSON`);
			console.log(response);
			this.ui.setFooter();

		}
	}

	async edit(request) {
		let selectedValue = null;

		while (selectedValue !== 'Save changes' || selectedValue !== 'Go back') {
			this.ui.setTitle(`Selected request: ${request.name}`);
			console.log(request);
			this.ui.setFooter();

			selectedValue = await select({
				type: 'multiselect',
				loop: false,
				message: `Select a value to edit:`,
				choices: [
					{
						value: 'Save changes',
						description: 'Save changes and return to previous menu',
					},
					new Separator(),
					{
						value: 'Name',
						description: 'Edit the name of this request',
					},
					{
						value: 'Method',
						description: 'Edit the method of this request',
					},
					{
						value: 'URL',
						description: 'Edit the URL of this request',
					},
					{
						value: 'Content-Type',
						description: 'Edit the content-type of this request',
					},
					{
						value: 'Headers',
						description: 'Edit the headers of this request',
					},
					{
						value: 'Body',
						description: 'Edit the body of this request',
					},
					new Separator(),
					{
						value: 'Go back',
						description: 'Return to previous menu',
					},
				],
			});

			if (selectedValue === 'Name') {
				request.name = await input({
					message: chalk.yellow('Give the request an identifiable name:'),
					default: request.name,
				});
			} else if (selectedValue === 'Method') {
				request.method = await input({
					message: chalk.yellow('Select a method:'),
					default: request.method,
				});
			} else if (selectedValue === 'URL') {
				request.url = await input({
					message: chalk.yellow('Enter API URL:'),
					default: request.url,
				});
			} else if (selectedValue === 'Content-Type') {
				request.contentType = await input({
					message: chalk.yellow('Select Content-Type:'),
					default: request.contentType,
				});
			} else if (selectedValue === 'Headers') {
				request.headers = await editor({
					message: chalk.yellow('Enter request headers:'),
					default: request.headers,
				});
			} else if (selectedValue === 'Body') {
				request.body = await editor({
					message: chalk.yellow('Enter request body:'),
					default: request.body,
				});
			} else if (selectedValue === 'Save changes') {
				return { edited: true, editedRequest: request };
			} else {
				return { edited: false, editedRequest: null };
			}
		}
	}

	async options(request) {
		let action = null;

		while (action !== 'Go back') {
			this.ui.setTitle(`Selected request: ${request.name}`);
			console.log(request);
			this.ui.setFooter();

			action = await select({
				type: 'multiselect',
				loop: false,
				message: 'Request action:',
				choices: [
					{
						value: 'Run',
						description: 'Run this HTTP request',
					},
					{
						value: 'Edit',
						description: 'Edit this HTTP request',
					},
					{
						value: 'Delete',
						description: 'Delete this HTTP request',
					},
					new Separator(),
					{
						value: 'Go back',
						description: 'Return to previous menu',
					},
				],
			});

			if (action === 'Run') {
				this.run(request);
			} else if (action === 'Edit') {
				const result = await this.edit(request);

				if (result.edited && result.editedRequest) {
					await this.state.editRequest(request.id, result.editedRequest);
				}
			} else if (action === 'Delete') {
				this.state.deleteRequest(request.id);
			}
		}
	}

}

export default SelectedRequest;
