
#### CNN — Arquitectura General

Las **Redes Neuronales Convolucionales (CNN)** son un tipo de arquitectura de _deep learning_ que aprenden directamente a partir de los datos, especialmente útiles para imágenes, audio o series temporales. Una CNN transforma progresivamente una imagen en una representación numérica más compacta que conserva la información relevante para clasificar o detectar patrones.

Estructuralmente, las CNN están compuestas por **capas convolucionales, de pooling, y totalmente conectadas (fully-connected)**.

---

#### Capa Convolucional

La **convolución** aplica un _kernel_ (filtro) sobre la imagen para extraer características como bordes, texturas o esquinas.  
Fórmula del tamaño de salida:  
$$  
O = (i - k) + 1  
$$
donde:

- ( i ): tamaño de la entrada
- ( k ): tamaño del kernel
:p ¿Qué operación realiza una capa convolucional en una CNN?  
??x  
Aplica un filtro (kernel) sobre la imagen para obtener un **mapa de características**, detectando patrones locales como bordes o texturas.  
x??

---

#### Stride (Desplazamiento)

El **stride** define cuánto se mueve el filtro al recorrer la imagen.  
Fórmula del tamaño de salida:  
$$  
O = \frac{i - k}{s} + 1  
$$  
donde ( s ) es el stride.
:p ¿Qué ocurre si aumentamos el valor del stride en una CNN?  
??x  
El filtro salta más píxeles por paso, reduciendo el tamaño del mapa resultante y, por tanto, **disminuyendo la resolución espacial**.  
x??

---

#### Padding (Relleno)

El **padding** agrega píxeles (generalmente ceros) alrededor de la imagen para conservar su tamaño después de la convolución.  
Fórmula del tamaño de salida:  
$$  
O = \frac{i - k + 2p}{s} + 1  
$$  
donde ( p ) es la cantidad de píxeles de relleno.

:p ¿Por qué se utiliza padding en CNNs?  
??x  
Para **preservar el tamaño original** de la imagen y evitar la pérdida de información en los bordes durante la convolución.  
x??

---

#### Pooling (Submuestreo)

El **pooling** reduce el tamaño del mapa de características conservando la información más relevante.
- **Max pooling:** toma el valor máximo en cada ventana.
- **Average pooling:** toma el promedio.
:p ¿Qué función cumple el pooling en una CNN?  
??x  
Reduce la dimensionalidad del mapa de características, manteniendo la información más significativa y mejorando la **invarianza espacial**.  
x??

---

#### Flatten

Convierte los mapas 2D en un vector 1D para alimentar las capas totalmente conectadas.

:p ¿Por qué es necesario el paso de flatten en una CNN?  
??x  
Porque las **capas densas** requieren entradas vectoriales; flatten transforma la salida 2D en una estructura lineal.  
x??

---

#### Fully Connected Layer (FC)

Estas capas realizan la **clasificación final**. Cada neurona está conectada con todas las neuronas de la capa anterior.

:p ¿Cuál es la función de la capa fully connected?  
??x  
Combina las características extraídas por las capas anteriores para **clasificar** la entrada en una de las categorías de salida.  
x??

---

#### Dropout

Durante el entrenamiento, el dropout **apaga aleatoriamente algunas neuronas** para evitar sobreajuste.

:p ¿Qué ventaja aporta la capa Dropout en CNNs?  
??x  
Previene el **sobreajuste**, obligando a la red a no depender de neuronas específicas y mejorar la generalización.  
x??

---

#### Funciones de Activación

Deciden si una neurona se activa o no, introduciendo no linealidad:

- **ReLU:** ( f(x)=\max(0,x) ) → evita activar todas las neuronas.
- **Sigmoid:** para clasificación binaria.
- **tanh:** similar a Sigmoid pero centrada en cero.
- **Softmax:** convierte la salida final en probabilidades.

:p ¿Qué función de activación se usa normalmente en las capas intermedias de una CNN?  
??x  
La **ReLU**, porque acelera el entrenamiento y reduce el problema del gradiente desvanecido.  
x??

---

#### Ejemplo de flujo CNN (pseudocódigo)

```python
# CNN básica en pseudocódigo
input = imagen(64, 64, 3)

conv1 = Conv2D(filters=32, kernel=3, stride=1, padding=1)(input)
relu1 = ReLU()(conv1)

pool1 = MaxPool2D(kernel=2, stride=2)(relu1)

flat = Flatten()(pool1)
dense = Dense(units=128)(flat)
output = Softmax(num_classes=10)(dense)
```

:p Explica paso a paso qué hace este pseudocódigo  
??x
1. **Conv2D:** extrae 32 características locales con un filtro 3×3.
2. **ReLU:** introduce no linealidad.
3. **MaxPool:** reduce la dimensión a la mitad.
4. **Flatten:** transforma el mapa 2D en vector 1D.
5. **Dense:** combina las características en 128 neuronas.
6. **Softmax:** genera probabilidades para 10 clases.  
x??

