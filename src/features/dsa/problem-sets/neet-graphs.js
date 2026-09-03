const assert = require('assert');
const ProblemTests = require('./problem-test');
const {
	arrayToNodeHeadNeighbors,
	arrayToBinaryTree,
	binaryTreeToArray,
	arrayToListNode
} = require('./utils');
const { link } = require('fs');

class CloneGraph extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
	}

	test_1() {
		const cloneGraph = new this.Problem();
		this.current_test_name =
			'[[2,4],[1,3],[2,4],[1,3]] | [[2,4],[1,3],[2,4],[1,3]]';
		assert.deepEqual(
			cloneGraph.solve(
				arrayToNodeHeadNeighbors([
					[2, 4],
					[1, 3],
					[2, 4],
					[1, 3]
				])
			),
			arrayToNodeHeadNeighbors([
				[2, 4],
				[1, 3],
				[2, 4],
				[1, 3]
			])
		);
	}
}

class CourseSchedule extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const courseSchedule = new this.Problem();
		this.current_test_name = '2, [[1,0]] | true';
		assert.deepEqual(courseSchedule.solve(2, [[1, 0]]), true);
	}

	test_2() {
		const courseSchedule = new this.Problem();
		this.current_test_name = '2, [[1,0],[0,1]] | false';
		assert.deepEqual(
			courseSchedule.solve(2, [
				[1, 0],
				[0, 1]
			]),
			false
		);
	}
}

class MaxAreaOfIsland extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const maxAreaOfIsland = new this.Problem();
		this.current_test_name =
			'[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]] | 6';
		assert.deepEqual(
			maxAreaOfIsland.solve([
				[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
				[0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
			]),
			6
		);
	}

	test_2() {
		const maxAreaOfIsland = new this.Problem();
		this.current_test_name = '[[0,0,0,0,0,0,0,0]] | 0';
		assert.deepEqual(maxAreaOfIsland.solve([[0, 0, 0, 0, 0, 0, 0, 0]]), 0);
	}
}

class NumberOfIslands extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const numberOfIslands = new this.Problem();
		this.current_test_name =
			'[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]] | 1';
		assert(
			1 ==
				numberOfIslands.solve([
					['1', '1', '1', '1', '0'],
					['1', '1', '0', '1', '0'],
					['1', '1', '0', '0', '0'],
					['0', '0', '0', '0', '0']
				])
		);
	}

	test_2() {
		const numberOfIslands = new this.Problem();
		this.current_test_name =
			'[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]] | 3';
		assert.deepEqual(
			numberOfIslands.solve([
				['1', '1', '0', '0', '0'],
				['1', '1', '0', '0', '0'],
				['0', '0', '1', '0', '0'],
				['0', '0', '0', '1', '1']
			]),
			3
		);
	}
}

class PacificAtlanticWaterFlow extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const pacificAtlanticWaterFlow = new this.Problem();
		this.current_test_name =
			'[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]] | [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]';
		assert.deepEqual(
			pacificAtlanticWaterFlow
				.solve([
					[1, 2, 2, 3, 5],
					[3, 2, 3, 4, 4],
					[2, 4, 5, 3, 1],
					[6, 7, 1, 4, 5],
					[5, 1, 1, 2, 4]
				])
				.sort(),
			[
				[0, 4],
				[1, 3],
				[1, 4],
				[2, 2],
				[3, 0],
				[3, 1],
				[4, 0]
			].sort()
		);
	}

	test_2() {
		const pacificAtlanticWaterFlow = new this.Problem();
		this.current_test_name;

		assert.deepEqual(pacificAtlanticWaterFlow.solve([[1]]), [[0, 0]]);
	}
}

class RedundantConnection extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const redundantConnection = new this.Problem();
		this.current_test_name = '[[1,2], [1,3], [2,3]] | [2,3]';
		assert.deepEqual(
			redundantConnection.solve([
				[1, 2],
				[1, 3],
				[2, 3]
			]),
			[2, 3]
		);
	}

	test_2() {
		const redundantConnection = new this.Problem();
		this.current_test_name = '[[1,2], [2,3], [3,4], [1,4], [1,5]] | [1,4]';
		assert.deepEqual(
			redundantConnection.solve([
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 4],
				[1, 5]
			]),
			[1, 4]
		);
	}
}

