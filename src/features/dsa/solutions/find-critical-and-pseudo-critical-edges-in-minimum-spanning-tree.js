class FindCriticalAndPseudoCriticalEdgesInMinimumSpanningTree {
	solve(n, edges) {
		return this.findCriticalAndPseudoCriticalEdges(n, edges);
	}

	findCriticalAndPseudoCriticalEdges(n, edges) {
		// Add index to edges for tracking
		const m = edges.length;
		const newEdges = new Array(m);

		for (let i = 0; i < m; i++) {
			newEdges[i] = [...edges[i], i];
		}

		// Sort edges based on weight
		newEdges.sort((a, b) => a[2] - b[2]);

		// Find MST weight using union-find
		const ufStd = new UnionFind(n);
		let stdWeight = 0;
		for (const edge of newEdges) {
			const [u, v, weight] = edge;
			if (ufStd.union(u, v)) {
				stdWeight += weight;
			}
		}

		const result = [[], []];

		// Check each edge for critical and pseudo-critical
		for (let i = 0; i < m; i++) {
			// Ignore this edge and calculate MST weight
			const ufIgnore = new UnionFind(n);
			let ignoreWeight = 0;
			for (let j = 0; j < m; j++) {
				if (i !== j) {
					const [u, v, weight] = newEdges[j];
					if (ufIgnore.union(u, v)) {
						ignoreWeight += weight;
					}
				}
			}
			// If the graph is disconnected or the total weight is greater,
			// the edge is critical
			if (ufIgnore.maxSize < n || ignoreWeight > stdWeight) {
				result[0].push(newEdges[i][3]);
			} else {
				// Force this edge and calculate MST weight
				const ufForce = new UnionFind(n);
				const [u, v, forceWeight] = newEdges[i];
				ufForce.union(u, v);
				for (let j = 0; j < m; j++) {
					if (i !== j) {
						const [u, v, weight] = newEdges[j];
						if (ufForce.union(u, v)) {
							forceWeight += weight;
						}
					}
				}
				// If total weight is the same, the edge is pseudo-critical
				if (forceWeight === stdWeight) {
					result[1].push(newEdges[i][3]);
				}
			}
		}

		return result;
	}
}

class UnionFind {
	constructor(n) {
		this.parent = new Array(n);
		this.size = new Array(n);
		this.maxSize = 1;
		for (let i = 0; i < n; i++) {
			this.parent[i] = i;
			this.size[i] = 1;
		}
	}

	find(x) {
		// Finds the root of x
		if (x !== this.parent[x]) {
			this.parent[x] = this.find(this.parent[x]);
		}
		return this.parent[x];
	}

	union(x, y) {
		// Connects x and y
		const rootX = this.find(x);
		const rootY = this.find(y);
		if (rootX !== rootY) {
			if (this.size[rootX] < this.size[rootY]) {
				const temp = rootX;
				this.parent[rootX] = rootY;
				this.size[rootY] += this.size[rootX];
				this.maxSize = Math.max(this.maxSize, this.size[rootY]);
			} else {
				this.parent[rootY] = rootX;
				this.size[rootX] += this.size[rootY];
				this.maxSize = Math.max(this.maxSize, this.size[rootX]);
			}
			return true;
		}
		return false;
	}
}

// Example usage:
// const solution = new Solution();
// const n = 4;
// const edges = [
//     [0, 1, 1],
//     [1, 2, 1],
//     [2, 3, 2],
//     [0, 3, 2],
//     [0, 2, 2]
// ];
// const result = solution.findCriticalAndPseudoCriticalEdges(n, edges);
// console.log(result); // Output: [[], [0, 1, 2, 3, 4]]

module.exports = {
	Problem: FindCriticalAndPseudoCriticalEdgesInMinimumSpanningTree
};
