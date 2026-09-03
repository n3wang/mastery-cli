const assert = require('assert');
const ProblemTests = require('./problem-test');

class NumberOfProvinces extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const isConnected = [
			[1, 1, 0],
			[1, 1, 0],
			[0, 0, 1]
		];
		const expected = 2;
		this.current_test_name = '[[1, 1, 0], [1, 1, 0], [0, 0, 1]] | 2';
		const structure = new this.Problem();
		const actual = structure.solve(isConnected);
		assert.equal(actual, expected);
	}

	test2() {
		const isConnected = [
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
		];
		const expected = 3;
		this.current_test_name = '[[1,0,0],[0,1,0],[0,0,1]] | 3';
		const structure = new this.Problem();
		const actual = structure.solve(isConnected);
		assert.equal(actual, expected);
	}
}

class FindEventualSafeStates extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		/**
         * Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
            Output: [2,4,5,6]
            Explanation: The given graph is shown above.
            Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
            Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
         */

		const graph = [[1, 2], [2, 3], [5], [0], [5], [], []];
		const expected = [2, 4, 5, 6];
		this.current_test_name = '[[1,2],[2,3],[5],[0],[5],[],[]] | [2,4,5,6]';
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}

	test_2() {
		/**
         * Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
            Output: [4]
            Explanation:
            Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
         */

		const graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []];
		const expected = [4];
		this.current_test_name = '[[1,2,3,4],[1,2],[3,4],[0,4],[]] | [4]';
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}
}

class KeyAndRooms extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const rooms = [[1], [2], [3], []];
		const expected = true;
		this.current_test_name = '[[1],[2],[3],[]] | true';
		const structure = new this.Problem();
		const actual = structure.solve(rooms);
		assert.equal(actual, expected);
	}

	test2() {
		const rooms = [[1, 3], [3, 0, 1], [2], [0]];
		const expected = false;
		this.current_test_name = '[[1,3],[3,0,1],[2],[0]] | false';
		const structure = new this.Problem();
		const actual = structure.solve(rooms);
		assert.equal(actual, expected);
	}
}

class ShortedPathWithAlternatingColors extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const board = [
			['X', 'X', 'X', 'X'],
			['X', 'O', 'O', 'X'],
			['X', 'X', 'O', 'X'],
			['X', 'O', 'X', 'X']
		];
		const expected = [
			['X', 'X', 'X', 'X'],
			['X', 'X', 'X', 'X'],
			['X', 'X', 'X', 'X'],
			['X', 'O', 'X', 'X']
		];
		this.current_test_name = `${board} | ${expected}`;
		const structure = new this.Problem();
		structure.solve(board);
		assert.deepEqual(board, expected);
	}

	test2() {
		const board = [
			['O', 'O', 'O'],
			['O', 'O', 'O'],
			['O', 'O', 'O']
		];
		const expected = [
			['O', 'O', 'O'],
			['O', 'O', 'O'],
			['O', 'O', 'O']
		];
		this.current_test_name = `${board} | ${expected}`;
		const structure = new this.Problem();
		structure.solve(board);
		assert.deepEqual(board, expected);
	}
}

