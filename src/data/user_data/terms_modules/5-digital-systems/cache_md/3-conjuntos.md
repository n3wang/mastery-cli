#### Conjuntos

Conjunto:: es una colección de elementos distintos.
Ejemplo:
$$
\begin{aligned}
& A=\{1,2,3\} \\
& B=\{1, \text { "Iam", } f(x), \text { "miércoles" }\}
\end{aligned}
$$

Conjunto vacío: conjunto sin elementos, se anota
(Esto está contenido en todos los conjuntos)

Propiedad: $\forall A$
Decimos que $x$ pertenece a un conjunto: $x \in A$
En caso contrario: $x \notin A$
Ejemplo:

$$
1 \in A \text { y } \sin (x) \in A
$$

---


#### Conjunto Potencia (Conjuntos de partes)

$$
P(A)=\{X \mid X \subseteq A\}
$$


Es $A=\{1,2\}$

$$
P(A)=\{\varnothing, A,\{1\},\{2\}\}
$$

#### Cardinalidad
:p Que es la cardinalidad de un conjunto y como se denota?
??x
La "Cardinalidad" del conjunto $A$ es la cantidad de elementos, se anota $|A|$
Si $|A|=n$ entonces $|P(A)|=2^n$

$$
A=\left\{a_1, a_2, \ldots, a_n\right\}
$$
x??

---

**Conjunto Potencia (Conjuntos de partes)**

P(A)={X ∣ X⊆A}P(A) = \{ X \ | \ X \subseteq A \}

Es A={1,2}A = \{1, 2\}

P(A)={∅,A,{1},{2}}P(A) = \{\varnothing, A, \{1\}, \{2\} \}

**NOTA**

La "Cardinalidad" del conjunto AA es la cantidad de elementos, se anota ∣A∣|A|

Si ∣A∣=n|A| = n entonces ∣P(A)∣=2n|P(A)| = 2^n

A={a1,a2,…,an}A = \{ a_1, a_2, \dots, a_n \}



Complemento. Como se denote algebraicamente
?x
Se anota $A^c$
$$
A^c=\{x \mid x \notin A\}
$$


Diferencia Simétrica - Que significa algebraicamente como se representa?
?x
$$
A \Delta B=(A \cup B) \backslash(A \cap B)
$$

Transitividad - Mostrar un Ejemplo con conjuntos A, B, C
?x
Si $A \subseteq B$ y $B \subseteq C$ entonces $A \subseteq C$


---

### Subconjuntos
Decimos que $B$ es subconjunto de $A$ si todo elemento de $B$ está en $A$.
:p Como se denota?
?x
Se anota $B \subseteq A$
Ejemplo:
Si $B=\{1,2\}$, entonces $B \subseteq A$
Si $C=\{\pi, 3\}$, entonces $C \nsubseteq A$
$\forall A \quad \varnothing \subseteq A$

Unión
$A, B$ conjuntos. Como se denota su union en su expresion algebraica?
?x
$$
A \cup B=\{x \mid x \in A \vee x \in B\}
$$


Si $B \subseteq A$, entonces $A \cup B=A$
Si $A$ y $B$ son disjuntos (sin elementos en común), por ejemplo:
:p Como se denota disjuntos algebraicamente?
?x
$$
A \cup B=\{1,2,3,4,5\}
$$

---

### **Intersección**
:p Intersección, como se denota algebraicamente la interseccion entre Conjutno A y B? Y que significa?
??x
$$
A \cap B=\{x \mid x \in A \wedge x \in B\}
$$
Denota lo que esta en ambos A y B
Por ejemplo:

Ejemplo:
$$
\begin{aligned}
& A_i=\{1,2,3\} \\
& B_i=\{2,4,5\} \\
& A_i \cap B_i=\varnothing
\end{aligned}
$$


Si $A=\{1,2,3\}$ y $B=\{1,2\}$, entonces

$$
A \cap B=\{1,2\}
$$

x??

Si $B \subseteq A$, entonces $A \cap B=...$
?x
Si $B \subseteq A$, entonces $A \cap B=B$

#### Mostrar lo siguiente
Para mostrar que $B \subseteq A$ :
:p Que pasos se usa para mostrar esto?
?x
1. Se toma $x \in B$
2. Se muestra que $x \in A$

---

#### Leyes de Morgan
i) $(A \cup B)^c=A^c \cap B^c$ $\# \overline{p \vee q}=\bar{p} \wedge \bar{q}$
ii) $(A \cap B)^c=A^c \cup B^c$
i) $(A \cup B)^c \subseteq A^c \cap B^c$ y $(A \cup B)^c \supseteq A^c \cap B^c$

Tomamos un elemento $x \in(A \cup B)^c$
$$
(x \notin A) \wedge(x \notin B) \quad \text { luego } \quad x \in A^c \cap B^c=\{x \notin A, x \notin B\}
$$
:p Describi leyes de morgan y desambla cada una de las descriptas anteriormente
?x
Leer arriba

Si $x \in A^c \cap B^c$, entonces que significa respecto A y B usand $\wedge$?
?x
Si $x \in A^c \cap B^c$, entonces $(x \notin A) \wedge(x \notin B)$
entonces:
$$
x \in(A \cup B)^c
$$