class RottingOranges extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const rottingOranges = new this.Problem();
		this.current_test_name = '[[2,1,1],[1,1,0],[0,1,1]] | 4';
		assert.deepEqual(
			rottingOranges.solve([
				[2, 1, 1],
				[1, 1, 0],
				[0, 1, 1]
			]),
			4
		);
	}

	test_2() {
		const rottingOranges = new this.Problem();
		this.current_test_name = '[[2,1,1],[0,1,1],[1,0,1]] | -1';
		assert.deepEqual(
			rottingOranges.solve([
				[2, 1, 1],
				[0, 1, 1],
				[1, 0, 1]
			]),
			-1
		);
	}
}

const X = 'X';
const O = 'O';

class SurroundedRegions extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const surroundedRegions = new this.Problem();
		this.current_test_name =
			'[[X, X, X, X], [X, O, O, X], [X, X, O, X], [X, O, X, X]] | [[X, X, X, X], [X, X, X, X], [X, X, X, X], [X, O, X, X]]';
		const board = [
			[X, X, X, X],
			[X, O, O, X],
			[X, X, O, X],
			[X, O, X, X]
		];

		this.tests.push(() => this.test_2());
		surroundedRegions.solve(board);
		assert.deepEqual(board, [
			[X, X, X, X],
			[X, X, X, X],
			[X, X, X, X],
			[X, O, X, X]
		]);
	}

	test_2() {
		const surroundedRegions = new this.Problem();
		this.current_test_name = '[[X]]';
		const board = [[X]];

		this.tests.push(() => this.test_2());
		surroundedRegions.solve(board);
		assert.deepEqual(board, [[X]]);
	}
}

class WallsAndGates extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const wallsAndGates = new this.Problem();
		this.current_test_name =
			'[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]] | [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]';
		const board = [
			[2147483647, -1, 0, 2147483647],
			[2147483647, 2147483647, 2147483647, -1],
			[2147483647, -1, 2147483647, -1],
			[0, -1, 2147483647, 2147483647]
		];

		this.tests.push(() => this.test_2());
		wallsAndGates.solve(board);
		assert.deepEqual(board, [
			[3, -1, 0, 1],
			[2, 2, 1, -1],
			[1, -1, 2, -1],
			[0, -1, 3, 4]
		]);
	}
}

class wordLadder extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const wordLadder = new this.Problem();
		this.current_test_name =
			'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"] | 5';
		const beginWord = 'hit';
		const endWord = 'cog';
		const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

		this.tests.push(() => this.test_2());
		assert(wordLadder.solve(beginWord, endWord, wordList) == 5);
	}

	test_2() {
		const wordLadder = new this.Problem();
		this.current_test_name =
			'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"] | 0';
		const beginWord = 'hit';
		const endWord = 'cog';
		const wordList = ['hot', 'dot', 'dog', 'lot', 'log'];

		this.tests.push(() => this.test_2());
		assert(wordLadder.solve(beginWord, endWord, wordList) == 0);
	}
}

class EvaluateDivision extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const evaluateDivision = new this.Problem();
		this.current_test_name =
			'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]] | [6.00000,0.50000,-1.00000,1.00000,-1.00000]';
		const equations = [
			['a', 'b'],
			['b', 'c']
		];
		const values = [2.0, 3.0];
		const queries = [
			['a', 'c'],
			['b', 'a'],
			['a', 'e'],
			['a', 'a'],
			['x', 'x']
		];

		this.tests.push(() => this.test_2());
		const results = evaluateDivision.solve(equations, values, queries);
		assert.deepEqual(results, [6.0, 0.5, -1.0, 1.0, -1.0]);
	}

	test_2() {
		const evaluateDivision = new this.Problem();
		this.current_test_name =
			'equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]] | [3.75000,0.40000,5.00000,0.20000]';
		const equations = [
			['a', 'b'],
			['b', 'c'],
			['bc', 'cd']
		];
		const values = [1.5, 2.5, 5.0];
		const queries = [
			['a', 'c'],
			['c', 'b'],
			['bc', 'cd'],
			['cd', 'bc']
		];
		const results = evaluateDivision.solve(equations, values, queries);
		assert.deepEqual(results, [3.75, 0.4, 5.0, 0.2]);
	}

	test_3() {
		/**
         * Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
        Output: [0.50000,2.00000,-1.00000,-1.00000]
         */

		const evaluateDivision = new this.Problem();
		this.current_test_name =
			'equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]] | [0.50000,2.00000,-1.00000,-1.00000]';
		const equations = [['a', 'b']];
		const values = [0.5];
		const queries = [
			['a', 'b'],
			['b', 'a'],
			['a', 'c'],
			['x', 'y']
		];
		const results = evaluateDivision.solve(equations, values, queries);
		assert.deepEqual(results, [0.5, 2.0, -1.0, -1.0]);
	}
}

