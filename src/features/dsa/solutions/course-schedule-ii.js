class CourseSchedule {
	/**
	 * https://leetcode.com/problems/course-schedule-ii/
	 * Time O(V + E) | Space O(V + E)
	 * @param {number} numCourses
	 * @param {number[][]} prerequisites
	 * @return {number[]}
	 */
	findOrder = function (numCourses, prerequisites) {
		var initGraph = numCourses => ({
			graph: new Array(numCourses).fill().map(() => []),
			color: new Array(numCourses).fill(1), // White
			isDirectedAcyclicGraph: [true],
			topologicalOrder: []
		});

		var buildGraph = (numCourses, prerequisites) => {
			const { graph, color, isDirectedAcyclicGraph, topologicalOrder } =
				initGraph(numCourses);

			for (const [src, dst] of prerequisites) {
				const neighbors = graph[dst] || [];

				neighbors.push(src);
				graph[dst] = neighbors;
			}

			return { graph, color, isDirectedAcyclicGraph, topologicalOrder };
		};

		var search = (
			numCourses,
			graph,
			color,
			topologicalOrder,
			isDirectedAcyclicGraph
		) => {
			for (let i = 0; i < numCourses; i++) {
				const isNew = color[i] === 1; // White
				if (isNew)
					dfs(
						i,
						graph,
						color,
						topologicalOrder,
						isDirectedAcyclicGraph
					);
			}
		};

		var dfs = (
			node,
			graph,
			color,
			topologicalOrder,
			isDirectedAcyclicGraph
		) => {
			const hasCycle = !isDirectedAcyclicGraph[0];
			if (hasCycle) return;

			colorBackTrack(
				node,
				graph,
				color,
				topologicalOrder,
				isDirectedAcyclicGraph
			);

			topologicalOrder.push(node);
		};

		const colorBackTrack = (
			node,
			graph,
			color,
			topologicalOrder,
			isDirectedAcyclicGraph
		) => {
			color[node] = 2; // Grey
			checkNeighbors(
				node,
				graph,
				color,
				topologicalOrder,
				isDirectedAcyclicGraph
			);
			color[node] = 3; // Black
		};

		var checkNeighbors = (
			node,
			graph,
			color,
			topologicalOrder,
			isDirectedAcyclicGraph
		) => {
			for (const neighbor of graph[node]) {
				const isNew = color[neighbor] === 1; // White
				if (isNew)
					dfs(
						neighbor,
						graph,
						color,
						topologicalOrder,
						isDirectedAcyclicGraph
					);

				const isCycle = color[neighbor] === 2; // Grey
				if (isCycle) isDirectedAcyclicGraph[0] = false;
			}
		};

		const { graph, color, isDirectedAcyclicGraph, topologicalOrder } =
			buildGraph(numCourses, prerequisites);

		search(
			numCourses,
			graph,
			color,
			topologicalOrder,
			isDirectedAcyclicGraph
		);

		return isDirectedAcyclicGraph[0] ? topologicalOrder.reverse() : [];
	};

	solve(numCourses, prerequisistes) {
		return this.findOrder(numCourses, prerequisistes);
	}
}

module.exports = { Problem: CourseSchedule };

class CourseScheduleTopologicalSort {
	/**
	 * https://leetcode.com/problems/course-schedule-ii/
	 * Time O(V + E) | Space O(V + E)
	 * @param {number} numCourses
	 * @param {number[][]} prerequisites
	 * @return {number[]}
	 */

	findOrder(numCourses, prerequisites) {
		let isPossible = true;
		const adjList = new Map();
		const indegree = new Array(numCourses).fill(0);
		const topologicalOrder = new Array(numCourses);

		// Create the adjacency list representation of the graph
		for (let i = 0; i < prerequisites.length; i++) {
			const dest = prerequisites[i][0];
			const src = prerequisites[i][1];
			const lst = adjList.get(src) || [];
			lst.push(dest);
			adjList.set(src, lst);

			// Record in-degree of each vertex
			indegree[dest]++;
		}

		const q = [];
		for (let i = 0; i < numCourses; i++) {
			if (indegree[i] === 0) {
				q.push(i);
			}
		}

		let i = 0;
		// Process until the queue becomes empty
		while (q.length > 0) {
			const node = q.shift();
			topologicalOrder[i++] = node;

			// Reduce the in-degree of each neighbor by 1
			if (adjList.has(node)) {
				for (const neighbor of adjList.get(node)) {
					indegree[neighbor]--;

					// If in-degree of a neighbor becomes 0, add it to the queue
					if (indegree[neighbor] === 0) {
						q.push(neighbor);
					}
				}
			}
		}

		// Check to see if topological sort is possible or not
		if (i === numCourses) {
			return topologicalOrder;
		}

		return [];
	}

	solve(numCourses, prerequisistes) {
		return this.findOrder(numCourses, prerequisistes);
	}
}
