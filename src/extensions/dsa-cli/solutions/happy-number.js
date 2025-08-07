class HappyNumber {
	/**
	 * Slow Fast
	 * Time O(log(N)) | Space O(1)
	 * https://leetcode.com/problems/happy-number/
	 * @param {number} n
	 * @return {boolean}
	 */
	isHappy = n => {
		var getNext = (n, sum = 0) => {
			while (0 < n) {
				/* Time O(log(N)) */
				const remainder = n % 10;

				n = Math.floor(n / 10);
				sum += remainder * remainder;
			}

			return sum;
		};
		let [slow, fast] = [n, getNext(n)];

		const hasCyle = () => fast === 1 || slow === fast;
		while (!hasCyle()) {
			/* Time O(log(N)) */
			slow = getNext(slow); /* Time O(log(N)) */
			fast = getNext(getNext(fast)); /* Time O(log(N)) */
		}

		return fast === 1;
	};

	solve(n) {
		return this.isHappy(n);
	}
}

module.exports = { Problem: HappyNumber };
