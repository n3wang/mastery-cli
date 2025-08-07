/**
 * The idea is to have Advanced deep neural networks (Deep learning) and Machine Learning models  and algorithms here.
 */

const pytorch_machine_learning_course = [];

const machine_learning_pandas_visualization = [
	{
		term: 'count-duplicate-rows',
		prompt: 'Print the number of duplicate rows in the DataFrame `df`.',
		example: 'print(df.duplicated().sum())',
		description:
			'Duplicate rows in a DataFrame can cause issues with data analysis and modeling. To identify the number of duplicate rows in a DataFrame, we can use the `duplicated()` method of the DataFrame and the `sum()` method to count the number of `True` values. The output of the `print(df.duplicated().sum())` command represents the total number of duplicate rows in the DataFrame `df`.'
	},
	{
		term: 'print-df-shape',
		prompt: 'Given a pandas DataFrame `df`, print the number of rows and columns it has. \n\
        Then, remove duplicate rows from the DataFrame and assign the result to the same variable.',
		example:
			':m ```js\n\
        print(df.shape)\n\
        df = df.drop_duplicates()\n\
        ```',
		description:
			'Before working with a pandas DataFrame, it is important to understand its dimensions. To print the number of rows and columns in the DataFrame `df`, you can use the command `print(df.shape)`. This will output a tuple with two values: the first value is the number of rows, and the second value is the number of columns. Additionally, you may want to remove duplicate rows in the DataFrame to ensure data quality. To remove duplicate rows in a DataFrame, we can use the `drop_duplicates()` method of the DataFrame. The command `df = df.drop_duplicates()` removes duplicate rows from the DataFrame `df` and assigns the result to the same variable. This modified DataFrame can be used for further analysis or modeling.'
	},
	{
		term: 'count-car-brands-bar-chart',
		prompt: "Given a pandas DataFrame `df` that contains a column 'Make' representing the brand of each car, make a bar chart that displays the count of cars for each brand.",
		example:
			":m\n\
        ```js\n\
        gb = df.groupby('Make')\ncount_makes = gb['Make'].count()\ncount_makes.plot(kind='bar')\n\
        ```\
        ",
		attachment: './img/2023-03-24-12-09-14.png',
		description:
			":m When working with a DataFrame that contains information about cars, it can be useful to visualize the count of cars for each brand. To create a bar chart that displays this information, we can use the `groupby()` method of the DataFrame to group the cars by their brand, and then use the `count()` method to count the number of cars for each brand. Finally, we can use the `plot()` method with `kind='bar'` to create a bar chart that displays the count of cars for each brand."
	},
	{
		term: 'average-msrp-timeline-chart',
		prompt: "Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, make a line chart that displays the average MSRP for each year.",
		example:
			":m\n\
        ```js\n\
        gb = df.groupby('Year')\naverage_MSRP = gb['MSRP'].mean()\naverage_MSRP.plot(kind='line', figsize=(8,5))\n\
        ```\
        ",
		description:
			":m\n\
        ```js\n\
        gb = df.groupby('Year')\naverage_MSRP = gb['MSRP'].mean()\naverage_MSRP.plot(kind='line', figsize=(8,5))\n\
        ```\
        " +
			"When working with a DataFrame that contains information about cars, it can be useful to visualize how the average MSRP changes over time. To create a line chart that displays this information, we can use the `groupby()` method of the DataFrame to group the cars by their year, and then use the `mean()` method to calculate the average MSRP for each year. Finally, we can use the `plot()` method with `kind='line'` to create a line chart that displays the average MSRP for each year, with the year on the x-axis and the average MSRP on the y-axis."
	},
	{
		term: 'adjust-price-by-year',
		prompt: "Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, create a new column 'adjusted_price' where the MSRP is adjusted by a factor based on the year.",
		example:
			":m\n\
        ```js\n\
        df['adjusted_price'] *= df['Year'].apply(adjust_price_year)\n\
        ```\
        " +
			"To adjust the MSRP of each car in the DataFrame `df` based on the year, you can use the following code:\n\n```\ndef adjust_price_year(x):\n    if x <= 2000:\n        return 10\n    else:\n        return 1\n\ndf['adjusted_price'] = df['MSRP']\ndf['adjusted_price'] *= df['Year'].apply(adjust_price_year)\n```",
		description:
			':m\n\
        ```js\n\
        # Make a column where is 10 when year is less than 2000, else 1.\ndef adjust_price_year(x):\n\tif x<=2000:\n\t\treturn 10\n\telse:\n\t\treturn 1\n\n# Multiply the MSRP by the price adjuster.\ndf["adjusted_price"] = df["MSRP"]\n\
        ```\
        ' +
			"When working with a DataFrame that contains information about cars, it can be useful to adjust the MSRP based on the year of the car. To do this, we can create a new column in the DataFrame called 'adjusted_price', where the MSRP is multiplied by a factor based on the year. We can define a function called `adjust_price_year` that takes a year as input and returns a factor based on that year. For example, if the year is less than or equal to 2000, the factor could be 10, while for other years it could be 1. We can then use the `apply()` method of the 'Year' column to apply this function to each row, and multiply the result by the 'MSRP' column to get the adjusted price. Finally, we can assign this new column to the 'adjusted_price' column of the DataFrame."
	},
	{
		term: 'histogram-adjusted-price-car-makers',
		prompt: "Given a pandas DataFrame `df` that contains a column 'adjusted_price' representing the adjusted MSRP of each car, and columns 'Make' and 'Year' representing the make and year of each car, create a histogram of the adjusted price of just these car makers using `sns.histplot`.",
		example:
			':m\n\
        ```js\n\
        import seaborn as sns\n\ncondC = df["Make"] == "Chevrolet"\ncondF = df["Make"] == "Ford"\ncondT = df["Make"] == "Toyota"\n\n# Using sns.histplot, make histogram of the adjusted_price of just these car makers.\nsns.set()\n\ntemp_df = df[condC | condF | condT]\n\nax = sns.histplot(data=temp_df, x="Year", y="adjusted_price", hue="Make")\
        ```',
		description:
			"When working with a DataFrame that contains information about cars, it can be useful to visualize the adjusted price of just certain car makers. To create a histogram of the adjusted price of just these car makers, we can use the `sns.histplot` function from the Seaborn library. We can start by creating Boolean conditions that check if the 'Make' column is equal to each of the car makers we want to include in the histogram. We can then use these conditions to create a temporary DataFrame that includes only the rows that match these conditions. Finally, we can use `sns.histplot` with this temporary DataFrame to create the histogram, using the 'Year' column for the x-axis, the 'adjusted_price' column for the y-axis, and the 'Make' column for the hue." +
			"To create a histogram of the adjusted price of just the car makers Chevrolet, Ford, and Toyota in the DataFrame `df`, using `sns.histplot`, you can use the following code:\n\n``` \n import seaborn as sns\n\ncondC = df['Make'] == 'Chevrolet'\ncondF = df['Make'] == 'Ford'\ncondT = df['Make'] == 'Toyota'\n\ntemp_df = df[condC | condF | condT]\n\nsns.histplot(data=temp_df, x='Year', y='adjusted_price', hue='Make')\n```",
		attachment: './img/2023-03-24-12-47-25.png'
	},
	{
		term: 'count-listings-price-less-than',
		prompt: "Given a pandas DataFrame `df` that contains a column 'price' representing the price of each listing, how many listings are there with a price less than a certain value `x`?",
		example:
			"To count the number of listings in the DataFrame `df` that have a price less than 100, you can use the following code:\n\n```\ncount = (df['price'] < 100).sum()\nprint(count)\n```",
		description:
			":m When working with a DataFrame that contains information about listings, it can be useful to count the number of listings with a price less than a certain value. To do this, we can use a Boolean condition that checks if the 'price' column is less than the desired value, and then use the `sum()` method to count the number of `True` values in this condition. For example, to count the number of listings in the DataFrame `df` that have a price less than 100, we can use the code `count = (df['price'] < 100).sum()`"
	},
	{
		term: 'count-brooklyn-listings-price-less-than',
		prompt: "Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, how many listings are there in Brooklyn with a price less than a certain value `x`?",
		example:
			"To count the number of listings in Brooklyn in the DataFrame `df` that have a price less than 100, you can use the following code:\n\n```\nin_brooklyn = df['neighbourhood_group'] == 'Brooklyn'\nless_100 = df['price'] < 100\ncount = (in_brooklyn & less_100).sum()\nprint(count)\n```",
		description:
			":m When working with a DataFrame that contains information about listings, it can be useful to count the number of listings in a certain borough with a price less than a certain value. To do this, we can use two Boolean conditions: one that checks if the 'neighbourhood_group' column is equal to the desired borough, and one that checks if the 'price' column is less than the desired value. We can then use the `&` operator to combine these conditions with an 'and' operation, and then use the `sum()` method to count the number of `True` values in this combined condition. For example, to count the number of listings in Brooklyn in the DataFrame `df` that have a price less than 100, we can use the code:\n\n```\nin_brooklyn = df['neighbourhood_group'] == 'Brooklyn'\nless_100 = df['price'] < 100\ncount = (in_brooklyn & less_100).sum()\nprint(count)\n```"
	},
	{
		term: 'select-host-names',
		prompt: "Given a pandas DataFrame `df` that contains a column 'host_name' representing the name of each host, select anyone that has the host name of Michael, David, John, and Daniel using the `.isin()` method.",
		example:
			"To select anyone in the DataFrame `df` that has the host name of Michael, David, John, and Daniel, you can use the following code:\n\n```\nhost_names = ['Michael', 'David', 'John', 'Daniel']\nchosen_ones = df.host_name.isin(host_names)\nprint(len(df[chosen_ones]))\n```",
		description:
			":m When working with a DataFrame that contains information about hosts, it can be useful to select only the hosts with certain names. To do this, we can create a list of the desired names, and then use the `.isin()` method of the 'host_name' column to create a Boolean condition that checks if each row's 'host_name' is in the list. We can then use this condition to select only the rows that meet the condition. For example, to select anyone in the DataFrame `df` that has the host name of Michael, David, John, and Daniel, we can use the code:\n\n```\nhost_names = ['Michael', 'David', 'John', 'Daniel']\nchosen_ones = df.host_name.isin(host_names)\nprint(len(df[chosen_ones]))\n```"
	},
	{
		term: 'min-max-price-neighbourhood-groups',
		prompt: "Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, use `groupby()` and `.agg()` to find the minimum and maximum price for each of the neighbourhood groups.",
		example:
			"To find the minimum and maximum price for each of the neighbourhood groups in the DataFrame `df`, you can use the following code:\n\n```\ngb = df.groupby('neighbourhood_group')\nprint(gb['price'].agg(['min', 'max']))\n```",
		description:
			":m When working with a DataFrame that contains information about listings, it can be useful to find the minimum and maximum price for each neighbourhood group. To do this, we can use the `groupby()` method of the DataFrame to group the listings by their neighbourhood group, and then use the `.agg()` method to apply the `min()` and `max()` functions to the 'price' column of each group. We can then print the result to see the minimum and maximum price for each neighbourhood group. For example, to find the minimum and maximum price for each neighbourhood group"
	},
	{
		term: 'scatterplot-engine-HP-highway-MPG',
		attachment: './img/2023-03-24-12-48-24.png',
		prompt: "Given a pandas DataFrame `df` that contains columns 'Engine HP' and 'highway MPG', plot the relationship between these two variables using a scatter plot with `sns.scatterplot()`.",
		example:
			"To plot the relationship between the 'Engine HP' and 'highway MPG' columns of the DataFrame `df` using a scatter plot with Seaborn, you can use the following code:\n\n```\nimport seaborn as sns\n\nax = sns.scatterplot(data=df, x='Engine HP', y='highway MPG')\nax.set_title('Relationship of the Engine HP and the Highway NPG')\n```",
		description:
			":m When working with a DataFrame that contains information about cars, it can be useful to visualize the relationship between certain variables, such as the engine horsepower and highway miles per gallon. To do this, we can use a scatter plot with the `sns.scatterplot()` function from the Seaborn library. We can pass in the DataFrame `df` as the `data` argument, and specify the 'Engine HP' and 'highway MPG' columns as the `x` and `y` arguments, respectively. We can also add a title to the plot using the `set_title()` method of the plot axis. For example, to plot the relationship between the 'Engine HP' and 'highway MPG' columns of the DataFrame `df`, we can use the code:\n\n```\nimport seaborn as sns\n\nax = sns.scatterplot(data=df, x='Engine HP', y='highway MPG')\nax.set_title('Relationship of the Engine HP and the Highway NPG')\n```"
	},
	{
		term: 'boxplot-engine-HP',
		attachment: './img/2023-03-24-12-49-38.png',
		prompt: "Given a pandas DataFrame `df` that contains a column 'Engine HP', create a box plot of this column using `sns.boxplot()`.",
		example:
			"To create a box plot of the 'Engine HP' column of the DataFrame `df` using Seaborn, you can use the following code:\n\n```\nimport seaborn as sns\n\nax = sns.boxplot(data=df, x='Engine HP')\n```",
		description:
			":m When working with a DataFrame that contains information about cars, it can be useful to visualize the distribution of certain variables, such as the engine horsepower. To do this, we can use a box plot with the `sns.boxplot()` function from the Seaborn library. We can pass in the DataFrame `df` as the `data` argument, and specify the 'Engine HP' column as the `x` argument. This will create a box that shows the median, quartiles, and range of the 'Engine HP' values, allowing us to easily see any outliers or other features of the distribution. For example, to create a box plot of the 'Engine HP' column of the DataFrame `df`, we can use the code:\n\n```\nimport seaborn as sns\n\nax = sns.boxplot(data=df, x='Engine HP')\n```"
	},
	{
		term: 'get-info-on-columns',
		attachment: './img/2023-03-24-12-52-33.png',
		prompt: 'Suppose we have a pandas DataFrame `df`. How can we get information about the columns in this DataFrame, including their names, data types, and number of non-null values?',
		example:
			'We can use the `info()` method of the DataFrame `df` to get information about its columns. For example:\n\n```\ndf.info()\n```',
		description:
			":m When working with a pandas DataFrame, it can be useful to get information about the columns in the DataFrame, such as their names, data types, and number of non-null values. We can use the `info()` method of the DataFrame to get this information. This method prints a summary of the DataFrame's columns, including their names, data types, and number of non-null values. For example, to get information about the columns in a DataFrame `df`, we can use the code:\n\n```\ndf.info()\n```"
	},
	{
		term: 'pairplot-seaborn',
		attachment: './img/2023-03-24-12-54-05.png',
		prompt: 'Suppose we have a pandas DataFrame `df` that contains several columns, and we want to visualize the pairwise relationships between these columns using a scatter plot matrix. How can we create such a plot using the Seaborn library?',
		example:
			"We can use the `pairplot()` function from the Seaborn library to create a scatter plot matrix of the pairwise relationships between the columns in a DataFrame `df`. We can also specify a column to use for color-coding the points using the `hue` argument. For example:\n\n```\nimport seaborn as sns\n\nsns.pairplot(df, hue='survived')\n```",
		description:
			":m When working with a pandas DataFrame, it can be useful to visualize the pairwise relationships between its columns using a scatter plot matrix. We can use the `pairplot()` function from the Seaborn library to create such a plot. This function takes a DataFrame `df` as its first argument, and can also take several optional arguments to customize the appearance of the plot, such as `hue` to color-code the points based on a categorical column. For example, to create a scatter plot matrix of the pairwise relationships between the columns in a DataFrame `df` using Seaborn, we can use the code:\n\n```\nimport seaborn as sns\n\nsns.pairplot(df, hue='survived')\n```"
	},
	{
		term: 'histogram-plot-pandas',
		attachment: './img/2023-03-24-13-02-39.png',
		prompt: 'Suppose we have a pandas DataFrame `df` that contains one or more columns of numerical data, and we want to create histograms of this data. How can we create such histograms using the `hist()` method of the DataFrame?',
		example:
			":m We can use the `hist()` method of the DataFrame `df` to create histograms of its numerical columns. We can specify the number of bins using the `bins` argument, the size of the figure using the `figsize` argument, and the color of the bars using the `color` argument. For example:\n\n```\ndf.hist(bins=50, figsize=(21,13), color='maroon')\n```",
		description:
			":m When working with a pandas DataFrame that contains numerical data, it can be useful to create histograms of this data to visualize its distribution. We can use the `hist()` method of the DataFrame to create histograms of its numerical columns. This method takes several optional arguments to customize the appearance of the histogram, such as `bins` to specify the number of bins, `figsize` to specify the size of the figure, and `color` to specify the color of the bars. For example, to create histograms of the numerical columns in a DataFrame `df` with 50 bins, a figure size of 21x13 inches, and maroon-colored bars, we can use the code:\n\n```\ndf.hist(bins=50, figsize=(21,13), color='maroon')\n```"
	},
	{
		term: 'linear-relationship-seaborn',
		attachement: './img/2023-03-24-13-22-55.png',
		prompt: "Suppose we have a pandas DataFrame `df` that contains a column 'quality', as well as several other columns that may be related to quality. How can we use Seaborn to visualize the pairwise relationships between quality and each of these other columns, and determine which features have a linear relationship with quality?",
		example:
			":m We can use the `relplot()` function from the Seaborn library to visualize the pairwise relationships between quality and each of the other columns in the DataFrame `df`. We can specify the feature to plot on the y-axis using the `y` argument, and quality on the x-axis using the `x` argument. We can also specify the `kind` argument as 'line' to create a line plot instead of a scatter plot. For example:\n\n```\nimport seaborn as sns\n\nall_features = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',\n               'chlorides', 'free sulfur dioxide', 'total sulfur dioxide',\n                   'pH', 'sulphates', 'alcohol']\n\nfor feature in all_features:\n    sns.relplot(data=df, y=feature, x='quality', kind='line', height=5, aspect=1)\n```",
		description:
			":m When working with a pandas DataFrame that contains a column 'quality', as well as several other columns that may be related to quality, it can be useful to use Seaborn to visualize the pairwise relationships between quality and each of these other columns, and determine which features have a linear relationship with quality. We can use the `relplot()` function from the Seaborn library to do this. This function takes a DataFrame `df` as its first argument, and can also take several optional arguments to customize the appearance of the plot, such as `y` to specify the feature to plot on the y-axis, `x` to specify quality on the x-axis, and `kind` to specify the type of plot to create (e.g., 'line' for a line plot). For example, to visualize the pairwise relationships between quality and each of the columns in a list `all_features`, we can use the code:\n\n```\nimport seaborn as sns\n\nall_features = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',\n               'chlorides', 'free sulfur dioxide', 'total sulfur dioxide',\n                   'pH', 'sulphates', 'alcohol']\n\nfor feature in all_features:\n    sns.relplot(data=df, y=feature, x='quality', kind='line', height=5, aspect=1)\n```"
	},
	{
		term: 'linear-regression-scikit-learn',
		attachement: './img/2023-03-24-13-27-11.png',
		prompt: 'Suppose we want to use scikit-learn to build and evaluate a linear regression model on some training and testing data. How can we initialize a linear regression model and fit it to the training data using scikit-learn?',
		example:
			':m We can use the `LinearRegression()` class from the scikit-learn library to initialize a linear regression model. We can then use the `fit()` method of this class to fit the model to the training data. For example:\n\n```\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n```',
		description:
			':m When working with scikit-learn to build and evaluate a linear regression model on some training and testing data, we will need to initialize the model and fit it to the training data. We can use the `LinearRegression()` class from the scikit-learn library to initialize a linear regression model. This class takes several optional arguments to customize the model, such as `fit_intercept` to specify whether or not to fit an intercept term. Once we have initialized the model, we can use the `fit()` method of this class to fit the model to the training data. This method takes the training data as its arguments, and does all the fancy math behind the scenes. For example, to initialize a linear regression model and fit it to some training data `X_train` and `y_train`, we can use the code:\n\n```\nfrom sklearn.linear_model import LinearRegression\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n```'
	},
	{
		term: 'r-squared-score-scikit-learn',
		prompt: 'Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to evaluate how well the model explains the variance of the data using the R-squared score. How can we calculate the R-squared score using scikit-learn?',
		example:
			":m We can use the `r2_score()` function from the scikit-learn `metrics` module to calculate the R-squared score of our linear regression model. We can pass in the true values `y_test` and the predicted values `y_pred` as its arguments. For example:\n\n```\nfrom sklearn import metrics\n\nr_squared = metrics.r2_score(y_test, y_pred)\nprint('R-Squared Score:', r_squared)\n```",
		attachement: './img/2023-03-24-13-31-50.png',
		description:
			":m When working with scikit-learn to build and evaluate a linear regression model on some training and testing data, we can use the R-squared score to evaluate how well the model explains the variance of the data. We can use the `r2_score()` function from the scikit-learn `metrics` module to calculate the R-squared score of our linear regression model. This function takes the true values `y_test` and the predicted values `y_pred` as its arguments, and returns the R-squared score. The R-squared score measures the strength of the relationship between the model and the dependent variable on a 0-100% scale, with higher values indicating a stronger relationship. For example, to calculate the R-squared score of a linear regression model with true values `y_test` and predicted values `y_pred`, we can use the code:\n\n```\nfrom sklearn import metrics\n\nr_squared = metrics.r2_score(y_test, y_pred)\nprint('R-Squared Score:', r_squared)\n```"
	},
	{
		term: 'mean-absolute-error-scikit-learn',
		attachement: './img/2023-03-24-13-32-00.png',
		prompt: "Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to evaluate the model's performance using the mean absolute error (MAE) score. How can we calculate the MAE score using scikit-learn?",
		example:
			":m We can use the `mean_absolute_error()` function from the scikit-learn `metrics` module to calculate the MAE score of our linear regression model. We can pass in the true values `y_test` and the predicted values `y_pred` as its arguments. For example:\n\n```\nfrom sklearn import metrics\n\nmae = metrics.mean_absolute_error(y_test, y_pred)\nprint('Mean Absolute Error:', mae)\n```",
		description:
			":m When working with scikit-learn to build and evaluate a linear regression model on some training and testing data, we can use the mean absolute error (MAE) score to evaluate the model's performance. We can use the `mean_absolute_error()` function from the scikit-learn `metrics` module to calculate the MAE score of our linear regression model. This function takes the true values `y_test` and the predicted values `y_pred` as its arguments, and returns the MAE score. The MAE score measures the average absolute difference between the predicted values and the true values, and is a measure of how well the model is able to predict the true values. For example, to calculate the MAE score of a linear regression model with true values `y_test` and predicted values `y_pred`, we can use the code:\n\n```\nfrom sklearn import metrics\n\nmae = metrics.mean_absolute_error(y_test, y_pred)\nprint('Mean Absolute Error:', mae)\n```"
	}
];

