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
				// TODO: Modify this to make this work.

				if (true) {
				} else {
					res.push([a, array[l], array[r]]);
					l++;
					r--;
					while (array[l] === array[l - 1] && l < r) {
						l++;
					}
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
