const Settings = require('./settings.js');

/**
 * Terms, standard accepted for the Quizzler
 */
class Term {
	constructor(
		term,
		example = '',
		description = '',
		prompt = 'Use the term',
		{
			priority = 5,
			tags = [],
			category = '',
			references = '',
			attachment = '',
			auto_newline = true,
			reference_page = '',
			reference_line = -1,
			module_name = '',
			module_path = '',
			common_instructions = undefined,
			deck_description = '',
			prompt_description = ''
		} = {}
	) {
		/**
		 * REMEMBER: To add the new item into asJson!!
		 */

		this.auto_newline = auto_newline;

		this.term = term;
		this.description = description;
		this.example = example;

		if (this.auto_newline) {
			this.example = this.example.replace(/(\s{2,}|\n)(?=\S)/g, '\n');
			this.description = this.description.replace(
				/(\s{2,}|\n)(?=\S)/g,
				'\n'
			);
		}

		this.references = references;
		this.attachment = attachment;
		this.category = category;
		this.prompt = prompt;
		this.priority = priority;
		this.slug = this.slugify(this.term);
		this.formula_name = this.slug;
		this.attachment_is_url = this.isOnlineResource(attachment);
		this.reference_page = reference_page;
		this.reference_line = reference_line;
		this.module_name = module_name;
		this.module_path = module_path;
		this.common_instructions = common_instructions;
		this.deck_description = deck_description;
		this.prompt_description = prompt_description;

		// if(term=="definition2"){
		//     console.log("Term is definition2, this is a bug, please report it.");
		//     console.trace();
		//     console.log("Term: ", this);
		// }
	}

	/**
	 *  Slugify the term
	 */
	slugify = term => {
		return term
			.toString()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-');
	};

	isOnlineResource = url => {
		return /^https?:\/\//i.test(url);
	};

	pushCategory = subcategory => {
		this.category +=
			this.category == '' ? subcategory : ` > ${subcategory}`;
	};

	get asJson() {
		return {
			term: this.term,
			example: this.example,
			description: this.description,
			references: this.references,
			category: this.category,
			prompt: this.prompt,
			formula_name: this.slug,
			attachment: this.attachment,
			attachment_is_url: this.attachment_is_url,
			module_name: this.module_name,
			module_path: this.module_path,
			common_instructions: this.common_instructions,
			deck_description: this.deck_description,
			prompt_description: this.prompt_description
		};
	}
}

class Terminology extends Term {
	/**
	 *
	 * @param {string} term Terminology or title
	 * @param {String} description Description  which should appear or the definition
	 * @param {Optional Arguments} param2 {example: If there is an example, auto_image: bool: If to autoamtically fetch an image from the web.}
	 */
	constructor(
		term,
		description = '',
		{
			example = '',
			autom_image = false,
			H = 'Use this on an example',
			attachment = ''
		} = {}
	) {
		super(term, example, description, prompt, { attachment: attachment });
	}
}

/** Deck and category label budgets: see formatTwoPartLabel. */
const DIFFERENTIATOR_MAX_LENGTH = 15;
const LEAF_MAX_LENGTH = 10;

/**
 * Keep the tail of a string.
 *
 * These names share long common prefixes — every card in one book is called
 * `ACSoftwareDesignKlausIglbergerprocessedhqpart<something>` — so the end is
 * what tells them apart. Cropping from the front would leave every row
 * identical.
 *
 * @param {String} value
 * @param {Number} max
 * @returns {String}
 */
function cropTail(value, max) {
	const text = String(value || '');
	return text.length <= max ? text : text.slice(-max);
}

/**
 * Render `<differentiator> > <deckinfo>` within the label budget.
 *
 * @param {String} differentiator the part that distinguishes siblings
 * @param {String} deckinfo the deck or folder the item belongs to
 * @param {Object} [options]
 * @param {Number} [options.differentiatorMax]
 * @returns {String}
 */
function formatTwoPartLabel(
	differentiator,
	deckinfo,
	{ differentiatorMax = DIFFERENTIATOR_MAX_LENGTH } = {}
) {
	const left = cropTail(differentiator, differentiatorMax);
	const right = cropTail(deckinfo, LEAF_MAX_LENGTH);

	return right ? `${left} > ${right}` : left;
}

/**
 * Build display labels that stay unique after cropping.
 *
 * Two different entries can crop to the same text. That would put two
 * indistinguishable rows in the picker and make the display-to-original map
 * ambiguous — the exact bug the qualified deck names fixed. So when labels
 * collide, the differentiator is widened until they separate.
 *
 * @param {String[]} values full `a > b` strings
 * @returns {Map<String, String>} original -> unique label
 */