class SnakesAndLadders extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const snakesAndLadders = new this.Problem();
		this.current_test_name =
			'board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]] | 4';
		const board = [
			[-1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1],
			[-1, 35, -1, -1, 13, -1],
			[-1, -1, -1, -1, -1, -1],
			[-1, 15, -1, -1, -1, -1]
		];
		assert.deepEqual(snakesAndLadders.solve(board), 4);
	}

	test_2() {
		const snakesAndLadders = new this.Problem();
		this.current_test_name = 'board = [[-1,-1],[-1,3]] | 1';
		const board = [
			[-1, -1],
			[-1, 3]
		];
		assert.deepEqual(snakesAndLadders.solve(board), 1);
	}
}

class MinMutation extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const minMutation = new this.Problem();
		this.current_test_name =
			'start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"] | 1';
		const start = 'AACCGGTT';
		const end = 'AACCGGTA';
		const bank = ['AACCGGTA'];
		assert.deepEqual(minMutation.solve(start, end, bank), 1);
	}

	test_2() {
		const minMutation = new this.Problem();
		this.current_test_name =
			'start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"] | 2';
		const start = 'AACCGGTT';
		const end = 'AAACGGTA';
		const bank = ['AACCGGTA', 'AACCGCTA', 'AAACGGTA'];
		assert.deepEqual(minMutation.solve(start, end, bank), 2);
	}
}

class ConvertSortedArrayToBinarySearchTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const convertSortedArrayToBinarySearchTree = new this.Problem();
		this.current_test_name = '[-10,-3,0,5,9] | [0,-3,9,-10,null,5]';
		const nums = [-10, -3, 0, 5, 9];
		const root = convertSortedArrayToBinarySearchTree.solve(nums);
		// console.log(root)
		// console.log(arrayToBinaryTree([0,-3,9,-10,null,5]))
		assert.deepEqual(root, arrayToBinaryTree([0, -3, 9, -10, null, 5]));
	}

	test_2() {
		const convertSortedArrayToBinarySearchTree = new this.Problem();
		this.current_test_name = '[1, 3] | [0,-3,9,-10,null,5]';
		let nums = [1, 3];
		const root = convertSortedArrayToBinarySearchTree.solve(nums);
		assert.deepEqual(root, arrayToBinaryTree([3, 1]));
	}
}

class NQueensII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const nQueens2 = new this.Problem();
		this.current_test_name = 'n = 4 | 2';
		const n = 4;
		assert.deepEqual(nQueens2.solve(n), 2);
	}

	test_2() {
		const nQueens2 = new this.Problem();
		this.current_test_name = 'n = 1 | 1';
		const n = 1;
		assert.deepEqual(nQueens2.solve(n), 1);
	}

	test_3() {
		const nQueens2 = new this.Problem();
		this.current_test_name = 'n = 2 | 0';
		const n = 2;
		assert.deepEqual(nQueens2.solve(n), 0);
	}
}

