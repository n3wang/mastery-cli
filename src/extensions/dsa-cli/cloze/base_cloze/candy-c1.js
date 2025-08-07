/**
 * @param {number[]} ratings
 * @return {number}
 */
var candySolution = function (ratings) {
	const rightSide = new Array(ratings.length).fill(1);
	const leftSide = new Array(ratings.length).fill(1);

	// TODO For Loop and update based on the previous one if the current one is greater

	for (let i = ratings.length - 2; i >= 0; i--) {
		leftSide[i] = ratings[i] > ratings[i + 1] ? leftSide[i + 1] + 1 : 1;
	}

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
