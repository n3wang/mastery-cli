/**
 * rightmost arr: [
  3, 3, 3, 3, 3,
  3, 3, 3, 2, 2,
  2, 1
]
leftmost arr: [
  0, 1, 1, 2, 2,
  2, 2, 3, 3, 3,
  3, 3
]
current height 0 Height bounddaries 0 Left 0 Right 3 accumulation 0
current height 1 Height bounddaries 1 Left 1 Right 3 accumulation 0
current height 0 Height bounddaries 1 Left 1 Right 3 accumulation 0
current height 2 Height bounddaries 2 Left 2 Right 3 accumulation 1
current height 1 Height bounddaries 2 Left 2 Right 3 accumulation 1
current height 0 Height bounddaries 2 Left 2 Right 3 accumulation 2
current height 1 Height bounddaries 2 Left 2 Right 3 accumulation 4
current height 3 Height bounddaries 3 Left 3 Right 3 accumulation 5
current height 2 Height bounddaries 2 Left 3 Right 2 accumulation 5
current height 1 Height bounddaries 2 Left 3 Right 2 accumulation 5
current height 2 Height bounddaries 2 Left 3 Right 2 accumulation 6
current height 1 Height bounddaries 1 Left 3 Right 1 accumulation 6
Test [0,1,0,2,1,0,1,3,2,1,2,1] => 6 ||  passed


rightmost arr: [ 5, 5, 5, 5, 5, 5 ]
leftmost arr: [ 4, 4, 4, 4, 4, 5 ]
current height 4 Height bounddaries 4 Left 4 Right 5 accumulation 0
current height 2 Height bounddaries 4 Left 4 Right 5 accumulation 0
current height 0 Height bounddaries 4 Left 4 Right 5 accumulation 2
current height 3 Height bounddaries 4 Left 4 Right 5 accumulation 6
current height 2 Height bounddaries 4 Left 4 Right 5 accumulation 7
current height 5 Height bounddaries 5 Left 5 Right 5 accumulation 9
Test [4,2,0,3,2,5] ||  passed

 */

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
		for (let i = 0; i < height.length; i++) {
			if (minLeftRight[i] - height[i] > 0) {
				water += minLeftRight[i] - height[i];
			}
		}

		return water;
	}

	//Dont edit this.
	solve = this.trappingRainWater;
}

module.exports = { Problem: TrappingRainWater };
