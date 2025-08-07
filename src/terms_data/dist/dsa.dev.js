'use strict';

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

/**
 * Introductions to algorithms
 * https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/video_galleries/lecture-videos/
 *
 * Design and Analysis of Algorithms
 * https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/video_galleries/lecture-videos/
 */
var system = [
	{
		term: 'system design',
		prompt: 'How would you design an Photo App?',
		description: '',
		example: '(1) Do you have a real life example? Whats the audience?'
	},
	_defineProperty(
		{
			term: 'garbage collection',
			prompt: 'What is this | in which language are they found?',
			description:
				"is a dynamic technique for memory management and heap allocation that examines and identifies dead memory blocks before reallocating storage for reuse. Garbage collection's primary goal is to reduce memory leaks."
		},
		'prompt',
		'Garbage collection (GC) is a memory recovery feature built into programming languages such as C# and Java.'
	)
];
module.exports = {
	system: system
};
