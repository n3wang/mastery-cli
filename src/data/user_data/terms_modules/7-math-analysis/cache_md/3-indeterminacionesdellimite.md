
#### ¿Qué es una indeterminación de límite?

Una **indeterminación** aparece al sustituir el valor $x \to a$ en un límite y obtener formas que no permiten decidir el valor del límite de manera directa (por ejemplo, $\frac{0}{0}$, $\frac{\infty}{\infty}$, $\infty-\infty$). Se “salva” aplicando artificios algebraicos (factorizar, racionalizar, dividir por la mayor potencia, etc.) para poder evaluar el límite.
:p ¿Por qué se llaman “indeterminaciones” y qué se hace para resolverlas?
??x
Se llaman “indeterminaciones” porque la sustitución directa no determina el valor del límite. Para resolverlas, se transforman las expresiones (factorizar, simplificar, racionalizar, dividir por potencias dominantes) hasta obtener una forma donde el límite pueda evaluarse.
x??

---

#### Indeterminación tipo $\frac{0}{0}$ en cociente de polinomios

**Descripción:** Si al evaluar $x \to a$ se obtiene $\frac{0}{0}$, entonces $x=a$ es raíz tanto del numerador como del denominador. La técnica estándar es **factorizar** ambos polinomios y **cancelar** el factor común $(x-a)$.
:p ¿Cuál es la estrategia principal para resolver $\frac{0}{0}$ en un cociente de polinomios?
??x
Factorizar numerador y denominador para exhibir el factor $(x-a)$ asociado a la raíz común, cancelarlo y luego evaluar el límite en la expresión simplificada.
x??

---

#### Herramientas de factorización (repaso rápido)

**Descripción:** Para salvar $\frac{0}{0}$ conviene recordar:

1. **Factor común:** $12x^4+4x^3-6x^7=2x^3(6x+2-3x^4).$
2. **Diferencia de cuadrados:** $(x^2-a^2)=(x-a)(x+a).$
3. **Trinomio cuadrático:** si $x_1,x_2$ son raíces de $ax^2+bx+c$, entonces $ax^2+bx+c=a(x-x_1)(x-x_2).$
:p Menciona tres técnicas de factorización útiles y un ejemplo de cada una.
??x
4. Factor común, por ejemplo: $12x^4+4x^3-6x^7=2x^3(6x+2-3x^4).$
5. Diferencia de cuadrados, por ejemplo: $x^2-81=(x-9)(x+9).$
6. Trinomio cuadrático, por ejemplo: $2x^2+2x-12=2(x-2)(x+3).$
x??

---

#### Regla de Ruffini (división por $x-a$)

**Descripción:** Para dividir un polinomio por un binomio lineal $x-a$ y factorizar cuando $x=a$ es raíz. El resultado da un polinomio de un grado menos y un resto (que es $0$ si $a$ es raíz).
:p ¿Para qué se usa Ruffini al enfrentar $\frac{0}{0}$ en polinomios?
??x
Para dividir numerador y denominador por $x-a$ cuando $a$ es raíz común, obteniendo factores explícitos y permitiendo cancelar $(x-a)$.
x??

---

#### Racionalización con conjugados (raíces cuadradas)

**Descripción:** En cocientes con raíces, multiplicar por el **conjugado** elimina la raíz en numerador o denominador (completa una diferencia de cuadrados) y suele resolver la $\frac{0}{0}$.
:p ¿Cuál es el “conjugado” y por qué ayuda a eliminar raíces en límites?
??x
El conjugado cambia el signo entre términos: de $\sqrt{A}-\sqrt{B}$ a $\sqrt{A}+\sqrt{B}$. Al multiplicar y dividir por el conjugado se usa $(\sqrt{A}-\sqrt{B})(\sqrt{A}+\sqrt{B})=A-B$, que elimina las raíces y permite simplificar el límite.
x??

---

#### Indeterminación $\frac{\infty}{\infty}$ en polinomios: grados dominantes

**Descripción:** Dividir numerador y denominador por la **mayor potencia** de $x$ presente; luego analizar los **términos dominantes**.
Reglas rápidas para $\lim_{x\to\infty}\frac{p(x)}{q(x)}$ con $p,q$ polinomios de grados $n,m$ y coeficientes líderes $a_n,b_m$:
* Si $n>m$, el cociente $\to \infty$ (o $-\infty$ según signos).
* Si $n<m$, el cociente $\to 0.$
* Si $n=m$, $\to \frac{a_n}{b_m}.$

