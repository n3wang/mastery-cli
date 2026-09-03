class MakeArrayStriclyIncreasing {
	solve(arr1, arr2) {
		return this.makeArrayIncreasing(arr1, arr2);
	}

	makeArrayIncreasing(arr1, arr2) {
		const dp = new Map();
		arr2.sort((a, b) => a - b);

		function dfs(i, prev) {
			if (i === arr1.length) {
				return 0;
			}
			if (dp.has(`${i}-${prev}`)) {
				return dp.get(`${i}-${prev}`);
			}

			let cost = Infinity;

			// If arr1[i] is already greater than prev, we can leave it be.
			if (arr1[i] > prev) {
				cost = dfs(i + 1, arr1[i]);
			}

			// Find a replacement with the smallest value in arr2.
			const idx = bisectRight(arr2, prev);

			// Replace arr1[i], with a cost of 1 operation.
			if (idx < arr2.length) {
				cost = Math.min(cost, 1 + dfs(i + 1, arr2[idx]));
			}

			dp.set(`${i}-${prev}`, cost);
			return cost;
		}

		const res = dfs(0, -1);

		return res < Infinity ? res : -1;
	}
}

// Helper function to find the right insertion point in a sorted array.
function bisectRight(arr, target) {
	let left = 0;
	let right = arr.length;

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] <= target) {
			left = mid + 1;
		} else {
			right = mid;
		}
	}

	return left;
}

module.exports = { Problem: MakeArrayStriclyIncreasing };
