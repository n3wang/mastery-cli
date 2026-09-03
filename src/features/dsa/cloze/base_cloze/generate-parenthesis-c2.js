class GenerateParentesis {
	/**
	 * https://leetcode.com/problems/generate-parentheses
	 * Time O(((4^N) / (N * SQRT(N)))) | Space O(((4^N) / (N * SQRT(N))))
	 * Time O(2^N) | Space O(2^N)
	 * @param {number} n
	 * @return {string[]}
	 */
	solve(n) {
		const dfs = (n, combos = [], open = 0, close = 0, path = []) => {
			const isBaseCase = path.length === n * 2;
			if (isBaseCase) {
				combos.push(path.join('')); /* Space O(N + N) */

				return combos;
			}

			const isOpen = open < n;
			if (isOpen)
				backTrackOpen(
					n,
					combos,
					open,
					close,
					path
				); /* Time O(2^N) | Space O(2^N) */

			const isClose = close < open;
			if (isClose)
				backTrackClose(
					n,
					combos,
					open,
					close,
					path
				); /* Time O(2^N) | Space O(2^N) */

			return combos;
		};

		//    TODO Backtrack Open

		const backTrackClose = (n, combos, open, close, path) => {
			path.push(')'); /*             | Space O(N) */
			dfs(
				n,
				combos,
				open,
				close + 1,
				path
			); /* Time O(2^N) | Space O(2^N) */
			path.pop();
		};

		return dfs(n);
	}
}

module.exports = { Problem: GenerateParentesis };
