class LexicographicallySmallestEquivalentString {
	solve(s1, s2, baseStr) {
		return smallestEquivalentString(s1, s2, baseStr);
	}
}

function smallestEquivalentString(s1, s2, baseStr) {
	const representative = new Array(26);

	for (let i = 0; i < 26; i++) {
		representative[i] = i;
	}

	// Returns the root representative of the component.
	function find(x) {
		if (representative[x] === x) {
			return x;
		}
		return (representative[x] = find(representative[x]));
	}

	// Perform union if x and y aren't in the same component.
	function performUnion(x, y) {
		x = find(x);
		y = find(y);

		if (x === y) {
			return;
		}

		// Make the smaller character representative.
		if (x < y) {
			representative[y] = x;
		} else {
			representative[x] = y;
		}
	}

	let ans = '';

	// Perform union merge for all the edges.
	for (let i = 0; i < s1.length; i++) {
		performUnion(
			s1.charCodeAt(i) - 'a'.charCodeAt(0),
			s2.charCodeAt(i) - 'a'.charCodeAt(0)
		);
	}

	// Create the answer string with final mappings.
	for (const c of baseStr) {
		ans += String.fromCharCode(
			find(c.charCodeAt(0) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0)
		);
	}

	return ans;
}

module.exports = { Problem: LexicographicallySmallestEquivalentString };
