class MaximizeExpression {
	solve(array) {
		return maximizeExpression(array);
	}
}

function maximizeExpression(array) {
	if (array.length < 4) return 0;

	const maxOfA = new Array(1).fill(array[0]);
	const maxOfAminusB = new Array(1).fill(-Infinity);
	const maxOfAminusBplusC = new Array(2).fill(-Infinity);
	const maxOfAminusBplusCminusD = new Array(3).fill(-Infinity);

	for (let i = 1; i < array.length; i++) {
		const currentMax = Math.max(maxOfA[i - 1], array[i]);
		maxOfA.push(currentMax);
	}

	for (let i = 1; i < array.length; i++) {
		const currentMax = Math.max(
			maxOfAminusB[i - 1],
			maxOfA[i - 1] - array[i]
		);
		maxOfAminusB.push(currentMax);
	}

	for (let i = 2; i < array.length; i++) {
		const currentMax = Math.max(
			maxOfAminusBplusC[i - 1],
			maxOfAminusB[i - 1] + array[i]
		);
		maxOfAminusBplusC.push(currentMax);
	}

	for (let i = 3; i < array.length; i++) {
		const currentMax = Math.max(
			maxOfAminusBplusCminusD[i - 1],
			maxOfAminusBplusC[i - 1] - array[i]
		);
		maxOfAminusBplusCminusD.push(currentMax);
	}

	return maxOfAminusBplusCminusD[maxOfAminusBplusCminusD.length - 1];
}

module.exports = { Problem: MaximizeExpression };
