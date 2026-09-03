const chalk = require('chalk');
const { LocalStorage } = require('./LocalStorage');

/**
 * MathStatsReporter - Display and analyze math session statistics
 * Shows:
 * - Total sessions by formula type
 * - Accuracy trends
 * - Time spent
 * - Best and worst performing formulas
 */
class MathStatsReporter {
	constructor() {
		this.localStorage = new LocalStorage('math_sessions');
	}

	/**
	 * Load stats from storage
	 */
	async loadStats() {
		await this.localStorage.load();
		return this.localStorage.date_based_stats;
	}

	/**
	 * Get stats for a specific session size (e.g., math_ses_10)
	 */
	async getSessionTypeStats(sessionSize = 10) {
		const stats = await this.loadStats();
		const sessionKey = `math_ses_${sessionSize}`;
		const typeStats = {
			total_sessions: 0,
			total_correct: 0,
			total_problems: 0,
			by_formula: {},
			by_date: {}
		};

		for (const [date, dailyStats] of Object.entries(stats)) {
			if (dailyStats[sessionKey]) {
				const sessionData = dailyStats[sessionKey];
				typeStats.total_correct += sessionData.value;
				typeStats.by_date[date] = sessionData;

				if (sessionData.sessions) {
					for (const session of sessionData.sessions) {
						typeStats.total_sessions++;
						typeStats.total_problems +=
							session.total_problems;

						if (!typeStats.by_formula[session.formula_name]) {
							typeStats.by_formula[session.formula_name] = {
								count: 0,
								correct: 0,
								accuracy_scores: []
							};
						}

						typeStats.by_formula[session.formula_name].count++;
						typeStats.by_formula[session.formula_name].correct +=
							session.correct;
						typeStats.by_formula[session.formula_name].accuracy_scores.push(
							session.accuracy
						);
					}
				}
			}
		}

		return typeStats;
	}

	/**
	 * Display overall stats across all session types
	 */
	async displayAllStats() {
		const stats = await this.loadStats();

		console.log('\n' + '='.repeat(70));
		console.log(chalk.bold.cyan('MATH SESSION STATISTICS'));
		console.log('='.repeat(70));

		// Find all session types
		const sessionTypes = new Set();
		for (const dailyStats of Object.values(stats)) {
			for (const key of Object.keys(dailyStats)) {
				if (key.startsWith('math_ses_')) {
					sessionTypes.add(key);
				}
			}
		}

		if (sessionTypes.size === 0) {
			console.log(chalk.yellow('\nNo math sessions recorded yet.'));
			return;
		}

		// Display stats for each session type
		for (const sessionKey of Array.from(sessionTypes).sort()) {
			const sessionSize = sessionKey.replace('math_ses_', '');
			await this.displaySessionTypeStats(parseInt(sessionSize));
		}

		console.log('='.repeat(70) + '\n');
	}

