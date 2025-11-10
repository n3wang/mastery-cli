const ABOUT = {
	title: 'booknotes',
	skill_category: 'booknotes',
	author: 'n3wang'
};

const EXTERNAL_CONTENT_FOLDERS = [
	'E:\\Documents\\GitHub\\ai-assistant-framework\\exploration\\ollama-ebook-summary\\refined_docs\\book_notes'
];

module.exports = {
	module_path: 'booknotes',
	ABOUT: ABOUT,
	CACHE_CONTENT: true,
	EXTERNAL_CONTENT_FOLDERS: EXTERNAL_CONTENT_FOLDERS,
	USE_FILE_AS_MODULE: true
};
