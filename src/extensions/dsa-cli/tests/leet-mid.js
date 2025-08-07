const assert = require('assert');
const ProblemTests = require('./problem-test');
const { arrayToListNode, arrayToBinaryTree, TreeNode } = require('./utils');

class HIndex extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const hIndex = new this.Problem();
		this.current_test_name = '[0,1,3,5,6] | 3';
		assert.equal(hIndex.solve([0, 1, 3, 5, 6]), 3);
	}

	test_2() {
		const hIndex = new this.Problem();
		this.current_test_name = '[100, 100] | 2';
		assert.equal(hIndex.solve([100, 100]), 2);
	}

	test_3() {
		const hIndex = new this.Problem();
		this.current_test_name = '[0, 0, 0, 0, 0] | 0';
		assert.equal(hIndex.solve([0, 0, 0, 0, 0]), 0);
	}
}

class InsertDeleteGetRandomO1 extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name =
			'["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]\n[[],[1],[2],[2],[],[1],[2],[]] | [null,true,false,true,2,true,false,2]';

		assert.equal(structure.RandomizedSet(), null);
		assert.equal(structure.insert(1), true);
		assert.equal(structure.remove(2), false);
		assert.equal(structure.insert(2), true);
		assert.equal(structure.remove(1), true);
		assert.equal(structure.RandomizedSet(), 2);
		assert.equal(structure.insert(2), false);
		assert.equal(structure.RandomizedSet(), 2);
	}
}

class MinimumSizeSubArraySum extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[2,3,1,2,4,3] | 7 => 2';
		assert.equal(structure.solve(7, [2, 3, 1, 2, 4, 3]), 2);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,4,4] | 4 => 1';
		assert.equal(structure.solve(4, [1, 4, 4]), 1);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[1,1,1,1,1,1,1,1] | 11 => 0';
		assert.equal(structure.solve(11, [1, 1, 1, 1, 1, 1, 1, 1]), 0);
	}
}

class GameOfLife extends ProblemTests {
	constructor(problem) {
		super(problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		// Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
		// Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

		const structure = new this.Problem();
		this.current_test_name =
			'[[0,1,0],[0,0,1],[1,1,1],[0,0,0]] | [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]';
		const board = [
			[0, 1, 0],
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0]
		];
		structure.solve(board);
		assert.deepEqual(board, [
			[0, 0, 0],
			[1, 0, 1],
			[0, 1, 1],
			[0, 1, 0]
		]);
	}

	test_2() {
		// Input: const board = [[1,1],[1,0]]
		// Output: [[1,1],[1,1]]

		const structure = new this.Problem();
		this.current_test_name = '[[1,1],[1,0]] | [[1,1],[1,1]]';
		const board = [
			[1, 1],
			[1, 0]
		];
		structure.solve(board);
		assert.deepEqual(board, [
			[1, 1],
			[1, 1]
		]);
	}
}

class WordPattern extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = 'abba | dog cat cat dog => true';
		assert.equal(structure.solve('abba', 'dog cat cat dog'), true);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = 'abba | dog cat cat fish => false';
		assert.equal(structure.solve('abba', 'dog cat cat fish'), false);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = 'aaaa | dog cat cat dog => false';
		assert.equal(structure.solve('aaaa', 'dog cat cat dog'), false);
	}
}

class ContainsDuplicateII extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,1] | 3 => true';
		assert.equal(structure.solve([1, 2, 3, 1], 3), true);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,0,1,1] | 1 => true';
		assert.equal(structure.solve([1, 0, 1, 1], 1), true);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,1,2,3] | 2 => false';
		assert.equal(structure.solve([1, 2, 3, 1, 2, 3], 2), false);
	}
}

class SummaryRanges extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[0,1,2,4,5,7] => ["0->2","4->5","7"]';
		assert.deepEqual(structure.solve([0, 1, 2, 4, 5, 7]), [
			'0->2',
			'4->5',
			'7'
		]);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[0,2,3,4,6,8,9] => ["0","2->4","6","8->9"]';
		assert.deepEqual(structure.solve([0, 2, 3, 4, 6, 8, 9]), [
			'0',
			'2->4',
			'6',
			'8->9'
		]);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[] => []';
		assert.deepEqual(structure.solve([]), []);
	}
}

