class DominoAndTrominoTiling {
	solve(n) {
		return numTilings(n);
	}
}

function numTilings(n) {
	const MOD = 1000000007;
	const SQ_MATRIX = [
		[1, 1, 2],
		[1, 0, 0],
		[0, 1, 1]
	];
	const SIZE = 3;

	function matrixProduct(m1, m2) {
		let ans = Array.from(Array(SIZE), () => Array(SIZE).fill(0));

		for (let row = 0; row < SIZE; row++) {
			for (let col = 0; col < SIZE; col++) {
				let curSum = 0;
				for (let k = 0; k < SIZE; k++) {
					curSum += (m1[row][k] * m2[k][col]) % MOD;
				}
				ans[row][col] = curSum % MOD;
			}
		}
		return ans;
	}

	function matrixExpo(n) {
		let cur = SQ_MATRIX;
		for (let i = 1; i < n; i++) {
			cur = matrixProduct(cur, SQ_MATRIX);
		}
		return (cur[0][0] * 2 + cur[0][1] * 1 + cur[0][2] * 1) % MOD;
	}

	if (n <= 2) {
		return n;
	}

	return matrixExpo(n - 2);
}
module.exports = { Problem: DominoAndTrominoTiling };
