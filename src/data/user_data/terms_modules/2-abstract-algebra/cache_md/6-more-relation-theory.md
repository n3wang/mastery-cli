# Teoría sobre Relaciones


#### Definición Básica
Definición 1. Una relación $R$ del conjunto $A$ en el conjunto $B$ es un subconjunto del producto cartesiano $A \times B$. Se denota $R \subseteq A \times B$.

#### Relación Inversa
Definición 2. Dada una relación $R \subseteq A \times B$, la relación inversa $R^{-1} \subseteq B \times A$ se define como:

$$
R^{-1}=\{(b, a) \in B \times A:(a, b) \in R\}
$$


#### Composición de Relaciones
Definición 3. Dadas las relaciones $R \subseteq A \times B$ y $S \subseteq B \times C$, la composición $S \circ R \subseteq A \times C$ se define como:

$$
S \circ R=\{(a, c) \in A \times C: \exists b \in B \text { tal que }(a, b) \in R \wedge(b, c) \in S\}
$$


#### Relaciones de Orden
Definición 4. Una relación $R \subseteq A \times A$ es de orden parcial si cumple las siguientes propiedades:
- Reflexividad: $\forall a \in A,(a, a) \in R$
- Antisimetría: $\forall a, b \in A,(a, b) \in R \wedge(b, a) \in R \Rightarrow a=b$
- Transitividad: $\forall a, b, c \in A,(a, b) \in R \wedge(b, c) \in R \Rightarrow(a, c) \in R$

Si además cumple:
- Totalidad: $\forall a, b \in A,(a, b) \in R \vee(b, a) \in R$ entonces es una relación de orden total.

### Ejercicios

#### 1. Relación inversa
:p Sea $A=\{1,2\}, B=\{a, b\}$ y $R=\{(1, a),(2, b)\}$. Encuentra $R^{-1}$.
?x
$$
R^{-1}=\{(a, 1),(b, 2)\} .
$$

---
#### 2. Composición de relaciones
:p Sean $R=\{(1, a),(2, b)\} \subseteq A \times B, S=\{(a, x),(b, y)\} \subseteq B \times C$.
Calcula $S \circ R$.
??x
Se compone:
$$
\begin{aligned}
& (1, a) \in R \text { y }(a, x) \in S \Rightarrow(1, x) \in S \circ R . \\
& (2, b) \in R \text { y }(b, y) \in S \Rightarrow(2, y) \in S \circ R .
\end{aligned}
$$


$$
S \circ R=\{(1, x),(2, y)\} .
$$
x??

---
#### 3. Relación de orden parcial
:p Verifica si la relación $R=\{(1,1),(2,2),(1,2)\}$ en $A=\{1,2\}$ es un orden parcial.
?x
- Reflexiva: sí, $(1,1),(2,2) \in R$.
- Antisimétrica: si $(1,2) \in R$, no está $(2,1)$, se cumple.
- Transitiva: $(1,2)$ y $(2,2)$ implican $(1,2)$, ya está.
$\Rightarrow R$ es un orden parcial.

---
#### 5. Relación inversa y composición
:p Dada la relación $R=\{(x, y),(y, z),(z, w)\}$, encontrar $R^{-1} \circ R$.
?x
$R^{-1}=\{(y, x),(z, y),(w, z)\}$.
$$
R^{-1} \circ R=\{(x, x),(y, y),(z, z),(x, z),(y, w)\} .
$$

---

#### 6. Orden total
:p Determinar si la relación $R=\{(a, b) \in \mathbb{Z} \times \mathbb{Z}: a \leq b\}$ es un orden total. 
?x
- Reflexividad: sí, $a \leq a$.
- Antisimetría: sí, $a \leq b$ y $b \leq a \Rightarrow a=b$.
- Transitividad: sí, $a \leq b, b \leq c \Rightarrow a \leq c$.
- Totalidad: sí, para todo $a, b$, se cumple $a \leq b \circ b \leq a$.
Conclusión: es orden total.

