class LongestArithmeticSubsequenceGivenDifference {
	solve(arr, difference) {
		const dp = new Map();
		let answer = 1;

		for (const a of arr) {
			const beforeA = dp.get(a - difference) || 0;
			dp.set(a, beforeA + 1);
			answer = Math.max(answer, dp.get(a));
		}

		return answer;
	}
}

module.exports = { Problem: LongestArithmeticSubsequenceGivenDifference };