class NearestExitFromEntranceInMaze extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
		this.tests.push(() => this.test3());
	}

	test1() {
		const maze = [
			['+', '+', '.', '+'],
			['.', '+', '.', '+'],
			['+', '+', '+', '+']
		];
		const entrance = [1, 2];
		const expected = 1;
		this.current_test_name = `${maze} | ${entrance} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, entrance);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
            Output: 2
            Explanation: There is 1 exit in this maze at [1,2].
            [1,0] does not count as an exit since it is the entrance cell.
            Initially, you are at the entrance cell [1,0].
            - You can reach [1,2] by moving 2 steps right.
            Thus, the nearest exit is [1,2], which is 2 steps away.
         */

		const maze = [
			['+', '+', '+'],
			['.', '.', '.'],
			['+', '+', '+']
		];
		const entrance = [1, 0];
		const expected = 2;
		this.current_test_name = `${maze} | ${entrance} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, entrance);
		assert.deepEqual(actual, expected);
	}

	test3() {
		/**
         * Input: maze = [[".","+"]], entrance = [0,0]
            Output: -1
            Explanation: There are no exits in this maze.
         */
		const maze = [['.', '+']];
		const entrance = [0, 0];
		const expected = -1;
		this.current_test_name = `${maze} | ${entrance} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, entrance);
		assert.deepEqual(actual, expected);
	}
}

class ShortestBridge extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const grid = [
			[0, 1],
			[1, 0]
		];
		const expected = 1;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}

	test2() {
		const grid = [
			[0, 1, 0],
			[0, 0, 0],
			[0, 0, 1]
		];
		const expected = 2;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}

	test3() {
		const grid = [
			[1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1]
		];

		const expected = 1;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}
}

class JumpGameIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const arr = [4, 2, 3, 0, 3, 1, 2];
		const start = 5;
		const expected = true;
		this.current_test_name = `${arr} | ${start} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(arr, start);
		assert.deepEqual(actual, expected);
	}

	test2() {
		const arr = [4, 2, 3, 0, 3, 1, 2];
		const start = 0;
		const expected = true;
		this.current_test_name = `${arr} | ${start} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(arr, start);
		assert.deepEqual(actual, expected);
	}
}

class Matrix01 extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
            Output: [[0,0,0],[0,1,0],[0,0,0]]
         */

		const mat = [
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0]
		];
		const expected = [
			[0, 0, 0],
			[0, 1, 0],
			[0, 0, 0]
		];
		this.current_test_name = 'mat | expected';
		const structure = new this.Problem();
		const actual = structure.solve(mat);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
            Output: [[0,0,0],[0,1,0],[1,2,1]]
         */

		const mat = [
			[0, 0, 0],
			[0, 1, 0],
			[1, 1, 1]
		];
		const expected = [
			[0, 0, 0],
			[0, 1, 0],
			[1, 2, 1]
		];
		this.current_test_name = 'mat | expected';
		const structure = new this.Problem();
		const actual = structure.solve(mat);
		assert.deepEqual(actual, expected);
	}
}

class TimeNeededToInformAllEmployees extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 1, headID = 0, manager = [-1], informTime = [0]
            Output: 0
            Explanation: The head of the company is the only employee in the company.
         */

		const n = 1;
		const headID = 0;
		const manager = [-1];
		const informTime = [0];
		const expected = 0;
		this.current_test_name = `${n} | ${headID} | ${manager} | ${informTime} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, headID, manager, informTime);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
            Output: 1
            Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
            The tree structure of the employees in the company is shown.
         */

		const n = 6;
		const headID = 2;
		const manager = [2, 2, -1, 2, 2, 2];
		const informTime = [0, 0, 1, 0, 0, 0];
		const expected = 1;
		this.current_test_name = `${n} | ${headID} | ${manager} | ${informTime} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, headID, manager, informTime);
		assert.deepEqual(actual, expected);
	}
}

class ReorderRoutesToMakeAllPathLeadToTheCity extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
            Output: 3
            Explanation: Change the direction of edges show in red such that each node can reach the city 0 (capital).
         */
		const n = 6;
		const connections = [
			[0, 1],
			[1, 3],
			[2, 3],
			[4, 0],
			[4, 5]
		];
		const expected = 3;
		this.current_test_name = `${n} | ${connections}| ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
            Output: 2
            Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
         */

		const n = 5;
		const connections = [
			[1, 0],
			[1, 2],
			[3, 2],
			[3, 4]
		];
		const expected = 2;
		this.current_test_name = `${n} | ${connections}| ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}
}

class AllPathsFromSourceToTarget extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * 
            Input: graph = [[1,2],[3],[3],[]]
            Output: [[0,1,3],[0,2,3]]
            Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
         */
		const graph = [[1, 2], [3], [3], []];
		const expected = [
			[0, 1, 3],
			[0, 2, 3]
		];
		this.current_test_name = `${graph} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
             * Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
            Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
         */
		const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []];
		const expected = [
			[0, 4],
			[0, 3, 4],
			[0, 1, 3, 4],
			[0, 1, 2, 3, 4],
			[0, 1, 4]
		];
		this.current_test_name = `${graph} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}
}

class CriticalConnectionsInANetwork extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
            Output: [[1,3]]
            Explanation: [[3,1]] is also accepted.
         */
		const n = 4;
		const connections = [
			[0, 1],
			[1, 2],
			[2, 0],
			[1, 3]
		];
		const expected = [[1, 3]];
		this.current_test_name = `${n} | ${connections} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 2, connections = [[0,1]]
            Output: [[0,1]]
         */
		const n = 2;
		const connections = [[0, 1]];
		const expected = [[0, 1]];
		this.current_test_name = `${n} | ${connections} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}
}

class NumberOfEnclaves extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
            Output: 3
            Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.
         */

		const grid = [
			[0, 0, 0, 0],
			[1, 0, 1, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0]
		];
		const expected = 3;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
            Output: 0
            Explanation: All 1s are either on the boundary or can reach the boundary.
         */

		const grid = [
			[0, 1, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0]
		];
		const expected = 0;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}
}

class NumberOfClosedIslands extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
		this.tests.push(() => this.test3());
	}

	test1() {
		/**
         * Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
            Output: 2
            Explanation: 
            Islands in gray are closed because they are completely surrounded by water (group of 1s).
         */

		const grid = [
			[1, 1, 1, 1, 1, 1, 1, 0],
			[1, 0, 0, 0, 0, 1, 1, 0],
			[1, 0, 1, 0, 1, 1, 1, 0],
			[1, 0, 0, 0, 0, 1, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 0]
		];
		const expected = 2;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
            Output: 1
         */

		const grid = [
			[0, 0, 1, 0, 0],
			[0, 1, 0, 1, 0],
			[0, 1, 1, 1, 0]
		];
		const expected = 1;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}

	test3() {
		/**
         * Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
            Output: 2
         */

		const grid = [
			[1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1]
		];
		const expected = 2;
		this.current_test_name = `${grid} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(grid);
		assert.deepEqual(actual, expected);
	}
}

