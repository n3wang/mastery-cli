class FindPeakElement {
	solve(nums) {
		let left = 0;
		let right = nums.length - 1;

		while (left < right) {
			//  TODO Complete to solve the Find Peak Element problem.We know that it will eventually will reach point where
			//  from the right side it will be decreasing and from the left side it will be increasing.
			let mid = Math.floor((left + right) / 2);
		}
		return left;
	}
}

module.exports = { Problem: FindPeakElement };
