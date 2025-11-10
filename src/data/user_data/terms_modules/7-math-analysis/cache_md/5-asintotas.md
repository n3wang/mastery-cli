
#### Asíntotas – Definición general
Una **asíntota** es una recta cuya distancia a la función $f(x)$ tiende a cero cuando $x$ tiende a cierto valor o al infinito. Pueden ser **verticales**, **horizontales** u **oblicuas**, dependiendo de la dirección en la que se aproxima la función. Sirven para describir el comportamiento extremo o límite de una función.
:p ¿Qué es una asíntota y para qué se usa en el estudio de funciones?
??x
Una asíntota es una recta a la que la gráfica de una función se aproxima cada vez más sin llegar a tocarla. Se usa para analizar el comportamiento de las funciones cuando $x$ tiende a un punto o al infinito.
x??

---

#### Asíntota vertical
La recta $x = a$ es una **asíntota vertical** de $f(x)$ si se cumple que:
$$
\lim_{x \to a^+} f(x) = \infty \quad \text{o} \quad \lim_{x \to a^-} f(x) = \infty
$$
Generalmente ocurre en puntos donde la función **no está definida** (división por cero, dominio partido, etc.).
![[Pasted image 20251106195029.png]]
:p ¿Cuándo una función tiene una asíntota vertical?
??x
Cuando al acercarse $x$ a cierto valor $a$, la función $f(x)$ crece o decrece sin límite, es decir,
$\lim_{x \to a} f(x) = \pm\infty$.
En ese caso, la recta $x = a$ es la asíntota vertical.
x??

---

#### Ejemplo de asíntota vertical

Para la función:
$$
f(x) = \frac{1}{x - 2}
$$
el dominio excluye $x=2$ y los límites laterales tienden a $\pm\infty$.
Por lo tanto, **$x=2$ es una asíntota vertical**.

:p ¿Por qué $x=2$ es una asíntota vertical en $f(x)=\frac{1}{x-2}$?
??x
Porque cuando $x$ se acerca a 2, el denominador tiende a cero y la función tiende a $\pm\infty$.
Por eso, la recta $x=2$ es una asíntota vertical.
x??

---

#### Asíntota horizontal

La recta $y=b$ es una **asíntota horizontal** de $f(x)$ si:
$$
\lim_{x \to +\infty} f(x) = b \quad \text{o} \quad \lim_{x \to -\infty} f(x) = b
$$
Indica el valor al que se aproxima la función cuando $x$ crece o decrece indefinidamente.

:p ¿Qué representa una asíntota horizontal y cómo se determina?
??x
Representa el valor constante $y=b$ al que se aproxima $f(x)$ cuando $x$ tiende a infinito o menos infinito.
Se calcula como $b = \lim_{x \to \pm\infty} f(x)$.
x??

---

#### Asíntota oblicua

La recta $y = ax + b$ es una **asíntota oblicua** si:
$$
\lim_{x \to \infty} [f(x) - (ax + b)] = 0
$$
Se da cuando la función crece sin límite, pero su forma se aproxima a una recta inclinada.
Se obtienen:
$$
a = \lim_{x \to \infty} \frac{f(x)}{x}, \qquad b = \lim_{x \to \infty} [f(x) - ax]
$$

:p ¿Cuándo una función tiene asíntota oblicua?
??x
Cuando el grado del numerador es **uno mayor** que el del denominador (en funciones racionales) y los límites permiten hallar una recta $y=ax+b$ tal que $f(x)-(ax+b)\to 0$.
x??

---

#### Relación entre tipos de asíntotas

* Si $a = 0$ en la ecuación $y = ax + b$, la asíntota oblicua se vuelve **horizontal**.
* Una función puede tener:

  * Varias asíntotas verticales,
  * A lo sumo dos horizontales u oblicuas.
* Si $f(x)$ corta una asíntota en infinitos puntos, sigue siendo asíntota si la distancia tiende a cero.

:p ¿Qué relación existe entre la asíntota horizontal y la oblicua?
??x
La asíntota horizontal es un caso particular de la oblicua con pendiente $a=0$.
Es decir, cuando la recta límite no tiene inclinación, $y=b$ es la asíntota horizontal.
x??

