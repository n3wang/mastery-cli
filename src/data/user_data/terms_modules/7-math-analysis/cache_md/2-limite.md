
#### Límites y su evolución histórica

El concepto de **límite** es la base del cálculo diferencial e integral. Permite analizar el comportamiento de una función cuando la variable independiente se acerca a cierto valor, aunque no lo alcance. Newton y Leibniz, en el siglo XVII, desarrollaron este marco que revolucionó las matemáticas.

:p Explica qué significa que una función f(x) tenga límite L cuando $x→x0x \to x_0$.

??x  
Significa que los valores de f(x) se acercan arbitrariamente al número LL cuando xx toma valores cada vez más próximos a x0, aunque x_0 no necesariamente pertenezca al dominio de f(x).  
x??

---

#### Límite finito para variable finita

El límite finito se da cuando la variable independiente se acerca a un valor $x0$ y la función tiende a un valor finito LL.

Ejemplo:  
$$
f(x)=x2−1x−1,x∈R−{1}f(x) = \frac{x^2 - 1}{x - 1}, \quad x \in \mathbb{R} - \{1\}
$$
Factorizando:  
$$
f(x)=(x−1)(x+1)x−1=x+1,x≠1f(x) = \frac{(x-1)(x+1)}{x-1} = x+1, \quad x \neq 1
$$
:p Calcula lim⁡x→$1x2−1x−1\lim_{x \to 1} \frac{x^2 - 1}{x - 1}.$

??x  
Al simplificar queda $f(x)=x+1f(x) = x+1$ para $x≠1x \neq 1.  $
Cuando $x→1x \to 1, f(x)→2f(x) \to 2.$  
Por lo tanto:  
lim⁡x→$1x2−1x−1=2\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2.$
x??

---

#### Límites infinitos y límites laterales

Cuando una función crece sin acotación a medida que $x$ se acerca a un valor (como $x \to 0$), decimos que el **límite es infinito**. Esto puede expresarse como:

- Si $x \to 0^+$, entonces $f(x) \to +\infty$
- Si $x \to 0^-$, entonces $f(x) \to -\infty$  
    (dependiendo del comportamiento de la función a izquierda o derecha de cero)

Además, cuando $x$ tiende a infinito o menos infinito, y la función tiende a un número, se habla de **límites con variable infinita**.

:p ¿Qué significa que $\lim_{x \to 0} f(x) = +\infty$? ¿Y que $\lim_{x \to \infty} f(x) = 0$?  
??x
1. Que al acercarse a $x = 0$, los valores de $f(x)$ crecen ilimitadamente.
2. Que cuando $x$ crece mucho (tiende a infinito), los valores de $f(x)$ se acercan a 0.  
x??

---

#### Límites laterales – definición y ejemplo

El **límite lateral derecho** es el valor al que se acerca una función cuando $x$ se aproxima a un número por valores mayores (desde la derecha), se escribe como $\lim_{x \to a^+} f(x)$.  
El **límite lateral izquierdo** se define similarmente pero por la izquierda: $\lim_{x \to a^-} f(x)$.
Ejemplo: Sea la función por partes
$$
f(x)= \begin{cases}x^2+2 & \text { si } x<2 \\ 2 x & \text { si } x \geq 2\end{cases}
$$
:p Calcula los límites laterales de $f(x)$ cuando $x \to 2$  
??x
1. $\lim_{x \to 2^-} f(x) = 2^2 + 2 = 6$
2. $\lim_{x \to 2^+} f(x) = 2 \cdot 2 = 4$  
x??

---

#### Límite inexistente vs límite existente – según los límites laterales

Si al acercarse a un punto desde izquierda ($x \to a^-$) y desde derecha ($x \to a^+$) la función se aproxima a **distintos valores**, **no existe límite** en ese punto.

Pero si **ambos límites laterales coinciden**, entonces **existe el límite** y es ese valor común.

:p ¿Qué ocurre con el límite en $x = 2$ si $\lim_{x \to 2^-} f(x) = 6$ y $\lim_{x \to 2^+} f(x) = 4$?  
??x
1. No existe el límite en $x=2$ porque los límites laterales son distintos  
x??

