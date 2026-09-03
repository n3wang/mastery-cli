class Node {
	constructor(val) {
		this.val = val;
		this.neighbors = [];
	}

	push(neighbor) {
		this.neighbors.push(neighbor);
	}
}

class CloneGraph {
	/**
	 * https://leetcode.com/problems/clone-graph/
	 * Time O(V + E) | Space O(N)
	 * @param {Node} node
	 * @return {Node}
	 */
	cloneGraph = function (node, seen = new Map()) {
		const dfs = (node, seen) => {
			const clone = new Node(node.val);

			seen.set(node, clone); /*               | Space O(N) */

			// TODO Iterate over each of the current node neighbor,
			// Recursivelly getts the cloned neighbor and pushes it to the neigbors

			return clone;
		};

		const isBaseCase = node === null;
		if (isBaseCase) return null;

		if (seen.has(node)) return seen.get(node);

		return dfs(node, seen); /* Time O(V + E) | Space O(N) */
	};

	solve(node) {
		return this.cloneGraph(node);
	}
}

module.exports = { Problem: CloneGraph };
