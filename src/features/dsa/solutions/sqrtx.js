class MySqrt {
	//Newton's Method
	solve(x) {
		if (x < 2) return x;

		let x0 = x;
		let x1 = (x0 + x / x0) / 2.0;
		while (Math.abs(x0 - x1) >= 1) {
			x0 = x1;
			x1 = (x0 + x / x0) / 2.0;
		}

		return Math.floor(x1);
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
