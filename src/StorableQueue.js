const { getDirAbsoluteUri } = require('./utils_functions');

class StorableQueue {
	constructor({ name = '' } = {}) {
		this.elements = [];
		this.name = name;
		this.absolute_uri = getDirAbsoluteUri(`./user_data/temp/${this.name}`);
	}

	async load() {
		try {
			const { JsonDB, Config } = require('./local-modules/json-db');

			const db = new JsonDB(
				new Config(this.absolute_uri, true, false, '/')
			);
			this.elements = await db.getData('/elements');

			// console.log(`Loaded ${this.length} from ${this.name} | ${this.absolute_uri}`);
			return true;
		} catch {
			return false;
		}
	}

	async save() {
		const { JsonDB, Config } = require('./local-modules/json-db');

		const db = new JsonDB(new Config(this.absolute_uri, true, false, '/'));
		db.push('/elements', this.elements);
	}

	cleanQueue() {
		this.elements = [];
	}

	has(element) {
		return this.elements.includes(element);
	}

	enqueue(element) {
		// If not undefined
		if (element) this.elements.push(element);
	}

	enqueueMultiple(elements) {
		for (const element of elements) {
			this.enqueue(element);
		}
	}

	dequeue() {
		const item = this.elements.shift();
		this.head = 0;
		return item;
	}

	peek() {
		return this.elements[0];
	}

	get lastElement() {
		return this.elements[this.length - 1];
	}

	get length() {
		return this.elements.length;
	}

	get isEmpty() {
		return this.length === 0;
	}
}

module.exports = { StorableQueue };
