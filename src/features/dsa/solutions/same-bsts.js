class SameBstsProblem {
	solve(arrayOne, arrayTwo) {
		return SameBsts(arrayOne, arrayTwo);
	}
}

function SameBsts(arrayOne, arrayTwo) {
	return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

function areSameBsts(
	arrayOne,
	arrayTwo,
	rootIdxOne,
	rootIdxTwo,
	minVal,
	maxVal
) {
	if (rootIdxOne === -1 || rootIdxTwo === -1)
		return rootIdxOne === rootIdxTwo;

	if (arrayOne[rootIdxOne] !== arrayTwo[rootIdxTwo]) return false;

	const leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
	const leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
	const rightRootIdxOne = getIdxOfFirstBiggerOrEqual(
		arrayOne,
		rootIdxOne,
		maxVal
	);
	const rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(
		arrayTwo,
		rootIdxTwo,
		maxVal
	);

	const currentValue = arrayOne[rootIdxOne];
	const leftAreSame = areSameBsts(
		arrayOne,
		arrayTwo,
		leftRootIdxOne,
		leftRootIdxTwo,
		minVal,
		currentValue
	);
	const rightAreSame = areSameBsts(
		arrayOne,
		arrayTwo,
		rightRootIdxOne,
		rightRootIdxTwo,
		currentValue,
		maxVal
	);

	return leftAreSame && rightAreSame;
}

function getIdxOfFirstSmaller(array, startingIdx, minVal) {
	/**
	 * Find the index of the first element in the array that is smaller than the element at the startingIdx
	 * Make sure that this value is greater than or equal to the minVal
	 * which is the value of the previous parent node in the BST. if it
	 * is not, then that vaalue is located in the left sutree of the previous parent node.
	 */
	for (let i = startingIdx + 1; i < array.length; i++) {
		if (array[i] < array[startingIdx] && array[i] >= minVal) return i;
	}
	return -1;
}

function getIdxOfFirstBiggerOrEqual(array, startingIdx, maxVal) {
	/**
	 * Find the index of the first element in the array that is greater than or equal to the element at the startingIdx
	 * Make sure that this value is less than the maxVal
	 * which is the value of the previous parent node in the BST. if it
	 * is not, then that vaalue is located in the right sutree of the previous parent node.
	 */

	for (let i = startingIdx + 1; i < array.length; i++) {
		if (array[i] >= array[startingIdx] && array[i] < maxVal) return i;
	}
	return -1;
}

module.exports = { Problem: SameBstsProblem };