class FindTheTownJudge extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 2, trust = [[1,2]]
            Output: 2
         */
		const n = 2;
		const trust = [[1, 2]];
		const expected = 2;
		this.current_test_name = `${n} | ${trust} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, trust);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 3, trust = [[1,3],[2,3]]
            Output: 3
         */
		const n = 3;
		const trust = [
			[1, 3],
			[2, 3]
		];
		const expected = 3;
		this.current_test_name = `${n} | ${trust} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, trust);
		assert.deepEqual(actual, expected);
	}
}

class MinimumNumberOfVerticesToReachAllNodes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
            Output: [0,3]
            Explanation: It's not possible to reach all the nodes from a single vertex. From 0 we can reach [0,1,2,5]. From 3 we can reach [3,4,2,5]. So we output [0,3].
         */

		const n = 6;
		const edges = [
			[0, 1],
			[0, 2],
			[2, 5],
			[3, 4],
			[4, 2]
		];
		const expected = [0, 3];
		this.current_test_name = `${n} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
            Output: [0,2,3]
            Explanation: Notice that vertices 0, 3 and 2 are not reachable from any other node, so we must include them. Also any of these vertices can reach nodes 1 and 4.
         */

		const n = 5;
		const edges = [
			[0, 1],
			[2, 1],
			[3, 1],
			[1, 4],
			[2, 4]
		];
		const expected = [0, 2, 3];
		this.current_test_name = `${n} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges);
		assert.deepEqual(actual, expected);
	}
}

class IsGraphBipartite extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: graph = [[1,3],[0,2],[1,3],[0,2]]
            Output: true
            Explanation: We can divide the vertices into two groups: {0, 2} and {1, 3}.
         */

		const graph = [
			[1, 3],
			[0, 2],
			[1, 3],
			[0, 2]
		];
		const expected = true;
		this.current_test_name = `${graph} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: graph = [[1,3],[0,2],[1,3],[0,2]]
            Output: true
            Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.
         */

		const graph = [
			[1, 2, 3],
			[0, 2],
			[0, 1, 3],
			[0, 2]
		];
		const expected = false;
		this.current_test_name = `${graph} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(graph);
		assert.deepEqual(actual, expected);
	}
}

class GraphValidTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
        * Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
            Output: true
        */

		const n = 5;
		const edges = [
			[0, 1],
			[0, 2],
			[0, 3],
			[1, 4]
		];
		const expected = true;
		this.current_test_name = `${n} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
            Output: false
         */

		const n = 5;
		const edges = [
			[0, 1],
			[1, 2],
			[2, 3],
			[1, 3],
			[1, 4]
		];
		const expected = false;
		this.current_test_name = `${n} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges);
		assert.deepEqual(actual, expected);
	}
}

class AccountsMerge extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
            Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
            Explanation:
            The first and second John's are the same person as they have the common email "johnsmith@mail.com".
            The third John and Mary are different people as none of their email addresses are used by other accounts.
            We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'], 
            ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
         */

		const inputs = [
			['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
			['John', 'johnsmith@mail.com', 'john00@mail.com'],
			['Mary', 'mary@mail.com'],
			['John', 'johnnybravo@mail.com']
		];
		const output = [
			[
				'John',
				'johnsmith@mail.com',
				'john_newyork@mail.com',
				'john00@mail.com'
			],
			['Mary', 'mary@mail.com'],
			['John', 'johnnybravo@mail.com']
		];

		// [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
		const expected = output;
		this.current_test_name = `${inputs} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(inputs);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
            Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
         */
		const accounts = [
			['Gabe', 'Gabe0@m.co', 'Gabe3@m.co', 'Gabe1@m.co'],
			['Kevin', 'Kevin3@m.co', 'Kevin5@m.co', 'Kevin0@m.co'],
			['Ethan', 'Ethan5@m.co', 'Ethan4@m.co', 'Ethan0@m.co'],
			['Hanzo', 'Hanzo3@m.co', 'Hanzo1@m.co', 'Hanzo0@m.co'],
			['Fern', 'Fern5@m.co', 'Fern1@m.co', 'Fern0@m.co']
		];
		const output = [
			['Gabe', 'Gabe0@m.co', 'Gabe3@m.co', 'Gabe1@m.co'],
			['Kevin', 'Kevin3@m.co', 'Kevin5@m.co', 'Kevin0@m.co'],
			['Ethan', 'Ethan5@m.co', 'Ethan4@m.co', 'Ethan0@m.co'],
			['Hanzo', 'Hanzo3@m.co', 'Hanzo1@m.co', 'Hanzo0@m.co'],
			['Fern', 'Fern5@m.co', 'Fern1@m.co', 'Fern0@m.co']
		];
		const expected = output;
		this.current_test_name = `${accounts} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(accounts);
		assert.deepEqual(actual, expected);
	}
}

class SatisfiabilityOfEqualityEquations extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: equations = ["a==b","b!=a"]
            Output: false
            Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.  There is no way to assign the variables to satisfy both equations.
         */

		const equations = ['a==b', 'b!=a'];
		const expected = false;
		this.current_test_name = `${equations} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(equations);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: equations = ["b==a","a==b"]
            Output: true
            Explanation: We could assign a = 1 and b = 1 to satisfy both equations.
         */

		const equations = ['b==a', 'a==b'];
		const expected = true;
		this.current_test_name = `${equations} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(equations);
		assert.deepEqual(actual, expected);
	}
}

