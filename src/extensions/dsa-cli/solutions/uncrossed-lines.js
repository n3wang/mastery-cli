class Solution {
	solve(nums1, nums2) {
		const n1 = nums1.length;
		const n2 = nums2.length;

		const dp = new Array(n2 + 1).fill(0);
		let dpPrev = new Array(n2 + 1).fill(0);

		for (let i = 1; i <= n1; i++) {
			for (let j = 1; j <= n2; j++) {
				if (nums1[i - 1] === nums2[j - 1]) {
					dp[j] = 1 + dpPrev[j - 1];
				} else {
					dp[j] = Math.max(dp[j - 1], dpPrev[j]);
				}
			}
			dpPrev = [...dp];
		}

		return dp[n2];
	}
}

module.exports = { Problem: Solution };
