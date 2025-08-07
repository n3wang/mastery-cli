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
			for (const index in word) {
				for (const char of 'abcdefghijklmnopqrstuvwxyz') {
					const neighbor = getNeighbor(word, index, char);

					const hasSeen =
						!wordSet.has(neighbor) || seen.has(neighbor);
					if (hasSeen) continue;

					queue.enqueue([neighbor, depth + 1]);
					seen.add(neighbor);
				}
			}
		};

		const getNeighbor = (word, index, char) => {
			// TODO Create the neighbor by replacing the char at the index of the word.
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