:p ¿Qué ocurre si $\lim_{x \to 2^-} f(x) = \lim_{x \to 2^+} f(x) = 4$?  
??x
Existe el límite en $x=2$ y es 4  
x??


---

#### Propiedades básicas de límites

Estas reglas permiten operar límites como si fueran números. Sean $f(x), g(x)$ funciones con límite cuando $x \to a$:

1. $\lim_{x \to a} k = k$
2. $\lim_{x \to a} x = a$
3. $\lim_{x \to a} k \cdot f(x) = k \cdot \lim_{x \to a} f(x)$
4. $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$
5. $\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$
:p ¿Cuál es el valor de $\lim_{x \to 3} (2x + 1)$ usando propiedades?  
??x
$\lim_{x \to 3} (2x + 1) = 2 \cdot 3 + 1 = 7$  
x??


---

#### Propiedades avanzadas de los límites
Además de las propiedades básicas, existen otras que nos permiten operar funciones más complejas al calcular límites:
6. División:
$$
lim⁡x→af(x)g(x)=lim⁡x→af(x)lim⁡x→ag(x)si lim⁡x→ag(x)≠0\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)} \quad \text{si } \lim_{x \to a} g(x) \ne 0
$$
7. Potencias: 
$$
lim⁡x→a[f(x)]n=(lim⁡x→af(x))n\lim_{x \to a} [f(x)]^n = \left(\lim_{x \to a} f(x)\right)^n
$$
8. Composición de funciones:
$$
lim⁡x→af(g(x))=f(lim⁡x→ag(x))si lim⁡x→ag(x) existe\lim_{x \to a} f(g(x)) = f\left(\lim_{x \to a} g(x)\right) \quad \text{si } \lim_{x \to a} g(x) \text{ existe}
$$
:p ¿Cuál es el valor de $\lim_{x \to 2} (3x^4 - 5x^2 + 3)$ utilizando propiedades de límites?  
??x

9. Aplicamos propiedades:
- $\lim_{x \to 2} 3x^4 = 3 \cdot 2^4 = 48$
- $\lim_{x \to 2} -5x^2 = -5 \cdot 2^2 = -20$
- $\lim_{x \to 2} 3 = 3$  
    Resultado: $48 - 20 + 3 = 31$  
x??

---

#### Estrategia para resolver límites

Antes de calcular un límite, se debe:

1. **Reemplazar directamente** el valor hacia el cual tiende x.
2. Verificar si se obtiene un **valor definido** o una **indeterminación** (como $\frac{0}{0}$ o $\frac{k}{0}$ ).
3. Si hay indeterminación, **factorizar**, **racionalizar** o **usar propiedades algebraicas** para simplificar.

**Recordá:** Si el límite existe, los límites laterales deben coincidir.

\:p ¿Qué pasos debemos seguir para resolver $\lim\_{x \to a} f(x)$ si al reemplazar obtenemos $\frac{0}{0}$?
??x
1. Identificar la indeterminación.
2. Aplicar factorización o simplificación.
3. Volver a intentar el cálculo del límite.
x??

\:p Si $\lim\_{x \to a^-} f(x) \ne \lim\_{x \to a^+} f(x)$, ¿qué podemos concluir?
??x
1. Que el límite en $x = a$ **no existe**
x??

---

---

#### Aplicación de propiedades de límites – ejemplo completo

Cuando la función es polinómica, podemos **aplicar propiedades algebraicas** directamente sin necesidad de simplificar. En este caso usamos:

* (1) $\lim\_{x \to a} k = k$
* (2) $\lim\_{x \to a} x^n = a^n$
* (3) $\lim\_{x \to a} \[k \cdot f(x)] = k \cdot \lim\_{x \to a} f(x)$
* (4) $\lim\_{x \to a} \[f(x) + g(x)] = \lim f + \lim g$

\:p ¿Cuál es el valor de $\lim\_{x \to 2} (3x^4 - 5x^2 + 3)$ usando propiedades?
??x

