const fs = require('fs');
const path = require('path');

const CANONICAL_USER_DATA_ROOT = path.resolve(__dirname, './data/user_data');
const LEGACY_USER_DATA_ROOTS = [
	path.resolve(__dirname, './user_data'),
	path.resolve(__dirname, '../user_data')
];

function normalizeUserDataRelativePath(relativePath = '') {
	return String(relativePath || '')
		.replace(/\\/g, '/')
		.replace(/^\.\//, '')
		.replace(/^user_data\/?/, '');
}

function pathExists(targetPath) {
	return fs.existsSync(targetPath);
}

function getCanonicalUserDataRoot() {
	return CANONICAL_USER_DATA_ROOT;
}

function getLegacyUserDataRoots() {
	return [...LEGACY_USER_DATA_ROOTS];
}

function getUserDataAbsolutePath(
	relativePath = '',
	{ preferExisting = true } = {}
) {
	const normalizedRelativePath = normalizeUserDataRelativePath(relativePath);
	const canonicalTarget = path.join(
		CANONICAL_USER_DATA_ROOT,
		normalizedRelativePath
	);

	if (!preferExisting) {
		return canonicalTarget;
	}

	if (pathExists(canonicalTarget)) {
		return canonicalTarget;
	}

	for (const legacyRoot of LEGACY_USER_DATA_ROOTS) {
		const legacyTarget = path.join(legacyRoot, normalizedRelativePath);
		if (pathExists(legacyTarget)) {
			return legacyTarget;
		}
	}

	return canonicalTarget;
}

function copyDirectoryContents(sourceDir, targetDir) {
	fs.mkdirSync(targetDir, { recursive: true });

	for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
		const sourceEntry = path.join(sourceDir, entry.name);
		const targetEntry = path.join(targetDir, entry.name);

		if (entry.isDirectory()) {
			copyDirectoryContents(sourceEntry, targetEntry);
			continue;
		}

		if (!pathExists(targetEntry)) {
			fs.copyFileSync(sourceEntry, targetEntry);
		}
	}
}

function migrateLegacyUserDataPath(relativePath = '') {
	const normalizedRelativePath = normalizeUserDataRelativePath(relativePath);
	const canonicalTarget = getUserDataAbsolutePath(normalizedRelativePath, {
		preferExisting: false
	});

	const canonicalExists = pathExists(canonicalTarget);
	if (canonicalExists && fs.statSync(canonicalTarget).isFile()) {
		return canonicalTarget;
	}

	for (const legacyRoot of LEGACY_USER_DATA_ROOTS) {
		const legacyTarget = path.join(legacyRoot, normalizedRelativePath);
		if (!pathExists(legacyTarget)) {
			continue;
		}

		fs.mkdirSync(path.dirname(canonicalTarget), { recursive: true });
		const stats = fs.statSync(legacyTarget);

		if (stats.isDirectory()) {
			copyDirectoryContents(legacyTarget, canonicalTarget);
			continue;
		} else {
			if (pathExists(canonicalTarget)) {
				continue;
			}
			fs.copyFileSync(legacyTarget, canonicalTarget);
		}
	}

	return canonicalTarget;
}

function ensureUserDataParentDir(relativePath = '') {
	const absolutePath = getUserDataAbsolutePath(relativePath, {
		preferExisting: false
	});
	fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
	return absolutePath;
}

function ensureCanonicalUserDataLayout() {
	fs.mkdirSync(CANONICAL_USER_DATA_ROOT, { recursive: true });
	fs.mkdirSync(path.join(CANONICAL_USER_DATA_ROOT, 'temp'), {
		recursive: true
	});
	fs.mkdirSync(path.join(CANONICAL_USER_DATA_ROOT, 'data'), {
		recursive: true
	});
	fs.mkdirSync(path.join(CANONICAL_USER_DATA_ROOT, 'terms_modules'), {
		recursive: true
	});

	migrateLegacyUserDataPath('_settings.json');
	migrateLegacyUserDataPath('settings.json');
	migrateLegacyUserDataPath('dsa_modules');
	migrateLegacyUserDataPath('temp');
}

module.exports = {
	getCanonicalUserDataRoot,
	getLegacyUserDataRoots,
	getUserDataAbsolutePath,
	ensureUserDataParentDir,
	ensureCanonicalUserDataLayout,
	migrateLegacyUserDataPath,
	normalizeUserDataRelativePath
};