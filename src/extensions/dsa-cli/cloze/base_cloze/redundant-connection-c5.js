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
		// Objective is findinging until the parent moves to the head.
		// TODO Find the parent of the node and compress the path if they are not equal.
		// TODO Return the HEAD
	}

	compress(tail, head, { parent } = this) {
		parent[tail] = head;
	}

	increaseRank(head, tail, { rank } = this) {
		rank[head] += rank[tail];
	}

	union(src, dst, { rank } = this) {
		const [rootSrc, rootDst] = [this.find(src), this.find(dst)];

		const hasCycle = rootSrc === rootDst;
		if (hasCycle) return false;

		const isSrcGreater = rank[rootSrc] > rank[rootDst];
		if (isSrcGreater) {
			this.increaseRank(rootDst, rootSrc);
			this.compress(rootSrc, rootDst);
		}

		const isDstGreater = rank[rootSrc] <= rank[rootDst];
		if (isDstGreater) {
			this.increaseRank(rootSrc, rootDst);
			this.compress(rootDst, rootSrc);
		}

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
