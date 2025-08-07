class SimilarStringGroups {
	solve(strs) {
		return this.numSimilarGroups(strs);
	}

	isSimilar(a, b) {
		let diff = 0;
		for (let i = 0; i < a.length; i++) {
			if (a.charAt(i) !== b.charAt(i)) {
				diff++;
			}
		}
		return diff === 0 || diff === 2;
	}

	numSimilarGroups(strs) {
		const n = strs.length;
		const dsu = new UnionFind(n);
		let count = n;

		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
				if (
					this.isSimilar(strs[i], strs[j]) &&
					dsu.find(i) !== dsu.find(j)
				) {
					count--;
					dsu.unionSet(i, j);
				}
			}
		}

		return count;
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
