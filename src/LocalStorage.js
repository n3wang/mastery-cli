const { vaultPath } = require('./vault');
/**
 * Used for storing user data in a local storage.
 */

class LocalStorage {
	constructor(name = 'local_storage', base_dir = '.cache/queues/') {
		/**
		 * Structure of date based stats:
		 *
		 * {
		 *   "2023-10-01": { algo: {value: 1}, math: {value: 2} },
		 *   "2023-10-04": { algo: {value: 3}, math: {value: 1} },
		 * }
		 */

		this.name = name;
		this.absolute_uri = vaultPath(`${base_dir}${this.name}.json`);
		this.date_based_stats = {};
		/**
		 * [date]: {
		 *   [feature]: { value: 0 },
		 *  }
		 */

		this.skill_based_stats = {};
		/** tracks the skill data.
		 * [skillname]: {
		 *   skill_level: 1,
		 *   skill_exp: 0,
		 *   last_deck_used: 'deck_id',
		 *   last_used: '2023-10-01
		 *   journal: {
		 *      2023-10-01: [
		 *       {'deck_term': 'math-simple-saple', 'deck': 'mmathdeck', reattempts: 2, comment: ''},
		 *       {'deck_term': 'math-simple-saple-1', 'deck': 'mmathdeck', reattempts: 0, comment: ''},
		 *       {'deck_term': 'math-simple-saple-2', 'deck': 'mmathdeck', reattempts: 1, comment: ''},
		 *     ]},
		 *   experience_records: {
		 *    2023-10-01: {experience: 32, level: 3},
		 *     2023-09-28: {experience: 20, level: 2},
		 *     2023-09-25: {experience: 10, level: 1},
		 *    }
		 * }
		 *  */

		this.experience_to_levelup_after_level = {
			0: 2, //after level 0, you need 2 exp to level up
			5: 5, //after level 5, you need 10 exp to level up
			10: 7, //after level 10, you need 20 exp to level up
			15: 10 //after level 15, you need 30 exp to level up
		};
	}

	async load() {
		try {
			const { JsonDB, Config } = require('./local-modules/json-db');
			const db = new JsonDB(
				new Config(this.absolute_uri, true, false, '/')
			);
			this.date_based_stats = await db.getData('/date_based_stats');
			this.skill_based_stats = await db.getData('/skills_stats');
			return true;
		} catch {
			return false;
		}
	}

	async save() {
		const { JsonDB, Config } = require('./local-modules/json-db');
		const db = new JsonDB(new Config(this.absolute_uri, true, false, '/'));
		db.push('/date_based_stats', this.date_based_stats);
		db.push('/skills_stats', this.skill_based_stats);
	}

	cleanStorage() {
		this.date_based_stats = {};
		this.skill_based_stats = {};
	}

	logFeat(feature, { score = 1 } = {}) {
		const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
		if (!this.date_based_stats[date]) {
			this.date_based_stats[date] = {};
		}
		if (!this.date_based_stats[date][feature]) {
			this.date_based_stats[date][feature] = { value: 0 };
		}
		this.date_based_stats[date][feature].value += score;
		this.save();
	}

	calculateLevelBasedOnExperience(
		experience,
		{
			previous_level = 0,
			celebrate_new_level = true,
			skill_level = ''
		} = {}
	) {
		/**
		 * Calculates the level based on the experience.
		 * The experience to level up is defined in the this.experience_to_levelup_after_level object.
		 *
		 * @param {number} experience - The experience to calculate the level for.
		 * @returns {number} - The level based on the experience.
		 */
		let current_level = 1;
		let remaining_experience = experience;
		while (remaining_experience > 0) {
			let experience_needed = 0;

			// find the experience needed for the current level
			for (const level in this.experience_to_levelup_after_level) {
				if (level <= current_level) {
					experience_needed =
						this.experience_to_levelup_after_level[level];
				}
			}

			if (remaining_experience >= experience_needed) {
				remaining_experience -= experience_needed;
				current_level++;
			} else {
				remaining_experience = 0;
			}
		}

		if (celebrate_new_level) {
			if (current_level > previous_level) {
				console.log(
					`\n🎉 ${skill_level} leveled up from ${previous_level} -> ${current_level} 🎉\n`
				);
			}
		}

		return current_level;
	}

