const { OllamaProvider } = require('./providers/OllamaProvider');
const { OpenAICompatProvider } = require('./providers/OpenAICompatProvider');
const { buildTopicChatPrompt } = require('./prompts/followupPrompt');

const DEFAULT_LLM_CONFIG = {
	enabled: false,
	provider: 'ollama',
	baseUrl: 'http://127.0.0.1:11434',
	model: 'llama3.1:8b-instruct',
	timeoutMs: 12000,
	followupEnabled: true,
	promptProfile: 'coach',
	maxFollowupTokens: 300,
	temperature: 0.3,
	apiKey: ''
};

const DEFAULT_PROFILE_KEY = 'default';

function parseCliBooleanFlag(argv, name) {
	if (argv.includes(`--${name}`)) return true;
	if (argv.includes(`--no-${name}`)) return false;
	return undefined;
}

function normalizeLlmConfig(rawConfig = {}) {
	const merged = {
		...DEFAULT_LLM_CONFIG,
		...(rawConfig || {})
	};

	const timeoutMs = Number.parseInt(merged.timeoutMs, 10);
	merged.timeoutMs = Number.isFinite(timeoutMs)
		? Math.max(1000, Math.min(120000, timeoutMs))
		: DEFAULT_LLM_CONFIG.timeoutMs;

	// An API key is a secret, and the vault config is meant to be committed to
	// the user's own repo. Prefer the environment so the key never has to be
	// written into a tracked file.
	if (process.env.MASTERY_LLM_API_KEY) {
		merged.apiKey = process.env.MASTERY_LLM_API_KEY;
	}

	merged.enabled = Boolean(merged.enabled);
	merged.followupEnabled = Boolean(merged.followupEnabled);
	merged.provider = String(merged.provider || DEFAULT_LLM_CONFIG.provider);
	merged.baseUrl = String(merged.baseUrl || DEFAULT_LLM_CONFIG.baseUrl);
	merged.model = String(merged.model || DEFAULT_LLM_CONFIG.model);
	merged.promptProfile = String(
		merged.promptProfile || DEFAULT_LLM_CONFIG.promptProfile
	);
	merged.maxFollowupTokens = Number.parseInt(merged.maxFollowupTokens, 10);
	if (!Number.isFinite(merged.maxFollowupTokens)) {
		merged.maxFollowupTokens = DEFAULT_LLM_CONFIG.maxFollowupTokens;
	}
	merged.temperature = Number.parseFloat(merged.temperature);
	if (!Number.isFinite(merged.temperature)) {
		merged.temperature = DEFAULT_LLM_CONFIG.temperature;
	}

	return merged;
}

function normalizeLlmRoot(rawLlm = {}) {
	const source = rawLlm || {};
	const hasProfiles =
		source.profiles &&
		typeof source.profiles === 'object' &&
		!Array.isArray(source.profiles) &&
		Object.keys(source.profiles).length > 0;

	const normalizedProfiles = {};

	if (hasProfiles) {
		for (const [profileName, profileConfig] of Object.entries(
			source.profiles
		)) {
			normalizedProfiles[profileName] = normalizeLlmConfig(profileConfig);
		}
	} else {
		normalizedProfiles[DEFAULT_PROFILE_KEY] = normalizeLlmConfig(source);
	}

	const activeProfile =
		typeof source.activeProfile === 'string' &&
		normalizedProfiles[source.activeProfile]
			? source.activeProfile
			: Object.keys(normalizedProfiles)[0] || DEFAULT_PROFILE_KEY;

	return {
		enabled:
			typeof source.enabled === 'boolean'
				? source.enabled
				: (normalizedProfiles[activeProfile]?.enabled ??
					DEFAULT_LLM_CONFIG.enabled),
		followupEnabled:
			typeof source.followupEnabled === 'boolean'
				? source.followupEnabled
				: (normalizedProfiles[activeProfile]?.followupEnabled ??
					DEFAULT_LLM_CONFIG.followupEnabled),
		activeProfile,
		profiles: normalizedProfiles
	};
}

