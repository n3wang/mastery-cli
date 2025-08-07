class FrogJump {
	constructor() {
		this.mark = new Map();
		this.dp = new Array(2001)
			.fill(null)
			.map(() => new Array(2001).fill(false));
	}

	solve(stones) {
		const n = stones.length;

		// Mark stones in the map to identify if such stone exists or not.
		for (let i = 0; i < n; i++) {
			this.mark.set(stones[i], i);
		}

		this.dp[0][0] = true;

		for (let index = 0; index < n; index++) {
			for (let prevJump = 0; prevJump <= n; prevJump++) {
				// If stone exists, mark the value with position and jump as 1.
				if (this.dp[index][prevJump]) {
					const stone = stones[index];

					if (this.mark.has(stone + prevJump)) {
						this.dp[this.mark.get(stone + prevJump)][
							prevJump
						] = true;
					}

					if (this.mark.has(stone + prevJump + 1)) {
						this.dp[this.mark.get(stone + prevJump + 1)][
							prevJump + 1
						] = true;
					}

					if (
						prevJump - 1 > 0 &&
						this.mark.has(stone + prevJump - 1)
					) {
						this.dp[this.mark.get(stone + prevJump - 1)][
							prevJump - 1
						] = true;
					}
				}
			}
		}

		// If any value with index as n - 1 is true, return true.
		for (let index = 0; index <= n; index++) {
			if (this.dp[n - 1][index]) {
				return true;
			}
		}

		return false;
	}
}

module.exports = { Problem: FrogJump };