function buildUniqueLabels(values) {
	const widths = [DIFFERENTIATOR_MAX_LENGTH, 25, 40, 60, Infinity];

	for (const width of widths) {
		const labels = new Map();
		const seen = new Set();
		let collision = false;

		for (const value of values) {
			const parts = String(value || '').split(' > ');
			const label =
				parts.length < 2
					? cropTail(parts[0], width)
					: formatTwoPartLabel(parts[0], parts[parts.length - 1], {
							differentiatorMax: width
						});

			if (seen.has(label)) {
				collision = true;
				break;
			}
			seen.add(label);
			labels.set(value, label);
		}

		if (!collision) {
			return labels;
		}
	}

	return new Map(values.map(value => [value, value]));
}

/**
 * Follows Composition Pattern, it should be able to store other Term Storages, turn them on and off
 */
class TermStorage {
	/**
	 * Initialization, by default TermStorage is acitve.
	 * @param {List[JsonText]} terms Terms to be added to this deck
	 * @param {string} deck_name The deckname, optional if is the parent deckname
	 * @param {List[TermStorage]} decks The decks required for the Storages
	 * @param {boolean} is_active If the deck is active or not; by default is false
	 * @param {string} sort_option Sort option: 'reversed' (default), 'ordered', 'random', 'duplicate'
	 */
	constructor(
		terms = [],
		deck_name = '',
		{
			decks = [],
			is_active = false,
			module_name = '',
			sort_option = 'reversed'
		} = {}
	) {
		this.terms = terms;
		this.deck_name = deck_name;
		this.is_active = is_active;
		this.decks = decks;
		this.priority = 5; //By default
		this.module_name = module_name;
		this.sort_option = sort_option || 'reversed'; // Default to reversed
	}

	/**
	 *
	 * @param {TermStorage} deck the deck to append to the storage, by default is active usually
	 */
	addDeck(deck) {
		this.decks.push(deck);
	}

	addDecks(decks) {
		for (const deck of decks) {
			// console.log("Adding deck: ", deck);
			this.addDeck(deck);
		}
	}

	/**
	 *
	 * @param {[DeckMask]} masks List of masks to apply to the deck
	 */
	applyMasks(masks) {
		for (const mask of masks) {
			if (!mask.enabled) continue;

			// Collect all allowed categories for this deck/module
			const allowedCategories = [];
			let enableFullDeck = false;

			for (const deckSpec of mask.decksToEnable) {
				if (deckSpec.includes(':')) {
					// Handle module:category syntax (e.g., "cfa:MInterestRatesandReturnMeasurement")
					const [moduleFilter, categoryFilter] = deckSpec.split(':');

					// Check if this deck matches the module
					if (
						this.module_name === moduleFilter ||
						this.deck_name === moduleFilter
					) {
						if (categoryFilter) {
							allowedCategories.push(categoryFilter);
						} else {
							// If no specific category, enable the whole module
							enableFullDeck = true;
						}
					}
				} else {
					// Exact deck name, module name, or the deck's own leaf
					// segment. Deck names are path-qualified
					// (`4-1-nodejs/flashcards`), so a mask written against the
					// bare folder name keeps working -- masks are a coarse
					// filter, and matching every `flashcards` deck is the
					// reasonable reading there.
					if (
						deckSpec === this.deck_name ||
						deckSpec === this.module_name ||
						deckSpec === this.deck_leaf_name
					) {
						enableFullDeck = true;
					}
				}
			}

			// If we have category filters for this deck, remove terms that don't match
			if (allowedCategories.length > 0 && !enableFullDeck) {
				this.terms = this.terms.filter(term => {
					if (!term.category) return false;
					return allowedCategories.some(allowedCategory =>
						term.category.includes(allowedCategory)
					);
				});
				this.is_active = true;
			} else if (enableFullDeck) {
				this.is_active = true;
			}
		}

		for (const deck of this.decks) {
			deck.applyMasks(masks);
		}
	}

	/**
	 * The last segment of a path-qualified deck name.
	 * `4-1-nodejs/flashcards` -> `flashcards`.
	 * @returns {String}
	 */
	get deck_leaf_name() {
		const name = String(this.deck_name || '');
		const index = name.lastIndexOf('/');
		return index === -1 ? name : name.slice(index + 1);
	}

