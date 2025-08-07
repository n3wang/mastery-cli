let MAX = 1000;
let MIN = -1000;
let BRANCH_FACTOR = 2;

let prunnings = [];

function minimax(depth, nodeIndex, maximizingPlayer, values, alpha, beta) {
	// Terminating condition. i.e
	// leaf node is reached
	if (depth == 3) return values[nodeIndex];

	if (maximizingPlayer) {
		let best = MIN;

		// Recur for left and
		// right children
		for (let i = 0; i < 2; i++) {
			let val = minimax(
				depth + 1,
				nodeIndex * 2 + i,
				false,
				values,
				alpha,
				beta
			);

			//  best, being the value to return, while alpha is just there for comparison reaosns.
			best = Math.max(best, val); //If the value is larger than the current best, replace it
			alpha = Math.max(alpha, best); //Check if to chenge the alpha value. I guess this is the security against calling down, that doesnt get replaced

			// Alpha Beta Pruning
			if (beta <= alpha) {
				if (i >= BRANCH_FACTOR - 1) {
					console.log('The last of my children: ');
				} else {
					prunnings.push(alpha);
				}
				console.log(
					`My children alpha ${alpha} is larger than my beta (top value) ${beta} | I dont need to explore more | Returning Best (${best})\n`
				);
			}
		}
		return best;
	} else {
		let best = MAX;

		// Recur for left and
		// right children
		for (let i = 0; i < 2; i++) {
			let val = minimax(
				depth + 1,
				nodeIndex * 2 + i,
				true,
				values,
				alpha,
				beta
			);
			best = Math.min(best, val);
			beta = Math.min(beta, best);

			// Alpha Beta Pruning
			if (beta <= alpha) {
				if (i >= BRANCH_FACTOR - 1) {
					console.log('The last of my children: ');
				} else {
					prunnings.push(beta);
				}
				console.log(
					`My children beta ${beta} are smaller than my alpha (top value) ${alpha} | I dont need to explore more | Returning best (${best})\n`
				);
				break;
			}
		}
		return best;
	}
}

// Driver Code
// let values = [3, 5, 6, 9, 1, 2, 0, -1];
// document.write("The optimal value is : " +
//     minimax(0, 0, true, values, MIN, MAX));

class MinMax {
	solve(values) {
		prunnings = [];
		return {
			minmax: minimax(0, 0, true, values, MIN, MAX),
			prunnings: prunnings
		};
	}
}

module.exports = { Problem: MinMax };
