class UnionFind {
	constructor(edges) {
		this.parent = new Array(edges.length + 1).fill().map((_, idx) => idx);
		this.rank = new Array(edges.length + 1).fill(1);
		this.redundantConnection = [-1, -1];

		this.search(edges);
	}

	search(edges) {
		for (let [src, dst] of edges) {
			const hasConnection = this.union(src, dst);
			if (!hasConnection) return (this.redundantConnection = [src, dst]);
		}
	}

	find(node, { parent } = this) {
		let head = parent[node];
		const isEqual = () => head === parent[head];
		while (!isEqual()) {
			const tail = parent[parent[head]];

			this.compress(head, tail);
			head = parent[head];
		}

		return head;
	}

	compress(tail, head, { parent } = this) {
		parent[tail] = head;
	}

	increaseRank(head, tail, { rank } = this) {
		rank[head] += rank[tail];
	}

	union(src, dst, { rank } = this) {
		// TODO Find the root of src and dst and union them if they are not equal.

		// TODO Otherwise return false. Which is the base case when a cycle is found.

		// TODO Increase the rank of the root of the src and dst if the rank of src is greater than dst.

		// After running the updates return true to continue.

		return true;
	}
}

class ReduntantConnection {
	/**
	 * https://leetcode.com/problems/redundant-connection/
	 * Time O(V + E) | Space O(V + E)
	 * @param {number[][]} edges
	 * @return {number[]}
	 */
	findRedundantConnection = function (edges) {
		return new UnionFind(edges).redundantConnection;
	};

	solve(edges) {
		return this.findRedundantConnection(edges);
	}
}

module.exports = { Problem: ReduntantConnection };
