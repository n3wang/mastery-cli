'use strict';

var dtypes = {
	// 2-20
	sd_1: 'sd_1',
	sd_2: 'sd_2',
	sd_3: 'sd_3',
	sd_4: 'sd_4',
	sd_5: 'sd_5',
	sd_6: 'sd_6',
	// 2-50
	md_1: 'md_1',
	md_2: 'md_2',
	md_3: 'md_3',
	md_4: 'md_4',
	md_5: 'md_5',
	md_6: 'md_6',
	// 2-100
	d_1: 'd_1',
	d_2: 'd_2',
	d_3: 'd_3',
	d_4: 'd_4',
	d_5: 'd_5',
	d_6: 'd_6',
	// 100-1000
	ld_1: 'ld_1',
	ld_2: 'ld_2',
	ld_3: 'ld_3',
	ld_4: 'ld_4',
	ld_5: 'ld_5',
	ld_6: 'ld_6',
	Y: 'y'
};
var qmathformulas = {
	sum_simple: {
		form: 'y = sd_1 + sd_2 ',
		replace: ['sd_1', 'sd_2'],
		calculates: ['y']
	},
	neg_subs: {
		form: 'y = sd_1 - md_2 ',
		replace: ['sd_1', 'md_2'],
		calculates: ['y']
	},
	sub_simple: {
		form: 'y = sd_1 - sd_2 ',
		replace: ['sd_1', 'sd_2'],
		calculates: ['y']
	},
	mult_simple: {
		form: 'y = sd_1 * sd_2',
		replace: ['sd_1', 'sd_2'],
		calculates: ['y']
	},
	div_simple: {
		form: 'y = sd_1 / sd_2 ',
		replace: ['sd_1', 'sd_2'],
		calculates: ['y'],
		ans_constraint: '.2'
	},
	// "sum_apples": { "form": "y = sd_1 + sd_2 ", "replace": ['sd_1', 'sd_2'], "calculates": ['y'], "human": "I bought sd_1 apples today, and then will buy sd_2 apples tomorrow, how many apples will I have?"},
	// "sum_apples": { "form": "y = sd_1 + sd_2 ", "replace": ['sd_1', 'sd_2'], "calculates": ['y'], "human": "It goes sppeed "},
	precedence: {
		form: 'y=sd_2/sd_3*sd_4+3*sd_5+sd_1%1/2',
		replace: ['sd_1', 'sd_2', 'sd_3', 'sd_4', 'sd_5'],
		calculates: ['y'],
		ans_constraint: '.0'
	},
	'bus-conversion-rate': {
		form: 'Y = sd_1 / sd_2 * 100',
		replace: ['sd_1', 'sd_2'],
		calculates: ['y'],
		ans_constraint: '.0',
		human: 'Calculate conversion rate (in percentage): \nnumber of conversions: sd_1\n number of visitors : sd_2\n'
	},
	'bus-clv': {
		form: 'Y = sd_1 * sd_2 * sd_3',
		replace: ['sd_1', 'sd_2', 'sd_3'],
		calculates: ['y'],
		ans_constraint: '.0',
		human: 'Calculate Customer Lifetime Value (CLV): \nAverage purchase value: sd_1\n number of purchases per year: sd_2\n Naverage customer lifespan: sd_3\n'
	},
	'bus-roi': {
		form: 'Y = (ld_1 - ld_2)/ ld_2',
		replace: ['ld_1', 'ld2'],
		calculates: ['y'],
		ans_constraint: '.0',
		human: 'Calculate ROI (Return of Investment): \nnGain from Investments: ld_1\n Cost of Investment: ld_2\n'
	},
	'bus-retention': {
		form: 'Y = (d_1 - md_2) / d_3',
		replace: ['d_1', 'md_2', 'd_3'],
		calculates: ['y'],
		ans_constraint: '.1',
		human: 'Calculate customer retention rate: \nCustomers at the beginning of the year: d_3\n adquires md_2 this year\n and at the end of the year has d_1 customers\n'
	},
	'stats-variance': {
		form: 'y = ((sd_1 - (sd_1 + 15) / 2)^2 + (15 - (sd_1 + 15) / 2)^2) / 2',
		replace: ['sd_1'],
		calculates: ['y'],
		ans_constraint: '.3',
		human: 'Calculate the variance of [ sd_1, 15 ]'
	},
	'stats-std': {
		form: 'y = sqrt(d_1)',
		replace: ['d_1'],
		calculates: ['y'],
		ans_constraint: '.1',
		human: 'Provided that the variance is d_1, calculate the standard deviation'
	},
	'stats-chose': {
		form: 'y = (sd_1/(sd_1 + d_2))*100',
		replace: ['sd_1', 'd_2'],
		calculates: ['y'],
		ans_constraint: '.1',
		human: 'A bag contains sd_1 red marbles and d_2 blue marbles. If you choose a marble at random, what is the probability that it will be red? (percentage %)'
	},
	'stats-select-consecutive': {
		form: 'y = (sd_1/(sd_1 + d_2) * (sd_1- 1)/(sd_1 + d_2 - 1))',
		replace: ['sd_1', 'd_2'],
		calculates: ['y'],
		ans_constraint: '.2',
		human: 'A bag contains sd_1 red marbles and d_2 blue marbles. . If you draw two balls at random without replacement, what is the probability that both will be red?'
	}
};
module.exports = {
	qmathformulas: qmathformulas
};