	/**
	 * A short label for the deck picker.
	 *
	 * Deck names are path-qualified so they are unique (`2-3-scikitlearn/flashcards`),
	 * but a full path is too long to scan in a list. The label keeps the part
	 * that actually distinguishes one deck from its same-named siblings:
	 *
	 *   2-3-scikitlearn/flashcards    -> "2-3-scikitlearn > flashcards"
	 *   1410710-democracy4/flashcards -> "0710-democracy4 > flashcards"
	 *   cfa                           -> "cfa"
	 *
	 * The differentiator keeps its LAST 15 characters, because what separates
	 * `2-3-scikitlearn` from `2-4-surprise` is at the end, not the start. The
	 * leaf keeps its first 10.
	 *
	 * @returns {String}
	 */
	get deck_display_name() {
		return TermStorage.formatDeckLabel(this.deck_name);
	}

	/**
	 * @param {String} deckName a possibly path-qualified deck name
	 * @returns {String} the short label
	 */
	static formatDeckLabel(deckName) {
		const name = String(deckName || '');
		const segments = name.split('/').filter(Boolean);

		if (segments.length < 2) {
			return name;
		}

		return formatTwoPartLabel(
			segments[segments.length - 2],
			segments[segments.length - 1]
		);
	}

	/**
	 * Returns list of deck title. e.g.
	 * [kotlin, java, javascript...]
	 */
	get deck_titles() {
		const deck_names = [this.deck_name];
		for (const deck of this.decks) {
			deck_names.push(...deck.deck_titles);
		}
		return deck_names;
	}

	/**
	 * Returns dict of deck titles with the count of cards inside: deckname
	 *  e.g.:
	 * {
	 *      kotlin - 3: {count: 3, name: kotlin, nested_count: 0},
	 *      java - 5: {count: 5, name: java, nested_count: 2}
	 *      javascript - 10: {count: 10, name: javascript, nested_count: 0}
	 * }
	 */
	get deck_titles_with_count() {
		const deck_names = {
			// Keyed by the full qualified name so entries stay unique; `display`
			// is what the picker shows.
			[`${this.deck_name} - ${this.terms.length} cards`]: {
				name: this.deck_name,
				display: this.deck_display_name,
				count: this.terms.length,
				nested_count: this.decks ? this.decks.length : 0
			}
		};
		for (const deck of this.decks) {
			Object.assign(deck_names, deck.deck_titles_with_count);
		}
		return deck_names;
	}

	/**
	 * Follows the design of array.push, easier to memorize
	 * @param {Term} term Pushes this term into the terms of the storage
	 */
	push(term) {
		// Check if term at least has a term and description
		if (term?.term == null) {
			return;
		}
		if (term.term == '') {
			return;
		}

		this.terms.push(term);
	}

	/**
	 * Appends all decks that are active + its current cards.
	 * @returns {List<Json>} Gets the terminologies as a List<Json>
	 */
	get jsonTerms() {
		const safeguard_bad_terms = true;
		const res = [];
		// Add own cards
		for (const term of this.terms) {
			res.push(term);
		}

		//Add cards of the decks that are active
		for (const deck of this.decks) {
			if (deck.is_active) {
				res.push(...deck.jsonTerms);
			}
		}

		return res;
	}

	/**
	 *
	 * @param {get_only} get only certain decks (with x categories.)
	 * @param {_includeAll} internal flag to include all nested decks regardless of active status
	 * @returns
	 */
	listTerms({ get_only = [], _includeAll = false } = {}) {
		const termsList = [];

		// Check if this specific deck is in the get_only list
		const isThisDeckExplicitlyRequested =
			get_only.length > 0 && get_only.includes(this.deck_name);
		const noFilter = get_only.length === 0;

		// Include this deck's own terms if:
		// - _includeAll flag is set (parent was requested), OR
		// - No filter and this deck is active, OR
		// - This deck is explicitly requested
		if (
			_includeAll ||
			(noFilter && this.is_active) ||
			isThisDeckExplicitlyRequested
		) {
			termsList.push(
				...this.terms.map(obj => {
					const newterm = new Term(
						obj?.term ?? '',
						obj?.example ?? '',
						obj?.description ?? '',
						obj?.prompt ?? '',
						{
							references: obj?.references ?? '',
							category: obj?.category ?? '',
							attachment: obj?.attachment,
							reference_line: obj?.reference_line ?? -1,
							reference_page: obj?.reference_page ?? '',
							module_name: obj?.module_name ?? '',
							module_path: obj?.module_path ?? '',
							common_instructions: obj?.common_instructions,
							deck_description: obj?.deck_description ?? '',
							prompt_description: obj?.prompt_description ?? '',
							priority: this.priority ?? 5,
							auto_newline: obj?.auto_newline ?? true
						}
					);
					newterm.pushCategory(this.deck_name ?? '');
					return newterm;
				})
			);
		}

		// Recursively process nested decks
		for (const deck of this.decks) {
			// Include nested deck if:
			// 1. _includeAll flag is set (parent was requested)
			// 2. No filter AND (this deck is active OR nested deck is active)
			// 3. This parent deck was explicitly requested (include all children)
			// 4. There's a filter - pass it down to search recursively

			if (_includeAll) {
				// Parent was requested, include everything
				termsList.push(
					...deck.listTerms({ get_only: [], _includeAll: true })
				);
			} else if (noFilter && this.is_active) {
				// Parent is active, include all children
				termsList.push(
					...deck.listTerms({ get_only: [], _includeAll: true })
				);
			} else if (isThisDeckExplicitlyRequested) {
				// This deck was explicitly requested, include all nested decks
				termsList.push(
					...deck.listTerms({ get_only: [], _includeAll: true })
				);
			} else if (noFilter && deck.is_active) {
				// No filter but this specific child is active
				termsList.push(
					...deck.listTerms({ get_only: [], _includeAll: true })
				);
			} else if (get_only.length > 0) {
				// There's a filter, pass it down to search recursively
				termsList.push(
					...deck.listTerms({ get_only, _includeAll: false })
				);
			}
		}

		// Do the same recursive for each of the internal res
		return termsList;
	}

