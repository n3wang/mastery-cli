class SortKSortedArrayProblem {
	solve() {
		console.log('Hello World!');
	}
}

function sortKSortedArray(array, k) {
	const minHeapWithKElements = new MinHeap(
		array.slice(0, Math.min(k + 1, array.length))
	);

	let nextIndexToInserElement = 0;
	for (let idx = k + 1; idx < array.length; idx++) {
		const minElement = minHeapWithKElements.remove();
		array[nextIndexToInserElement] = minElement;
		nextIndexToInserElement++;

		const currentElement = array[idx];
		minHeapWithKElements.insert(currentElement);
	}

	while (!minHeapWithKElements.isEmpty()) {
		array[nextIndexToInserElement] = minHeapWithKElements.remove();
		nextIndexToInserElement++;
	}

	return array;
}

class MinHeap {
	constructor(array) {
		this.heap = this.buildHeap(array);
	}

	isEmpty() {
		return this.heap.length === 0;
	}

	buildHeap(array) {
		const firstParentIdx = Math.floor((array.length - 2) / 2);
		for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
			this.siftDown(currentIdx, array.length - 1, array);
		}
		return array;
	}

	siftDown(currentIdx, endIdx, heap) {
		let childOneIdx = currentIdx * 2 + 1;
		while (childOneIdx <= endIdx) {
			const childTwoIdx =
				currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
			let idxToSwap;
			if (childTwoIdx !== -1) {
				if (heap[childTwoIdx] < heap[childOneIdx]) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
			} else {
				idxToSwap = childOneIdx;
			}

			if (heap[idxToSwap] < heap[currentIdx]) {
				this.swap(currentIdx, idxToSwap, heap);
				currentIdx = idxToSwap;
				childOneIdx = currentIdx * 2 + 1;
			} else {
				return;
			}
		}
	}

	siftUp(currentIdx, heap) {
		let parentIdx = Math.floor((currentIdx - 1) / 2);
		while (currentIdx > 0) {
			if (heap[currentIdx] < heap[parentIdx]) {
				this.swap(currentIdx, parentIdx, heap);
				currentIdx = parentIdx;
				parentIdx = Math.floor((currentIdx - 1) / 2);
			} else {
				return;
			}
		}
	}

	peek() {
		return this.heap[0];
	}

	remove() {
		this.swap(0, this.heap.length - 1, this.heap);
		const valueToRemove = this.heap.pop();
		this.siftDown(0, this.heap.length - 1, this.heap);
		return valueToRemove;
	}

	insert(value) {
		this.heap.push(value);
		this.siftUp(this.heap.length - 1, this.heap);
	}

	swap(i, j, heap) {
		const temp = heap[j];
		heap[j] = heap[i];
		heap[i] = temp;
	}
}

module.exports = { Problem: SortKSortedArrayProblem };
