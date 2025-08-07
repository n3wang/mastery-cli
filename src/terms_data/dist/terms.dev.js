'use strict';

/**
 * <RULES>
 *
 * 1 Creating Collections: It makes sense to create collection for e.g. functions on an array and their hipothetical use.
 * 2 Strategy > Term:, Or at least bundle a collection of terms, to make it worth more.
 */
var _require = require('../structures'),
	TermStorage = _require.TermStorage;
/**
 *
 * @returns Master Deck containing all the cards
 */

function populateMasterDeck() {
	var decks,
		_require2,
		react_terms,
		_require3,
		network,
		artificialIntelligence,
		algebra,
		calculousOne,
		_require4,
		pragmatic_programmer,
		_require5,
		designPatterns,
		dsa,
		system_design,
		_require6,
		aws_services,
		aws_glossary,
		coderTerms,
		unit_testing,
		filesData,
		_require7,
		TermGenerator,
		termGenerator,
		_,
		strategyFilesData,
		strategyGenerator,
		__;

	return regeneratorRuntime.async(function populateMasterDeck$(_context) {
		while (1) {
			switch ((_context.prev = _context.next)) {
				case 0:
					terms = [];
					decks = new TermStorage([], 'Academic Terms');
					(_require2 = require('./frameworks')),
						(react_terms = _require2.react_terms);
					decks.addDeck(
						new TermStorage(react_terms, 'react terms', {
							is_active: true
						})
					);
					(_require3 = require('./spring-senior')),
						(network = _require3.network),
						(artificialIntelligence =
							_require3.artificialIntelligence),
						(algebra = _require3.algebra),
						(calculousOne = _require3.calculousOne);
					decks.addDeck(
						new TermStorage(network, 'network', {
							is_active: true
						})
					);
					decks.addDeck(
						new TermStorage(
							artificialIntelligence,
							'artificial intelligence',
							{
								is_active: true
							}
						)
					);
					decks.addDeck(
						new TermStorage(algebra, 'algebra', {
							is_active: true
						})
					);
					decks.addDeck(
						new TermStorage(calculousOne, 'calculus one', {
							is_active: true
						})
					);
					(_require4 = require('./ethics.js')),
						(pragmatic_programmer = _require4.pragmatic_programmer);
					decks.addDeck(
						new TermStorage(
							pragmatic_programmer,
							'pragmatic programmer',
							{
								is_active: true
							}
						)
					);
					(_require5 = require('./dsa')),
						(designPatterns = _require5.designPatterns),
						(dsa = _require5.dsa),
						(system_design = _require5.system_design);
					decks.addDeck(
						new TermStorage(designPatterns, 'design patterns', {
							is_active: true
						})
					);
					decks.addDeck(new TermStorage(dsa));
					decks.addDeck(
						new TermStorage(system_design, 'system design', {
							is_active: true
						})
					);
					(_require6 = require('./programmer_experience')),
						(aws_services = _require6.aws_services),
						(aws_glossary = _require6.aws_glossary),
						(coderTerms = _require6.coderTerms),
						(unit_testing = _require6.unit_testing);
					decks.addDeck(
						new TermStorage(aws_glossary, 'aws glossary', {
							is_active: true
						})
					);
					decks.addDeck(
						new TermStorage(aws_services, 'aws services', {
							is_active: true
						})
					);
					decks.addDeck(
						new TermStorage(coderTerms, 'coder terms', {
							is_active: true
						})
					);
					decks.addDeck(
						new TermStorage(unit_testing, 'unit testing', {
							is_active: true
						})
					); // decks.addDeck(new TermStorage(test, "test", {is_active: true}));
					// Generic Term Generators

					filesData = [
						{
							title: 'mock-v1',
							filename: 'terms/mock.csv'
						}
					];
					(_require7 = require('./terms_generator')),
						(TermGenerator = _require7.TermGenerator);
					termGenerator = new TermGenerator(filesData);
					_context.next = 25;
					return regeneratorRuntime.awrap(termGenerator.fetchTerms());

				case 25:
					_ = _context.sent;
					decks.addDecks(termGenerator.termStorageList());
					strategyFilesData = [
						{
							filename: 'terms/strat_cloud_patterns.csv',
							title: 'Cloud-pattern'
						}
					];
					strategyGenerator = new TermGenerator(strategyFilesData, {
						default_prompt: 'How could you use this?'
					});
					_context.next = 31;
					return regeneratorRuntime.awrap(
						strategyGenerator.fetchTerms()
					);

				case 31:
					__ = _context.sent;
					decks.addDecks(strategyGenerator.termStorageList());
					return _context.abrupt('return', decks);

				case 34:
				case 'end':
					return _context.stop();
			}
		}
	});
}

var termJson = [];
module.exports = {
	termJson: termJson,
	populateMasterDeck: populateMasterDeck
};
