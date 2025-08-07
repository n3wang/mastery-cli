/**
 * You should just stick to learn all these terms.
 * https://www.investopedia.com/financial-term-dictionary-4769738
 * I think I will go more for categorizing from where do they start as instead of the first letter to categorize things.
 */

// https://www.investopedia.com/accounting-4689820
const accounting = [
	{
		term: 'progress-billing',
		prompt: 'What is progress billing? Why would you ever use it?',
		example:
			'Progress billings are invoices requesting payment for work completed to date. Progress billings are prepared and submitted for payment at different stages in the process of a major project. \n\
        Progress billings are invoices that are submitted for work completed to date on a lengthy project.     Progress billings are primarily used for long-term projects that often come with large budgets.     Progress billings are common for large-scale construction projects, and the aerospace and defense industries.',
		description:
			'A method of billing in which a contractor or service provider bills the client for work completed to date. Progress billing is often used in construction projects, where the contractor bills the client for work completed to date, rather than for work completed at the end of the project. Progress billing is also used in the software development industry, where the contractor bills the client for work completed to date, rather than for work completed at the end of the project. Progress billing is also used in the software development industry, where the contractor bills the client for work completed to date, rather than for work completed at the end of the project.'
	},
	{
		term: 'marketeable-securities',
		prompt: 'What are marketable securities? Why would you ever use it?',
		example:
			'Marketable securities are financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments. Marketable securities are financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments. Marketable securities are financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments.',
		description:
			'Financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments. Marketable securities are financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments. Marketable securities are financial assets that can be readily bought and sold in the market. Marketable securities include stocks, bonds, and other debt instruments.\n\
        Marketable securities are assets that can be liquidated to cash quickly.     These short-term liquid securities can be bought or sold on a public stock exchange or a public bond exchange.     These securities tend to mature in a year or less and can be either debt or equity.     Marketable securities include common stock, Treasury bills, and money market instruments, among others.'
	},
	{
		term: 'cycle-billing',
		prompt: 'What is cycle billing? Why would you ever use it?',
		example:
			'Cycle billing is the practice of invoicing different customers based on a schedule rather than billing all accounts at once on a single date. Statements are prepared and sent out at varying intervals, spreading out the company’s workload and making it easier for it to keep track of who has been billed.',
		description:
			"      Cycle billing is a style of account management that enables companies to bill customers on different days of the month, rather than all on the same day.     The practice allows the company to prepare and distribute statements on different days, versus having a glut of invoices that must be sent at the same time.     Cycle billing enables companies to create a customized schedule that allows for easier tracking as to which customers have been billed, have paid, or have not paid.     Strategies include invoicing for the largest amounts owed first, then the next biggest, and so forth; billing alphabetically; or billing based on the day of the month the customer's account was opened, or the customer chose to be billed.     The lengths of billing cycles can vary customer to customer, based on what cash flow the company needs and the creditworthiness of a customer."
	}
];

const business_law = [];

const business_management = [];

const business_terms = [
	{
		term: "Kryder's Law",
		prompt: "What is Kryder's Law? Imagine a scenario where you would use it to make money.",
		description:
			"This law states that the storage density of hard disk drives (HDDs) doubles roughly every 18 months, similar to Moore's Law for microchips"
	},
	{
		term: "Nielsen's Law",
		prompt: "What is Nielsen's Law? Imagine a scenario where you would use it to make money.",
		description:
			'his law states that the available bandwidth for internet connections tends to increase at a rate of 50% per year.'
	},
	{
		term: "Moore's Law",
		prompt: "What is Moore's Law? Imagine a scenario where you would use it to make money.",
		description:
			"Moore's Law has been a driving force behind the rapid development of technology over the past few decades, as it has allowed computer hardware to become smaller, faster, and more affordable. It has also led to the development of new technologies and applications that were once thought impossible."
	},
	// https://www.d.umn.edu/~tkwon/course/5315/HW/MultiprocessorLaws.pdf
	{
		term: "Adahl's Law",
		prompt: "What is Adahl's Law? Imagine a scenario where you would use it to make money.",
		description:
			'This law describes the theoretical limit of the speedup that can be achieved from parallel computing, stating that the maximum speedup is limited by the proportion of the program that cannot be parallelized.'
	},
	{
		term: "Gustafson's Law",
		prompt: "What is Gustafson's Law? Imagine a scenario where you would use it to make money.",
		description:
			"This law proposes that instead of trying to speed up individual tasks through parallel computing, it is more beneficial to scale up the size of the problem to fit the available resources.\n\
        Gustafson's Law is a principle in computer science that says that it's better to work on one big problem at a time rather than breaking it up into smaller pieces and trying to work on them all at once. This is because when you work on a big problem, you can use all the resources available to you, like multiple processors or computers, to solve the problem faster. But if you try to break the problem into smaller pieces, you might not be able to use all your resources efficiently and it might take longer to solve the problem."
	},
	{
		term: "Parkinson's Law",
		prompt: "What is Parkinson's Law? Imagine a scenario where you would use it to make money.",
		description:
			'This law states that data expands to fill the storage available, meaning that as storage capacity increases, the amount of data stored tends to increase as well.'
	},
	{
		term: "Sun and Ni's Law",
		description:
			"Sun and Ni's Law states that the performance of parallel algorithms is limited by the amount of sequential computation that must be performed. In other words, even in a parallel computing environment, there may be certain parts of an algorithm that cannot be parallelized and must be executed sequentially. This sequential part of the algorithm is known as the \"critical path.\" Sun and Ni's Law suggests that in order to optimize the performance of a parallel algorithm, it is important to reduce the amount of sequential computation and minimize the length of the critical path. This can be achieved through a variety of techniques, such as algorithmic redesign, data reorganization, and workload balancing. Overall, Sun and Ni's Law highlights the importance of careful algorithm design and optimization in order to fully realize the benefits of parallel computing. By minimizing the amount of sequential computation and optimizing the critical path, it is possible to achieve significant performance gains in parallel computing environments",
		prompt: "What is Sun and Ni's Law? Imagine a scenario where you would use it to make money."
	}
];

module.exports = {
	accounting,
	business_law,
	business_management,
	business_terms
};