class SortList extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sortList = new this.Problem();
		this.current_test_name = '[-1,5,3,4,0] | [-1,0,3,4,5]';
		const linkedList = arrayToListNode([-1, 5, 3, 4, 0]);
		// console.log(linkedList)
		assert.deepEqual(
			sortList.solve(linkedList),
			arrayToListNode([-1, 0, 3, 4, 5])
		);
	}

	test_2() {
		const sortList = new this.Problem();
		this.current_test_name = '[] | []';
		const linkedList = arrayToListNode([]);
		// console.log(linkedList)
		assert.deepEqual(sortList.solve(linkedList), arrayToListNode([]));
	}

	test_3() {
		const sortList = new this.Problem();
		this.current_test_name = '[-1, 5, 3, 4, 0] | [-1, 0, 3, 4, 5]';
		const linkedList = arrayToListNode([-1, 5, 3, 4, 0]);
		// console.log(linkedList)
		assert.deepEqual(
			sortList.solve(linkedList),
			arrayToListNode([-1, 0, 3, 4, 5])
		);
	}
}

class ConstructQuadTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const constructQuadTree = new this.Problem();
		this.current_test_name = '[[0,1],[1,0]] | [[0,1],[1,0]]';
		const grid = [
			[0, 1],
			[1, 0]
		];
		// console.log(constructQuadTree.solve(grid))
		// assert.deepEqual(constructQuadTree.solve(grid), arrayToBinaryTree([[0,1],[1,0]]));
		// throw new Error('Not implemented');
	}

	test_2() {
		const constructQuadTree = new this.Problem();
		this.current_test_name =
			'[[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1, 1, 1, 1, 1, 1, 1, 1],[1,1,1,1,0,0,0,0],[1, 1, 1, 1, 0, 0, 0, 0],[1,1,1,1,0,0,0,0],[1, 1, 1, 1, 0, 0, 0, 0]] | [[0,1],[1,0]]';
		const grid = [
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0]
		];
		// assert.deepEqual(constructQuadTree.solve(grid), arrayToBinaryTree([[0,1],[1,0]]));
		// console.log(constructQuadTree.solve(grid))
	}
}

class SearchInsertPosition extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const searchInsertPosition = new this.Problem();
		this.current_test_name = '[1,3,5,6], 5 | 2';
		const nums = [1, 3, 5, 6];
		const target = 5;
		assert.deepEqual(searchInsertPosition.solve(nums, target), 2);
	}

	test_2() {
		const searchInsertPosition = new this.Problem();
		this.current_test_name = '[1,3,5,6], 2 | 1';
		const nums = [1, 3, 5, 6];
		const target = 2;
		assert.deepEqual(searchInsertPosition.solve(nums, target), 1);
	}

	test_3() {
		const searchInsertPosition = new this.Problem();
		this.current_test_name = '[1,3,5,6], 7 | 4';
		const nums = [1, 3, 5, 6];
		const target = 7;
		assert.deepEqual(searchInsertPosition.solve(nums, target), 4);
	}
}

class SearchA2DMatrix extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const searchA2DMatrix = new this.Problem();
		this.current_test_name =
			'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3 | true';
		const matrix = [
			[1, 3, 5, 7],
			[10, 11, 16, 20],
			[23, 30, 34, 60]
		];
		const target = 3;
		assert.deepEqual(searchA2DMatrix.solve(matrix, target), true);
	}

	test_2() {
		const searchA2DMatrix = new this.Problem();
		this.current_test_name =
			'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13 | false';
		const matrix = [
			[1, 3, 5, 7],
			[10, 11, 16, 20],
			[23, 30, 34, 60]
		];
		const target = 13;
		assert.deepEqual(searchA2DMatrix.solve(matrix, target), false);
	}

	test_3() {
		const searchA2DMatrix = new this.Problem();
		this.current_test_name = 'matrix = [], target = 0 | false';
		const matrix = [];
		const target = 0;
		assert.deepEqual(searchA2DMatrix.solve(matrix, target), false);
	}
}

