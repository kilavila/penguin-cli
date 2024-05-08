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
		this.ui.setTitle(`Selected request: ${request.name}`);
		console.log(request);
		this.ui.setFooter();

		let edited = true;
		let editedRequest = request;

		let selectedValue = await select({
			type: 'multiselect',
			loop: false,
			message: `Select a value to edit:`,
			choices: [
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
		}

		return { edited, editedRequest };

		// TODO: Select which values to edit then save when finished
		// FIX: Not working when editing, returns [object object]
		// const body = await editor({
		// 	message: 'Edit the request',
		// 	default: `${request.body}`
		// });
	}

	async options(request) {
		this.ui.setTitle(`Selected request: ${request.name}`);
		console.log(request);
		this.ui.setFooter();

		const action = await select({
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
			const { edited, editedRequest } = await this.edit(request);

			if (edited) {
				await this.state.editRequest(request.id, editedRequest);
			}
		} else if (action === 'Delete') {
			this.state.deleteRequest(request.id);
		}
	}

}

export default SelectedRequest;
