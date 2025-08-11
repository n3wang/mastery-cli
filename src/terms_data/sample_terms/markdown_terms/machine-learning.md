
## Machine Learning - Scikit-Learn

#### linear-regression-scikit-learn
The `LinearRegression()` class initializes a linear regression model, and the `fit()` method trains it on the provided data.

:p Suppose we want to use scikit-learn to build and evaluate a linear regression model on some training and testing data. How can we initialize a linear regression model and fit it to the training data using scikit-learn?
??x
```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
```
x??

#### r-squared-score-scikit-learn
R-squared measures the proportion of variance in the dependent variable explained by the model. Values closer to 1 indicate better model performance.

:p Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to evaluate how well the model explains the variance of the data using the R-squared score. How can we calculate the R-squared score using scikit-learn?
??x
```python
from sklearn import metrics

r_squared = metrics.r2_score(y_test, y_pred)
print('R-Squared Score:', r_squared)
```
x??

#### mean-absolute-error-scikit-learn
MAE measures the average absolute difference between predicted and actual values, providing a clear metric of prediction accuracy.

:p Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to evaluate the model's performance using the mean absolute error (MAE) score. How can we calculate the MAE score using scikit-learn?
??x
```python
from sklearn import metrics

mae = metrics.mean_absolute_error(y_test, y_pred)
print('Mean Absolute Error:', mae)
```
x??

#### linear-regression-coefficient-scikit-learn
Model coefficients show the impact of each feature on the prediction. Positive coefficients increase the output, while negative coefficients decrease it.

:p Suppose we have built a linear regression model using scikit-learn on some training and testing data, and we want to extract the coefficients of the model to see how each feature impacts the output. How can we extract the coefficients of a linear regression model using scikit-learn and display them in a data frame?
??x
```python
coefficient_values = model.coef_

features = ['fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar', 
           'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density', 
           'pH', 'sulphates', 'alcohol']
df_coefficients = pd.DataFrame(coefficient_values, columns=features).T
df_coefficients.columns = ['coefficient']
df_coefficients
```
x??

#### linear-regression-interpretation-coefficient
Coefficients represent the change in output for a 1-unit increase in the input variable. The `regplot()` function visualizes this linear relationship with a trend line.

:p Suppose we have a linear regression model that has been trained on some data, and we want to interpret the coefficients of the model. How to find the relationship between quality and sulphates using the coefficients of the model? integrate small amount of random noise to the x-axis to prevent data.
??x
```python
import seaborn as sns

plt.figure(figsize=(8,5))
sns.regplot(x='quality', y='sulphates', data=df, x_jitter=0.4)
```
x??

## Model Persistence

#### pickle-save-model
The `pickle` library allows us to serialize and save trained models to disk for future use.

:p Suppose we have trained a machine learning model on some data, and we want to save the model so that we can use it later without having to retrain it. How can we save a machine learning model using the pickle library?
??x
```python
import pickle

filename = 'red_wine_model.pkl'
pickle.dump(red_wine_model, open(filename, 'wb'))
```
x??

#### pickle-load-model
Loading a pickled model allows us to make predictions without retraining, saving time and computational resources.

:p Suppose we have saved a machine learning model using the pickle library, and we want to load the model so that we can use it to make predictions. How can we load a machine learning model using the pickle library? The model's filename is: red_wine_model.pkl
??x
```python
import pickle

filename = 'red_wine_model.pkl'
loaded_model = pickle.load(open(filename, 'rb'))
loaded_model.predict(X_test)
```
x??

## Classification

#### decision-tree-classifier-evaluation-metrics
When we have trained a decision tree classifier on some data, we can evaluate the performance of the model using various evaluation metrics.

:p Suppose we have trained a decision tree classifier on some data, and we want to evaluate the performance of the model. How to calculate accuracy, precision, recall, F1 Score and what does each mean?
??x
**Accuracy Score**: Proportion of correct predictions over total predictions
```python
accuracy = accuracy_score(y_true=y_test, y_pred=y_pred)
print('Accuracy Score:', accuracy)
```

**Precision Score**: Proportion of true positive predictions over total positive predictions
```python
precision = precision_score(y_true=y_test, y_pred=y_pred)
print('Precision Score:', precision)
```

**Recall Score**: Proportion of true positive predictions over total actual positive samples
```python
recall = recall_score(y_true=y_test, y_pred=y_pred)
print('Recall Score:', recall)
```

