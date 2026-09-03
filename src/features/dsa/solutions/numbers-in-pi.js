class NumbersInPi {
	solve(pi, numbers) {
		return numbersInPi(pi, numbers);
	}
}

function numbersInPi(pi, numbers) {
	// Write your code here.
	const numbersTable = {};
	for (const number of numbers) {
		numbersTable[number] = true;
	}

	const cache = {};
	for (let i = pi.length - 1; i >= 0; i--) {
		getMinSpaces(pi, numbersTable, cache, i);
	}

	return cache[0] === Infinity ? -1 : cache[0];
}

function getMinSpaces(pi, numbersTable, cache, idx) {
	if (idx === pi.length) return -1;
	if (cache[idx]) return cache[idx];

	let minSpaces = Infinity;
	for (let i = idx; i < pi.length; i++) {
		const prefix = pi.slice(idx, i + 1);
		if (numbersTable[prefix]) {
			const minSpacesInSuffix = getMinSpaces(
				pi,
				numbersTable,
				cache,
				i + 1
			);
			minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
		}
	}

	cache[idx] = minSpaces;
	return cache[idx];
}

module.exports = { Problem: NumbersInPi };
