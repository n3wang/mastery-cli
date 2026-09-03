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
		const [x, y] = point;
		const key = this.getKey(x, y);
		const value = (map[key] || 0) + 1;

		map[key] = value; /* Space O(N) */
		points.push(point); /* Space O(N) */
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
		// TODO Get the expected points and check if they exist in the map.
		// TODO If they exist then return the product of the values.
		// TODO Return the product
	}
}

module.exports = { Problem: DetectSquares };
