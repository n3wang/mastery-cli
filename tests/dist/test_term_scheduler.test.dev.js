'use strict';

var _require = require('../utils/termScheduler'),
	TermScheduler = _require.TermScheduler,
	TermCardsOfflineStrategy = _require.TermCardsOfflineStrategy;

var _require2 = require('../utils/StorableQueue'),
	StorableQueue = _require2.StorableQueue;

var assert = require('assert');

var _require3 = require('../utils/constants'),
	termsEnabled = _require3.termsEnabled;

describe('TermScheduler getCard', function () {
	it('should return false when the working set is empty', function () {
		var termScheduler = new TermScheduler();
		var card = termScheduler.getCard();
		assert.strictEqual(card, false);
	});
	it('should return the first card in the working set when it is not empty', function () {
		var termScheduler = new TermScheduler();
		var card = {
			term: 'term',
			definition: 'definition'
		};
		termScheduler.working_set.enqueue(card);
		assert(termScheduler.getCard(), card);
	});
	it('should return the total amount of cards to learn', function () {
		var cards = [
			{
				term: 'term1',
				definition: 'definition1'
			},
			{
				term: 'term2',
				definition: 'definition2'
			}
		];
		var termScheduler = new TermScheduler({
			cards: cards
		});
		assert.strictEqual(termScheduler.getCardsToLearn(), 2);
	});
	it('should return the total amount of cards to learn', function () {
		var cards = [
			{
				term: 'term1',
				definition: 'definition1'
			},
			{
				term: 'term2',
				definition: 'definition2'
			}
		];
		var termScheduler = new TermScheduler({
			cards: cards
		});
		assert.strictEqual(termScheduler.getCardsToLearn(), 2);
	});
});
describe('Testing Behaviour', function () {
	var termScheduler;
	var cards = [
		{
			term: 'term1',
			definition: 'definition1'
		},
		{
			term: 'term2',
			definition: 'definition2'
		},
		{
			term: 'term3',
			definition: 'definition3'
		},
		{
			term: 'term4',
			definition: 'definition4'
		},
		{
			term: 'term5',
			definition: 'definition5'
		},
		{
			term: 'term6',
			definition: 'definition6'
		},
		{
			term: 'term7',
			definition: 'definition7'
		},
		{
			term: 'term8',
			definition: 'definition8'
		},
		{
			term: 'term9',
			definition: 'definition9'
		},
		{
			term: 'term10',
			definition: 'definition10'
		}
	];
	beforeEach(function () {
		termScheduler = new TermScheduler({
			cards: cards
		});
	});
	afterEach(function () {
		termScheduler.cleanCards();
		termScheduler.saveCards();
	});
	it('should add the first card to the working set when starting', function () {
		assert(termScheduler.working_set.length != 0);
		assert.deepEqual(termScheduler.getCard(), cards[0]);
	});
	it('should add the next card to the working set after a card is correctly answered', function () {
		var firstCard = termScheduler.working_set.peek();
		termScheduler.solveCard(true);
		var secondCard = termScheduler.working_set.peek();
		assert.notStrictEqual(firstCard, secondCard); //Shouldnt be equal
	});
	it('When incorrectly answered, it should be put on the end of the last queue.', function () {
		var firstCard = termScheduler.working_set.peek();
		var toLearn = termScheduler.getCardsToLearn();
		termScheduler.solveCard(false);
		var secondCard = termScheduler.working_set.peek(); //Take the alst one.

		assert.notStrictEqual(firstCard, secondCard);
		assert.strictEqual(termScheduler.learned_queue.length, 0);
		assert.strictEqual(termScheduler.getCardsToLearn(), toLearn);
		assert.strictEqual(termScheduler.working_set.lastElement, firstCard);
	});
	it('Removes all cards when all correctly answered, cant learn the last card if basically the card is not left', function () {
		var cardsCount = cards.length; //Plus some extra interactions

		for (var i = 0; i < cardsCount + 2; i++) {
			termScheduler.solveCard(true);
		}

		assert.strictEqual(termScheduler.learning_queue.length, 0); // No cards to have

		assert.strictEqual(termScheduler.working_set.length, 0); // No cards to have

		assert.strictEqual(termScheduler.learned_queue.length, cardsCount); // Should contain all cards
		// Shouldnt be able to solve this card if there is more.
	});
});
