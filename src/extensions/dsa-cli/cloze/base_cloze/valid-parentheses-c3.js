class IsValidParenthesis {
	solve(s, stack = []) {
		const map = {
			'}': '{',
			']': '[',
			')': '('
		};

		for (const char of s) {
			/* Time O(N) */
			// TODO Complete the entire algorithm
		}

		return stack.length === 0;
	}
}

module.exports = { Problem: IsValidParenthesis };