function listLLMProfiles(settings = {}) {
	const root = normalizeLlmRoot(settings.llm || {});
	return Object.entries(root.profiles).map(([name, config]) => ({
		name,
		config,
		isActive: name === root.activeProfile
	}));
}

function resolveRuntimeLLMConfig({
	settings = {},
	argv = process.argv,
	env = process.env,
	profileName = null
} = {}) {
	const root = normalizeLlmRoot(settings.llm || {});
	const selectedProfileName =
		typeof profileName === 'string' && root.profiles[profileName]
			? profileName
			: root.activeProfile;
	const normalized = {
		...root.profiles[selectedProfileName],
		enabled: root.enabled,
		followupEnabled: root.followupEnabled,
		profileName: selectedProfileName,
		availableProfiles: Object.keys(root.profiles)
	};

	const envEnabled = env.MCLI_LLM_ENABLED;
	const envFollowup = env.MCLI_LLM_FOLLOWUP_ENABLED;
	if (envEnabled === '1' || envEnabled === 'true') normalized.enabled = true;
	if (envEnabled === '0' || envEnabled === 'false')
		normalized.enabled = false;
	if (envFollowup === '1' || envFollowup === 'true')
		normalized.followupEnabled = true;
	if (envFollowup === '0' || envFollowup === 'false')
		normalized.followupEnabled = false;

	const cliLlm = parseCliBooleanFlag(argv, 'llm');
	const cliFollowup = parseCliBooleanFlag(argv, 'llm-followup');
	if (typeof cliLlm === 'boolean') normalized.enabled = cliLlm;
	if (typeof cliFollowup === 'boolean')
		normalized.followupEnabled = cliFollowup;

	return normalized;
}

function getSystemPromptForProfile(profile) {
	switch (profile) {
		case 'strict-grader':
			return 'You are a strict but fair grader. Prefer precision and short feedback.';
		case 'socratic':
			return 'You are a Socratic tutor. Guide with questions while still correcting key misconceptions.';
		case 'coach':
		default:
			return 'You are a supportive study coach. Be concise and actionable.';
	}
}

function createProvider(config) {
	if (config.provider === 'ollama') {
		return new OllamaProvider(config);
	}
	if (
		config.provider === 'openai-compatible-local' ||
		config.provider === 'custom-http'
	) {
		return new OpenAICompatProvider(config);
	}
	throw new Error(`Unknown LLM provider: ${config.provider}`);
}

class LLMService {
	constructor(config) {
		this.config = normalizeLlmConfig(config);
		this.provider = createProvider(this.config);
	}

	isEnabled() {
		return this.config.enabled;
	}

	isFollowupEnabled() {
		return this.config.enabled && this.config.followupEnabled;
	}

	async testConnection() {
		return this.provider.testConnection();
	}

	async askFollowup({
		term = {},
		userAnswer = '',
		followupInstruction = ''
	}) {
		const prompt = buildTopicChatPrompt({
			term: term.term || '',
			question: term.prompt || '',
			userAnswer,
			expectedAnswer: term.example || term.description || '',
			history: [],
			latestUserMessage:
				followupInstruction ||
				'Explain this topic to me based on what I answered and keep it conversational.'
		});

		return this.provider.chat({
			systemPrompt: getSystemPromptForProfile(this.config.promptProfile),
			userPrompt: prompt
		});
	}

	async askTopicChatTurn({
		term = {},
		userAnswer = '',
		history = [],
		userMessage = ''
	}) {
		const prompt = buildTopicChatPrompt({
			term: term.term || '',
			question: term.prompt || '',
			userAnswer,
			expectedAnswer: term.example || term.description || '',
			history,
			latestUserMessage: userMessage
		});

		return this.provider.chat({
			systemPrompt: getSystemPromptForProfile(this.config.promptProfile),
			userPrompt: prompt
		});
	}
}

module.exports = {
	LLMService,
	DEFAULT_LLM_CONFIG,
	normalizeLlmRoot,
	normalizeLlmConfig,
	listLLMProfiles,
	resolveRuntimeLLMConfig
};
