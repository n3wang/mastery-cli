class MinStack {
	/**
	 * @constructor
	 */
	constructor() {
		this.stack = [];
		this.minStack = [];
	}

	/**
	 * @param {number} val
	 * @return {void}
	 */
	push(val, { minStack } = this) {
		// TODO Complete the min stack push implementation. Check if the minimum is empty and add if that's the case.
	}

	/**
	 * @return {void}
	 */
	pop({ stack, minStack } = this) {
		const top = stack.pop(); /* Time O(1) */

		const canPopMin = top === this.getMin();
		if (canPopMin) minStack.pop(); /* Time O(1) */
	}

	/**
	 * @param {Array}
	 * @return {number}
	 */
	top(stack = this.stack) {
		return stack.length ? stack[stack.length - 1] /* Time O(1) */ : null;
	}

	/**
	 * @return {number}
	 */
	getMin(minStack = this.minStack) {
		return this.top(minStack); /* Time O(1) */
	}
}

module.exports = { Problem: MinStack };
