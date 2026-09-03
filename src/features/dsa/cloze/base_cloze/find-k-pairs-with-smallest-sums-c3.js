const { MinHeap } = require('./structures');

class KSmallestPairs {
	solve(nums1, nums2, k) {
		const m = nums1.length;
		const n = nums2.length;

		const ans = [];
		const visited = new Set();

		const minHeap = new MinHeap((a, b) => a[2] - b[2]);
		minHeap.insert([nums1[0] + nums2[0], 0, 0]);
		visited.add(JSON.stringify([0, 0]));

		while (k-- > 0 && !minHeap.isEmpty()) {
			const top = minHeap.extractMin();
			const i = top[1];
			const j = top[2];

			ans.push([nums1[i], nums2[j]]);

			// TODO Fo each of i+1, and while is not visited, add it to the min heap and visited and add to the visited.

			if (j + 1 < n && !visited.has(JSON.stringify([i, j + 1]))) {
				minHeap.insert([nums1[i] + nums2[j + 1], i, j + 1]);
				visited.add(JSON.stringify([i, j + 1]));
			}
		}

		return ans;
	}
}

module.exports = { Problem: KSmallestPairs };
