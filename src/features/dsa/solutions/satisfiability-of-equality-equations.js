class SatisfiabilityOfEqualityEquations {
	solve(equations) {
		return equationsPossible(equations);
	}
}

function equationsPossible(equations) {
	const root = new Array(26);
	for (let i = 0; i < 26; i++) {
		root[i] = i;
	}

	function find(x) {
		if (root[x] !== x) {
			root[x] = find(root[x]);
		}
		return root[x];
	}

	function union(x, y) {
		x = find(x);
		y = find(y);
		if (x !== y) {
			root[x] = y;
		}
	}

	for (const eqn of equations) {
		if (eqn.charAt(1) === '=') {
			const x = eqn.charCodeAt(0) - 'a'.charCodeAt(0);
			const y = eqn.charCodeAt(3) - 'a'.charCodeAt(0);
			union(x, y);
		}
	}

	for (const eqn of equations) {
		if (eqn.charAt(1) === '!') {
			const x = eqn.charCodeAt(0) - 'a'.charCodeAt(0);
			const y = eqn.charCodeAt(3) - 'a'.charCodeAt(0);
			if (find(x) === find(y)) {
				return false;
			}
		}
	}

	return true;
}

module.exports = { Problem: SatisfiabilityOfEqualityEquations };