---
#### 7. Asociatividad de composición
:p dado la siguiente relacion encontrar T 
$$
\begin{aligned}
& : R=\{(1,2),(2,3)\}, S=\{(2,4),(3,5)\}, T=\{(4,6),(5,7)\}, \\
& \text { calcular } T \circ(S \circ R) \text { y }(T \circ S) \circ R . \\
\end{aligned}
$$
??x

$$
S \circ R=\{(1,4),(2,5)\}
$$


Luego:

$$
T \circ(S \circ R)=\{(1,6),(2,7)\}
$$


También:

$$
T \circ S=\{(2,6),(3,7)\}, \quad(T \circ S) \circ R=\{(1,6),(2,7)\} .
$$


Se cumple:

$$
T \circ(S \circ R)=(T \circ S) \circ R
$$

x??

---

#### 8. Relación de divisibilidad
:p Sea $A=\{1,2,3,4\}$ y $R=\{(a, b) \in A \times A: a \mid b\}$. Determinar si $R$ es una relación de orden.
??x

$$
R=\{(1,1),(1,2),(1,3),(1,4),(2,2),(2,4),(3,3),(4,4)\} .
$$

- Reflexividad: $\checkmark$ todo número divide a sí mismo.
- Antisimetría: $\sqrt{ }$ si $a \mid b$ y $b \mid a$, entonces $a=b$.
- Transitividad: $\checkmark$ si $a \mid b$ y $b \mid c$, entonces $a \mid c$.
- Totalidad: $X$ no es total, ej. $2 \nmid 3$ y $3 \nmid 2$.

Conclusión: $R$ es un orden parcial pero no total.

x??

---

Exercise 1: Points on a Circle
Let $R$ be a relation on $\mathbb{R}^2 \backslash\{(0,0)\}$ defined by:

$$
\left(x_1, y_1\right) R\left(x_2, y_2\right) \Longleftrightarrow \frac{x_1}{y_1}=\frac{x_2}{y_2} \text { when } y_1, y_2 \neq 0
$$

and $(x, 0) R\left(x^{\prime}, 0\right)$ for all $x, x^{\prime} \neq 0$.
Determine if $R$ is an equivalence relation and find the equivalence classes.
Solution
(i) Reflexive: $(x, y) R(x, y)$ since $\frac{x}{y}=\frac{x}{y}$ (or both on x -axis)
(ii) Symmetric: If $\left(x_1, y_1\right) R\left(x_2, y_2\right)$, then $\frac{x_1}{y_1}=\frac{x_2}{y_2}$ (or both on x -axis), so $\left(x_2, y_2\right) R\left(x_1, y_1\right)$
(iii) Transitive: If $\left(x_1, y_1\right) R\left(x_2, y_2\right)$ and $\left(x_2, y_2\right) R\left(x_3, y_3\right)$, then $\frac{x_1}{y_1}=\frac{x_2}{y_2}=\frac{x_3}{y_3}$ (or appropriate handling of axes)

Thus, $R$ is an equivalence relation.
Equivalence classes: Lines through the origin. Each class consists of all points on a line through the origin (excluding the origin itself):

$$
[(a, b)]=\left\{(x, y) \in \mathbb{R}^2 \backslash\{(0,0)\}: y=k x \text { where } k=\frac{b}{a} \text { if } a \neq 0\right\}
$$


The class $[(1,0)]$ contains all points on the $x$-axis.

---

Exercise 2: Integer Lattice Translation
Define a relation on $\mathbb{R}^2$ by:

$$
\left(x_1, y_1\right) R\left(x_2, y_2\right) \Longleftrightarrow x_1-x_2 \in \mathbb{Z} \text { and } y_1-y_2 \in \mathbb{Z}
$$


Show that $R$ is an equivalence relation and describe the equivalence classes.

1

