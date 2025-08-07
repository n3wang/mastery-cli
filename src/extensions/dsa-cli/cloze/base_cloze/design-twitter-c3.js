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
		for (let i = tweets.length - 1; 0 <= i && newsIDs.length < 10; i--) {
			const tweet = tweets[i];

			const isAuthor = tweet.authorId === userId;
			const isFollowing = following?.get(userId)?.has(tweet.authorId);
			const canAddTweet = isAuthor || isFollowing;
			if (canAddTweet) newsIDs.push(tweet.id);
		}

		return newsIDs;
	}

	follow(followerId, followeeId, { following } = this) {
		// TODO Follow the followee by adding the followeeId to the following of the followerId.
		// Make sure it works even if the followerId does not exist
	}

	unfollow(followerId, followeeId, { following } = this) {
		if (following.has(followerId))
			following.get(followerId).delete(followeeId);
	}
}

module.exports = { Problem: Twitter };
