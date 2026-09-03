class AverageOfLevels {
	solve(root) {
		const result = [];
		const queue = [root];

		while (queue.length > 0) {
			let sum = 0;
			let count = 0;
			const temp = [];

			while (queue.length > 0) {
				const node = queue.shift();
				sum += node.val;
				count++;

				if (node.left !== null) {
					temp.push(node.left);
				}

				if (node.right !== null) {
					temp.push(node.right);
				}
			}

			queue.push(...temp);
			result.push(sum / count);
		}

		return result;
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: AverageOfLevels, TreeNode };
