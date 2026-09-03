class CourseSchedule {
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

		// TODO Add all vertices with 0 in-degree to the queue

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

module.exports = { Problem: CourseSchedule };
