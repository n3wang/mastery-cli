class ContainerWithMostWater {
	maxArea(height) {
		// Returns the heigths of the left and right given the arr of heights and
		const getHeights = (height, left, right) => [
			height[left],
			height[right]
		];

		// gets Area by passing in the heights arr, the left and right index
		const getArea = (height, left, right) => {
			const [leftHeight, rightHeight] = getHeights(height, left, right);
			const _height = Math.min(leftHeight, rightHeight);
			const width = right - left;

			return _height * width;
		};

		// Initial values
		let [left, right, max] = [0, height.length - 1, 0];

		// While the left is younger than the right one go and tr getting the heights and then calculate the area.
		while (left < right) {
			const [leftHeight, rightHeight] = getHeights(height, left, right);
			const area = getArea(height, left, right);

			// TODO: Complete the iteration so that it can figure out the max water container.

			// Update the boundaries if the left is smaller

			//The same for the less, until it finds the perfect boundary
		}

		return max;
	}

	solve(heights) {
		return this.maxArea(heights);
	}
}

module.exports = { Problem: ContainerWithMostWater };
