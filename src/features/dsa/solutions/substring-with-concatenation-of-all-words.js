class SubstringWithConcatenationOfAllWords {
	solve(s, words) {
		return this.findSubstring(s, words);
	}

	findSubstring(s, words) {
		const n = s.length;
		const k = words.length;
		const wordLength = words[0].length;
		const substringSize = wordLength * k;
		const wordCount = new Map();

		for (const word of words) {
			wordCount.set(word, (wordCount.get(word) || 0) + 1);
		}

		function slidingWindow(left) {
			const wordsFound = new Map();
			let wordsUsed = 0;
			let excessWord = false;

			for (let right = left; right < n; right += wordLength) {
				if (right + wordLength > n) {
					break;
				}

				const sub = s.slice(right, right + wordLength);
				if (!wordCount.has(sub)) {
					wordsFound.clear();
					wordsUsed = 0;
					excessWord = false;
					left = right + wordLength;
				} else {
					while (right - left === substringSize || excessWord) {
						const leftmostWord = s.slice(left, left + wordLength);
						left += wordLength;
						wordsFound.set(
							leftmostWord,
							(wordsFound.get(leftmostWord) || 0) - 1
						);

						if (
							wordsFound.get(leftmostWord) ===
							wordCount.get(leftmostWord)
						) {
							excessWord = false;
						} else {
							wordsUsed -= 1;
						}
					}

					wordsFound.set(sub, (wordsFound.get(sub) || 0) + 1);
					if (
						(wordsFound.get(sub) || 0) <= (wordCount.get(sub) || 0)
					) {
						wordsUsed += 1;
					} else {
						excessWord = true;
					}

					if (wordsUsed === k && !excessWord) {
						answer.push(left);
					}
				}
			}
		}

		const answer = [];
		for (let i = 0; i < wordLength; i++) {
			slidingWindow(i);
		}

		return answer;
	}
}

module.exports = { Problem: SubstringWithConcatenationOfAllWords };
