'use strict';

var _require = require('../utils/termScheduler'),
	TermScheduler = _require.TermScheduler,
	TermCardsOfflineStrategy = _require.TermCardsOfflineStrategy;

var _require2 = require('../utils/StorableQueue'),
	StorableQueue = _require2.StorableQueue;

var jest = require('jest');

describe('TermScheduler', function () {
	var termScheduler;
	beforeEach(function () {
		termScheduler = new TermScheduler({
			working_set_length: 5
		});
	});
	test('getCard should return the first card in the working set', function () {
		termScheduler.working_set.enqueue('card 1');
		expect(termScheduler.getCard()).toBe('card 1');
	});
	test('getCard should return false if the working set is empty', function () {
		expect(termScheduler.getCard()).toBe(false);
	});
	test('getCardsToLearn should return the total number of cards in the working set and learning queue', function () {
		termScheduler.working_set.enqueue('card 1');
		termScheduler.learning_queue.enqueue('card 2');
		expect(termScheduler.getCardsToLearn()).toBe(2);
	});
	test('getCardsLearnt should return the number of cards in the learned queue', function () {
		termScheduler.learned_queue.enqueue('card 1');
		termScheduler.learned_queue.enqueue('card 2');
		expect(termScheduler.getCardsLearnt()).toBe(2);
	});
	test('solveCard should move the first card from the working set to the learned queue if the solution was correct', function () {
		termScheduler.working_set.enqueue('card 1');
		termScheduler.solveCard(true);
		expect(termScheduler.learned_queue.peek()).toBe('card 1');
		expect(termScheduler.getCardsToLearn()).toBe(0);
	});
	test('solveCard should move the first card from the learning queue to the learned queue if the solution was incorrect', function () {
		termScheduler.learning_queue.enqueue('card 1');
		termScheduler.solveCard(false);
		expect(termScheduler.learned_queue.peek()).toBe('card 1');
		expect(termScheduler.getCardsToLearn()).toBe(0);
	});
	test('solveCard should move the first card from the learning queue to the working set if there are no more cards in the working set', function () {
		termScheduler.learning_queue.enqueue('card 1');
		termScheduler.solveCard(true);
		expect(termScheduler.working_set.peek()).toBe('card 1');
		expect(termScheduler.getCardsToLearn()).toBe(1);
	});
	test('saveCards should save the contents of all queues to storage', function () {
		var queueSpy = jest.spyOn(StorableQueue.prototype, 'save');
		termScheduler.saveCards();
		expect(queueSpy).toHaveBeenCalledTimes(3);
	});
	test('refreshCards should refresh the cards in the learning queue', function () {
		var refreshSpy = jest.spyOn(
			TermCardsOfflineStrategy.prototype,
			'getLearningQueue'
		);
		termScheduler.refreshCards();
		expect(refreshSpy).toHaveBeenCalledTimes(1);
		expect(termScheduler.getCardsToLearn()).toBeGreaterThan(0);
	});
});
