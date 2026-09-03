function minimumWaitingTime(queries) {
	queries.sort((a, b) => a - b);
	totalTime = 0;
	const queryLen = queries.length;
	for (let i = 0; i < queryLen - 1; i++) {
		totalTime += (queryLen - i - 1) * queries[i];
	}
	return totalTime;
}

class MinimumWaitingTime {
	solve(queries) {
		return minimumWaitingTime(queries);
	}
}

module.exports = { Problem: MinimumWaitingTime };
