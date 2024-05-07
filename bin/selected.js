import {
	editor,
	input,
	confirm,
	checkbox,
	select,
	Separator
} from '@inquirer/prompts';

class SelectedRequest {

	constructor(state, ui) {
		this.state = state;
		this.ui = ui;
	}

	async options(request) {
		console.log(request);

		const action = await select({
			type: 'multiselect',
			loop: false,
			message: `Select an option`,
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

		if (action === 'Delete') {
			this.state.deleteRequest(request.id);
		}
	}

}

export default SelectedRequest;