class LexicographicallySmallestEquivalentString extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
		this.tests.push(() => this.test3());
	}

	test1() {
		/**
         * Input: s1 = "parker", s2 = "morris", baseStr = "parser"
            Output: "makkek"
            Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
            The characters in each group are equivalent and sorted in lexicographical order.
            So the answer is "makkek".
         */

		const s1 = 'parker';
		const s2 = 'morris';
		const baseStr = 'parser';
		const expected = 'makkek';

		this.current_test_name = `${s1} | ${s2} | ${baseStr} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(s1, s2, baseStr);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: s1 = "hello", s2 = "world", baseStr = "hold"
            Output: "hdld"
            Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
            So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".
         */

		const s1 = 'hello';
		const s2 = 'world';
		const baseStr = 'hold';
		const expected = 'hdld';

		this.current_test_name = `${s1} | ${s2} | ${baseStr} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(s1, s2, baseStr);
		assert.deepEqual(actual, expected);
	}

	test3() {
		/**
         * Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
            Output: "aauaaaaada"
            Explanation: We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m], thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".
         */

		const s1 = 'leetcode';
		const s2 = 'programs';
		const baseStr = 'sourcecode';
		const expected = 'aauaaaaada';

		this.current_test_name = `${s1} | ${s2} | ${baseStr} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(s1, s2, baseStr);
		assert.deepEqual(actual, expected);
	}
}

class SimilarStringGroups extends ProblemTests {
	constructor(Problem) {
		/**
         * Input: strs = ["tars","rats","arts","star"]
            Output: 2
         */
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const strs = ['tars', 'rats', 'arts', 'star'];
		const expected = 2;
		this.current_test_name = `${strs} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(strs);
		assert.deepEqual(actual, expected);
	}

	test2() {
		const strs = ['omv', 'ovm'];
		const expected = 1;
		this.current_test_name = `${strs} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(strs);
		assert.deepEqual(actual, expected);
	}
}

class AlienDictionary extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: words = ["wrt","wrf","er","ett","rftt"]
            Output: "wertf" 
         */

		const words = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
		const expected = 'wertf';
		this.current_test_name = `${words} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(words);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: words = ["z","x"]
            Output: "zx"
         */

		const words = ['z', 'x'];
		const expected = 'zx';
		this.current_test_name = `${words} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(words);
		assert.deepEqual(actual, expected);
	}

	test3() {
		/**
         * Input: words = ["z","x","z"]
            Output: ""
            Explanation: The order is invalid, so return "".
         */

		const words = ['z', 'x', 'z'];
		const expected = '';
		this.current_test_name = `${words} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(words);
		assert.deepEqual(actual, expected);
	}
}

class SortItemsByGroupsRespectingDependencies extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		// this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
            Output: [6,3,4,1,5,2,0,7]
         */

		const n = 8;
		const m = 2;
		const group = [-1, -1, 1, 0, 0, 1, 0, -1];
		const beforeItems = [[], [6], [5], [6], [3, 6], [], [], []];
		const expected = [6, 3, 4, 1, 5, 2, 0, 7];
		this.current_test_name = `${n} | ${m} | ${group} | ${beforeItems} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, m, group, beforeItems);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
            Output: []
            Explanation: This is the same as example 1 except that 4 needs to be before 6 in the sorted list.
         */

		const n = 8;
		const m = 2;
		const group = [-1, -1, 1, 0, 0, 1, 0, -1];
		const beforeItems = [[], [6], [5], [6], [3], [], [4], []];
		const expected = [];
		this.current_test_name = `${n} | ${m} | ${group} | ${beforeItems} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, m, group, beforeItems);
		assert.deepEqual(actual, expected);
	}
}

class LargestColorValueInADirectedGraph extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
            Output: 3
            Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).
         */

		const colors = 'abaca';
		const edges = [
			[0, 1],
			[0, 2],
			[2, 3],
			[3, 4]
		];
		const expected = 3;
		this.current_test_name = `${colors} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(colors, edges);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: colors = "a", edges = [[0,0]]
            Output: -1
            Explanation: There is no path from node 0 to node 0.
         */

		const colors = 'a';
		const edges = [[0, 0]];
		const expected = -1;
		this.current_test_name = `${colors} | ${edges} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(colors, edges);
		assert.deepEqual(actual, expected);
	}
}

class CheapestFlightsWithinKStops extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
            Output: 700
            Explanation:
            The graph is shown above.
            The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
            Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
         */

		const n = 4;
		const flights = [
			[0, 1, 100],
			[1, 2, 100],
			[2, 0, 100],
			[1, 3, 600],
			[2, 3, 200]
		];
		const src = 0;
		const dst = 3;
		const k = 1;
		const expected = 700;
		this.current_test_name = `${n} | ${flights} | ${src} | ${dst} | ${k} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, flights, src, dst, k);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
            Output: 200
            Explanation:
            The graph is shown above.
            The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
         */

		const n = 3;
		const flights = [
			[0, 1, 100],
			[1, 2, 100],
			[0, 2, 500]
		];
		const src = 0;
		const dst = 2;
		const k = 1;
		const expected = 200;

		this.current_test_name = `${n} | ${flights} | ${src} | ${dst} | ${k} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, flights, src, dst, k);
		assert.deepEqual(actual, expected);
	}
}

