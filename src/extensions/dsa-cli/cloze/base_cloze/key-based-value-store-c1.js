class TimeMap {
	constructor() {
		this.map = {};
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 * @param {number} timestamp
	 * Time O(1) | Space O(1)
	 * @return {void}
	 */
	set(key, value, timestamp) {
		const bucket = this.map[key] || [];

		this.map[key] = bucket;

		bucket.push([value, timestamp]);
	}

	/**
	 * @param {string} key
	 * @param {number} timestamp
	 * Time O(log(N)) | Space O(1)
	 * @return {string}
	 */
	get(key, timestamp, value = '', bucket = this.map[key] || []) {
		let [left, right] = [0, bucket.length - 1];

		while (left <= right) {
			const mid = (left + right) >> 1;
			const [guessValue, guessTimestamp] = bucket[mid];

			// TODO if the guess timestamp is less or equal than the target timestamp, then set the value to the guess value (Because is the best guess) and set the left to mid+1.

			const isTargetLess = timestamp < guessTimestamp;
			if (isTargetLess) right = mid - 1;
		}

		return value;
	}
}

module.exports = { Problem: TimeMap };
