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
