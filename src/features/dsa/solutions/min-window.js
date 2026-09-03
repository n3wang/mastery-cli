/*
 
 √ What do you want to do? · Run Tests
Test 1/5:
start 0 end_l 14 left 0 right 0 matched 1 frequencyMap Map(3) { 'A' => 0, 'B' => 1, 'C' => 1 } right letter A slide false curr seq: 
start 0 end_l 14 left 0 right 1 matched 1 frequencyMap Map(3) { 'A' => 0, 'B' => 1, 'C' => 1 } right letter D slide false curr seq: A
start 0 end_l 14 left 0 right 2 matched 1 frequencyMap Map(3) { 'A' => 0, 'B' => 1, 'C' => 1 } right letter O slide false curr seq: AD
start 0 end_l 14 left 0 right 3 matched 2 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 1 } right letter B slide false curr seq: ADO
start 0 end_l 14 left 0 right 4 matched 2 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 1 } right letter E slide false curr seq: ADOB
start 0 end_l 14 left 0 right 5 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true curr seq: ADOBE
start 0 end_l 14 left 0 right 5 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true
character found A words ADOBECODEBANC
start 0 end_l 6 left 1 right 6 matched 2 frequencyMap Map(3) { 'A' => 1, 'B' => 0, 'C' => 0 } right letter O slide false curr seq: DOBEC
start 0 end_l 6 left 1 right 7 matched 2 frequencyMap Map(3) { 'A' => 1, 'B' => 0, 'C' => 0 } right letter D slide false curr seq: DOBECO
start 0 end_l 6 left 1 right 8 matched 2 frequencyMap Map(3) { 'A' => 1, 'B' => 0, 'C' => 0 } right letter E slide false curr seq: DOBECOD
start 0 end_l 6 left 1 right 9 matched 2 frequencyMap Map(3) { 'A' => 1, 'B' => -1, 'C' => 0 } right letter B slide false curr seq: DOBECODE
start 0 end_l 6 left 1 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => -1, 'C' => 0 } right letter A slide true curr seq: DOBECODEB
start 0 end_l 6 left 1 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => -1, 'C' => 0 } right letter A slide true
character found D words ADOBECODEBANC
start 0 end_l 6 left 2 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => -1, 'C' => 0 } right letter A slide true
character found O words ADOBECODEBANC
start 0 end_l 6 left 3 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => -1, 'C' => 0 } right letter A slide true
character found B words ADOBECODEBANC
start 0 end_l 6 left 4 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter A slide true
character found E words ADOBECODEBANC
start 0 end_l 6 left 5 right 10 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter A slide true
character found C words ADOBECODEBANC
start 0 end_l 6 left 6 right 11 matched 2 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 1 } right letter N slide false curr seq: ODEBA
start 0 end_l 6 left 6 right 12 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true curr seq: ODEBAN
start 0 end_l 6 left 6 right 12 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true
character found O words ADOBECODEBANC
start 0 end_l 6 left 7 right 12 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true
character found D words ADOBECODEBANC
start 0 end_l 6 left 8 right 12 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true
character found E words ADOBECODEBANC
start 8 end_l 5 left 9 right 12 matched 3 frequencyMap Map(3) { 'A' => 0, 'B' => 0, 'C' => 0 } right letter C slide true
character found B words ADOBECODEBANC
Test ADOBECODEBANC, ABC => BANC ||  passed
 */

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
					const window = right - left + 1;

					//My guess here is that it will always reduce the right and left, there fore the new samalelst can just use window to compare
					const isSmaller = window < end;
					if (isSmaller) {
						[start, end] = [left, window];
						console.log(
							`==> updated last end ${end} start ${start} `
						);
					}

					matched = subtractLeftFrequency(
						s,
						left,
						frequencyMap,
						matched
					);

					console.log(
						'Matchment after freq subst',
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
						printSequence(right, left, s)
					);
					left++;
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
