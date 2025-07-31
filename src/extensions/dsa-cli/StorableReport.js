const { JsonDB, Config } = require("../../local-modules/json-db");
const { getCurrentDate, getDirAbsoluteUri } = require("./functions");
const path = require('path');
const fs = require('fs');
const DEBUG = false;


class StorableReport {
    constructor({ filename = "report", autosave = true, absolute_path = true } = {}) {

        // If setted as this, get the absolute path from it.
        this.filename = absolute_path ? getDirAbsoluteUri(filename, "./") : filename;
        if (DEBUG) console.log("Filename being used", this.filename);
        this.autosave = autosave;

        const fullPath = path.join(__dirname, 'data', 'db.json'); // assuming the file should be stored in a "data" subdirectory
        this.fullPath = fullPath;
        try {
            this.db = new JsonDB(new Config(fullPath, true, false, "/"));
        }
        catch (error) {
            this.createBackup();

        }
        this.getReport().then(reportData => {
            if (DEBUG) console.log("ReportData", reportData);
            this.report = reportData;
        });
    }



    createBackup() {
        const backupPath = `${this.fullPath}.${Date.now()}.bak`;
        fs.renameSync(this.fullPath, backupPath);
    }

    getDate() {
        // console.log("this.report", this.report);
        return this.report?.date;
    }


    increaseAnswerFor(key) {
        if (!this.report?.[key]) {
            this.report[key] = 0;
        }
        this.report[key] += 1;

        this.autoSaveIfAppropriate();
    }

    decreaseAnswerFor(key) {
        if (!this.report?.[key]) {
            this.report[key] = 0;
        }
        this.report[key] -= 1;


        this.autoSaveIfAppropriate();
    }

    autoSaveIfAppropriate() {
        if (this.autosave) {
            this.saveReport();
        }
    }

    fixCheckAnswers(listOfChekBoxesKeys) {
        // Change the answer of those keys that are in listOfChekBoxesKeys wheres are otehr than 1 or 0 to 0
        for (const key of listOfChekBoxesKeys) {
            const answer = this.getAnswerFor(key);
            if (answer !== 1 && answer !== 0) {
                this.report[key] = 0;
            }
        }
        this.saveReport();
    }

    addAnswers(answers) {
        // A dict will be passsed in you want to merge this with the input.
        const thisanswers = this.report ?? {};
        this.report = { ...thisanswers, ...answers, };

        this.autoSaveIfAppropriate();
    }

    setAnswerFor(key, value) {
        this.report[key] = value;

        this.autoSaveIfAppropriate();
    }


    getAnswerFor(key, { defaultvalue = 0 } = {}) {
        return this.report?.[key] ?? defaultvalue;
    }


    /**
     * 
     * @param {string} key The key to check if it is completed
     * @returns {boolean} True if the key is completed, false otherwise
     */
    isProblemCompleted(key) {
        return this.getAnswerFor(key) >= 1;
    }

    cleanReport() {
        this.report = {};
        this.report.date = getCurrentDate();
    }

    async getReport() {
        try {
            const data = await this.db.getData("/");
            if (DEBUG) console.log("data", data);
            this.report = data;
            return data;
        } catch (error) {
            try {

                this.createBackup();
                const data = await this.db.getData("/");
                this.report = data;
                return data;
            } catch (error) {

                console.log('error at get')
                console.error(error);
                return {};
            }
        }
    }

    // promise Syntax for getReport
    getReportPromise() {

        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.db.getData("/");
                if (DEBUG) console.log("data", data);
                this.report = data;
                resolve(data);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    saveReport() {
        try {
            this.db.push("/", this.report);
        } catch (error) {
            console.error(error);
        }
    }

    setReport(report) {
        this.report = report;
        this.saveReport();
    }
}


module.exports = StorableReport;