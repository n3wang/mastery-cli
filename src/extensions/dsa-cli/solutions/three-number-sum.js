/*
 * Test 1/3:
[
  -8, -6, 1,  2,
   3,  5, 6, 12
]
Testing 0 1 7
Testing 0 2 7
Testing 0 2 6
Testing 0 3 6
Testing 0 4 5
Testing 1 2 7
Testing 1 2 6
Testing 1 2 5
Testing 1 3 4
Testing 2 3 7
Testing 2 3 6
Testing 2 3 5
Testing 2 3 4
Testing 3 4 7
Testing 3 4 6
Testing 3 4 5
Testing 4 5 7
Testing 4 5 6
Testing 5 6 7
Test ([12, 3, 1, 2, -6, 5, -8, 6], 0) => [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]] ||  passed
Test 2/3: ([12, 3, 1, 2, -6, 5, -8, 6], 0) => [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
[ -2, 8, 10, 14, 49 ]
Testing 0 1 4
Testing 0 1 3
Testing 0 1 2
Testing 1 2 4
Testing 1 2 3
Testing 2 3 4
Test ([8, 10, -2, 49, 14], 57) => [] ||  passed
Test 3/3: ([8, 10, -2, 49, 14], 57) => []
[
  -8, -6, -1,  0, 1,
   2,  3,  5, 12
]
Testing 0 1 8
Testing 0 2 8
Testing 0 2 7
Testing 0 3 7
Testing 0 4 7
Testing 0 5 7
Testing 0 6 7
Testing 1 2 8
Testing 1 2 7
Testing 1 3 7
Testing 1 4 7
Testing 1 5 6
Testing 2 3 8
Testing 2 3 7
Testing 2 3 6
Testing 2 3 5
Testing 2 3 4
Testing 3 4 8
Testing 3 4 7
Testing 3 4 6
Testing 3 4 5
Testing 4 5 8
Testing 4 5 7
Testing 4 5 6
Testing 5 6 8
Testing 5 6 7
Testing 6 7 8
Test ([12, 3, 1, 2, -6, 5, 0, -8, -1], 0) => [[-8, 3, 5], [-6, 1, 5], [-1, 0, 1]] ||  passed
 */

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
