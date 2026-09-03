class RussianDollEnvelopers {
	solve(nums) {
		const dp = new Array(nums.length).fill(0);
		let len = 0;

		for (const num of nums) {
			let i = binarySearch(dp, 0, len, num);
			if (i < 0) {
				i = -(i + 1);
			}
			dp[i] = num;
			if (i === len) {
				len++;
			}
		}

		return len;
	}

	maxEnvelopes(envelopes) {
		envelopes.sort((arr1, arr2) => {
			if (arr1[0] === arr2[0]) {
				return arr2[1] - arr1[1];
			} else {
				return arr1[0] - arr2[0];
			}
		});

		const secondDim = envelopes.map(arr => arr[1]);
		return this.lengthOfLIS(secondDim);
	}
}

function binarySearch(nums, left, right, target) {
	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}
	return -(left + 1);
}

module.exports = { Problem: RussianDollEnvelopers };
