/*
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/detect-squares
 */
class DetectSquares {
	constructor() {
		this.map = {}; /* Space O(N) */
		this.points = []; /* Space O(N) */
	}

	add(point, { map, points } = this) {
		// TODO Get the key of the point and increase the value of the key by 1.
		// Then add the value to its map and push the point to the points available.
	}

	count(point, { points } = this, score = 0) {
		const [x1, y1] = point;

		for (const [x2, y2] of points) {
			/* Time O(N) */
			const isSame = Math.abs(x2 - x1) === Math.abs(y2 - y1);
			const isEqual = x1 === x2 || y1 === y2;
			const canSkip = !isSame || isEqual;
			if (canSkip) continue;

			score += this.getScore(x1, y1, x2, y2);
		}

		return score;
	}

	getKey(x, y) {
		return `${x},${y}`;
	}

	getScore(x1, y1, x2, y2, { map } = this) {
		const [aKey, bKey] = [this.getKey(x1, y2), this.getKey(x2, y1)];
		const [aScore, bScore] = [map[aKey] || 0, map[bKey] || 0];

		return aScore * bScore;
	}
}

module.exports = { Problem: DetectSquares };
