function buildTopicChatPrompt({
	term = '',
	question = '',
	userAnswer = '',
	expectedAnswer = '',
	history = [],
	latestUserMessage = ''
}) {
	const formattedHistory = history
		.map(
			turn =>
				`${turn.role === 'assistant' ? 'Assistant' : 'User'}: ${turn.content}`
		)
		.join('\n');

	const sections = [
		'You are a flashcard study coach in an interactive chat.',
		'Do not use rigid sections like Diagnosis or Correct Answer.',
		'Answer naturally and conversationally based on the current topic.',
		'Prefer concise responses (3-8 lines), use examples when helpful.',
		'',
		`Flashcard topic: ${question || term}`,
		`Learner original answer: ${userAnswer || '(empty)'}`,
		`Reference context: ${expectedAnswer || '(not provided)'}`,
		'',
		'Conversation so far:',
		formattedHistory || '(no previous messages)',
		'',
		`Latest user message: ${latestUserMessage}`,
		'',
		'Respond to the latest user message and stay on topic.'
	];

	return sections.join('\n');
}

module.exports = {
	buildTopicChatPrompt
};
