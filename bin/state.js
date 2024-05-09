import Conf from 'conf';
import Builder from './builder.js';

class State {

	constructor(ui) {
		this.db = new Conf({ projectName: 'pui' });
		this.builder = new Builder();
		this.ui = ui;

		this.data = {
			requests: [],
			settings: {
				global: {
					confirmOnDelete: false,
					confirmOnExit: false,
					confirmUnsavedChanges: false,
				},
				accessToken: {
					autoSaveFromRequest: true,
					autoAddInRequest: true,
					clearOnExit: false,
					value: "",
				},
				body: {
					defaultValue: "",
					skipInCreate: false,
				},
				contentType: {
					defaultValue: "",
					skipInCreate: false,
				},
				endpoint: {
					autoSaveFromRequest: true,
					skipListInCreate: false,
					list: [],
				},
				header: {
					defaultValue: "",
					skipInCreate: false,
				},
				name: {
					autoGenerate: false,
					skipInCreate: false,
				},
				response: {
					viewInEditor: false,
					requireKeypressOnPrint: false,
				},
				url: {
					autoSaveFromRequest: true,
					skipListInCreate: false,
					list: [],
				},
			},
		};
	}

	async save() {
		await this.db.set('pui', this.data);
	}

	init() {
		let data = this.db.get('pui');

		if (data && data.requests.length > 0) {
			this.data = data;
			const menuItems = [];

			data.requests.map(req => {
				const item = {
					value: `${req.id} | ${req.name}`,
					description: this.ui.dim(`\n${req.method} ${req.url}`),
				};
				menuItems.push(item);
			});

			return menuItems;
		} else {
			return [{
				value: 'No requests found! Create a new request',
				description: this.ui.dim('\nBuild a new HTTP request')
			}];
		}
	}

	async createNewRequest() {
		const newRequest = await this.builder.newRequest();

		if (newRequest) {
			this.data.requests.push(newRequest);
			this.save();
		}
	}

	async editRequest(id, editedRequest) {
		let index = this.data.requests.findIndex(req => req.id === id);
		if (index !== -1) {
			this.data.requests.splice(index, 1, editedRequest);
			this.save();
		}
	}

	async deleteRequest(id) {
		const index = this.data.requests.findIndex(req => req.id === id);
		if (index !== -1) {
			this.data.requests.splice(index, 1);
			this.save();
		}
	}

	getSelected(selectedItem) {
		const id = selectedItem.split(' | ');
		const request = this.data.requests.find(req => req.id === id[0]);
		return request;
	}

}

export default State;
