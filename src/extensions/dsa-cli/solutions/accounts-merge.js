class AccountsMerge {
	solve(graph) {
		return accountsMerge(graph);
	}
}
function accountsMerge(accountList) {
	const visited = new Set();
	const adjacent = new Map();

	function DFS(mergedAccount, email) {
		visited.add(email);
		// Add the email vector that contains the current component's emails
		mergedAccount.push(email);

		if (!adjacent.has(email)) {
			return;
		}

		for (const neighbor of adjacent.get(email)) {
			if (!visited.has(neighbor)) {
				DFS(mergedAccount, neighbor);
			}
		}
	}

	const mergedAccounts = [];
	const accountListSize = accountList.length;

	for (const account of accountList) {
		const accountSize = account.length;
		const accountFirstEmail = account[1];

		// Building adjacency list
		// Adding edge between first email to all other emails in the account
		for (let j = 2; j < accountSize; j++) {
			const accountEmail = account[j];

			if (!adjacent.has(accountFirstEmail)) {
				adjacent.set(accountFirstEmail, []);
			}
			adjacent.get(accountFirstEmail).push(accountEmail);

			if (!adjacent.has(accountEmail)) {
				adjacent.set(accountEmail, []);
			}
			adjacent.get(accountEmail).push(accountFirstEmail);
		}
	}

	for (const account of accountList) {
		const accountName = account[0];
		const accountFirstEmail = account[1];

		// If email is visited, then it's a part of a different component
		// Hence perform DFS only if email is not visited yet
		if (!visited.has(accountFirstEmail)) {
			const mergedAccount = [];
			// Adding account name at the 0th index
			mergedAccount.push(accountName);

			DFS(mergedAccount, accountFirstEmail);
			mergedAccount.slice(1).sort();
			mergedAccounts.push(mergedAccount);
		}
	}

	return mergedAccounts;
}

module.exports = { Problem: AccountsMerge };
