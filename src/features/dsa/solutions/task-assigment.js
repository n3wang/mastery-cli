class TaskAssigment {
	solve(tasks, k) {
		return taskAssignment(k, tasks);
	}
}

function taskAssignment(k, tasks) {
	const pairedTasks = [];
	// Convert reverses the key and values of the tasks, so you would have time->mapping to the task id.
	const taskDurationToIndices = getTaskDurationToIndices(tasks);

	const sortedTasks = [...tasks].sort((a, b) => a - b);
	// console.log(sortedTasks);I dont really get why it then becomes htat the a is smaller, so it means that when is false, then is good?

	// Sort the tasks based on te larger to smaller
	// For each starting from larger you get the idx less than the amoun of tasks (for each worker)
	// the task  duration = sorted tasks indices with task durations by the indexes and then you get the first index equals the indices of the task duration 1 popping while on the other one youget the task lenght -1 -idx and get the duration starting from the half and duration being tae tasks (the last two,half and then get the task durtation to indeces and then ,  we push this tasks)

	// The sorted tasks would contain the values in sorted manner
	// While the taskDurationToIndices getting based on the duration woul return the indices. and get the first one and pop them to pair with the speeds. and then

	// the task sorted would always grab the lenght-1
	for (let idx = 0; idx < k; idx++) {
		const task1Duration = sortedTasks[idx];
		const indicesWithTask1Duration = taskDurationToIndices[task1Duration];
		const task1Index = indicesWithTask1Duration.pop();

		const task2SortedIndex = tasks.length - 1 - idx;
		const task2Duration = sortedTasks[task2SortedIndex];
		const indicesWithTask2Duration = taskDurationToIndices[task2Duration];
		const task2Index = indicesWithTask2Duration.pop();

		pairedTasks.push([task1Index, task2Index]);
	}

	return pairedTasks;
}

function getTaskDurationToIndices(tasks) {
	const taskDurationToIndices = {};

	for (let idx = 0; idx < tasks.length; idx++) {
		const taskDuration = tasks[idx];
		if (taskDuration in taskDurationToIndices) {
			taskDurationToIndices[taskDuration].push(idx);
		} else {
			taskDurationToIndices[taskDuration] = [idx];
		}
	}
	return taskDurationToIndices;
}

module.exports = { Problem: TaskAssigment };
