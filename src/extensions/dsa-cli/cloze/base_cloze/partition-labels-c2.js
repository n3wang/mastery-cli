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

		// TODO create getCode that returns the number of the character to be used on the array.

		const getAns = (S, lastSeen, left = 0, right = 0, labels = []) => {
			for (const index in S) {
				/* Time O(N) */
				const code = getCode(S[Number(index)]);
				const lastSeenAt = lastSeen[code];

				right = Math.max(right, lastSeenAt);

				const isEqual = Number(index) === right;
				if (!isEqual) continue;

				const placement = Number(index) - left + 1;

				labels.push(placement);
				left = Number(index) + 1;
			}

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
