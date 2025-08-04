class SimilarStringGroups {
	solve(strs) {
		// TODO: Implement your solution
	}
}

class UnionFind {
	constructor(size) {
		this.parent = new Array(size);
		this.rank = new Array(size);

		for (let i = 0; i < size; i++) {
			this.parent[i] = i;
			this.rank[i] = 0;
		}
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]);
		}
		return this.parent[x];
	}

	unionSet(x, y) {
		const xSet = this.find(x);
		const ySet = this.find(y);

		if (xSet === ySet) {
			return;
		} else if (this.rank[xSet] < this.rank[ySet]) {
			this.parent[xSet] = ySet;
		} else if (this.rank[xSet] > this.rank[ySet]) {
			this.parent[ySet] = xSet;
		} else {
			this.parent[ySet] = xSet;
			this.rank[xSet]++;
		}
	}
}

module.exports = { Problem: SimilarStringGroups };