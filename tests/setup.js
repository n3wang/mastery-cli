/**
 * Mocha root hooks — run once for the whole suite.
 *
 * Points MASTERY_HOME at a throwaway directory so tests never read or write
 * the developer's real vault. Without this the suite leaves queues, ratings
 * and stub deck directories in the user's actual data.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const TEST_VAULT = fs.mkdtempSync(
	path.join(os.tmpdir(), 'mastery-test-vault-')
);

// Set before anything requires src/vault.js — the root hook file is loaded
// first, but vault.js reads the variable per call, so this is safe either way.
process.env.MASTERY_HOME = TEST_VAULT;

exports.mochaGlobalSetup = function () {
	const { ensureVaultLayout } = require('../src/vault');
	ensureVaultLayout();
};

exports.mochaGlobalTeardown = function () {
	try {
		fs.rmSync(TEST_VAULT, { recursive: true, force: true });
	} catch (error) {
		// A leftover temp directory is harmless; do not fail the suite over it.
	}
};

exports.TEST_VAULT = TEST_VAULT;
