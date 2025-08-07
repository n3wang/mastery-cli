class IntervleavingString {
	/**
	 * DP - Bottom Up
	 * Array - Tabulation
	 * Time O(N * M) | Space O(M)
	 * https://leetcode.com/problems/interleaving-string/
	 * @param {string} s1
	 * @param {string} s2
	 * @param {string} s3
	 * @return {boolean}
	 */
	isInterleave = (s1, s2, s3) => {
		var initTabu = s2 =>
			new Array(s2.length + 1).fill(false); /* Time O(M) | Space O(M) */

		var search = (s1, s2, s3, tabu) => {
			const [rows, cols] = [s1.length, s2.length];

			for (let row = 0; row <= rows; row++) {
				/* Time O(N)*/
				for (let col = 0; col <= cols; col++) {
					/* Time O(M)*/
					tabu[col] =
						/* Space O(M)*/
						hasMatch(s1, s2, s3, row, col, tabu);
				}
			}
		};

		var hasMatch = (s1, s2, s3, i, j, tabu) => {
			const isBaseCase1 = i === 0 && j === 0;
			if (isBaseCase1) return true;

			const isBaseCase2 = i === 0;
			if (isBaseCase2) return getRight(i, j, s2, s3, tabu);

			const isBaseCase3 = j === 0;
			if (isBaseCase3) return getLeft(i, j, s1, s3, tabu);

			return getLeft(i, j, s1, s3, tabu) || getRight(i, j, s2, s3, tabu);
		};

		var getLeft = (i, j, s1, s3, tabu) =>
			tabu[j] && s1[i - 1] === s3[i + j - 1];

		var getRight = (i, j, s2, s3, tabu) =>
			tabu[j - 1] && s2[j - 1] === s3[i + j - 1];

		const isBaseCase = s3.length !== s1.length + s2.length;
		if (isBaseCase) return false;

		const tabu = initTabu(s2); /* Time O(M)     | Space O(M) */

		search(s1, s2, s3, tabu); /* Time O(N * M) | Space O(M) */

		return tabu[s2.length];
	};

	solve(s1, s2, s3) {
		return this.isInterleave(s1, s2, s3);
	}
}

module.exports = { Problem: IntervleavingString };
