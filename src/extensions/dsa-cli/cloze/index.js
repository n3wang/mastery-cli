const { JsonDB, Config } = require("../../../local-modules/json-db");


// Import from cloze_problem_list.json
const cloze_path = "cloze_problem_list.json";
const cloze_problems_list = require(`./${cloze_path}`);

class ClozeProblemManager {
    constructor({ cloze_path = cloze_path } = {}) {
        const fullpath = path.join(__dirname, cloze_path);

        this.db = new JsonDB(new Config(fullpath, true, false, "/"));
        this.clozeProblemList = [];
        /**
         * Format:
         * [
                {
                    "file_path": "simple-sum-c1.js",
                    "difficulty": 1, 
                    "problem_slug": "simple-sum"
                }
            ]

         */

    }

    getClozeProblemListPromise() {
        return new Promise(async (resolve, reject) => {
            try {
                const clozeProblemList = await this.db.getData("/");
                this.clozeProblemList = clozeProblemList;
                resolve(clozeProblemList);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }

    /**
     * 
     * @param {string} file_path path to the cloze file
     * @param {string} problem_slug slug of the problem
     * @param {number} difficulty difficulty of the problem
     * @returns {Promise} Promise that resolves when the problem is added to the list
     */
    addProblemPromise(file_path, problem_slug, difficulty = 1){

        return new Promise(async (resolve, reject) => {
            try{
                const problem_pushed = await this.pushProblem(file_path, problem_slug, difficulty);
                resolve(problem_pushed);
            }
            catch(error){
                console.error(error);
                reject(error);
            }

        })

    }

    async pushProblem(file_path, problem_slug, difficulty = 1) {
        this.clozeProblemList.push({
            file_path,
            problem_slug,
            difficulty
        });
        this.db.push("/", this.clozeProblemList);
    }



}

// export
module.exports = { cloze_problems_list, ClozeProblemManager };