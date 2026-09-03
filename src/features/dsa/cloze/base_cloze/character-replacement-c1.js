class CharacterReplacement {
	solve(s, k) {
		// Add Right Frequency to the map.
		const addRightFrequency = (s, right, map) => {
			// Gets the character on the right, and the index code there,
			const char = s[right];
			const index = getCode(char);
			// Increase that on the map of counts
			map[index]++;

			return map[index];
		};

		// Substract the frequency on the left
		//TODO Create a method to substract the frequency on the left once the window has been slided

		// Getting the encode by substracting the character with A characterCode
		const getCode = char => char.charCodeAt(0) - 'A'.charCodeAt(0);

		// Lets the left, right, longest to be all 0 at the start
		let [left, right, longest, max] = new Array(4).fill(0);
		const frequencyMap = new Array(26).fill(0);

		while (right < s.length) {
			// Starting with the right Keep increasing the right boundaries frequencies until reaches max length
			const count = addRightFrequency(s, right, frequencyMap);

			// longest being either the current count of that letter, or the longest letter seen on the past. Longest being the count of word with the longest leter found
			longest = Math.max(longest, count);

			// Get the windoes length
			let window = right - left + 1;

			// We can move the slider where `k` beign the amount of changes we can make, and windows - longest beng the longest letter seen (that we can ignore because it moves at the same time) and the distance of letters.
			const canSlide = k < window - longest;
			if (canSlide) {
				// If we can slide then we need to update the frequency map of the current letters being seen.
				subtractLeftFrequency(s, left, frequencyMap);
				left++;
			}

			// Recalculate the windows size after sliding
			window = right - left + 1;

			//Max Length is the length of the longest substring containing the same letter that can be obtained after performing at most k operations.
			max = Math.max(max, window);

			right++;
		}

		return max;
	}
}

module.exports = { Problem: CharacterReplacement };
