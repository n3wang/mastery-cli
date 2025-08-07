const utils = require('./utils.js');
const { PAD, padMid, verifyData, EOL, bg } = utils;
/**
 * 
 * @param {list[dict]} radarData
 * [
 *  {
 *    "name": "feature1",
 *    "value": 8
 *  }
 * ] 
 * Optionals:
 * width: 6, Width of the radar chart
 * use_unique_colors: false, Use unique colors for each feature (Determine by the order of the features)
 * default_color: 'yellow' Color to use if use_unique_colors is false
 * 
 * Values are automatlly scaled to 0-6 for calculating the distances.
 * render: the radart chart, use it by console.log(render)
 * labelsWithColors: the labels with colors used for the features. Use it to display the labels.
 * [
    { key: 'feature1', style: '\x1B[41m  \x1B[0m' },
    { key: 'feature2', style: '\x1B[43m  \x1B[0m' },
    { key: 'feature3', style: '\x1B[42m  \x1B[0m' },
    { key: 'feature4', style: '\x1B[46m  \x1B[0m' },
    { key: 'feature5', style: '\x1B[44m  \x1B[0m' },
    { key: 'feature6', style: '\x1B[45m  \x1B[0m' }
  ]
 * @returns {render, labelsWithColors}
 */
module.exports = (
	radarData,
	{
		width = 6,
		use_unique_colors = true,
		default_color = 'yellow',
		draw_perimeter = true,
		write_labels = true
	} = {}
) => {
	// Allows up to 6 features. This is to keep the ui from looking too tight.
	/**
	 *    b
	 * a     c
	 *
	 * d     f
	 *    e
	 */

	if (radarData.length > 6)
		throw new Error('Too many features at Radar Chart Creation. Max 6.');

	// Formations depending on the number of features
	const formations = {
		1: ['b'],
		2: ['b', 'e'],
		3: ['a', 'c', 'e'],
		4: ['a', 'c', 'f', 'd'],
		5: ['a', 'b', 'c', 'f', 'd'],
		6: ['a', 'b', 'c', 'f', 'e', 'd']
	};

	const edgesSorted = {
		1: [],
		2: ['b', 'e'],
		3: [...formations[3], 'a'],
		4: [...formations[4], 'a'],
		5: [...formations[5], 'a'],
		6: [...formations[6], 'a']
		// 6: [['a', 'b'], ['c', 'b'] ['c', 'd'], [c, f], [f, e], [e, d], [d, a]]
	};

	const colors = {
		0: 'red',
		1: 'yellow',
		2: 'green',
		3: 'cyan',
		4: 'blue',
		5: 'magenta'
	};

	const labelsWithColors = [];
	for (let i = 0; i < radarData.length; i++) {
		if (use_unique_colors) {
			labelsWithColors.push({
				key: radarData[i].name,
				style: bg(colors[i], 1)
			});
		} else {
			labelsWithColors.push({
				key: radarData[i].name,
				style: bg(default_color, 1)
			});
		}
	}

	const selectedFormation = formations[radarData.length];

	// Normalize values to 0-6 into the scaled_value feature
	const max = Math.max(...radarData.map(o => o.value));
	radarData.forEach(o => (o.scaled_value = Math.round((o.value * 6) / max)));

	function getPosition(
		value,
		feature_position = 'a',
		{ incHeight = 2 } = {}
	) {
		switch (feature_position) {
			case 'a':
				// min (width, width) => max (0, 0 + incHeight)
				return [width - value, width - value + incHeight];
			case 'b':
				// min (width, width) => (width, 0)
				return [width, width - value];
			case 'c':
				// min: (width, width) => (width * 2, 0 + incHeight)
				return [width + value, width - value + incHeight];
			case 'd':
				// min: (width, width) => (0, width * 2)
				return [width - value, width + value - incHeight];
			case 'e':
				// min: (width, width) => (width, width * 2)
				return [width, width + value];
			case 'f':
				// min: (width, width) => (width * 2, width * 2)
				return [width + value, width + value - incHeight];
		}
	}

	// // Create paddings for the radar chart.

	String.prototype.replaceAt = function (index, replacement) {
		return (
			this.substring(0, index) +
			replacement +
			this.substring(index + replacement.length)
		);
	};

	// Create the radar Plots
	const plots = Array.from({ length: width * 2 + 2 }, () =>
		new Array(width * 4 + 2).fill(undefined)
	);

	const render_plots = {};

	radarData.forEach((feature, index) => {
		const { name, scaled_value, value } = feature;
		const feature_position = selectedFormation[index];
		const [x, y] = getPosition(scaled_value, feature_position);
		const colorForFeature = use_unique_colors
			? colors[index]
			: default_color;
		plots[y][x * 2] = bg(colorForFeature, 2);
		// render_plots.push([x * 2, y]); // To be used for renering the perimeter.
		render_plots[feature_position] = [x * 2, y];
	});

	// Plot on the middle
	plots[width][width * 2] = bg('white', 2);

	// Plot the perimeter
	if (draw_perimeter) {
		edgeFormationSelected = edgesSorted[radarData.length];
		for (
			let edgeIdx = 0;
			edgeIdx < edgeFormationSelected.length - 1;
			edgeIdx++
		) {
			const [startVerticeFeaturePosition, endVerticeFeaturePosition] = [
				edgeFormationSelected[edgeIdx],
				edgeFormationSelected[edgeIdx + 1] || edgeFormationSelected[0]
			];

			let [startX, startY] = render_plots[startVerticeFeaturePosition];
			const [endX, endY] = render_plots[endVerticeFeaturePosition];
			const x_diff = endX - startX;
			const y_diff = endY - startY;

			let slope = y_diff / x_diff;
			if (x_diff === 0) {
				slope = 0;
			}
			const y_intercept = startY - slope * startX;

			if (slope == 0) {
				yMove = endY - startY > 0 ? 1 : -1;

				if (yMove > 0) {
					for (let i = startY + 1; i < endY - 1; i += yMove) {
						plots[i][startX] = '+';
					}
				} else {
					for (let i = startY - 1; i > endY + 1; i += yMove) {
						plots[i][startX] = '+';
					}
				}
			}

			let prevX,
				prevY = [startX, startY];
			while (startX !== endX || startY !== endY) {
				// Draw the line from the start to the end

				startY = Math.round(slope * startX + y_intercept);

				// console.log(startX, startY, plots.length, plots[0].length)
				if (startY < 0 || startY > plots.length) break;
				if (startX < 0 || startX > plots[startY].length) break;

				if (plots[startY][startX] === undefined) {
					plots[startY][startX] = '+';
				}

				if (startX > endX) {
					startX--;
				} else if (startX < endX) {
					startX++;
				}

				if (prevX === startX && prevY === startY) {
					// console.log('prevX === startX && prevY === startY', prevX, startX, prevY, startY)
					break;
				}
				prevX = startX;
				prevY = startY;
			}
		}
	}

	// Render the plots
	let render = PAD;
	for (let i = 0; i < plots.length; i++) {
		for (let j = 0; j < plots[i].length; j++) {
			if (plots[i][j] === undefined) {
				render += PAD;
			} else {
				render += plots[i][j];
			}
		}
		render += EOL + PAD;
	}

	return { render, labelsWithColors };
};
