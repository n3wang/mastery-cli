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
		// TODO Compelte the push left
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
		const output = [];
		let deque = new Deque();
		let left = 0;
		let right = 0;

		while (right < nums.length) {
			// pop from the rightmost if the new value is smaller, making the deque always sorted increasingly or equals like 6, 3. 1 => would replace if finds smaller like this: new is 5 then dequeue becomes 6, 5. Being the left one always the largest, if it becomes [] then it will still add the next value on the dequeue.
			while (deque.right && nums[deque.right.value] < nums[right])
				deque.popRight();

			deque.pushRight(right);

			// remove left if the left pointer is pointing something outside the 3 wide windows.
			if (left > deque.left.value) deque.popLeft();

			// If the right pointer is enough to create a 3 pointer, then start adding to the max items.
			if (right + 1 >= k) {
				output.push(nums[deque.left.value]);
				left++;
			}
			right++;
		}
		return output;
	}
}

module.exports = { Problem: MaxSlidingWindow };
