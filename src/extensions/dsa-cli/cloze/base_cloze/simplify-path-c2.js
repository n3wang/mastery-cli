class SimplifyPath {
	solve(path) {
		// Initialize a stack
		const stack = [];
		const components = path.split('/');

		// Split the input string on "/" as the delimiter
		// and process each portion one by one
		for (const directory of components) {
			// A no-op for a "." or an empty string
			if (directory === '.' || directory === '') {
				continue;
			} else if (directory === '..') {
				// If the current component is a "..", then
				// we pop an entry from the stack if it's non-empty
				if (stack.length > 0) {
					stack.pop();
				}
			} else {
				// Finally, a legitimate directory name, so we add it
				// to our stack
				stack.push(directory);
			}
		}

		// TODO Stitch together all the directory names together
	}
}

module.exports = { Problem: SimplifyPath };
