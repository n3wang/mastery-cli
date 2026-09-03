class WordPattern {
	solve(pattern, s) {
		const map_index = new Map();
		const words = s.split(' ');

		if (words.length !== pattern.length) return false;

		for (let i = 0; i < words.length; i++) {
			const c = pattern.charAt(i);
			const w = words[i];

			if (!map_index.has(c)) map_index.set(c, i);

			if (!map_index.has(w)) map_index.set(w, i);

			if (map_index.get(c) !== map_index.get(w)) return false;
		}

		return true;
	}
}
module.exports = { Problem: WordPattern };
