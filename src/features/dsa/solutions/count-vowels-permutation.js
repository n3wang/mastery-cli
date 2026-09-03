class CountVowelsPermutation {
	solve(n) {
		return countVowelPermutation(n);
	}
}

module.exports = { Problem: CountVowelsPermutation };

const MOD = 1000000007;
function countVowelPermutation(n) {
	const cache = new Map();

	function vowelPermutationCount(i, vowel) {
		let total = 1;

		if (i > 1) {
			if (vowel === 'a') {
				total =
					(vowelPermutationCount(i - 1, 'e') +
						vowelPermutationCount(i - 1, 'i') +
						vowelPermutationCount(i - 1, 'u')) %
					MOD;
			} else if (vowel === 'e') {
				total =
					(vowelPermutationCount(i - 1, 'a') +
						vowelPermutationCount(i - 1, 'i')) %
					MOD;
			} else if (vowel === 'i') {
				total =
					(vowelPermutationCount(i - 1, 'e') +
						vowelPermutationCount(i - 1, 'o')) %
					MOD;
			} else if (vowel === 'o') {
				total = vowelPermutationCount(i - 1, 'i');
			} else {
				total =
					(vowelPermutationCount(i - 1, 'i') +
						vowelPermutationCount(i - 1, 'o')) %
					MOD;
			}
		}

		return total;
	}

	let result = 0;

	for (const vowel of 'aeiou') {
		result = (result + vowelPermutationCount(n, vowel)) % MOD;
	}

	return result;
}
