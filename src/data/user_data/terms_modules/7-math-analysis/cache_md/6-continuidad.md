
#### Condiciones de continuidad

:p ¿Cuáles son las tres condiciones para que una función sea continua en (x=a)?  
??x
1. (f(a)) debe existir.
2. ($\lim_{x \to a} f(x) = L$) debe existir y ser finito.
3. (f(a) = L).  
x??


---

#### Clasificación de discontinuidades

:p ¿Cómo se clasifica una discontinuidad según el límite?  
??x
- **Evitables**: si el límite existe y es finito.
- **Esenciales**: si el límite no existe o es infinito.  
x??


---

#### Observación sobre discontinuidades

:p ¿Dónde seguro una función es discontinua?  
??x  
En los puntos que **no pertenecen al dominio** de la función. También puede serlo en puntos de corte, si no se cumplen las condiciones de límite y valor de la función.  
x??

---

#### Ejemplo de discontinuidad evitable

:p Sea ($f(x)=\frac{x^2-4}{x-2}$). ¿Qué ocurre en (x=2)?  
??x
- En (x=2), (f(x)) no está definida.
- ($\lim_{x \to 2} \frac{x^2-4}{x-2} = \lim_{x \to 2} (x+2) = 4$).
- El límite existe y es finito → discontinuidad **evitable**.
- Redefiniendo (f(2)=4), la función queda continua.  
x??

---

#### Ejemplo 2 – Discontinuidad evitable

La función está definida como:
$$
g(x)= \begin{cases}\frac{x^2-4}{x-2}, & x \neq 2 \\ 6, & x=2\end{cases}
$$
:p ¿Por qué (g(x)) presenta discontinuidad evitable en (x=2)?  
??x
- (g(2)=6) → cumple condición 1.
- $(\lim_{x \to 2} g(x) = \lim_{x \to 2} (x+2) = 4$) → cumple condición 2.
- Pero $(g(2)=6 \neq 4$) → falla condición 3
- Entonces la discontinuidad en (x=2) es **evitable**.
- Si redefinimos (g(2)=4), la función sería **continua**.  
x??


---

#### Ejemplo 3 – Continuidad en función por tramos

La función está definida como:
$$
h(x)= \begin{cases}-x+1, & x<0 \\ x^2, & x \geq 0\end{cases}
$$
:p ¿Cómo se analiza la continuidad de (h(x)) en (x=0)?  
??x
- Límite por la izquierda: $\lim _{x \rightarrow 0^{-}}(-x+1)=1$.
- Límite por la derecha: $\lim _{x \rightarrow 0^{+}}\left(x^2\right)=0$.
- Como los límites laterales son distintos, el límite no existe.
- Por lo tanto, en $x=0$ la función presenta una discontinuidad esencial. 
x??

Resumen en flashcard
:p Clasifica las discontinuidades de $f(x)=\frac{3 x-6}{x^2-4}$. 
??x
El denominador no puede anularse:

$$
x^2-4 \neq 0 \quad \Rightarrow \quad x \neq 2, x \neq-2
$$


Entonces:

$$
\operatorname{Dom}(f)=\mathbb{R} \backslash\{-2,2\}
$$


Paso 2 - Análisis de discontinuidades
- En $x=2$ :

$$
f(x)=\frac{3(x-2)}{(x-2)(x+2)}=\frac{3}{x+2}, \quad x \neq 2
$$

$\rightarrow$ El factor $(x-2)$ se cancela, por lo que el límite $\lim _{x \rightarrow 2} f(x)=\frac{3}{4}$ existe y es finito.
- Discontinuidad evitable en $x=2$.
- En $x=-2$ :

$$
f(x)=\frac{3(x-2)}{(x-2)(x+2)}=\frac{3}{x+2}
$$


Al acercarse $x \rightarrow-2$, el denominador tiende a $0 \rightarrow$ el límite es infinito.
Discontinuidad esencial (infinita) en $x=-2$.
- $x=2 \rightarrow$ Discontinuidad evitable (el límite existe y es finito).
- $x=-2 \rightarrow$ Discontinuidad esencial/infinita (asíntota vertical).  
x??

---

#### Resumen en flashcard
:p Determina el dominio y clasifica las discontinuidades de

