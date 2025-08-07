class MinWindow {
	solve(s, t) {
		// Because the order of it doesn't matter
		const getFrequencyMap = (str, frequencyMap = new Map()) => {
			for (const char of str) {
				frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
			}

			return frequencyMap;
		};

		// and returns the start and end indices of the minimum window in s that contains all the characters in t
		const getWindowPointers = (s, t, frequencyMap) => {
			let [left, right, matched, start, end] = [0, 0, 0, 0, s.length + 1];
			// Can slide being the case if matched is equals to the length. => if it cant slide then doesnt make sense because not even make sense
			const canSlide = () => matched === t.length;

			// Since the right pointer goes increasing, when it reaches this then we see the
			while (right < s.length) {
				// For each right letter we are adding the right frequency for it.
				matched = addRightFrequency(s, right, frequencyMap, matched);
				console.log(
					'Matchment',
					matched,
					' | s',
					s,
					'| right',
					right,
					'| left',
					left,
					'| freqmap',
					frequencyMap,
					'seq',
					printSequence(right, left, s),
					'can slide',
					canSlide()
				);

				console.log('can it slide?', canSlide());
				while (canSlide()) {
					// TODO Complete the sliding algorithm
				}

				right++;
			}

			return { start, end };
		};

		// addRightFrequency is a function is a helper function used by getWindowPointers to add a character to the window and update the frequency map returning the matched frequency map..
		const addRightFrequency = (s, right, frequencyMap, matched) => {
			const char = s[right];

			if (frequencyMap.has(char)) {
				//set the frquency map reduce it to use that and matchit to see.
				frequencyMap.set(char, frequencyMap.get(char) - 1);

				//If the frequency is less than 0 means that is at least once on the windows. I am guessing that if he match reqred is 2, it will start with 2 on the frequency map?
				const isInWindow = 0 <= frequencyMap.get(char); //Because you dont want to continue counting if you arlready past the amount of number you need
				if (isInWindow) matched++;
			}

			return matched;
		};

		// The subtractLeftFrequency function is a helper function used by getWindowPointers to remove a character from the window and update the frequency map.
		const subtractLeftFrequency = (s, left, frequencyMap, matched) => {
			const char = s[left];

			if (frequencyMap.has(char)) {
				const isOutOfWindow = frequencyMap.get(char) === 0;
				if (isOutOfWindow) matched--;

				frequencyMap.set(char, frequencyMap.get(char) + 1);
			}

			return matched;
		};

		const printSequence = (right, left, s) => {
			let substr = '';
			for (let i = left; i <= right && i <= s.length - 1; i++) {
				substr += s[i];
			}
			return substr;
		};

		//The getSubString function is a helper function used to return the substring of s that corresponds to the minimum window if the end is less than the length, otherwise it returns ''.
		const getSubString = (s, start, end) =>
			end <= s.length ? s.slice(start, start + end) : '';

		const isMissingArgs = !s.length || !t.length;
		if (isMissingArgs) return '';

		const frequencyMap = getFrequencyMap(t);
		//end is the distance, and start from where to count.
		const { start, end } = getWindowPointers(s, t, frequencyMap);

		return getSubString(s, start, end);
	}
}

module.exports = { Problem: MinWindow };
