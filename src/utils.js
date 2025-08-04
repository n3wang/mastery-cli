/**
 * Core Utilities for Mastery CLI  
 * 
 * This file contains utility functions and classes that support
 * the learning system. The main Mastery class has been moved to Mastery.js.
 * 
 * For beginners: This handles:
 * - Weather information and reporting
 * - Feature extraction and tracking
 * - Git operations and commit helpers
 * - Various utility functions
 */

const chalk = require('chalk');
const clipboard = require('copy-paste')

const chart = require('terminal-charter')
const { exec } = require('node:child_process');
const { Toggle, Confirm, prompt, AutoComplete, Survey, Input } = require('enquirer');


const init = require('./init.js');
const constants = require('./constants.js');

const { bar, bg, annotation, radar } = chart;

const { QuizzerWithDSA } = require('./QuizzerWithDSA');
const { MAID_NAME, getRandomMaidEmoji, appendQuotes, APIDICT, CONSTANTS, get_random, formatObjectFeatures, countDecimals } = constants;
const { getMaidDirectory } = require('./utils_functions.js');

const Settings = require('./settings.js');
const SettingsManager = require('./SettingsManager.js');

// Import the Mastery class and related functions
const { 
	Mastery, 
	withOnlineCheck, 
	commitpush, 
	pushOriginHead, 
	getObjectiveFeatures, 
	getToday,
	localStorageInstance 
} = require('./Mastery.js');



const { Quizzer: FlashQuizzer } = require(
	"./Quizzer.js"
);

const { LocalStorage } = require('./LocalStorage.js');

// https://www.npmjs.com/package/chalk

class DayWeather {
	constructor(jsonDay) {
		const SNOW = "snow";
		const RAIN = "rain";
		const CLEAR = "clear-day"

		this.dayli = jsonDay;
		this.icon = jsonDay?.icon ?? "clear-day";
		this.tempMin = jsonDay?.temperatureMin ?? 0;
		this.tempMax = jsonDay?.temperatureMax ?? 0;
		this.precipProb = jsonDay?.precipProbability ?? 0;

		this.day = new Date(jsonDay?.time * 1000).toISOString().slice(0, 10);
	}

	getColor() {
		return COLORWEATHERMAP[this.icon] ?? bg('white');
	}
}

const COLORWEATHERMAP = {
	"clear-day": bg("yellow"),
	"clear-night": bg("yellow"),
	"rain": bg("blue"),
	"snow": bg("white"),
	"sleet": bg("white"),
	"wind": bg("green"),
	"fog": bg("black"),
	"cloudy": bg("black"),
	"partly-cloudy-day": bg("cyan"),
	"partly-cloudy-night": bg("cyan"),
}

class WeatherInformation {

	constructor(forecastInformation) {
		this.forecastInformation = forecastInformation;
	}

	getDays = () => {
		const days = this.forecastInformation?.daily?.data ?? [];
		return days.map(day => new DayWeather(day)).slice(0, 7);
	}

	tempChartToday = () => {
		const temperatures = this.getDays().map(day => {
			const temp = Math.round((day.tempMax + day.tempMin) / 2);
			const tempLabel = temp + "C"
			return { key: day.day.slice(-2), value: temp, style: day.getColor() }
		});
		return temperatures
	}

}

class FeatureExtraction {
	constructor(feature_name, feature_key, style = bg('white')) {
		this.feature_name = feature_name;
		this.feature_key = feature_key;
		this.style = style;
	}

}

const { get } = require('node:http');
const { strict } = require('node:assert');
const { parse } = require('node:path');
const { reverse } = require('node:dns');

/**
 * Based on the specified feature it returns the corresponding barcharts
 */
populateLastDaysFeaturesBarCharts = (days = 7, feature = 'feat') => {

	const lastWeekInclusive = getArrayLastXDays(days);
	const todayDay = lastWeekInclusive[lastWeekInclusive.length - 1];
	const yesterdayDay = lastWeekInclusive[lastWeekInclusive.length - 2];
	return lastWeekInclusive.map(date => {
		let bgcolor = bg('white');
		if (todayDay == date) {
			bgcolor = bg('yellow');
		} else if (date == yesterdayDay) {
			bgcolor = bg('blue');
		}
		return new FeatureExtraction(date, feature, bgcolor);
	})

}

