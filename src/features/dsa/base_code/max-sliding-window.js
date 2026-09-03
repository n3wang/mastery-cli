function Node(value) {
	this.value = value;
	this.prev = null;
	this.next = null;
}

function Deque() {
	this.left = null;
	this.right = null;
	this.size = 0;
	this.pushRight = function (value) {
		const node = new Node(value);
		if (this.size == 0) {
			this.left = node;
			this.right = node;
		} else {
			this.right.next = node;
			node.prev = this.right;
			this.right = node;
		}
		this.size++;
		return this.size;
	};
	this.popRight = function () {
		if (this.size == 0) return null;
		const removedNode = this.right;
		this.right = this.right.prev;
		if (this.right) this.right.next = null;
		this.size--;
		return removedNode;
	};
	this.pushLeft = function (value) {
		const node = new Node(value);
		if (this.size == 0) {
			this.left = node;
			this.right = node;
		} else {
			this.left.prev = node;
			node.next = this.left;
			this.left = node;
		}
		this.size++;
		return this.size;
	};
	this.popLeft = function () {
		if (this.size == 0) return null;
		const removedNode = this.left;
		this.left = this.left.next;
		if (this.left) this.left.prev = null;
		this.size--;
		return removedNode;
	};
}

class MaxSlidingWindow {
	solve(nums, k) {
		// Your code here
	}
}

module.exports = { Problem: MaxSlidingWindow };
