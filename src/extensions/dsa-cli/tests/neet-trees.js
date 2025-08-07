const assert = require('assert');
const ProblemTests = require('./problem-test');
const { arrayToBinaryTree, binaryTreeToArray } = require('./utils');

class BalancedBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[3,9,20,null,null,15,7] => true';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 9, 20, null, null, 15, 7]);
		assert(problemToTest.solve(tree) == true);
	}

	test_2() {
		this.current_test_name = '[1,2,2,3,3,null,null,4,4] => false';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 2, 3, 3, null, null, 4, 4]);
		assert(problemToTest.solve(tree) == false);
	}
}

class BinaryTreeLevelOrderTraversal extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'[3,9,20,null,null,15,7] => [[3],[9,20],[15,7]]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 9, 20, null, null, 15, 7]);
		assert.deepEqual(problemToTest.solve(tree), [[3], [9, 20], [15, 7]]);
	}

	test_2() {
		this.current_test_name =
			'[1,2,2,3,3,null,null,4,4] => [[1],[2,2],[3,3],[4,4]]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 2, 3, 3, null, null, 4, 4]);
		assert.deepEqual(problemToTest.solve(tree), [
			[1],
			[2, 2],
			[3, 3],
			[4, 4]
		]);
	}
}

class BinaryTreeMaximumPathSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[-10,9,20,null,null,15,7] => 42';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([-10, 9, 20, null, null, 15, 7]);

		assert(problemToTest.solve(tree) == 42);
	}

	test_2() {
		this.current_test_name = '[1,2,3] => 6';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 3]);
		assert(problemToTest.solve(tree) == 6);
	}
}

class BinaryTreeRightSideView extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[1,2,3,null,5,null,4] => [1,3,4]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 3, null, 5, null, 4]);
		assert.deepEqual(problemToTest.solve(tree), [1, 3, 4]);
	}

	test_2() {
		this.current_test_name = '[1,null,3] => [1,3]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, null, 3]);
		assert.deepEqual(problemToTest.solve(tree), [1, 3]);
	}
}

class ContructBinaryTreeFromPreorderAndInOrderTraversal extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			' preorder = [3,9,20,15,7], inorder= [9,3,15,20,7], => [3,9,20,null,null,15,7]';
		const problemToTest = new this.Problem();
		const tree = problemToTest.solve([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
		const result_tree_as_arr = binaryTreeToArray(tree);
		assert.deepEqual(result_tree_as_arr, [3, 9, 20, null, null, 15, 7]);
	}

	test_2() {
		this.current_test_name =
			' preorder = [1,2,3], inorder= [2,1,3], => [1,2,3]';
		const problemToTest = new this.Problem();
		const tree = problemToTest.solve([1, 2, 3], [2, 1, 3]);

		const result_tree_as_arr = binaryTreeToArray(tree);
		assert.deepEqual(result_tree_as_arr, [1, 2, 3]);
	}
}

class CountGoodNodesInBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[3,1,4,3,null,1,5] => 4';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 1, 4, 3, null, 1, 5]);
		assert(problemToTest.solve(tree) == 4);
	}

	test_2() {
		this.current_test_name = '[3,3,null,4,2] => 3';

		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 3, null, 4, 2]);
		assert(problemToTest.solve(tree) == 3);
	}

	test_3() {
		this.current_test_name = '[1] => 1';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1]);
		assert(problemToTest.solve(tree) == 1);
	}
}

class DiameterOfBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[1,2,3,4,5] => 3';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 3, 4, 5]);
		assert(problemToTest.solve(tree) == 3);
	}

	test_2() {
		this.current_test_name = '[1,2] => 1';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2]);
		assert(problemToTest.solve(tree) == 1);
	}
}

class InvertBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[4,2,7,1,3,6,9] => [4,7,2,9,6,3,1]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([4, 2, 7, 1, 3, 6, 9]);
		const result_tree = problemToTest.solve(tree);
		const result_tree_as_arr = binaryTreeToArray(result_tree);
		assert.deepEqual(result_tree_as_arr, [4, 7, 2, 9, 6, 3, 1]);
	}

	test_2() {
		this.current_test_name = '[2,1,3] => [2,3,1]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([2, 1, 3]);
		const result_tree = problemToTest.solve(tree);
		const result_tree_as_arr = binaryTreeToArray(result_tree);
		assert.deepEqual(result_tree_as_arr, [2, 3, 1]);
	}

	test_3() {
		this.current_test_name = '[] => []';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([]);
		const result_tree = problemToTest.solve(tree);
		const result_tree_as_arr = binaryTreeToArray(result_tree);
		assert.deepEqual(result_tree_as_arr, []);
	}
}

class KthSmallestElementInABst extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[3,1,4,null,2], k = 1 => 1';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 1, 4, null, 2]);
		assert(problemToTest.solve(tree, 1) == 1);
	}

	test_2() {
		this.current_test_name = '[5,3,6,2,4,null,null,1], k = 3 => 3';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([5, 3, 6, 2, 4, null, null, 1]);
		assert(problemToTest.solve(tree, 3) == 3);
	}

	test_3() {
		this.current_test_name = '[5,3,6,2,4,null,null,1], k = 3 => 3';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([5, 3, 6, 2, 4, null, null, 1]);
		assert(problemToTest.solve(tree, 3) == 3);
	}
}

class MaximumDepthOfBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[3,9,20,null,null,15,7] => 3';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([3, 9, 20, null, null, 15, 7]);
		assert(problemToTest.solve(tree) == 3);
	}

	test_2() {
		this.current_test_name = '[1,null,2] => 2';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, null, 2]);
		assert(problemToTest.solve(tree) == 2);
	}

	test_3() {
		this.current_test_name = '[] => 0';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([]);
		assert(problemToTest.solve(tree) == 0);
	}
}

class SameTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,2,3], [1,2,3] => true';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([1, 2, 3]);
		const tree2 = arrayToBinaryTree([1, 2, 3]);
		assert(problemToTest.solve(tree1, tree2) == true);
	}

	test_2() {
		this.current_test_name = '[1,2], [1,null,2] => false';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([1, 2]);
		const tree2 = arrayToBinaryTree([1, null, 2]);
		assert(problemToTest.solve(tree1, tree2) == false);
	}

	test_3() {
		this.current_test_name = '[1,2,1], [1,1,2] => false';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([1, 2, 1]);
		const tree2 = arrayToBinaryTree([1, 1, 2]);
		assert(problemToTest.solve(tree1, tree2) == false);
	}
}

class SerializeAndDeserializeBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name =
			'[1,2,3,null,null,4,5] => [1,2,3,null,null,4,5]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 3, null, null, 4, 5]);
		const arr_response = binaryTreeToArray(problemToTest.solve(tree));
		assert.deepEqual(arr_response, [1, 2, 3, null, null, 4, 5]);
	}

	test_2() {
		this.current_test_name =
			'[1,2,3,null,null,4,5] => [1,2,3,null,null,4,5]';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([1, 2, 3, null, null, 4, 5]);
		const arr_response = binaryTreeToArray(problemToTest.solve(tree));
		assert.deepEqual(arr_response, [1, 2, 3, null, null, 4, 5]);
	}

	test_3() {
		// Making sure there is no foul play

		this.current_test_name =
			' (check by calling deserialized, serialized) [1,2,3,null,null,4,5] => [1,2,3,null,null,4,5]';

		const problemToTest = new this.Problem();

		const tree = arrayToBinaryTree([1, 2, 3, null, null, 4, 5]);
		const serialized = problemToTest.serialize(tree);
		const deserialized = problemToTest.deserialize(serialized);
		const arr_response = binaryTreeToArray(deserialized);

		assert.deepEqual(arr_response, [1, 2, 3, null, null, 4, 5]);
		assert.notDeepEqual(
			binaryTreeToArray(serialized),
			binaryTreeToArray(deserialized)
		);
	}
}

class SubTreeOfAnotherTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[3,4,5,1,2], [4,1,2] => true';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([3, 4, 5, 1, 2]);
		const tree2 = arrayToBinaryTree([4, 1, 2]);
		assert(problemToTest.solve(tree1, tree2) == true);
	}

	test_2() {
		this.current_test_name =
			'[3,4,5,1,2,null,null,null,null,0], [4,1,2] => false';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([
			3,
			4,
			5,
			1,
			2,
			null,
			null,
			null,
			null,
			0
		]);
		const tree2 = arrayToBinaryTree([4, 1, 2]);
		assert(problemToTest.solve(tree1, tree2) == false);
	}

	test_3() {
		this.current_test_name = '[1,1], [1] => true';
		const problemToTest = new this.Problem();
		const tree1 = arrayToBinaryTree([1, 1]);
		const tree2 = arrayToBinaryTree([1]);
		assert(problemToTest.solve(tree1, tree2) == true);
	}
}

class ValidateBinarySearchTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[2,1,3] => true';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([2, 1, 3]);
		assert(problemToTest.solve(tree) == true);
	}

	test_2() {
		this.current_test_name = '[5,1,4,null,null,3,6] => false';
		const problemToTest = new this.Problem();
		const tree = arrayToBinaryTree([5, 1, 4, null, null, 3, 6]);
		assert(problemToTest.solve(tree) == false);
	}
}

const TEST_DICTIONARY = {
	'balanced-binary-tree': BalancedBinaryTree,
	'binary-tree-level-order-traversal': BinaryTreeLevelOrderTraversal,
	'binary-tree-maximum-path-sum': BinaryTreeMaximumPathSum,
	'binary-tree-right-side-view': BinaryTreeRightSideView,
	'construct-binary-tree-from-preorder-and-inorder-traversal':
		ContructBinaryTreeFromPreorderAndInOrderTraversal,
	'count-good-nodes-in-binary-tree': CountGoodNodesInBinaryTree,
	'diameter-of-binary-tree': DiameterOfBinaryTree,
	'invert-binary-tree': InvertBinaryTree,
	'kth-smallest-element-in-a-bst': KthSmallestElementInABst,
	'maximum-depth-of-binary-tree': MaximumDepthOfBinaryTree,
	'same-tree': SameTree,
	'serialize-and-deserialize-binary-tree': SerializeAndDeserializeBinaryTree,
	'subtree-of-another-tree': SubTreeOfAnotherTree,
	'validate-binary-search-tree': ValidateBinarySearchTree
};

module.exports = TEST_DICTIONARY;
