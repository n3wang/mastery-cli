const { AutoComplete, Confirm, Input } = require('enquirer');
const {
	normalizeLlmConfig,
	normalizeLlmRoot,
	LLMService,
	DEFAULT_LLM_CONFIG
} = require('./LLMService');

function printLLMStatus(config) {
	const status = config.enabled ? 'ON' : 'OFF';
	console.log(`\nLocal LLM status: ${status}`);
	if (config.profileName) {
		console.log(`Active profile: ${config.profileName}`);
	}
	console.log(`Provider: ${config.provider}`);
	console.log(`Base URL: ${config.baseUrl}`);
	console.log(`Model: ${config.model}`);
	console.log(`Follow-up helper: ${config.followupEnabled ? 'ON' : 'OFF'}`);
	console.log(`Timeout: ${config.timeoutMs}ms`);
	if (
		Array.isArray(config.availableProfiles) &&
		config.availableProfiles.length > 0
	) {
		console.log(`Profiles: ${config.availableProfiles.join(', ')}`);
	}
	console.log('');
}

async function runLLMWizard(existingConfig = {}) {
	const root = normalizeLlmRoot(existingConfig);
	const profileChoices = Object.keys(root.profiles);

	const targetProfileName = await new AutoComplete({
		name: 'targetProfile',
		message: 'Choose LLM profile to configure:',
		initial: root.activeProfile,
		choices: [...profileChoices, 'Create new profile']
	}).run();

	let selectedProfileName = targetProfileName;
	if (targetProfileName === 'Create new profile') {
		const newProfileNameRaw = await new Input({
			name: 'newProfileName',
			message: 'New profile name:',
			initial: 'llama2'
		}).run();
		selectedProfileName = (newProfileNameRaw || '').trim() || 'profile';
	}

	const merged = normalizeLlmConfig(root.profiles[selectedProfileName] || {});

	const shouldEnable = await new Confirm({
		name: 'enabled',
		message: 'Enable local LLM integration?',
		initial: merged.enabled
	}).run();

	if (!shouldEnable) {
		return {
			...root,
			enabled: false,
			activeProfile: selectedProfileName,
			profiles: {
				...root.profiles,
				[selectedProfileName]: {
					...merged,
					enabled: false
				}
			}
		};
	}

	const provider = await new AutoComplete({
		name: 'provider',
		message: 'Choose local provider type:',
		initial: merged.provider,
		choices: ['ollama', 'openai-compatible-local', 'custom-http']
	}).run();

	const defaultBaseByProvider = {
		ollama: 'http://127.0.0.1:11434',
		'openai-compatible-local': 'http://127.0.0.1:1234',
		'custom-http': merged.baseUrl || DEFAULT_LLM_CONFIG.baseUrl
	};

	const baseUrl = await new Input({
		name: 'baseUrl',
		message: 'Base URL:',
		initial: merged.baseUrl || defaultBaseByProvider[provider]
	}).run();

	const model = await new Input({
		name: 'model',
		message: 'Model name:',
		initial: merged.model
	}).run();

	const timeoutInput = await new Input({
		name: 'timeoutMs',
		message: 'Timeout in milliseconds:',
		initial: String(merged.timeoutMs)
	}).run();

	const promptProfile = await new AutoComplete({
		name: 'promptProfile',
		message: 'Prompt profile:',
		initial: merged.promptProfile,
		choices: ['coach', 'strict-grader', 'socratic']
	}).run();

	const followupEnabled = await new Confirm({
		name: 'followupEnabled',
		message:
			'Enable flashcard follow-up helper when answers are incorrect?',
		initial: merged.followupEnabled
	}).run();

	const nextProfileConfig = normalizeLlmConfig({
		...merged,
		enabled: true,
		provider,
		baseUrl,
		model,
		timeoutMs: Number.parseInt(timeoutInput, 10),
		promptProfile,
		followupEnabled
	});

	const shouldTest = await new Confirm({
		name: 'testConnection',
		message: 'Test connection now?',
		initial: true
	}).run();

	if (shouldTest) {
		const service = new LLMService(nextProfileConfig);
		try {
			await service.testConnection();
			console.log('Local LLM connection test successful.');
		} catch (error) {
			console.log(`Local LLM test failed: ${error.message}`);
			const retry = await new Confirm({
				name: 'retry',
				message: 'Retry wizard setup from the beginning?',
				initial: false
			}).run();

			if (retry) {
				return runLLMWizard({
					...root,
					activeProfile: selectedProfileName,
					profiles: {
						...root.profiles,
						[selectedProfileName]: nextProfileConfig
					}
				});
			}
		}
	}

	const shouldSetActive = await new Confirm({
		name: 'setActive',
		message: `Set "${selectedProfileName}" as active profile?`,
		initial: true
	}).run();

	return {
		...root,
		enabled: true,
		activeProfile: shouldSetActive
			? selectedProfileName
			: root.activeProfile,
		profiles: {
			...root.profiles,
			[selectedProfileName]: nextProfileConfig
		}
	};
}

module.exports = {
	runLLMWizard,
	printLLMStatus
};
