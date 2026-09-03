/**
 * The vault — the single directory holding everything the user owns.
 *
 * Decks, progress, stats and config all live under one root, outside the
 * installed package, so the user can `git init` it and push it to their own
 * private repo. Nothing user-generated stays inside the package, and nothing
 * product-owned is written into the vault.
 *
 * Layout:
 *
 *   $MASTERY_HOME/
 *   ├── .gitignore          written by `mastery vault init`; ignores .cache/
 *   ├── README.md           written by `mastery vault init`
 *   ├── config.json         the single settings file
 *   ├── decks/              SOURCE markdown — the point of tracking
 *   ├── problems/           user-authored DSA problems
 *   ├── progress/           small, durable, worth a commit
 *   ├── stats/              append-only history
 *   └── .cache/             DERIVED, gitignored, safe to delete
 *       ├── parsed/         parsed deck caches
 *       ├── queues/         live session state
 *       └── scratch/        temp problem/solution files
 *
 * Resolution order: $MASTERY_HOME, then a workspace-local directory at
 * src/data/user_data. This keeps all user data local to the repository by
 * default while still allowing an explicit override.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const APP_DIR_NAME = 'mastery-cli';
const ENV_VAR = 'MASTERY_HOME';
const MIGRATION_MARKER = '.migrated-from-package';
const LOCAL_VAULT_ROOT = path.resolve(__dirname, './data/user_data');

/** Directories created inside every vault. */
const VAULT_DIRS = [
	'decks',
	'problems',
	'progress',
	'stats',
	'.cache',
	'.cache/parsed',
	'.cache/queues',
	'.cache/scratch'
];

/**
 * Where the legacy in-package user data lived, before the vault existed.
 * Only read from, and only once, by migrateFromPackage().
 */
/** Content that ships with the package: default config and sample decks. */
const CONTENT_DIR = path.resolve(__dirname, '../content');

const LEGACY_ROOTS = [
	path.join(getOsDataDir(), APP_DIR_NAME),
	path.resolve(__dirname, './data/user_data'),
	path.resolve(__dirname, './user_data'),
	path.resolve(__dirname, '../user_data')
];

/**
 * The OS-conventional per-user data directory.
 * @returns {String} absolute path
 */
function getOsDataDir() {
	const home = os.homedir();

	if (process.platform === 'win32') {
		return process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
	}
	if (process.platform === 'darwin') {
		return path.join(home, 'Library', 'Application Support');
	}
	return process.env.XDG_DATA_HOME || path.join(home, '.local', 'share');
}

/**
 * The vault root. $MASTERY_HOME wins; otherwise use workspace-local storage.
 * @returns {String} absolute path
 */
function getVaultRoot() {
	const override = process.env[ENV_VAR];
	if (override && override.trim() !== '') {
		return path.resolve(override.trim());
	}
	return LOCAL_VAULT_ROOT;
}

/**
 * Resolve a path inside the vault. Accepts either separator and tolerates a
 * leading './' or a legacy 'user_data/' prefix, so existing call sites can be
 * moved over without rewriting every string at once.
 *
 * @param {String} relativePath e.g. 'progress/review-decks.json'
 * @returns {String} absolute path inside the vault
 */
function vaultPath(relativePath = '') {
	const normalized = String(relativePath || '')
		.replace(/\\/g, '/')
		.replace(/^\.\//, '')
		.replace(/^user_data\/?/, '');

	return path.join(getVaultRoot(), normalized);
}

/**
 * Resolve a path inside the vault and make sure its parent directory exists.
 * @param {String} relativePath
 * @returns {String} absolute path inside the vault
 */
function ensureVaultPath(relativePath = '') {
	const absolute = vaultPath(relativePath);
	fs.mkdirSync(path.dirname(absolute), { recursive: true });
	return absolute;
}

/**
 * Whether the vault root exists on disk.
 * @returns {Boolean}
 */
function vaultExists() {
	return fs.existsSync(getVaultRoot());
}

/**
 * Create the vault directory skeleton. Idempotent.
 * @returns {String} the vault root
 */
function ensureVaultLayout() {
	const root = getVaultRoot();
	fs.mkdirSync(root, { recursive: true });

	for (const dir of VAULT_DIRS) {
		fs.mkdirSync(path.join(root, dir), { recursive: true });
	}

	return root;
}

/** Contents of the vault's own .gitignore. */
const VAULT_GITIGNORE = `# Mastery CLI vault
#
# Everything here is yours. Commit it, push it to a private repo, back it up.
#
# .cache/ is derived from decks/ and progress/ and can always be rebuilt, so it
# is ignored - otherwise parsed caches and scratch files would swamp your diffs.

.cache/
${MIGRATION_MARKER}
`;

/** Contents of the vault's own README. */
const VAULT_README = `# Mastery vault

This directory holds everything Mastery CLI knows about you:

| Path | What it is | Tracked? |
| --- | --- | --- |
| \`config.json\` | your settings | yes |
| \`decks/\` | your flashcard markdown | yes |
| \`problems/\` | your DSA problems | yes |
| \`progress/\` | ratings, completion hashes, review state | yes |
| \`stats/\` | append-only activity log | yes |
| \`.cache/\` | parsed decks, session queues, scratch files | **no** |

It is a normal directory, so you can version it:

\`\`\`sh
git init
git add -A
git commit -m "my decks"
\`\`\`

\`.cache/\` is already ignored. Deleting it is always safe — it is rebuilt on
the next run.

Move the vault by setting \`MASTERY_HOME\` to a different path.
`;

/**
 * Create the vault and write the files that make it a usable git repo.
 * Existing files are never overwritten.
 *
 * @returns {Object} { root, created: String[] }
 */
function initVault() {
	const root = ensureVaultLayout();
	const created = [];

	for (const name of seedFromContent()) {
		created.push(name);
	}

	const files = [
		['.gitignore', VAULT_GITIGNORE],
		['README.md', VAULT_README]
	];

	for (const [name, contents] of files) {
		const target = path.join(root, name);
		if (!fs.existsSync(target)) {
			fs.writeFileSync(target, contents, 'utf-8');
			created.push(name);
		}
	}

	return { root, created };
}

/**
 * Copy a directory tree, never overwriting an existing destination file.
 * @param {String} sourceDir
 * @param {String} targetDir
 * @param {Set<String>} skip filenames to leave behind (derived caches, files
 *                           that have a more specific destination of their own)
 */
function copyTree(sourceDir, targetDir, skip = new Set()) {
	fs.mkdirSync(targetDir, { recursive: true });

	for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
		if (skip.has(entry.name)) {
			continue;
		}

		const from = path.join(sourceDir, entry.name);
		const to = path.join(targetDir, entry.name);

		if (entry.isDirectory()) {
			copyTree(from, to, skip);
		} else if (!fs.existsSync(to)) {
			fs.copyFileSync(from, to);
		}
	}
}

