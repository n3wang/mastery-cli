class ConnectingCitiesWithMinimumCost {
	solve(N, connections) {
		return this.minimumCost(N, connections);
	}

	minimumCost(N, connections) {
		const disjointSet = new DisjointSet(N);
		connections.sort((a, b) => a[2] - b[2]);

		let total = 0;
		let cost = 0;
		for (const connection of connections) {
			const a = connection[0];
			const b = connection[1];
			if (disjointSet.isInSameGroup(a, b)) continue;

			disjointSet.union(a, b);
			cost += connection[2];
			total++;
		}

		if (total === N - 1) {
			return cost;
		} else {
			return -1;
		}
	}
}

class DisjointSet {
	constructor(N) {
		this.parents = new Array(N + 1);
		this.weights = new Array(N + 1);
		for (let i = 1; i <= N; ++i) {
			this.parents[i] = i;
			this.weights[i] = 1;
		}
	}

	union(a, b) {
		const rootA = this.find(a);
		const rootB = this.find(b);
		if (rootA === rootB) return;

		if (this.weights[rootA] > this.weights[rootB]) {
			this.parents[rootB] = rootA;
			this.weights[rootA] += this.weights[rootB];
		} else {
			this.parents[rootA] = rootB;
			this.weights[rootB] += this.weights[rootA];
		}
	}

	find(a) {
		while (a !== this.parents[a]) {
			this.parents[a] = this.parents[this.parents[a]];
			a = this.parents[a];
		}
		return a;
	}

	isInSameGroup(a, b) {
		return this.find(a) === this.find(b);
	}
}

// // Example usage:
// const solution = new Solution();
// const N = 3;
// const connections = [
//     [1, 2, 5],
//     [1, 3, 6],
//     [2, 3, 1]
// ];
// const result = solution.minimumCost(N, connections);
// console.log(result); // Output: 6

module.exports = { Problem: ConnectingCitiesWithMinimumCost };
