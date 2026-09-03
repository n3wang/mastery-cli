class MaximumNUmberOfEventsTHatCanBeAttentedII {
	solve(events, k) {
		return this.maxValue(events, k);
	}

	maxValue(events, k) {
		const n = events.length;
		const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
		events.sort((a, b) => a[0] - b[0]);
		const starts = events.map(event => event[0]);

		for (let curIndex = n - 1; curIndex >= 0; curIndex--) {
			const nextIndex = this.bisectRight(starts, events[curIndex][1]);
			for (let count = 1; count <= k; count++) {
				dp[count][curIndex] = Math.max(
					dp[count][curIndex + 1],
					events[curIndex][2] + dp[count - 1][nextIndex]
				);
			}
		}

		return dp[k][0];
	}

	bisectRight(arr, target) {
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
}

// function maxValue(events, k) {
//     events.sort((a, b) => a[0] - b[0]);
//     const n = events.length;
//     const dp = Array.from({ length: k + 1 }, () => Array(n).fill(-1));

//     function dfs(curIndex, count, prevEndingTime) {
//         if (curIndex === n || count === k) {
//             return 0;
//         }
//         if (events[curIndex][0] <= prevEndingTime) {
//             return dfs(curIndex + 1, count, prevEndingTime);
//         }
//         if (dp[count][curIndex] !== -1) {
//             return dp[count][curIndex];
//         }

//         const ans = Math.max(
//             dfs(curIndex + 1, count, prevEndingTime),
//             dfs(curIndex + 1, count + 1, events[curIndex][1]) + events[curIndex][2]
//         );
//         dp[count][curIndex] = ans;
//         return ans;
//     }

//     return dfs(0, 0, -1);
// }

// function maxValue(events, k) {
//     const n = events.length;
//     const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
//     events.sort((a, b) => a[0] - b[0]);
//     const starts = events.map(([start]) => start);

//     for (let curIndex = n - 1; curIndex >= 0; curIndex--) {
//         const nextIndex = bisectRight(starts, events[curIndex][1]);
//         for (let count = 1; count <= k; count++) {
//             dp[count][curIndex] = Math.max(dp[count][curIndex + 1], events[curIndex][2] + dp[count - 1][nextIndex]);
//         }
//     }

//     return dp[k][0];
// }

// function bisectRight(arr, target) {
//     let left = 0;
//     let right = arr.length;
//     while (left < right) {
//         const mid = left + Math.floor((right - left) / 2);
//         if (arr[mid] <= target) {
//             left = mid + 1;
//         } else {
//             right = mid;
//         }
//     }
//     return left;
// }

module.exports = { Problem: MaximumNUmberOfEventsTHatCanBeAttentedII };
