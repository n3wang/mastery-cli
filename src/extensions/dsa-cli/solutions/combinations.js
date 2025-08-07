class Combinations {
	solve(n, k) {
		return combine(n, k);
	}
}

var combine = function (n, k) {
	const combinations = [];

	var backtrack = function (path, start) {
		if (path.length == k) {
			combinations.push([...path]);
			return;
		}

		for (let i = start; i <= n; i++) {
			path.push(i);
			backtrack(path, i + 1);
			path.pop();
		}
	};

	backtrack([], 1);
	return combinations;
};

module.exports = { Problem: Combinations };
