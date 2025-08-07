class DailyTemperatures {
	/**
	 * https://leetcode.com/problems/daily-temperatures
	 * Time O(N) | Space O(N)
	 * @param {number[]} temperatures
	 * @return {number[]}
	 */
	solve(temperatures, stack = []) {
		const canShrink = (stack, temperatures, day) => {
			// TODO: Complete the function
			// Previous day as the output of the stack
			// Then get and compare with the temperature of the previous and current termperature to compute if it is warmer
			// If the stack is less than 0 means that there is not to compare (last one cannot shrink)
		};

		// Create the array of things to print
		const days = Array(temperatures.length).fill(0); // [0, 0, 0, 0]

		// For each day
		for (let day = 0; day < temperatures.length; day++) {
			/* Time O(N + N) */
			console.log('Day', day);
			// While it can shrink which means that the current day is hotter than the previous one, then continue popping the previous cold day until it finds the one with the last one that is cold. days to wait being the difference between day and previous date.
			while (canShrink(stack, temperatures, day)) {
				/* Time O(N + N) */
				const prevColdDay = stack.pop();
				const daysToWait = day - prevColdDay;

				days[prevColdDay] = daysToWait; /* Ignore Space O(N) */
			}

			stack.push(day); // Push into the stack the last temperature checked   which will be the last cold temperature to be used to calculate the difference (Since the while-loop will break once the colder temperature is detected)
		}

		console.log('Days:', days);

		return days;
	}
}

module.exports = { Problem: DailyTemperatures };
