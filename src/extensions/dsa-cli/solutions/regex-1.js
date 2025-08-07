class RegexProblem {
	solve(input_string) {
		var regexPattern = /hackerrank/g;
		var matchesArray = input_string.match(regexPattern);
		return matchesArray;
	}
}

module.exports = { Problem: RegexProblem };