:p ¿Cómo decidir el valor del límite al infinito en cocientes de polinomios?
??x
Comparando grados: si el grado del numerador es mayor, el límite diverge (signo según coeficientes); si es menor, vale $0$; si es igual, vale el cociente de coeficientes líderes $\frac{a_n}{b_m}.$
x??

---

#### Indeterminación $\infty-\infty$ con raíces: idea general

**Descripción:** En expresiones como $\sqrt{x^2+ax}-\sqrt{x^2+bx}$ con $x\to \infty$, se **multiplica por el conjugado** y luego, si aparece $\frac{\infty}{\infty}$, se **divide por la potencia dominante** (p.ej. por $\sqrt{x^2}=|x|$; si $x\to+\infty$, vale $x$).
:p ¿Qué dos pasos encadenados resuelven $\infty-\infty$ con raíces cuadradas?
??x
1. Multiplicar y dividir por el conjugado para convertir la diferencia de raíces en diferencia de radicandos.
2. Si resulta $\frac{\infty}{\infty}$, dividir por la potencia dominante (p.ej. por $x$ o $\sqrt{x^2}$) y evaluar la tendencia de cada término.
x??

---

#### Comparación de crecimiento: exponencial vs polinómica vs logarítmica

**Descripción:** Al estudiar $\frac{f(x)}{g(x)}$ cuando $x\to\infty$, importa **qué crece más rápido**: $\text{exponencial} \gg \text{polinómica} \gg \text{logarítmica}$. Esto decide si el cociente va a $0$, a $\infty$ o a un número finito.
:p Ordena por velocidad de crecimiento para $x\to\infty$: logarítmica, polinómica y exponencial. ¿Por qué sirve esta comparación en límites?
??x
El orden es: exponencial $>$ polinómica $>$ logarítmica. Sirve porque en un cociente domina la función de crecimiento más rápido: si está arriba, suele ir a $\infty$; si está abajo, tiende a $0$.
x??

---

#### Procedimiento típico: $\frac{0}{0}$ con raíces (ejemplo guiado)

**Descripción:** Para $\lim_{x\to 1}\frac{\sqrt{x}-1}{x-1}$: racionalizar el numerador con su conjugado.
:p ¿Cómo resuelves $\lim_{x\to 1}\frac{\sqrt{x}-1}{x-1}$ sin derivadas?
??x
Multiplico y divido por $\sqrt{x}+1$:
$\frac{\sqrt{x}-1}{x-1}\cdot\frac{\sqrt{x}+1}{\sqrt{x}+1}=\frac{x-1}{(x-1)(\sqrt{x}+1)}=\frac{1}{\sqrt{x}+1}\to \frac{1}{2}.$
x??

---

#### Procedimiento típico: $\frac{\infty}{\infty}$ con polinomios (ejemplo guiado)

**Descripción:** En $\lim_{x\to\infty}\frac{3x^5+2x^2+1}{4x^3+3}$ dividir por $x^5$ (potencia dominante del numerador).
:p Evalúa $\lim_{x\to\infty}\frac{3x^5+2x^2+1}{4x^3+3}$ comparando grados.
??x
Dividir por $x^5$:
$\frac{3+\frac{2}{x^3}+\frac{1}{x^5}}{\frac{4}{x^2}+\frac{3}{x^5}}\to \frac{3}{0^+}=\infty$, pues el numerador $\to 3$ y el denominador $\to 0^+.$
x??

---

#### Aplicación: asíntota horizontal como “tope” de utilidad

**Descripción:** En funciones racionales $U(x)=\frac{ax+b}{cx+d}$ con $x\to\infty$, si los grados son iguales, $U(x)\to \frac{a}{c}$ (asíntota horizontal). Interpretable como **límite máximo** de utilidad al aumentar $x$ (p.ej., inversión en publicidad).
:p Si $U(x)=\frac{2000x}{x+1}$ modela utilidad en función de inversión $x$, ¿cuál es el tope máximo cuando $x\to\infty$?
??x
Como los grados son iguales, el límite es el cociente de coeficientes líderes: $\lim_{x\to\infty}\frac{2000x}{x+1}=2000.$ El tope de utilidad es $2000.$
x??

---

#### Checklist de técnicas para “salvar” indeterminaciones

**Descripción:** Guía rápida según el tipo de expresión:

* $\frac{0}{0}$ (polinomios): factorizar (Ruffini, trinomios, diferencia de cuadrados) y cancelar.
* Raíces: multiplicar por el conjugado.
* $\frac{\infty}{\infty}$ (polinomios): dividir por potencia dominante y comparar grados.
* Diferencias tipo $\infty-\infty$ con raíces: conjugado y luego dividir por potencia dominante (p.ej. $x$).
* No polinómicas: comparar crecimientos (exponencial/polinómica/logarítmica).

