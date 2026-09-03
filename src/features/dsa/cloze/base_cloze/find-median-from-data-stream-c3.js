class MinPriorityQueue {
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
			if (this.heap[parentIndex] <= this.heap[index]) break;
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
		const min = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.sinkDown();
		}
		return min;
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

	top() {
		return this.heap[0];
	}
}

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

	top() {
		return this.heap[0];
	}
}

/**
 * https://leetcode.com/problems/find-median-from-data-stream/
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
class MedianFinder {
	constructor() {
		this.maxHeap = new MaxPriorityQueue();
		this.minHeap = new MinPriorityQueue();
	}

	/* Time O(log(N)) | Space (N) */
	insertNum(num) {
		this.addNum(num);
	}

	addNum(num, heap = this.getHeap(num)) {
		heap.enqueue(num);
		this.rebalance();
	}

	getHeap(num, { maxHeap, minHeap } = this) {
		const isFirst = maxHeap.isEmpty();
		const isGreater = num <= this.top(maxHeap);
		const isMaxHeap = isFirst || isGreater;
		return isMaxHeap ? maxHeap : minHeap;
	}

	rebalance({ maxHeap, minHeap } = this) {
		const canShiftMax = minHeap.size() + 1 < maxHeap.size();
		if (canShiftMax) return minHeap.enqueue(maxHeap.dequeue());

		const canShiftMin = maxHeap.size() < minHeap.size();
		if (canShiftMin) return maxHeap.enqueue(minHeap.dequeue());
	}

	/* Time O(1) | Space (1) */
	findMedian({ maxHeap, minHeap } = this) {
		// TODO If it is even, then get the average of the top of both heaps.
		// TODO If it is odd, then get the top of the maxHeap.
	}

	average(maxHeap, minHeap) {
		return (this.top(maxHeap) + this.top(minHeap)) / 2;
	}

	top(heap) {
		return heap.front() || 0;
	}
}

module.exports = { Problem: MedianFinder };
