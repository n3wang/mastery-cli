/**
 * Local Terminal Charts Implementation
 *
 * This is a local replacement for the terminal-charter package to avoid dependency issues
 * in corporate environments. It provides basic terminal charting functionality.
 */

const os = require('os');

// Constants
const PAD = ' ';
const EOL = os.EOL;

// Background colors mapping
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

// Foreground colors mapping
const fgColors = {
	black: '30',
	red: '31',
	green: '32',
	yellow: '33',
	blue: '34',
	magenta: '35',
	cyan: '36',
	white: '37'
};

/**
 * Utility functions
 */
const utils = {
	PAD,
	EOL,

	/**
	 * Get label from position
	 */
	getLabel: (strIndex, labels) => {
		try {
			const position = parseInt(strIndex);
			const labelToReturn = labels[position];
			return labelToReturn;
		} catch (err) {
			return strIndex;
		}
	},

	/**
	 * Background color function
	 */
	bg: (color = 'cyan', length = 1) => {
		const currentBg = bgColors[color];
		if (typeof color !== 'string' || !currentBg) {
			throw new TypeError(
				`Invalid backgroundColor: ${JSON.stringify(color)}`
			);
		}
		return '\x1b[' + currentBg + 'm' + PAD.repeat(length) + '\x1b[0m';
	},

	/**
	 * Foreground color function
	 */
	fg: (color = 'cyan', str) => {
		const currentFg = fgColors[color];
		if (typeof color !== 'string' || !currentFg) {
			throw new TypeError(
				`Invalid foregroundColor: ${JSON.stringify(color)}`
			);
		}
		return '\x1b[' + currentFg + 'm' + str + '\x1b[0m';
	},

	/**
	 * Pad text in the middle
	 */
	padMid: (str, length) => {
		const padding = Math.max(0, length - str.length);
		const leftPad = Math.floor(padding / 2);
		const rightPad = padding - leftPad;
		return PAD.repeat(leftPad) + str + PAD.repeat(rightPad);
	},

	/**
	 * Verify data format
	 */
	verifyData: data => {
		if (!Array.isArray(data) || data.length === 0) {
			throw new Error('Data must be a non-empty array');
		}
		for (const item of data) {
			if (!item.hasOwnProperty('key') || !item.hasOwnProperty('value')) {
				throw new Error(
					'Each data item must have key and value properties'
				);
			}
		}
	},

	/**
	 * Get maximum key length
	 */
	maxKeyLen: data => {
		return Math.max(...data.map(item => item.key.toString().length));
	},

	/**
	 * Get origin length
	 */
	getOriginLen: data => {
		return Math.max(...data.map(item => item.value.toString().length));
	},

	/**
	 * Cursor movement functions
	 */
	curForward: (n = 1) => `\x1b[${n}C`,
	curUp: (n = 1) => `\x1b[${n}A`,
	curDown: (n = 1) => `\x1b[${n}B`,
	curBack: (n = 1) => `\x1b[${n}D`
};

/**
 * Bar chart function
 */
function bar(data, opts = {}) {
	utils.verifyData(data);

	const options = {
		barWidth: 3,
		left: 1,
		height: 6,
		padding: 3,
		style: '*',
		...opts
	};

	const { barWidth, left, height, padding, style } = options;
	let result = PAD.repeat(left);

	const values = data.map(item => item.value);
	const max = Math.max(...values);
	const length = data.length;

	for (let i = 0; i < height + 2; i++) {
		for (let j = 0; j < length; j++) {
			const tmp = data[j];
			const valStr = tmp.value.toString();
			const ratio = height - (height * tmp.value) / max;

			let padChar;
			if (ratio > i + 2) {
				padChar = PAD;
			} else if (Math.round(ratio) === i) {
				padChar = valStr;
			} else if (Math.round(ratio) < i) {
				padChar = tmp.style || style;
			} else {
				padChar = PAD;
			}

			if (padChar === valStr) {
				result += utils.padMid(valStr, barWidth) + PAD.repeat(padding);
				continue;
			}

			if (i !== height + 1) {
				result += padChar.repeat(barWidth);
			} else {
				result += utils.padMid(tmp.key, barWidth);
			}

			result += PAD.repeat(padding);
		}
		result += EOL + PAD.repeat(left);
	}

	return result;
}

/**
 * Annotation function
 */
function annotation(data, left = 2) {
	let result = PAD.repeat(left);

	const keys = data.map(item => item.key);
	const styles = data.map(item => item.style);

	result += EOL + PAD.repeat(left);

	for (let i = 0; i < styles.length; i++) {
		result +=
			styles[i] + styles[i] + PAD + keys[i] + EOL + PAD.repeat(left);
	}

	return result;
}

/**
 * Simple bullet chart function
 */
function bullet(data, opts = {}) {
	utils.verifyData(data);

	const options = {
		width: 50,
		...opts
	};

	let result = '';
	const maxValue = Math.max(...data.map(item => item.value));

	for (const item of data) {
		const barLength = Math.round((item.value / maxValue) * options.width);
		const bar = (item.style || '█').repeat(barLength);
		result += `${item.key}: ${bar} ${item.value}${EOL}`;
	}

	return result;
}

/**
 * Simple radar chart placeholder
 */
function radar(data, opts = {}) {
	// Simplified radar chart - just show the data in a structured way
	utils.verifyData(data);

	let result = 'Radar Chart:' + EOL;
	for (const item of data) {
		result += `  ${item.key}: ${item.value}${EOL}`;
	}

	return result;
}

// Export the main module
module.exports = {
	bar,
	bullet,
	annotation,
	radar,
	bg: utils.bg,
	fg: utils.fg,

	// Export utils for compatibility with terminal-charter/lib/utils
	lib: {
		utils
	}
};
