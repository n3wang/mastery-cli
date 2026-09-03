class ConstructQuadTree {
	// construct(grid) {
	//     return this.solve(grid, 0, 0, grid.length);
	// }

	solve(grid, x1 = 0, y1 = 0, length = 0) {
		if (length === 1) {
			return new Node(grid[x1][y1] === 1, true);
		}

		// TODO Recursively solve the top left, top right, bottom left, and bottom right quadrants
		//  Note that length is divided by 2. and top-bottom is x axis and left-right is y axis

		if (
			topLeft.isLeaf &&
			topRight.isLeaf &&
			bottomLeft.isLeaf &&
			bottomRight.isLeaf &&
			topLeft.val === topRight.val &&
			topRight.val === bottomLeft.val &&
			bottomLeft.val === bottomRight.val
		) {
			return new Node(topLeft.val, true);
		}

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
