class TrappingRainWater {
	trappingRainWater(height) {
		const maxLeft = [];
		const maxRight = [];
		const minLeftRight = [];

		let current = 0;

		//Create an array of the max lefts and max rights for each element in the heights
		for (let i = 0; i < height.length; i++) {
			maxLeft.push(current);
			current = Math.max(current, height[i]);
		}
		current = 0;
		//Note how maxRight is calculated by going from the mostright to the left.
		for (let i = height.length - 1; i > -1; i--) {
			maxRight.push(current);
			current = Math.max(current, height[i]);
		}

		// because the elements were added reverse.
		maxRight.reverse();

		// The smallest common area calculable of them
		for (let i = 0; i < height.length; i++) {
			const minofLeftRight = Math.min(maxLeft[i], maxRight[i]);
			minLeftRight.push(minofLeftRight);
		}

		// Then you can calculate the water amount by checking that if the size is larger than the minium left, then you can add that to the water amount..
		let water = 0;
		// TODO Complete the water accumulation calculation.

		return water;
	}

	//Dont edit this.
	solve = this.trappingRainWater;
}

module.exports = { Problem: TrappingRainWater };
