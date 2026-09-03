class CalcEquation {
	solve(equations, values, queries) {
		return this.calcEquation(equations, values, queries);
	}

	calcEquation(equations, values, queries) {
		const graph = new Map();

		function backtrackEvaluate(currNode, targetNode, accProduct, visited) {
			visited.add(currNode);
			let ret = -1.0;
			const neighbors = graph.get(currNode) || new Map();

			if (neighbors.has(targetNode)) {
				ret = accProduct * neighbors.get(targetNode);
			} else {
				for (const [neighbor, value] of neighbors) {
					if (visited.has(neighbor)) {
						continue;
					}
					ret = backtrackEvaluate(
						neighbor,
						targetNode,
						accProduct * value,
						visited
					);
					if (ret !== -1.0) {
						break;
					}
				}
			}
			visited.delete(currNode);
			return ret;
		}

		// Step 1). build the graph from the equations
		for (let i = 0; i < equations.length; i++) {
			// TODO Destructure the equation and value.

			// Set the dividend and divisor to the equation as a new map if not in graph.

			// TODO Set the value of the dividend to the divisor in the graph as 1/value.
			graph.get(dividend).set(divisor, value);
		}

		// Step 2). Evaluate each query via backtracking (DFS)
		// by verifying if there exists a path from dividend to divisor
		const results = [];

		for (const [dividend, divisor] of queries) {
			if (!graph.has(dividend) || !graph.has(divisor)) {
				// case 1): either node does not exist
				results.push(-1.0);
			} else if (dividend === divisor) {
				// case 2): origin and destination are the same node
				results.push(1.0);
			} else {
				const visited = new Set();
				const ret = backtrackEvaluate(dividend, divisor, 1, visited);
				results.push(ret);
			}
		}

		return results;
	}
}

module.exports = { Problem: CalcEquation };
