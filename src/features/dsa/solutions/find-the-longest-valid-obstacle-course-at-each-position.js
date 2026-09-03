class FindTheLongestValidObstacleCourseAtEachPosition {
	solve(obstacles) {
		const n = obstacles.length;
		let lisLength = 0;

		// lis[i] records the lowest increasing sequence of length i + 1.
		const answer = new Array(n).fill(0);
		const lis = new Array(n).fill(0);

		const bisectRight = (A, target, right) => {
			if (right === 0) return 0;
			let left = 0;
			while (left < right) {
				const mid = left + Math.floor((right - left) / 2);
				if (A[mid] <= target) left = mid + 1;
				else right = mid;
			}
			return left;
		};

		for (let i = 0; i < n; ++i) {
			const height = obstacles[i];

			// Find the rightmost insertion position idx.
			const idx = bisectRight(lis, height, lisLength);
			if (idx === lisLength) lisLength++;

			lis[idx] = height;
			answer[i] = idx + 1;
		}
		return answer;
	}
}

module.exports = { Problem: FindTheLongestValidObstacleCourseAtEachPosition };
