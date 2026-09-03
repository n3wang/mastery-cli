class InsertDelete {
	constructor() {
		this.map = new Map();
		this.arr = [];
	}

	insert(val) {
		if (this.map.has(val)) return false;
		this.map.set(val, this.arr.length);
		this.arr.push(val);
		return true;
	}

	remove(val) {
		if (!this.map.has(val)) return false;
		const index = this.map.get(val);
		const last = this.arr[this.arr.length - 1];
		this.arr[index] = last;
		this.map.set(last, index);
		this.arr.pop();
		this.map.delete(val);
		return true;
	}

	RandomizedSet() {
		const index = Math.floor(Math.random() * this.arr.length);
		return this.arr[index];
	}
}

module.exports = { Problem: InsertDelete };
