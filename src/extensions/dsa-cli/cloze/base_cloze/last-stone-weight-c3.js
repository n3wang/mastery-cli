class MaxPriorityQueue {
	constructor() {
		this.heap = [];
	}

	enqueue(element) {
		this.heap.push(element);
		this.bubbleUp();
	}

	bubbleUp() {
		let index = this.heap.length - 1;
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.heap[parentIndex] >= this.heap[index]) break;
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	swap(index1, index2) {
		const temp = this.heap[index1];
		this.heap[index1] = this.heap[index2];
		this.heap[index2] = temp;
	}

	dequeue() {
		const max = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.sinkDown();
		}
		return max;
	}

	sinkDown() {
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
				if (leftChild > element) {
					swap = leftChildIndex;
				}
			}

			if (rightChildIndex < length) {
				rightChild = this.heap[rightChildIndex];
				if (
					(swap === null && rightChild > element) ||
					(swap !== null && rightChild > leftChild)
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

class LastStoneWeight {
	/**
	 * https://leetcode.com/problems/last-stone-weight/
	 * Time O(N * log(N)) | Space O(N)
	 * @param {number[]} stones
	 * @return {number}
	 */
	lastStoneWeight = stones => {
		const getMaxHeap = (stones, maxHeap = new MaxPriorityQueue()) => {
			for (const stone of stones) {
				maxHeap.enqueue(stone);
			}

			return maxHeap;
		};

		const shrink = maxHeap => {
			while (1 < maxHeap.size()) {
				const [x, y] = [maxHeap.dequeue(), maxHeap.dequeue()];
				const difference = x - y;

				const isPositive = 0 < difference;
				if (isPositive) maxHeap.enqueue(difference);
			}
		};

		// TODO Implement max Heap
	};

	solve(stones) {
		return this.lastStoneWeight(stones);
	}
}

module.exports = { Problem: LastStoneWeight };