:p ¿Qué técnica aplicarías en cada uno?
a) $\frac{x^2-9}{x-3}$
b) $\frac{\sqrt{x+4}-\sqrt{x}}{x}$
c) $\frac{5x^3-7}{2x^5+1}$
d) $\sqrt{x^2+5x}-\sqrt{x^2+x}$
??x
a) Factorizar: $x^2-9=(x-3)(x+3)$ y cancelar $x-3$.
b) Conjugado del numerador, luego simplificar.
c) Dividir por la mayor potencia ($x^5$) y usar regla de grados ($\to 0$).
d) Multiplicar por el conjugado y luego dividir por $x$ (para $x\to\infty$).
x??


---

### Ejercicios

#### Límite (a): cociente de polinomios con $\frac{0}{0}$

**Descripción:** Al sustituir $x\to 2$ en $$\frac{2x-4}{2x^2-3x-2}$$ se obtiene $\frac{0}{0}$. Se factoriza y se cancela el factor común $(x-2)$.
:p Calcula $\lim_{x\to 2}\frac{2x-4}{2x^2-3x-2}$ mostrando la factorización y la cancelación del factor común.
??x
Factorizo: $$2x-4=2(x-2),\quad 2x^2-3x-2=(2x+1)(x-2).$$ Cancelo $(x-2)$ y evalúo:
$$\lim_{x\to 2}\frac{2(x-2)}{(2x+1)(x-2)}=\lim_{x\to 2}\frac{2}{2x+1}=\frac{2}{5}.$$
x??

---

#### Límite (b): asíntota vertical y límites laterales

**Descripción:** En $$\frac{2x^3+x^2-7x+2}{3x^2-8x+4}$$ el denominador se anula en $x=2$ mientras el numerador no ($=8$), lo que sugiere asíntota vertical.
:p Calcula $\lim_{x\to 2}\frac{2x^3+x^2-7x+2}{3x^2-8x+4}$ y describe su comportamiento lateral.
??x
Factorizo el denominador: $$3x^2-8x+4=(3x-2)(x-2).$$ Como el numerador $\to 8>0$ cerca de $x=2$ y $3x-2\to 4>0$:

* Si $x\to 2^+$, entonces $x-2\to 0^+$ $\Rightarrow$ denominador $0^+$ $\Rightarrow$ cociente $\to +\infty$.
* Si $x\to 2^-$, entonces $x-2\to 0^-$ $\Rightarrow$ denominador $0^-$ $\Rightarrow$ cociente $\to -\infty$.

Conclusión: el límite bilateral **no existe** (diverge), con asíntota vertical en $x=2$.
x??

#### Regla rápida: cociente de polinomios al infinito

Para $x\to+\infty$, si $p$ y $q$ son polinomios de grados $n$ y $m$ con coeficientes líderes $a_n$ y $b_m$:

- Si $n<m$, el límite es $0$.
- Si $n=m$, el límite es $\frac{a_n}{b_m}$.
- Si $n>m$, el cociente $\to \pm\infty$ según signos dominantes.  
:p ¿Cómo decidir rápidamente $\lim_{x\to+\infty}\frac{p(x)}{q(x)}$?  
??x  
Comparando grados y, si empatan, usando el cociente de coeficientes líderes: $n<m\Rightarrow 0$; $n=m\Rightarrow \frac{a_n}{b_m}$; $n>m\Rightarrow \pm\infty$.  
x??
    

---

#### Ej. 2 (a): $\displaystyle \lim_{x\to+\infty}\frac{2x^2-3x-4}{x^4-5}$

**Descripción:** Grados: numerador $2$, denominador $4$ $\Rightarrow$ domina el denominador; el cociente se aplasta a $0$.  
:p Calcula $\lim_{x\to+\infty}\frac{2x^2-3x-4}{x^4-5}$.  
??x  
Como $2<4$, $$\lim_{x\to+\infty}\frac{2x^2-3x-4}{x^4-5}=0.$$  
x??

---

#### Ej. 2 (b): $\displaystyle \lim_{x\to+\infty}\frac{x^2-3x^3+1}{5x^3+3x-2}$

**Descripción:** Grados iguales $3$ y $3$; tomar coeficientes líderes ($-3$ y $5$).  
:p Calcula $\lim_{x\to+\infty}\frac{x^2-3x^3+1}{5x^3+3x-2}$.  
??x  
Coeficientes líderes: $a_3=-3$, $b_3=5$. Entonces  
$$\lim_{x\to+\infty}\frac{x^2-3x^3+1}{5x^3+3x-2}=\frac{-3}{5}.$$  
x??

