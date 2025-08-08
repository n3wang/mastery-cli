/**
 * Collection of problems from:
 *
 * - Books
 *  - [ ] The Colossal Book of Short Puzzles and Problems
 *  - [ ]
 *
 * Intensions:
 * - Add Game Theory and random collection of interesting problems.
 */

const combinatorics = [
	{
		term: 'Ambiguous Dates',
		description:
			'In this country a date such as July 4, 1971, is often written 7/4/71,\n\
        but in other countries the month is given second and the same date is \n\
        written 4/7/71. If you do not know which system is being used, how \n\
        many dates in a year are ambiguous in this two-slash notation?',
		prompt: 'How many dates in a year are ambiguous in this two-slash notation?',
		example:
			'Each month has 11 ambiguous dates (a date such as 8/8/2000 is not ambiguous. Making it: \n\
        11 * 12 = 132'
	},
	{
		term: 'ten-digits numbers',
		prompt: 'How many different 10-digit numbers, such as 7829034651, can be written by using all 10 digits? Numbers starting from zero are excluded',
		example: '9!/10 = 362880/10 = 3265920'
	}
];
