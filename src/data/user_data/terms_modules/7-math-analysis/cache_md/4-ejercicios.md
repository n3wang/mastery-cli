#### Límite exponencial con exponente decreciente

**Descripción:**
Cuando el exponente decrece más rápido que la base tiende a $1$, la expresión se acerca a $1$. En este caso,
$$\lim_{x\to\infty}\left(1+\frac{2}{x^2}\right)^{2x}$$
tiene exponente $2x$ y término $\frac{2}{x^2}$, cuyo producto $\frac{4}{x}\to0$.
:p ¿Cuál es el valor del límite $\lim_{x\to\infty}\left(1+\frac{2}{x^2}\right)^{2x}$?
??x
El producto $2x\cdot\frac{2}{x^2}=\frac{4}{x}\to0$, por lo tanto la expresión tiende a $1^0=1$.
**Resultado:** $1$.
x??

---

#### Factorización en el argumento del seno

**Descripción:**
En el límite $$\lim_{x\to3}\frac{\sin(x^2-9)+1}{x^3-x^2-9x+9},$$ el argumento $x^2-9$ puede escribirse como $(x+3)(x-3)$ (diferencia de cuadrados). Esto permite emparejar el argumento del seno con el factor $(x-3)$ del denominador para aplicar el límite notable $\frac{\sin t}{t}\to1$.
:p ¿Cómo se factoriza el argumento del seno $x^2-9$ para aplicar el límite notable?
??x
Usando la diferencia de cuadrados: $$x^2-9=(x+3)(x-3),$$ lo que permite igualar el argumento del seno con el factor $(x-3)$.
x??

---

#### Límite con seno y cuadrado del denominador

**Descripción:**
En $$\lim_{x\to-1}\frac{\sin(x^2-1)}{(x+1)^2},$$ el argumento del seno se aproxima a $0$ y puede escribirse como $(x-1)(x+1)$. Alrededor de $x=-1$, $x^2-1\approx2(x+1)$. Así, el seno se comporta como $\sin(2(x+1))\approx2(x+1)$, y el cociente crece sin límite.
:p Determina el valor del límite $\lim_{x\to-1}\frac{\sin(x^2-1)}{(x+1)^2}$.
??x
Sustituyendo $x^2-1\approx2(x+1)$, se tiene
$$\frac{\sin(2(x+1))}{(x+1)^2}\approx\frac{2(x+1)}{(x+1)^2}=\frac{2}{x+1}\to\infty.$$
**Resultado:** $\infty$.
x??

---

#### Límite con constante no nula en el numerador

**Descripción:**
En $$\lim_{x\to0}\frac{\sin(x)+3}{2x},$$ al tender $x\to0$, $\sin(x)\to0$ y el numerador $\to3$. Como el denominador tiende a $0$, el cociente crece sin límite.
:p ¿Cuál es el resultado de $\lim_{x\to0}\frac{\sin(x)+3}{2x}$?
??x
El numerador $\to3$, el denominador $\to0$, por lo tanto el cociente diverge a $\infty$.
**Resultado:** $\infty$.
x??


---

#### Límite trigonométrico con cuadrado en el denominador

**Descripción:**
El límite $$\lim_{x\to-1}\frac{\sin(x^2-1)}{(x+1)^2}$$ presenta una indeterminación $\frac{0}{0}$ ya que $x^2-1=(x-1)(x+1)$.
Cerca de $x=-1$, $x^2-1\approx2(x+1)$, entonces
$$\frac{\sin(x^2-1)}{(x+1)^2}\approx\frac{\sin(2(x+1))}{(x+1)^2}=\frac{\sin(2(x+1))}{2(x+1)}\cdot\frac{2}{x+1}.$$
El primer factor $\to1$, el segundo $\to\infty$.
:p ¿Cuál es el valor del límite $\lim_{x\to-1}\frac{\sin(x^2-1)}{(x+1)^2}$?
??x
El primer factor tiende a $1$, mientras que $\frac{2}{x+1}\to\infty$, por lo tanto el límite diverge.
**Resultado:** $\infty.$
x??

---

#### Límite con numerador constante y denominador tendiendo a cero

**Descripción:**
En $$\lim_{x\to0}\frac{\sin(x)+3}{2x},$$ al acercarse $x$ a $0$, $\sin(x)\to0$, el numerador $\to3$, y el denominador $\to0$.
Dividir un número positivo por una cantidad muy pequeña positiva da un valor grande positivo.
:p ¿Cuál es el resultado del límite $\lim_{x\to0}\frac{\sin(x)+3}{2x}$?
??x
Como el numerador $\to3$ y el denominador $\to0$, el cociente crece sin límite.
**Resultado:** $\infty.$
x??
