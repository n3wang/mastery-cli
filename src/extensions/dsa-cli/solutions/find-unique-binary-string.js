class FindUniqueBinaryStrings {
	solve(nums) {
		return findDifferentBinaryString(nums);
	}
}

var findDifferentBinaryString = function (nums) {
	let ans = '';
	for (let i = 0; i < nums.length; i++) {
		ans += nums[i][i] == '0' ? '1' : '0';
	}
	return ans;
};

module.exports = { Problem: FindUniqueBinaryStrings };
