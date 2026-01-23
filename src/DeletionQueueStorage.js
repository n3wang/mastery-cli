const fs = require('fs');
const path = require('path');
const { getDirAbsoluteUri } = require('./utils_functions');

/**
 * Manages persistent storage of terms to ignore during study sessions
 * This is a simple ignore list - terms matching term name and folder path are filtered out
 * The JSON file persists all ignored terms regardless of which deck they appear in
 */
class DeletionQueueStorage {
	constructor(filename = 'deletion_queue') {
		this.filename = filename;
		this.filepath = getDirAbsoluteUri(`user_data/temp/${this.filename}.json`);
		this.data = []; // Array of { termName, folderPath, category, timestamp, hasFeedback }
		this.load();
	}

	load() {
		try {
			if (fs.existsSync(this.filepath)) {
				const fileContent = fs.readFileSync(this.filepath, 'utf-8');
				this.data = JSON.parse(fileContent);
				// Ensure it's an array
				if (!Array.isArray(this.data)) {
					this.data = [];
				}
			} else {
				this.data = [];
			}
		} catch (error) {
			console.error('Error loading deletion queue storage:', error.message);
			this.data = [];
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
			console.error('Error saving deletion queue storage:', error.message);
		}
	}

	/**
	 * Get the absolute path to the deletion queue JSON file
	 * @returns {string} - Absolute file path
	 */
	getFilePath() {
		return this.filepath;
	}

	/**
	 * Check if a term should be ignored (matches term name and folder path)
	 * @param {Object} term - Term object with term and reference_page properties
	 * @returns {boolean} - True if term should be ignored
	 */
	isInQueue(term) {
		if (!term) return false;

		const termName = term.term || '';
		const folderPath = term.reference_page || '';

		// Match by term name and folder path
		return this.data.some(item => 
			item.termName === termName && 
			item.folderPath === folderPath
		);
	}

	/**
	 * Add a term to the ignore list
	 * @param {Object} term - Term object
	 * @param {Object} feedbackStorage - FeedbackStorage instance to check for feedback
	 * @returns {boolean} - Success status (false if already in queue)
	 */
	addToQueue(term, feedbackStorage = null) {
		if (!term) return false;

		const termName = term.term || '';
		const folderPath = term.reference_page || '';

		// Check if already in queue
		if (this.isInQueue(term)) {
			return false;
		}

		// Check if term has feedback
		let hasFeedback = false;
		if (feedbackStorage) {
			const feedback = feedbackStorage.getFeedbackByTerm(term);
			hasFeedback = feedback !== null && feedback.feedback && feedback.feedback.trim() !== '';
		}

		const queueItem = {
			termName: termName,
			folderPath: folderPath,
			category: term.category || '',
			timestamp: new Date().toISOString(),
			hasFeedback: hasFeedback
		};

		this.data.push(queueItem);
		this.save();
		return true;
	}

	/**
	 * Get all items in the deletion queue
	 * @returns {Array} - Array of queue items
	 */
	getQueue() {
		return [...this.data];
	}

	/**
	 * Get count of items in queue
	 * @returns {number} - Count
	 */
	getCount() {
		return this.data.length;
	}

	/**
	 * Get items with feedback
	 * @returns {Array} - Array of queue items that have feedback
	 */
	getItemsWithFeedback() {
		return this.data.filter(item => item.hasFeedback);
	}

	/**
	 * Get items grouped by folder path
	 * @returns {Object} - Object with folder paths as keys and arrays of items as values
	 */
	getItemsByFilePath() {
		const grouped = {};
		for (const item of this.data) {
			const filePath = item.folderPath || 'unknown';
			if (!grouped[filePath]) {
				grouped[filePath] = [];
			}
			grouped[filePath].push(item);
		}
		return grouped;
	}
}

module.exports = { DeletionQueueStorage };
