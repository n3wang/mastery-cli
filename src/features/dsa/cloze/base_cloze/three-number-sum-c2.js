class ThreeNumberSum {
	threeSum(array) {
		const res = [];
		array.sort((a, b) => a - b);

		for (let i = 0; i < array.length; i++) {
			const a = array[i];
			if (a > 0) break;
			if (i > 0 && a === array[i - 1]) continue;

			let l = i + 1;
			let r = array.length - 1;
			while (l < r) {
				const threeSum = a + array[l] + array[r];
				if (threeSum > 0) {
					r--;
				} else if (threeSum < 0) {
					l++;
				} else {
					res.push([a, array[l], array[r]]);
					l++;
					r--;
					// ## CREATE code to skip duplicates in js
				}
			}
		}
		return res;
	}
	solve(array) {
		return this.threeSum(array);
	}
}

module.exports = { Problem: ThreeNumberSum };
