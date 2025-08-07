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
