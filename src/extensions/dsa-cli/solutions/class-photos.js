class ClassPhotos {
	solve(redShirtHeights, blueShirtHeights) {
		return classPhotos(redShirtHeights, blueShirtHeights);
	}
}

function classPhotos(redShirtHeights, blueShirtHeights) {
	redShirtHeights.sort((a, b) => b - a);
	blueShirtHeights.sort((a, b) => b - a);

	const shirtColorInFirstRowRed =
		redShirtHeights[0] < blueShirtHeights[0] ? true : false;
	for (let idx = 0; idx < redShirtHeights.length; idx++) {
		const redShirtHeight = redShirtHeights[idx];
		const blueShirtHeight = blueShirtHeights[idx];

		if (shirtColorInFirstRowRed) {
			if (redShirtHeight >= blueShirtHeight) return false;
		} else if (blueShirtHeight >= redShirtHeight) return false;
	}
	return true;
}

module.exports = { Problem: ClassPhotos };