const machine_learning_scikit_learn = [
	{
		term: 'linear-regression-coefficient-scikit-learn',
		attachement: './img/2023-03-24-13-31-18.png',
		prompt: 'Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to extract the coefficients of the model to see how each feature impacts the output. How can we extract the coefficients of a linear regression model using scikit-learn and display them in a data frame?',
		example:
			":m We can use the `coef_` attribute of the linear regression model object to extract the coefficients of the model. We can then create a data frame using the coefficients and the corresponding feature names, and display the data frame. For example:\n\n```\ncoefficient_values = model.coef_\n\n# Make a data frame out of the values and their column names\nfeatures = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol']\ndf_coefficients = pd.DataFrame(coefficient_values, columns=features).T\n\n# Rename the column from 0 to coefficient\n\n# Display the data frame\ndf_coefficients.columns = ['coefficient']\ndf_coefficients\n```",
		description:
			":m When working with scikit-learn to build and evaluate a linear regression model on some training and testing data, we can extract the coefficients of the model to see how each feature impacts the output. We can use the `coef_` attribute of the linear regression model object to extract the coefficients of the model. This attribute returns an array of the coefficients, with each coefficient corresponding to a feature. We can then create a data frame using the coefficients and the corresponding feature names, and display the data frame. This data frame shows the impact of each feature on the output, with positive coefficients indicating a positive impact and negative coefficients indicating a negative impact. For example, to extract the coefficients of a linear regression model `model` and display them in a data frame, we can use the code:\n\n```\n# Get the coefficient values from the model\ncoefficient_values = model.coef_\n\n# Make a data frame out of the values and their column names\nfeatures = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 'pH', 'sulphates', 'alcohol']\ndf_coefficients = pd.DataFrame(coefficient_values, columns=features).T\n\n# Rename the column from 0 to coefficient\n\n# Display the data frame\ndf_coefficients.columns = ['coefficient']\ndf_coefficients\n```"
	},
	{
		term: 'linear-regression-interpretation-coefficient',
		attachement: './img/2023-03-24-13-33-52.png',
		prompt: 'Suppose we have a linear regression model that has been trained on some data, and we want to interpret the coefficients of the model. How to find the relationship between quality and sulphates using the coefficients of the model? integrate small ammount of random noise to the x-axis to prevent data.',
		example:
			":m The coefficients of a linear regression model represent the change in the output variable for a 1 unit increase in the corresponding input variable, all other things being equal. For example, if the coefficient for the `sulphates` feature is 1.45, this means that a 1 unit increase in `sulphates` leads to a 1.45 unit increase in the output variable (quality), all other things being equal. To visualize this relationship, we can use seaborn's `regplot()` function to plot the linear relationship and trendline of `sulphates` in relation to `quality`. For example:\n\n```\nimport seaborn as sns\n\nplt.figure(figsize=(8,5))\n# Use seaborn regplot to plot the linear relationship and trendline\nsns.regplot(x='quality', y='sulphates', data=df, x_jitter=0.4);\n```",
		description:
			":m When working with a linear regression model, we can interpret the coefficients of the model to understand how much the output variable changes with a 1 unit increase in a particular input variable. The coefficients of a linear regression model represent the change in the output variable for a 1 unit increase in the corresponding input variable, all other things being equal. For example, if the coefficient for the `sulphates` feature is 1.45, this means that a 1 unit increase in `sulphates` leads to a 1.45 unit increase in the output variable (quality), all other things being equal. To visualize this relationship, we can use seaborn's `regplot()` function to plot the linear relationship and trendline of `sulphates` in relation to `quality`. This plot shows how the `quality` of the wine changes as the `sulphates` level increases, and the slope of the trendline represents the coefficient of `sulphates` in the linear regression model. For example, to plot the relationship between `sulphates` and `quality` and interpret the coefficient, we can use the code:\n\n```\nimport seaborn as sns\n\nplt.figure(figsize=(8,5))\n# Use seaborn regplot to plot the linear relationship and trendline\nsns.regplot(x='quality', y='sulphates', data=df, x_jitter=0.4);\n```"
	},
	{
		term: 'pickle-save-model',
		prompt: 'Suppose we have trained a machine learning model on some data, and we want to save the model so that we can use it later without having to retrain it. How can we save a machine learning model using the pickle library?',
		example:
			":m We can save a machine learning model using the `pickle` library in Python. First, we need to give the model a name and choose a filename to save it as. For example, if we name our model `red_wine_model` and want to save it as a file called `red_wine_model.pkl`, we can use the following code:\n\n```\nimport pickle\n\n# Name your model\nfilename = 'red_wine_model.pkl'\n\n# Export and save your model using your filename\npickle.dump(red_wine_model, open(filename, 'wb'))\n```",
		description:
			":m When we have trained a machine learning model on some data, we can save the model so that we can use it later without having to retrain it. We can save a machine learning model using the `pickle` library in Python. First, we need to give the model a name and choose a filename to save it as. We can then use the `pickle.dump()` function to save the model to a file. For example, if we name our model `red_wine_model` and want to save it as a file called `red_wine_model.pkl`, we can use the code:\n\n```\nimport pickle\n\n# Name your model\nfilename = 'red_wine_model.pkl'\n\n# Export and save your model using your filename\npickle.dump(red_wine_model, open(filename, 'wb'))\n```"
	},
	{
		term: 'pickle-load-model',
		prompt: 'Suppose we have saved a machine learning model using the pickle library, and we want to load the model so that we can use it to make predictions. How can we load a machine learning model using the pickle library? | the models filename is: red_wine_model.pkl',
		example:
			":m ```python\n\
        import pickle\n\
        \n\
        # Name your model\n\
        filename = 'red_wine_model.pkl'\n\
        \n\
        # Load your model using your filename\n\
        loaded_model = pickle.load(open(filename, 'rb'))\n\
        \n\
        # Make predictions using your loaded model\n\
        loaded_model.predict(X_test)\n\
        ",
		description:
			':m ```python\n\
        import pickle\n\
        \n\
        ...\n\
        # Load the model here.\n\
        loaded_model.predict(X_test)\n\
        '
	},
	{
		term: 'decision-tree-classifier-evaluation-metrics',
		prompt: 'Suppose we have trained a decision tree classifier on some data, and we want to evaluate the performance of the model. how to calculate accuracy, presicion, recall, F1 Score and what does each mean?',
		example:
			":m When we have trained a decision tree classifier on some data, we can evaluate the performance of the model using various evaluation metrics. Some common metrics include:\n\n- Accuracy Score: measures the proportion of correct predictions over the total number of predictions. For example, if our model correctly predicts 90 out of 100 samples, the accuracy score is 0.9. To calculate the accuracy score, we can use the code:\n\n```\naccuracy = accuracy_score(y_true=y_test, y_pred=y_pred)\nprint('Accuracy Score:', accuracy)\n```\n\n- Precision Score: measures the proportion of true positive predictions over the total number of positive predictions. For example, if our model correctly predicts 90 out of 100 positive samples, the precision score is 0.9. To calculate the precision score, we can use the code:\n\n```\nprecision = precision_score(y_true=y_test, y_pred=y_pred)\nprint('Precision Score:', precision)\n```\n\n- Recall Score: measures the proportion of true positive predictions over the total number of actual positive samples. For example, if there are 100 positive samples in the test set, and our model correctly predicts 90 of them, the recall score is 0.9. To calculate the recall score, we can use the code:\n\n```\nrecall = recall_score(y_true=y_test, y_pred=y_pred)\nprint('Recall Score:', recall)\n```\n\n- F1 Score: a weighted harmonic mean of the precision and recall scores. The F1 score is a good metric to use when we want to balance precision and recall. To calculate the F1 score, we can use the code:\n\n```\nf1 = f1_score(y_true=y_test, y_pred=y_pred)\nprint('F1 Score:', f1)\n```\n\n- AUC Score: measures the area under the receiver operating characteristic (ROC) curve. The ROC curve plots the true positive rate against the false positive rate for different classification thresholds. The AUC score is a measure of how well the model can distinguish between positive and negative samples. To calculate the AUC score, we can use the code:\n\n```\ny_pred_proba = model.predict_proba(X_test)[:,1]\nauc = roc_auc_score(y_true=y_test, y_score=y_pred_proba)\nprint('AUC Score:', auc)\n```",
		description:
			":m When we have trained a decision tree classifier on some data, we can evaluate the performance of the model using various evaluation metrics. Some common metrics include:\n\n- Accuracy Score: measures the proportion of correct predictions over the total number of predictions. To calculate the accuracy score, we can use the `accuracy_score()` function from scikit-learn.\n\n- Precision Score: measures the proportion of true positive predictions over the total number of positive predictions. To calculate the precision score, we can use the `precision_score()` function from scikit-learn.\n\n- Recall Score: measures the proportion of true positive predictions over the total number of actual positive samples. To calculate the recall score, we can use the `recall_score()` function from scikit-learn.\n\n- F1 Score: F1 score is a measure of a model's accuracy that combines precision and recall into a single metric."
	},
	{
		term: 'decision-tree-visualization',
		attachement: './img/2023-03-24-13-46-20.png',
		prompt: 'Suppose we have trained a decision tree classifier on some data, and we want to visualize the tree. How can we create a visualization of the decision tree? with out_file is non, selected_features, classnames as [died, survived], make it rounded and filled and allow special characters',
		example:
			":m To create a visualization of a decision tree in Python, we can use the `export_graphviz()` function from the `sklearn.tree` module, along with the `graphviz` library. First, we import the necessary modules:\n\n```\nfrom sklearn.tree import export_graphviz\nimport graphviz\n```\n\nThen, we call the `export_graphviz()` function to generate a representation of the decision tree in the DOT format:\n\n```\ndot_data = export_graphviz(\n    model,\n    out_file=None,\n    feature_names=selected_features,\n    class_names=['died', 'survived'],\n    filled=True,\n    rounded=True,\n    special_characters=True\n)\n``` \n\nWe can then use the `Source()` function from the `graphviz` library to create a visualization of the decision tree:\n\n```\ngraph = graphviz.Source(dot_data)\ngraph\n```",
		description:
			':m To create a visualization of a decision tree in Python, we can use the `export_graphviz()` function from the `sklearn.tree` module, along with the `graphviz` library. First, we import the necessary modules:\n\n```\nfrom sklearn.tree import export_graphviz\nimport graphviz\n```\n\nThen, we call the `export_graphviz()` function to generate a representation of the decision tree in the DOT format. This representation includes information about the splits at each node, the number of samples at each node, and the class distribution at each node. We can customize the appearance of the tree by passing various arguments to the `export_graphviz()` function, such as the names of the features and classes, and whether to fill the nodes with color or not. Once we have generated the DOT representation of the decision tree, we can use the `Source()` function from the `graphviz` library to create a visualization of the tree. This visualization will show the splits and decision nodes of the tree, along with the number of samples and the class distribution at each node.'
	},
	{
		term: 'decision-tree-classifier-depth',
		attachement: './img/2023-03-24-13-49-10.png',
		prompt: 'Suppose we have some data that we want to classify using a decision tree. How can we create a decision tree classifier in Python of depth 2? How to fit it? suppose you have X and y for the trainning data.?',
		example:
			':m To create a decision tree classifier in Python, we can use the `DecisionTreeClassifier` class from the `sklearn.tree` module. First, we import the necessary modules:\n\n```\nfrom sklearn.tree import DecisionTreeClassifier\n```\n\nThen, we instantiate a `DecisionTreeClassifier` object and set any desired parameters, such as the maximum depth of the tree:\n\n```\nmodel = DecisionTreeClassifier(max_depth=2)\n```\n\nOnce we have instantiated the model, we can fit it to our data using the `fit()` method, passing in the features and target variables as arguments:\n\n```\nmodel.fit(X, y)\n```',
		description:
			':m To create a decision tree classifier in Python, we can use the `DecisionTreeClassifier` class from the `sklearn.tree` module. First, we import the necessary modules:\n\n```\nfrom sklearn.tree import DecisionTreeClassifier\n```\n\nThen, we instantiate a `DecisionTreeClassifier` object and set any desired parameters, such as the maximum depth of the tree. Other important parameters include `criterion` (the function used to measure the quality of a split) and `min_samples_split` (the minimum number of samples required to split an internal node). Once we have instantiated the model, we can fit it to our data using the `fit()` method, passing in the features and target variables as arguments. Once the model is trained, we can use the `predict()` method to classify new instances of data. In addition to the `predict()` method, decision tree classifiers also have a `predict_proba()` method, which returns the probabilities of each class for a given input. We can also visualize the decision tree using the `export_graphviz()` function and the `graphviz` library, as described in another prompt.'
	},
	{
		term: 'grid-search-decision-tree',
		prompt: 'What is grid search, and how can we use it to automatically find the best parameters and estimators for a decision tree model in Python?',
		example:
			":m\n\
        ```js\n\
        params = {\n\t'n_estimators' : [5, 100, 1000],\n\t'criterion' : ['gini', 'entropy'],\n\t'max_features': [2, 4, 'auto']\n}\n\ngrid_search_cv = GridSearchCV(\n\testimator=RandomForestClassifier(), \n\tparam_grid=params,\n\tscoring='f1',\n)\n\n# Now, with one easy command, fit all combination of trees. \ngrid_search_cv.fit(X_train, y_train)\n\n# Print the best parameters it found\nprint(grid_search_cv.best_params_)\n\n# This command gives you model that has the highest f1-score. \nmodel = grid_search_cv.best_estimator\n\
        ```\n\
        {'criterion': 'entropy', 'max_features': 'auto', 'n_estimators': 100}\n\
        ",
		description:
			":m\n\
        ```js\n\
        params = {\n\t'n_estimators' : [5, 100, 1000],\n\t'criterion' : ['gini', 'entropy'],\n\t'max_features': [2, 4, 'auto']\n}\n\ngrid_search_cv = [COMPLETE HERE] \n\tparam_grid=params,\n\tscoring='f1',\n)\n\n# Now, with one easy command, fit all combination of trees. \ngrid_search_cv.fit(X_train, y_train)\n\n# Print the best parameters it found\nprint(grid_search_cv.best_params_)\n\n# This command gives you model that has the highest f1-score. \nmodel = grid_search_cv.best_estimator\n\
        ```\n\
        {'criterion': 'entropy', 'max_features': 'auto', 'n_estimators': 100}\n\
        " +
			':m Grid search is a technique used to find the best combination of hyperparameters for a machine learning model. It works by searching through a grid of possible hyperparameter values and evaluating each combination using cross-validation. In Python, we can use the `GridSearchCV` class from the `sklearn.model_selection` module to perform grid search on a decision tree model. First, we define a dictionary of hyperparameter values to search over, including things like the number of trees in the forest, the maximum depth of the tree, and the criterion used to measure the quality of a split. We then instantiate a `GridSearchCV` object, passing in the decision tree model we want to optimize, the dictionary of hyperparameters, and the scoring metric we want to optimize for (such as `accuracy`, `precision`, or `recall`). We then fit the `GridSearchCV` object to our training data using the `fit()` method, and the resulting object will contain the best combination of hyperparameters found during the search. We can access the best hyperparameters using the `best_params_` attribute, and we can use the `best_estimator_` attribute to get a model object that uses those hyperparameters.'
	},
	{
		term: 'value-counts-df',
		prompt: 'What is the `value_counts()` method in Pandas, and how can we use it to count the number of occurrences of each unique value in a column: topic_category of a DataFrame: df?',
		example:
			":m The `value_counts()` method in Pandas is a convenient way to count the number of occurrences of each unique value in a column of a DataFrame. It returns a Series object with the unique values in the column as the index and the count of each value as the value. To use `value_counts()`, we simply call it on a DataFrame column or Series, like so: `df['topic_category'].value_counts()`. This will return a Series with the count of each unique value in the 'topic_category' column of the DataFrame `df`. We can use this method to quickly get a sense of the distribution of values in a column, and to identify any imbalances or patterns that may be present.",
		description:
			':m rec.sport.hockey\t\t600\nsoc.religion.christian\t599\nrec.motorcycles\t\t598\nrec.sport.baseball\t\t597\nsci.crypt\t\t\t595\nrec.autos\t\t\t594\nsci.med\t\t\t594\ncomp.windows.x\t\t\t593\nsci.space\t\t\t593\ncomp.os.ms-windows.misc\t\t591\nsci.electronics\t\t\t591\ncomp.sys.ibm.pc.hardware\t590\nmisc.forsale\t\t\t585\ncomp.graphics\t\t\t584\ncomp.sys.mac.hardware\t\t578\ntalk.politics.mideast\t\t564\ntalk.politics.guns\t\t546\nalt.atheism\t\t\t480\ntalk.politics.misc\t\t465\ntalk.religion.misc\t\t377'
	},
	{
		term: 'tf-idf-vectorization',
		prompt: 'What is TF-IDF vectorization, and how can we use the `TfidfVectorizer` class in Scikit-Learn to vectorize text data?',
		description:
			':m\n\
        ```js\n\
        from sklearn.feature_extraction.text import TfidfVectorizer\n\n# Initialize our vectorizer\n...\n# This makes your vocab matrix\n...\n\n# This transforms your documents into vectors.\n...\nX_test = vectorizer.transform(X_test)\n\nprint(X_train.shape, type(X))\
        ```\
        ' +
			':m TF-IDF (term frequency-inverse document frequency) is a numerical statistic that reflects how important a word is to a document in a corpus. TF-IDF vectorization is a way to transform raw text into a numerical feature space that can be used in machine learning algorithms. The `TfidfVectorizer` class in Scikit-Learn provides an easy way to perform TF-IDF vectorization on text data. First, we initialize a `TfidfVectorizer` object. We can optionally pass in various parameters to customize the vectorization process, such as the minimum and maximum document frequency, stop words, and n-gram ranges. We then call the `fit()` method on the vectorizer object, passing in our training data. This builds the vocabulary matrix for the vectorizer. Finally, we transform our raw text data into a numerical feature space using the `transform()` method on the vectorizer object, passing in our training or testing data. This will transform each document into a vector of numerical features, where each feature corresponds to a unique word in the vocabulary matrix. The resulting vectors can be used as input to machine learning models. Using TF-IDF vectorization can be a powerful tool for working with text data, as it allows us to represent text in a way that can be easily understood and analyzed by machine learning algorithms.',
		example:
			':m\n\
        ```js\n\
        from sklearn.feature_extraction.text import TfidfVectorizer\n\n# Initialize our vectorizer\nvectorizer = TfidfVectorizer()\n\n# This makes your vocab matrix\nvectorizer.fit(X_train)\n\n# This transforms your documents into vectors.\nX_train = vectorizer.transform(X_train)\nX_test = vectorizer.transform(X_test)\n\nprint(X_train.shape, type(X))\
        ```\
        '
	},
	{
		term: 'tf-idf-vectorization-implementation',
		prompt: 'What is TF-IDF vectorization, and how can we use the TfidfVectorizer class in Scikit-Learn to vectorize text data?',
		example:
			'TF-IDF (term frequency-inverse document frequency) is a numerical statistic that reflects how important a word is to a document in a corpus. TF-IDF vectorization is a way to transform raw text into a numerical feature space that can be used in machine learning algorithms. The TfidfVectorizer class in Scikit-Learn provides an easy way to perform TF-IDF vectorization on text data. First, we initialize a TfidfVectorizer object. We can optionally pass in various parameters to customize the vectorization process, such as the minimum and maximum document frequency, stop words, and n-gram ranges. We then call the fit() method on the vectorizer object, passing in our training data. This builds the vocabulary matrix for the vectorizer. Finally, we transform our raw text data into a numerical feature space using the transform() method on the vectorizer object, passing in our training or testing data. This will transform each document into a vector of numerical features, where each feature corresponds to a unique word in the vocabulary matrix. The resulting vectors can be used as input to machine learning models. Using TF-IDF vectorization can be a powerful tool for working with text data, as it allows us to represent text in a way that can be easily understood and analyzed by machine learning algorithms.',
		term: 'multinomial-naive-bayes-classifier',
		prompt: 'What is the Multinomial Naive Bayes classifier, and how can we use it in Scikit-Learn to classify text data?',
		example:
			"The Multinomial Naive Bayes classifier is a probabilistic model that is commonly used for text classification tasks. It is based on Bayes' theorem and the assumption of conditional independence between features. In Scikit-Learn, we can use the MultinomialNB class to train a Multinomial Naive Bayes classifier. First, we vectorize our text data using TF-IDF vectorization (or some other method) to transform the text into a numerical feature space. We then split our data into training and testing sets, and use the fit() method of the MultinomialNB object to train the classifier on our training data. Finally, we use the predict() method of the classifier to predict the class labels of our testing data. The MultinomialNB class also provides methods for computing the accuracy, precision, recall, and F1 score of our classifier. By using the Multinomial Naive Bayes classifier, we can classify text data with high accuracy and efficiency."
	},
	{
		term: 'confusion-matrix-plot',
		prompt: ':m Plot the confusion matrix given `plt` which is `mode`, `X_test`, `y_test`, display the labels from `model.classes_`, create xtics with rotation of 90:',
		example: `:m # Plot the confusion matrix of our results
        fig, ax = plt.subplots(figsize=(21, 21))
        
        disp = plot_confusion_matrix(model, X_test, y_test,
                                     display_labels=model.classes_,
                                     cmap=plt.cm.Blues, ax=ax)
        plt.xticks(rotation=90)
        disp`,
		description:
			"When evaluating the performance of a classification model, a confusion matrix can provide valuable information about how well the model is doing. To plot the confusion matrix using Python's `matplotlib` library, we can use the `plot_confusion_matrix` function. We need to pass in the trained model, the test data (`X_test` and `y_test`), the `display_labels` parameter (which should be set to `model.classes_` to display the labels from the model), and the `ax` parameter to specify the axes to plot on. To rotate the x-axis labels by 90 degrees, we can use the `xticks` function with the `rotation` parameter set to 90."
	},
	{
		term: 'confusion-matrix-plot',
		prompt: 'Plot the confusion matrix given `plt` which is `mode`, `X_test`, `y_test`, display the labels from `model.classes_`, create xtics with rotation of 90:',
		example: `:m # Plot the confusion matrix of our results
        \`\`\`js 
        fig, ax = plt.subplots(figsize=(21, 21))
        
        disp = plot_confusion_matrix(model, X_test, y_test,
                                     display_labels=model.classes_,
                                     cmap=plt.cm.Blues, ax=ax)
        plt.xticks(rotation=90)
        disp
        \`\`\`
        `,
		description:
			":m When evaluating the performance of a classification model, a confusion matrix can provide valuable information about how well the model is doing. To plot the confusion matrix using Python's `matplotlib` library, we can use the `plot_confusion_matrix` function. We need to pass in the trained model, the test data (`X_test` and `y_test`), the `display_labels` parameter (which should be set to `model.classes_` to display the labels from the model), and the `ax` parameter to specify the axes to plot on. To rotate the x-axis labels by 90 degrees, we can use the `xticks` function with the `rotation` parameter set to 90."
	}
];

// TODO https://www.youtube.com/watch?v=lG7Uxts9SXs
// Would be cool to tweak langchain for this prompt asking problems.
const langchain = [{}];

const ai_theory = [
	{
		term: 'ai-framework',
		prompt: 'Explain the following 6 steps on ai problems:',
		description:
			'1. Problem Definition \n\
        2. Data \n\
        3. Evaluation \n\
        4. Features \n\
        5. Modelling \n\
        6. Experimentation',
		example:
			'1. Problem Definition - What is the problem we are trying to solve? \n\
        2. Data - What data do we have to solve the problem? \n\
        3. Evaluation - How do we know if our model is good? \n\
        4. Features - What features should we use to solve the problem? \n\
        5. Modelling - What model should we use to solve the problem? \n\
        6. Experimentation - How can we improve the model?'
	}
];

module.exports = {
	pytorch_machine_learning_course,
	machine_learning_pandas_visualization,
	machine_learning_scikit_learn,
	ai_theory
};
