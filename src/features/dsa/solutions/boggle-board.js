class BoggleBoard {
	solve(board, words) {
		return boggleBoard(board, words);
	}
}

function boggleBoard(board, words) {
	const trie = new Trie();
	for (const word of words) {
		trie.add(word);
	}

	const finalWords = {};
	const visited = board.map(row => row.map(letter => false));
	for (let row = 0; row < board.length; row++) {
		for (let col = 0; col < board[row].length; col++) {
			explore(row, col, board, trie.root, visited, finalWords);
		}
	}
	return Object.keys(finalWords);
}

function explore(row, col, board, trieNode, visited, finalWords) {
	if (visited[row][col]) return;
	const letter = board[row][col];
	if (!(letter in trieNode)) return;

	visited[row][col] = true;
	trieNode = trieNode[letter];
	if ('*' in trieNode) finalWords[trieNode['*']] = true;

	const neighbors = getNeighbors(row, col, board);
	for (const neighbor of neighbors) {
		explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
	}
	visited[row][col] = false;
}

function getNeighbors(row, col, board) {
	const neighbors = [];
	if (row > 0 && col > 0) neighbors.push([row - 1, col - 1]);
	if (row > 0 && col < board[0].length - 1)
		neighbors.push([row - 1, col + 1]);
	if (row < board.length - 1 && col < board[0].length - 1)
		neighbors.push([row + 1, col + 1]);
	if (row < board.length - 1 && col > 0) neighbors.push([row + 1, col - 1]);
	if (row > 0) neighbors.push([row - 1, col]);
	if (row < board.length - 1) neighbors.push([row + 1, col]);
	if (col > 0) neighbors.push([row, col - 1]);
	if (col < board[0].length - 1) neighbors.push([row, col + 1]);
	return neighbors;
}

class Trie {
	constructor() {
		this.root = {};
		this.endSymbol = '*';
	}

	add(word) {
		let current = this.root;
		for (const letter of word) {
			if (!(letter in current)) {
				current[letter] = {};
			}
			current = current[letter];
		}
		current[this.endSymbol] = word;
	}
}

module.exports = { Problem: BoggleBoard };
