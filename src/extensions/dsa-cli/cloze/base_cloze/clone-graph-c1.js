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
			// TODO Clone the node, set the node on seen from the clone.

			for (const neighbor of node.neighbors) {
				const cloneNeighbor = this.cloneGraph(
					neighbor,
					seen
				); /* Time O(V + E) | Space O(H) */

				clone.neighbors.push(
					cloneNeighbor
				); /*               | Space O(V + E) */
			}

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
