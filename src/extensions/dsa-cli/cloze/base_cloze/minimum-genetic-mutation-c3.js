class MinMutation {
	solve(start, end, bank) {
		const queue = [];
		const seen = new Set();
		queue.push(start);
		seen.add(start);

		let steps = 0;

		// TODO While there are nodes in the queue
		while (false) {
			const nodesInQueue = queue.length;
			// TODO Because we want to prioritize the the nodes that were added before to the queue, we need a for loop.
			for (;;) {
				//  TODO Shift the node from the queue and check if it is the end node

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
