import {
	editor,
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';

class SelectedRequest {

	constructor(state, ui) {
		this.state = state;
		this.ui = ui;
	}

	async run(req) {
		const loading = ora('Fetching data').start();
		loading.color = 'yellow';

		const headers = new Headers(req.headers ? req.headers : {});
		headers.append('Content-Type', req.contentType);
		headers.append('Authorization', `Bearer ${this.state.data.accessToken}`)

		let res = await fetch(req.url, {
			method: req.method,
			headers: headers,
			body: req.body,
		});

		let data = await res.json();
		loading.succeed('Printing response');

		this.ui.setTitle(
			chalk.yellow(res.status) + ': ' +
			chalk.green(res.statusText) +
			chalk.blue(' (' +
				req.method + ' ' +
				req.url + ')'
			)
		);
		console.log(res);

		if (this.state.data.settings.response.viewInEditor) {
			await editor({
				message: chalk.yellow('View response in default editor:'),
				postfix: '.json',
				default: JSON.stringify(data),
			});
		} else {
			console.log(data);
		}

		this.ui.setFooter();
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
						description: this.ui.dim('\nSave changes and return to previous menu'),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Name',
						description: this.ui.dim('\nEdit the name of this request'),
					},
					{
						value: 'Method',
						description: this.ui.dim('\nEdit the method of this request'),
					},
					{
						value: 'URL',
						description: this.ui.dim('\nEdit the URL of this request'),
					},
					{
						value: 'Content-Type',
						description: this.ui.dim('\nEdit the content-type of this request'),
					},
					{
						value: 'Headers',
						description: this.ui.dim('\nEdit the headers of this request'),
					},
					{
						value: 'Body',
						description: this.ui.dim('\nEdit the body of this request'),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
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
		const deleteReq = chalk.red('Delete');

		while (action !== 'Delete' || action !== 'Go back') {
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
						description: this.ui.dim('\nRun this HTTP request'),
					},
					{
						value: 'Edit',
						description: this.ui.dim('\nEdit this HTTP request'),
					},
					{
						value: deleteReq,
						description: this.ui.dim('\nDelete this HTTP request'),
					},
					new Separator(chalk.gray('--------------------------------------------------')),
					{
						value: 'Go back',
						description: this.ui.dim('\nReturn to previous menu'),
					},
				],
			});

			if (action === 'Run') {
				await this.run(request);
			} else if (action === 'Edit') {
				const result = await this.edit(request);

				if (result.edited && result.editedRequest) {
					await this.state.editRequest(request.id, result.editedRequest);
				}
			} else if (action === deleteReq) {
				await this.state.deleteRequest(request.id);
				return;
			} else {
				action = 'Go back';
				return;
			}
		}

		return;
	}

}

export default SelectedRequest;
