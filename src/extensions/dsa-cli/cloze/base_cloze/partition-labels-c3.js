class PartitionLabels {
	/**
	 * https://leetcode.com/problems/partition-labels/
	 * Time O(N) | Space(1)
	 * @param {string} S
	 * @return {number[]}
	 */
	partitionLabels = function (S) {
		const getLast = (S, lastSeen = []) => {
			for (const index in S) {
				/* Time O(N) */
				const code = getCode(S[Number(index)]);

				lastSeen[code] = Number(index); /* Space O(1) */
			}

			return lastSeen;
		};

		const getCode = char => char.charCodeAt(0) - 'a'.charCodeAt(0);

		const getAns = (S, lastSeen, left = 0, right = 0, labels = []) => {
			// TODO Loop through the string and get the last seen index of each character.
			// Update the right pointer to the max
			// If is equal to the right pointer,

			return labels;
		};

		const lastSeen = getLast(S);

		return getAns(S, lastSeen);
	};

	solve(s) {
		return this.partitionLabels(s);
	}
}

module.exports = { Problem: PartitionLabels };
