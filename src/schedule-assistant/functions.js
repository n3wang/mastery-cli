class Functions {
	getCurrentDate() {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const currentDate = `${year}-${month}-${day}`;
		// console.log(currentDate); // Output: 2023-07-03
		return currentDate;
	}
}

module.exports = Functions;
