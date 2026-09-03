class MySqrt {
	//Newton's Method
	solve(x) {
		return binarySearchIntuition(x);
	}
}

function binarySearchIntuition(x) {
	if (x < 2) return x;

	let left = 2;
	let right = x;
	let mid = 0;
	let num = 0;
	// TODO Perform `binarySearch` on the range [2, x]

	while (left <= right) {
		// TODO Compute the mid, and the number as the mid*mid

		if (num > x) {
			right = mid - 1;
		} else if (num < x) {
			left = mid + 1;
		} else {
			return mid;
		}
	}
	return right;
}

module.exports = { Problem: MySqrt };
