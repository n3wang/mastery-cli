class MaximumNumberOfAchievableTransferRequests {
	solve(n, requests) {
		return maximumRequests(n, requests);
	}
}

module.exports = { Problem: MaximumNumberOfAchievableTransferRequests };

function maximumRequests(n, requests) {
	let answer = 0;

	for (let mask = 0; mask < 1 << requests.length; mask++) {
		const indegree = Array(n).fill(0);
		let pos = requests.length - 1;
		// Number of set bits representing the requests we will consider.
		const bitCount = mask.toString(2).split('1').length - 1;

		// If the request count we're going to consider is less than the maximum request
		// we have considered without violating the constraints, then we can skip it.
		if (bitCount <= answer) {
			continue;
		}

		// For all the 1's in the number, update the array indegree for the buildings it involves.
		let curr = mask;
		while (curr > 0) {
			if (curr & 1) {
				indegree[requests[pos][0]]--;
				indegree[requests[pos][1]]++;
			}
			curr >>= 1;
			pos--;
		}

		let flag = true;
		// Check if it doesn't violate the constraints
		for (let i = 0; i < n; i++) {
			if (indegree[i] !== 0) {
				flag = false;
				break;
			}
		}

		if (flag) {
			answer = bitCount;
		}
	}

	return answer;
}
