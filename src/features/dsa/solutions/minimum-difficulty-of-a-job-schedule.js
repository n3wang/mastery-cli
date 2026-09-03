class MinimumDifficultyOfAJobSchedule {
	solve(jobDifficulty, d) {
		const n = jobDifficulty.length;
		if (n < d) {
			return -1;
		}

		// minDiffPrevDay and minDiffCurrDay record the minimum total job difficulty
		// for the current day and previous day, respectively
		let minDiffPrevDay = new Array(n).fill(1000);
		let minDiffCurrDay = new Array(n).fill(0);
		let tmp;

		let stack = [];

		for (let day = 0; day < d; ++day) {
			// Use a monotonically decreasing stack to record job difficulties
			stack.length = 0;

			// The number of jobs needs to be no less than the number of days passed.
			for (let i = day; i < n; i++) {
				// We initialize minDiffCurrDay[i] as only performing 1 job at the i-th index.
				// At day 0, the minimum total job difficulty is to complete the 0th job only.
				// Otherwise, we increment minDiffPrevDay[i - 1] by the i-th job difficulty
				minDiffCurrDay[i] =
					i > 0
						? minDiffPrevDay[i - 1] + jobDifficulty[i]
						: jobDifficulty[i];

				// When we find the last element in the stack is smaller than or equal to the current job,
				// we need to pop out the element to maintain a monotonic decreasing stack.
				while (
					stack.length > 0 &&
					jobDifficulty[stack[stack.length - 1]] <= jobDifficulty[i]
				) {
					// If we include all jobs with index j+1 to i to the current d,
					// total job difficulty of the current d will be increased
					// by the amount of jobDifficulty[i] - jobDifficulty[j]
					const j = stack.pop();
					const diffIncr = jobDifficulty[i] - jobDifficulty[j];
					minDiffCurrDay[i] = Math.min(
						minDiffCurrDay[i],
						minDiffCurrDay[j] + diffIncr
					);
				}

				// When the last element in the stack is larger than the current element,
				// if we include all jobs with index j+1 to i to the current d,
				// the overall job difficulty will not change
				if (stack.length > 0) {
					minDiffCurrDay[i] = Math.min(
						minDiffCurrDay[i],
						minDiffCurrDay[stack[stack.length - 1]]
					);
				}

				// Update the monotonic stack by adding in the current index
				stack.push(i);
			}

			// Swap minDiffPrevDay and minDiffCurrDay arrays
			tmp = minDiffPrevDay;
			minDiffPrevDay = minDiffCurrDay;
			minDiffCurrDay = tmp;
		}

		return minDiffPrevDay[n - 1];
	}
}

module.exports = { Problem: MinimumDifficultyOfAJobSchedule };
