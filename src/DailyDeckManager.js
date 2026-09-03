const fs = require('fs');
const path = require('path');
const { vaultPath } = require('./vault');

class DailyDeckManager {
	constructor(settings = {}) {
		this.settings = settings;
		this.storageFile = vaultPath('progress/daily-decks.json');
		this.dailyDecks = {};
		this.load();
	}

	load() {
		try {
			if (fs.existsSync(this.storageFile)) {
				const data = fs.readFileSync(this.storageFile, 'utf8');
				this.dailyDecks = JSON.parse(data);
			} else {
				this.dailyDecks = {};
			}
		} catch (error) {
			console.error('Error loading daily decks:', error.message);
			this.dailyDecks = {};
		}
	}

	save() {
		try {
			const dir = path.dirname(this.storageFile);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.writeFileSync(
				this.storageFile,
				JSON.stringify(this.dailyDecks, null, 2),
				'utf8'
			);
		} catch (error) {
			console.error('Error saving daily decks:', error.message);
		}
	}

	getDateKey(date = new Date()) {
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();
		return `${month}-${day}-${year}`;
	}

	getTodayDeck() {
		const todayKey = this.getDateKey();
		return this.dailyDecks[todayKey] || null;
	}

	getDeckForDate(date) {
		const dateKey = this.getDateKey(date);
		return this.dailyDecks[dateKey] || null;
	}

	getAllAvailableDecks(masterDeck) {
		const dictOptions = masterDeck.deck_titles_with_count;
		const availableDecks = [];

		for (const deckTitle of Object.keys(dictOptions)) {
			const deckName = dictOptions[deckTitle].name;
			const deckTerms = masterDeck.listTerms({
				get_only: [deckName]
			});

			if (deckTerms.length >= 10) {
				availableDecks.push({
					title: deckTitle,
					name: deckName,
					count: deckTerms.length,
					terms: deckTerms
				});
			}
		}

		return availableDecks;
	}

	async generateDailyDeck(masterDeck, options = {}) {
		const {
			cardsPerDeck = 5,
			maxTotalCards = 20,
			dateOffset = 0,
			interactive = true
		} = options;

		const targetDate = new Date();
		targetDate.setDate(targetDate.getDate() + dateOffset);
		const dateKey = this.getDateKey(targetDate);

		if (this.dailyDecks[dateKey]) {
			console.log(`Daily deck for ${dateKey} already exists`);
			return this.dailyDecks[dateKey];
		}

		const availableDecks = this.getAllAvailableDecks(masterDeck);

		if (availableDecks.length === 0) {
			console.log(
				'No decks with 10+ cards available to generate daily deck'
			);
			return null;
		}

		let decksToUse = [];

		if (interactive && dateOffset === 0) {
			const { Survey } = require('enquirer');

			const shuffledDecks = availableDecks.sort(
				() => Math.random() - 0.5
			);
			const randomThree = shuffledDecks.slice(
				0,
				Math.min(3, shuffledDecks.length)
			);

			console.log("\nSelect decks for today's study session:");
			console.log('(Choose decks to include in your daily deck)\n');

			const deckChoices = randomThree.map(deck => ({
				name: deck.name,
				message: `${deck.title} (${deck.count} cards available)`,
				initial: true
			}));

			const surveyPrompt = new Survey({
				name: 'selectedDecks',
				message: 'Select which decks to include:',
				choices: deckChoices
			});

			const selectedResult = await surveyPrompt.run();
			const selectedDeckNames = Object.keys(selectedResult).filter(
				key => selectedResult[key]
			);

			if (selectedDeckNames.length === 0) {
				console.log('No decks selected. Using all 3 random decks.');
				decksToUse = randomThree;
			} else {
				decksToUse = availableDecks.filter(deck =>
					selectedDeckNames.includes(deck.name)
				);
			}
		} else {
			const shuffledDecks = availableDecks.sort(
				() => Math.random() - 0.5
			);
			decksToUse = shuffledDecks.slice(
				0,
				Math.min(3, shuffledDecks.length)
			);
		}

		const selectedCards = [];
		let cardsRemaining = maxTotalCards;
		let deckIndex = 0;

		while (cardsRemaining > 0 && deckIndex < decksToUse.length) {
			const deck = decksToUse[deckIndex];
			const deckTerms = deck.terms;

			const cardsToTake = Math.min(
				cardsPerDeck,
				cardsRemaining,
				deckTerms.length
			);

			const shuffledTerms = deckTerms.sort(() => Math.random() - 0.5);
			const selectedTerms = shuffledTerms.slice(0, cardsToTake);

			selectedCards.push({
				deck_name: deck.name,
				deck_title: deck.title,
				cards: selectedTerms,
				count: cardsToTake
			});

			cardsRemaining -= cardsToTake;
			deckIndex++;
		}

		const dailyDeck = {
			date: dateKey,
			generated_at: new Date().toISOString(),
			total_cards: maxTotalCards - cardsRemaining,
			decks: selectedCards
		};

		this.dailyDecks[dateKey] = dailyDeck;
		this.save();

		return dailyDeck;
	}

