
#### Conjuntos finitos e infinitos

Un conjunto es una colección de objetos bien definidos, llamados **elementos**
- **Conjunto finito:** tiene un número limitado de elementos, por ejemplo, $A = {1, 2, 3, 4}$.
- **Conjunto infinito:** no tiene fin en el número de elementos, por ejemplo, $\mathbb{N} = {1, 2, 3, \dots}$.

**Interpretación:**  
En computación, los conjuntos **finitos** representan recursos limitados (como memoria o datos), mientras que los **infinitos** modelan procesos teóricos o matemáticos sin límite.

:p ¿Cuál es la diferencia principal entre un conjunto finito y uno infinito?  
??x  
Un conjunto finito tiene una cantidad limitada de elementos, mientras que un conjunto infinito tiene elementos sin fin, como los números naturales. En computación, los finitos representan recursos reales y los infinitos, modelos teóricos.  
x??

---

#### Estructuras algebraicas

Una **estructura algebraica** está formada por un conjunto no vacío $A$ y una o más operaciones definidas sobre él.  
Una **operación** es una función que combina elementos del conjunto para producir otro elemento del mismo conjunto.
Ejemplo: en los enteros $\mathbb{Z}$ con la suma $(+)$, la operación $a + b$ produce otro entero.

:p ¿Qué caracteriza a una estructura algebraica?  
??x  
Una estructura algebraica combina un conjunto no vacío con una o más operaciones cerradas sobre él, es decir, al aplicar la operación a elementos del conjunto, el resultado también pertenece al conjunto.  
x??

---

#### Monoide

Un **monoide** es una estructura algebraica $(M, ∗)$ que cumple:
1. $M$ es un conjunto no vacío.
2. $∗$ es una **operación binaria cerrada** en $M$.
3. La operación es **asociativa**: $(a ∗ b) ∗ c = a ∗ (b ∗ c)$.
4. Existe un **elemento neutro** $e ∈ M$ tal que $a ∗ e = e ∗ a = a$, para todo $a ∈ M$.
**Ejemplo:** $(\mathbb{N}, +)$ es un monoide con el elemento neutro $0$.

:p ¿Cuáles son las condiciones necesarias para que una estructura sea un monoide?  
??x  
Debe tener una operación binaria cerrada, ser asociativa y poseer un elemento neutro que no altere los resultados de la operación. Ejemplo: $(\mathbb{N}, +, 0)$.  
x??

#### Grupo

Un **grupo** $(G, ∗)$ es un **monoide** en el que cada elemento tiene un inverso.
Condiciones:

1. $(G, ∗)$ es un monoide.
2. Todo $a ∈ G$ tiene un inverso $a^{-1}$ tal que $a ∗ a^{-1} = a^{-1} ∗ a = e$.

**Ejemplo:** $(\mathbb{Z}, +)$ con el neutro $0$ y el inverso de $a$ dado por $-a$.

:p ¿Qué propiedad adicional distingue a un grupo de un monoide?
??x
Cada elemento de un grupo tiene un inverso, es decir, para cada $a$ existe $a^{-1}$ tal que $a ∗ a^{-1} = e$. En un monoide no todos los elementos tienen inverso.
x??

---

#### Anillo

Un **anillo** $(A, +, \cdot)$ es un conjunto con dos operaciones binarias que cumplen:

1. $(A, +)$ es un **grupo abeliano** (la suma es conmutativa y tiene inversos).
2. $(A, \cdot)$ es un **monoide** (tiene asociatividad y elemento neutro multiplicativo).
3. Se cumple la **distributividad**:
$$a \cdot (b + c) = a \cdot b + a \cdot c$$

**Ejemplo:** $(\mathbb{Z}, +, \cdot)$, los enteros con suma y multiplicación.

:p ¿Qué tres propiedades definen a un anillo?
??x
Debe tener una suma que forme un grupo abeliano, una multiplicación que forme un monoide y la multiplicación debe ser distributiva respecto de la suma.
x??

---

#### Cuerpo

Un **cuerpo** $(K, +, \cdot)$ es un **anillo conmutativo con unidad**, donde todo elemento no nulo tiene un **inverso multiplicativo**.

