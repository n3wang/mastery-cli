class PartitionToKEqualSumSubsets {
	solve(arr, k) {
		let totalArraySum = 0;
		const n = arr.length;

		for (let i = 0; i < n; ++i) {
			totalArraySum += arr[i];
		}

		// If the total sum is not divisible by k, we can't make subsets.
		if (totalArraySum % k !== 0) {
			return false;
		}

		const targetSum = totalArraySum / k;

		const subsetSum = new Array(1 << n).fill(-1);
		// Initially, only one state is valid, i.e., don't pick anything.
		subsetSum[0] = 0;

		for (let mask = 0; mask < 1 << n; mask++) {
			// If the current state has not been reached earlier.
			if (subsetSum[mask] === -1) {
				continue;
			}

			for (let i = 0; i < n; i++) {
				// If the number arr[i] was not picked earlier, and arr[i] + subsetSum[mask]
				// is not greater than the targetSum, then add arr[i] to the subset
				// sum at subsetSum[mask] and store the result at subsetSum[mask | (1 << i)].
				if (
					(mask & (1 << i)) === 0 &&
					subsetSum[mask] + arr[i] <= targetSum
				) {
					subsetSum[mask | (1 << i)] =
						(subsetSum[mask] + arr[i]) % targetSum;
				}
			}

			if (subsetSum[(1 << n) - 1] === 0) {
				return true;
			}
		}

		return subsetSum[(1 << n) - 1] === 0;
	}
}

module.exports = { Problem: PartitionToKEqualSumSubsets };
