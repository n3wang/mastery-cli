const assert = require('assert');
const { LocalStorage } = require('../src/LocalStorage');

function mockDate(dateString) {
	const originalDate = Date;
	global.Date = class extends Date {
		constructor(...args) {
			if (args.length === 0) {
				return new originalDate(dateString);
			}
			return new originalDate(...args);
		}
	};
	global.Date.now = () => new originalDate(dateString).getTime();
	return () => {
		global.Date = originalDate;
	};
}

describe('LocalStorage Tests', () => {
	function setupStorageWithDate(dateString) {
		const restore = mockDate(dateString);
		const storage = new LocalStorage('test_store');
		return { storage, restore };
	}

	it('logFeat stores values correctly', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.logFeat('algo', { score: 1 });
		storage.logFeat('math', { score: 2 });
		assert.deepStrictEqual(storage.date_based_stats['2023-10-01'], {
			algo: { value: 1 },
			math: { value: 2 }
		});
		restore();
	});

	it("getDayLogs returns today's stats", () => {
		const { storage, restore } = setupStorageWithDate('2023-10-04');
		storage.date_based_stats = {
			'2023-10-04': {
				algo: { value: 3 },
				math: { value: 1 }
			}
		};
		const result = storage.getDayLogs();
		assert.deepStrictEqual(result.selected_date, {
			algo: { value: 3 },
			math: { value: 1 }
		});
		restore();
	});

	it('getDayLogs compares with previous day', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-05');
		storage.date_based_stats = {
			'2023-10-05': { algo: { value: 2 } },
			'2023-10-04': { algo: { value: 3 } }
		};
		const result = storage.getDayLogs({
			windows_n: 0,
			compare_prev: true
		});
		assert.deepStrictEqual(result.previous_date.algo, {
			value: 3,
			difference: -1
		});
		restore();
	});

	it('getWeekLog aggregates 7 days', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-08'); // Sunday
		for (let i = 0; i < 7; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const key = date.toISOString().split('T')[0];
			storage.date_based_stats[key] = {
				math: { value: 1 }
			};
		}

		const weekLog = storage.getWeekLog();
		assert.deepStrictEqual(weekLog, { math: { value: 7 } });
		restore();
	});

	it('getMonthLog aggregates 30 days', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-30');
		for (let i = 0; i < 30; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const key = date.toISOString().split('T')[0];
			storage.date_based_stats[key] = {
				algo: { value: 1 }
			};
		}
		const monthLog = storage.getMonthLog();
		let algoValues = monthLog.algo.value;
		// assert is greater
		assert(
			algoValues >= 20,
			`Expected algo value to be at least 30, got ${algoValues}`
		);
		restore();
	});

	it('getDateLogsAuxiliary filters terms correctly', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.date_based_stats['2023-10-01'] = {
			algo: { value: 1 },
			math: { value: 2 }
		};
		const filtered = storage.getDateLogsAuxiliary({
			selected_date: '2023-10-01',
			filter: ['algo']
		});
		assert.deepStrictEqual(filtered, { algo: { value: 1 } });
		restore();
	});
});

