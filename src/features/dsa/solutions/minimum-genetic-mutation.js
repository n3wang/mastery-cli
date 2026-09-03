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

				for (const c of ['A', 'C', 'G', 'T']) {
					for (let i = 0; i < node.length; i++) {
						const neighbor =
							node.substring(0, i) + c + node.substring(i + 1);

						if (!seen.has(neighbor) && bank.includes(neighbor)) {
							queue.push(neighbor);
							seen.add(neighbor);
						}
					}
				}
			}

			steps++;
		}

		return -1;
	}
}

module.exports = { Problem: MinMutation };