class MinimumNumberOfArrowsToBurstBalloons extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[10,16],[2,8],[1,6],[7,12]] => 2';
		assert.equal(
			structure.solve([
				[10, 16],
				[2, 8],
				[1, 6],
				[7, 12]
			]),
			2
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,2],[3,4],[5,6],[7,8]] => 4';
		assert.equal(
			structure.solve([
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8]
			]),
			4
		);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,2],[2,3],[3,4],[4,5]] => 2';
		assert.equal(
			structure.solve([
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5]
			]),
			2
		);
	}
}

class PartitionList extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,4,3,2,5,2] | 3 => [1,2,2,4,3,5]';
		assert.deepEqual(
			structure.solve(arrayToListNode([1, 4, 3, 2, 5, 2]), 3),
			arrayToListNode([1, 2, 2, 4, 3, 5])
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[2,1] | 2 => [1,2]';
		assert.deepEqual(
			structure.solve(arrayToListNode([2, 1]), 2),
			arrayToListNode([1, 2])
		);
	}
}

class SymmetricTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,2,3,4,4,3] => true';
		assert.equal(
			structure.solve(arrayToBinaryTree([1, 2, 2, 3, 4, 4, 3])),
			true
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,2,null,3,null,3] => false';
		assert.equal(
			structure.solve(arrayToBinaryTree([1, 2, 2, null, 3, null, 3])),
			false
		);
	}
}

class ConstructBinaryTreeFromInorderAndPostorderTraversal extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name =
			'[9,3,15,20,7] | [9,15,7,20,3] => [3,9,20,null,null,15,7]';
		const root = structure.buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);

		assert.deepEqual(
			root,
			arrayToBinaryTree([3, 9, 20, null, null, 15, 7])
		);
		// assert.deepEqual(structure.solve([9,3,15,20,7], [9,15,7,20,3]), arrayToBinaryTree([3,9,20,null,null,15,7]));
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[-1] | [-1] => [-1]';
		const root = structure.buildTree([-1], [-1]);

		assert.deepEqual(root, arrayToBinaryTree([-1]));
		// assert.deepEqual(structure.solve([9,3,15,20,7], [9,15,7,20,3]), arrayToBinaryTree([3,9,20,null,null,15,7]));
	}
}

class PopulatingNextRightPointersInEachNode extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_2());
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[] => []';
		const root = structure.connect(arrayToBinaryTree([]));

		assert.deepEqual(root, arrayToBinaryTree([]));
	}
}

class FlattenBinaryTreeToLinkedList extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,5,3,4,null,6] => ';
		/**
         * TreeNode {
            left: null,
            right: TreeNode {
                left: null,
                right: TreeNode {
                left: TreeNode {
                    left: TreeNode {
                    left: TreeNode {
                        left: null,
                        right: null,
                        val: 6
                    },
                    right: null,
                    val: 5
                    },
                    right: null,
                    val: 4
                },
                right: null,
                val: 3
                },
                val: 2
            },
            val: 1
            }
         */

		const entry = arrayToBinaryTree([1, 2, 5, 3, 4, null, 6]);
		structure.solve(entry);
		const expectedSolution = new TreeNode(
			1,
			null,
			new TreeNode(
				2,
				null,
				new TreeNode(
					3,
					null,
					new TreeNode(
						4,
						null,
						new TreeNode(5, null, new TreeNode(6))
					)
				)
			)
		);

		assert.deepEqual(entry, expectedSolution);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[] => []';
		const entry = arrayToBinaryTree([]);
		structure.solve(entry);
		assert.deepEqual(entry, arrayToBinaryTree([]));
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[0] => [0]';
		const entry = arrayToBinaryTree([0]);
		structure.solve(entry);
		assert.deepEqual(entry, arrayToBinaryTree([0]));
	}
}

class SumRootToLeafNumbers extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3] => 25';
		const entry = arrayToBinaryTree([1, 2, 3]);
		assert.equal(structure.solve(entry), 25);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[4,9,0,5,1] => 1026';
		const entry = arrayToBinaryTree([4, 9, 0, 5, 1]);
		assert.equal(structure.solve(entry), 1026);
	}
}