	logSkillExperience(
		skill_name,
		{
			score = 1,
			deck_id = '',
			deck_term = '',
			comment = '',
			reattempts = 0
		} = {}
	) {
		if (deck_term == '') {
			deck_term = skill_name;
		}
		if (deck_id == '') {
			deck_id = skill_name;
		}

		const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
		if (!this.skill_based_stats[skill_name]) {
			this.skill_based_stats[skill_name] = {
				skill_level: 1,
				skill_exp: 0,
				last_deck_used: deck_id,
				last_used: date,
				journal: {}
			};
		}
		if (!this.skill_based_stats[skill_name].journal[date]) {
			this.skill_based_stats[skill_name].journal[date] = [];
		}

		this.skill_based_stats[skill_name].skill_exp += score;
		this.skill_based_stats[skill_name].last_used = date;
		if (comment != null && comment != undefined && comment != '') {
			this.skill_based_stats[skill_name].journal[date].push({
				deck_term: deck_term,
				deck: deck_id,
				reattempts: reattempts,
				comment: comment
			});
		}

		const previousLevel = this.skill_based_stats[skill_name].skill_level;

		//  // Check if the skill level needs to be updated
		this.skill_based_stats[skill_name].skill_level =
			this.calculateLevelBasedOnExperience(
				this.skill_based_stats[skill_name].skill_exp,
				{
					previous_level: previousLevel,
					celebrate_new_level: true,
					skill_level: skill_name
				}
			);
		// store current experience and level in the experience_records
		if (!this.skill_based_stats[skill_name].experience_records) {
			this.skill_based_stats[skill_name].experience_records = {};
		}
		this.skill_based_stats[skill_name].experience_records[date] = {
			experience: this.skill_based_stats[skill_name].skill_exp,
			level: this.skill_based_stats[skill_name].skill_level
		};

		this.save();
	}

	getSkillsReports({
		windows_n = 7,
		filter = [],
		compare_prev = true,
		console_report = true,
		hide_no_progress = true
	} = {}) {
		/** Gets current skill experience as a  dict conntaining the difference in progress
		 *  between now and before the windows n started.
		 *  Genertes the table report on its own. by default hides the skills that had no progress.
		 * */

		const today = new Date();
		const selected_date = new Date(today);
		let windows_end_date = undefined;

		const lastLevel = {};
		/**
		 * has to be in the range of now till now - windows_n days
		 * {
		 *     skill_name: {level: 1, exp: 20, date: '2023-10-01'},
		 *    }
		 */
		// sort by date keys, get the largest. if the largest is larger than the windows_n days, then dont add it
		for (const skill in this.skill_based_stats) {
			if (filter.length > 0 && !filter.includes(skill)) {
				continue; // skip skills that are not in the filter
			}
			const experience_records =
				this.skill_based_stats[skill].experience_records;
			if (!experience_records) {
				continue; // skip skills that have no experience records
			}
			// get the last level and exp for the skill
			const dates = Object.keys(experience_records);
			dates.sort((a, b) => new Date(b) - new Date(a)); // sort by date descending
			const lastDate = dates[0];
			if (lastDate) {
				const lastRecord = experience_records[lastDate];
				if (lastRecord) {
					lastLevel[skill] = {
						level: lastRecord.level,
						exp: lastRecord.experience,
						date: lastDate
					};
				}
			}
		}

		// for each last level skill search the comparison
		const beforeWindowsLevel = {};
		for (const skill in lastLevel) {
			if (!beforeWindowsLevel[skill]) {
				beforeWindowsLevel[skill] = { level: 0, exp: 0, date: '' };
			}
			// get the level before the windows started
			const beforeDate = new Date(lastLevel[skill].date);
			beforeDate.setDate(beforeDate.getDate() - windows_n);
			const beforeDateString = beforeDate.toISOString().split('T')[0];
			if (
				this.skill_based_stats[skill].experience_records[
					beforeDateString
				]
			) {
				beforeWindowsLevel[skill].level =
					this.skill_based_stats[skill].experience_records[
						beforeDateString
					].level;
				beforeWindowsLevel[skill].exp =
					this.skill_based_stats[skill].experience_records[
						beforeDateString
					].experience;
				beforeWindowsLevel[skill].date = beforeDateString;
			}
		}

		// create report in this format
		/**
		 * skillname: level progress 1 -> 2, exp progress 10 -> 20
		 */
		if (console_report) {
			for (const skill in lastLevel) {
				if (!beforeWindowsLevel[skill]) {
					beforeWindowsLevel[skill] = { level: 0, exp: 0, date: '' };
				}
				const currentLevel = lastLevel[skill].level;
				const currentExp = lastLevel[skill].exp;
				const previousLevel = beforeWindowsLevel[skill].level;
				const previousExp = beforeWindowsLevel[skill].exp;
				// console.log("Current Level", currentLevel, "Current Exp", currentExp, "Previous Level", previousLevel, "Previous Exp", previousExp);
				// console.log("Skill", skill, "Last Level", lastLevel[skill], "Before Windows Level", beforeWindowsLevel[skill]);
				if (
					currentLevel > previousLevel ||
					currentExp > previousExp ||
					!hide_no_progress
				) {
					if (console_report) {
						console.log(
							`${skill}: Level ${previousLevel} -> ${currentLevel}, Exp ${previousExp} -> ${currentExp}`
						);
					}
				} else if (hide_no_progress) {
					delete lastLevel[skill]; // remove skills with no progress
				}
			}
		}
	}

