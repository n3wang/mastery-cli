class Calculate {
	evaluateExpr(stack) {
		// If the stack is empty or the expression starts with
		// a symbol, then append 0 to the stack.
		// i.e. [1, '-', 2, '-'] becomes [1, '-', 2, '-', 0]
		if (stack.length === 0 || typeof stack[stack.length - 1] !== 'number') {
			stack.push(0);
		}

		// TODO Initialize res as the last element of the stack. Thne based on the sign sum or rest the next stack element
	}

	solve(s) {
		let operand = 0;
		let n = 0;
		const stack = [];

		for (let i = s.length - 1; i >= 0; i--) {
			const ch = s.charAt(i);

			if (/\d/.test(ch)) {
				// Forming the operand - in reverse order.
				operand = Math.pow(10, n) * parseInt(ch, 10) + operand;
				n += 1;
			} else if (ch !== ' ') {
				if (n !== 0) {
					// Save the operand on the stack
					// As we encounter some non-digit.
					stack.push(operand);
					n = 0;
					operand = 0;
				}
				if (ch === '(') {
					const res = this.evaluateExpr(stack);
					stack.pop();

					// Append the evaluated result to the stack.
					// This result could be of a sub-expression within the parenthesis.
					stack.push(res);
				} else {
					// For other non-digits just push onto the stack.
					stack.push(ch);
				}
			}
		}

		// Push the last operand to the stack, if any.
		if (n !== 0) {
			stack.push(operand);
		}

		// Evaluate any remaining expressions in the stack.
		return this.evaluateExpr(stack);
	}
}

module.exports = { Problem: Calculate };
