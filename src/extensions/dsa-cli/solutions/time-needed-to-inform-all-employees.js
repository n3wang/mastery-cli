class TimeNeededToInformAllEmployees {
	solve(n, headId, manager, informTime) {
		return numOfMinutes(n, headId, manager, informTime);
	}
}

function numOfMinutes(n, headID, manager, informTime) {
	const adjList = Array(n)
		.fill()
		.map(() => []);

	// Making an adjacent list, each index stores the Ids of subordinate employees.
	for (let i = 0; i < n; i++) {
		if (manager[i] !== -1) {
			adjList[manager[i]].push(i);
		}
	}

	const queue = [{ manager: headID, time: 0 }];
	let maxTime = -Infinity;

	while (queue.length > 0) {
		const { manager, time } = queue.shift();
		// Maximum time for an employee to get the news.
		maxTime = Math.max(maxTime, time);

		for (const adjacent of adjList[manager]) {
			queue.push({ manager: adjacent, time: time + informTime[manager] });
		}
	}

	return maxTime;
}

module.exports = { Problem: TimeNeededToInformAllEmployees };
