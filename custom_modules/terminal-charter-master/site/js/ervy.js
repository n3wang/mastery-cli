(function (f) {
	if (typeof exports === 'object' && typeof module !== 'undefined') {
		module.exports = f();
	} else if (typeof define === 'function' && define.amd) {
		define([], f);
	} else {
		var g;
		if (typeof window !== 'undefined') {
			g = window;
		} else if (typeof global !== 'undefined') {
			g = global;
		} else if (typeof self !== 'undefined') {
			g = self;
		} else {
			g = this;
		}
		g.ervy = f();
	}
})(function () {
	var define, module, exports;
	return (function () {
		function r(e, n, t) {
			function o(i, f) {
				if (!n[i]) {
					if (!e[i]) {
						var c = 'function' == typeof require && require;
						if (!f && c) return c(i, !0);
						if (u) return u(i, !0);
						var a = new Error("Cannot find module '" + i + "'");
						throw ((a.code = 'MODULE_NOT_FOUND'), a);
					}
					var p = (n[i] = { exports: {} });
					e[i][0].call(
						p.exports,
						function (r) {
							var n = e[i][1][r];
							return o(n || r);
						},
						p,
						p.exports,
						r,
						e,
						n,
						t
					);
				}
				return n[i].exports;
			}
			for (
				var u = 'function' == typeof require && require, i = 0;
				i < t.length;
				i++
			)
				o(t[i]);
			return o;
		}
		return r;
	})()(
		{
			1: [
				function (require, module, exports) {
					const { bg, fg } = require('./lib/utils');

					module.exports = {
						bar: require('./lib/bar'),
						bullet: require('./lib/bullet'),
						donut: require('./lib/donut'),
						gauge: require('./lib/gauge'),
						scatter: require('./lib/scatter'),
						pie: require('./lib/pie'),
						annotation: require('./lib/annotation'),
						heatmap: require('./lib/heatmap'),
						radar: require('./lib/radar'),
						bg,
						fg
					};
				},
				{
					'./lib/annotation': 2,
					'./lib/bar': 3,
					'./lib/bullet': 4,
					'./lib/donut': 5,
					'./lib/gauge': 6,
					'./lib/heatmap': 7,
					'./lib/pie': 8,
					'./lib/radar': 9,
					'./lib/scatter': 10,
					'./lib/utils': 11
				}
			],
			2: [
				function (require, module, exports) {
					const utils = require('./utils');
					const { PAD, EOL } = utils;

					module.exports = (data, left = 2) => {
						let result = PAD.repeat(left);

						const keys = data.map(item => item.key);
						const styles = data.map(item => item.style);

						result += EOL + PAD.repeat(left);

						for (var i = 0; i < styles.length; i++) {
							result +=
								styles[i] +
								styles[i] +
								PAD +
								keys[i] +
								EOL +
								PAD.repeat(left);
						}

						return result;
					};
				},
				{ './utils': 11 }
			],
			3: [
				function (require, module, exports) {
					const utils = require('./utils');
					const { PAD, padMid, verifyData, EOL } = utils;

					module.exports = (data, opts) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								barWidth: 3,
								left: 1,
								height: 6,
								padding: 3,
								style: '*'
							},
							opts
						);

						const { barWidth, left, height, padding, style } =
							newOpts;
						let result = PAD.repeat(left);

						const values = data.map(item => item.value);
						const max = Math.max.apply(null, values);
						const length = data.length;

						let tmp, padChar, ratio, valStr;
						for (let i = 0; i < height + 2; i++) {
							for (let j = 0; j < length; j++) {
								tmp = data[j];
								valStr = tmp.value.toString();
								ratio = height - (height * tmp.value) / max;
								// ratio = height * tmp.value / max

								padChar =
									ratio > i + 2
										? PAD
										: Math.round(ratio) === i
										? valStr
										: Math.round(ratio) < i
										? tmp.style || style
										: PAD;

								if (padChar === valStr) {
									result +=
										padMid(valStr, barWidth) +
										PAD.repeat(padding);
									continue;
								}

								if (i !== height + 1) {
									// if (i - Math.round(ratio) >= 2 && barWidth > 2 && padChar === style) {
									// result += padChar + PAD.repeat(barWidth - 2) + padChar
									// } else {
									result += padChar.repeat(barWidth);
									// }

									result += PAD.repeat(padding);
								} else {
									result +=
										tmp.key.length > barWidth
											? tmp.key.padEnd(barWidth + padding)
											: padMid(tmp.key, barWidth) +
											  PAD.repeat(padding);
								}
							}

							if (i !== height + 1) {
								result += EOL + PAD.repeat(left);
							}
						}

						return result;
					};
				},
				{ './utils': 11 }
			],
			4: [
				function (require, module, exports) {
					const utils = require('./utils');
					const { PAD, verifyData, maxKeyLen, EOL } = utils;

					module.exports = (data, opts) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								barWidth: 1,
								style: '*',
								left: 1,
								width: 10,
								padding: 1
							},
							opts
						);

						const { barWidth, left, width, padding, style } =
							newOpts;

						let result = PAD.repeat(left);

						const values = data.map(item => item.value);
						const max = Math.max.apply(null, values);
						const maxKeyLength = maxKeyLen(data);

						let tmp, padChar, ratioLength, key, line;
						const valLength = values.length;
						for (let i = 0; i < valLength; i++) {
							tmp = data[i];
							ratioLength = Math.round(width * (tmp.value / max));
							padChar = tmp.style ? tmp.style : style;
							key = tmp.key;
							line =
								padChar.repeat(ratioLength) +
								EOL +
								PAD.repeat(left);
							result += key.padStart(maxKeyLength) + PAD;

							for (
								let j = 0;
								j < (tmp.barWidth || barWidth);
								j++
							) {
								if (j > 0) {
									result +=
										PAD.repeat(maxKeyLength + 1) + line;
								} else {
									result += line;
								}
							}

							if (i !== valLength - 1) {
								result +=
									EOL.repeat(padding) + PAD.repeat(left);
							}
						}

						return result;
					};
				},
				{ './utils': 11 }
			],
			5: [
				function (require, module, exports) {
					const pie = require('./pie');

					module.exports = (data, opts) => {
						return pie(data, opts, true);
					};
				},
				{ './pie': 8 }
			],
			6: [
				function (require, module, exports) {
					const utils = require('./utils');
					const { padMid, verifyData, PAD, EOL } = utils;

					module.exports = (data, opts) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								radius: 5,
								left: 2,
								style: '# ',
								bgStyle: '+ '
							},
							opts
						);

						const { radius, left, style, bgStyle } = newOpts;

						let tmp;
						let result = PAD.repeat(left);

						for (let i = -radius; i < 0; i++) {
							for (let j = -radius; j < radius; j++) {
								if (
									Math.pow(i, 2) + Math.pow(j, 2) <
									Math.pow(radius, 2)
								) {
									if (Math.abs(i) > 2 || Math.abs(j) > 2) {
										tmp =
											(Math.atan2(i, j) * 1) / Math.PI +
											1;
										result +=
											tmp <= data[0].value
												? data[0].style || style
												: bgStyle;
									} else {
										if ((j === 0) & (i === -1)) {
											result += Math.round(
												data[0].value * 100
											);
											continue;
										}

										result += PAD.repeat(2);
									}
								} else {
									result += PAD.repeat(2);
								}
							}

							result += EOL + PAD.repeat(left);
						}

						result +=
							PAD.repeat(radius - 2) +
							'0' +
							PAD.repeat(radius - 4) +
							padMid(data[0].key, 11) +
							PAD.repeat(radius - 4) +
							'100';

						return result;
					};
				},
				{ './utils': 11 }
			],
			7: [
				function (require, module, exports) {
					const utils = require('./utils');
					const {
						EOL,
						PAD,
						verifyData,
						curForward,
						curUp,
						curDown,
						curBack,
						getOriginLen,
						getLabel
					} = utils;

					const printBox = (
						width,
						height,
						style = '# ',
						left = 0,
						top = 0,
						type = 'coordinate'
					) => {
						let result = curForward(left) + curUp(top);
						const hasSide = width > 1 || height > 1;

						for (let i = 0; i < height; i++) {
							for (let j = 0; j < width; j++) {
								result += style;
							}

							if (hasSide) {
								if (i !== height - 1) {
									result += EOL + curForward(left);
								} else {
									result += EOL;
								}
							}
						}

						if (type === 'data') {
							result +=
								curDown(hasSide ? top - height : top) +
								curBack(left + getOriginLen(style));
						}
						return result;
					};
					/**
					 * This function generates a heatmap based on the provided data and options.
					 *
					 * @param {Array} data - The data to be used for the heatmap.
					 * @param {Object} opts - The options for the heatmap. Can include:
					 * @param {number} opts.width - The width of the heatmap. Default is 7.
					 * @param {number} opts.left - The left padding. Default is 2.
					 * @param {number} opts.height - The height of the heatmap. Default is 8.
					 * @param {string} opts.style - The style of the heatmap. Default is '# '.
					 * @param {Array} opts.sides - The sides of the heatmap. Default is [1, 1].
					 * @param {Array} opts.hAxis - The horizontal axis markers. Default is ['+', '-', ''].
					 * @param {Array} opts.vAxis - The vertical axis markers. Default is ['|', ''].
					 * @param {string} opts.hName - The horizontal axis name. Default is 'X'.
					 * @param {string} opts.vName - The vertical axis name. Default is 'Y'.
					 * @param {string} opts.zero - The zero point marker. Default is '+'.
					 * @param {Array} opts.ratio - The ratio of the heatmap. Default is [1, 1].
					 * @param {number} opts.hGap - The horizontal gap. Default is 2.
					 * @param {number} opts.vGap - The vertical gap. Default is 1.
					 * @param {number} opts.legendGap - The gap for the legend. Default is 0.
					 * @param {number} opts.startsHAxis - The starting point on the horizontal axis. Default is 15.
					 * @param {number} opts.startsVAxis - The starting point on the vertical axis. Default is 0.
					 * @param {Array} opts.VLabels - The labels for the vertical axis. Default is ['Mo ', 'Tu ', 'We ', 'Th ', 'Fr ', 'Sa ', 'Su '].
					 *
					 * @returns {string} - The heatmap.
					 */
					module.exports = (data, opts) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								width: 7, //Amount of weeks
								left: 2,
								height: 8,
								style: '# ',
								sides: [1, 1],
								hAxis: ['+', '-', ''],
								vAxis: ['|', ''],
								hName: 'X',
								vName: 'Y',
								zero: '+',
								ratio: [1, 1],
								hGap: 2,
								vGap: 1,
								legendGap: 0,
								startsHAxis: 15, //Start on the horizontal Line
								startsVAxis: 0, //Starts on the vertical Line
								VLabels: [
									'Mo ',
									'Tu ',
									'We ',
									'Th ',
									'Fr ',
									'Sa ',
									'Su '
								],
								hideYLabels: false,
								hideXLabels: false
							},
							opts
						);
						//   newOpts.legendGap = newOpts.width/3*4

						const {
							left,
							height,
							style,
							sides,
							width,
							zero,
							hAxis,
							vAxis,
							ratio,
							hName,
							vName,
							hGap,
							vGap,
							legendGap,
							startsHAxis,
							startsVAxis,
							VLabels,
							hideYLabels,
							hideXLabels: reverseXLabels
						} = newOpts;

						let tmp;
						let result = '';
						const styles = data.map(item => item.style || style);
						const allSides = data.map(item => item.sides || sides);
						const keys = new Set(data.map(item => item.key));

						result += PAD.repeat(left) + vName;
						result += PAD.repeat(legendGap);
						result +=
							Array.from(keys)
								.map(
									key =>
										key +
										': ' +
										(data.find(item => item.key === key)
											.style || style)
								)
								.join(' | ') + EOL.repeat(2);

						result += printBox(
							width + left,
							height + 1,
							PAD.repeat(2)
						);

						data.map((item, index) => {
							result += printBox(
								allSides[index][0],
								allSides[index][1],
								styles[index],
								item.value[0] * 2 + left + 3,
								item.value[1] + 2,
								'data'
							);
						});

						result +=
							curBack(width * 2) +
							curUp(height + 1) +
							PAD.repeat(left + 1) +
							vAxis[1];

						for (let i = 1; i < height + 1; i++) {
							const yAxisLabels = (height - i) * ratio[1];
							const currentLabeledY = VLabels[yAxisLabels - 1];
							// console.log("currentLabeledY", currentLabeledY)
							tmp =
								(height - i) % vGap === 0 && i !== height
									? currentLabeledY.toString()
									: ''; //vAis[0] being the X axis item
							result += EOL + tmp.padStart(left + 1) + vAxis[0];
						}

						result +=
							curBack() +
							zero +
							curDown(1) +
							curBack(1) +
							'' +
							curUp(1);

						for (let i = 1; i < width * 2 + hGap; i++) {
							if (!(i % (hGap * 2))) {
								result += hAxis[0];

								// Draw scale of horizontal axis

								let xAxisLabels = 0;
								xAxisLabels = (i / 2) * ratio[0] + startsHAxis;
								if (reverseXLabels) {
									// console.log('xAxisLabels', xAxisLabels, 'width', width * 2)
									xAxisLabels = width - xAxisLabels;
								}

								result +=
									curDown(1) +
									curBack(1) +
									xAxisLabels +
									curUp(1); //Prints the H axis values.
								const len = xAxisLabels.toString().length;
								if (len > 1) {
									result += curBack(len - 1);
								}

								continue;
							}

							result += hAxis[1]; //Draws the `>`
						}
						result += hAxis[2] + PAD + hName + EOL;

						return result;
					};
				},
				{ './utils': 11 }
			],
			8: [
				function (require, module, exports) {
					const utils = require('./utils');
					const { verifyData, PAD, maxKeyLen, EOL } = utils;
					let tmp;

					const getPadChar = (styles, values, param, gapChar) => {
						const firstVal = values[0];
						if (!values.length) return gapChar;
						return param <= firstVal
							? styles[0]
							: getPadChar(
									styles.slice(1),
									values.slice(1),
									param - firstVal,
									gapChar
							  );
					};

					module.exports = (data, opts, isDonut = false) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								radius: 4,
								left: 0,
								innerRadius: 1
							},
							opts
						);

						const { radius, left, innerRadius } = newOpts;

						let result = PAD.repeat(left);

						const values = data.map(item => item.value);
						const total = values.reduce((a, b) => a + b);
						const ratios = values.map(value =>
							(value / total).toFixed(2)
						);
						const styles = data.map(item => item.style);
						const keys = data.map(item => item.key);
						const maxKeyLength = maxKeyLen(data);
						const limit = isDonut ? innerRadius : 0;
						const gapChar = styles.slice(-1)[0];

						for (let i = -radius; i < radius; i++) {
							for (let j = -radius; j < radius; j++) {
								if (
									Math.pow(i, 2) + Math.pow(j, 2) <
									Math.pow(radius, 2)
								) {
									tmp =
										((Math.atan2(i, j) * 1) / Math.PI) *
											0.5 +
										0.5;
									result += isDonut
										? Math.abs(i) > limit ||
										  Math.abs(j) > limit
											? getPadChar(
													styles,
													ratios,
													tmp,
													gapChar
											  )
											: PAD.repeat(2)
										: getPadChar(
												styles,
												ratios,
												tmp,
												gapChar
										  );
								} else {
									result += PAD.repeat(2);
								}
							}

							result += EOL + PAD.repeat(left);
						}

						result += EOL + PAD.repeat(left);

						for (var i = 0; i < styles.length; i++) {
							result +=
								styles[i] +
								PAD +
								keys[i].padStart(maxKeyLength) +
								': ' +
								values[i] +
								PAD +
								'(' +
								(ratios[i] * 100).toFixed(0) +
								'%' +
								')' +
								EOL +
								PAD.repeat(left);
						}

						return result;
					};
				},
				{ './utils': 11 }
			],
			9: [
				function (require, module, exports) {
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
							throw new Error(
								'Too many features at Radar Chart Creation. Max 6.'
							);

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
						radarData.forEach(
							o =>
								(o.scaled_value = Math.round(
									(o.value * 6) / max
								))
						);

						function getPosition(
							value,
							feature_position = 'a',
							{ incHeight = 2 } = {}
						) {
							switch (feature_position) {
								case 'a':
									// min (width, width) => max (0, 0 + incHeight)
									return [
										width - value,
										width - value + incHeight
									];
								case 'b':
									// min (width, width) => (width, 0)
									return [width, width - value];
								case 'c':
									// min: (width, width) => (width * 2, 0 + incHeight)
									return [
										width + value,
										width - value + incHeight
									];
								case 'd':
									// min: (width, width) => (0, width * 2)
									return [
										width - value,
										width + value - incHeight
									];
								case 'e':
									// min: (width, width) => (width, width * 2)
									return [width, width + value];
								case 'f':
									// min: (width, width) => (width * 2, width * 2)
									return [
										width + value,
										width + value - incHeight
									];
							}
						}

						// // Create paddings for the radar chart.

						String.prototype.replaceAt = function (
							index,
							replacement
						) {
							return (
								this.substring(0, index) +
								replacement +
								this.substring(index + replacement.length)
							);
						};

						// Create the radar Plots
						const plots = Array.from(
							{ length: width * 2 + 2 },
							() => new Array(width * 4 + 2).fill(undefined)
						);

						const render_plots = {};

						radarData.forEach((feature, index) => {
							const { name, scaled_value, value } = feature;
							const feature_position = selectedFormation[index];
							const [x, y] = getPosition(
								scaled_value,
								feature_position
							);
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
							edgeFormationSelected =
								edgesSorted[radarData.length];
							for (
								let edgeIdx = 0;
								edgeIdx < edgeFormationSelected.length - 1;
								edgeIdx++
							) {
								const [
									startVerticeFeaturePosition,
									endVerticeFeaturePosition
								] = [
									edgeFormationSelected[edgeIdx],
									edgeFormationSelected[edgeIdx + 1] ||
										edgeFormationSelected[0]
								];

								let [startX, startY] =
									render_plots[startVerticeFeaturePosition];
								const [endX, endY] =
									render_plots[endVerticeFeaturePosition];
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
										for (
											let i = startY + 1;
											i < endY - 1;
											i += yMove
										) {
											plots[i][startX] = '+';
										}
									} else {
										for (
											let i = startY - 1;
											i > endY + 1;
											i += yMove
										) {
											plots[i][startX] = '+';
										}
									}
								}

								let prevX,
									prevY = [startX, startY];
								while (startX !== endX || startY !== endY) {
									// Draw the line from the start to the end

									startY = Math.round(
										slope * startX + y_intercept
									);

									// console.log(startX, startY, plots.length, plots[0].length)
									if (startY < 0 || startY > plots.length)
										break;
									if (
										startX < 0 ||
										startX > plots[startY].length
									)
										break;

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
				},
				{ './utils.js': 11 }
			],
			10: [
				function (require, module, exports) {
					const utils = require('./utils');
					const {
						EOL,
						PAD,
						verifyData,
						curForward,
						curUp,
						curDown,
						curBack,
						getOriginLen
					} = utils;

					const printBox = (
						width,
						height,
						style = '# ',
						left = 0,
						top = 0,
						type = 'coordinate'
					) => {
						let result = curForward(left) + curUp(top);
						const hasSide = width > 1 || height > 1;

						for (let i = 0; i < height; i++) {
							for (let j = 0; j < width; j++) {
								result += style;
							}

							if (hasSide) {
								if (i !== height - 1) {
									result += EOL + curForward(left);
								} else {
									result += EOL;
								}
							}
						}

						if (type === 'data') {
							result +=
								curDown(hasSide ? top - height : top) +
								curBack(left + getOriginLen(style));
						}
						return result;
					};

					module.exports = (data, opts) => {
						verifyData(data);

						const newOpts = Object.assign(
							{
								width: 10,
								left: 2,
								height: 10,
								style: '# ',
								sides: [1, 1],
								hAxis: ['+', '-', '>'],
								vAxis: ['|', 'A'],
								hName: 'X Axis',
								vName: 'Y Axis',
								zero: '+',
								ratio: [1, 1],
								hGap: 2,
								vGap: 2,
								legendGap: 0
							},
							opts
						);

						const {
							left,
							height,
							style,
							sides,
							width,
							zero,
							hAxis,
							vAxis,
							ratio,
							hName,
							vName,
							hGap,
							vGap,
							legendGap
						} = newOpts;

						let tmp;
						let result = '';
						const styles = data.map(item => item.style || style);
						const allSides = data.map(item => item.sides || sides);
						const keys = new Set(data.map(item => item.key));

						result += PAD.repeat(left) + vName;
						result += PAD.repeat(legendGap);
						result +=
							Array.from(keys)
								.map(
									key =>
										key +
										': ' +
										(data.find(item => item.key === key)
											.style || style)
								)
								.join(' | ') + EOL.repeat(2);

						result += printBox(
							width + left,
							height + 1,
							PAD.repeat(2)
						);

						data.map((item, index) => {
							result += printBox(
								allSides[index][0],
								allSides[index][1],
								styles[index],
								item.value[0] * 2 + left + 1,
								item.value[1],
								'data'
							);
						});

						result +=
							curBack(width * 2) +
							curUp(height + 1) +
							PAD.repeat(left + 1) +
							vAxis[1];

						for (let i = 0; i < height + 1; i++) {
							tmp =
								(height - i) % vGap === 0 && i !== height
									? ((height - i) * ratio[1]).toString()
									: '';
							result += EOL + tmp.padStart(left + 1) + vAxis[0];
						}

						result +=
							curBack() +
							zero +
							curDown(1) +
							curBack(1) +
							'0' +
							curUp(1);

						for (let i = 1; i < width * 2 + hGap; i++) {
							if (!(i % (hGap * 2))) {
								result += hAxis[0];

								// Draw scale of horizontal axis
								const item = (i / 2) * ratio[0];
								const len = item.toString().length;

								result +=
									curDown(1) + curBack(1) + item + curUp(1);
								if (len > 1) {
									result += curBack(len - 1);
								}

								continue;
							}

							result += hAxis[1];
						}

						result += hAxis[2] + PAD + hName + EOL;

						return result;
					};
				},
				{ './utils': 11 }
			],
			11: [
				function (require, module, exports) {
					const os = require('os');
					const PAD = ' ';
					const EOL = os.EOL;

					/**
					 * @param strIndex: str #Index on the label starting with 1. (1 the minimum)
					 * @param labels: List[str] #List of labels where we should aim to fetch the label from.
					 * Based on a string index label, it returns the position belonging to an arr of strings, if the element is not available, returns just the number
					 */
					const getLabel = (strIndex, labels) => {
						try {
							const position = parseInt(strIndex);
							const labelToReturn = labels[position];
							return labelToReturn;
						} catch (err) {
							return strIndex;
						}
					};

					const bgColors = {
						black: '40',
						red: '41',
						green: '42',
						yellow: '43',
						blue: '44',
						magenta: '45',
						cyan: '46',
						white: '47'
					};

					module.exports = {
						PAD,
						EOL,
						getLabel,

						bg: (color = 'cyan', length = 1) => {
							const currentBg = bgColors[color];
							if (typeof color !== 'string' || !currentBg) {
								throw new TypeError(
									`Invalid backgroundColor: ${JSON.stringify(
										color
									)}`
								);
							}

							return (
								'\x1b[' +
								currentBg +
								'm' +
								PAD.repeat(length) +
								'\x1b[0m'
							);
						},

						fg: (color = 'cyan', str) => {
							const currentBg = bgColors[color];
							if (typeof color !== 'string' || !currentBg) {
								throw new TypeError(
									`Invalid foregroundColor: ${JSON.stringify(
										color
									)}`
								);
							}

							return (
								'\x1b[' +
								parseInt(bgColors[color] - 10) +
								'm' +
								str +
								'\x1b[0m'
							);
						},

						padMid: (str, width) => {
							const mid = Math.round((width - str.length) / 2);
							const length = str.length;

							return length > width
								? str.padEnd(width)
								: PAD.repeat(mid) +
										str +
										PAD.repeat(
											mid +
												(mid * 2 + length > width
													? -1
													: 0)
										);
						},

						verifyData: data => {
							const length = data.length;

							if (
								!Array.isArray(data) ||
								length === 0 ||
								!data.every(
									item =>
										item.key && !Number.isNaN(item.value)
								)
							) {
								throw new TypeError(
									`Invalid data: ${JSON.stringify(data)}`
								);
							}
						},

						maxKeyLen: data =>
							Math.max.apply(
								null,
								data.map(item => item.key.length)
							),
						// eslint-disable-next-line
						getOriginLen: str =>
							str.replace(/\x1b\[[0-9;]*m/g, '').length,

						curForward: (step = 1) => `\x1b[${step}C`,
						curUp: (step = 1) => `\x1b[${step}A`,
						curDown: (step = 1) => `\x1b[${step}B`,
						curBack: (step = 1) => `\x1b[${step}D`
					};
				},
				{ os: 12 }
			],
			12: [
				function (require, module, exports) {
					exports.endianness = function () {
						return 'LE';
					};

					exports.hostname = function () {
						if (typeof location !== 'undefined') {
							return location.hostname;
						} else return '';
					};

					exports.loadavg = function () {
						return [];
					};

					exports.uptime = function () {
						return 0;
					};

					exports.freemem = function () {
						return Number.MAX_VALUE;
					};

					exports.totalmem = function () {
						return Number.MAX_VALUE;
					};

					exports.cpus = function () {
						return [];
					};

					exports.type = function () {
						return 'Browser';
					};

					exports.release = function () {
						if (typeof navigator !== 'undefined') {
							return navigator.appVersion;
						}
						return '';
					};

					exports.networkInterfaces = exports.getNetworkInterfaces =
						function () {
							return {};
						};

					exports.arch = function () {
						return 'javascript';
					};

					exports.platform = function () {
						return 'browser';
					};

					exports.tmpdir = exports.tmpDir = function () {
						return '/tmp';
					};

					exports.EOL = '\n';

					exports.homedir = function () {
						return '/';
					};
				},
				{}
			]
		},
		{},
		[1]
	)(1);
});