class PathWithMaximumProbability extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
            Output: 0.25000
            Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
         */

		const n = 3;
		const edges = [
			[0, 1],
			[1, 2],
			[0, 2]
		];
		const succProb = [0.5, 0.5, 0.2];
		const start = 0;
		const end = 2;
		const expected = 0.25;
		this.current_test_name = `${n} | ${edges} | ${succProb} | ${start} | ${end} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges, succProb, start, end);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
		 * Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
		 * Output: 0.30000
		 * Explaination: The probability for the path 0 -> 2 is 0.5 * 0.3 = 0.15 (not 0.3)
		 */

		const n = 3;
		const edges = [
			[0, 1],
			[1, 2],
			[0, 2]
		];
		const succProb = [0.5, 0.5, 0.3];
		const start = 0;
		const end = 2;
		const expected = 0.3;
		this.current_test_name = `${n} | ${edges} | ${succProb} | ${start} | ${end} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, edges, succProb, start, end);
		assert.deepEqual(actual, expected);
	}
}

class TheMazeII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [0,4], destination = [4,4]
            Output: 12
            Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.
            The length of the path is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.
         */
		const maze = [
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0],
			[1, 1, 0, 1, 1],
			[0, 0, 0, 0, 0]
		];
		const start = [0, 4];
		const dest = [4, 4];
		const expected = 12;
		this.current_test_name = `${maze} | ${start} | ${dest} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, start, dest);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
            Output: -1
            Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.
         */

		const maze = [
			[0, 0, 1, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0],
			[1, 1, 0, 1, 1],
			[0, 0, 0, 0, 0]
		];
		const start = [0, 4];
		const destination = [3, 2];
		const expected = -1;
		this.current_test_name = `${maze} | ${start} | ${destination} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, start, destination);
		assert.deepEqual(actual, expected);
	}
}

class TheMazeIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [0,1]
            Output: "lul"
            Explanation: There are two shortest ways for the ball to drop into the hole.
            The first way is left -> up -> left, represented by "lul".
            The second way is up -> left, represented by 'ul'.
            Both ways have shortest distance 6, but the first way is lexicographically smaller because 'l' < 'u'. So the output is "lul".
         */

		const maze = [
			[0, 0, 0, 0, 0],
			[1, 1, 0, 0, 1],
			[0, 0, 0, 0, 0],
			[0, 1, 0, 0, 1],
			[0, 1, 0, 0, 0]
		];
		const ball = [4, 3];
		const hole = [0, 1];
		const expected = 'lul';
		this.current_test_name = `${maze} | ${ball} | ${hole} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, ball, hole);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [3,0]
            Output: "impossible"
            Explanation: The ball cannot reach the hole.
         */

		const maze = [
			[0, 0, 0, 0, 0],
			[1, 1, 0, 0, 1],
			[0, 0, 0, 0, 0],
			[0, 1, 0, 0, 1],
			[0, 1, 0, 0, 0]
		];

		const ball = [4, 3];
		const hole = [3, 0];
		const expected = 'impossible';
		this.current_test_name = `${maze} | ${ball} | ${hole} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(maze, ball, hole);
		assert.deepEqual(actual, expected);
	}
}

class ConnectingCitiesWithMinimumCost extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
            Output: 6
            Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.
         */

		const n = 3;
		const connections = [
			[1, 2, 5],
			[1, 3, 6],
			[2, 3, 1]
		];
		const expected = 6;
		this.current_test_name = `${n} | ${connections} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 4, connections = [[1,2,3],[3,4,4]]
            Output: -1
            Explanation: There is no way to connect all cities even if all edges are used.
         */

		const n = 4;
		const connections = [
			[1, 2, 3],
			[3, 4, 4]
		];
		const expected = -1;
		this.current_test_name = `${n} | ${connections} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, connections);
		assert.deepEqual(actual, expected);
	}
}

