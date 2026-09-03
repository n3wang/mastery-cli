const assert = require('assert');
const ProblemTests = require('./problem-test');

class DesignTwitter extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_0());
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
	}
	test_0() {
		const twitter = new this.Problem();
		this.current_test_name = '[1, 5, 3, 2, 6, 7] | [1, 2, 3, 4, 5, 6, 7]';
		twitter.postTweet(1, 5);
		assert.deepEqual(twitter.getNewsFeed(1), [5]);
		twitter.follow(1, 2);
		twitter.postTweet(2, 6);
		assert.deepEqual(twitter.getNewsFeed(1), [6, 5]);
		twitter.unfollow(1, 2);
		assert.deepEqual(twitter.getNewsFeed(1), [5]);
	}

	test_1() {
		const twitter = new this.Problem();
		this.current_test_name = 'Post tweet and get news feed';
		twitter.postTweet(1, 5);
		assert.deepEqual(twitter.getNewsFeed(1), [5]);
	}

	test_2() {
		const twitter = new this.Problem();
		this.current_test_name = 'Follow user and get news feed';
		twitter.follow(1, 2);
		twitter.postTweet(2, 6);
		twitter.postTweet(1, 5);
		assert.deepEqual(twitter.getNewsFeed(1), [5, 6]);
	}

	test_3() {
		const twitter = new this.Problem();
		this.current_test_name = 'Unfollow user and get news feed';
		twitter.follow(1, 2);
		twitter.postTweet(2, 6);
		twitter.postTweet(1, 5);
		twitter.unfollow(1, 2);
		assert.deepEqual(twitter.getNewsFeed(1), [5]);
	}

	test_4() {
		const twitter = new this.Problem();
		this.current_test_name = 'Get news feed with no tweets';
		assert.deepEqual(twitter.getNewsFeed(1), []);
	}

	test_5() {
		const twitter = new this.Problem();
		this.current_test_name = 'Follow user who does not exist';
		twitter.follow(1, 2);
		assert.deepEqual(twitter.getNewsFeed(1), []);
	}

	test_6() {
		const twitter = new this.Problem();
		this.current_test_name = 'Unfollow user who does not exist';
		twitter.unfollow(1, 2);
		assert.deepEqual(twitter.getNewsFeed(1), []);
	}
}

class FindMedianFromDataStream extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const medianFinder = new this.Problem();
		this.current_test_name = '[1, 2, 3, 4, 5] | [1, 1.5, 2, 2.5, 3]';
		medianFinder.addNum(1);

		// assert(medianFinder.findMedian() == 1);
		medianFinder.addNum(2);
		console.log(medianFinder.findMedian());
		assert(medianFinder.findMedian() == 1.5);
		medianFinder.addNum(3);
		assert(medianFinder.findMedian() == 2);
		medianFinder.addNum(4);
		assert(medianFinder.findMedian() == 2.5);
		medianFinder.addNum(5);
		assert(medianFinder.findMedian() == 3);
	}
}

class KClosest extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const kClosest = new this.Problem();
		this.current_test_name = '[[1,3],[-2,2]] | 1 | [[-2,2]]';
		assert.deepEqual(
			kClosest.solve(
				[
					[1, 3],
					[-2, 2]
				],
				1
			),
			[[-2, 2]]
		);
	}

	test_2() {
		const kClosest = new this.Problem();
		this.current_test_name = '[[3,3],[5,-1],[-2,4]] | 2 | [[3,3],[-2,4]]';
		assert.deepEqual(
			kClosest.solve(
				[
					[3, 3],
					[5, -1],
					[-2, 4]
				],
				2
			),
			[
				[3, 3],
				[-2, 4]
			]
		);
	}
}

class KthLargestElementInAnArray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const kthLargest = new this.Problem();
		this.current_test_name = '[3,2,1,5,6,4] | 2 | 5';
		assert.equal(kthLargest.solve([3, 2, 1, 5, 6, 4], 2), 5);
	}

	test_2() {
		const kthLargest = new this.Problem();
		this.current_test_name = '[3,2,3,1,2,4,5,5,6] | 4 | 4';
		assert.equal(kthLargest.solve([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
	}
}

class LastStoneWeight extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const lastStoneWeight = new this.Problem();
		this.current_test_name = '[2,7,4,1,8,1] | 1';
		assert.equal(lastStoneWeight.solve([2, 7, 4, 1, 8, 1]), 1);
	}

	test_2() {
		const lastStoneWeight = new this.Problem();
		this.current_test_name = '[2,2] | 0';
		assert.equal(lastStoneWeight.solve([2, 2]), 0);
	}
}

class TaskScheduler extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const taskScheduler = new this.Problem();
		this.current_test_name = '["A","A","A","B","B","B"] | 2 | 8';
		assert.equal(taskScheduler.solve(['A', 'A', 'A', 'B', 'B', 'B'], 2), 8);
	}

	test_2() {
		const taskScheduler = new this.Problem();
		this.current_test_name = '["A","A","A","B","B","B"] | 0 | 6';
		assert.equal(taskScheduler.solve(['A', 'A', 'A', 'B', 'B', 'B'], 0), 6);
	}
}

const TEST_DICTIONARY = {
	'design-twitter': DesignTwitter,
	'find-median-from-data-stream': FindMedianFromDataStream,
	'k-closest': KClosest,
	'kth-largest-element-in-an-array': KthLargestElementInAnArray,
	'last-stone-weight': LastStoneWeight
	// 'task-scheduler': TaskScheduler //I don't even understand the problem,
};

module.exports = TEST_DICTIONARY;