class FindFirstAndLastPositionOfElementInSortedArray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const findFirstAndLastPositionOfElementInSortedArray =
			new this.Problem();
		this.current_test_name = 'nums = [5,7,7,8,8,10], target = 8 | [3,4]';
		const nums = [5, 7, 7, 8, 8, 10];
		const target = 8;
		assert.deepEqual(
			findFirstAndLastPositionOfElementInSortedArray.solve(nums, target),
			[3, 4]
		);
	}

	test_2() {
		const findFirstAndLastPositionOfElementInSortedArray =
			new this.Problem();
		this.current_test_name = 'nums = [5,7,7,8,8,10], target = 6 | [-1,-1]';
		const nums = [5, 7, 7, 8, 8, 10];
		const target = 6;
		assert.deepEqual(
			findFirstAndLastPositionOfElementInSortedArray.solve(nums, target),
			[-1, -1]
		);
	}

	test_3() {
		const findFirstAndLastPositionOfElementInSortedArray =
			new this.Problem();
		this.current_test_name = 'nums = [], target = 0 | [-1,-1]';
		const nums = [];
		const target = 0;
		assert.deepEqual(
			findFirstAndLastPositionOfElementInSortedArray.solve(nums, target),
			[-1, -1]
		);
	}
}

class FindMInimumInRotatedSortedArray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const findMinimumInRotatedSortedArray = new this.Problem();
		this.current_test_name = 'nums = [3,4,5,1,2] | 1';
		const nums = [3, 4, 5, 1, 2];
		assert.deepEqual(findMinimumInRotatedSortedArray.solve(nums), 1);
	}

	test_2() {
		const findMinimumInRotatedSortedArray = new this.Problem();
		this.current_test_name = 'nums = [4,5,6,7,0,1,2] | 0';
		const nums = [4, 5, 6, 7, 0, 1, 2];
		assert.deepEqual(findMinimumInRotatedSortedArray.solve(nums), 0);
	}

	test_3() {
		const findMinimumInRotatedSortedArray = new this.Problem();
		this.current_test_name = 'nums = [11,13,15,17] | 11';
		const nums = [11, 13, 15, 17];
		assert.deepEqual(findMinimumInRotatedSortedArray.solve(nums), 11);
	}
}

class MedianOfTwoSortedArrays extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const nums1 = [1, 3];
		const nums2 = [2];
		const medianOfTwoSortedArrays = new this.Problem();
		this.current_test_name = 'nums1 = [1,3], nums2 = [2] | 2.00000';
		assert.deepEqual(medianOfTwoSortedArrays.solve(nums1, nums2), 2.0);
	}

	test_2() {
		const nums1 = [1, 2];
		const nums2 = [3, 4];
		const medianOfTwoSortedArrays = new this.Problem();
		this.current_test_name = 'nums1 = [1,2], nums2 = [3,4] | 2.50000';
		assert.deepEqual(medianOfTwoSortedArrays.solve(nums1, nums2), 2.5);
	}

	test_3() {
		const nums1 = [0, 0];
		const nums2 = [0, 0];
		const medianOfTwoSortedArrays = new this.Problem();
		this.current_test_name = 'nums1 = [0,0], nums2 = [0,0] | 0.00000';
		assert.deepEqual(medianOfTwoSortedArrays.solve(nums1, nums2), 0.0);
	}
}

const TEST_DICTIONARY = {
	'clone-graph': CloneGraph,
	'course-schedule': CourseSchedule,
	'max-area-of-island': MaxAreaOfIsland,
	'number-of-islands': NumberOfIslands,
	'pacific-atlantic-water-flow': PacificAtlanticWaterFlow,
	'redundant-connection': RedundantConnection,
	'rotting-oranges': RottingOranges,
	'surrounded-regions': SurroundedRegions,
	'walls-and-gates': WallsAndGates,
	'word-ladder': wordLadder,
	'evaluate-division': EvaluateDivision,
	'snakes-and-ladders': SnakesAndLadders,
	'minimum-genetic-mutation': MinMutation,
	'convert-sorted-array-to-binary-search-tree':
		ConvertSortedArrayToBinarySearchTree,
	'n-queens-ii': NQueensII,
	'sort-list': SortList,
	// 'construct-quad-tree': ConstructQuadTree,
	'search-insert-position': SearchInsertPosition,
	'search-a-2d-matrix': SearchA2DMatrix,
	'find-first-and-last-position-of-element-in-sorted-array':
		FindFirstAndLastPositionOfElementInSortedArray,
	'find-minimum-in-rotated-sorted-array': FindMInimumInRotatedSortedArray,
	'median-of-two-sorted-arrays': MedianOfTwoSortedArrays,
	'construct-quad-tree': ConstructQuadTree
};

module.exports = TEST_DICTIONARY;
