# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 23)


**Starting Chapter:** 10.7 Code Listings

---


#### Calculating the Covariance Matrix
Background context: The covariance matrix is a key step in PCA. It measures how much each variable changes with respect to another.

:p How do we calculate the covariance matrix for the dataset?
??x
The covariance matrix $C$ can be calculated using the formula:

$$C = \frac{1}{N-1} \sum_{i=1}^{N} (x_i - \bar{x})(y_i - \bar{y})$$where $ N $ is the number of data points, and $\bar{x}$,$\bar{y}$ are the means of $ x $ and $y$.

```python
# Calculate covariance matrix using NumPy's cov function
cov_matrix = np.cov(adjusted_data, rowvar=False)
```
x??

---


#### Computing Unit Eigenvectors and Eigenvalues
Background context: After calculating the covariance matrix, we compute its eigenvalues and eigenvectors. These are used to identify the principal components in the data.

:p How do we calculate the unit eigenvector and eigenvalues of the covariance matrix?
??x
We can use NumPy's `linalg.eig` function to compute the eigenvalues and eigenvectors of the covariance matrix $C$. The eigenvectors are normalized to have a unit length.

```python
import numpy as np

# Assuming 'cov_matrix' is our covariance matrix
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

# Normalize the eigenvectors to make them unit vectors
unit_eigenvectors = eigenvectors / np.linalg.norm(eigenvectors, axis=0)
```
x??

---


#### Understanding Principal Components
Background context: The eigenvector with the largest eigenvalue is considered the first principal component. It points in the direction of maximum variance in the data.

:p What do we mean by "principal components"?
??x
Principal components are linear combinations of the original variables that capture the most significant patterns and variability in the dataset. The first principal component, corresponding to the largest eigenvalue, is the direction of greatest variation in the data. Subsequent components are orthogonal to each other and to previous components.

In this example, $PC1 $(the eigenvector with the largest eigenvalue) points in the direction of major variance, while $ PC2$ is orthogonal to it and represents a smaller component.

```python
# Extract principal components
PC1 = unit_eigenvectors[:, 0]
PC2 = unit_eigenvectors[:, 1]

print("First Principal Component (PC1):", PC1)
print("Second Principal Component (PC2):", PC2)
```
x??

---

---


#### Training a Simple Network

**Background context:** The network is trained by providing it with predetermined training data for which the correct output is known. The goal is to minimize the loss or cost function (mean squared error, MSE) between predicted and actual outputs.

The process involves:

1. Computing the mean squared error.
2. Calculating the gradient of the loss function.
3. Adjusting the weights based on these gradients.
4. Repeating until a reasonable small loss is obtained.

:p What is the flowchart for training an AI network?
??x
The flowchart for training an AI network includes the following steps:

1. **Initialize Values**: Set initial values for parameters (weights, biases).
2. **Repeat Unit**:
   - Minimize MSE: Compute the mean squared error between predicted and correct outputs.
   - Compute Gradient: Calculate the gradient of the loss function with respect to the weights.
   - Adjust Parameters: Update the weights by tweaking them based on the computed gradients.
3. **Done**: Repeat until a reasonably small cost is obtained.

Real-world networks have complex architectures, but this iterative process ensures that the network learns from data over multiple epochs or iterations.

x??

---

---


#### Loss Function and Optimization for Neural Networks
Background context explaining how loss functions are used to optimize neural networks, including the concept of minimizing the loss function. The provided formulas (11.7) illustrate that an extremum in the loss occurs when partial derivatives with respect to weights and biases are zero.
If applicable, add code examples with explanations.

:p What is the significance of the equation $\frac{\partial \mathcal{L}}{\partial w_i} = 0 $ for$i=1,...,6 $, and$\frac{\partial \mathcal{L}}{\partial b_i} = 0 $ for$i=1,2,3$ in the context of optimizing a neural network?
??x
This equation signifies that at an extremum (minimum or maximum) point in the loss function, the partial derivatives with respect to each weight and bias are zero. In other words, if we can find these points, they might be potential solutions where the error is minimized.

To understand this better, consider a simple neural network with two neurons as illustrated in Figure 11.3. Here, there are six weights (w1 through w6) and three biases (b1, b2, b3). The goal is to adjust these parameters so that the loss function $\mathcal{L}$ is minimized.

For a complex network with thousands of parameters, we use numerical methods to approximate the derivatives. Weights and biases are adjusted iteratively until the loss function reaches its minimum.
x??

---


#### Partial Derivatives in Loss Function
Background context explaining how partial derivatives are computed for weights and biases in the loss function. The provided formulas (11.8) through (11.13) illustrate the process of using the chain rule to compute these derivatives.

:p How do you compute $\frac{\partial \mathcal{L}}{\partial w_1}$ for a two-neuron network?
??x
To compute $\frac{\partial \mathcal{L}}{\partial w_1}$, we use the chain rule. Specifically, this involves computing the derivative of the loss with respect to the output $ y^{(p)}$, then with respect to hidden neuron $ h_1$, and finally with respect to weight $ w_1$.

From the given formulas:
$$\frac{\partial \mathcal{L}}{\partial w_1} = \frac{\partial \mathcal{L}}{\partial y^{(p)}_{out}} \cdot \frac{\partial y^{(p)}_{out}}{\partial h_1} \cdot \frac{\partial h_1}{\partial w_1}$$

Here,$y^{(p)}_{out}$ is the predicted output from the network. The sigmoid function $f(x)$ and its derivative are used in this computation:
$$f(x) = \frac{1}{1 + e^{-x}} \implies \frac{df(x)}{dx} = \frac{e^{-x}}{(1 + e^{-x})^2}$$

Given the output $y^{(p)}_{out}$:
$$y^{(p)}_{out} = f(w_5h_1 + w_6h_2 + b_3)$$

The derivatives are:
$$\frac{\partial y^{(p)}_{out}}{\partial h_1} = w_5 \cdot \frac{df(x)}{dx}(x = w_5h_1 + w_6h_2 + b_3)$$

Finally, for $w_1$:
$$\frac{\partial h_1}{\partial w_1} = x_1 \cdot \frac{df(x)}{dx}(x = w_1x_1 + w_2x_2 + b_1)$$

Combining these:
$$\frac{\partial \mathcal{L}}{\partial w_1} = -2 \left(\frac{y^{(c)}_{out} - y^{(p)}_{out}}{N}\right) \cdot w_5 \cdot \frac{df(x)}{dx}(x = w_5h_1 + w_6h_2 + b_3) \cdot x_1 \cdot \frac{df(x)}{dx}(x = w_1x_1 + w_2x_2 + b_1)$$
x??

---

