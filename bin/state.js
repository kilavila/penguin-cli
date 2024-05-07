import Conf from 'conf';
import Builder from './builder.js';

class State {

	constructor(ui) {
		this.db = new Conf({ projectName: 'pui' });
		this.builder = new Builder();
		this.ui = ui;

		this.data = {
			options: {
				viewResultInEditor: false,
			},
			accessToken: null,
			requests: [],
		};

		this.idRegex = /^[^[]*\[(\w+)\].*$/g;
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
					value: `id: [${req.id}] -> ${req.name}`,
					description: `${req.method} ${req.url}`,
				};
				menuItems.push(item);
			});

			return menuItems;
		} else {
			return [{
				value: 'No HTTP requests found',
				disabled: true,
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

	async deleteRequest(id) {
		const index = this.data.requests.findIndex(req => req.id === id);
		if (index !== -1) {
			this.data.requests.splice(index, 1);
			this.save();
		}
	}

	getSelected(name) {
		const id = this.idRegex.exec(name);
		const request = this.data.requests.find(req => req.id === id[1]);
		return request;
	}

}

export default State;
