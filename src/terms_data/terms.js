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

	const { discrete_math, probability } = require('./math_theory.js');
	decks.addDeck(new TermStorage(discrete_math, 'discrete_math'));
	decks.addDeck(new TermStorage(probability, 'probability'));

	const {
		react_terms,
		apex,
		flutter,
		IDE_S,
		chrome_extensions,
		python_frameworks,
		react_typescript,
		dotNet,
		angular
	} = require('./frameworks.js');
	decks.addDeck(new TermStorage(react_terms, 'react terms'));
	decks.addDeck(new TermStorage(apex, 'apex'));
	decks.addDeck(new TermStorage(flutter, 'flutter'));
	decks.addDeck(new TermStorage(IDE_S, 'IDEs'));
	decks.addDeck(new TermStorage(chrome_extensions, 'chrome extensions'));
	decks.addDeck(new TermStorage(python_frameworks, 'python frameworks'));
	decks.addDeck(new TermStorage(react_typescript, 'react typescript'));
	decks.addDeck(new TermStorage(dotNet, 'dot net'));
	decks.addDeck(new TermStorage(angular, 'angular'));

	const {
		network,
		network_midterm,
		artificialIntelligence,
		artificialIntelligence_2,
		algebra,
		calculousOne,
		network_final
	} = require('./spring-senior.js');
	decks.addDeck(new TermStorage(network, 'network'));
	decks.addDeck(new TermStorage(network_midterm, 'network midterm'));
	decks.addDeck(
		new TermStorage(artificialIntelligence, 'artificial intelligence')
	);
	decks.addDeck(
		new TermStorage(artificialIntelligence_2, 'artificial intelligence 2')
	);
	decks.addDeck(new TermStorage(algebra, 'algebra'));
	decks.addDeck(new TermStorage(calculousOne, 'calculus one'));
	decks.addDeck(new TermStorage(network_final, 'network final'));

	const {
		pragmatic_programmer,
		life_game_lessons,
		survival_game_lessons,
		life_lessons,
		hackathon_lessons,
		experiments_lessons
	} = require('./soft_skill_book_game.js');
	decks.addDeck(
		new TermStorage(pragmatic_programmer, 'pragmatic programmer')
	);
	decks.addDeck(new TermStorage(life_game_lessons, 'life game lessons'));

	const { designPatterns, dsa, system_design } = require('./dsa.js');
	decks.addDeck(new TermStorage(designPatterns, 'design patterns'));
	decks.addDeck(new TermStorage(dsa, 'dsa')),
		decks.addDeck(new TermStorage(system_design, 'system design'));

	const {
		aws_services,
		aws_glossary,
		coderTerms,
		unit_testing,
		docker,
		js_advanced,
		best_practices
	} = require('./programmer_experience.js');
	decks.addDeck(new TermStorage(aws_glossary, 'aws glossary'));
	decks.addDeck(new TermStorage(aws_services, 'aws services'));
	decks.addDeck(new TermStorage(coderTerms, 'coder terms'));
	decks.addDeck(new TermStorage(unit_testing, 'unit testing'));
	decks.addDeck(new TermStorage(docker, 'docker'));
	decks.addDeck(new TermStorage(js_advanced, 'js advanced'));
	decks.addDeck(new TermStorage(best_practices, 'best practices'));

	// Includes UX, system Design
	const { system_design_project } = require('./design.js');
	decks.addDeck(new TermStorage(system_design_project, 'system design'));

	// Includes Marketing, Accounting.
	const { accounting } = require('./business_terms.js');
	decks.addDeck(new TermStorage(accounting, 'accounting'));

	const {
		interview,
		interview_filter_frequent,
		run_when_job
	} = require('./interview.js');
	decks.addDeck(new TermStorage(interview, 'interview'));
	decks.addDeck(
		new TermStorage(interview_filter_frequent, 'interview filter frequent')
	);
	decks.addDeck(new TermStorage(run_when_job, 'run when job'));

	const {
		pytorch_machine_learning_course,
		machine_learning_pandas_visualization,
		machine_learning_scikit_learn,
		ai_theory
	} = require('./ai_machine.js');
	decks.addDeck(
		new TermStorage(
			pytorch_machine_learning_course,
			'pytorch machine learning course'
		)
	);
	decks.addDeck(
		new TermStorage(
			machine_learning_pandas_visualization,
			'machine learning pandas'
		)
	);
	decks.addDeck(
		new TermStorage(
			machine_learning_scikit_learn,
			'machine learning scikit learn'
		)
	);
	decks.addDeck(new TermStorage(ai_theory, 'ai theory'));

	const { designing_good_charts, sql } = require('./data-science.js');
	decks.addDeck(
		new TermStorage(designing_good_charts, 'designing good charts')
	);
	decks.addDeck(new TermStorage(sql, 'sql'));

	const {
		aws_certification_associate_developer,
		aws_localstack,
		aws_certification_cloud_practitioner
	} = require('./aws_certifications.js');
	decks.addDeck(
		new TermStorage(
			aws_certification_associate_developer,
			'aws associate dev'
		)
	);
	decks.addDeck(new TermStorage(aws_localstack, 'aws localstack'));
	decks.addDeck(
		new TermStorage(
			aws_certification_cloud_practitioner,
			'aws cloud practitioner'
		)
	);

	// decks.addDeck(new TermStorage(test, "test", {is_active: true}));
	const { salesforce_experience } = require('./salesforce_certification.js');
	decks.addDeck(
		new TermStorage(salesforce_experience, 'salesforce experience')
	);

	const {
		python,
		swift,
		js,
		dart,
		php,
		java,
		csharp,
		cpp,
		typescript,
		r,
		matlab,
		kotlin
	} = require('./languages.js');
	decks.addDeck(new TermStorage(python, 'python'));
	decks.addDeck(new TermStorage(swift, 'swift'));
	decks.addDeck(new TermStorage(js, 'js'));
	decks.addDeck(new TermStorage(dart, 'dart'));
	decks.addDeck(new TermStorage(php, 'php'));
	decks.addDeck(new TermStorage(java, 'java'));
	decks.addDeck(new TermStorage(csharp, 'csharp'));
	decks.addDeck(new TermStorage(cpp, 'cpp'));
	decks.addDeck(new TermStorage(typescript, 'typescript'));
	decks.addDeck(new TermStorage(r, 'r'));
	decks.addDeck(new TermStorage(matlab, 'matlab'));
	decks.addDeck(new TermStorage(kotlin, 'kotlin'));

	const { analysisAlgorithmClass } = require('./spring-senior-2024.js');
	decks.addDeck(
		new TermStorage(analysisAlgorithmClass, 'analysisAlgorithmClass')
	);

	// decks.applyMasks([engineerMask]);
	const masks = getMasksByAlgorithm();
	decks.applyMasks(masks);

	return decks;
}

const termJson = [];

module.exports = { termJson, populateMasterDeck, createMaskConfig, getMasksByAlgorithm };
