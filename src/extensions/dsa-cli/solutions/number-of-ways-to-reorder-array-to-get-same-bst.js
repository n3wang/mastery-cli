class NumberOfWaysToReorderArrayToGetSameBST {
	constructor() {
		this.mod = BigInt(1e9 + 7);
		this.table = [];
	}

	solve(nums) {
		const m = nums.length;

		// Table of Pascal's triangle
		this.table = new Array(m).fill(0).map(() => new Array(m).fill(0));
		for (let i = 0; i < m; ++i) {
			this.table[i][0] = this.table[i][i] = BigInt(1);
		}
		for (let i = 2; i < m; i++) {
			for (let j = 1; j < i; j++) {
				this.table[i][j] =
					(this.table[i - 1][j - 1] + this.table[i - 1][j]) %
					this.mod;
			}
		}
		const arrList = nums;
		return Number((this.dfs(arrList) - BigInt(1)) % this.mod);
	}

	dfs(nums) {
		const m = nums.length;
		if (m < 3) {
			return BigInt(1);
		}

		const leftNodes = [];
		const rightNodes = [];
		for (let i = 1; i < m; ++i) {
			if (nums[i] < nums[0]) {
				leftNodes.push(nums[i]);
			} else {
				rightNodes.push(nums[i]);
			}
		}
		const leftWays = this.dfs(leftNodes) % this.mod;
		const rightWays = this.dfs(rightNodes) % this.mod;

		return (
			(((leftWays * rightWays) % this.mod) *
				this.table[m - 1][leftNodes.length]) %
			this.mod
		);
	}
}

module.exports = {
	Problem: NumberOfWaysToReorderArrayToGetSameBST
};
