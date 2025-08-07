class SimplifyPath {
	solve(path) {
		// Initialize a stack
		const stack = [];
		const components = path.split('/');

		// Split the input string on "/" as the delimiter
		// and process each portion one by one
		for (const directory of components) {
			// TODO A no-op for a "." or an empty string
		}

		// Stitch together all the directory names together
		const result = '/' + stack.join('/');
		return result || '/';
	}
}

module.exports = { Problem: SimplifyPath };