	getDayLogs({ windows_n = 0, filter = [], compare_prev = false } = {}) {
		/**
		 * Returns as sum of each stat by their agregate score:
		 * {
		 *      algo: {value: 1},
		 *     math: {value: 2},
		 *  If the windows is 0, then it will return the current day scores
		 *  If the windows is 1, then it will return the scores from yesterday
		 *
		 * The difference is calculated as how much better you did. Therefore a positive difference represents an improvement.
		 * Returns te following:
		 * {
		 *     'selected_date': {
		 *        'algo': {value: 1},
		 *       'math': {value: 2},
		 *    },
		 *    'previous_date': {
		 *       'algo': {value: 3, difference: -2},
		 *       'math': {value: 1, difference: 1},
		 *  }
		 * }
		 */
		const today = new Date().toISOString().split('T')[0];
		// selected date as today - windows_n days
		const selected_date = new Date();
		selected_date.setDate(selected_date.getDate() - windows_n);
		const selectedDateString = selected_date.toISOString().split('T')[0];
		const selected_scores = this.getDateLogsAuxiliary({
			selected_date: selectedDateString,
			filter
		});

		const returnValues = {
			selected_date: selected_scores,
			previous_date: {}
		};

		if (compare_prev) {
			const previous_date = new Date();
			previous_date.setDate(previous_date.getDate() - (windows_n + 1));
			const previousDateString = previous_date
				.toISOString()
				.split('T')[0];
			const previous_scores = this.getDateLogsAuxiliary({
				selected_date: previousDateString,
				filter
			});

			// Calculate the difference
			for (const term in previous_scores) {
				if (selected_scores[term]) {
					previous_scores[term].difference =
						selected_scores[term].value -
						previous_scores[term].value;
				} else {
					previous_scores[term].difference =
						-previous_scores[term].value; // If the term was not present in the selected date, it is a negative difference
				}
			}

			returnValues['previous_date'] = previous_scores;
		}

		return returnValues;
	}

	getDateLogsAuxiliary({ selected_date, filter = [] } = {}) {
		const scores = this.date_based_stats[selected_date] || {};

		if (filter.length === 0) {
			return scores; // Return all scores if no filter is applied
		}

		const filteredScores = {};
		for (const term in scores) {
			if (filter.length === 0 || filter.includes(term)) {
				filteredScores[term] = { ...scores[term] };
			}
		}

		return filteredScores;
	}

	getWeekLogs({ windows_n = 0, filter = [], compare_prev = false } = {}) {
		/**
		 * Returns as sum of each stat by their agregate score:
		 * {
		 *      algo: {value: 1},
		 *     math: {value: 2},
		 * }
		 */
		const today = new Date();
		const weekStart = new Date(
			today.setDate(today.getDate() - today.getDay())
		);
		const weekStartString = weekStart.toISOString().split('T')[0];
		const weekEnd = new Date(
			today.setDate(today.getDate() - today.getDay() + 6)
		);
		const weekEndString = weekEnd.toISOString().split('T')[0];

		const weekScores = {};
		for (const date in this.date_based_stats) {
			if (date >= weekStartString && date <= weekEndString) {
				for (const term in this.date_based_stats[date]) {
					if (!weekScores[term]) {
						weekScores[term] = { value: 0 };
					}
					weekScores[term].value +=
						this.date_based_stats[date][term].value;
				}
			}
		}
	}
	getAggregateLogsAuxiliary({
		selected_date,
		filter = [],
		compare_prev = false,
		agg_windows = 7
	} = {}) {
		const aggregatedScores = {};
		let selectedDate = new Date(selected_date);

		for (let i = 0; i < agg_windows; i++) {
			const currentDate = new Date(selectedDate);
			currentDate.setDate(currentDate.getDate() + i);
			const dateString = currentDate.toISOString().split('T')[0];

			if (this.date_based_stats[dateString]) {
				for (const term in this.date_based_stats[dateString]) {
					if (filter.length === 0 || filter.includes(term)) {
						if (!aggregatedScores[term]) {
							aggregatedScores[term] = { value: 0 };
						}
						aggregatedScores[term].value +=
							this.date_based_stats[dateString][term].value;
					}
				}
			}
		}

		return aggregatedScores;
	}