class MinCostConnectAllPoints extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
            Output: 20
         */

		const points = [
			[0, 0],
			[2, 2],
			[3, 10],
			[5, 2],
			[7, 0]
		];
		const expected = 20;
		this.current_test_name = `${points} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(points);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: points = [[3,12],[-2,5],[-4,1]]
            Output: 18
         */

		const points = [
			[3, 12],
			[-2, 5],
			[-4, 1]
		];
		const expected = 18;
		this.current_test_name = `${points} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(points);
		assert.deepEqual(actual, expected);
	}
}

class OptimizeWaterDistributionInAVillage extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		/**
         * Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
            Output: 3
            Explanation: 
            The image shows the costs of connecting houses using pipes.
            The best strategy is to build a well in the first house with cost 1 and connect the other houses to it with cost 2 so the total cost is 3.
         */

		const n = 3;
		const wells = [1, 2, 2];
		const pipes = [
			[1, 2, 1],
			[2, 3, 1]
		];
		const expected = 3;
		this.current_test_name = `${n} | ${wells} | ${pipes} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, wells, pipes);
		assert.deepEqual(actual, expected);
	}

	test2() {
		/**
         * Input: n = 2, wells = [1,1], pipes = [[1,2,1]]
            Output: 2
         
         */

		const n = 2;
		const wells = [1, 1];
		const pipes = [[1, 2, 1]];
		const expected = 2;
		this.current_test_name = `${n} | ${wells} | ${pipes} | ${expected}`;
		const structure = new this.Problem();
		const actual = structure.solve(n, wells, pipes);
		assert.deepEqual(actual, expected);
	}
}

const TEST_DICTIONARY = {
	'number-of-provinces': NumberOfProvinces,
	'find-eventual-safe-states': FindEventualSafeStates,
	'key-and-rooms': KeyAndRooms,
	'shortest-path-with-alternating-colors': ShortedPathWithAlternatingColors,
	'nearest-exit-from-entrance-in-maze': NearestExitFromEntranceInMaze,
	'shortest-bridge': ShortestBridge,
	'jump-game-iii': JumpGameIII,
	'01-matrix': Matrix01,
	'time-needed-to-inform-all-employees': TimeNeededToInformAllEmployees,
	'reorder-routes-to-make-all-paths-lead-to-the-city-zero':
		ReorderRoutesToMakeAllPathLeadToTheCity,
	'all-paths-from-source-to-target': AllPathsFromSourceToTarget,
	'critical-connections-in-a-network': CriticalConnectionsInANetwork,
	'number-of-enclaves': NumberOfEnclaves,
	'number-of-closed-islands': NumberOfClosedIslands,
	'find-the-town-judge': FindTheTownJudge,
	'minimum-number-of-vertices-to-reach-all-nodes':
		MinimumNumberOfVerticesToReachAllNodes,
	'is-graph-bipartite': IsGraphBipartite,
	'graph-valid-tree': GraphValidTree,
	'accounts-merge': AccountsMerge,
	'satisfiability-of-equality-equations': SatisfiabilityOfEqualityEquations,
	'lexicographically-smallest-equivalent-string':
		LexicographicallySmallestEquivalentString,
	'similar-string-groups': SimilarStringGroups,
	'alien-dictionary': AlienDictionary,
	'sort-items-by-groups-respecting-dependencies':
		SortItemsByGroupsRespectingDependencies,
	'largest-color-value-in-a-directed-graph':
		LargestColorValueInADirectedGraph,
	'cheapest-flights-within-k-stops': CheapestFlightsWithinKStops,
	'path-with-maximum-probability': PathWithMaximumProbability,
	'the-maze-ii': TheMazeII,
	'the-maze-iii': TheMazeIII,
	'connecting-cities-with-minimum-cost': ConnectingCitiesWithMinimumCost,
	'min-cost-to-connect-all-points': MinCostConnectAllPoints,
	'optimize-water-distribution-in-a-village':
		OptimizeWaterDistributionInAVillage
};

module.exports = TEST_DICTIONARY;