Solution
(i) Reflexive: $x-x=0 \in \mathbb{Z}$ and $y-y=0 \in \mathbb{Z}$
(ii) Symmetric: If $x_1-x_2 \in \mathbb{Z}$ and $y_1-y_2 \in \mathbb{Z}$, then $x_2-x_1=-\left(x_1-x_2\right) \in \mathbb{Z}$ and similarly for $y$
(iii) Transitive: If $\left(x_1, y_1\right) R\left(x_2, y_2\right)$ and $\left(x_2, y_2\right) R\left(x_3, y_3\right)$, then $x_1-x_3=\left(x_1-x_2\right)+\left(x_2-x_3\right) \in \mathbb{Z}$ and similarly for $y$

Thus, $R$ is an equivalence relation.
Equivalence classes: Each class is a translate of the integer lattice $\mathbb{Z}^2$. For any $(x, y) \in \mathbb{R}^2$ :

$$
[(x, y)]=\{(x+m, y+n): m, n \in \mathbb{Z}\}
$$


All points in the unit square $[0,1) \times[0,1)$ represent distinct equivalence classes.

---

Exercise 3: Same Distance from Origin
Let $R$ be a relation on $\mathbb{R}^2$ defined by:

$$
\left(x_1, y_1\right) R\left(x_2, y_2\right) \Longleftrightarrow x_1^2+y_1^2=x_2^2+y_2^2
$$


Determine if $R$ is an equivalence relation and find the equivalence classes.
Solution
(i) Reflexive: $x^2+y^2=x^2+y^2$ for all $(x, y)$
(ii) Symmetric: If $x_1^2+y_1^2=x_2^2+y_2^2$, then $x_2^2+y_2^2=x_1^2+y_1^2$
(iii) Transitive: If $x_1^2+y_1^2=x_2^2+y_2^2$ and $x_2^2+y_2^2=x_3^2+y_3^2$, then $x_1^2+y_1^2=x_3^2+y_3^2$

Thus, $R$ is an equivalence relation.
Equivalence classes: Concentric circles centered at the origin. For $r \geq 0$ :

$$
C_r=\left\{(x, y) \in \mathbb{R}^2: x^2+y^2=r^2\right\}
$$


The class $C_0=\{(0,0)\}$ is just the origin.

---

Exercise 4: Same x-coordinate
Define a relation on $\mathbb{R}^2$ by:

$$
\left(x_1, y_1\right) R\left(x_2, y_2\right) \Longleftrightarrow x_1=x_2
$$


Determine if $R$ is an equivalence relation and describe its equivalence classes.

2

Solution
(i) Reflexive: $x=x$ for all $(x, y)$
(ii) Symmetric: If $x_1=x_2$, then $x_2=x_1$
(iii) Transitive: If $x_1=x_2$ and $x_2=x_3$, then $x_1=x_3$

Thus, $R$ is an equivalence relation.
Equivalence classes: Vertical lines. For each $c \in \mathbb{R}$ :

$$
V_c=\{(c, y): y \in \mathbb{R}\}
$$


Each vertical line $x=c$ is an equivalence class.

---

Exercise 5: Congruent Triangles
Let $S$ be the set of all triangles in the plane. Define a relation $R$ on $S$ by:

$$
T_1 R T_2 \Longleftrightarrow T_1 \text { is congruent to } T_2
$$


Show that $R$ is an equivalence relation and describe the equivalence classes.
Solution
(i) Reflexive: Every triangle is congruent to itself
(ii) Symmetric: If $T_1$ is congruent to $T_2$, then $T_2$ is congruent to $T_1$
(iii) Transitive: If $T_1$ is congruent to $T_2$ and $T_2$ is congruent to $T_3$, then $T_1$ is congruent to $T_3$

Thus, $R$ is an equivalence relation.
Equivalence classes: Each class consists of all triangles that are congruent to each other. For a triangle with side lengths $a, b, c$, the equivalence class is:

$$
[T]=\{\text { all triangles with side lengths } a, b, c \text { (in some order) }\}
$$


The classes are parameterized by ordered triples ( $a, b, c$ ) of positive real numbers (representing side lengths) that satisfy the triangle inequality.

---



---



---





