$$
f(x)= \begin{cases}\frac{2 x+1}{1+x}, & x<0 \\ \frac{1+x}{1+x}, & 0 \leq x \leq 1 \\ \frac{2(x-1)}{x^2-1}, & x>1\end{cases}
$$

??x
- Dominio: $(-\infty,-1) \cup(-1,0) \cup[0,1] \cup(1, \infty)$.
- Discontinuidad en $x=-1$ : esencial (asíntota vertical).
- En $x=0$ : continua.
- En $x=1$ : evitable (se puede redefinir como $f(1)=1$ ).  

Paso 1 - Dominio
- Para $x<0$ : el denominador $1+x \neq 0 \Longrightarrow x \neq-1$.
- Para $0 \leq x \leq 1$ : denominador $1+x \neq 0$, y como $x \in[0,1]$, nunca se anula $\rightarrow$ válido.
- Para $x>1$ : denominador $x^2-1 \neq 0 \Longrightarrow x \neq \pm 1$.
- Dominio:

$$
D_f=(-\infty,-1) \cup(-1,0) \cup[0,1] \cup(1, \infty)
$$


Paso 2 - Puntos de discontinuidad
- En $x=-1$ : denominador nulo $\rightarrow$ posible asíntota vertical.
- En $x=0$ : cambio de tramo $\rightarrow$ verificar continuidad.
- En $x=1$ : denominador nulo en el tercer tramo y punto de corte $\rightarrow$ posible discontinuidad.

Paso 3 - Clasificación
1. En $x=-1$ :

El límite desde la izquierda y derecha diverge $\rightarrow$ discontinuidad esencial/infinita (asíntota vertical).
2. En $x=0$ :
- Límite por la izquierda: $\lim _{x \rightarrow 0^{-}} \frac{2 x+1}{1+x}=1$.
- Límite por la derecha: $\lim _{x \rightarrow 0^{+}} \frac{1+x}{1+x}=1$.
- $f(0)=1$.

3. En $x=1$ :
- Límite por la izquierda: $f(1)=\frac{1+1}{1+1}=1$.
- Límite por la derecha: $\lim _{x \rightarrow 1^{+}} \frac{2(x-1)}{(x-1)(x+1)}=\frac{2}{x+1} \rightarrow 1$.
- Pero en el tercer tramo el punto $x=1$ no pertenece al dominio.

Discontinuidad evitable en $x=1$ (el límite existe y es finito).

Continua en $x=0$.
x??

---

#### Continuidad - Problema con parámetro
:p Determinar el valor de $m$ para que la función sea continua en $x=1$ :

$$
f(x)= \begin{cases}m-5 x, & x \leq 1 \\ 2 x^2-4 m+3, & x>1\end{cases}
$$

??x
Solución paso a paso
1. Condición 1: existencia de $f(1)$

Como $x=1$ está en el primer tramo:

$$
f(1)=m-5(1)=m-5
$$

2. Condición 2: límites laterales
- Límite por la izquierda $\left(x \rightarrow 1^{-}\right)$:

$$
\lim _{x \rightarrow 1^{-}} f(x)=m-5
$$

- Límite por la derecha ( $x \rightarrow 1^{+}$):

$$
\lim _{x \rightarrow 1^{+}} f(x)=2(1)^2-4 m+3=2-4 m+3=5-4 m
$$

3. Condición 3: igualdad de límites

Para continuidad se exige:

$$
m-5=5-4 m
$$


Resolviendo:

$$
m+4 m=5+5 \quad \Rightarrow \quad 5 m=10 \quad \Rightarrow \quad m=2
$$x??


---

1) Para la siguiente función:

$$
f(x)=\left\{\begin{array}{cc}
\frac{4 x^3}{x^2+3 x} & \text { si } x<2 \cdots \\
\left(\frac{1}{2}\right)^x+3 & \text { si } x>2
\end{array}\right.
$$


Indicar el dominio; calcular las ecuaciones de las asíntotas (debe calcularse los límites correspondientes). Determinar y clasificar el o los puntos de discontinuidad.

Importante
- En la entrega de esta actividad deben figurar las justificaciones y cálculos realizados para llegar a las respuestas. Se pueden realizar "a mano" con letra clara y en tinta, sacando una foto o escaneando la hoja, verificando que la imagen esté bien visible.

