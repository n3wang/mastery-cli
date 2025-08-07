class LenghtOfLongestSubString {
	solve(s) {
		const set = new Set();
		// ('a', 'b')

		let l = 0;
		let max = 0;

		for (let r = 0; r < s.length; r++) {
			// This is the case if the rightmost character being iterated is still there. So (a, a, a,) would add that and do this: a gets added a gets removed because is the first character,
			while (set.has(s[r])) {
				// Delete the set's from the left to the top until that cletter is found. While the set still has that last letter being iterated. Makes sure that all the ones on the left get removed. I dont get why it just doesnt remove them all. || p, w, w, k, e, w || +p, +w, -p -w +w, +e, +w => Is this faster because delete all just doesn't work?
				set.delete(s[l]);
				l++;
			}

			// TODO: Add the rightmost letter then rotate and check if the newest subset ends up being indeed the largest.

			// Add the rightmost letter then.

			// You have to update the set size and the current max. Here to check if the newest subset ends up being indeed the largest.
		}
		return max;
	}
}

module.exports = { Problem: LenghtOfLongestSubString };