**F1 Score**: Harmonic mean of precision and recall
```python
f1 = f1_score(y_true=y_test, y_pred=y_pred)
print('F1 Score:', f1)
```

**AUC Score**: Area under the ROC curve
```python
y_pred_proba = model.predict_proba(X_test)[:,1]
auc = roc_auc_score(y_true=y_test, y_score=y_pred_proba)
print('AUC Score:', auc)
```
x??

#### decision-tree-visualization
Decision tree visualization helps understand model decisions by showing splits, sample counts, and class distributions at each node.

:p Suppose we have trained a decision tree classifier on some data, and we want to visualize the tree. How can we create a visualization of the decision tree? With out_file is None, selected_features, classnames as [died, survived], make it rounded and filled and allow special characters.
??x
```python
from sklearn.tree import export_graphviz
import graphviz

dot_data = export_graphviz(
    model,
    out_file=None,
    feature_names=selected_features,
    class_names=['died', 'survived'],
    filled=True,
    rounded=True,
    special_characters=True
)

graph = graphviz.Source(dot_data)
graph
```
x??

#### decision-tree-classifier-depth
Limiting tree depth prevents overfitting and creates more interpretable models. The `max_depth` parameter controls this constraint.

:p Suppose we have some data that we want to classify using a decision tree. How can we create a decision tree classifier in Python of depth 2? How to fit it? Suppose you have X and y for the training data.
??x
```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=2)
model.fit(X, y)
```
x??

#### grid-search-decision-tree
Grid search systematically tests different parameter combinations to find the optimal model configuration using cross-validation.

:p What is grid search, and how can we use it to automatically find the best parameters and estimators for a decision tree model in Python?
??x
```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

params = {
    'n_estimators': [5, 100, 1000],
    'criterion': ['gini', 'entropy'],
    'max_features': [2, 4, 'auto']
}

grid_search_cv = GridSearchCV(
    estimator=RandomForestClassifier(), 
    param_grid=params,
    scoring='f1',
)

grid_search_cv.fit(X_train, y_train)
print(grid_search_cv.best_params_)
model = grid_search_cv.best_estimator_
```
x??

## Text Processing

#### value-counts-df
The `value_counts()` method returns a Series with unique values as the index and their counts as values, useful for understanding data distribution.

:p What is the `value_counts()` method in Pandas, and how can we use it to count the number of occurrences of each unique value in a column: topic_category of a DataFrame: df?
??x
```python
df['topic_category'].value_counts()
```
x??

#### tf-idf-vectorization
TF-IDF (Term Frequency-Inverse Document Frequency) converts text into numerical features that reflect word importance within documents and across the corpus.

:p What is TF-IDF vectorization, and how can we use the `TfidfVectorizer` class in Scikit-Learn to vectorize text data?
??x
```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
vectorizer.fit(X_train)

X_train = vectorizer.transform(X_train)
X_test = vectorizer.transform(X_test)

print(X_train.shape, type(X_train))
```
x??

#### multinomial-naive-bayes-classifier
Multinomial Naive Bayes is a probabilistic classifier based on Bayes' theorem, commonly used for text classification due to its effectiveness with discrete features.

:p What is the Multinomial Naive Bayes classifier, and how can we use it in Scikit-Learn to classify text data?
??x
```python
from sklearn.naive_bayes import MultinomialNB

model = MultinomialNB()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```
x??

#### confusion-matrix-plot
Confusion matrices visualize classification performance by showing true vs predicted labels, helping identify which classes are commonly confused.

:p Plot the confusion matrix given `plt` which is `model`, `X_test`, `y_test`, display the labels from `model.classes_`, create xticks with rotation of 90.
??x
```python
from sklearn.metrics import plot_confusion_matrix
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(21, 21))

disp = plot_confusion_matrix(model, X_test, y_test,
                             display_labels=model.classes_,
                             cmap=plt.cm.Blues, ax=ax)
plt.xticks(rotation=90)
disp
```
x??

## AI Theory

#### ai-framework
This framework provides a systematic approach to machine learning projects, ensuring all critical aspects are considered from problem definition through model improvement.

:p Explain the following 6 steps on AI problems:
??x
1. **Problem Definition** - What is the problem we are trying to solve?
2. **Data** - What data do we have to solve the problem?
3. **Evaluation** - How do we know if our model is good?
4. **Features** - What features should we use to solve the problem?
5. **Modelling** - What model should we use to solve the problem?
6. **Experimentation** - How can we improve the model?
x??