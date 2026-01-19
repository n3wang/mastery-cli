# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 24)


**Starting Chapter:** 11.2.5 Coding and Running A Simple Network. 11.3 A Graphical Deep Net

---


#### Loss Function and Weight Adjustment
Background context: In neural networks, the loss function measures how well the network is performing. The goal during training is to minimize this loss by adjusting the weights of the network. The provided example focuses on a single weight adjustment for the first hidden layer node $h1$.
Relevant formulas include:
- $\frac{\partial h1}{\partial w1} = -2df dx( w1x1 + w2x2 + b1) = -0.0904 $-$\frac{\partial \mathcal{L}}{\partial w1} = 0.0214 $ If we decrease$w1$, the loss should get smaller, leading to better predictions.
:p What is the value of $\frac{\partial h1}{\partial w1}$ in this example?
??x
The value of $\frac{\partial h1}{\partial w1}$ is $-0.0904$. This indicates that a small change in $ w1$ will result in a corresponding change in the activation of the first hidden layer node, affecting the loss function.
x??

---


#### Weight Update Using Stochastic Gradient Descent
Background context: To adjust weights in a neural network, we use optimization techniques like stochastic gradient descent. The formula for updating the weight is:
$$w(new)_1 \approx w(old)_1 - \eta \frac{\partial \mathcal{L}}{\partial w1}$$where $\eta$ is the learning rate.
:p What is the formula for updating $w_1$ using stochastic gradient descent?
??x
The formula for updating $w_1$ using stochastic gradient descent is:
$$w(new)_1 \approx w(old)_1 - \eta \frac{\partial \mathcal{L}}{\partial w1}$$

Here,$\eta$(learning rate) determines the step size in adjusting the weights.
x??

---


#### Plotting Loss Over Learning Trials
Background context: After running a simple network, plotting the loss over learning trials helps visualize how the model is improving. The example provided shows that the initial loss was 0.164 and reduced to 0.002 after several iterations.
:p How would you plot the loss versus the number of learning trials $N$?
??x
To plot the loss versus the number of learning trials $N$, you can use a simple plotting library like matplotlib in Python:
```python
import matplotlib.pyplot as plt

# Assuming 'loss_values' is a list containing the loss values at each trial
plt.plot(range(len(loss_values)), loss_values)
plt.xlabel('Number of Learning Trials')
plt.ylabel('Loss Value')
plt.title('Loss vs. Number of Learning Trials')
plt.show()
```
This code snippet plots the number of learning trials on the x-axis and the corresponding loss value on the y-axis.
x??

---


#### Calculating Mass Excess for Hydrogen Isotopes
Background context: In nuclear physics, the mass excess of an element gives the difference between its actual atomic mass and the sum of its constituent masses. This can be calculated using TensorFlow to handle tensor operations.

:p How do you calculate the mass excess $M - A \cdot u$ for hydrogen isotopes in TensorFlow?
??x
To calculate the mass excess $M - A \cdot u$ for hydrogen isotopes, follow these steps:
```python
import tensorflow as tf

# Define constants
mP = tf.constant(938.2592)  # Proton mass
mN = tf.constant(939.5527)  # Neutron mass
mH = 1.00784 * 931.494028   # Mass of hydrogen in MeV/c²

# Define atomic numbers and masses for hydrogen isotopes
A = tf.constant([1, 2., 3., 4., 5., 6., 7.])
am = tf.constant([1.007825032, 2.01401778, 3.016049278, 4.026, 5.035, 6.045, 7.05])

# Calculate the mass excess
B = tf.zeros(7)
for i in range(7):
    C = mH + (i) * mN - am[i] * 931.494028
    B[i] = C / A[i]

print("Binding energy per nucleon:", B.numpy())
```

Explanation:
- The binding energy $B $ is calculated as$\frac{m_{H} + i \cdot m_N - m_A \cdot 931.494028}{A}$.
- $m_H $ and$mN$ are the masses of hydrogen and a neutron in MeV/c².
- The binding energy per nucleon is calculated for each isotope, from deuterium to helium-7.

The output will be an array of binding energies per nucleon for each hydrogen isotope.
x??

---


#### Sparse Matrices and TensorFlow
Background context: In machine learning, especially when dealing with large datasets, sparse matrices are often used to save memory. A sparse matrix is a matrix where most of the elements are zero. In such cases, using standard dense matrices can be inefficient due to excessive storage requirements.

SciPy provides efficient data structures for handling sparse matrices in Python. One common format used is CSR (Compressed Sparse Row), which stores the non-zero elements and their indices efficiently.

NumPy array example: 
```python
import numpy as np

arr = np.array([[1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]])
```

SciPy CSR matrix example:
```python
from scipy.sparse import csr_matrix

csr_arr = csr_matrix(arr)
```
:p What is the difference between a NumPy array and a SciPy sparse matrix in this context?
??x
The difference lies in memory efficiency. The NumPy array stores all elements, including zeros, which can be wasteful for large datasets with many zeros. In contrast, the CSR matrix only stores non-zero values and their positions, significantly reducing memory usage.

Code example:
```python
import numpy as np
from scipy.sparse import csr_matrix

# Create a dense 4x4 array with ones in all elements
dense_arr = np.ones((4, 4))

# Convert to CSR format
sparse_csr = csr_matrix(dense_arr)

print("Dense Array:")
print(dense_arr)
print("\nSparse CSR Matrix:")
print(sparse_csr.toarray())
```
x??

---


#### Linear Fit to Hubble’s Data using TensorFlow
Background context: In 1924, Edwin Hubble fit a straight line through his data on the recessional velocities of nebulae versus their distances from Earth. Using modern tools like TensorFlow, we can repeat this fitting process and see how well it aligns with historical methods.

:p How does the program `Hubble.py` use TensorFlow to fit Hubble’s data?
??x
The program uses TensorFlow's minimization function to find the best-fit line for Hubble’s data. It iteratively predicts values, computes loss, and updates parameters until convergence.

Code example:
```python
import tensorflow as tf

# Define variables
m = tf.Variable(1.5)
b = tf.Variable(2.2)

# Assign training data (x_train, y_train)
r = [0.25, 0.5, 0.75, 1.0]
y_true = m * r + b

# Predict values
y_pred = m * x + b

# Compute mean square error
loss = tf.reduce_mean(tf.square(y_pred - y_true))

# Minimize the loss to find optimal parameters (m and b)
optimizer = tf.keras.optimizers.Adam(learning_rate=0.1)

for step in range(300):
    optimizer.minimize(lambda: loss, var_list=[m, b])

print("Optimized m:", m.numpy())
print("Optimized b:", b.numpy())
```
x??

---