/**
 * Where each legacy in-package path lands in the vault.
 *
 * Specific files come first: the directory entries below use `skip` so a file
 * with its own destination is not also copied wholesale.
 */
const MIGRATION_MAP = [
	// Config
	['settings.json', 'config.json'],

	// Durable progress — small, worth tracking
	['review_decks.json', 'progress/review-decks.json'],
	['daily_decks.json', 'progress/daily-decks.json'],
	['temp/term_ratings.csv', 'progress/term-ratings.csv'],
	[
		'temp/term_completion_hashes.json',
		'progress/term-completion-hashes.json'
	],

	// Append-only history
	['data/logs.txt', 'stats/actions.log'],

	// Source content
	['terms_modules', 'decks'],
	['dsa_modules', 'problems'],

	// Live session state — derived, not tracked
	['temp', '.cache/queues']
];

/** Derived files that must never be copied into a tracked vault directory. */
const DERIVED_NAMES = new Set([
	'cache.json',
	'cache_problems.json',
	'term_ratings.csv',
	'term_completion_hashes.json'
]);

/**
 * One-time import of the old in-package user_data directory into the vault.
 * Non-destructive: the source tree is left alone and existing vault files are
 * never overwritten. A marker file stops it running twice.
 *
 * @returns {Object|null} { root, from, copied } or null if nothing to do
 */
function migrateFromPackage() {
	const root = getVaultRoot();
	const marker = path.join(root, MIGRATION_MARKER);

	if (fs.existsSync(marker)) {
		return null;
	}

	const source = LEGACY_ROOTS.find(candidate => fs.existsSync(candidate));
	if (!source) {
		return null;
	}

	ensureVaultLayout();
	const copied = [];

	for (const [from, to] of MIGRATION_MAP) {
		const sourcePath = path.join(source, from);
		if (!fs.existsSync(sourcePath)) {
			continue;
		}

		const targetPath = path.join(root, to);

		if (fs.statSync(sourcePath).isDirectory()) {
			copyTree(sourcePath, targetPath, DERIVED_NAMES);
			copied.push(`${from}/ -> ${to}/`);
		} else if (!fs.existsSync(targetPath)) {
			fs.mkdirSync(path.dirname(targetPath), { recursive: true });
			fs.copyFileSync(sourcePath, targetPath);
			copied.push(`${from} -> ${to}`);
		}
	}

	fs.writeFileSync(
		marker,
		`Imported from ${source} on ${new Date().toISOString()}\n` +
			`The source directory was left in place; you can delete it yourself.\n`,
		'utf-8'
	);

	return { root, from: source, copied };
}

/**
 * Seed a brand-new vault from the shipped content directory: the default
 * config, and the sample decks that give a first-time user something to study.
 *
 * Only ever fills gaps — an existing config.json or deck of the same name is
 * left alone, so this is safe to call on every startup.
 *
 * @returns {String[]} what was seeded
 */
function seedFromContent() {
	if (!fs.existsSync(CONTENT_DIR)) {
		return [];
	}

	const root = getVaultRoot();
	const seeded = [];

	const configTarget = path.join(root, 'config.json');
	const configSource = path.join(CONTENT_DIR, 'config.default.json');
	if (!fs.existsSync(configTarget) && fs.existsSync(configSource)) {
		fs.mkdirSync(root, { recursive: true });
		fs.copyFileSync(configSource, configTarget);
		seeded.push('config.json');
	}

	const decksSource = path.join(CONTENT_DIR, 'decks');
	const decksTarget = path.join(root, 'decks');
	if (fs.existsSync(decksSource)) {
		for (const name of fs.readdirSync(decksSource)) {
			const target = path.join(decksTarget, name);
			if (!fs.existsSync(target)) {
				copyTree(path.join(decksSource, name), target);
				seeded.push(`decks/${name}`);
			}
		}
	}

	return seeded;
}

/**
 * Make the vault usable: create it, and import legacy data the first time.
 * Safe and cheap to call on every startup.
 * @returns {String} the vault root
 */
function ensureVault() {
	ensureVaultLayout();
	migrateFromPackage();
	seedFromContent();
	return getVaultRoot();
}

module.exports = {
	APP_DIR_NAME,
	ENV_VAR,
	MIGRATION_MARKER,
	VAULT_DIRS,
	MIGRATION_MAP,
	getOsDataDir,
	getVaultRoot,
	vaultPath,
	ensureVaultPath,
	vaultExists,
	ensureVaultLayout,
	ensureVault,
	initVault,
	seedFromContent,
	migrateFromPackage
};
