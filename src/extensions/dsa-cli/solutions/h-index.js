var hIndex = function (citations) {
	citations.sort((a, b) => b - a);
	let i = 0;
	while (i < citations.length && i < citations[i]) {
		i++;
	}
	return i;
};

class HIndex {
	solve(citations) {
		return hIndex(citations);
	}
}

module.exports = { Problem: HIndex };
