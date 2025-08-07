class IsValidParenthesis {
	solve(s, stack = []) {
		const map = {
			'}': '{',
			']': '[',
			')': '('
		};

		for (const char of s) {
			/* Time O(N) */
			const isBracket = char in map;
			if (!isBracket) {
				stack.push(char);
				continue;
			} /* Space O(N) */

			// TODO Complete where is equal it should pop out the function

			return false;
		}

		return stack.length === 0;
	}
}

module.exports = { Problem: IsValidParenthesis };