	/**
	 * Display stats for a specific session type
	 */
	async displaySessionTypeStats(sessionSize = 10) {
		const stats = await this.getSessionTypeStats(sessionSize);

		if (stats.total_sessions === 0) {
			return;
		}

		console.log(
			`\n${chalk.bold.cyan(`Session Type: ${sessionSize} problems`)}`
		);
		console.log('-'.repeat(70));

		console.log(`Total Sessions: ${chalk.bold(stats.total_sessions)}`);
		console.log(
			`Total Correct: ${chalk.bold(stats.total_correct)} / ${stats.total_problems}`
		);

		if (stats.total_problems > 0) {
			const overallAccuracy = Math.round(
				(stats.total_correct / stats.total_problems) * 100
			);
			const accuracyColor = overallAccuracy >= 70 ?
				'green' :
				overallAccuracy >= 50 ?
					'yellow' :
					'red';
			console.log(
				`Overall Accuracy: ${chalk[accuracyColor](
					overallAccuracy + '%'
				)}`
			);
		}

		// Display by formula
		if (Object.keys(stats.by_formula).length > 0) {
			console.log(`\n${chalk.cyan('Performance by Formula Type:')}`);
			for (const [formula, data] of Object.entries(
				stats.by_formula
			).sort((a, b) => b[1].count - a[1].count)) {
				const accuracy = Math.round(
					(data.correct / (data.count * sessionSize)) * 100
				);
				const accuracyColor = accuracy >= 70 ?
					'green' :
					accuracy >= 50 ?
						'yellow' :
						'red';

				console.log(
					`  ${formula.padEnd(25)} - ${data.count} session(s), ` +
					`${chalk[accuracyColor](accuracy + '%')} accuracy ` +
					`(${data.correct}/${data.count * sessionSize})`
				);
			}
		}

		// Display by date
		if (Object.keys(stats.by_date).length > 0) {
			console.log(`\n${chalk.cyan('Recent Sessions:')}`);
			const recentDates = Object.keys(stats.by_date)
				.sort()
				.reverse()
				.slice(0, 5);

			for (const date of recentDates) {
				const sessionData = stats.by_date[date];
				if (sessionData.sessions) {
					console.log(`  ${date}:`);
					for (const session of sessionData.sessions) {
						console.log(
							`    - ${session.formula_name}: ${session.correct}/${session.total_problems} (${session.accuracy}%)`
						);
					}
				}
			}
		}
	}

	/**
	 * Get top performing formulas
	 */
	async getTopFormulas(limit = 5) {
		const stats = await this.loadStats();
		const formulaStats = {};

		for (const dailyStats of Object.values(stats)) {
			for (const sessionKey of Object.keys(dailyStats)) {
				if (sessionKey.startsWith('math_ses_')) {
					const sessionData = dailyStats[sessionKey];
					if (sessionData.sessions) {
						for (const session of sessionData.sessions) {
							if (
								!formulaStats[session.formula_name]
							) {
								formulaStats[
									session.formula_name
								] = {
									count: 0,
									correct: 0,
									total: 0
								};
							}
							formulaStats[session.formula_name].count++;
							formulaStats[session.formula_name].correct +=
								session.correct;
							formulaStats[session.formula_name].total +=
								session.total_problems;
						}
					}
				}
			}
		}

		const sorted = Object.entries(formulaStats)
			.map(([name, data]) => ({
				name,
				accuracy: Math.round(
					(data.correct / data.total) * 100
				),
				sessions: data.count,
				correct: data.correct,
				total: data.total
			}))
			.sort((a, b) => b.accuracy - a.accuracy)
			.slice(0, limit);

		return sorted;
	}

	/**
	 * Display a summary report
	 */
	async displaySummary() {
		const stats = await this.loadStats();

		// Count total sessions across all types
		let totalSessions = 0;
		let totalCorrect = 0;

		for (const dailyStats of Object.values(stats)) {
			for (const sessionData of Object.values(dailyStats)) {
				if (sessionData.sessions) {
					for (const session of sessionData.sessions) {
						totalSessions++;
						totalCorrect += session.correct;
					}
				}
			}
		}

		console.log('\n' + '='.repeat(70));
		console.log(chalk.bold.cyan('MATH SESSIONS SUMMARY'));
		console.log('='.repeat(70));
		console.log(
			`Total Sessions: ${chalk.bold(totalSessions)}`
		);
		console.log(`Total Problems Solved: ${chalk.bold(totalCorrect)}`);

		const topFormulas = await this.getTopFormulas();
		if (topFormulas.length > 0) {
			console.log(`\n${chalk.cyan('Top Performing Formulas:')}`);
			topFormulas.forEach((formula, index) => {
				console.log(
					`  ${index + 1}. ${formula.name} - ${chalk.green(
						formula.accuracy + '%'
					)} accuracy (${formula.sessions} sessions)`
				);
			});
		}

		console.log('='.repeat(70) + '\n');
	}
}

module.exports = { MathStatsReporter };
