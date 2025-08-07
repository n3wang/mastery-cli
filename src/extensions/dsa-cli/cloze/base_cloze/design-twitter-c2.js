/**
 * https://leetcode.com/problems/design-twitter/
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
class Twitter {
	constructor() {
		this.tweets = [];
		this.following = new Map();
	}

	postTweet(userId, tweetId, { tweets } = this) {
		tweets.push({ authorId: userId, id: tweetId });
	}

	getNewsFeed(userId, newsIDs = [], { tweets, following } = this) {
		// Get the last 10 news feed for the user if is author or is being follwoed by them.

		return newsIDs;
	}

	follow(followerId, followeeId, { following } = this) {
		if (!following.has(followerId)) following.set(followerId, new Set());

		following.get(followerId).add(followeeId);
	}

	unfollow(followerId, followeeId, { following } = this) {
		if (following.has(followerId))
			following.get(followerId).delete(followeeId);
	}
}

module.exports = { Problem: Twitter };
