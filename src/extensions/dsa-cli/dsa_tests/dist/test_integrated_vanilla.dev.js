'use strict';

var _require = require('../structures'),
	ProblemMetadata = _require.ProblemMetadata;

var _require2 = require('../problems-manager'),
	ProblemsManager = _require2.ProblemsManager;

var HelloWorldProblem = new ProblemMetadata('hello-world');
var manager = new ProblemsManager();
manager.populateTemplate(HelloWorldProblem);
var result = manager.runProblem(HelloWorldProblem); // console.log(result);
