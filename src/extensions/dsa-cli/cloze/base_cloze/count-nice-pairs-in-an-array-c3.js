class CountNicePairsInAnArray {
	solve(nums) {
		let ans = 0;
		const MOD = 10 ** 9 + 7;
		const coefs = [];
		for (let num of nums) {
			coefs.push(num - reverse(num));
		}

		const seen = {};
		for (let coef of coefs) {
			if (!(coef in seen)) {
				seen[coef] = 0;
			}
			ans = (ans + seen[coef]) % MOD;
			seen[coef]++;
		}
		return ans;
	}
}

var reverse = function (num) {
	let res = 0;
	while (num) {
		res = res * 10 + (num % 10);
		num = Math.floor(num / 10);
	}
	return res;
};

module.exports = { Problem: CountNicePairsInAnArray };