	getWeekLog(n = 0, filter = [], compare_prev = false) {
		const today = new Date();
		const weekStart = new Date(today);
		weekStart.setDate(weekStart.getDate() - weekStart.getDay() - n * 7); // Adjust for the week offset

		const weekScores = this.getAggregateLogsAuxiliary({
			selected_date: weekStart.toISOString().split('T')[0],
			filter: filter,
			compare_prev: compare_prev,
			agg_windows: 7 // Default to 7 days for a week
		});

		return weekScores;
	}

	getMonthLog(n = 0, filter = [], compare_prev = false) {
		const selected_date = new Date();
		const monthStart = new Date(selected_date);
		monthStart.setDate(
			monthStart.getDate() - (monthStart.getDate() - 1) - n * 30 // Adjust for the month offset
		);

		const monthScores = this.getAggregateLogsAuxiliary({
			selected_date: monthStart.toISOString().split('T')[0],
			filter: filter,
			compare_prev: compare_prev,
			agg_windows: 30
		});

		return monthScores;
	}
	/**
	 * Returns the first n characters of the given string.
	 * @param {string} str The string to truncate.
	 * @param {number} n The number of characters to return.
	 * @returns {string} The first n characters of the string, or the entire string if n is greater than the string length.
	 */
	truncateString(str, n) {
		if (n >= str.length) {
			return str;
		}
		return str.substring(0, n);
	}

	getEntries({ head = 5, skill_name = '', deck_term = '' } = {}) {
		/**
		 * Fetch from skill based stats on that specific skill
		 */

		if (skill_name == '' && deck_term == '') {
			return [];
		}

		const entries = [];
		if (deck_term != '' && skill_name != '') {
			/**
			 * Search for the skill name and deck term in the journal
			 */
			if (
				this.skill_based_stats[skill_name] &&
				this.skill_based_stats[skill_name].journal
			) {
				const journal = this.skill_based_stats[skill_name].journal;
				const dates = Object.keys(journal).sort(); // Get sorted dates
				for (let i = dates.length - 1; i >= 0; i--) {
					// Iterate in reverse order
					const date = dates[i];
					if (entries.length >= head) {
						break; // Limit to the specified head count
					}
					const logs = journal[date].filter(
						log => log.deck_term === deck_term
					);
					for (
						let j = 0;
						j < logs.length && entries.length < head;
						j++
					) {
						if (entries.length >= head) {
							break; // Limit to the specified head count
						}
						entries.push({
							date,
							log: this.truncateString(logs[j].comment, 40)
						});
					}
				}
			}

			return entries;
		}

		if (skill_name != '' && deck_term == '') {
			if (
				this.skill_based_stats[skill_name] &&
				this.skill_based_stats[skill_name].journal
			) {
				// loop for each entire on each date until head is reached
				// console.log("Skill based stats journal", this.skill_based_stats[skill_name]);
				const dates = Object.keys(
					this.skill_based_stats[skill_name].journal
				).sort();
				for (let i = dates.length - 1; i >= 0; i--) {
					const date = dates[i];
					if (entries.length >= head) {
						break; // Limit to the specified head count
					}
					const logs =
						this.skill_based_stats[skill_name].journal[date];
					for (
						let j = 0;
						j < logs.length && entries.length <= head;
						j++
					) {
						if (entries.length >= head) {
							break; // Limit to the specified head count
						}
						entries.push({
							date,
							log: logs[j].comment,
							deck_term: this.truncateString(
								logs[j].deck_term,
								20
							)
						});
					}
				}
			} else {
				return [];
			}
			return entries;
		}
	}
}

module.exports = { LocalStorage };
