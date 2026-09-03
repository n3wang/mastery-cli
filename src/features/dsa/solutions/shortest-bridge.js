class ShortestBridge {
	solve(grid) {
		return shortestBridge(grid);
	}
}

function shortestBridge(grid) {
	const n = grid.length;
	let firstX = -1;
	let firstY = -1;

	// Find any land cell, treating it as a cell of island A.
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === 1) {
				firstX = i;
				firstY = j;
				break;
			}
		}
	}

	// bfsQueue for BFS on land cells of island A; secondBfsQueue for BFS on water cells.
	let bfsQueue = [[firstX, firstY]];
	let secondBfsQueue = [[firstX, firstY]];
	grid[firstX][firstY] = 2;

	// BFS for all land cells of island A and add them to secondBfsQueue.
	while (bfsQueue.length > 0) {
		const newBfs = [];
		for (const [x, y] of bfsQueue) {
			for (const [dx, dy] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1]
			]) {
				const curX = x + dx;
				const curY = y + dy;
				if (
					0 <= curX &&
					curX < n &&
					0 <= curY &&
					curY < n &&
					grid[curX][curY] === 1
				) {
					newBfs.push([curX, curY]);
					secondBfsQueue.push([curX, curY]);
					grid[curX][curY] = 2;
				}
			}
		}
		bfsQueue = newBfs;
	}

	let distance = 0;
	while (secondBfsQueue.length > 0) {
		const newBfs = [];
		for (const [x, y] of secondBfsQueue) {
			for (const [dx, dy] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1]
			]) {
				const curX = x + dx;
				const curY = y + dy;
				if (0 <= curX && curX < n && 0 <= curY && curY < n) {
					if (grid[curX][curY] === 1) {
						return distance;
					} else if (grid[curX][curY] === 0) {
						newBfs.push([curX, curY]);
						grid[curX][curY] = -1;
					}
				}
			}
		}
		// Start the next round on all water cells that are 1 cell further away
		// from island A and increment the distance by 1.
		secondBfsQueue = newBfs;
		distance += 1;
	}
}

module.exports = { Problem: ShortestBridge };
