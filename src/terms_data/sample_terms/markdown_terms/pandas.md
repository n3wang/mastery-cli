# Pandas

#### count-duplicate-rows
Duplicate rows in a DataFrame can cause issues with data analysis and modeling. To identify the number of duplicate rows in a DataFrame, we can use the `duplicated()` method of the DataFrame and the `sum()` method to count the number of `True` values.

:p Print the number of duplicate rows in the DataFrame `df`.
??x
```python
print(df.duplicated().sum())
```
x??

#### print-df-shape
Before working with a pandas DataFrame, it is important to understand its dimensions. The `shape` attribute returns a tuple with the number of rows and columns. The `drop_duplicates()` method removes duplicate rows to ensure data quality.

:p Given a pandas DataFrame `df`, print the number of rows and columns it has. Then, remove duplicate rows from the DataFrame and assign the result to the same variable.
??x
```python
print(df.shape)
df = df.drop_duplicates()
```
x??

#### count-car-brands-bar-chart
When working with a DataFrame containing car information, visualizing the count of cars for each brand can be useful. We group by brand using `groupby()`, count occurrences with `count()`, and create a bar chart with `plot(kind='bar')`.

:p Given a pandas DataFrame `df` that contains a column 'Make' representing the brand of each car, make a bar chart that displays the count of cars for each brand.
??x
```python
gb = df.groupby('Make')
count_makes = gb['Make'].count()
count_makes.plot(kind='bar')
```
x??

#### average-msrp-timeline-chart
To visualize how average MSRP changes over time, we group cars by year, calculate the mean MSRP for each year, and create a line chart showing the trend.

:p Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, make a line chart that displays the average MSRP for each year.
??x
```python
gb = df.groupby('Year')
average_MSRP = gb['MSRP'].mean()
average_MSRP.plot(kind='line', figsize=(8,5))
```
x??

#### adjust-price-by-year
We can adjust MSRP based on the year by creating a function that returns different factors (10 for years ≤ 2000, 1 for others) and applying it using the `apply()` method.

:p Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, create a new column 'adjusted_price' where the MSRP is adjusted by a factor based on the year.
??x
```python
def adjust_price_year(x):
    if x <= 2000:
        return 10
    else:
        return 1

df['adjusted_price'] = df['MSRP']
df['adjusted_price'] *= df['Year'].apply(adjust_price_year)
```
x??

#### histogram-adjusted-price-car-makers
To visualize adjusted price distribution for specific car makers, we create Boolean conditions for each maker, filter the DataFrame, and use `sns.histplot` with hue to differentiate between brands.

:p Given a pandas DataFrame `df` that contains a column 'adjusted_price' representing the adjusted MSRP of each car, and columns 'Make' and 'Year' representing the make and year of each car, create a histogram of the adjusted price of just these car makers using `sns.histplot`.
??x
```python
import seaborn as sns

condC = df["Make"] == "Chevrolet"
condF = df["Make"] == "Ford"
condT = df["Make"] == "Toyota"

sns.set()
temp_df = df[condC | condF | condT]
ax = sns.histplot(data=temp_df, x="Year", y="adjusted_price", hue="Make")
```
x??

#### count-listings-price-less-than
To count listings with prices below a threshold, we create a Boolean condition and use `sum()` to count the `True` values.

:p Given a pandas DataFrame `df` that contains a column 'price' representing the price of each listing, how many listings are there with a price less than a certain value `x`?
??x
```python
count = (df['price'] < 100).sum()
print(count)
```
x??

#### count-brooklyn-listings-price-less-than
To count listings meeting multiple criteria, we combine Boolean conditions using the `&` operator and sum the results.

:p Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, how many listings are there in Brooklyn with a price less than a certain value `x`?
??x
```python
in_brooklyn = df['neighbourhood_group'] == 'Brooklyn'
less_100 = df['price'] < 100
count = (in_brooklyn & less_100).sum()
print(count)
```
x??

#### select-host-names
The `.isin()` method is useful for filtering rows where a column's value is in a specific list of values.

:p Given a pandas DataFrame `df` that contains a column 'host_name' representing the name of each host, select anyone that has the host name of Michael, David, John, and Daniel using the `.isin()` method.
??x
```python
host_names = ['Michael', 'David', 'John', 'Daniel']
chosen_ones = df.host_name.isin(host_names)
print(len(df[chosen_ones]))
```
x??

#### min-max-price-neighbourhood-groups
Using `groupby()` with `.agg()` allows us to apply multiple aggregation functions (min, max) to grouped data efficiently.

:p Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, use `groupby()` and `.agg()` to find the minimum and maximum price for each of the neighbourhood groups.
??x
```python
gb = df.groupby('neighbourhood_group')
print(gb['price'].agg(['min', 'max']))
```
x??

#### get-info-on-columns
The `info()` method provides a comprehensive summary of DataFrame structure, including column names, data types, non-null counts, and memory usage.

:p Suppose we have a pandas DataFrame `df`. How can we get information about the columns in this DataFrame, including their names, data types, and number of non-null values?
??x
```python
df.info()
```
x??

#### histogram-plot-pandas
The `hist()` method creates histograms for all numerical columns simultaneously, with customizable bins, figure size, and colors.

