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
	while (left <= right) {
		mid = Math.floor(left + (right - left) / 2);
		num = mid * mid;

		// If the number is larger than the target set right voundary as mid - 1.

		// And so on using Binary search. (left = mid + 1) if is lesser.
	}

	// TODO Return the right
}

module.exports = { Problem: MySqrt };