---

#### Ej. 2 (c): $\displaystyle \lim_{x\to+\infty}\frac{3x^2+3x^6+1}{x^3+3}$

**Descripción:** Grados $6$ (numerador) y $3$ (denominador); domina el numerador positivo $\sim 3x^6$.  
:p Calcula $\lim_{x\to+\infty}\frac{3x^2+3x^6+1}{x^3+3}$ e indica su tendencia.  
??x  
Como $6>3$, el cociente crece como $$\frac{3x^6}{x^3}=3x^3\to+\infty,$$ por lo que el límite diverge a $+\infty$.  
x??


---
#### Límites laterales de $f(x)$ en $x=0$
![[Pasted image 20251106190351.png]]
**Descripción:** $f(x)=\begin{cases}\tfrac12+e^{1/x},& x<0[2mm]\dfrac{\sqrt{x+1}-1}{x},& x>0\end{cases}$. A la izquierda $1/x\to-\infty\Rightarrow e^{1/x}\to0$; a la derecha se racionaliza.
:p Halla $,\lim_{x\to0^-}f(x)$, $,\lim_{x\to0^+}f(x)$ y decide si $\lim_{x\to0}f(x)$ existe.
??x
Izquierda: $e^{1/x}\to0\Rightarrow \lim_{x\to0^-}f(x)=\tfrac12$.
Derecha: $$\frac{\sqrt{x+1}-1}{x}\cdot\frac{\sqrt{x+1}+1}{\sqrt{x+1}+1}=\frac{1}{\sqrt{x+1}+1}\to \tfrac12.$$
Como ambos laterales valen $\tfrac12$, **existe** y $\displaystyle \lim_{x\to0}f(x)=\tfrac12$.
x??

---

#### Límite lateral de $g(x)$ en $x=-2$
Calcular los límites laterales de las siguientes funciones y determinar la existencia del mismo en los puntos indicados.
**Descripción:** $g(x)=\begin{cases}\dfrac{2x^2-8}{x^3-6x-4},& x\le-2[2mm]\dfrac{-3x+6}{\sqrt{3x^2+4}-4},& -2<x<2[2mm]\dfrac{x^2-4}{4-2x},& x>2\end{cases}$. En $x=-2$ se usan las ramas 1 (izq.) y 2 (der.).
:p Calcula $,\lim_{x\to-2^-}g(x)$ y $,\lim_{x\to-2^+}g(x)$ y decide si $\lim_{x\to-2}g(x)$ existe.
??x
Izquierda (rama 1): factorizar $$\frac{2x^2-8}{x^3-6x-4}=\frac{2(x-2)(x+2)}{(x+2)(x^2-2x-2)}=\frac{2(x-2)}{x^2-2x-2}.$$
Al tender $x\to-2$: $\displaystyle \frac{2(-4)}{6}=-\frac43.$
Derecha (rama 2): en $x\to-2^+$, numerador $\to12>0$ y denominador $\sqrt{3x^2+4}-4\to0^-$ (porque $\sqrt{3x^2+4}<4$ dentro de $(-2,2)$), luego $$\lim_{x\to-2^+}g(x)=-\infty.$$
Como los laterales difieren ($-\tfrac43$ y $-\infty$), el límite **no existe** y hay asíntota vertical desde la derecha.
x??

---

#### Límite en $x=2$ para $g(x)$
Calcular los límites laterales de las siguientes funciones y determinar la existencia del mismo en los puntos indicados.
![[Pasted image 20251106190850.png]]
**Descripción:** En $x=2$ se usan las ramas 2 (izq.) y 3 (der.).
:p Calcula $,\lim_{x\to2^-}g(x)$ y $,\lim_{x\to2^+}g(x)$ y decide si $\lim_{x\to2}g(x)$ existe.
??x
Izquierda (rama 2): $$\frac{-3x+6}{\sqrt{3x^2+4}-4}\cdot\frac{\sqrt{3x^2+4}+4}{\sqrt{3x^2+4}+4}=\frac{-3(x-2)(\sqrt{3x^2+4}+4)}{3(x^2-4)}=-\frac{\sqrt{3x^2+4}+4}{x+2}\to -\frac{4+4}{4}=-2.$$
Derecha (rama 3): $$\frac{x^2-4}{4-2x}=\frac{(x-2)(x+2)}{-2(x-2)}=-\frac{x+2}{2}\to -2.$$
Ambos laterales valen $-2$, por lo tanto **existe** y $\displaystyle \lim_{x\to2}g(x)=-2$ (aunque $g$ no esté definida en $x=2$).
![[Pasted image 20251106190841.png]]
x??