1. Se separan los términos y se aplican las propiedades:

* $\lim\_{x \to 2} 3x^4 = 3 \cdot 2^4 = 3 \cdot 16 = 48$
* $\lim\_{x \to 2} 5x^2 = 5 \cdot 2^2 = 5 \cdot 4 = 20$
* $\lim\_{x \to 2} 3 = 3$
  Resultado: $48 - 20 + 3 = \boxed{31}$
  x??

---

---

#### Pasos para resolver límites correctamente

Antes de resolver un límite, se debe seguir esta secuencia lógica para evitar errores:

1. **Reemplazar directamente** el valor de $x$.
2. Si el resultado es **determinado**, calcularlo directamente.
3. Si aparece una **indeterminación** como $\frac{0}{0}$ o $\frac{k}{0}$, analizar:
   * Si el numerador es constante y el denominador tiende a 0, el límite tiende a $\infty$ o $-\infty$.
   * Si es $\frac{0}{0}$, aplicar factorización, simplificación o técnicas de álgebra.
Además:
* **El límite existe** solo si los límites laterales (por derecha e izquierda) son **iguales**.
\:p ¿Qué tipo de resultado da una expresión donde el numerador tiende a un número constante y el denominador tiende a 0?
??x
1. El límite tiende a infinito o menos infinito, según el signo del denominador.
x??

\:p ¿Qué ocurre si al reemplazar obtenemos una forma $\frac{0}{0}$?
??x
1. Es una indeterminación. Hay que factorizar o simplificar para resolver el límite.
x??

---

#### Indeterminaciones y límites notables

Existen **formas indeterminadas** que requieren un análisis especial. Algunas comunes son:

* $\frac{0}{0}$
* $\frac{k}{0}$ con $k \ne 0$ (tiende a $\infty$ o $-\infty$)
* $\infty - \infty$
* $0 \cdot \infty$
* $1^\infty$, $0^0$, $\infty^0$

Cada una requiere un tratamiento distinto: factorización, racionalización, uso de conjugados, logaritmos, etc.

\:p ¿Qué tipo de indeterminación es $\lim\_{x \to 2} \frac{x^2 - 4}{x - 2}$?
??x
1. Es una indeterminación del tipo $\frac{0}{0}$. Se debe factorizar: $\frac{(x-2)(x+2)}{x-2} = x+2 \Rightarrow$ límite: $4$
x??

\:p ¿Qué ocurre con $\lim\_{x \to 1} (\sqrt{4x})^{\ln x}$?
??x
2. Evaluando: $\sqrt{4 \cdot 1} = 2$ y $\ln(1) = 0$ ⇒ $2^0 = 1$
x??

\:p ¿Qué ocurre con $\lim\_{x \to 3} \left(\frac{2}{5}\right)^{\frac{1}{x - 3}}$?
??x
1. El exponente $\to \infty$, y como la base es menor a 1: el resultado tiende a 0
x??

---
Propiedades algebraicas de límites - resumen con ejemplo
Estas propiedades permiten descomponer funciones complejas en partes más simples para evaluar sus límites:

Propiedades clave:
6) Cociente de funciones:

$$
\lim _{x \rightarrow a} \frac{f_1(x)}{f_2(x)}=\frac{\lim _{x \rightarrow a} f_1(x)}{\lim _{x \rightarrow a} f_2(x)} \quad \text { si } \lim _{x \rightarrow a} f_2(x) \neq 0
$$
7. Potencia de función:
$$
\lim _{x \rightarrow a}[f(x)]^n=\left[\lim _{x \rightarrow a} f(x)\right]^n
$$
8. Exponencial de funciones:
$$
\lim _{x \rightarrow a}\left[f_1(x)\right]^{f_2(x)}=\left[\lim _{x \rightarrow a} f_1(x)\right]^{\lim _{x \rightarrow a} f_2(x)}
$$
si al menos uno de los dos límites es distinto de cero.
Ejemplo:
$$
\lim _{x \rightarrow 2}\left(3 x^4-5 x^2+3\right)
$$
Se aplica propiedad (4): suma de funciones
Luego propiedades (3), (1), (2):
:p ¿Cuál es el resultado final de $\lim_{x \to 2}(3x^4 - 5x^2 + 3)$ aplicando las propiedades?  
??x
$\lim_{x \to 2} 3x^4 = 3 \cdot 2^4 = 48$  
$\lim_{x \to 2} 5x^2 = 5 \cdot 2^2 = 20$  
$\lim_{x \to 2} 3 = 3$  
Resultado final: $48 - 20 + 3 = \boxed{31}$  
x??