**Ejemplo:** Los números racionales $(\mathbb{Q}, +, \cdot)$ forman un cuerpo, pues todo número distinto de 0 tiene inverso.

:p ¿Qué propiedad convierte a un anillo en un cuerpo?
??x
Que todo elemento no nulo tenga inverso multiplicativo, además de que la multiplicación sea conmutativa y exista un elemento unidad.
x??

---

#### Estructuras discretas

Las **estructuras discretas** no varían de manera continua, sino por **valores o pasos separados**.
Son fundamentales en la matemática computacional, donde los datos y operaciones son finitos o contables.

**Ejemplos:** conjuntos finitos, números enteros, grafos, autómatas.

:p ¿Qué caracteriza a una estructura discreta?
??x
Que sus elementos cambian en pasos separados, no de forma continua. Se usan para representar datos finitos o contables, como en programación y lógica.
x??

---

#### Grupos finitos y discretos

Un **grupo finito** tiene un número limitado de elementos.
Su estudio es clave en **simetrías, combinatoria y criptografía**.

**Ejemplo:** El grupo de permutaciones $S_n$, formado por todas las maneras de reordenar $n$ elementos.

:p ¿Qué define a un grupo finito?
??x
Que contiene un número limitado de elementos y cada uno tiene un inverso. Ejemplo: el grupo de permutaciones $S_n$.
x??

---

#### Grafos

Un **grafo** es un par $G = (V, E)$ donde:
![[Pasted image 20251022064546.png]]
* $V$ es el conjunto de **vértices**.
* $E ⊆ {{u, v} : u, v ∈ V, u ≠ v}$ es el conjunto de **aristas** que conectan vértices.

**Interpretación:** Los grafos modelan relaciones o conexiones: redes sociales, transporte, circuitos, etc.

:p ¿Cómo se define un grafo y qué representa?
??x
Un grafo es el par $G = (V, E)$ formado por vértices y aristas que los conectan. Representa relaciones entre objetos, como rutas, amigos o nodos de red.
x??


#### Demostración con ejemplos de que $$(\mathbb{Z}, +)$$ es un grupo

Veamos con **números concretos** que se cumplen las propiedades.

1️⃣ **Cerradura**
Ejemplo: $3 + (-5) = -2 \in \mathbb{Z}$
→ la suma de dos enteros sigue siendo un número entero.

2️⃣ **Asociatividad**
Ejemplo:
$$(2 + 3) + 4 = 5 + 4 = 9$$
$$2 + (3 + 4) = 2 + 7 = 9$$
→ el resultado no depende de cómo se agrupen los sumandos.

3️⃣ **Elemento neutro**
Ejemplo:
$$7 + 0 = 7 \quad \text{y} \quad 0 + 7 = 7$$
→ el cero no cambia el valor del número.

4️⃣ **Elemento inverso**
Ejemplo:
$$5 + (-5) = 0 \quad \text{y} \quad (-5) + 5 = 0$$
→ cada número tiene un opuesto que lo anula con la suma.

✅ **Conclusión:** $(\mathbb{Z}, +)$ cumple todos los axiomas, por tanto es un grupo.

:p ¿Qué ejemplos numéricos muestran que $(\mathbb{Z}, +)$ cumple los axiomas de grupo?
??x

* Cerradura: $3 + (-5) = -2 ∈ \mathbb{Z}$
* Asociatividad: $(2 + 3) + 4 = 9 = 2 + (3 + 4)$
* Neutro: $7 + 0 = 7$
* Inverso: $5 + (-5) = 0$
x??

---

#### Demostración con ejemplos de que $(\mathbb{Z}, +, \cdot)$ es un anillo

1️⃣ **$(\mathbb{Z}, +)$ es grupo abeliano**
Ya visto: $2 + 3 = 5 = 3 + 2$.

2️⃣ **Cerradura del producto**
Ejemplo: $(-3) \cdot 4 = -12 ∈ \mathbb{Z}$.
→ el producto de dos enteros también es entero.

3️⃣ **Asociatividad del producto**
Ejemplo:
$$(2 \cdot 3) \cdot 4 = 6 \cdot 4 = 24$$
$$2 \cdot (3 \cdot 4) = 2 \cdot 12 = 24$$
→ el resultado no depende del orden de agrupación.