/**
 * Expected output: {month: {}, lastweek: {}, yesterday: {}, today: {}}
 */
populateLastDaysPerformanceReport = (days = 7) => {
	const lastWeekInclusive = getArrayLastXDays(days);


}



getArrayLastXDays = (days = 7) => {
	const pastDays = [...Array(days).keys()].map(index => {
		const date = new Date();
		date.setDate(date.getDate() - (days - 1 - index));

		return date.toISOString().slice(0, 10);
	});

	// console.log(pastDays);
	return pastDays;
}


/**
 * Updates the count of times a concept has been practiced e.g. `algebra-problem-1` or 'js-how-to-loop'
 * @param {str} problem_name: The name of the problem to update
 * @param {bool} success ?= true : If to whether to increase the success count or the fail count
 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
 * 
 * @returns {"message": f"Success updating {concept_term}, {conceptSelected.correct_times}"}
 */
updateConcept = withOnlineCheck(async (problem_name, success = true, account_id = Settings.account_id ?? 1) => {

})

const getCredentialNames = (credentialDict) => {
	return credentialDict.map(cred => {
		return cred.name
	})
}

/**
 * Retrieves from the json the proper credentials as an object
 */
const getCredentialInformation = (credentialsDict, credential_name) => {

	res = credentialsDict.filter(
		(cred) => cred.name == credential_name
	)
	return res.length > 0 ? res[0] : {};
}

const getCommitCategories = () => {
	const commit_categories_settings = Settings.commit_categories ?? [];
	return commit_categories_settings.map(cat => new CommitCategoryType(cat.code, cat.icon_list, cat.feature_name));
}

/**
 * Based on the commit message, detects if it's a special commit and logs it as a feature.
 * If it contains any of the specials categories (configurable in settings.js) it will log it in the feature (habit) database.
 * Based on the Github username, detects the account that this achievement will be sent to.
 * @param {str} commitMessage: The commit message
 * @param {bool} strict: If true, it will only check the first work, if false, it will check if the commit contains the feature identifier.
 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
 * 
 * @returns CommitCategoryType
 */
const commitCategory = (commitMessage, strict = false) => {
	const commitCategories = getCommitCategories()

	const commitWords = commitMessage.toLowerCase().split(' ');
	const commitFirstWord = commitWords.length >= 1 ? commitWords[0] : "";

	if (strict) {
		const commitCategorySelected = commitCategories.filter(cat => cat.code.toLowerCase() == commitFirstWord);
		return commitCategorySelected.length > 0 ? commitCategorySelected[0] : null;
	} else {
		const commitCategorySelected = commitCategories.filter(cat => commitWords.includes(cat.code.toLowerCase()));
		return commitCategorySelected.length > 0 ? commitCategorySelected[0] : null;
	}
}

const autorelease = () => {
	console.log("Executing: npm run autorelease");
	exec('npm run autorelease', (err, stdout, stderr) => {
		if (err) {
			console.error(`Error: ${err}`);
			return;
		}
		console.log(`Output: ${stdout}`);
		if (stderr) {
			console.log(`Stderr: ${stderr}`);
		}
	});
}

const inreasePerformanceOffline = (feature_name, increaseBY = 1) => {

}

class CommitCategoryType {
	constructor(code, icon_list, feature_name = "") {
		this.code = code;
		this.icon_list = icon_list;

		if (feature_name == "") {
			this.features_name = code;
		} else {
			this.feature_name = feature_name;
		}

	}

	randomIcon() {
		return get_random(this.icon_list);
	}


}

const getComments = async (term, count = 5) => {

}

const printComments = (comments) => {
	if (comments.length == 0) {
		console.log("No comments");
		return;
	}

	comments.forEach(comment => {
		console.log(comment.comment);
	});

}

module.exports = {
	commitpush, autorelease, printComments,
	Mastery, getToday, FlashQuizzer,
	commitCategory, getComments,
	localStorageInstance
};