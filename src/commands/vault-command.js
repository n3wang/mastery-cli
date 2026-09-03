/**
 * `mastery vault` — inspect and manage the user data vault.
 *
 * Subcommands:
 *   vault path     print the vault location
 *   vault init     create it, write .gitignore + README, offer git init
 *   vault status   what is in it, and whether it is a dirty git repo
 *   vault migrate  re-run the import from the legacy in-package directory
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('node:child_process');

const {
	ENV_VAR,
	getVaultRoot,
	initVault,
	migrateFromPackage,
	vaultExists
} = require('../vault');

function countFiles(dir) {
	if (!fs.existsSync(dir)) {
		return 0;
	}

	let total = 0;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		total += entry.isDirectory()
			? countFiles(path.join(dir, entry.name))
			: 1;
	}
	return total;
}

/**
 * Read git state for the vault, if it is a repo at all.
 * @returns {Object} { isRepo, dirty, changes }
 */
function getGitState(root) {
	if (!fs.existsSync(path.join(root, '.git'))) {
		return { isRepo: false, dirty: false, changes: 0 };
	}

	try {
		const output = execSync('git status --porcelain', {
			cwd: root,
			encoding: 'utf-8',
			stdio: ['ignore', 'pipe', 'ignore']
		});
		const changes = output.split('\n').filter(line => line.trim()).length;
		return { isRepo: true, dirty: changes > 0, changes };
	} catch (error) {
		return { isRepo: true, dirty: false, changes: 0 };
	}
}

function showPath() {
	console.log(getVaultRoot());
}

function showInit() {
	const { root, created } = initVault();

	console.log(`\nVault ready at ${root}`);
	if (created.length > 0) {
		console.log(`Created: ${created.join(', ')}`);
	} else {
		console.log('Nothing to create — it was already set up.');
	}

	const git = getGitState(root);
	if (!git.isRepo) {
		console.log('\nThis is your data. To start versioning it:');
		console.log(`  cd "${root}"`);
		console.log('  git init && git add -A && git commit -m "my decks"');
		console.log('\n.cache/ is already ignored.');
	}
}

function showStatus() {
	const root = getVaultRoot();

	console.log('\n=== Mastery vault ===\n');
	console.log(`Location: ${root}`);

	if (process.env[ENV_VAR]) {
		console.log(`(set by ${ENV_VAR})`);
	}

	if (!vaultExists()) {
		console.log('\nNot created yet. Run: mastery vault init');
		return;
	}

	const sections = [
		['decks', 'decks'],
		['problems', 'problem sets'],
		['progress', 'progress files'],
		['stats', 'stat files']
	];

	console.log('');
	for (const [dir, label] of sections) {
		const full = path.join(root, dir);
		const entries = fs.existsSync(full) ? fs.readdirSync(full).length : 0;
		console.log(`  ${String(entries).padStart(4)} ${label}`);
	}
	console.log(`  ${String(countFiles(path.join(root, '.cache'))).padStart(4)} cached files (not tracked)`);

	const configPath = path.join(root, 'config.json');
	console.log(
		`\nConfig: ${fs.existsSync(configPath) ? configPath : '(none yet)'}`
	);

	const git = getGitState(root);
	console.log('');
	if (!git.isRepo) {
		console.log('Not a git repository. Run "mastery vault init" for how to start one.');
	} else if (git.dirty) {
		console.log(
			`Git: ${git.changes} uncommitted change(s). Worth a commit — this is your study history.`
		);
	} else {
		console.log('Git: clean, everything committed.');
	}
}

function showMigrate() {
	const result = migrateFromPackage();

	if (!result) {
		console.log(
			'\nNothing to migrate — either it already ran, or there is no legacy directory.'
		);
		return;
	}

	console.log(`\nImported from ${result.from}`);
	result.copied.forEach(line => console.log(`  ${line}`));
	console.log(`\nInto ${result.root}`);
	console.log('The source directory was left in place.');
}

const SUBCOMMANDS = {
	path: showPath,
	init: showInit,
	status: showStatus,
	migrate: showMigrate
};

/**
 * Dispatch `mastery vault <subcommand>`; defaults to status.
 */
function handleVaultCommand() {
	const requested = (process.argv[3] || 'status').toLowerCase();
	const handler = SUBCOMMANDS[requested];

	if (!handler) {
		console.log(`Unknown subcommand: ${requested}`);
		console.log(`Available: ${Object.keys(SUBCOMMANDS).join(', ')}`);
		return;
	}

	return handler();
}

module.exports = {
	handleVaultCommand,
	showPath,
	showInit,
	showStatus,
	showMigrate,
	getGitState
};
