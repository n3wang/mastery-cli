# NumPy

#### Why is numpy preferred?
:p Why is numpy preferred? | How are Numpy arrays better than Python's lists?
??x
Suports multi-dimensional arrays. Provides efficien functions for complex computational arrays. Takes the weaknesses of Python such as Dynamically typed.S 
x??

#### What are ndarrays in Numpy?
:p What are ndarrays features in Numpy?
??x
When the size of ndarrays is changed, it results in a new array and the original array is deleted.
The ndarrays are bound to store homogeneous data.
They provide functions to perform advanced mathematical operations in an efficient manner
x??

#### How to reverse a Numpy array
Use flipud() to reverse the order of elements in an array along the first axis

:p How to reverse a Numpy array
??x
np.flipud(arr)
x??

#### Calgulate frequency
Use bincount() to calculate the frequency of a Numpy array
```py
import numpy as np
arr = np.array([1, 2, 1, 3, 5, 0, 0, 0, 2, 3])

[3 2 2 2 0 1]
```

:p How to calculate the frequency of a Numpy array
??x
np.bincount(arr)
x??

#### arr[:, 0]
import numpy as np

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
new_arr = arr[:, 0]
print(new_arr)

:p What will the folllowing print?
??x
[1, 5]
x??

#### Multiply 2 numpy array matrices | Multiply 2 numpy array vectors
A = np.arange(15,24).reshape(3,3)
B = np.arange(20,29).reshape(3,3)
print("A: ",A)
print("B: ",B)

# Multiply A and B
print("Result: ", result)

:p Multiply 2 numpy array matrices | Multiply 2 numpy array vectors
??x
result = A.dot(B)
x??

#### Verctorized add

Function Vectorization technically means that the function is applied to all elements in the array. Typically, certain python functionalities on arrays (such as loops) are slower in nature because python arrays can contain elements of different data types. Since the C program expects a specific datatype, there are chances of compiler optimisation which makes C code run faster. Since NumPy arrays support storing elements of a single datatype, most of the implementations of the functions written in NumPy meant for arithmetic, logical operations etc have optimised C program code under their hood. Additionally, NumPy also helps developers create their own vectorised functions by following the below steps.

def add(arr1, arr2):
    return (arr1 + arr2)

arr1 = np.array([1,2,3])
arr2 = np.array([4,5,6])

#vectorize add method
vectorized_add = np.vectorize(add)

#call vectorized method
result = vectorized_add(arr1, arr2)

print(result)

:p What will the following print?
??x
[5, 7, 9]
x??

#### VStack() in Numpy() || hstack() in Numpy()

```py 
import numpy as np
a = np.array([1,2,3])
b = np.array([4,5,6])

# vstack arrays
c = np.vstack((a,b))
print("After vstack: \n",c)
# hstack arrays
d = np.hstack((a,b))
print("After hstack: \n",d)
```
:p Main difference is that the hstack method combines arrays horizontally whereas the vstack method combines arrays vertically.
What will the following print?
??x
After vstack: 
 [[1 2 3]
[4 5 6]]
After hstack: 
 [1 2 3 4 5 6]
x??

#### Create an 2d matrix with arange
:p Create a 2d matri with arange that is 4 rows and 2 columns
??x
```py
import numpy as np

arr = np.arange(8).reshape(4,2)
x??