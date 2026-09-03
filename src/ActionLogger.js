const fs = require('fs');
const path = require('path');
const { vaultPath } = require('./vault');

/**
 * Manages logging of user actions and usage statistics
 * Logs removals, completions, feedback, and other study session events
 */
class ActionLogger {
	constructor(filename = 'actions.log', enabled = true) {
		this.filename = filename;
		this.filepath = vaultPath(`stats/${this.filename}`);
		this.enabled = enabled;
		this.ensureDirectory();
	}

	ensureDirectory() {
		try {
			const dir = path.dirname(this.filepath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
		} catch (error) {
			console.error('Error ensuring log directory:', error.message);
		}
	}

	/**
	 * Get current timestamp in ISO format
	 * @returns {string} - Timestamp string
	 */
	getTimestamp() {
		return new Date().toISOString();
	}

	/**
	 * Log an action to the log file
	 * @param {string} action - Action type (e.g., 'removal', 'completion', 'feedback')
	 * @param {Object} data - Additional data to log
	 * @returns {boolean} - Success status
	 */
	log(action, data = {}) {
		if (!this.enabled) {
			return false;
		}

		try {
			const timestamp = this.getTimestamp();
			const logEntry = {
				timestamp: timestamp,
				action: action,
				...data
			};

			const logLine = JSON.stringify(logEntry) + '\n';
			fs.appendFileSync(this.filepath, logLine, 'utf-8');
			return true;
		} catch (error) {
			console.error('Error writing to log file:', error.message);
			return false;
		}
	}

	/**
	 * Log term removal
	 * @param {Object} term - Term object
	 * @param {string} method - Removal method ('deletion_queue', 'force_remove', 'cleanup')
	 * @returns {boolean} - Success status
	 */
	logRemoval(term, method = 'unknown') {
		return this.log('removal', {
			term: term.term || '',
			category: term.category || '',
			filePath: term.reference_page || '',
			method: method
		});
	}

	/**
	 * Log deck completion
	 * @param {string} deckName - Deck name
	 * @param {number} totalTerms - Total terms in deck
	 * @param {number} completedTerms - Number of completed terms
	 * @returns {boolean} - Success status
	 */
	logDeckCompletion(deckName, totalTerms, completedTerms) {
		return this.log('deck_completion', {
			deckName: deckName,
			totalTerms: totalTerms,
			completedTerms: completedTerms
		});
	}

	/**
	 * Log feedback provided
	 * @param {Object} term - Term object
	 * @param {string} feedback - Feedback text
	 * @returns {boolean} - Success status
	 */
	logFeedback(term, feedback) {
		return this.log('feedback', {
			term: term.term || '',
			category: term.category || '',
			filePath: term.reference_page || '',
			feedbackLength: feedback ? feedback.length : 0
		});
	}

	/**
	 * Log study session start
	 * @param {string} deckName - Deck name
	 * @param {number} termCount - Number of terms in session
	 * @returns {boolean} - Success status
	 */
	logSessionStart(deckName, termCount) {
		return this.log('session_start', {
			deckName: deckName,
			termCount: termCount
		});
	}

	/**
	 * Log study session end
	 * @param {string} deckName - Deck name
	 * @param {number} completedCount - Number of terms completed
	 * @param {number} totalCount - Total terms in session
	 * @returns {boolean} - Success status
	 */
	logSessionEnd(deckName, completedCount, totalCount) {
		return this.log('session_end', {
			deckName: deckName,
			completedCount: completedCount,
			totalCount: totalCount
		});
	}

	/**
	 * Log term added to deletion queue
	 * @param {Object} term - Term object
	 * @returns {boolean} - Success status
	 */
	logDeletionQueueAdd(term) {
		return this.log('deletion_queue_add', {
			term: term.term || '',
			category: term.category || '',
			filePath: term.reference_page || ''
		});
	}

	/**
	 * Get usage statistics from logs
	 * @param {Date} startDate - Start date for statistics (optional)
	 * @param {Date} endDate - End date for statistics (optional)
	 * @returns {Object} - Statistics object
	 */
	getStatistics(startDate = null, endDate = null) {
		if (!fs.existsSync(this.filepath)) {
			return {
				totalRemovals: 0,
				totalCompletions: 0,
				totalFeedback: 0,
				totalSessions: 0
			};
		}

		try {
			const fileContent = fs.readFileSync(this.filepath, 'utf-8');
			const lines = fileContent.trim().split('\n').filter(line => line.trim());
			
			let totalRemovals = 0;
			let totalCompletions = 0;
			let totalFeedback = 0;
			let totalSessions = 0;

			for (const line of lines) {
				try {
					const entry = JSON.parse(line);
					const entryDate = new Date(entry.timestamp);

					// Filter by date range if provided
					if (startDate && entryDate < startDate) continue;
					if (endDate && entryDate > endDate) continue;

					switch (entry.action) {
						case 'removal':
							totalRemovals++;
							break;
						case 'deck_completion':
							totalCompletions++;
							break;
						case 'feedback':
							totalFeedback++;
							break;
						case 'session_start':
							totalSessions++;
							break;
					}
				} catch (parseError) {
					// Skip invalid JSON lines
					continue;
				}
			}

			return {
				totalRemovals,
				totalCompletions,
				totalFeedback,
				totalSessions
			};
		} catch (error) {
			console.error('Error reading log file for statistics:', error.message);
			return {
				totalRemovals: 0,
				totalCompletions: 0,
				totalFeedback: 0,
				totalSessions: 0
			};
		}
	}
}

module.exports = { ActionLogger };