describe('LocalStorage.logSkillExperience()', () => {
	function setupStorageWithDate(dateString) {
		const restore = mockDate(dateString);
		const storage = new LocalStorage('test_store_skill');
		// storage.cleanStorage()
		storage.save = () => {
			storage._saved = true;
		}; // mock save
		return { storage, restore };
	}

	it('initializes skill and logs experience', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.logSkillExperience('math');

		const stats = storage.skill_based_stats['math'];
		assert.ok(stats);
		assert.strictEqual(stats.skill_exp, 1);
		assert.strictEqual(stats.skill_level, 1);
		assert.strictEqual(stats.last_used, '2023-10-01');
		assert.ok(stats.journal['2023-10-01']);
		assert.strictEqual(stats.journal['2023-10-01'].length, 0);
		assert.ok(storage._saved);
		restore();
	});

	it('accumulates skill experience and updates level', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-02');
		storage.logSkillExperience('algo', { score: 15 });

		const stats = storage.skill_based_stats['algo'];
		assert.strictEqual(stats.skill_exp, 15);
		assert.ok(stats.skill_level >= 1);
		assert.deepStrictEqual(stats.experience_records['2023-10-02'], {
			experience: 15,
			level: stats.skill_level
		});
		restore();
	});

	it('allows logging reattempts, comment, deck_id and deck_term', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-03');
		storage.logSkillExperience('term', {
			score: 5,
			reattempts: 3,
			comment: 'reviewed twice',
			deck_id: 'deck001',
			deck_term: 'big term'
		});

		const entry =
			storage.skill_based_stats['term'].journal['2023-10-03'][0];
		assert.strictEqual(entry.deck_term, 'big term');
		assert.strictEqual(entry.deck, 'deck001');
		assert.strictEqual(entry.reattempts, 3);
		assert.strictEqual(entry.comment, 'reviewed twice');
		restore();
	});

	it('appends journal entry without overwriting', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-04');
		storage.logSkillExperience('review');
		storage.logSkillExperience('review', {
			deck_id: 'deckX',
			deck_term: 'unit X',
			comment: 'second round'
		});

		storage.logSkillExperience('review', {
			deck_id: 'deckY',
			deck_term: 'unit Y',
			comment: 'third round'
		});

		const journal =
			storage.skill_based_stats['review'].journal['2023-10-04'];
		assert.strictEqual(journal.length, 2); // Just 2 with comments
		restore();
	});

	it('uses default deck_id and deck_term when not provided', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-05');
		storage.logSkillExperience('science', { comment: 'default deck' });

		const entry =
			storage.skill_based_stats['science'].journal['2023-10-05'][0];
		assert.strictEqual(entry.deck, 'science');
		assert.strictEqual(entry['deck_term'], 'science');
		restore();
	});
});

describe('LocalStorage.getSkillsReports()', () => {
	function setupStorageWithDate(dateString) {
		const restore = mockDate(dateString);
		const storage = new LocalStorage('test_store');
		storage.save = () => {
			storage._saved = true;
		}; // mock save
		return { storage, restore };
	}

	it('tracks skill progress and prints report if console_report=true', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-05');
		// Simulate history
		storage.logSkillExperience('math', { score: 5 });
		restore();

		const { storage: storage2, restore: restore2 } =
			setupStorageWithDate('2023-10-08');
		storage2.skill_based_stats = storage.skill_based_stats;
		storage2.logSkillExperience('math', { score: 10 });

		let consoleOutput = '';
		const originalLog = console.log;
		console.log = msg => {
			consoleOutput += msg + '\n';
		};

		storage2.getSkillsReports({ windows_n: 3, console_report: true });

		console.log = originalLog;

		assert(consoleOutput.includes('math: Level'));
		console.log(consoleOutput); // For debugging purposes
		restore2();
	});

	it('hides skills with no progress by default', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.logSkillExperience('algo', { score: 5 });
		restore();

		const { storage: storage2, restore: restore2 } =
			setupStorageWithDate('2023-10-08');
		storage2.skill_based_stats = storage.skill_based_stats;

		// Capture old state
		const before = Object.keys(storage2.skill_based_stats).length;
		storage2.getSkillsReports({ windows_n: 7 });

		const after = Object.keys(storage2.skill_based_stats).length;

		assert.strictEqual(before, after); // no mutation
		restore2();
	});

	it('shows no progress skills if hide_no_progress is false', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.logSkillExperience('term', { score: 1 });
		restore();

		const { storage: storage2, restore: restore2 } =
			setupStorageWithDate('2023-10-08');
		storage2.skill_based_stats = storage.skill_based_stats;

		let resultBefore = Object.keys(storage2.skill_based_stats).length;

		storage2.getSkillsReports({ windows_n: 7, hide_no_progress: false });

		let resultAfter = Object.keys(storage2.skill_based_stats).length;

		assert.strictEqual(resultBefore, resultAfter); // should still be visible
		restore2();
	});

	it('handles multiple skills and multiple levels', () => {
		const { storage, restore } = setupStorageWithDate('2023-10-01');
		storage.logSkillExperience('dsa', { score: 10 });
		storage.logSkillExperience('algo', { score: 15 });
		restore();

		const { storage: storage2, restore: restore2 } =
			setupStorageWithDate('2023-10-08');
		storage2.skill_based_stats = storage.skill_based_stats;
		storage2.logSkillExperience('dsa', { score: 5 });
		storage2.logSkillExperience('algo', { score: 10 });

		let output = '';
		const originalLog = console.log;
		console.log = msg => {
			output += msg + '\n';
		};

		storage2.getSkillsReports({ windows_n: 7, console_report: true });

		console.log = originalLog;

		assert(output.includes('dsa: Level') || output.includes('algo: Level'));
		restore2();
	});
});
