class SmallestSufficientTeams {
	solve(people, req_skills) {
		const n = people.length;
		const m = req_skills.length;
		const skillId = new Map();
		for (let i = 0; i < m; i++) {
			skillId.set(req_skills[i], i);
		}

		const skillsMaskOfPerson = new Array(n).fill(0);
		for (let i = 0; i < n; i++) {
			for (const skill of people[i]) {
				skillsMaskOfPerson[i] |= 1 << skillId.get(skill);
			}
		}

		const dp = new Array(1 << m).fill((1 << n) - 1);
		dp[0] = 0;

		for (let skillsMask = 1; skillsMask < 1 << m; skillsMask++) {
			for (let i = 0; i < n; i++) {
				const smallerSkillsMask = skillsMask & ~skillsMaskOfPerson[i];
				if (smallerSkillsMask !== skillsMask) {
					const peopleMask = dp[smallerSkillsMask] | (1 << i);
					if (
						this.countBits(peopleMask) <
						this.countBits(dp[skillsMask])
					) {
						dp[skillsMask] = peopleMask;
					}
				}
			}
		}

		const answerMask = dp[(1 << m) - 1];
		const ans = [];
		for (let i = 0; i < n; i++) {
			if ((answerMask >> i) & 1) {
				ans.push(i);
			}
		}
		return ans;
	}

	countBits(n) {
		let count = 0;
		while (n > 0) {
			count += n & 1;
			n >>= 1;
		}
		return count;
	}
}

module.exports = { Problem: SmallestSufficientTeams };
