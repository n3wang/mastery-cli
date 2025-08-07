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
		//TODO if stack.length >=2 and stack[-1] <= stack[-2] ---> pop
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
		return carFleet(target, position, speed);
	}
}

module.exports = { Problem: CarFleet };
