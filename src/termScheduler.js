const { StorableQueue } = require('./StorableQueue');

const DEBUG = false;

class TermScheduler {
	constructor({
		working_set_length = null,
		cardsRefreshStrategy = new TermCardsOfflineStrategy(),
		cards_category = ''
	} = {}) {
		const Settings = require('./settings');
		this.working_set_length =
			working_set_length ??
			Settings?.queue_configurations?.term_scheduler_working_set_length ??
			5;
		const naming_post =
			cards_category === '' ? cards_category : '_' + cards_category;
		// Set loading as false for now. Too many bugs.
		this.working_set = new StorableQueue({
			name: 'working_set' + naming_post
		});
		this.learning_queue = new StorableQueue({
			name: 'learning_queue' + naming_post
		});
		this.learned_queue = new StorableQueue({
			name: 'learned_queue' + naming_post
		});
		this.cardsRefreshStrategy = cardsRefreshStrategy;
	}

	async loadQueues() {
		// Another problem has to do with updating terms. instead of adding them
		await this.working_set.load();
		await this.learning_queue.load();
		await this.learned_queue.load();
		return;
	}

	populateWorkingSet() {
		while (
			this.working_set.length < this.working_set_length &&
			!this.learning_queue.isEmpty
		) {
			const card = this.learning_queue.dequeue();
			if (DEBUG)
				console.log(
					'Learning_queue length',
					this.learning_queue.length
				);
			this.working_set.enqueue(card);
			if (DEBUG)
				console.log(
					'Populating Working Set with card',
					card,
					'count: ',
					this.working_set.length
				);
		}
	}

	getCard() {
		if (DEBUG) console.log('length: ', this.working_set.length);
		// If non left (then return false)
		if (this.working_set.isEmpty) {
			return false;
		}

		return this.working_set.peek();
	}

	/**
	 * Returns the cocards on the entire managmenet
	 */
	get cardsCount() {
		return (
			this.learning_queue.length +
			this.learned_queue.length +
			this.working_set.length
		);
	}

	/**
	 * Returns the amount of cards left to learn.
	 * @returns {number}
	 */
	getCardsToLearn() {
		return this.learning_queue.length + this.working_set.length;
	}

	getCardsLearnt() {
		// console.log(this.learned_queue.elements)
		return this.learned_queue.length;
	}

	get is_completed() {
		return this.getCardsToLearn() == 0;
	}

	/**
	 *
	 * @param {bool} wasCorrect If the solution was correct or not
	 * @returns {integer} count of cards left to be studied.
	 */
	solveCard(wasCorrect) {
		if (DEBUG)
			console.log('Learning_queue length', this.learning_queue.length);
		if (wasCorrect && !this.working_set.isEmpty) {
			// Then unqueue from learning queue into the last of the working_set and dequee the first one into nonethingness.

			const learnedCard = this.working_set.dequeue();
			this.learned_queue.enqueue(learnedCard);

			if (!this.learning_queue.isEmpty) {
				const newCard = this.learning_queue.dequeue();

				this.working_set.enqueue(newCard);
			}
		} else {
			// Then move the first ot the last
			const cardToRePractice = this.working_set.dequeue();
			this.working_set.enqueue(cardToRePractice);
		}
		this.saveCards();

		return this.getCardsToLearn();
	}

	cleanCards() {
		this.learned_queue.cleanQueue();
		this.learning_queue.cleanQueue();
		this.working_set.cleanQueue();
	}

	saveCards() {
		this.learned_queue.save();
		this.learning_queue.save();
		this.working_set.save();
	}

	/**
	 *
	 * @param {List<Card>} cards
	 * @param {bool} cleanIfDifferent If the cards are different from the ones already loaded, then clean the queues and load the new ones. Otherwise just add the new ones.
	 * @param {bool} onlyAddIfNotThere If true, then only add the cards that are not in any of the queues. Otherwise add all the cards.
	 * @param {bool} loadLastCardsFirst If true, then load the last cards first. Otherwise load the first cards first.
	 * @returns {Promise} Promise that resolves when the cards are loaded.
	 */
	async setLearningCards(
		cards,
		{
			cleanIfDifferent = true,
			onlyAddIfNotThere = true,
			loadLastCardsFirst = false,
			ask_if_to_use_old_queue = false,
			shuffle = false,
			reset_scheduler = false
		} = {}
	) {
		if (loadLastCardsFirst) {
			// Reverse the cards:list order
			cards = cards.reverse();
		} else if (shuffle) {
			cards = cards.sort(() => Math.random() - 0.5);
		}

		await this.loadQueues(); // Load first then compare if to add a card into the queue or not.

		//Add new cards
		if (cleanIfDifferent || reset_scheduler) {
			// Only populate if the amount of cards already loaded are less than the new cards that are found on the masterDeck

			if (this.cardsCount != cards.length || reset_scheduler) {
				// Clean all cards
				// Start from zero if the cards changed
				// console.log(`Difference in length ${this.cardsCount} ${cards.length}`);
				this.cleanCards();

				for (const card of cards) {
					if (onlyAddIfNotThere && this.cardInScheduler(card)) {
						// Skip if we want to only add the cards that are not in any of our scheduler's queues

						continue;
					}

					this.learning_queue.enqueue(card);
					if (DEBUG) console.log('Enqueueing, ', card);
				}

				this.populateWorkingSet(); // Otherwise it doens't require any populating from he working set.
			}
		}
	}

	/**
	 * Checks if specific card is in any of the working, learning, learnt queues. Used for adding only if not in the queues
	 * @param {json} card
	 * @returns {Boolean} if is there or not
	 */
	cardInScheduler(card) {
		if (
			this.learning_queue.has(card) ||
			this.working_set.has(card) ||
			this.learned_queue.has(card)
		) {
			return true;
		}
		return false;
	}

	refreshCards() {
		// Refresh the the cards on the learning queue by those who hadnt be learnt yet. (and are neither on the working set)

		// For now you can just dummy populate them.
		this.learned_queue.cleanQueue();
		this.learning_queue.cleanQueue();

		this.learning_queue.elements =
			this.cardsRefreshStrategy.getLearningQueue();
	}
}

class TermCardsRefreshStrategy {
	getLearningQueue() {
		throw new Error('Not implemented');
	}
}

class TermCardsOfflineStrategy extends TermCardsRefreshStrategy {
	getLearningQueue() {
		return {};
	}
}

module.exports = { TermScheduler };
