class Queue {
	constructor(init) {
		this.queue = init || [];
	}

	enqueue(element) {
		this.queue.push(element);
	}

	dequeue() {
		return this.queue.shift();
	}

	front() {
		return this.queue[0];
	}

	size() {
		return this.queue.length;
	}

	isEmpty() {
		return this.size() === 0;
	}
}

class WordLadder {
	/**
	 * https://leetcode.com/problems/word-ladder/
	 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
	 * @param {string} beginWord
	 * @param {string} endWord
	 * @param {string[]} wordList
	 * @return {number}
	 */
	ladderLength = function (beginWord, endWord, wordList) {
		const bfs = (queue, wordSet, seen, endWord) => {
			while (!queue.isEmpty()) {
				for (let i = queue.size() - 1; 0 <= i; i--) {
					const [word, depth] = queue.dequeue();
					// console.log("looping on the queue", word, depth, endWord);

					const isTarget = word === endWord;
					if (isTarget) return depth;

					transform(queue, wordSet, seen, word, depth);
				}
			}

			return 0;
		};
		const transform = (queue, wordSet, seen, word, depth) => {
			// TODO For each letter of the word, loop alphabet, and create the neighbor.
			// If the neighbor is either not in the wordSet or seen then skip otherwise enqueue the word, and remmeber that you seen it..
		};

		const getNeighbor = (word, index, char) => {
			const neighbor = word.split('');

			neighbor[index] = char;

			return neighbor.join('');
		};

		const [queue, wordSet, seen] = [
			new Queue([[beginWord, 1]]),
			new Set(wordList),
			new Set([beginWord])
		];
		// console.log('queue', queue);
		// console.log('wordSet', wordSet);
		// console.log('seen', seen);

		return bfs(
			queue,
			wordSet,
			seen,
			endWord
		); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
	};

	solve(beingWord, endWord, wordList) {
		return this.ladderLength(beingWord, endWord, wordList);
	}
}

module.exports = { Problem: WordLadder };
