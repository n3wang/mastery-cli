
#### Discontinuidad en la gráfica
![[Pasted image 20251106202005.png]]
En la gráfica, se observa:
* En $x=0$, la función tiene un hueco → **discontinuidad evitable**.
* En $x=2$, la función tiende a $\infty$ → **asíntota vertical** y el límite no existe.
* ![[Pasted image 20251106211456.png]]
:p ¿Cuáles afirmaciones son correctas según la gráfica?
??x
ESTAMAL
C) En $x=0$ hay una discontinuidad evitable.
D) El $\lim_{x \to 2} f(x)$ no existe.
x??

---

#### Asíntotas vertical y horizontal

Datos:

* Asíntota vertical: $x = 3$ → $\lim_{x \to 3} f(x) = \pm \infty$
* Asíntota horizontal: $y = 2$ → $\lim_{x \to \infty} f(x) = 2$

:p ¿Qué afirmaciones son correctas si $f(x)$ tiene asíntota vertical en $x=3$ y horizontal en $y=2$?
??x
Las correctas son **B, C y G**:
B) $\lim_{x \to \infty} \frac{f(x)+3}{x}=0$
C) $\lim_{x \to 3} \frac{4x}{3f(x)-2}=0$
G) $\lim_{x \to \infty} 3f(x)=6$
x??

---

#### Tipo de discontinuidad en $f(x) = (x + 3)^{\frac{1}{x - 1}}$

En $x=1$, el exponente tiende a infinito y la base tiende a $4$, por lo que $f(x) \to 4^{\infty} \to \infty$.
Eso indica una **asíntota vertical** y una **discontinuidad esencial** en $x=1$.

:p ¿Qué tipo de discontinuidad presenta $f(x) = (x + 3)^{\frac{1}{x - 1}}$ en $x=1$?
??x
Presenta una **discontinuidad esencial en $x=1$**, ya que el límite tiende a infinito.
x??

---

#### Límite infinito y asíntota

Si $\lim_{x \to a} f(x) = +\infty$, la función crece sin límite al acercarse a $x=a$.
Esto implica una **asíntota vertical** y una **discontinuidad en $x=a$**.

:p ¿Qué ocurre si $\lim_{x \to a} f(x) = +\infty$?
??x
Las correctas son **A y C**:
A) $x=a$ es asíntota vertical.
C) Hay discontinuidad en $x=a$.
x??

---

#### Continuidad en $x=0$

Para que una función sea continua en $x=0$:

1. $x=0$ pertenece al dominio.
2. Existe el $\lim_{x \to 0} f(x)$.
3. $f(0)$ = $\lim_{x \to 0} f(x)$.

:p Si una función es continua en $x=0$, ¿qué debe cumplirse respecto al dominio y al límite?
??x
Debe cumplirse que:
* $x=0$ pertenece al dominio de la función.
* Existe el $\lim_{x \to 0} f(x)$.
x??


#### Continuidad en un punto
Una función $f$ es **continua en $x = 0$** si se cumplen simultáneamente las siguientes condiciones:

1. $x = 0$ pertenece al dominio de la función.
2. Existe el $\lim_{x \to 0} f(x)$.
3. El valor del límite coincide con el valor de la función en ese punto:
   $$\lim_{x \to 0} f(x) = f(0)$$

Por lo tanto, si $f$ es continua en $x = 0$, necesariamente se cumplen (B) y (D).

:p Si una función es continua en $x=0$, ¿qué debe cumplirse respecto al dominio y al límite?
??x
Debe cumplirse que:
* $x=0$ pertenece al dominio de la función.
* Existe el $\lim_{x \to 0} f(x)$.
x??


#### Límite infinito y tipo de asíntota

Cuando $\lim_{x \to a} f(x) = +\infty$, significa que la función crece sin límite al acercarse a $x=a$.
Esto implica que en $x=a$ hay una **asíntota vertical** y, por tanto, la función no es continua allí.

:p Si $\lim_{x \to a} f(x) = +\infty$, ¿qué tipo de asíntota y discontinuidad hay en $x=a$?
??x
A) $x=a$ es una asíntota vertical.
C) La función es discontinua en $x=a$.
x??

---

#### Límites con asíntotas vertical y horizontal

Si una función tiene **asíntota vertical** en $x=3$, entonces $f(x)\to\pm\infty$ cuando $x\to3$, y cualquier expresión con $f(x)$ en el denominador tenderá a $0$ si el numerador permanece acotado.
Si además tiene **asíntota horizontal** $y=2$, entonces $f(x)\to2$ cuando $x\to\infty$, por lo que transformaciones lineales de $f(x)$ tenderán al mismo tipo de límite (ej.: $3f(x)\to6$) y cocientes con $x$ en el denominador tenderán a $0$.
![[Pasted image 20251106211435.png]]
:p Dada una función $f(x)$ con asíntota vertical $x=3$ y horizontal $y=2$, ¿cuáles opciones son correctas?
??x
Parte esta mal
* **B)** $\displaystyle \lim_{x\to+\infty}\frac{f(x)+3}{x}=0$ porque $f(x)\to2$ y $\frac{2+3}{x}\to0$.
* **C)** $\displaystyle \lim_{x\to3}\frac{4x}{3f(x)-2}=0$ ya que $f(x)\to\pm\infty$ y el denominador $\to\pm\infty$.
* **G)** $\displaystyle \lim_{x\to\infty}3f(x)=6$ porque $3\cdot2=6$.

Falsas:

* **A)** $\lim_{x\to3}(2f(x)-6)\neq0$ (diverge).
* **D)** Habla de $x\to2$, no corresponde.
* **E)** En $x=3$ hay discontinuidad **infinita** (no “esencial”).
* **F)** No es continua en $x=3$.
x??


---

#### Tipos de discontinuidad

Cuando una función **no es continua** en un punto, se dice que tiene una **discontinuidad**.
Existen tres tipos principales, según el comportamiento del límite:

---

#### 1. **Discontinuidad evitable**

Ocurre cuando el **límite existe**, pero **no coincide con el valor** de la función o la función no está definida en ese punto.
Puede “arreglarse” redefiniendo el valor.
$$f(x)=\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}$$
En $x=1$ hay un hueco (porque no está definida), pero $\lim_{x\to1}f(x)=2$.
👉 Discontinuidad **evitable**.

---

#### 2. **Discontinuidad infinita**

Se produce cuando el límite tiende a **$+\infty$ o $-\infty$**.
En estos casos, aparece una **asíntota vertical**.
$$f(x)=\frac{1}{x-2}$$
Cuando $x\to2$, $f(x)\to\infty$.
👉 Discontinuidad **infinita (no evitable)**.

---

#### 3. **Discontinuidad esencial**

Ocurre cuando el límite **no existe** porque el comportamiento es caótico o **oscila** sin acercarse a ningún valor (ni finito ni infinito).**
$$f(x)=\sin\left(\frac{1}{x}\right)$$
Cuando $x\to0$, la función oscila entre –1 y 1.
👉 Discontinuidad **esencial**.

---

:p ¿Cuál es la diferencia entre discontinuidad evitable, infinita y esencial?
??x
* **Evinable:** el límite existe → se puede “corregir” el valor.
* **Infinita:** el límite tiende a $\pm\infty$ → hay asíntota vertical.
* **Esencial:** el límite no existe ni finito ni infinito → la función oscila.
x??