	async prepareWeekAhead(masterDeck, options = {}) {
		const { cardsPerDeck = 5, maxTotalCards = 20, daysAhead = 7 } = options;

		const generatedDecks = [];

		for (let i = 0; i < daysAhead; i++) {
			const deck = await this.generateDailyDeck(masterDeck, {
				cardsPerDeck,
				maxTotalCards,
				dateOffset: i,
				interactive: i === 0
			});

			if (deck) {
				generatedDecks.push(deck);
			}
		}

		return generatedDecks;
	}

	getAllTermsFromDailyDeck(dailyDeck) {
		if (!dailyDeck) return [];

		const allTerms = [];
		for (const deckInfo of dailyDeck.decks) {
			allTerms.push(...deckInfo.cards);
		}

		return allTerms;
	}

	cleanOldDecks(daysToKeep = 30) {
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

		const dateKeys = Object.keys(this.dailyDecks);
		let removedCount = 0;

		for (const dateKey of dateKeys) {
			const parts = dateKey.split('-');
			const deckDate = new Date(
				parseInt(parts[2]),
				parseInt(parts[0]) - 1,
				parseInt(parts[1])
			);

			if (deckDate < cutoffDate) {
				delete this.dailyDecks[dateKey];
				removedCount++;
			}
		}

		if (removedCount > 0) {
			this.save();
			console.log(`Removed ${removedCount} old daily decks`);
		}

		return removedCount;
	}

	listAvailableDates() {
		return Object.keys(this.dailyDecks).sort();
	}

	getTodaySummary() {
		const todayDeck = this.getTodayDeck();
		if (!todayDeck) {
			return 'No daily deck prepared for today';
		}

		let summary = `Daily Deck for ${todayDeck.date}\n`;
		summary += `Total Cards: ${todayDeck.total_cards}\n`;
		summary += `Decks included:\n`;

		for (const deckInfo of todayDeck.decks) {
			summary += `  - ${deckInfo.deck_title}: ${deckInfo.count} cards\n`;
		}

		return summary;
	}

	getCompletionStatus(dailyDeck) {
		if (!dailyDeck || !dailyDeck.decks || dailyDeck.decks.length === 0) {
			return { completed: 0, total: 0, isComplete: false };
		}

		const total = dailyDeck.total_cards || 0;
		const completed = dailyDeck.completed_cards || 0;

		return {
			completed,
			total,
			isComplete: completed >= total
		};
	}

	markCardCompleted(dateKey, deckName, cardIndex) {
		const dailyDeck = this.dailyDecks[dateKey];
		if (!dailyDeck) return false;

		if (!dailyDeck.completed_cards) {
			dailyDeck.completed_cards = 0;
		}

		if (!dailyDeck.completed_by_deck) {
			dailyDeck.completed_by_deck = {};
		}

		if (!dailyDeck.completed_by_deck[deckName]) {
			dailyDeck.completed_by_deck[deckName] = [];
		}

		if (!dailyDeck.completed_by_deck[deckName].includes(cardIndex)) {
			dailyDeck.completed_by_deck[deckName].push(cardIndex);
			dailyDeck.completed_cards++;
			this.save();
			return true;
		}

		return false;
	}

	getWeekAheadSummary() {
		const summary = [];
		const today = new Date();

		for (let i = 0; i < 7; i++) {
			const date = new Date(today);
			date.setDate(date.getDate() + i);
			const dateKey = this.getDateKey(date);
			const deck = this.dailyDecks[dateKey];

			if (deck) {
				const status = this.getCompletionStatus(deck);
				summary.push({
					date: dateKey,
					dayName: date.toLocaleDateString('en-US', {
						weekday: 'short'
					}),
					exists: true,
					completed: status.completed,
					total: status.total,
					isComplete: status.isComplete
				});
			} else {
				summary.push({
					date: dateKey,
					dayName: date.toLocaleDateString('en-US', {
						weekday: 'short'
					}),
					exists: false,
					completed: 0,
					total: 0,
					isComplete: false
				});
			}
		}

		return summary;
	}
}

module.exports = { DailyDeckManager };