#### Convolution as Matrix Multiplication

La convolución en una CNN puede representarse como una **multiplicación matricial**, donde el kernel se aplica sobre subregiones de la imagen (ventanas).  
El proceso se puede visualizar como:  
$$  
Y = K * I  
$$  
donde ( I ) es la matriz de la imagen, ( K ) es el kernel y ( Y ) es la salida.

:p ¿Cómo se relaciona la operación de convolución con las matrices?  
??x  
La convolución puede verse como una **multiplicación entre una matriz de pesos (kernel)** y **submatrices de la imagen**, sumando los productos elemento a elemento.  
x??

---

#### Ejemplo de Convolución en Forma Matricial

Si ( I ) es una imagen ( 3 \times 3 ) y el kernel ( K ) es ( 2 \times 2 ):  
$$  
I =  
\begin{bmatrix}  
1 & 2 & 3\  
4 & 5 & 6\  
7 & 8 & 9  
\end{bmatrix},  
\quad  
K =  
\begin{bmatrix}  
1 & 0\  
0 & -1  
\end{bmatrix}  
$$
La convolución toma submatrices de ( I ), multiplica por ( K ), y suma los resultados.
:p ¿Cuál es el resultado de aplicar este kernel a la esquina superior izquierda de ( I )?  
??x  
$$  
1(1) + 2(0) + 4(0) + 5(-1) = 1 - 5 = -4  
$$  
x??

---

#### Kernel como Matriz de Pesos

El kernel ( K ) actúa como una **matriz de pesos compartidos**. Cada valor del kernel se multiplica con los valores de la imagen en la misma posición, y se suman para formar un único valor de salida.

:p ¿Por qué se dice que el kernel usa “pesos compartidos”?  
??x  
Porque la **misma matriz ( K )** se aplica en todas las posiciones de la imagen, reduciendo el número total de parámetros y aprovechando **invariancia espacial**.  
x??

---

#### Representación Lineal de la Convolución

Podemos "aplanar" las submatrices de la imagen en vectores, de modo que la convolución completa se convierta en:  
$$  
Y = W \cdot x  
$$  
donde ( W ) es una matriz construida a partir del kernel, y ( x ) es el vector que representa la imagen.
:p ¿Qué ventaja tiene representar la convolución como multiplicación matricial?  
??x  
Permite implementar la convolución mediante **operaciones de álgebra lineal optimizadas**, aprovechando librerías de GPU y estructuras vectorizadas.  
x??

---

#### Pooling y Matrices

El pooling también puede representarse como una operación matricial: cada bloque de la imagen se transforma en un solo valor (máximo o promedio).
:p ¿Cómo se puede expresar el max pooling en términos matriciales?  
??x  
Cada bloque de la matriz de entrada se reduce a un solo número, que corresponde al **máximo elemento** de ese bloque, representando una **función de reducción** sobre submatrices.  
x??

---

#### Ejemplo de Flatten en Forma Matricial

El proceso de flatten convierte una matriz ( m \times n ) en un vector columna:  
$$  
\begin{bmatrix}  
a & b\  
c & d  
\end{bmatrix}  
\Rightarrow  
\begin{bmatrix}  
a\  
b\  
c\  
d  
\end{bmatrix}  
$$
:p ¿Qué propósito tiene convertir una matriz en vector antes de la capa densa?  
??x  
Porque las capas totalmente conectadas operan con **vectores** y multiplicaciones del tipo ( W \cdot x + b ).  
x??

---

#### Multiplicación Matricial en la Capa Fully Connected

En la capa densa, el vector de entrada se multiplica por una matriz de pesos:  
$$  
y = W \cdot x + b  
$$  
donde

- ( x ): vector de entrada (salida de flatten)
- ( W ): matriz de peso
- ( b ): vector de sesgo
- ( y ): salida
:p ¿Cómo se relaciona la capa fully connected con el álgebra matricial?  
??x  
Es una **multiplicación matriz-vector**, donde cada neurona corresponde a una fila de ( W ) y produce una combinación lineal de las entradas.  
x??

---

#### Pseudocódigo del Flujo Matricial

```python
# Convolución y multiplicación matricial
I = [[1,2,3],
     [4,5,6],
     [7,8,9]]

K = [[1,0],
     [0,-1]]

# Ejemplo simple
out11 = 1*1 + 2*0 + 4*0 + 5*(-1)  # -4
```

:p ¿Qué hace este pseudocódigo en términos matriciales?  
??x  
Realiza una **multiplicación elemento a elemento** entre una submatriz de la imagen y el kernel, y **suma los productos** para obtener el primer valor de salida del mapa de características.  
x??