class CourseSchedule {
	/**
	 * https://leetcode.com/problems/course-schedule/
	 * Time O((V)^2 + E) | Space O(V + E)
	 * @param {number} numCourses
	 * @param {number[][]} prerequisites
	 * @return {boolean}
	 */
	canFinish = function (numCourses, prerequisites) {
		var initGraph = numCourses => ({
			graph: new Array(numCourses).fill().map(() => []),
			path: new Array(numCourses).fill(false)
		});

		var buildGraph = (numCourses, prerequisites) => {
			const { graph, path } = initGraph(numCourses);

			for (const [src, dst] of prerequisites) {
				const neighbors = graph[dst] || [];

				neighbors.push(src);

				graph[dst] = neighbors;
			}

			return { graph, path };
		};

		var hasPath = (numCourses, graph, path) => {
			for (let course = 0; course < numCourses; course++) {
				if (isCyclic(course, graph, path)) return false;
			}

			return true;
		};

		var isCyclic = (currCourse, graph, path) => {
			// TODO If has seen return true

			// TODO If the course is not in the graph return false

			return backTrack(currCourse, graph, path);
		};

		var backTrack = (currCourse, graph, path) => {
			path[currCourse] = true;
			const _hasCycle = hasCycle(currCourse, graph, path);
			path[currCourse] = false;

			return _hasCycle;
		};

		var hasCycle = (currCourse, graph, path) => {
			for (const neighbor of graph[currCourse]) {
				if (isCyclic(neighbor, graph, path)) return true;
			}

			return false;
		};

		const { graph, path } = buildGraph(numCourses, prerequisites);

		return hasPath(numCourses, graph, path);
	};

	solve(numCourses, prerequisistes) {
		return this.canFinish(numCourses, prerequisistes);
	}
}

module.exports = { Problem: CourseSchedule };