class CountCompleteTreeNodes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5,6] => 6';
		const entry = arrayToBinaryTree([1, 2, 3, 4, 5, 6]);
		assert.equal(structure.solve(entry), 6);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[] => 0';
		const entry = arrayToBinaryTree([]);
		assert.equal(structure.solve(entry), 0);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[1] => 1';
		const entry = arrayToBinaryTree([1]);
		assert.equal(structure.solve(entry), 1);
	}
}

class AverageOfLevelsInBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[3,9,20, null, null, 15,7] => [3,14.5,11]';
		const entry = arrayToBinaryTree([3, 9, 20, null, null, 15, 7]);
		assert.deepEqual(structure.solve(entry), [3, 14.5, 11]);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[3,9,20,15,7] => [3,14.5,11]';
		const entry = arrayToBinaryTree([3, 9, 20, 15, 7]);
		assert.deepEqual(structure.solve(entry), [3, 14.5, 11]);
	}
}

class MinimumAbsoluteDifferenceInBst extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[4,2,6,1,3] => 1';
		const entry = arrayToBinaryTree([4, 2, 6, 1, 3]);
		assert.equal(structure.solve(entry), 1);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,0,48,null,null,12,49] => 1';
		const entry = arrayToBinaryTree([1, 0, 48, null, null, 12, 49]);
		assert.equal(structure.solve(entry), 1);
	}
}

class RemoveDuplicatesFromLinkedList extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,1,2] => [2]';
		const entry = arrayToListNode([1, 1, 2]);
		assert.deepEqual(structure.solve(entry), arrayToListNode([2]));
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,1,2,3,3] => [2]';
		const entry = arrayToListNode([1, 1, 2, 3, 3]);
		assert.deepEqual(structure.solve(entry), arrayToListNode([2]));
	}

	test_3() {
		/**
         * Input: head = [1,2,3,3,4,4,5]
            Output: [1,2,5]
         */

		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,3,4,4,5] => [1,2,5]';
		const entry = arrayToListNode([1, 2, 3, 3, 4, 4, 5]);
		assert.deepEqual(structure.solve(entry), arrayToListNode([1, 2, 5]));
	}

	test_4() {
		const structure = new this.Problem();
		this.current_test_name = '[1,1,1,2,3] => [2,3]';
		const entry = arrayToListNode([1, 1, 1, 2, 3]);
		assert.deepEqual(structure.solve(entry), arrayToListNode([2, 3]));
	}
}

class RotateList extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5] | 2 => [4,5,1,2,3]';
		const entry = arrayToListNode([1, 2, 3, 4, 5]);
		assert.deepEqual(
			structure.solve(entry, 2),
			arrayToListNode([4, 5, 1, 2, 3])
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[0,1,2] | 4 => [2,0,1]';
		const entry = arrayToListNode([0, 1, 2]);
		assert.deepEqual(structure.solve(entry, 4), arrayToListNode([2, 0, 1]));
	}
}

class SimplifyPath extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '/home/ => /home';
		assert.equal(structure.solve('/home/'), '/home');
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '/../ => /';
		assert.equal(structure.solve('/../'), '/');
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '/home//foo/ => /home/foo';
		assert.equal(structure.solve('/home//foo/'), '/home/foo');
	}
}

class BasicCalculator extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '"1 + 1" => 2';
		assert.equal(structure.solve('1 + 1'), 2);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '" 2-1 + 2 " => 3';
		assert.equal(structure.solve(' 2-1 + 2 '), 3);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '"(1+(4+5+2)-3)+(6+8)" => 23';
		assert.equal(structure.solve('(1+(4+5+2)-3)+(6+8)'), 23);
	}

	test_4() {
		const structure = new this.Problem();
		this.current_test_name = '"-2+ 1" => -1';
		assert.equal(structure.solve('-2+ 1'), -1);
	}

	test_5() {
		const structure = new this.Problem();
		this.current_test_name = '"- (3 + (4 + 5))" => -12';
		assert.equal(structure.solve('- (3 + (4 + 5))'), -12);
	}
}

class RemoveNthFromEnd extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5] | 2 => [1,2,3,5]';
		assert.deepEqual(
			structure.removeNthFromEnd(arrayToListNode([1, 2, 3, 4, 5]), 2),
			arrayToListNode([1, 2, 3, 5])
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1] | 1 => []';
		assert.deepEqual(
			structure.removeNthFromEnd(arrayToListNode([1]), 1),
			arrayToListNode([])
		);
	}
}

