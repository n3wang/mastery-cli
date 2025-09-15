



#### Propiedad identidad

| $\boldsymbol{A}$ | $\overline{\boldsymbol{A}}$ | $\boldsymbol{A}+\overline{\boldsymbol{A}}$ |
| :---: | :---: | :---: |
| 10 | 0 | 1 |
| 1 | 1 | 0 |
|  |  | 1 |


#### Propiedad complemento

La suma lógica entre una variable y su complemento dará como resultado ' 1 ' . El producto lógico entre una variable y su complemento dará como resultado ' 0 '.

$$
\begin{aligned}
& A+\bar{A}=1 \\
& A \cdot \bar{A}=0
\end{aligned}
$$


Nuevamente, una manera sencilla de verificar que $\boldsymbol{A}+\overline{\boldsymbol{A}}$ es ' $\mathbf{1}^{\prime}$ es haciendo la tabla de verdad.
Se verifica que en todos los casos el resultado es ' 1 '.

#### Propiedad asociativa

Siempre que se trate de una misma operación lógica, se podrá utilizar esta propiedad.

$$
\begin{gathered}
A+(B+C)=(A+B)+C=A+B+C \\
A \cdot(B \cdot C)=(A \cdot B) \cdot C=A \cdot B \cdot C=A B C
\end{gathered}
$$


De $\boldsymbol{A}+(\boldsymbol{B}+\boldsymbol{C})=\boldsymbol{A}+\boldsymbol{B}+\boldsymbol{C}$ se deduce la siguiente equivalencia:

$\boldsymbol{S}=\boldsymbol{A}+(\boldsymbol{B}+\boldsymbol{C})$

$S=A+B+C$



---

#### 1. Principio de dualidad
a) Escribe la forma dual de las siguientes expresiones:
- $A+0=A$
- $A \cdot 1=A$
?x
a)
- Dual de $A+0=A \rightarrow A \cdot 1=A$
- Dual de $A \cdot 1=A \rightarrow A+0=A$

---

#### 1. Propiedad idempotencia
a) Simplifica las siguientes expresiones usando la idempotencia:
- $A+A$
- $A \cdot A$
?x
a)
- $A+A=A$
- $A \cdot A=A$

---

#### 1. Propiedad de los elementos nulos
a) Simplifica aplicando la propiedad de los elementos nulos:
- $A+1$
- $A \cdot 0$
?x
a)
- $A+1=1$
- $A \cdot 0=0$
4. Demostración guiada

---

#### postulados usados
Comprueba que $A \cdot A=A$, indicando los pasos con los postulados usados (como en el ejemplo).
?x
Resolución:
1. $A=A \cdot 1$ (por identidad)
2. $A \cdot 1=A \cdot(A+\bar{A})$ (por complemento)
3. $A \cdot(A+\bar{A})=A \cdot A+A \cdot \bar{A}$ (por distributiva)
4. $A \cdot A+A \cdot \bar{A}=A \cdot A+0$ (por complemento)
5. $A \cdot A+0=A \cdot A$ (por identidad)
Entonces $A=A \cdot A$.

---

#### 1. Propiedad involutiva
a) Simplifica las siguientes expresiones:
- $\overline{\bar{A}}$
- $\overline{\overline{(B+C)}}$ 
?x
a)
- $\overline{\bar{A}}=A$
- $\overline{\overline{(B+C)}}=B+C$

---

#### 1. Propiedad de absorción
a) Simplifica aplicando la absorción:
- $A+(A \cdot B)$
- $A \cdot(A+B)$ 
?x
a)
- $A+(A \cdot B)=A$
- $A \cdot(A+B)=A$

---

### Ejercicios

Consignas
1. La expresión lógica de la compuerta $X O R$ es $\bar{A} \cdot B+A \cdot \bar{B}$. Tomando esta como punto de partida, mostrar usando las propiedades del álgebra de Boole (indicar en cada paso cuál se utilizó), cómo llegar a la expresión para la compuerta $X N O R(\bar{A} \cdot \bar{B}+A \cdot B)$.
2. Verificar, realizando las tablas de verdad, la propiedad de De Morgan $\overline{A+B}=\bar{A} \cdot \bar{B}$.
3. Mostrar, realizando las tablas de verdad, que las siguientes expresiones lógicas no son equivalentes $A \cdot(\bar{B}+C) \neq A \cdot B+A \cdot \bar{C}$.
4. Desarrollar la siguiente expresión lógica $A \cdot(\bar{B}+C)$ usando las propiedades del álgebra de Boole (indicar en cada paso cuál se utilizó). Se debe llegar a una expresión equivalente que no contenga suma lógica.

Objetivo
Se espera que los alumnos pongan en práctica los conocimientos adquiridos en el módulo.

Criterio de evaluación
La evaluación de la actividad se orienta hacia una calificación de carácter conceptual, buscando valorar la comprensión y el seguimiento del alumno en la materia.



1. A partir de XOR llegar a XNOR

Sabemos:

$$
X O R=\bar{A} B+A \bar{B}
$$


La compuerta XNOR es el complemento de XOR:

$$
X N O R=\overline{\bar{A}} B+A \bar{B}
$$


Aplicamos De Morgan:

$$
X N O R=\overline{\bar{A} B} \cdot \overline{A \bar{B}}
$$


Simplificamos cada término:

$$
\overline{\bar{A} B}=A+\bar{B} \quad ; \quad \overline{A \bar{B}}=\bar{A}+B
$$


Entonces:

$$
X N O R=(A+\bar{B})(\bar{A}+B)
$$



![[Pasted image 20250903100610.png]]