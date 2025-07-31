

const {getDirAbsoluteUri} = require('./functions');

const SOLUTION_DIR = 'solutions'


/**
 * Represents the metadata of a problem
 * @class {Object} ProblemMetadata
 * @property {string} slug - The slug of the problem
 * @property {string} file_path - The path of the file
 * @property {string} test_slug - The test slug
 * @property {string} name - The name of the problem
 * @property {string} description - The description of the problem
 * @property {string} difficulty - The difficulty of the problem
 * @property {string[]} tags - The tags of the problem
 * @property {string} link - The link of the problem
 * @property {string} absolute_solution_path - The absolute solution path
 * @property {string[]} hints - The hints of the problem
 * @property {Object} asJson - The json representation of the problem
 */

/**
 * @type {ProblemMetadata}
 */
class ProblemMetadata {
    constructor(slug, { name = "", description = "", difficulty = "EASY", tags = [], link = "", hints = [], is_external = false, source_folder = "" } = {}) {
        this.slug = slug;
        this.file_path = `${slug}.js`;
        this.test_slug = slug;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.tags = tags;
        this.link = link;
        this.absolute_solution_path = getDirAbsoluteUri(`./${SOLUTION_DIR}/${slug}.js`);
        this.hints = hints;
        this.is_external = is_external;
        this.source_folder = source_folder;
    }

    get asJson() {
        return {
            slug: this.slug,
            file_path: this.file_path,
            test_slug: this.test_slug,
            name: this.name,
            description: this.description,
            difficulty: this.difficulty,
            tags: this.tags,
            link: this.link,
        }
    }
}



module.exports = { ProblemMetadata };


