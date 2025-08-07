class LongestStringChain {
	solve(words) {
		const dp = new Map();

		// Sorting the list in terms of the word length.
		words.sort((a, b) => a.length - b.length);

		let longestWordSequenceLength = 1;

		for (const word of words) {
			let presentLength = 1;
			// Find all possible predecessors for the current word by removing one letter at a time.
			for (let i = 0; i < word.length; i++) {
				const temp = word.slice(0, i) + word.slice(i + 1);
				const predecessor = temp.toString();
				const previousLength = dp.get(predecessor) || 0;
				presentLength = Math.max(presentLength, previousLength + 1);
			}
			dp.set(word, presentLength);
			longestWordSequenceLength = Math.max(
				longestWordSequenceLength,
				presentLength
			);
		}
		return longestWordSequenceLength;
	}
}

module.exports = { Problem: LongestStringChain };
