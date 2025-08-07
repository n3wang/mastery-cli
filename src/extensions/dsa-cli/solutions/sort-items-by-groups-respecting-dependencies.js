class SortItemsByGroupsRespectingDependencies {
	solve(n, m, group, beforeItems) {
		return sortItems(n, m, group, beforeItems);
	}
}

var sortItems = function (n, m, group, beforeItems) {
	const nGroup = Math.max(...group) + 1;
	const graph = Array(n + nGroup)
		.fill(0)
		.map(() => []);
	const inDegrees = Array(n + nGroup).fill(0);

	for (let [index, val] of group.entries()) {
		if (val === -1) {
			group[index] = m;
			m += 1;
		}
	}

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < beforeItems[i].length; j++) {
			let item = beforeItems[i][j];
			if (group[item] === group[i]) {
				graph[item].push(i);
				inDegrees[i]++;
			} else {
				graph[group[item] + n].push(group[i] + n);
				inDegrees[group[i] + n]++;
			}
		}
		graph[i].push(group[i] + n);
		inDegrees[group[i] + n]++;
	}

	let topoOrder = topologicalSort(graph, inDegrees, inDegrees.length);
	if (topoOrder.length) {
		return topoOrder.filter(item => item < n);
	} else {
		return [];
	}
};

function topologicalSort(graph, inDegrees, n) {
	let zeroInDegrees = [];
	for (let i = 0; i < n; i++) {
		if (inDegrees[i] === 0) {
			zeroInDegrees.push(i);
		}
	}
	let topoOrder = [];

	while (zeroInDegrees.length) {
		let node = zeroInDegrees.shift();
		topoOrder.push(node);
		for (let i = 0; i < graph[node].length; i++) {
			inDegrees[graph[node][i]]--;
			if (inDegrees[graph[node][i]] === 0) {
				zeroInDegrees.push(graph[node][i]);
			}
		}
	}
	if (topoOrder.length !== n) return [];
	return topoOrder;
}

module.exports = { Problem: SortItemsByGroupsRespectingDependencies };
