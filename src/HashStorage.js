const fs = require('fs');
const path = require('path');
const { vaultPath } = require('./vault');

/**
 * Simple storage system for term completion hashes and counts
 * Stores data as: { "hash1": count1, "hash2": count2, ... }
 */
class HashStorage {
	constructor(filename = 'term-completion-hashes') {
		this.filename = filename;
		this.filepath = vaultPath(`progress/${this.filename}.json`);
		this.data = {}; // Root dictionary: { hash: count }
	}

	/**
	 * Load hash completion data from file
	 */
	async load() {
		try {
			if (fs.existsSync(this.filepath)) {
				const fileContent = fs.readFileSync(this.filepath, 'utf8');
				this.data = JSON.parse(fileContent) || {};
			} else {
				this.data = {};
			}
			return true;
		} catch (error) {
			console.warn('Failed to load hash storage:', error.message);
			this.data = {};
			return false;
		}
	}

	/**
	 * Save hash completion data to file
	 */
	async save() {
		try {
			// Ensure directory exists
			const dir = path.dirname(this.filepath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			console.log(`Saving hash storage to ${this.filepath}`);
			fs.writeFileSync(
				this.filepath,
				JSON.stringify(this.data, null, 2),
				'utf8'
			);
			return true;
		} catch (error) {
			console.warn('Failed to save hash storage:', error.message);
			return false;
		}
	}

	/**
	 * Get completion count for a hash
	 * @param {string} hash - The term hash
	 * @returns {number} - Number of times completed
	 */
	getCount(hash) {
		return this.data[hash] || 0;
	}

	/**
	 * Set completion count for a hash
	 * @param {string} hash - The term hash
	 * @param {number} count - The completion count
	 */
	setCount(hash, count) {
		this.data[hash] = count;
	}

	/**
	 * Increment completion count for a hash
	 * @param {string} hash - The term hash
	 * @returns {number} - New completion count
	 */
	incrementCount(hash) {
		const currentCount = this.getCount(hash);
		const newCount = currentCount + 1;
		this.setCount(hash, newCount);
		return newCount;
	}

	/**
	 * Get all hashes and their counts
	 * @returns {Object} - Dictionary of hash: count pairs
	 */
	getAllCounts() {
		return { ...this.data };
	}

	/**
	 * Clear all hash completion data
	 */
	clear() {
		this.data = {};
	}

	/**
	 * Reset completion counts for a list of terms
	 * @param {Array} terms - Array of term objects
	 * @param {Function} hashFunction - Function to generate hash from term
	 * @returns {number} - Number of terms reset
	 */
	resetTerms(terms, hashFunction) {
		if (!terms || !Array.isArray(terms) || !hashFunction) {
			return 0;
		}
		let resetCount = 0;
		for (const term of terms) {
			const hash = hashFunction(term);
			if (this.data[hash]) {
				delete this.data[hash];
				resetCount++;
			}
		}
		return resetCount;
	}
}

module.exports = { HashStorage };
