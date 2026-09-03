class OptimizeWaterDistributionInAVillage {
	solve(n, wells, pipes) {
		// TODO: Implement your solution
	}
}

class UnionFind {
	constructor(size) {
		this.group = new Array(size + 1);
		this.rank = new Array(size + 1);
		for (let i = 0; i <= size; ++i) {
			this.group[i] = i;
			this.rank[i] = 0;
		}
	}

	find(person) {
		if (this.group[person] !== person) {
			this.group[person] = this.find(this.group[person]);
		}
		return this.group[person];
	}

	union(person1, person2) {
		const group1 = this.find(person1);
		const group2 = this.find(person2);
		if (group1 === group2) {
			return false;
		}

		if (this.rank[group1] > this.rank[group2]) {
			this.group[group2] = group1;
		} else if (this.rank[group1] < this.rank[group2]) {
			this.group[group1] = group2;
		} else {
			this.group[group1] = group2;
			this.rank[group2] += 1;
		}

		return true;
	}
}

module.exports = { Problem: OptimizeWaterDistributionInAVillage };
