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
				`Invalid backgroundColor: ${JSON.stringify(color)}`
			);
		}

		return '\x1b[' + currentBg + 'm' + PAD.repeat(length) + '\x1b[0m';
	},

	fg: (color = 'cyan', str) => {
		const currentBg = bgColors[color];
		if (typeof color !== 'string' || !currentBg) {
			throw new TypeError(
				`Invalid foregroundColor: ${JSON.stringify(color)}`
			);
		}

		return '\x1b[' + parseInt(bgColors[color] - 10) + 'm' + str + '\x1b[0m';
	},

	padMid: (str, width) => {
		const mid = Math.round((width - str.length) / 2);
		const length = str.length;

		return length > width
			? str.padEnd(width)
			: PAD.repeat(mid) +
					str +
					PAD.repeat(mid + (mid * 2 + length > width ? -1 : 0));
	},

	verifyData: data => {
		const length = data.length;

		if (
			!Array.isArray(data) ||
			length === 0 ||
			!data.every(item => item.key && !Number.isNaN(item.value))
		) {
			throw new TypeError(`Invalid data: ${JSON.stringify(data)}`);
		}
	},

	maxKeyLen: data =>
		Math.max.apply(
			null,
			data.map(item => item.key.length)
		),
	// eslint-disable-next-line
	getOriginLen: str => str.replace(/\x1b\[[0-9;]*m/g, '').length,

	curForward: (step = 1) => `\x1b[${step}C`,
	curUp: (step = 1) => `\x1b[${step}A`,
	curDown: (step = 1) => `\x1b[${step}B`,
	curBack: (step = 1) => `\x1b[${step}D`
};