:p Suppose we have a pandas DataFrame `df` that contains one or more columns of numerical data, and we want to create histograms of this data. How can we create such histograms using the `hist()` method of the DataFrame?
??x
```python
df.hist(bins=50, figsize=(21,13), color='maroon')
```
x??

#### value-counts-df
The `value_counts()` method returns a Series with unique values as the index and their counts as values, useful for understanding data distribution.

:p What is the `value_counts()` method in Pandas, and how can we use it to count the number of occurrences of each unique value in a column: topic_category of a DataFrame: df?
??x
```python
df['topic_category'].value_counts()
```
x??


## Pandas Data Analysis

#### count-duplicate-rows
Duplicate rows in a DataFrame can cause issues with data analysis and modeling. To identify the number of duplicate rows in a DataFrame, we can use the `duplicated()` method of the DataFrame and the `sum()` method to count the number of `True` values.

:p Print the number of duplicate rows in the DataFrame `df`.
??x
```python
print(df.duplicated().sum())
```
x??

#### print-df-shape
Before working with a pandas DataFrame, it is important to understand its dimensions. The `shape` attribute returns a tuple with the number of rows and columns. The `drop_duplicates()` method removes duplicate rows to ensure data quality.

:p Given a pandas DataFrame `df`, print the number of rows and columns it has. Then, remove duplicate rows from the DataFrame and assign the result to the same variable.
??x
```python
print(df.shape)
df = df.drop_duplicates()
```
x??

#### count-car-brands-bar-chart
When working with a DataFrame containing car information, visualizing the count of cars for each brand can be useful. We group by brand using `groupby()`, count occurrences with `count()`, and create a bar chart with `plot(kind='bar')`.

:p Given a pandas DataFrame `df` that contains a column 'Make' representing the brand of each car, make a bar chart that displays the count of cars for each brand.
??x
```python
gb = df.groupby('Make')
count_makes = gb['Make'].count()
count_makes.plot(kind='bar')
```
x??

#### average-msrp-timeline-chart
To visualize how average MSRP changes over time, we group cars by year, calculate the mean MSRP for each year, and create a line chart showing the trend.

:p Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, make a line chart that displays the average MSRP for each year.
??x
```python
gb = df.groupby('Year')
average_MSRP = gb['MSRP'].mean()
average_MSRP.plot(kind='line', figsize=(8,5))
```
x??

#### adjust-price-by-year
We can adjust MSRP based on the year by creating a function that returns different factors (10 for years ≤ 2000, 1 for others) and applying it using the `apply()` method.

:p Given a pandas DataFrame `df` that contains a column 'Year' representing the year of each car, create a new column 'adjusted_price' where the MSRP is adjusted by a factor based on the year.
??x
```python
def adjust_price_year(x):
    if x <= 2000:
        return 10
    else:
        return 1

df['adjusted_price'] = df['MSRP']
df['adjusted_price'] *= df['Year'].apply(adjust_price_year)
```
x??

#### histogram-adjusted-price-car-makers
To visualize adjusted price distribution for specific car makers, we create Boolean conditions for each maker, filter the DataFrame, and use `sns.histplot` with hue to differentiate between brands.

:p Given a pandas DataFrame `df` that contains a column 'adjusted_price' representing the adjusted MSRP of each car, and columns 'Make' and 'Year' representing the make and year of each car, create a histogram of the adjusted price of just these car makers using `sns.histplot`.
??x
```python
import seaborn as sns

condC = df["Make"] == "Chevrolet"
condF = df["Make"] == "Ford"
condT = df["Make"] == "Toyota"

sns.set()
temp_df = df[condC | condF | condT]
ax = sns.histplot(data=temp_df, x="Year", y="adjusted_price", hue="Make")
```
x??

#### count-listings-price-less-than
To count listings with prices below a threshold, we create a Boolean condition and use `sum()` to count the `True` values.

:p Given a pandas DataFrame `df` that contains a column 'price' representing the price of each listing, how many listings are there with a price less than a certain value `x`?
??x
```python
count = (df['price'] < 100).sum()
print(count)
```
x??

#### count-brooklyn-listings-price-less-than
To count listings meeting multiple criteria, we combine Boolean conditions using the `&` operator and sum the results.

:p Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, how many listings are there in Brooklyn with a price less than a certain value `x`?
??x
```python
in_brooklyn = df['neighbourhood_group'] == 'Brooklyn'
less_100 = df['price'] < 100
count = (in_brooklyn & less_100).sum()
print(count)
```
x??

#### select-host-names
The `.isin()` method is useful for filtering rows where a column's value is in a specific list of values.

:p Given a pandas DataFrame `df` that contains a column 'host_name' representing the name of each host, select anyone that has the host name of Michael, David, John, and Daniel using the `.isin()` method.
??x
```python
host_names = ['Michael', 'David', 'John', 'Daniel']
chosen_ones = df.host_name.isin(host_names)
print(len(df[chosen_ones]))
```
x??

#### min-max-price-neighbourhood-groups
Using `groupby()` with `.agg()` allows us to apply multiple aggregation functions (min, max) to grouped data efficiently.

:p Given a pandas DataFrame `df` that contains a column 'neighbourhood_group' representing the borough of each listing and a column 'price' representing the price of each listing, use `groupby()` and `.agg()` to find the minimum and maximum price for each of the neighbourhood groups.
??x
```python
gb = df.groupby('neighbourhood_group')
print(gb['price'].agg(['min', 'max']))
```
x??
