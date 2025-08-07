const utils = require('./utils');
const { PAD, EOL } = utils;

module.exports = (data, left = 2) => {
	let result = PAD.repeat(left);

	const keys = data.map(item => item.key);
	const styles = data.map(item => item.style);

	result += EOL + PAD.repeat(left);

	for (var i = 0; i < styles.length; i++) {
		result +=
			styles[i] + styles[i] + PAD + keys[i] + EOL + PAD.repeat(left);
	}

	return result;
};