class IPO extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const IPO = new this.Problem();
		this.current_test_name =
			'k = 2, W = 0, Profits = [1,2,3], Capital = [0,1,1] | 4';
		const k = 2;
		const W = 0;
		const Profits = [1, 2, 3];
		const Capital = [0, 1, 1];
		assert.deepEqual(IPO.solve(k, W, Profits, Capital), 4);
	}

	test_2() {
		const IPO = new this.Problem();
		this.current_test_name =
			'k = 1, W = 0, Profits = [1,2,3], Capital = [1,1,2] | 0';
		const k = 1;
		const W = 0;
		const Profits = [1, 2, 3];
		const Capital = [1, 1, 2];
		assert.deepEqual(IPO.solve(k, W, Profits, Capital), 0);
	}

	test_3() {
		const IPO = new this.Problem();
		this.current_test_name =
			'k = 2, W = 0, Profits = [1,2,3], Capital = [1,1,2] | 0';
		const k = 2;
		const W = 0;
		const Profits = [1, 2, 3];
		const Capital = [1, 1, 2];
		assert.deepEqual(IPO.solve(k, W, Profits, Capital), 0);
	}
}

class FindKPairsWithSmallestSums extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const nums = [1, 7, 11];
		const nums2 = [2, 4, 6];
		const k = 3;
		const expected = [
			[1, 2],
			[1, 4],
			[1, 6]
		];
		const structure = new this.Problem();
		this.current_test_name = `${nums}, ${nums2}, ${k} => ${expected}`;
		assert.deepEqual(structure.solve(nums, nums2, k), expected);
	}

	test_2() {
		const nums = [1, 1, 2];
		const nums2 = [1, 2, 3];
		const k = 2;
		const expected = [
			[1, 1],
			[1, 1]
		];
		const structure = new this.Problem();
		this.current_test_name = `${nums}, ${nums2}, ${k} => ${expected}`;
		assert.deepEqual(structure.solve(nums, nums2, k), expected);
	}

	test_3() {
		const nums = [1, 2];
		const nums2 = [3];
		const k = 3;
		const expected = [
			[1, 3],
			[2, 3]
		];
		const structure = new this.Problem();
		this.current_test_name = `${nums}, ${nums2}, ${k} => ${expected}`;
		assert.deepEqual(structure.solve(nums, nums2, k), expected);
	}
}

class AddBinary extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '"11", "1" => "100"';
		assert.equal(structure.solve('11', '1'), '100');
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '"1010", "1011" => "10101"';
		assert.equal(structure.solve('1010', '1011'), '10101');
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '"0", "0" => "0"';
		assert.equal(structure.solve('0', '0'), '0');
	}
}

class BiwiseAndOfNumbersRange extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '5, 7 => 4';
		assert.equal(structure.solve(5, 7), 4);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '0, 1 => 0';
		assert.equal(structure.solve(0, 1), 0);
	}
}

class FactorialTraillingZero extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '3 => 0';
		assert.equal(structure.solve(3), 0);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '5 => 1';
		assert.equal(structure.solve(5), 1);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '0 => 0';
		assert.equal(structure.solve(0), 0);
	}
}

class MySqrt extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '4 => 2';
		assert.equal(structure.solve(4), 2);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '8 => 2';
		assert.equal(structure.solve(8), 2);
	}
}

class Triangle extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[2],[3,4],[6,5,7],[4,1,8,3]] => 11';
		assert.equal(
			structure.solve([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]),
			11
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[2],[3,4],[6,5,7],[4,1,8,3]] => 11';
		assert.equal(
			structure.solve([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]),
			11
		);
	}
}

class MaxPointsOnALine extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,1],[2,2],[3,3]] => 3';
		assert.equal(
			structure.solve([
				[1, 1],
				[2, 2],
				[3, 3]
			]),
			3
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]] => 4';
		assert.equal(
			structure.solve([
				[1, 1],
				[3, 2],
				[5, 3],
				[4, 1],
				[2, 3],
				[1, 4]
			]),
			4
		);
	}
}

class MinimumPathSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,3,1],[1,5,1],[4,2,1]] => 7';
		assert.equal(
			structure.solve([
				[1, 3, 1],
				[1, 5, 1],
				[4, 2, 1]
			]),
			7
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[1,2,3],[4,5,6]] => 12';
		assert.equal(
			structure.solve([
				[1, 2, 3],
				[4, 5, 6]
			]),
			12
		);
	}
}

class UniquePaths extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '3, 2 => 3';
		assert.equal(structure.solve(3, 2), 3);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '7, 3 => 28';
		assert.equal(structure.solve(7, 3), 28);
	}
}

class UniquePathsII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[0,0,0],[0,1,0],[0,0,0]] => 2';
		assert.equal(
			structure.solve([
				[0, 0, 0],
				[0, 1, 0],
				[0, 0, 0]
			]),
			2
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[0,1],[0,0]] => 1';
		assert.equal(
			structure.solve([
				[0, 1],
				[0, 0]
			]),
			1
		);
	}
}

class BestTimeToBuyAndSellStockIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[3,3,5,0,0,3,1,4] => 6';
		assert.equal(structure.solve([3, 3, 5, 0, 0, 3, 1, 4]), 6);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5] => 4';
		assert.equal(structure.solve([1, 2, 3, 4, 5]), 4);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name = '[7,6,4,3,1] => 0';
		assert.equal(structure.solve([7, 6, 4, 3, 1]), 0);
	}
}

class BestTImeToBuyAndSellStockIV extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '2, [2,4,1] => 2';
		assert.equal(structure.solve(2, [2, 4, 1]), 2);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '2, [3,2,6,5,0,3] => 7';
		assert.equal(structure.solve(2, [3, 2, 6, 5, 0, 3]), 7);
	}
}

class maximalSquare extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name =
			'[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]] => 4';
		assert.equal(
			structure.solve([
				['1', '0', '1', '0', '0'],
				['1', '0', '1', '1', '1'],
				['1', '1', '1', '1', '1'],
				['1', '0', '0', '1', '0']
			]),
			4
		);
	}
}

class ReverseLinkedListII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		/**
         * Input: head = [1,2,3,4,5], left = 2, right = 4
            Output: [1,4,3,2,5]
         */

		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5], 2, 4 => [1,4,3,2,5]';
		assert.deepEqual(
			structure.solve(arrayToListNode([1, 2, 3, 4, 5]), 2, 4),
			arrayToListNode([1, 4, 3, 2, 5])
		);
	}

	test_2() {
		/**
         * Input: head = [5], left = 1, right = 1
            Output: [5]
         */

		const structure = new this.Problem();
		this.current_test_name = '[5], 1, 1 => [5]';
		assert.deepEqual(
			structure.solve(arrayToListNode([5]), 1, 1),
			arrayToListNode([5])
		);
	}
}

class CourseScheduleII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
		// this.tests.push(() => this.test_4());
	}

	test_1() {
		/**
         * Input: numCourses = 2, prerequisites = [[1,0]]
            Output: [0,1]
            Explanation: There are a total of 2 courses to take.
            To take course 1 you should have finished course 0. So it is possible.
         */

		const structure = new this.Problem();
		this.current_test_name = '2, [[1,0]] => [0,1]';
		assert.deepEqual(structure.solve(2, [[1, 0]]), [0, 1]);
	}

	// test_2(){
	//     /**
	//      * [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]
	//      * numCourses = 10
	//      * expected:
	//      * [9,8,7,6,5,4,3,2,1,0]
	//      */

	//     const structure = new this.Problem();
	//     this.current_test_name = '10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]] => [9,8,7,6,5,4,3,2,1,0]';
	//     assert.deepEqual(structure.solve(10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]), [9,8,7,6,5,4,3,2,1,0]);
	// }

	// test_3(){
	//     /**
	//      * Input
	//         10
	//         [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]
	//         Expected
	//         [9,8,7,6,5,4,3,2,1,0]
	//      */

	//     const structure = new this.Problem();
	//     this.current_test_name = '10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]] => [9,8,7,6,5,4,3,2,1,0]';
	//     assert.deepEqual(structure.solve(10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]), [9,8,7,6,5,4,3,2,1,0]);

	// }

	// test_4(){
	//     /**
	//      * Input
	//         10
	//         [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]
	//         Expected
	//         [9,8,7,6,5,4,3,2,1,0]
	//      */

	//     const structure = new this.Problem();
	//     this.current_test_name = '10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]] => [9,8,7,6,5,4,3,2,1,0]';
	//     assert.deepEqual(structure.solve(10, [[5,8],[3,5],[1,9],[4,5],[0,2],[7,8],[4,9]]), [9,8,7,6,5,4,3,2,1,0]);
	// }
}

