const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { vaultPath } = require('./vault');

/**
 * Manages persistent storage of term ratings in CSV format
 * Uses term hash as unique identifier
 */
class RatingStorage {
	constructor(filename = 'term-ratings') {
		this.filename = filename;
		this.filepath = vaultPath(`progress/${this.filename}.csv`);
		this.headers = [
			'term_hash',
			'term_name',
			'category',
			'rating',
			'timestamp',
			'was_correct',
			'has_feedback'
		];
		this.ensureFileExists();
	}

	/**
	 * Ensure the CSV file exists with headers
	 */
	ensureFileExists() {
		try {
			const dir = path.dirname(this.filepath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			if (!fs.existsSync(this.filepath)) {
				// Create file with headers
				fs.writeFileSync(this.filepath, this.headers.join(',') + '\n', 'utf-8');
			}
		} catch (error) {
			console.error('Error creating rating storage file:', error.message);
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
	 * Escape CSV value to handle commas, quotes, and newlines
	 * @param {string} value - Value to escape
	 * @returns {string} - Escaped value
	 */
	escapeCSVValue(value) {
		if (value === null || value === undefined) {
			return '';
		}
		const stringValue = String(value);
		// If value contains comma, quote, or newline, wrap in quotes and escape quotes
		if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
			return '"' + stringValue.replace(/"/g, '""') + '"';
		}
		return stringValue;
	}

	/**
	 * Add a rating for a term
	 * @param {Object} term - Term object
	 * @param {number} rating - Rating value (1-5)
	 * @param {boolean} wasCorrect - Whether the answer was correct
	 * @param {boolean} hasFeedback - Whether the term has feedback
	 * @returns {boolean} - Success status
	 */
	addRating(term, rating, wasCorrect, hasFeedback = false) {
		try {
			if (!term || !rating || rating < 1 || rating > 5) {
				return false;
			}

			const hash = this.generateTermHash(term);
			const termName = term.term || 'Unknown';
			const category = term.category || 'Unknown';
			const timestamp = new Date().toISOString();

			const row = [
				this.escapeCSVValue(hash),
				this.escapeCSVValue(termName),
				this.escapeCSVValue(category),
				rating,
				timestamp,
				wasCorrect,
				hasFeedback
			];

			// Append to CSV file
			fs.appendFileSync(this.filepath, row.join(',') + '\n', 'utf-8');
			return true;
		} catch (error) {
			console.error('Error adding rating:', error.message);
			return false;
		}
	}

	/**
	 * Get all ratings from CSV
	 * @returns {Array} - Array of rating objects
	 */
	getAllRatings() {
		try {
			if (!fs.existsSync(this.filepath)) {
				return [];
			}

			const content = fs.readFileSync(this.filepath, 'utf-8');
			const lines = content.trim().split('\n');

			if (lines.length <= 1) {
				// Only headers or empty
				return [];
			}

			// Skip header line
			const dataLines = lines.slice(1);

			return dataLines.map(line => {
				const values = this.parseCSVLine(line);
				return {
					term_hash: values[0],
					term_name: values[1],
					category: values[2],
					rating: parseInt(values[3]),
					timestamp: values[4],
					was_correct: values[5] === 'true',
					has_feedback: values[6] === 'true'
				};
			});
		} catch (error) {
			console.error('Error reading ratings:', error.message);
			return [];
		}
	}

	/**
	 * Parse a CSV line handling quoted values
	 * @param {string} line - CSV line to parse
	 * @returns {Array} - Array of values
	 */
	parseCSVLine(line) {
		const result = [];
		let current = '';
		let inQuotes = false;

		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			const nextChar = line[i + 1];

			if (char === '"') {
				if (inQuotes && nextChar === '"') {
					// Escaped quote
					current += '"';
					i++; // Skip next quote
				} else {
					// Toggle quotes
					inQuotes = !inQuotes;
				}
			} else if (char === ',' && !inQuotes) {
				// End of field
				result.push(current);
				current = '';
			} else {
				current += char;
			}
		}

		// Add last field
		result.push(current);
		return result;
	}

	/**
	 * Get ratings for a specific term
	 * @param {Object} term - Term object
	 * @returns {Array} - Array of ratings for this term
	 */
	getRatingsByTerm(term) {
		const hash = this.generateTermHash(term);
		const allRatings = this.getAllRatings();
		return allRatings.filter(r => r.term_hash === hash);
	}

	/**
	 * Get count of all ratings
	 * @returns {number} - Count
	 */
	getCount() {
		const ratings = this.getAllRatings();
		return ratings.length;
	}

	/**
	 * Get average rating for a term
	 * @param {Object} term - Term object
	 * @returns {number|null} - Average rating or null if no ratings
	 */
	getAverageRating(term) {
		const ratings = this.getRatingsByTerm(term);
		if (ratings.length === 0) {
			return null;
		}
		const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
		return sum / ratings.length;
	}

	/**
	 * Clear all ratings (delete file)
	 */
	clear() {
		try {
			if (fs.existsSync(this.filepath)) {
				fs.unlinkSync(this.filepath);
			}
			this.ensureFileExists();
		} catch (error) {
			console.error('Error clearing ratings:', error.message);
		}
	}
}

module.exports = { RatingStorage };
