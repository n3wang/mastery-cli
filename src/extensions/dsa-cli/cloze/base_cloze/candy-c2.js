/**
 * @param {number[]} ratings
 * @return {number}
 */
var candySolution = function (ratings) {
	// TODO Make the right and left side to be 1

	for (let i = 1; i < ratings.length; i++) {
		rightSide[i] = ratings[i] > ratings[i - 1] ? rightSide[i - 1] + 1 : 1;
	}

	// TODO Make the Left side a value in which the leftSide to always be larger than the left side if the current one is greater or just as 1

	let sum = 0;
	for (let i = 0; i < ratings.length; i++) {
		sum += Math.max(rightSide[i], leftSide[i]);
	}

	return sum;
};

class Candy {
	solve(ratings) {
		return candySolution(ratings);
	}
}

module.exports = { Problem: Candy };
