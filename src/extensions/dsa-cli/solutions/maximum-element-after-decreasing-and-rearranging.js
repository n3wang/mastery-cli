class MaximumElementAfterDecreasingAndRearranging {
	solve(arr) {
		const size = arr.length;
		const count = new Array(arr.length + 1).fill(0);
		for (let i = 0; i < arr.length; i++) {
			count[Math.min(arr[i], size)] += 1;
		}

		let ans = 1;
		for (let i = 2; i < arr.length + 1; i++) {
			ans = Math.min(ans + count[i], i);
		}

		return ans;
	}
}

module.exports = { Problem: MaximumElementAfterDecreasingAndRearranging };
