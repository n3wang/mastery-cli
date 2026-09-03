const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pkg = require('../package.json');

/**
 * `files` entries are plain paths, so a directory rename elsewhere silently
 * turns an exclude into a no-op. That happened once: renaming
 * src/terms_data -> src/terms-data left `!src/terms_data/img/` matching
 * nothing, and the package went from 2.1 MB back to 33.1 MB without a word.
 */
describe('package contents', () => {
	it('every files entry points at something that exists', () => {
		for (const entry of pkg.files) {
			const bare = entry.replace(/^!/, '');

			// Glob patterns cannot be checked by existence.
			if (bare.includes('*')) {
				continue;
			}

			assert.ok(
				fs.existsSync(path.join(ROOT, bare)),
				`package.json "files" refers to ${bare}, which does not exist — ` +
					`a rename probably left it behind`
			);
		}
	});

	it('excludes the directories that must never ship', () => {
		const mustExclude = [
			'src/data/', // the user's own decks and progress
			'src/terms-data/img/' // 31 MB of note screenshots
		];

		for (const dir of mustExclude) {
			assert.ok(
				pkg.files.includes(`!${dir}`),
				`package.json "files" must exclude ${dir}`
			);
		}
	});

	it('does not reference directories removed from the tree', () => {
		const gone = [
			'src/features/dsa/user_files',
			'src/features/dsa/data',
			'src/features/data-science',
			'src/extensions',
			'custom_modules'
		];

		for (const dir of gone) {
			assert.ok(
				!fs.existsSync(path.join(ROOT, dir)),
				`${dir} was removed but is present again`
			);
			assert.ok(
				!pkg.files.some(entry => entry.replace(/^!/, '') === dir),
				`package.json "files" still mentions the removed ${dir}`
			);
		}
	});
});
