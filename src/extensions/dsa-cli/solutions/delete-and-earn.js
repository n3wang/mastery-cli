class DeleteAndEarn {
	solve(nums) {
		let maxNumber = 0;
		const points = new Map();

		for (const num of nums) {
			points.set(num, (points.get(num) || 0) + num);
			maxNumber = Math.max(maxNumber, num);
		}

		let twoBack = 0;
		let oneBack = 0;
		const elements = [...points.keys()].sort((a, b) => a - b);
		oneBack = points.get(elements[0]);

		for (let i = 1; i < elements.length; i++) {
			const currentElement = elements[i];
			const temp = oneBack;

			if (currentElement === elements[i - 1] + 1) {
				oneBack = Math.max(
					oneBack,
					twoBack + points.get(currentElement)
				);
			} else {
				oneBack += points.get(currentElement);
			}

			twoBack = temp;
		}

		return oneBack;
	}
}

module.exports = { Problem: DeleteAndEarn };
