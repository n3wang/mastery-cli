

class Queue {

    constructor(init) {
        this.queue = init || []
    }

    enqueue(element) {
        this.queue.push(element)
    }

    dequeue() {
        return this.queue.shift()
    }

    front() {
        return this.queue[0]
    }

    size() {
        return this.queue.length
    }

    isEmpty() {
        return this.size() === 0
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
		
	};


    solve(beingWord, endWord, wordList) {
        return this.ladderLength(beingWord, endWord, wordList);
    }
}


module.exports = { Problem: WordLadder };