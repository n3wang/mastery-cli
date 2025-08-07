class NumberOfWaysToFormATargetStringGivenADictionary {
	constructor() {
		this.ALPHABET_SIZE = 26;
		this.MOD = 1000000007;
	}

	solve(words, target) {
		const targetLength = target.length;
		const wordLength = words[0].length;
		const charOccurrences = Array.from({ length: this.ALPHABET_SIZE }, () =>
			new Array(wordLength).fill(0)
		);

		for (let col = 0; col < wordLength; col++) {
			for (const word of words) {
				charOccurrences[word.charCodeAt(col) - 'a'.charCodeAt(0)][
					col
				]++;
			}
		}

		const dp = Array.from({ length: targetLength + 1 }, () =>
			new Array(wordLength + 1).fill(-1)
		);

		const calculateDp = (length, col) => {
			if (col === 0) {
				return length === 0 ? 1 : 0;
			}

			if (dp[length][col] !== -1) {
				return dp[length][col];
			}

			dp[length][col] = calculateDp(length, col - 1);

			if (length > 0) {
				dp[length][col] +=
					charOccurrences[
						target.charCodeAt(length - 1) - 'a'.charCodeAt(0)
					][col - 1] * calculateDp(length - 1, col - 1);
			}

			dp[length][col] %= this.MOD;
			return dp[length][col];
		};

		return calculateDp(targetLength, wordLength);
	}
}

module.exports = { Problem: NumberOfWaysToFormATargetStringGivenADictionary };