#### Límite 4(a): $4^{-x}$ al infinito

**Descripción:** Potencias con base mayor que $1$ y exponente $-x$ se vuelven fracciones $(\tfrac14)^x$ que se aplastan a $0$ cuando $x\to+\infty$.
:p Calcula $\lim_{x\to+\infty}4^{-x}$.
??x
$$4^{-x}=\left(\tfrac14\right)^{x}\xrightarrow[x\to+\infty]{}0.$$
x??

---

#### Límite 4(b): $\displaystyle \lim_{x\to-1}\frac{-3x^3+4x+1}{2x+2}$

**Descripción:** Al sustituir $x=-1$ aparece $\tfrac{0}{0}$. Se factoriza el numerador para cancelar $x+1$.
:p Resuelve $\lim_{x\to-1}\frac{-3x^3+4x+1}{2x+2}$ factorizando.
??x
Factorizo: $$-3x^3+4x+1=-(x+1)(3x^2-3x-1),\quad 2x+2=2(x+1).$$
Cancelo $x+1$ y evalúo:
$$\lim_{x\to-1}-\frac{3x^2-3x-1}{2}=-\frac{3(1)+3-1}{2}=-\frac{5}{2}.$$
x??

---

#### Límite 4(c): $\displaystyle \lim_{x\to+\infty}\frac{-3x^3+4x+1}{2x+2}$

**Descripción:** Comparación de grados: arriba grado $3$, abajo grado $1$; domina el numerador $\sim -3x^3$.
:p Determina la tendencia de $\frac{-3x^3+4x+1}{2x+2}$ cuando $x\to+\infty$.
??x
$$\frac{-3x^3+4x+1}{2x+2}\sim \frac{-3x^3}{2x}=-\frac32x^2\to -\infty.$$
x??

---

#### Límite 4(d): $\displaystyle \lim_{x\to+\infty}\left(\frac{3x^2+1}{2x^2-6}\right)^{x^2}$

**Descripción:** La base tiende a $\tfrac{3}{2}>1$ y el exponente $x^2\to+\infty$; por lo tanto crece sin cota.Calcular los siguientes límites: Calcular los siguientes límites:
:p Evalúa el límite y justifica por el valor de la base.
??x
$$\frac{3x^2+1}{2x^2-6}\xrightarrow[x\to+\infty]{}\frac32>1,\qquad x^2\to+\infty\ \Rightarrow\ \left(\frac{3x^2+1}{2x^2-6}\right)^{x^2}\to+\infty.$$
x??

---

#### Límite 4(e): $\displaystyle \lim_{x\to\infty}2^{1/x}$

**Descripción:** Exponente tiende a $0$; usar continuidad de la exponencial o forma $e^{(\ln2)/x}$. Calcular los siguientes límites:
:p Calcula $\lim_{x\to\infty}2^{1/x}$.
??x
$$2^{1/x}=e^{(\ln2)/x}\xrightarrow[x\to\infty]{}e^{0}=1.$$
x??


#### Ej. 5: hallar $a$ para que $$\lim_{x\to 0}\frac{\sqrt{x^2-ax+1}-1}{x}=2$$

**Descripción:** Límite tipo $\frac{0}{0}$ con raíz. Se racionaliza para eliminar la raíz y evaluar. La idea clave es transformar la diferencia de raíces en diferencia de radicandos.
:p Encuentra el valor real de $a$ tal que $$\lim_{x\to 0}\frac{\sqrt{x^2-ax+1}-1}{x}=2,$$ justificando con racionalización.
??x
Multiplico y divido por el conjugado:
$$\frac{\sqrt{x^2-ax+1}-1}{x}\cdot\frac{\sqrt{x^2-ax+1}+1}{\sqrt{x^2-ax+1}+1}
=\frac{x^2-ax+1-1}{x\left(\sqrt{x^2-ax+1}+1\right)}
=\frac{x-a}{\sqrt{x^2-ax+1}+1}.$$
Ahora $x\to 0 \Rightarrow \sqrt{x^2-ax+1}\to 1$, por lo que
$$\lim_{x\to 0}\frac{x-a}{\sqrt{x^2-ax+1}+1}=\frac{0-a}{1+1}=-\frac{a}{2}.$$
Imponiendo $-\frac{a}{2}=2$ se obtiene $a=-4$.
**Respuesta:** $a=-4$.
x??

---
