class Division {
	divide(a, b) {
		if (b === 0) return undefined;
		return a / b;
	}

	//Dont edit this.
	solve = this.divide;
}

module.exports = { Problem: Division };
