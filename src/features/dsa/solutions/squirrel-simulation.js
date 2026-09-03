class SquirelSiimulation {
	solve(height, width, tree, squirrel, nuts) {
		return minDistance(height, width, tree, squirrel, nuts);
	}
}

/**
 * @param {number} height
 * @param {number} width
 * @param {number[]} tree
 * @param {number[]} squirrel
 * @param {number[][]} nuts
 * @return {number}
 */
var minDistance = function (height, width, tree, squirrel, nuts) {
	// Method to calculate the manhatten distance between two positions on the matrix.
	const findDistance = (a, b) => {
		return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
	};

	// Find the sum total of the manhatten distance for each nut to
	// the tree multiplied by 2 (trip there and back).
	let treeDistSum =
		2 * nuts.reduce((dis, nut) => dis + findDistance(nut, tree), 0);

	let optimize = null;
	// Iterate over the nut array and find the maximum difference between the distance
	// from the nut to the tree and the distance from the squirrel to the same nut.
	for (let i = 0; i < nuts.length; i++) {
		let diff =
			findDistance(nuts[i], tree) - findDistance(nuts[i], squirrel);
		if (optimize === null || diff > optimize) optimize = diff;
	}
	// Return the sum total of all distances minus the maximum optimization we can do on our initial nut.
	return treeDistSum - optimize;
};

module.exports = { Problem: SquirelSiimulation };
