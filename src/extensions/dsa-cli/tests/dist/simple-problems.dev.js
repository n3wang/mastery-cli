'use strict';

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

function _typeof(obj) {
	if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
		_typeof = function _typeof(obj) {
			return typeof obj;
		};
	} else {
		_typeof = function _typeof(obj) {
			return obj &&
				typeof Symbol === 'function' &&
				obj.constructor === Symbol &&
				obj !== Symbol.prototype
				? 'symbol'
				: typeof obj;
		};
	}
	return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ('value' in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
		return call;
	}
	return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return self;
}

function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf
		? Object.getPrototypeOf
		: function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
		  };
	return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function'
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: { value: subClass, writable: true, configurable: true }
	});
	if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
	_setPrototypeOf =
		Object.setPrototypeOf ||
		function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};
	return _setPrototypeOf(o, p);
}

var assert = require('assert');

var ProblemTests = require('./problem-test');

var SimpleSum =
	/*#__PURE__*/
	(function (_ProblemTests) {
		_inherits(SimpleSum, _ProblemTests);

		function SimpleSum(Problem) {
			var _this;

			_classCallCheck(this, SimpleSum);

			_this = _possibleConstructorReturn(
				this,
				_getPrototypeOf(SimpleSum).call(this, Problem)
			);

			_this.tests.push(function () {
				return _this.test_1();
			});

			return _this;
		}

		_createClass(SimpleSum, [
			{
				key: 'test_1',
				value: function test_1() {
					this.current_test_name = 'sums 1 + 1 = 2';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(1, 1) == 2);
				}
			},
			{
				key: 'test_2',
				value: function test_2() {
					this.current_test_name = 'sums 2 + -2 = 0';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(2, -2) == 0);
				}
			}
		]);

		return SimpleSum;
	})(ProblemTests);

var SimpleDivision =
	/*#__PURE__*/
	(function (_ProblemTests2) {
		_inherits(SimpleDivision, _ProblemTests2);

		function SimpleDivision(Problem) {
			var _this2;

			_classCallCheck(this, SimpleDivision);

			_this2 = _possibleConstructorReturn(
				this,
				_getPrototypeOf(SimpleDivision).call(this, Problem)
			);

			_this2.tests.push(function () {
				return _this2.test_1();
			});

			_this2.tests.push(function () {
				return _this2.test_2();
			});

			return _this2;
		}

		_createClass(SimpleDivision, [
			{
				key: 'test_1',
				value: function test_1() {
					this.current_test_name = 'divides 10 by 2 and returns 5';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(10, 2) == 5);
				}
			},
			{
				key: 'test_2',
				value: function test_2() {
					this.current_test_name =
						'divides 10 by 0 and returns undefined';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(10, 0) == undefined);
				}
			}
		]);

		return SimpleDivision;
	})(ProblemTests);

var SimpleSubtraction =
	/*#__PURE__*/
	(function (_ProblemTests3) {
		_inherits(SimpleSubtraction, _ProblemTests3);

		function SimpleSubtraction(Problem) {
			var _this3;

			_classCallCheck(this, SimpleSubtraction);

			_this3 = _possibleConstructorReturn(
				this,
				_getPrototypeOf(SimpleSubtraction).call(this, Problem)
			);

			_this3.tests.push(function () {
				return _this3.test_1();
			});

			_this3.tests.push(function () {
				return _this3.test_2();
			});

			return _this3;
		}

		_createClass(SimpleSubtraction, [
			{
				key: 'test_1',
				value: function test_1() {
					this.current_test_name =
						'subtracts 5 from 10 and returns 5';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(10, 5) == 5);
				}
			},
			{
				key: 'test_2',
				value: function test_2() {
					this.current_test_name =
						'subtracts -5 from 5 and returns 10';
					var problemToTest = new this.Problem();
					assert(problemToTest.solve(5, -5) == 10);
				}
			}
		]);

		return SimpleSubtraction;
	})(ProblemTests);

var TEST_DICTIONARY = _defineProperty(
	{
		'simple-sum': SimpleSum,
		'simple-division': SimpleDivision
	},
	'simple-division',
	SimpleSubtraction
);

module.exports = TEST_DICTIONARY;
