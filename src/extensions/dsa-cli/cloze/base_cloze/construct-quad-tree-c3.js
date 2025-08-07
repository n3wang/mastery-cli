class ConstructQuadTree {
	// construct(grid) {
	//     return this.solve(grid, 0, 0, grid.length);
	// }

	solve(grid, x1 = 0, y1 = 0, length = 0) {
		if (length === 1) {
			return new Node(grid[x1][y1] === 1, true);
		}

		const topLeft = this.solve(grid, x1, y1, length / 2);
		const topRight = this.solve(grid, x1, y1 + length / 2, length / 2);
		const bottomLeft = this.solve(grid, x1 + length / 2, y1, length / 2);
		const bottomRight = this.solve(
			grid,
			x1 + length / 2,
			y1 + length / 2,
			length / 2
		);

		// TODO check if all are leaf and same value
		// If thats the case, return a new node with that value and isLeaf true

		/**
		 * Reasoning:
		 * These redundant operations can be avoided if we simply make a recursive call to the four sub-matrices instead of
		 *  first checking all the values. Once all four recursive calls are returned
		 * , we will decide whether to let these as child nodes of the root node or should be combined
		 * them into one as the root node. This decision will again depend on the values,
		 *  but we won't have to check all the cells; instead, we can just check
		 * if the four nodes are leaf nodes and all have the same value (value attribute).
		 * If it is, we can just return a root leaf node with a value same as the four nodes; otherwise,
		 * we will return a node with any value and having these nodes as the respective child nodes.
		 * View this case: https://assets.leetcode.com/uploads/2020/02/12/e2tree.png
		 */

		return new Node(
			false,
			false,
			topLeft,
			topRight,
			bottomLeft,
			bottomRight
		);
	}
}

class Node {
	constructor(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
		this.val = val;
		this.isLeaf = isLeaf;
		this.topLeft = topLeft || null;
		this.topRight = topRight || null;
		this.bottomLeft = bottomLeft || null;
		this.bottomRight = bottomRight || null;
	}
}

module.exports = { Problem: ConstructQuadTree };
