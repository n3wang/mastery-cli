const { requestJson } = require('../httpClient');

class OllamaProvider {
	constructor(config) {
		this.config = config;
	}

	getApiBase() {
		const normalized = this.config.baseUrl.replace(/\/$/, '');
		if (normalized.endsWith('/api')) {
			return normalized;
		}
		return `${normalized}/api`;
	}

	async chat({ systemPrompt = '', userPrompt = '' }) {
		const payload = {
			model: this.config.model,
			stream: false,
			messages: [
				...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
				{ role: 'user', content: userPrompt }
			]
		};

		const response = await requestJson({
			method: 'POST',
			url: `${this.getApiBase()}/chat`,
			body: payload,
			timeoutMs: this.config.timeoutMs
		});

		return response?.message?.content || '';
	}

	async testConnection() {
		await requestJson({
			method: 'GET',
			url: `${this.getApiBase()}/tags`,
			timeoutMs: this.config.timeoutMs
		});
		return true;
	}
}

module.exports = {
	OllamaProvider
};
