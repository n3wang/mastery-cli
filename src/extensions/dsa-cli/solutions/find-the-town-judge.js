class FindTheTownJudge {
	solve(N, mat) {
		return findJudge(N, mat);
	}
}

function findJudge(N, trust) {
	if (trust.length < N - 1) {
		return -1;
	}

	const trustScores = new Array(N + 1).fill(0);

	for (const relation of trust) {
		trustScores[relation[0]]--;
		trustScores[relation[1]]++;
	}

	for (let i = 1; i <= N; i++) {
		if (trustScores[i] === N - 1) {
			return i;
		}
	}

	return -1;
}

module.exports = { Problem: FindTheTownJudge };
