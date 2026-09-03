class CountNicePairsInAnArray {
	solve(nums) {
		let ans = 0;
		const MOD = 10 ** 9 + 7;
		const coefs = [];
		for (let num of nums) {
			coefs.push(num - reverse(num));
		}

		// TODO If has been seen for each coef then add it to the as.
		const seen = {};

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