	/**
	 *
	 * @param is_active_settings {deck_name,is_active} settings Takes in the settings in key:true/false format to turn on or off of the decks inside.
	 */
	changeIsActiveSettingsFromDecks(is_active_settings) {
		for (const deck_name of Object.keys(is_active_settings)) {
			this.decks[deck_name].is_active = is_active_settings[deck_name];
		}
	}

	/**
	 * Find a deck by name recursively
	 * @param {string} deckName - Name of the deck to find
	 * @returns {TermStorage|null} The found deck or null
	 */
	findDeck(deckName) {
		if (this.deck_name === deckName) {
			return this;
		}

		for (const deck of this.decks) {
			const found = deck.findDeck(deckName);
			if (found) {
				return found;
			}
		}

		return null;
	}

	/**
	 * Apply sorting to a list of terms based on sort_option
	 * @param {Term[]} terms - Array of terms to sort
	 * @returns {Term[]} Sorted array of terms
	 */
	applySortOption(terms) {
		if (!terms || terms.length === 0) return terms;

		switch (this.sort_option) {
			case 'ordered':
				// Keep original order (do nothing)
				return [...terms];

			case 'reversed':
				// Reverse the order
				return [...terms].reverse();

			case 'random':
				// Shuffle randomly
				const shuffled = [...terms];
				for (let i = shuffled.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
				}
				return shuffled;

			case 'duplicate':
				// First ordered, then reversed
				return [...terms, ...[...terms].reverse()];

			default:
				// Default to reversed
				return [...terms].reverse();
		}
	}

	/**
	 * Simply explains the insides as well as the name of the deck
	 */
	explain() {
		console.log('termGenerator content:');
		console.log(
			`From deck: ${this.deck_name} contains decks: ${this.decks.length}`
		);
		console.log(this.jsonTerms);
	}
}

class Queue {
	constructor() {
		this.queue = [];
	}

	enqueue(element) {
		this.queue.push(element);
	}

	dequeue() {
		return this.queue.shift();
	}

	front() {
		return this.queue[0];
	}

	size() {
		return this.queue.length;
	}

	isEmpty() {
		return this.size() === 0;
	}
}

class DeckMask {
	/**
	 *
	 * @param {string} mask_name Name of this mask, used as a sharable identifier
	 * @optionalparam {string[]} decksToEnableStrings
	 * @optionalparam {boolean} enabled; defaults to true
	 * @optionalparam {int} account_id; defaults to Settings.account_id
	 * @returns {DeckMask}
	 */
	constructor(
		mask_name,
		{
			decksToEnableStrings = [],
			enabled = true,
			account_id = Settings.account_id
		} = {}
	) {
		this.mask_name = mask_name;
		this.decksToEnable = decksToEnableStrings;
		this.enabled = enabled;
		this.account_id = account_id;
	}

	get asJson() {
		return {
			mask_name: this.mask_name,
			decks: this.decksToEnable,
			enabled: this.enabled,
			account_id: this.account_id
		};
	}
}

module.exports = {
	buildUniqueLabels,
	formatTwoPartLabel,
	cropTail,
	Term,
	Terminology,
	TermStorage,
	Queue,
	DeckMask
};
