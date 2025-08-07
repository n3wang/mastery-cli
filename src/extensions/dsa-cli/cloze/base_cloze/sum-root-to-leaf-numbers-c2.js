class SumNumbers {
	solve(root) {
		let rootToLeaf = 0;
		let currNumber = 0;
		let steps;
		let predecessor;

		while (root !== null) {
			// If there is a left child,
			// then compute the predecessor.
			// If there is no link predecessor.right = root --> set it.
			// If there is a link predecessor.right = root --> break it.
			if (root.left !== null) {
				// Predecessor node is one step to the left
				// and then to the right till you can.
				predecessor = root.left;
				steps = 1;
				while (
					predecessor.right !== null &&
					predecessor.right !== root
				) {
					predecessor = predecessor.right;
					++steps;
				}

				// Set link predecessor.right = root
				// and go to explore the left subtree
				if (predecessor.right === null) {
					currNumber = currNumber * 10 + root.val;
					predecessor.right = root;
					root = root.left;
				}
				// Break the link predecessor.right = root
				// Once the link is broken,
				// it's time to change the subtree and go to the right
				else {
					// If you're on the leaf, update the sum
					if (predecessor.left === null) {
						rootToLeaf += currNumber;
					}
					// This part of the tree is explored, backtrack
					for (let i = 0; i < steps; ++i) {
						currNumber = Math.floor(currNumber / 10);
					}
					predecessor.right = null;
					root = root.right;
				}
			}

			// If there is no left child
			// then just go right.
			else {
				currNumber = currNumber * 10 + root.val;
				// If you're on the leaf, update the sum
				if (root.right === null) {
					rootToLeaf += currNumber;
				}
				root = root.right;
			}
		}
		return rootToLeaf;
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: SumNumbers, TreeNode };
