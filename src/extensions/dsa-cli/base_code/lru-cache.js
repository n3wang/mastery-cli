/**
 * https://leetcode.com/problems/lru-cache/
 * Time O(1) | Space O(N)
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.map = new Map();

		this.head = {};
		this.tail = {};

		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	put(key, value) {
		// TO Complete
	}

	get(key) {
		// TODO
	}
}

module.exports = { Problem: LRUCache };
