## Data Visualization

#### scatterplot-engine-HP-highway-MPG
Scatter plots are useful for visualizing relationships between two continuous variables. The `sns.scatterplot()` function creates professional-looking plots with customizable titles.

:p Given a pandas DataFrame `df` that contains columns 'Engine HP' and 'highway MPG', plot the relationship between these two variables using a scatter plot with `sns.scatterplot()`.
??x
```python
import seaborn as sns

ax = sns.scatterplot(data=df, x='Engine HP', y='highway MPG')
ax.set_title('Relationship of the Engine HP and the Highway NPG')
```
x??

#### boxplot-engine-HP
Box plots show the distribution of data including median, quartiles, and outliers. They're excellent for identifying outliers and understanding data spread.

:p Given a pandas DataFrame `df` that contains a column 'Engine HP', create a box plot of this column using `sns.boxplot()`.
??x
```python
import seaborn as sns

ax = sns.boxplot(data=df, x='Engine HP')
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

#### pairplot-seaborn
Pairplots create scatter plot matrices showing relationships between all pairs of numerical variables, with optional color-coding based on a categorical variable.

:p Suppose we have a pandas DataFrame `df` that contains several columns, and we want to visualize the pairwise relationships between these columns using a scatter plot matrix. How can we create such a plot using the Seaborn library?
??x
```python
import seaborn as sns

sns.pairplot(df, hue='survived')
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

#### linear-relationship-seaborn
Using `relplot()` with `kind='line'` helps identify linear relationships between features and a target variable by plotting regression lines.

:p Suppose we have a pandas DataFrame `df` that contains a column 'quality', as well as several other columns that may be related to quality. How can we use Seaborn to visualize the pairwise relationships between quality and each of these other columns, and determine which features have a linear relationship with quality?
??x
```python
import seaborn as sns

all_features = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',
               'chlorides', 'free sulfur dioxide', 'total sulfur dioxide',
               'pH', 'sulphates', 'alcohol']

for feature in all_features:
    sns.relplot(data=df, y=feature, x='quality', kind='line', height=5, aspect=1)
```
x??


# Designing Good Charts

#### choosing chart

:p What chart to se when you see different location based data with frequenccies?
??x
Heatmap, choropleth map
x??

#### bar charts

:p What to consider when having a bar chart?
??x
If it has long names, consider having that on the y axis, sort the numeric values, make sure they have enough space
x??

*Attachment: ./img/2023-03-22-19-54-00.png*

#### line charts

:p What to consider when having a line chart?
??x
They are good for showing trends, but not good for showing the exact values. If you want to show the exact values, consider using a scatter plot, using it implies a varying relationship between the x values
x??

#### colors

:p What to consider when using colors?
??x
You can use ColorBrewer to choose the colors, let the intensity make a change.
        You can highlight the story you want to tell.
x??

#### scatter plot

:p When can You use Scatter Plots?
??x
You can use them when you want to see clustering.
x??
