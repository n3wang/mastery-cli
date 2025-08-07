/**
Test [30, 40, 50, 60] => [1, 1, 1, 0]
days          | temperatures     | stack
[ 0, 0, 0, 0 ] [ 30, 40, 50, 60 ] []
[ 0, 0, 0, 0 ] [ 30, 40, 50, 60 ] [ 0 ]
[ 1, 0, 0, 0 ] [ 30, 40, 50, 60 ] [ 1 ]
[ 1, 1, 0, 0 ] [ 30, 40, 50, 60 ] [ 2 ]


(If I write the console.log at the end of the while loop)  You can see how the stack gets popped and then the difference of days is calculated (compares the index of the last cold day with the current time.)
[ 0, 0, 0, 0 ] [ 30, 40, 50, 60 ] []
[ 1, 0, 0, 0 ] [ 30, 40, 50, 60 ] []
[ 1, 1, 0, 0 ] [ 30, 40, 50, 60 ] []
[ 1, 1, 1, 0 ] [ 30, 40, 50, 60 ] []

 */

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
				const prevColdDay = stack.pop();
				const daysToWait = day - prevColdDay;

				days[prevColdDay] = daysToWait; /* Ignore Space O(N) */
			}

			stack.push(day); // Push into the stack the last temperature checked   which will be the last cold temperature to be used to calculate the difference (Since the while-loop will break once the colder temperature is detected)
		}

		console.log('Days:', days);

		return days;
	}

	/**
	 * https://leetcode.com/problems/daily-temperatures
	 * Time O(N) | Space O(1)
	 * @param {number[]} temperatures
	 * @return {number[]}
	 */
	solve2(temperatures, hottest = 0) {
		// Searches ahead how many days until it becomes hotter than the current temperature. starting from a certain date.
		const search = (temperatures, day, temperature, days, dayCount = 1) => {
			const isHotter = () => temperatures[day + dayCount] <= temperature;
			// Note this optimization that adds the day count using previous calculations (made on the future dates) and then loops again to check if the dayCount + day is less than the temperature.
			while (isHotter())
				dayCount += days[day + dayCount]; /* Time O(N + N) */

			days[day] = dayCount; /* Ignore Space O(N) */
		};

		const days = new Array(temperatures.length).fill(0);

		for (let day = temperatures.length - 1; 0 <= day; day--) {
			/* Time O(N + N) */
			const temperature = temperatures[day];

			const isHotter = hottest <= temperature;
			if (isHotter) {
				hottest = temperature;
				continue; /* Time O(N + N) */
			}

			search(
				temperatures,
				day,
				temperature,
				days
			); /* Time O(N + N) | Ignore Space O(N) */
		}

		return days;
	}
}

module.exports = { Problem: DailyTemperatures };