---

#### Tipos de límites e indeterminaciones

Estos ejercicios presentan **diferentes formas de indeterminación** o comportamiento límite. A continuación, un problema por cada uno.

---

#### a) Límite con numerador constante y denominador → 0

\:p Sea $f(x) = 2$, $g(x) = x$. Calcula $\lim\_{x \to 0^+} \frac{f(x)}{g(x)}$
??x
1. $\frac{2}{x} \to +\infty$
   $\lim\_{x \to 0^+} \frac{2}{x} = +\infty$
x??

---

#### b) Límite cuando $x \to -\infty$, con cociente tipo $k/0$

\:p Sea $f(x) = -1$, $g(x) = \frac{1}{x}$. Calcula $\lim\_{x \to -\infty} \frac{f(x)}{g(x)}$
??x

1. $\frac{-1}{1/x} = -x \to +\infty$
x??

---

#### c) Límite con $f(x) \to k$, $g(x) \to \infty$ (tipo $k/\infty$)

\:p Sea $f(x) = 5$, $g(x) = (x+4)^2$. Calcula $\lim\_{x \to -4} \frac{f(x)}{g(x)}$
??x
1. $\lim\_{x \to -4} \frac{5}{(x+4)^2} = \frac{5}{0^+} = +\infty$
x??

---

#### d) Límite con numerador → constante y denominador → ∞

\:p Sea $f(x) = 3$, $g(x) = x^2$. Calcula $\lim\_{x \to -\infty} \frac{f(x)}{g(x)}$
??x
1. $\lim\_{x \to -\infty} \frac{3}{x^2} = 0$
x??

---

#### e) Indeterminación $\frac{0}{0}$ → factorear

\:p Sea $f(x) = x^2 - 4$, $g(x) = x - 2$. Calcula $\lim\_{x \to 2} \frac{f(x)}{g(x)}$
??x
1. $\frac{x^2 - 4}{x - 2} = \frac{(x - 2)(x + 2)}{x - 2} = x + 2 \Rightarrow \lim = 4$
x??

---

#### f) Indeterminación $\frac{\infty}{\infty}$ → comparar grados

\:p Sea $f(x) = x^2 + 1$, $g(x) = 3x^2 - x$. Calcula $\lim\_{x \to \infty} \frac{f(x)}{g(x)}$
??x
1. Grado igual: $\lim = \frac{1}{3}$
x??

---

#### g) Indeterminación $1^{-\infty}$

\:p Calcula $\lim\_{x \to 0^+} \left(1 + x\right)^{\frac{-1}{x}}$
??x
1. $1^{-\infty}$ → se transforma: $\lim e^{\ln(1+x)(-1/x)} = e^{-1}$
Resultado: $\boxed{1/e}$
x??

---

#### h) Potencia con base $k < 1$ y exponente negativo

\:p Sea $f(x) = \frac{1}{2}$, $x \to -5$. Calcula $\lim\_{x \to -5} f(x)^{|x|}$
??x
1. $\left(\frac{1}{2}\right)^5 = \frac{1}{32}$
x??

---

#### i) Indeterminación $\infty - \infty$

\:p Sea $f(x) = \frac{1}{x}$, $g(x) = \frac{1}{x}$. Calcula $\lim\_{x \to 0^+} f(x) - g(x)$
??x
1. $\frac{1}{x} - \frac{1}{x} = 0$
(No hay indeterminación real en este caso)
x??

---
