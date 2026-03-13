const { requestJson } = require('../httpClient');

class OpenAICompatProvider {
	constructor(config) {
		this.config = config;
	}

	async chat({ systemPrompt = '', userPrompt = '' }) {
		const payload = {
			model: this.config.model,
			temperature: this.config.temperature,
			max_tokens: this.config.maxFollowupTokens,
			messages: [
				...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
				{ role: 'user', content: userPrompt }
			]
		};

		const response = await requestJson({
			method: 'POST',
			url: `${this.config.baseUrl.replace(/\/$/, '')}/v1/chat/completions`,
			body: payload,
			headers: this.config.apiKey
				? { Authorization: `Bearer ${this.config.apiKey}` }
				: {},
			timeoutMs: this.config.timeoutMs
		});

		return response?.choices?.[0]?.message?.content || '';
	}

	async testConnection() {
		await requestJson({
			method: 'GET',
			url: `${this.config.baseUrl.replace(/\/$/, '')}/v1/models`,
			headers: this.config.apiKey
				? { Authorization: `Bearer ${this.config.apiKey}` }
				: {},
			timeoutMs: this.config.timeoutMs
		});
		return true;
	}
}

module.exports = {
	OpenAICompatProvider
};
