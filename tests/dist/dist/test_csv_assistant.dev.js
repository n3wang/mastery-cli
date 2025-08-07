'use strict';

var assert = require('assert');

var CSVAssistant = reqiure('../utils/CSVAssistant');
describe('Testing Terms Generator', function () {
	it('Test if it is able to read and populate the terms json ', function _callee() {
		var listSovledRows;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						listSovledRows = CSVAssistant();
						console.log(listSovledRows);

					case 2:
					case 'end':
						return _context.stop();
				}
			}
		});
	});
});
