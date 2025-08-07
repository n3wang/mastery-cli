class IsValidParenthesis {
	solve(s, stack = []) {
		const map = {
			'}': '{',
			']': '[',
			')': '('
		};

		for (const char of s) {
			/* Time O(N) */

			// TODO Complete isBracket and push it in the stack

			/* Space O(N) */
			const isEqual = stack[stack.length - 1] === map[char];
			if (isEqual) {
				stack.pop();
				continue;
			}

			return false;
		}

		return stack.length === 0;
	}
}

module.exports = { Problem: IsValidParenthesis };
