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

		console.log(`Loaded ${deckMasks.length} masks from settings.json`);
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
	// Define custom display names for decks (when different from term key)
	const deckNameMappings = {
		// Math theory
		discrete_math: 'discrete_math',
		probability: 'probability',
		
		// Frameworks & Technologies  
		react_terms: 'react terms',
		apex: 'apex',
		flutter: 'flutter',
		IDE_S: 'IDEs',
		chrome_extensions: 'chrome extensions',
		python_frameworks: 'python frameworks',
		react_typescript: 'react typescript',
		dotNet: 'dot net',
		angular: 'angular',
		
		// Academic - Spring Senior
		network: 'network',
		network_midterm: 'network midterm',
		artificialIntelligence: 'artificial intelligence',
		artificialIntelligence_2: 'artificial intelligence 2',
		algebra: 'algebra',
		calculousOne: 'calculus one',
		network_final: 'network final',
		
		// Soft Skills & Books
		pragmatic_programmer: 'pragmatic programmer',
		life_game_lessons: 'life game lessons',
		survival_game_lessons: 'survival game lessons',
		life_lessons: 'life lessons',
		hackathon_lessons: 'hackathon lessons',
		experiments_lessons: 'experiments lessons',
		
		// DSA & System Design
		designPatterns: 'design patterns',
		dsa: 'dsa',
		system_design: 'system design',
		system_design_project: 'system design', // Note: duplicate name in original
		
		// Programming Experience
		aws_services: 'aws services',
		aws_glossary: 'aws glossary',
		coderTerms: 'coder terms',
		unit_testing: 'unit testing',
		docker: 'docker',
		js_advanced: 'js advanced',
		best_practices: 'best practices',
		
		// Business Terms
		accounting: 'accounting',
		
		// Interview Preparation
		interview: 'interview',
		interview_filter_frequent: 'interview filter frequent',
		run_when_job: 'run when job',
		
		// AI & Machine Learning
		pytorch_machine_learning_course: 'pytorch machine learning course',
		machine_learning_pandas_visualization: 'machine learning pandas',
		machine_learning_scikit_learn: 'machine learning scikit learn',
		ai_theory: 'ai theory',
		
		// Data Science
		designing_good_charts: 'designing good charts',
		sql: 'sql',
		
		// AWS Certifications
		aws_certification_associate_developer: 'aws associate dev',
		aws_localstack: 'aws localstack',
		aws_certification_cloud_practitioner: 'aws cloud practitioner',
		
		// Salesforce
		salesforce_experience: 'salesforce experience',
		
		// Programming Languages
		python: 'python',
		swift: 'swift',
		js: 'js',
		dart: 'dart',
		php: 'php',
		java: 'java',
		csharp: 'csharp',
		cpp: 'cpp',
		typescript: 'typescript',
		r: 'r',
		matlab: 'matlab',
		kotlin: 'kotlin',
		
		// Academic - Spring Senior 2024
		analysisAlgorithmClass: 'analysisAlgorithmClass'
	};

	// Dynamically add all decks from sample_terms
	Object.entries(allSampleTerms).forEach(([termKey, termData]) => {
		// Skip non-array data like CURRENCY_SIMBOLS
		if (!Array.isArray(termData)) {
			console.log(`⏭ Skipping non-array export: ${termKey}`);
			return;
		}
		
		const deckDisplayName = deckNameMappings[termKey] || termKey.toLowerCase().replace(/_/g, ' ');
		decks.addDeck(new TermStorage(termData, deckDisplayName));
		console.log(`✅ Added deck: "${deckDisplayName}" with ${termData.length} terms`);
	});


	// decks.applyMasks([engineerMask]);
	const masks = getMasksByAlgorithm();
	decks.applyMasks(masks);

	return decks;
}

const termJson = [];

module.exports = { termJson, populateMasterDeck, createMaskConfig, getMasksByAlgorithm };
