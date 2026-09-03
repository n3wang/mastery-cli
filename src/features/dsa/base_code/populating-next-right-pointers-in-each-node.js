class ConnectTree {
	// Your code here
}

function Node(val, left = null, right = null, next = null) {
	this.val = val;
	this.left = left;
	this.right = right;
	this.next = next;
}

module.exports = { Problem: ConnectTree };
