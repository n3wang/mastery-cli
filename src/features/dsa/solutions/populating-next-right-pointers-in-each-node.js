class ConnectTree {
	processChild(childNode) {
		if (childNode !== null) {
			// If the "prev" pointer is already set, i.e., if we
			// already found at least one node on the next level,
			// set up its next pointer.
			if (this.prev !== null) {
				this.prev.next = childNode;
			} else {
				// Else it means this child node is the first node
				// we have encountered on the next level, so, we
				// set the leftmost pointer.
				this.leftmost = childNode;
			}
			this.prev = childNode;
		}
	}

	connect(root) {
		if (root === null) {
			return root;
		}

		// The root node is the only node on the first level
		// and hence it's the leftmost node for that level.
		this.leftmost = root;

		// Variable to keep track of the leading node on the "current" level.
		let curr = this.leftmost;

		// We have no idea about the structure of the tree,
		// so, we keep going until we do find the last level.
		// The nodes on the last level won't have any children.
		while (this.leftmost !== null) {
			// "prev" tracks the latest node on the "next" level
			// while "curr" tracks the latest node on the current
			// level.
			this.prev = null;
			curr = this.leftmost;

			// We reset this so that we can reassign it to the leftmost
			// node of the next level. Also, if there isn't one, this
			// would help break us out of the outermost loop.
			this.leftmost = null;

			// Iterate on the nodes in the current level using
			// the next pointers already established.
			while (curr !== null) {
				// Process both the children and update the prev
				// and leftmost pointers as necessary.
				this.processChild(curr.left);
				this.processChild(curr.right);

				// Move onto the next node.
				curr = curr.next;
			}
		}

		return root;
	}
}

function Node(val, left = null, right = null, next = null) {
	this.val = val;
	this.left = left;
	this.right = right;
	this.next = next;
}

module.exports = { Problem: ConnectTree, Node };
