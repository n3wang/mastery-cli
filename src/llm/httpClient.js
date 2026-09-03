const http = require('http');
const https = require('https');

function requestJson({
	method = 'GET',
	url,
	headers = {},
	body = null,
	timeoutMs = 12000
}) {
	return new Promise((resolve, reject) => {
		let parsedUrl;
		try {
			parsedUrl = new URL(url);
		} catch (error) {
			reject(new Error(`Invalid URL: ${url}`));
			return;
		}

		const transport = parsedUrl.protocol === 'https:' ? https : http;
		const payload = body === null ? null : JSON.stringify(body);

		const req = transport.request(
			parsedUrl,
			{
				method,
				headers: {
					'Content-Type': 'application/json',
					...headers,
					...(payload
						? { 'Content-Length': Buffer.byteLength(payload) }
						: {})
				},
				timeout: timeoutMs
			},
			res => {
				let chunks = '';
				res.setEncoding('utf8');
				res.on('data', chunk => {
					chunks += chunk;
				});
				res.on('end', () => {
					const statusCode = res.statusCode || 0;
					if (statusCode < 200 || statusCode >= 300) {
						reject(
							new Error(
								`HTTP ${statusCode}: ${chunks.slice(0, 300)}`
							)
						);
						return;
					}

					if (!chunks) {
						resolve({});
						return;
					}

					try {
						resolve(JSON.parse(chunks));
					} catch (error) {
						reject(
							new Error(
								'Invalid JSON response from local LLM endpoint'
							)
						);
					}
				});
			}
		);

		req.on('timeout', () => {
			req.destroy(new Error('Request timeout'));
		});
		req.on('error', reject);

		if (payload) {
			req.write(payload);
		}

		req.end();
	});
}

module.exports = {
	requestJson
};
