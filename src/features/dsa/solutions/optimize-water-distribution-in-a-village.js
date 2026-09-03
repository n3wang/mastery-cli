class OptimizeWaterDistributionInAVillage {
	solve(n, wells, pipes) {
		return this.minCostToSupplyWater(n, wells, pipes);
	}

	minCostToSupplyWater(n, wells, pipes) {
		const orderedEdges = [];

		// Add the virtual vertex (index 0) along with the new edges.
		for (let i = 0; i < wells.length; ++i) {
			orderedEdges.push([0, i + 1, wells[i]]);
		}

		// Add the existing edges.
		for (let i = 0; i < pipes.length; ++i) {
			const edge = pipes[i];
			orderedEdges.push(edge);
		}

		// Sort the edges based on their cost.
		orderedEdges.sort((a, b) => a[2] - b[2]);

		// Iterate through the ordered edges.
		const uf = new UnionFind(n);
		let totalCost = 0;
		for (const edge of orderedEdges) {
			const house1 = edge[0];
			const house2 = edge[1];
			const cost = edge[2];
			// Determine if we should add the new edge to the final MST.
			if (uf.union(house1, house2)) {
				totalCost += cost;
			}
		}

		return totalCost;
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

// // Example usage:
// const solution = new Solution();
// const n = 3;
// const wells = [1, 2, 2];
// const pipes = [
//     [1, 2, 1],
//     [2, 3, 1]
// ];
// const result = solution.minCostToSupplyWater(n, wells, pipes);
// console.log(result); // Output: 3

module.exports = { Problem: OptimizeWaterDistributionInAVillage };
