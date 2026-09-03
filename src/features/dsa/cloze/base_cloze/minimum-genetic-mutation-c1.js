class MinMutation {
	solve(start, end, bank) {
		const queue = [];
		const seen = new Set();
		queue.push(start);
		seen.add(start);

		let steps = 0;

		while (queue.length > 0) {
			const nodesInQueue = queue.length;

			for (let j = 0; j < nodesInQueue; j++) {
				const node = queue.shift();

				if (node === end) {
					return steps;
				}

				// TODO Craft the candidate neighbor and check if it is in the bank

				// Remember to check if it has been seen and add it to the queue + seen
			}

			steps++;
		}

		return -1;
	}
}

module.exports = { Problem: MinMutation };