class Combinations extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		/**
         * Input: n = 4, k = 2
            Output:
            [
            [2,4],
            [3,4],
            [2,3],
            [1,2],
            [1,3],
            [1,4],
            ]
         */

		const structure = new this.Problem();
		this.current_test_name =
			'4, 2 => [[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]';
		assert.deepEqual(
			structure.solve(4, 2).length,
			[
				[2, 4],
				[3, 4],
				[2, 3],
				[1, 2],
				[1, 3],
				[1, 4]
			].length
		);
	}

	test_2() {
		/**
         * Input: n = 4, k = 2
            Output:
            [
            [2,4],
            [3,4],
            [2,3],
            [1,2],
            [1,3],
            [1,4],
            ]
         */

		const structural = new this.Problem();
		this.current_test_name =
			'4, 2 => [[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]';
		assert.deepEqual(structural.solve(4, 2), [
			[2, 4],
			[3, 4],
			[2, 3],
			[1, 2],
			[1, 3],
			[1, 4]
		]);
	}
}

class MaximumElementAfterDecreasingAndRearranging extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		/**
         * Input: arr = [2,2,1,2,1]
        Output: 2
        Explanation: 
        We can satisfy the conditions by rearranging arr so it becomes [1,2,2,2,1].
        The largest element in arr is 2.
         */

		const structure = new this.Problem();
		this.current_test_name = '[2,2,1,2,1] => 2';
		assert.deepEqual(structure.solve([2, 2, 1, 2, 1]), 2);
	}

	test_2() {
		/**
         * Input: arr = [100,1,1000]
            Output: 3
            Explanation: 
            One possible way to satisfy the conditions is by doing the following:
            1. Rearrange arr so it becomes [1,100,1000].
            2. Decrease the value of the second element to 2.
            3. Decrease the value of the third element to 3.
            Now arr = [1,2,3], which satisfies the conditions.
            The largest element in arr is 3.
         */

		const structure = new this.Problem();
		this.current_test_name = '[100,1,1000] => 3';
		assert.deepEqual(structure.solve([100, 1, 1000]), 3);
	}

	test_3() {
		/**
         * Input: arr = [1,2,3,4,5]
            Output: 5
            Explanation: The array already satisfies the conditions, and the largest element is 5.
         */

		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,4,5] => 5';
		assert.deepEqual(structure.solve([1, 2, 3, 4, 5]), 5);
	}
}

class FindUniqueBinaryString extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '["01","10"] => "11" | "00"';
		const candRepsponses = ['11', '00'];
		assert.equal(
			candRepsponses.includes(structure.solve(['01', '10'])),
			true
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '["00","01"] => "11" | "10"';
		const candRepsponses = ['11', '10'];
		assert.equal(
			candRepsponses.includes(structure.solve(['00', '01'])),
			true
		);
	}

	test_3() {
		const structure = new this.Problem();
		this.current_test_name =
			'["111","011","001"] => "101" | "110" | "000" | "010" | "100"';
		const candRepsponses = ['101', '110', '000', '010', '100'];
		assert.equal(
			candRepsponses.includes(structure.solve(['111', '011', '001'])),
			true
		);
	}
}

class FindPeakElement extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,3,1] => 2';
		assert.equal(structure.solve([1, 2, 3, 1]), 2);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,2,1,3,5,6,4] => 1 | 5';
		const candRepsponses = [1, 5];
		assert.equal(
			candRepsponses.includes(structure.solve([1, 2, 1, 3, 5, 6, 4])),
			true
		);
	}
}

class SingleNumber extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[2,2,1] => 1';
		assert.equal(structure.solve([2, 2, 1]), 1);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[4,1,2,1,2] => 4';
		assert.equal(structure.solve([4, 1, 2, 1, 2]), 4);
	}
}

class SingleNumberII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[2,2,3,2] => 3';
		assert.equal(structure.solve([2, 2, 3, 2]), 3);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[0,1,0,1,0,1,99] => 99';
		assert.equal(structure.solve([0, 1, 0, 1, 0, 1, 99]), 99);
	}
}