4️⃣ **Distributividad**
Ejemplo:
$$2 \cdot (3 + 4) = 2 \cdot 7 = 14$$
$$2 \cdot 3 + 2 \cdot 4 = 6 + 8 = 14$$
→ se cumple la propiedad distributiva.

✅ **Conclusión:** $(\mathbb{Z}, +, \cdot)$ es un **anillo** porque cumple las condiciones de suma, producto y distributividad.

:p ¿Cómo se verifican los axiomas del anillo $(\mathbb{Z}, +, \cdot)$ con ejemplos numéricos?
??x
* Cerradura: $(-3)·4=-12∈\mathbb{Z}$
* Asociatividad: $(2·3)·4=24=2·(3·4)$
* Distributividad: $2·(3+4)=14=2·3+2·4$
* $(\mathbb{Z},+)$ es grupo abeliano: $2+3=3+2$
x??


#### Demostración con ejemplos de que $$(G = {z ∈ \mathbb{C} : |z| = 1}, ·)$$ es un grupo

El conjunto $G$ está formado por todos los **números complejos sobre el círculo unitario**, es decir, aquellos cuya magnitud es $1$:
$$G = {z \in \mathbb{C} : |z| = 1}$$

1️⃣ **Cerradura**
Si $|z| = 1$ y $|w| = 1$, entonces
$$|zw| = |z||w| = 1 \cdot 1 = 1$$
**Ejemplo:**
Sea $z = e^{i\pi/2} = i$ y $w = e^{i\pi} = -1$.
Entonces $zw = i \cdot (-1) = -i$ y $|-i| = 1$.
→ $zw \in G$.

2️⃣ **Asociatividad**
La multiplicación compleja cumple
$$(z \cdot w) \cdot u = z \cdot (w \cdot u)$$
**Ejemplo:**
$$(i \cdot (-1)) \cdot (-i) = (-i) \cdot (-i) = -1$$
$$i \cdot ((-1) \cdot (-i)) = i \cdot i = -1$$
→ iguales, se cumple la asociatividad.

3️⃣ **Elemento neutro**
$$1 \in G$$ ya que $|1| = 1$ y
$$z \cdot 1 = 1 \cdot z = z$$
**Ejemplo:**
Para $z = i$,
$$i \cdot 1 = i$$ y $$1 \cdot i = i.$$

4️⃣ **Elemento inverso**
Si $|z| = 1$, entonces su inverso también tiene módulo $1$:
$$|z^{-1}| = \frac{1}{|z|} = 1$$
**Ejemplo:**
Para $z = i$,
$$z^{-1} = \frac{1}{i} = -i,$$
y $|z^{-1}| = 1$, además
$$i \cdot (-i) = 1.$$

✅ **Conclusión:** Se cumplen las propiedades de cerradura, asociatividad, neutro e inverso.
Por lo tanto, $$(G, ·)$$ es un **grupo multiplicativo de módulo 1**.

:p ¿Cómo se demuestra con ejemplos que $(G = {z ∈ \mathbb{C} : |z| = 1}, ·)$ forma un grupo?
??x

* **Cerradura:** $|i| = |−1| = 1$ ⇒ $|i·(−1)| = |−i| = 1$
* **Asociatividad:** $(i·(−1))·(−i) = i·((−1)·(−i)) = −1$
* **Neutro:** $z·1 = 1·z = z$
* **Inverso:** $i^{-1} = −i$, y $i·(−i) = 1$
Por tanto, $(G,·)$ es grupo.
x??

#### Homomorfismo canónico $$(\mathbb{Z}\to \mathbb{Z}_n)$$

