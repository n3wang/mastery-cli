class SolvingQuestionsWithBrainPower {
	constructor() {
		this.dp = [];
	}

	dfs(questions, i) {
		if (i >= questions.length) {
			return 0;
		}
		if (this.dp[i] !== undefined) {
			return this.dp[i];
		}

		const points = questions[i][0];
		const skip = questions[i][1];

		// dp[i] = max(skip it, solve it)
		this.dp[i] = Math.max(
			points + this.dfs(questions, i + skip + 1),
			this.dfs(questions, i + 1)
		);
		return this.dp[i];
	}

	mostPoints(questions) {
		const n = questions.length;
		this.dp = new Array(n);

		return this.dfs(questions, 0);
	}
}

module.exports = { Problem: SolvingQuestionsWithBrainPower };
