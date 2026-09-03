const cfa_interest_rates = [
	{
		term: 'Understanding Interest Rate Components',
		description:
			'Given the formula: Nominal interest rate = Real risk-free interest rate + Inflation premium + Default risk premium + Liquidity premium + Maturity premium\n\nAnd the example: 10% = 4% + Inflation premium + 1% + 2% + 1%\n\nYou are asked to determine the value of the Inflation premium.',
		prompt: 'What is the value of the Inflation premium?',
		example: '2%\n\
        This is calculated as 10% - 4% - 1% - 2% - 1% = 2%'
	},
	{
		term: 'Definition of Real Risk-Free Interest Rate',
		description:
			'The real risk-free interest rate is the single-period interest rate for a completely risk-free security if no inflation were expected. In economic theory, the real risk-free rate reflects the time preferences of individuals for current versus future real consumption.',
		prompt: 'What does the real risk-free interest rate represent?',
		example: "The real risk-free interest rate represents the single-period interest rate for a completely risk-free security if no inflation were expected, reflecting individuals' time preferences for current versus future real consumption."
	},
	{
		term: 'Definition of Inflation Premium',
		description:
			'The inflation premium compensates investors for expected inflation and reflects the average inflation rate expected over the maturity of the debt. Inflation reduces the purchasing power of a unit of currency—the amount of goods and services one can buy with it.',
		prompt: 'What does the inflation premium compensate investors for?',
		example: 'The inflation premium compensates investors for expected inflation and reflects the average inflation rate expected over the maturity of the debt, as inflation reduces the purchasing power of currency.'
	},
	{
		term: 'Definition of Default Risk Premium',
		description:
			'The default risk premium compensates investors for the possibility that the borrower will fail to make a promised payment at the contracted time and in the contracted amount.',
		prompt: 'What does the default risk premium compensate investors for?',
		example: 'The default risk premium compensates investors for the possibility that the borrower will fail to make a promised payment at the contracted time and in the contracted amount.'
	},
	{
		term: 'Definition of Liquidity Premium',
		description:
			'The liquidity premium compensates investors for the risk of loss relative to an investment’s fair value if the investment needs to be converted to cash quickly. US Treasury bills (T-bills), for example, do not bear a liquidity premium because large amounts of them can be bought and sold without affecting their market price. Many bonds of small issuers, by contrast, trade infrequently after they are issued; the interest rate on such bonds includes a liquidity premium reflecting the relatively high costs (including the impact on price) of selling a position.',
		prompt: 'What does the liquidity premium compensate investors for?',
		example: 'The liquidity premium compensates investors for the risk of loss relative to an investment’s fair value if the investment needs to be converted to cash quickly, reflecting the relatively high costs of selling a position.'
	},
	{
		term: 'Definition of Maturity Premium',
		description:
			'The maturity premium compensates investors for the increased sensitivity of the market value of debt to a change in market interest rates as maturity is extended, in general (holding all else equal). The difference between the interest rate on longer-maturity, liquid Treasury debt and that on short-term Treasury debt typically reflects a positive maturity premium for the longer-term debt (and possibly different inflation premiums as well).',
		prompt: 'What does the maturity premium compensate investors for?',
		example: 'The maturity premium compensates investors for the increased sensitivity of the market value of debt to a change in market interest rates as maturity is extended, reflecting the positive difference in interest rates between longer-maturity and short-term debt.'
	},
	{
		term: 'nominal risk rate',
		description:
			'The nominal risk rate is the sum of the real risk-free interest rate and the inflation premium.',
		prompt: 'Calculate the nominal risk rate given the real risk-free interest rate is 3% and the inflation premium is 2%.',
		example: '5%'
	},
	{
		term: 'Calculating Holding Period Return with Reinvestment',
		description:
			"You invested $10,000 in a mutual fund one year ago. \n\
        The fund's initial NAV was $20 per share. At the end of the year, \n\
        the NAV has increased to $22 per share. \n\
        During the year, the fund distributed a dividend of $1 per share, \n\
        which you reinvested. Calculate the holding period return.",
		prompt: 'What is the holding period return?',
		example: 'Holding period return = (Ending value + Dividends - Initial value) / Initial value * 100\n\
        Holding period return = (($22 * X) + ($1 * X) - ($20 * X)) / ($20 * X) * 100\n\
        Where X is the number of shares bought with $10,000 at $20 per share.\n\
        X = $10,000 / $20 = 500 shares\n\
        Holding period return = (($22 * 500) + ($1 * 500) - ($20 * 500)) / ($20 * 500) * 100\n\
        Holding period return = ($11,000 + $500 - $10,000) / $10,000 * 100\n\
        Holding period return = $1500 / $10,000 * 100\n\
        Holding period return = 15%'
	}
];

const cfa = cfa_interest_rates;

module.exports = { cfa };
