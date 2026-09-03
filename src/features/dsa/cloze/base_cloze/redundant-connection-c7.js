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
		// TODO Implement Compressing, by adding to the parent tail the head.
	}

	increaseRank(head, tail, { rank } = this) {
		// TODO Increase the rank of the head by adding the rank of the tail.
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
