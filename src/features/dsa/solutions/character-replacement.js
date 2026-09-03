/**
 * Time O(((N + 26) * N) * (M - N)) | Space O(1)
 * This code solves the same problem as before, which is finding the length of the longest substring containing the same letter that can be obtained after performing at most k operations on the input string s.

The approach used in this code is to use a sliding window to keep track of the longest substring containing the same letter that can be obtained with at most k operations.

The code defines three functions to help with this approach:

    addRightFrequency - adds the frequency of the character on the right of the window to a frequency map.
    subtractLeftFrequency - subtracts the frequency of the character on the left of the window from the frequency map.
    getCode - converts a character to an index code by subtracting the ASCII code of 'A'.

My guess is that this approach focuses on calculating everything (every posibility) by sliding and having a right and left update.

Also something interesting is that the mappings, 

 s = "abcdeffggg", k = 2

Left|R |W | Current|L |CanSlide|Max|Frequency Map

0	0	1	a		1	true	1	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
0	1	2	ab		1	true	2	[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
0	2	3	abc		1	true	3	[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
1	3	3	bcd		1	true	3	[1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
2	4	3	cde		1	true	3	[1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
3	5	3	def		1	true	3	[1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
4	6	2	fg		3	true	3	[1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0]
5	7	3	fgg		3	true	3	[1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0]
5	8	4	fggg	3	false	4	[1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1]

 */

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
		const subtractLeftFrequency = (s, left, map) => {
			const char = s[left];
			const index = getCode(char);

			map[index]--;

			return map[index];
		};

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
