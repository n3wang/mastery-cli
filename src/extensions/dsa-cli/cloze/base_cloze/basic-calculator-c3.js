class Calculate {
	evaluateExpr(stack) {
		// If the stack is empty or the expression starts with
		// a symbol, then append 0 to the stack.
		// i.e. [1, '-', 2, '-'] becomes [1, '-', 2, '-', 0]
		if (stack.length === 0 || typeof stack[stack.length - 1] !== 'number') {
			stack.push(0);
		}

		let res = stack.pop();

		// Evaluate the expression until we get a corresponding ')'
		while (stack.length > 0 && stack[stack.length - 1] !== ')') {
			const sign = stack.pop();

			if (sign === '+') {
				res += stack.pop();
			} else {
				res -= stack.pop();
			}
		}
		return res;
	}

	solve(s) {
		let operand = 0;
		let n = 0;
		const stack = [];

		// TODO Use a for loop to iterate over the string from the end to the beginning
		//  If the current character is a digit, then we need to form the operand by multiplying the digit with 10^digit_position and adding it to the operand
		// otherwise as long as it is not a space, we either push the operand, and reset.
		// If it is the start then we evaluate the expression of the stack and push the result
		// Otherwise we push the character (Will be a sign or a parenthesis) "(")

		// Push the last operand to the stack, if any.
		if (n !== 0) {
			stack.push(operand);
		}

		// Evaluate any remaining expressions in the stack.
		return this.evaluateExpr(stack);
	}
}

module.exports = { Problem: Calculate };