class SumOfAbsoluteDifferenceInASortedArray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[2,3,5] => [4,3,5]';
		assert.deepEqual(structure.solve([2, 3, 5]), [4, 3, 5]);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[1,4,6,8,10] => [24,15,13,15,21]';
		assert.deepEqual(
			structure.solve([1, 4, 6, 8, 10]),
			[24, 15, 13, 15, 21]
		);
	}
}

class MinimumTotal extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '[[2],[3,4],[6,5,7],[4,1,8,3]] => 11';
		assert.equal(
			structure.solve([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]),
			11
		);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '[[2],[3,4],[6,5,7],[4,1,8,3]] => 11';
		assert.equal(
			structure.solve([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]),
			11
		);
	}
}

class MinDistance extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const structure = new this.Problem();
		this.current_test_name = '"horse", "ros" => 3';
		assert.equal(structure.solve('horse', 'ros'), 3);
	}

	test_2() {
		const structure = new this.Problem();
		this.current_test_name = '"intention", "execution" => 5';
		assert.equal(structure.solve('intention', 'execution'), 5);
	}
}

const TEST_DICTIONARY = {
	'h-index': HIndex,
	'insert-delete-getrandom-o1': InsertDeleteGetRandomO1,
	'minimum-size-subarray-sum': MinimumSizeSubArraySum,
	'game-of-life': GameOfLife,
	'word-pattern': WordPattern,
	'contains-duplicate-ii': ContainsDuplicateII,
	'summary-ranges': SummaryRanges,
	'minimum-number-of-arrows-to-burst-balloons':
		MinimumNumberOfArrowsToBurstBalloons,
	'partition-list': PartitionList,
	'symmetric-tree': SymmetricTree,
	'construct-binary-tree-from-inorder-and-postorder-traversal':
		ConstructBinaryTreeFromInorderAndPostorderTraversal,
	'populating-next-right-pointers-in-each-node':
		PopulatingNextRightPointersInEachNode,
	'flatten-binary-tree-to-linked-list': FlattenBinaryTreeToLinkedList,
	'sum-root-to-leaf-numbers': SumRootToLeafNumbers,
	'count-complete-tree-nodes': CountCompleteTreeNodes,
	'average-of-levels-in-binary-tree': AverageOfLevelsInBinaryTree,
	'minimum-absolute-difference-in-bst': MinimumAbsoluteDifferenceInBst,
	'remove-duplicates-from-sorted-list-ii': RemoveDuplicatesFromLinkedList,
	'rotate-list': RotateList,
	'simplify-path': SimplifyPath,
	'basic-calculator': BasicCalculator,
	'remove-nth-node-from-end-of-list': RemoveNthFromEnd,
	ipo: IPO,
	'find-k-pairs-with-smallest-sums': FindKPairsWithSmallestSums,
	'add-binary': AddBinary,
	'bitwise-and-of-numbers-range': BiwiseAndOfNumbersRange,
	'factorial-trailing-zeroes': FactorialTraillingZero,
	sqrtx: MySqrt,
	'max-points-on-a-line': MaxPointsOnALine,
	triangle: Triangle,
	'minimum-path-sum': MinimumPathSum,
	'unique-paths': UniquePaths,
	'unique-paths-ii': UniquePathsII,
	'best-time-to-buy-and-sell-stock-iii': BestTimeToBuyAndSellStockIII,
	'best-time-to-buy-and-sell-stock-iv': BestTImeToBuyAndSellStockIV,
	'maximal-square': maximalSquare,
	'reverse-linked-list-ii': ReverseLinkedListII,
	'course-schedule-ii': CourseScheduleII,
	combinations: Combinations,
	'maximum-element-after-decreasing-and-rearranging':
		MaximumElementAfterDecreasingAndRearranging,
	'find-unique-binary-string': FindUniqueBinaryString,
	'find-peak-element': FindPeakElement,
	'single-number-ii': SingleNumberII,
	'sum-of-absolute-differences-in-a-sorted-array':
		SumOfAbsoluteDifferenceInASortedArray,
	'single-number': SingleNumber,
	triangle: MinimumTotal,
	'min-distance': MinDistance
};

module.exports = TEST_DICTIONARY;
