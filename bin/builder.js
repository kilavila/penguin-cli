import {
	editor,
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';
import { init } from '@paralleldrive/cuid2';

class Builder {

	constructor() { }

	generateId = init({
		random: Math.random,
		length: 4,
		fingerprint: 'penguin-cli',
	});

	async newRequest() {
		const id = this.generateId();

		const name = await input({ message: 'Give the request a identifiable name' });

		const method = await select({
			type: 'multiselect',
			loop: false,
			message: 'Select a method',
			choices: [
				{ value: 'GET' },
				{ value: 'POST' },
				{ value: 'PUT' },
				{ value: 'DELETE' },
			],
		});

		const url = await input({ message: 'Enter API URL' });

		let contentType = await select({
			type: 'multiselect',
			loop: false,
			message: 'Select Content-Type',
			choices: [
				{ value: 'application/json' },
				{ value: 'text/html' },
				{ value: 'application/pdf' },
				new Separator(),
				{ value: 'View all' },
			],
		});
		if (contentType === 'View all') {
			contentType = await select({
				type: 'multiselect',
				loop: false,
				message: 'Select Content-Type',
				choices: [
					{ value: 'application/json' },
					{ value: 'text/html' },
					{ value: 'application/pdf' },
					{ value: 'application/xml' },
					{ value: 'text/plain' },
					{ value: 'text/css' },
					{ value: 'text/javascript' },
					{ value: 'image/jpeg' },
					{ value: 'image/png' },
					{ value: 'image/gif' },
					{ value: 'image/svg+xml' },
					{ value: 'audio/mpeg' },
					{ value: 'audio/wav' },
					{ value: 'video/mp4' },
					{ value: 'video/webm' },
					{ value: 'multipart/form-data' },
					{ value: 'application/octet-stream' },
					{ value: 'application/x-www-form-urlencoded' },
					{ value: 'application/zip' },
					{ value: 'application/msword' },
					{ value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
					{ value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
					{ value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
				],
			});
		}

		const addHeaders = await confirm({
			message: 'Add request headers?',
			default: false,
		});
		let headers = null;
		if (addHeaders) {
			headers = await editor({
				message: 'Enter request headers',
				postfix: 'json',
				default: `{
					"Authorization": "This field will be added automatically for you if make a login request",
					"Content-Type": "Your selected content type will also be added automatically",
				}`,
			});
		}

		const addBody = await confirm({
			message: 'Add request body?',
			default: false,
		});
		let body = null;
		if (addBody) {
			body = await editor({
				message: 'Enter request body',
				postfix: contentType.split('/')[1],
				default: `{
					"email": "my-email@test.com",
					"password": "my-password"
				}`,
			});
		}

		const request = {
			id: id,
			name: name,
			method: method,
			url: url,
			contentType: contentType,
			headers: headers,
			body: body,
		};

		return request;
	}

}

export default Builder;

// const req = {
// 	url: 'https://api.com/endpoint',	// required
// 	method: 'GET',						// required
// 	cache: "only-if-cached",			// optional
// 	mode: 'same-origin',				// optional
// 	headers: [],						// optional
// 	body: []							// optional
// }
