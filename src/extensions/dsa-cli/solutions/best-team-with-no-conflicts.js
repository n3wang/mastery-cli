class BestTeamWithNoConflicts {
	solve(scores, ages) {
		return bestTeamScore(scores, ages);
	}
}

function bestTeamScore(scores, ages) {
	const ageScorePair = [];
	for (let i = 0; i < scores.length; i++) {
		ageScorePair.push([scores[i], ages[i]]);
	}
	// Sort in ascending order of score and then by age.
	ageScorePair.sort((a, b) => {
		if (a[0] !== b[0]) {
			return a[0] - b[0];
		}
		return a[1] - b[1];
	});

	let highestAge = 0;
	for (const age of ages) {
		highestAge = Math.max(highestAge, age);
	}
	const BIT = new Array(highestAge + 1).fill(0);

	let answer = Number.MIN_SAFE_INTEGER;
	for (const [score, age] of ageScorePair) {
		// Maximum score up to this age might not have all the players of this age.
		const currentBest = score + queryBIT(BIT, age);
		// Update the tree with the current age and its best score.
		updateBIT(BIT, age, currentBest);

		answer = Math.max(answer, currentBest);
	}

	return answer;
}

// Query tree to get the maximum score up to this age.
function queryBIT(BIT, age) {
	let maxScore = Number.MIN_SAFE_INTEGER;
	for (let i = age; i > 0; i -= i & -i) {
		maxScore = Math.max(maxScore, BIT[i]);
	}
	return maxScore;
}

// Update the maximum score for all the nodes with an age greater than the given age.
function updateBIT(BIT, age, currentBest) {
	for (let i = age; i < BIT.length; i += i & -i) {
		BIT[i] = Math.max(BIT[i], currentBest);
	}
}

module.exports = { Problem: BestTeamWithNoConflicts };
