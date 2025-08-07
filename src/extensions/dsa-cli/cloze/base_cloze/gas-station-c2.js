class GasStation {
	/**
	 * https://leetcode.com/problems/gas-station/
	 * Time: O(n)
	 * @param {number[]} gas
	 * @param {number[]} cost
	 * @return {number}
	 */
	canCompleteCircuit = function (gas, cost) {
		let netDistance = 0;
		let res = 0;

		//Checks if theres enough gas to complete a cycle
		if (gas.reduce((a, b) => a + b) - cost.reduce((a, b) => a + b) < 0)
			return -1;

		// Finds the first appearence of a positive netDistance, if the cycle can't
		// be completed (netDistance < 0), starts cycle again @ the next positive netDistance value.

		// TODO Check for each gas, cost pair if theres enough gas to complete a cycle.If the net Distance
		// is negative then the cycle couldnt be completed, thus, we refer to the next stop as plausible

		return res;
	};

	solve(gas, cost) {
		return this.canCompleteCircuit(gas, cost);
	}
}

module.exports = { Problem: GasStation };
