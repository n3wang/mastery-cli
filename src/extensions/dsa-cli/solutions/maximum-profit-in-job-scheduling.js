const { PriorityQueue } = require('./structures');

class MaximumProfitInJobScheduling {
	solve(startTime, endTime, profit) {
		return this.jobScheduling(startTime, endTime, profit);
	}

	findMaxProfit(jobs) {
		const n = jobs.length;
		let maxProfit = 0;
		// Min heap having [endTime, profit]
		const pq = new PriorityQueue((a, b) => a[0] - b[0] || a[1] - b[1]);

		for (let i = 0; i < n; i++) {
			const [start, end, profit] = jobs[i];

			// Keep popping while the heap is not empty and
			// jobs are not conflicting.
			// Update the value of maxProfit.
			while (!pq.isEmpty() && start >= pq.peek()[0]) {
				maxProfit = Math.max(maxProfit, pq.poll()[1]);
			}

			// Push the job with combined profit.
			// If no non-conflicting job is present, maxProfit will be 0.
			pq.add([end, profit + maxProfit]);
		}

		// Update the value of maxProfit by comparing with
		// profit of jobs that exist in the heap.
		while (!pq.isEmpty()) {
			maxProfit = Math.max(maxProfit, pq.poll()[1]);
		}

		return maxProfit;
	}

	jobScheduling(startTime, endTime, profit) {
		const jobs = [];

		// Storing job's details into one list.
		// This will help in sorting the jobs while maintaining the other parameters.
		for (let i = 0; i < profit.length; i++) {
			jobs.push([startTime[i], endTime[i], profit[i]]);
		}

		jobs.sort((a, b) => a[0] - b[0]);
		return this.findMaxProfit(jobs);
	}
}

module.exports = { Problem: MaximumProfitInJobScheduling };
