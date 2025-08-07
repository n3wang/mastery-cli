class DailyTemperatures {
	/**
	 * https://leetcode.com/problems/daily-temperatures
	 * Time O(N) | Space O(N)
	 * @param {number[]} temperatures
	 * @return {number[]}
	 */
	solve(temperatures, stack = []) {
		const canShrink = (stack, temperatures, day) => {
			// Previous day as the output of the stack
			const previousDay = stack[stack.length - 1]; //Get the last cold day in the stack.
			// Then get and compare with the temperature of the previous and current termperature to compute if it is warmer
			const [prevTemperature, currTemperature] = [
				temperatures[previousDay],
				temperatures[day]
			];
			const isWarmer = prevTemperature < currTemperature;

			// If the stack is less than 0 means that there is not to compare (last one cannot shrink)
			return stack.length && isWarmer;
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
				// TODO Complete the code here
				// 1. Pop the previous cold day
				// 2. Calculate the days to wait
				// 3. Assign the days to wait to the previous cold day
			}

			stack.push(day); // Push into the stack the last temperature checked   which will be the last cold temperature to be used to calculate the difference (Since the while-loop will break once the colder temperature is detected)
		}

		console.log('Days:', days);

		return days;
	}
}

module.exports = { Problem: DailyTemperatures };
