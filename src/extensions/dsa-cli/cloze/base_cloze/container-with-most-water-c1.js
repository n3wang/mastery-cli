class ContainerWithMostWater {
	maxArea(height) {
		// Returns the heigths of the left and right given the arr of heights and
		const getHeights = (height, left, right) => [
			height[left],
			height[right]
		];

		// gets Area by passing in the heights arr, the left and right index
		// TODO Complete the getArea function

		// Initial values
		let [left, right, max] = [0, height.length - 1, 0];

		// While the left is younger than the right one go and tr getting the heights and then calculate the area.
		while (left < right) {
			const [leftHeight, rightHeight] = getHeights(height, left, right);
			const area = getArea(height, left, right);

			max = Math.max(max, area);

			// Update the boundaries if the left is smaller
			const isRightGreater = leftHeight <= rightHeight;
			if (isRightGreater) left++;

			//The same for the less, until it finds the perfect boundary
			const isRightLess = rightHeight < leftHeight;
			if (isRightLess) right--;
		}

		return max;
	}

	solve(heights) {
		return this.maxArea(heights);
	}
}

module.exports = { Problem: ContainerWithMostWater };