---

---

#### Asíntota vertical – Límite infinito
Si
$$\lim_{x \to a} f(x) = +\infty,$$
entonces la función **crece sin límite** al acercarse $x$ a $a$, lo que implica que la recta $x=a$ es una **asíntota vertical**.

:p Si $\lim_{x \to a} f(x) = +\infty$, ¿qué tipo de asíntota tiene la función?
??x
**Respuesta correcta:** 
La recta **$x = a$ es una asíntota vertical**, porque la función tiende a infinito cuando $x$ se aproxima a ese valor.
x??


---

#### Límite con asíntota oblicua

De la gráfica se observa que la función tiene una **asíntota oblicua** $y = x - 3$.
Por definición, si $y = ax + b$ es asíntota oblicua, entonces:
![[Pasted image 20251106200056.png]]
$$
\lim_{x \to \infty} [f(x) - (ax + b)] = 0
$$

En este caso $a = 1$ y $b = -3$, por lo tanto:
$$
\lim_{x \to \infty} [f(x) - x] = -3
$$
:p Según la gráfica, ¿cuál es el valor del límite $\lim_{x \to \infty} (f(x) - x)$?
??x
**Respuesta correcta:** 
El límite es **–3**, porque la asíntota oblicua es $y = x - 3$, y el término independiente $b$ representa ese valor.
x??


---

#### Cálculo de la asíntota oblicua

Dada la función:

$$
f(x) = \frac{x^3 + x^2 - 1}{x^2 + ax - 1}
$$

Sabemos que tiene una **asíntota oblicua** $y = x - 2$, por lo tanto:

* Pendiente $a_1 = 1$
* Ordenada al origen $b = -2$

Para funciones racionales con grado del numerador **una unidad mayor** que el del denominador, la pendiente se obtiene con **división polinómica**:
$$\frac{x^3 + x^2 - 1}{x^2 + ax - 1}$$

 Primer término: $\frac{x^3}{x^2} = x$
Multiplicamos: $x(x^2 + ax - 1) = x^3 + a x^2 - x$
Restamos:
$$(x^3 + x^2 - 1) - (x^3 + a x^2 - x) = (1 - a)x^2 + x - 1$$

2️⃣ Segundo término: $\frac{(1 - a)x^2}{x^2} = 1 - a$
Multiplicamos: $(1 - a)(x^2 + ax - 1) = (1 - a)x^2 + a(1 - a)x - (1 - a)$
Restamos:
$$[(1 - a)x^2 + x - 1] - [(1 - a)x^2 + a(1 - a)x - (1 - a)]$$

$$= [x - a(1 - a)x] + [-1 + (1 - a)] = [x(1 - a + a^2)] - a$$
Para que $y = x - 2$ sea asíntota, el cociente debe ser **$x - 2$**.
Por tanto:
* Pendiente: $1 = 1$ (ya coincide)
* Término constante: $1 - a = -2$
De allí:
$$
1 - a = -2 \Rightarrow a = 3
$$

:p Si la función $\frac{x^3 + x^2 - 1}{x^2 + ax - 1}$ tiene como asíntota oblicua $y = x - 2$, ¿cuál es el valor de $a$?
??x
$a = 3$
Porque al hacer la división polinómica, el término constante del cociente queda $1 - a$, y debe ser igual a $-2$, de donde $a = 3$.
x??




---

#### Límite lateral con asíntota vertical
En la gráfica se observa una **asíntota vertical en $x = 1$**.
![[Pasted image 20251106200511.png]]
Cuando $x \to 1^+$ (desde la derecha), la función **desciende bruscamente** hacia valores cada vez más negativos.
Por lo tanto:
$$
\lim_{x \to 1^+} f(x) = -\infty
$$

:p Según la gráfica, ¿cuál es el valor del límite $\lim_{x \to 1^+} f(x)$?
??x
$\displaystyle \lim_{x \to 1^+} f(x) = -\infty$,
porque al acercarse a $x=1$ desde la derecha, la función tiende a menos infinito por la asíntota vertical.
x??

