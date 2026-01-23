const fs = require('fs');
const path = require('path');
const { getDirAbsoluteUri } = require('./utils_functions');

/**
 * Manages storage of review decks for spaced repetition
 * Tracks cards learned each day for later review sessions
 *
 * Structure: {
 *   "2024-01-23": { revised: false, decks: [{term, category, ...}, ...] },
 *   "2024-01-22": { revised: false, decks: [{term, category, ...}, ...] }
 * }
 */
class ReviewDecksStorage {
	constructor(filename = 'review_decks') {
		this.filename = filename;
		this.filepath = getDirAbsoluteUri(`user_data/${this.filename}.json`);
		this.data = {};
		this.maxDates = 5; // Store up to 5 different dates
		this.load();
	}

	load() {
		try {
			if (fs.existsSync(this.filepath)) {
				const fileContent = fs.readFileSync(this.filepath, 'utf-8');
				this.data = JSON.parse(fileContent);
			} else {
				this.data = {};
			}
		} catch (error) {
			console.error('Error loading review decks storage:', error.message);
			this.data = {};
		}
	}

	save() {
		try {
			const dir = path.dirname(this.filepath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.writeFileSync(this.filepath, JSON.stringify(this.data, null, 2), 'utf-8');
		} catch (error) {
			console.error('Error saving review decks storage:', error.message);
		}
	}

	/**
	 * Get today's date in YYYY-MM-DD format
	 * @returns {string} - Date string
	 */
	getTodayDate() {
		return new Date().toISOString().split('T')[0];
	}

	/**
	 * Enforce the maximum dates limit by removing oldest entries
	 */
	enforceMaxDates() {
		const dates = Object.keys(this.data).sort();
		while (dates.length > this.maxDates) {
			const oldestDate = dates.shift();
			delete this.data[oldestDate];
		}
	}

	/**
	 * Add a learned card to today's review deck
	 * @param {Object} term - The term object that was learned
	 * @returns {boolean} - Success status
	 */
	addLearnedCard(term) {
		if (!term) return false;

		const today = this.getTodayDate();

		// Initialize today's entry if it doesn't exist
		if (!this.data[today]) {
			this.data[today] = {
				revised: false,
				decks: []
			};
		}

		// Create a minimal card record (avoid duplicates by checking term+category)
		const cardExists = this.data[today].decks.some(
			card => card.term === term.term && card.category === term.category
		);

		if (!cardExists) {
			this.data[today].decks.push({
				term: term.term,
				category: term.category,
				description: term.description,
				example: term.example || '',
				prompt: term.prompt || ''
			});
		}

		// Enforce max dates limit
		this.enforceMaxDates();

		this.save();
		return true;
	}

	/**
	 * Get review deck for a specific date
	 * @param {string} date - Date string (YYYY-MM-DD)
	 * @returns {Object|null} - Review deck or null
	 */
	getReviewDeck(date) {
		return this.data[date] || null;
	}

	/**
	 * Get today's review deck
	 * @returns {Object|null} - Today's review deck or null
	 */
	getTodayDeck() {
		return this.getReviewDeck(this.getTodayDate());
	}

	/**
	 * Get the most recent session's deck (last session before today, or yesterday's)
	 * @returns {Object|null} - Last session deck with date, or null
	 */
	getLastSessionDeck() {
		const today = this.getTodayDate();
		const dates = Object.keys(this.data)
			.filter(date => date !== today)
			.sort()
			.reverse();

		if (dates.length === 0) return null;

		const lastDate = dates[0];
		return {
			date: lastDate,
			...this.data[lastDate]
		};
	}

	/**
	 * Get available review decks (today and last session)
	 * @returns {Array} - Array of available review deck info
	 */
	getAvailableReviewDecks() {
		const available = [];
		const today = this.getTodayDate();

		// Today's deck
		if (this.data[today] && this.data[today].decks.length > 0) {
			available.push({
				label: `Today's Review (${this.data[today].decks.length} cards)`,
				date: today,
				type: 'today',
				revised: this.data[today].revised,
				cards: this.data[today].decks
			});
		}

		// Last session deck
		const lastSession = this.getLastSessionDeck();
		if (lastSession && lastSession.decks.length > 0) {
			available.push({
				label: `Last Session Review - ${lastSession.date} (${lastSession.decks.length} cards)`,
				date: lastSession.date,
				type: 'last_session',
				revised: lastSession.revised,
				cards: lastSession.decks
			});
		}

		return available;
	}

	/**
	 * Mark a date's deck as revised
	 * @param {string} date - Date string (YYYY-MM-DD)
	 */
	markAsRevised(date) {
		if (this.data[date]) {
			this.data[date].revised = true;
			this.save();
		}
	}

	/**
	 * Get all dates with review decks
	 * @returns {Array} - Array of date strings
	 */
	getAllDates() {
		return Object.keys(this.data).sort().reverse();
	}

	/**
	 * Get count of cards learned today
	 * @returns {number} - Count
	 */
	getTodayCount() {
		const today = this.getTodayDate();
		return this.data[today]?.decks?.length || 0;
	}

	/**
	 * Clear all review decks
	 */
	clear() {
		this.data = {};
		this.save();
	}
}

module.exports = { ReviewDecksStorage };
