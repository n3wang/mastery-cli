class IsSymmetric {
	solve(root) {
		if (root === null) return true;

		const queue = [];
		queue.push(root);
		queue.push(root);

		while (queue.length > 0) {
			const t1 = queue.shift();
			const t2 = queue.shift();

			if (t1 === null && t2 === null) continue;
			if (t1 === null || t2 === null) return false;
			if (t1.val !== t2.val) return false;

			queue.push(t1.left);
			queue.push(t2.right);
			queue.push(t1.right);
			queue.push(t2.left);
		}

		return true;
	}
}

function TreeNode(val, left = null, right = null) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

module.exports = { Problem: IsSymmetric, TreeNode };
