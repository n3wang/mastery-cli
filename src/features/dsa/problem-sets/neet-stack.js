const assert = require('assert');
const ProblemTests = require('./problem-test');

class CarFleet extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3] => 3';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]) == 3);
	}
	test_2() {
		this.current_test_name = '100, [0, 2, 4], [4, 2, 1] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(100, [0, 2, 4], [4, 2, 1]) == 1);
	}
}

class LargestRectangleArea extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[2,1,5,6,2,3] => 10';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([2, 1, 5, 6, 2, 3]) == 10);
	}
	test_2() {
		this.current_test_name = '[2,4] => 4';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([2, 4]) == 4);
	}
}

class MinStack extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		this.current_test_name = '[-2,0,-3] => -3, 0, -2';
		const minStack = new this.Problem();
		minStack.push(-2);
		minStack.push(0);
		minStack.push(-3);
		assert(minStack.getMin() == -3);
		minStack.pop();
		assert(minStack.top() == 0);
		assert(minStack.getMin() == -2);
	}

	test_2() {
		this.current_test_name = '[1,2,3] => 1, 3, 1';
		const minStack = new this.Problem();
		minStack.push(1);
		minStack.push(2);
		minStack.push(3);
		assert(minStack.getMin() == 1);
		minStack.pop();
		assert(minStack.top() == 2);
		assert(minStack.getMin() == 1);
	}

	test_3() {
		this.current_test_name = '[5,1,10,1] => 1, 10, 1';
		const minStack = new this.Problem();
		minStack.push(5);
		minStack.push(1);
		minStack.push(10);
		minStack.push(1);
		assert(minStack.getMin() == 1);
		minStack.pop();
		assert(minStack.top() == 10);
		assert(minStack.getMin() == 1);
	}

	test_4() {
		this.current_test_name = '[1] => 1, 1, 1';
		const minStack = new this.Problem();
		minStack.push(1);
		assert(minStack.getMin() == 1);
		assert(minStack.top() == 1);
		minStack.pop();
		assert(minStack.getMin() == null);
		assert(minStack.top() == null);
	}

	test_5() {
		this.current_test_name = '[] => null, null, null';
		const minStack = new this.Problem();
		assert(minStack.getMin() == null);
		assert(minStack.top() == null);
		assert(minStack.pop() == null);
	}
}

class ValidParentheses extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		this.current_test_name = '()[]{} => true';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve('()[]{}') == true);
	}

	test_2() {
		this.current_test_name = '(] => false';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve('(]') == false);
	}

	test_3() {
		this.current_test_name = '([)] => false';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve('([)]') == false);
	}

	test_4() {
		this.current_test_name = '{[]} => true';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve('{[]}') == true);
	}
}

class DailyTemperatures extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'[73, 74, 75, 71, 69, 72, 76, 73] => [1, 1, 4, 2, 1, 1, 0, 0]';
		const problemToTest = new this.Problem();
		assert(
			problemToTest.solve([73, 74, 75, 71, 69, 72, 76, 73]).toString() ==
				[1, 1, 4, 2, 1, 1, 0, 0].toString()
		);
	}

	test_2() {
		this.current_test_name = '[30, 40, 50, 60] => [1, 1, 1, 0]';
		const problemToTest = new this.Problem();
		assert(
			problemToTest.solve([30, 40, 50, 60]).toString() ==
				[1, 1, 1, 0].toString()
		);
	}
}

class GenerateParentesis extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'3 => ["((()))","(()())","(())()","()(())","()()()"]';
		const problemToTest = new this.Problem();
		assert(
			problemToTest.solve(3).toString() ==
				['((()))', '(()())', '(())()', '()(())', '()()()'].toString()
		);
	}

	test_2() {
		this.current_test_name = '1 => ["()"]';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(1).toString() == ['()'].toString());
	}
}

class EvalRPN extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '["2", "1", "+", "3", "*"] => 9';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(['2', '1', '+', '3', '*']) == 9);
	}

	test_2() {
		this.current_test_name = '["4", "13", "5", "/", "+"] => 6';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(['4', '13', '5', '/', '+']) == 6);
	}
}

const TEST_DICTIONARY = {
	'valid-parentheses': ValidParentheses,
	'min-stack': MinStack,
	'evaluate-polish-reverse-notation': EvalRPN,
	'generate-parenthesis': GenerateParentesis,
	'daily-temperatures': DailyTemperatures,
	'car-fleet': CarFleet,
	'largest-rectangle-area': LargestRectangleArea
};

module.exports = TEST_DICTIONARY;
