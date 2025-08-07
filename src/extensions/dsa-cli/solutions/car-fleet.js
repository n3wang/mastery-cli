/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
	//create pair of pos and speed
	const pair = position.map((pos, idx) => [pos, speed[idx]]);
	const stack = [];
	//sort in asc
	pair.sort((posA, posB) => posA[0] - posB[0]);
	//for loop reverse
	for (let i = pair.length - 1; i >= 0; i--) {
		//calculate time and add it to stack
		const [pos, speed] = pair[i];
		stack.push((target - pos) / speed);
		//if stack.length >=2 and stack[-1] <= stack[-2] ---> pop
		if (
			stack.length >= 2 &&
			stack[stack.length - 1] <= stack[stack.length - 2]
		) {
			stack.pop();
		}
	}
	// at the end of the loop return the length of the stack
	return stack.length;
};

class CarFleet {
	/**
	 * https://leetcode.com/problems/car-fleet
	 * Time O(N * log(N)) | Space O(N)
	 * @param {number} target
	 * @param {number[]} position
	 * @param {number[]} speed
	 * @return {number}
	 */
	solve(target, position, speed) {
		var getCoordinates = (target, position, speed) =>
			position
				.map((_position, index) => [
					_position,
					speed[index]
				]) /* Time O(N)          | Space O(N) */
				.sort(
					([aPosition], [bPosition]) => aPosition - bPosition
				) /* Time O(N * log(N)) | HeapSort Space 0(1) | QuickSort Space O(log(N)) */
				.map(
					([_position, _speed]) => (target - _position) / _speed
				); /* Time O(N)          | Space O(N) */

		var searchAscending = (coordinates, stack = []) => {
			for (const coordinate of coordinates) {
				/* Time O(N + N) */
				shrink(coordinate, stack); /* Time O(N + N) */
				stack.push(coordinate); /* Space O(N) */
			}

			return stack.length;
		};

		const shrink = (coordinate, stack) => {
			const isPreviousLess = () => stack[stack.length - 1] <= coordinate;
			while (stack.length && isPreviousLess())
				stack.pop(); /* Time O(N + N) */
		};

		const coordinates = getCoordinates(
			target,
			position,
			speed
		); /* Time O(N * log(N)) | Space O(N) */

		return searchAscending(coordinates);
	}

	/**
	 * https://leetcode.com/problems/car-fleet
	 * Time O(N * log(N)) | Space O(N)
	 * @param {number} target
	 * @param {number[]} position
	 * @param {number[]} speed
	 * @return {number}
	 */
	solve2(target, position, speed) {
		var getCoordinates = (target, position, speed) =>
			position
				.map((_position, index) => [
					_position,
					speed[index]
				]) /* Time O(N)          | Space O(N) */
				.sort(
					([aPosition], [bPosition]) => bPosition - aPosition
				) /* Time O(N * log(N)) | HeapSort Space 0(1) | QuickSort Space O(log(N)) */
				.map(
					([_position, _speed]) => (target - _position) / _speed
				); /* Time O(N)          | Space O(N) */

		var searchDescending = (coordinates, previous = 0, fleets = 0) => {
			for (const coordinate of coordinates) {
				/* Time O(N) */
				const isPreviousLess = previous < coordinate;
				if (!isPreviousLess) continue;

				previous = coordinate;
				fleets++;
			}

			return fleets;
		};
		const coordinates = getCoordinates(
			target,
			position,
			speed
		); /* Time O(N * log(N)) | Space O(N) */

		return searchDescending(coordinates); /* Time O(N) */
	}
}

module.exports = { Problem: CarFleet };
