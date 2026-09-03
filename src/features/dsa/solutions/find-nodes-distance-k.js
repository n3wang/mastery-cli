class FindNodesDistanceK {
	solve(tree, target, k) {
		return findNodesDistanceK(tree, target, k);
	}
}

class BinaryTree {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

function findNodesDistanceK(tree, target, k) {
	const result = [];
	findDistanceFromNodeToTarget(tree, target, k, result);
	return result;
}

function findDistanceFromNodeToTarget(node, target, distance, nodesDistanceK) {
	if (node === null) return -1;
	if (node.value === target) {
		addDistanceKNodes(node, 0, distance, nodesDistanceK);
		return 1;
	}

	const leftDistance = findDistanceFromNodeToTarget(
		node.left,
		target,
		distance,
		nodesDistanceK
	);
	const rightDistance = findDistanceFromNodeToTarget(
		node.right,
		target,
		distance,
		nodesDistanceK
	);

	if (leftDistance === distance || rightDistance === distance)
		nodesDistanceK.push(node.value);
	if (leftDistance !== -1) {
		addDistanceKNodes(
			node.right,
			leftDistance + 1,
			distance,
			nodesDistanceK
		);
		return leftDistance + 1;
	}

	if (rightDistance !== -1) {
		addDistanceKNodes(
			node.left,
			rightDistance + 1,
			distance,
			nodesDistanceK
		);
		return rightDistance + 1;
	}

	return -1;
}

function addDistanceKNodes(node, distance, k, result) {
	if (node === null) return;
	if (distance === k) {
		result.push(node.value);
		return;
	}
	addDistanceKNodes(node.left, distance + 1, k, result);
	addDistanceKNodes(node.right, distance + 1, k, result);
}

module.exports = { Problem: FindNodesDistanceK };
