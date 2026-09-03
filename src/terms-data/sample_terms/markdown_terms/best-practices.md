# Software Development Best Practices

#### db | naming 

1) Use snake_case for table names
2) Use singular nouns for table names
3) use _id for foreign keys
4) if u suspect that 2 tables will have the same column, you can add somehting to make it unique

:p Create a Database Name for a user, ID from team member table (FK)

??x first_name | user_name 
	team_member_id ??

#### db | reserved words
Here some reserved words: CHECK DEFAULT DESC FALSE IN IS LIKE NOT NULL TRUE USER, USER_SESSION

:p you want to name a column 'user' in a table, what would you name it?

??x user_ => user is a reserved word ??

#### js | naming vars
Use camelCase: In JavaScript, it's standard to use camelCase for naming variables, functions, and methods. The first letter of the first word should be lowercase, and the first letter of each subsequent word should be capitalized. For example, "myVariable" or "calculateTotalPrice.

:p How would you name a variable for calculation result of the price?
use nouns for variable names: names should be nouns that describe the value being stored. For example, "customerName" or "orderTotal".

??x priceResult ??

#### js | naming functions
Use camelCase: In JavaScript, it's standard to use camelCase for naming variables, functions, and methods. The first letter of the first word should be lowercase, and the first letter of each subsequent word should be capitalized. For example, "myVariable" or "calculateTotalPrice
Use verbs for function names: Function names should be verbs that describe the action being taken. For example, "calculatePrice" or "validateInput".

:p How would you name a function for calculation result of the price?

??x calculateTotalPrice ??

#### js | naming classes
Use PascalCase: In JavaScript, it's standard to use PascalCase for naming classes. The first letter of each word should be capitalized. For example, "PriceCalculator".

:p How would you name a class for price calculator?

??x PriceCalculator ??

#### python | naming variables
Use snake_case: Unlike JavaScript, Python uses snake_case for naming variables, functions, and methods. In snake_case, each word is separated by an underscore. For example, "my_variable" or "calculate_total_price".

:p How would you name a variable for calculation result of the price?

??x price_result ??