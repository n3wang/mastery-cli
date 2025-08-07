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
			// TODO Check if all the courses can be travelled, by checking course by course.
		};

		var isCyclic = (currCourse, graph, path) => {
			const hasSeen = path[currCourse];
			if (hasSeen) return true;

			const isMissingNext = !(currCourse in graph);
			if (isMissingNext) return false;

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
