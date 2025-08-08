// Red Team

// Blue Team
const securing_applications = [
	{
		term: 'How to prevent SQL injection',
		description:
			'Use prepared statements and parameterized queries. Use stored procedures.'
	}
];

const security_terms_strategies = [
	{
		term: 'cross-site scripting',
		description:
			'A type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.',
		prompt: 'How could you use this?',
		strategy:
			'Use prepared statements and parameterized queries. Use stored procedures.'
	}
];

module.exports = { securing_applications };