**Descripción:** La aplicación $$f:\ (\mathbb{Z},+,\cdot)\to (\mathbb{Z}_n,+,\cdot)$$ dada por $$f(x)=[x]$$ (clase de residuo módulo $$n$$) traduce suma en suma módulo $$n$$ y producto en producto módulo $$n$$. Preserva la **unidad** $$1\mapsto [1]$$, por lo que es homomorfismo de **anillos con unidad**. Contexto útil: $$\ker f=n\mathbb{Z}$$ y $$\operatorname{Im}f=\mathbb{Z}_n$$ (sobreyectiva), induciendo el isomorfismo de primer isomorfismo $$\mathbb{Z}/n\mathbb{Z}\cong \mathbb{Z}_n$$.
Ejemplos (con $$n=5$$): $$f(7)=[7]=[2]$$, $$f(7+4)=[11]=[1]=[7]+[4]$$, $$f(3\cdot 6)=[18]=[3]\cdot[6]=[4]$$.
:p ¿Por qué $$f(x)=[x]$$ es un homomorfismo de anillos entre $$(\mathbb{Z},+,\cdot)$$ y $$(\mathbb{Z}_n,+,\cdot)$$?
??x
Porque preserva ambas operaciones y la unidad: $$f(x+y)=[x+y]=[x]+[y],\quad f(xy)=[xy]=[x]\cdot [y],\quad f(1)=[1].$$ Además, $$\ker f=n\mathbb{Z}$$ y la imagen es todo $$\mathbb{Z}_n$$, confirmando la compatibilidad estructural.
x??

---

#### Grupo multiplicativo en $$\mathbb{Q}(\sqrt{2})$$: el conjunto $$G-{0}$$

**Descripción:** Sea $$G={a+b\sqrt{2},:,a,b\in\mathbb{Q}}$$. Con el producto usual, los **no nulos** forman un grupo: la cerradura es inmediata, la asociatividad viene de $$\mathbb{R}$$, el neutro es $$1=1+0\sqrt{2}$$, y los inversos existen vía el **conjugado** y la **norma** $$N(a+b\sqrt{2})=a^2-2b^2\in\mathbb{Q}$$:
$$ (a+b\sqrt{2})^{-1}=\frac{a-b\sqrt{2}}{a^2-2b^2}\in G,$$
donde $$a^2-2b^2\neq 0$$ si $$a+b\sqrt{2}\neq 0$$ (pues implicaría $$\sqrt{2}\in\mathbb{Q}$$). Ejemplo: para $$x=1+2\sqrt{2}$$, $$N(x)=1-8=-7$$ y $$x^{-1}=\frac{1-2\sqrt{2}}{-7}=-\frac{1}{7}+\frac{2}{7}\sqrt{2}\in G$$.
:p ¿Por qué $$(G-{0},\cdot)$$ es un grupo y cómo se obtiene el inverso de $$a+b\sqrt{2}$$?
??x
Porque: **cerradura** $$(a+b\sqrt{2})(c+d\sqrt{2})=(ac+2bd)+(ad+bc)\sqrt{2}\in G,$$ **asociatividad** heredada, **neutro** $$1$$, e **inverso** por conjugación y norma: $$ (a+b\sqrt{2})^{-1}=\dfrac{a-b\sqrt{2}}{a^2-2b^2}\in G,$$ con $$a^2-2b^2\neq 0$$ si $$a+b\sqrt{2}\neq 0$$.
x??

---

#### $$\mathrm{GL}(2,\mathbb{R})$$ con multiplicación de matrices

**Descripción:** $$\mathrm{GL}(2,\mathbb{R})={A\in M_{2\times 2}(\mathbb{R})\ :\ \det A\neq 0}$$ es el grupo de matrices **invertibles**. Es un grupo (no abeliano) bajo multiplicación: **cerradura** por $$\det(AB)=\det A\cdot \det B\neq 0$$, **asociatividad** matricial, **identidad** $$I=\begin{pmatrix}1&0\0&1\end{pmatrix}$$, e **inversos** por la existencia de $$A^{-1}$$ cuando $$\det A\neq 0$$ (p. ej., por adjunta/gauss). No es conmutativo: por ejemplo,
$$A=\begin{pmatrix}1&1\0&1\end{pmatrix},\ \ B=\begin{pmatrix}1&0\1&1\end{pmatrix}\ \Rightarrow\ AB\neq BA.$$
:p ¿Cómo se justifica que $$\mathrm{GL}(2,\mathbb{R})$$ forma un grupo y que no es abeliano?
??x
Grupo: **cerradura** (producto de determinantes no nulos), **asociatividad** (propia de matrices), **identidad** $$I$$, e **inverso** $$A^{-1}$$ si $$\det A\neq 0$$. No es abeliano porque existen matrices invertibles con $$AB\neq BA$$ (p. ej., las dadas en la descripción).
x??



