class MinPriorityQueue {
	constructor() {
		this.heap = [];
	}

	enqueue(element) {
		this.heap.push(element);
		this.sinkDown();
	}

	sinkDown() {
		let index = this.heap.length - 1;
		// TODO Complete the sinkDown function which bubbles up the element to the correct position. until it is index 0
		while (true) {
			// TODO You can get the parent index by using the formula: Math.floor((index - 1) / 2)
		}
	}

	swap(index1, index2) {
		const temp = this.heap[index1];
		this.heap[index1] = this.heap[index2];
		this.heap[index2] = temp;
	}

	dequeue() {
		const min = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.bubbleUp();
		}
		return min;
	}

	bubbleUp() {
		let index = 0;
		const length = this.heap.length;
		const element = this.heap[0];
		while (true) {
			const leftChildIndex = 2 * index + 1;
			const rightChildIndex = 2 * index + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIndex < length) {
				leftChild = this.heap[leftChildIndex];
				if (leftChild < element) {
					swap = leftChildIndex;
				}
			}

			if (rightChildIndex < length) {
				rightChild = this.heap[rightChildIndex];
				if (
					(swap === null && rightChild < element) ||
					(swap !== null && rightChild < leftChild)
				) {
					swap = rightChildIndex;
				}
			}

			if (swap === null) break;
			this.swap(index, swap);
			index = swap;
		}
	}

	front() {
		return this.heap[0];
	}

	size() {
		return this.heap.length;
	}

	isEmpty() {
		return this.size() === 0;
	}
}

class KthLargestElementInAnArray {
	/**
	 * https://leetcode.com/problems/kth-largest-element-in-an-array/
	 * Time O(N * log(K)) | Space O(K)
	 * @param {number[]} nums
	 * @param {number} k
	 * @return {number}
	 */
	findKthLargest = function (nums, k) {
		const minHeap = new MinPriorityQueue();

		for (const num of nums) {
			minHeap.enqueue(num);

			const isAtCapacity = k < minHeap.size();
			if (isAtCapacity) minHeap.dequeue();
		}

		return minHeap.front();
	};

	solve(nums, k) {
		return this.findKthLargest(nums, k);
	}
}

module.exports = { Problem: KthLargestElementInAnArray };
