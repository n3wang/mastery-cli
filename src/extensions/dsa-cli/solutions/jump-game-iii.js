class JumpGameIII {
	solve(arr, start) {
		return canReach(arr, start);
	}
}

function canReach(arr, start) {
	const n = arr.length;
	const q = [start];

	while (q.length > 0) {
		const node = q.shift();

		// Check if reach zero
		if (arr[node] === 0) {
			return true;
		}

		if (arr[node] < 0) {
			continue;
		}

		// Check available next steps
		for (const i of [node + arr[node], node - arr[node]]) {
			if (i >= 0 && i < n) {
				q.push(i);
			}
		}

		// Mark as visited
		arr[node] = -arr[node];
	}

	return false;
}

module.exports = { Problem: JumpGameIII };
