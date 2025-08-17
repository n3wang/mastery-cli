/**
 * <RULES>
 *
 * 1 Creating Collections: It makes sense to create collection for e.g. functions on an array and their hipothetical use.
 * 2 Strategy > Term:, Or at least bundle a collection of terms, to make it worth more.
 */

const { TermStorage, DeckMask } = require('../structures.js');

/**
 * Helper function to create a new mask configuration object
 * @param {string} title - The mask title/identifier
 * @param {string[]} decks_to_enable - Array of deck names to enable
 * @returns {object} Mask configuration object for settings.json
 * 
 * @example
 * // Usage example for settings.json:
 * // const newMask = createMaskConfig('my-study-plan', ['react terms', 'js advanced']);
 * // Add this to settings.json under quiz_decks_configuration.masks
 */
function createMaskConfig(title, decks_to_enable) {
	return {
		title: title,
		decks_to_enable: decks_to_enable
	};
}

/**
 * Dynamically creates deck masks based on settings.json configuration
 * @returns {DeckMask[]} Array of DeckMask objects based on settings
 */
function getMasksByAlgorithm() {
	try {
		// Load settings dynamically
		const settings = require('../user_data/settings.json');
		const quizDecksConfig = settings.quiz_decks_configuration || {};
		const masks = quizDecksConfig.masks || [];
		const useMasks = quizDecksConfig.use_masks || [];

		// Create DeckMask objects for each mask configuration
		const deckMasks = [];

		for (const maskConfig of masks) {
			const { title, decks_to_enable } = maskConfig;
			
			if (!title || !decks_to_enable) {
				console.warn(`Skipping invalid mask configuration:`, maskConfig);
				continue;
			}

			// Check if this mask is in the use_masks list
			const enabled = useMasks.includes(title);

			const deckMask = new DeckMask(title, {
				decksToEnableStrings: decks_to_enable,
				enabled: enabled
			});

			deckMasks.push(deckMask);
			
			console.log(`Created mask "${title}" with decks: [${decks_to_enable.join(', ')}], enabled: ${enabled}`);
		}

		return deckMasks;

	} catch (error) {
		console.error('Error loading masks from settings.json:', error.message);
		console.log('Falling back to default masks');
		
		// Fallback to default masks if settings can't be loaded
		const cloudMask = new DeckMask('cloud-prep', {
			decksToEnableStrings: ['aws cloud practitioner'],
			enabled: false
		});

		const longTermCareer = new DeckMask('long-term-engineer', {
			decksToEnableStrings: ['discrete_math', 'probability', 'sql'],
			enabled: false
		});

		return [cloudMask, longTermCareer];
	}
}

/**
 *
 * @returns Master Deck containing all the cards
 */
async function populateMasterDeck() {
	terms = [];

	let decks = new TermStorage([], 'Academic Terms');
	const allSampleTerms = require('./sample_terms.js');
	
	// Dynamically add all decks from sample_terms with automated naming
	Object.entries(allSampleTerms).forEach(([termKey, termData]) => {
		// Skip non-array data like CURRENCY_SIMBOLS
		if (!Array.isArray(termData)) {
			console.log(`⏭ Skipping non-array export: ${termKey}`);
			return;
		}
		
		// Convert term key to display name: underscores to spaces, lowercase
		const deckDisplayName = termKey.replace(/_/g, ' ').toLowerCase();
		console.log(`➕ Adding deck: "${deckDisplayName}" with ${termData.length} terms`);
		decks.addDeck(new TermStorage(termData, deckDisplayName));
	});

	// Add terms_modules (like cfa, datascience, etc.)
	try {
		const { retrieve_terms_as_decks } = require('../md_terms_parser');
		const termsModules = retrieve_terms_as_decks();
		for (const key of Object.keys(termsModules)) {
			decks.addDeck(termsModules[key]);
		}
	} catch (error) {
		console.warn('⚠ Failed to load terms modules:', error.message);
	}

	// decks.applyMasks([engineerMask]);
	const masks = getMasksByAlgorithm();
	decks.applyMasks(masks);

	return decks;
}

const termJson = [];

module.exports = { termJson, populateMasterDeck, createMaskConfig, getMasksByAlgorithm };
