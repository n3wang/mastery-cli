class LaptopRentals {
	solve(times) {
		return laptopRentals(times);
	}
}

function laptopRentals(times) {
	if (times.length === 0) return 0;

	let usedLaptops = 0;
	const startTimes = times.map(time => time[0]).sort((a, b) => a - b);
	const endTimes = times.map(time => time[1]).sort((a, b) => a - b);

	let startIterator = 0;
	let endIterator = 0;

	while (startIterator < times.length) {
		if (startTimes[startIterator] >= endTimes[endIterator]) {
			usedLaptops--;
			endIterator++;
		}
		usedLaptops++;
		startIterator++;
	}

	return usedLaptops;
}

module.exports = { Problem: LaptopRentals };
