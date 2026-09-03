const { MaxHeap } = require('./structures');

class FindMaximizedCapital {
	solve(k, w, profits, capital) {
		const n = profits.length;
		const projects = [];
		for (let i = 0; i < n; i++) {
			projects.push({ capital: capital[i], profit: profits[i] });
		}
		projects.sort((a, b) => a.capital - b.capital);
		const maxHeap = new MaxHeap();
		let ptr = 0;

		for (let i = 0; i < k; i++) {
			while (ptr < n && projects[ptr].capital <= w) {
				maxHeap.insert(projects[ptr++].profit);
			}
			if (maxHeap.isEmpty()) {
				break;
			}
			w += maxHeap.extractMax();
		}
		return w;
	}
}

module.exports = { Problem: FindMaximizedCapital };
