class KeyAndRooms {
	solve(rooms) {
		return canVisitAllRooms(rooms);
	}
}

function canVisitAllRooms(rooms) {
	const n = rooms.length;
	const seen = new Array(n).fill(false);
	seen[0] = true;
	const stack = [0];

	while (stack.length > 0) {
		const node = stack.pop();
		for (const nei of rooms[node]) {
			if (!seen[nei]) {
				seen[nei] = true;
				stack.push(nei);
			}
		}
	}

	return seen.every(room => room);
}

module.exports = { Problem: KeyAndRooms };
