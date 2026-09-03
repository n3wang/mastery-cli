class EliminateMaximumNumberOfMonsters {
	solve(dist, speed) {
		return this.eliminateMaximum(dist, speed);
	}

	eliminateMaximum(dist, speed) {
		const arrival = [];
		for (let i = 0; i < dist.length; i++) {
			arrival.push(dist[i] / speed[i]);
		}
		arrival.sort((a, b) => a - b);

		let k = 0;
		for (let i = 0; i < arrival.length; i++) {
			if (arrival[i] <= i) {
				break;
			}
			k++;
		}

		return k;
	}
}

module.exports = { Problem: EliminateMaximumNumberOfMonsters };
