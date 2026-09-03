class Problem {
	/**
	 * DP - Bottom Up
	 * Matrix - Tabulation
	 * Time O(N * M) | Space O(M)
	 * https://leetcode.com/problems/distinct-subsequences/
	 * @param {string} s
	 * @param {string} t
	 * @return {number}
	 */
	numDistinct = (s, t) => {
		var initTabu = t =>
			new Array(t.length).fill(0); /* Time O(M) | Space O(M) */

		var search = (s, t, tabu) => {
			for (let row = s.length - 1; 0 <= row; row--) {
				/* Time O(N) */
				let prev = 1;

				for (let col = t.length - 1; 0 <= col; col--) {
					/* Time O(M) */
					const curr = tabu[col];

					const isEqual = s[row] === t[col];
					if (isEqual) tabu[col] += prev; /* Space O(M) */

					prev = curr;
				}
			}
		};
		const tabu = initTabu(t); /* Time O(M) | Space O(M) */

		search(s, t, tabu); /* Time O(N * M) | Space O(M) */

		return tabu[0];
	};

	solve(s, t) {
		return this.numDistinct(s, t);
	}
}

module.exports = { Problem };
