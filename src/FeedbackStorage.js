const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { vaultPath } = require('./vault');

/**
 * Manages persistent storage of term feedback/corrections
 * Uses term hash as unique identifier
 */
class FeedbackStorage {
	constructor(filename = 'term-feedback') {
		this.filename = filename;
		this.filepath = vaultPath(`.cache/${this.filename}.json`);
		this.data = {}; // { hash: { feedback: string, timestamp: string, history: [] } }
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
			console.error('Error loading feedback storage:', error.message);
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
			console.error('Error saving feedback storage:', error.message);
		}
	}

	/**
	 * Generate a unique hash for a term based on its content
	 * @param {Object} term - Term object with term, description, example, prompt
	 * @param {number} hashLength - Length of hash to generate (default: 8)
	 * @returns {string} - Hash string
	 */
	generateTermHash(term, hashLength = 8) {
		const content = [
			term.term || '',
			term.description || '',
			term.example || '',
			term.prompt || ''
		].join('|');
		const hash = crypto.createHash('sha256').update(content).digest('hex');
		return hash.substring(0, hashLength);
	}

	/**
	 * Get feedback for a term
	 * @param {string} hash - Term hash
	 * @returns {Object|null} - Feedback object or null if not found
	 */
	getFeedback(hash) {
		return this.data[hash] || null;
	}

	/**
	 * Get feedback by term object
	 * @param {Object} term - Term object
	 * @returns {Object|null} - Feedback object or null
	 */
	getFeedbackByTerm(term) {
		const hash = this.generateTermHash(term);
		return this.getFeedback(hash);
	}

	/**
	 * Add or update feedback for a term
	 * @param {string} hash - Term hash
	 * @param {string} feedback - Feedback text
	 * @returns {boolean} - Success status
	 */
	addFeedback(hash, feedback) {
		if (!feedback || !feedback.trim()) {
			return false;
		}

		const timestamp = new Date().toISOString();

		if (this.data[hash]) {
			// Keep history of previous feedback
			if (!this.data[hash].history) {
				this.data[hash].history = [];
			}

			// Add current feedback to history before replacing
			if (this.data[hash].feedback) {
				this.data[hash].history.push({
					feedback: this.data[hash].feedback,
					timestamp: this.data[hash].timestamp
				});
			}

			// Update current feedback
			this.data[hash].feedback = feedback.trim();
			this.data[hash].timestamp = timestamp;
		} else {
			// Create new feedback entry
			this.data[hash] = {
				feedback: feedback.trim(),
				timestamp: timestamp,
				history: []
			};
		}

		this.save();
		return true;
	}

	/**
	 * Add feedback by term object
	 * @param {Object} term - Term object
	 * @param {string} feedback - Feedback text
	 * @returns {boolean} - Success status
	 */
	addFeedbackByTerm(term, feedback) {
		const hash = this.generateTermHash(term);
		return this.addFeedback(hash, feedback);
	}

	/**
	 * Delete feedback for a term
	 * @param {string} hash - Term hash
	 * @returns {boolean} - Success status
	 */
	deleteFeedback(hash) {
		if (this.data[hash]) {
			delete this.data[hash];
			this.save();
			return true;
		}
		return false;
	}

	/**
	 * Get all feedback entries
	 * @returns {Object} - All feedback data
	 */
	getAllFeedback() {
		return { ...this.data };
	}

	/**
	 * Get count of terms with feedback
	 * @returns {number} - Count
	 */
	getCount() {
		return Object.keys(this.data).length;
	}

	/**
	 * Get the absolute path to the feedback JSON file
	 * @returns {string} - Absolute file path
	 */
	getFilePath() {
		return this.filepath;
	}

	/**
	 * Clear all feedback
	 */
	clear() {
		this.data = {};
		this.save();
	}
}

module.exports = { FeedbackStorage };
