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
	cloneGraph = function (node, seen = new Map()) {};

	solve(node) {
		return this.cloneGraph(node);
	}
}

module.exports = { Problem: CloneGraph };
