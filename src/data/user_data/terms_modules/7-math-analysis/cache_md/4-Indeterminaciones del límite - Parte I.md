#### Límite notable del seno

**Descripción:** Base para resolver límites con senos cerca de $0$. Es fundamental igualar el argumento del seno con el denominador.
:p Enuncia el límite notable de $\sin t$ y su valor.
??x
$$\lim_{t\to 0}\frac{\sin t}{t}=1.$$
x??

---

#### Sustitución para igualar argumento y variable

**Descripción:** Si aparece $\dfrac{\sin(g(x))}{x}$ con $g(x)\to0$ cuando $x\to0$, conviene hacer el cambio $t=g(x)$ para usar el límite notable.
:p ¿Qué cambio de variable se realiza para aplicar $\lim_{t\to0}\frac{\sin t}{t}=1$ cuando tienes $\frac{\sin(g(x))}{x}$?
??x
Tomar $t=g(x)$ y reexpresar el cociente como $$\frac{\sin(g(x))}{x}=\frac{\sin t}{t}\cdot\frac{t}{x},$$ de modo que $\frac{\sin t}{t}\to1$ y el límite queda por el factor $\frac{t}{x}=\frac{g(x)}{x}.$
x??

---

#### Ajuste por constante en $\sin(kx)$

**Descripción:** Para $\dfrac{\sin(kx)}{x}$, multiplicar y dividir por $k$ iguala el argumento con el denominador.
:p ¿Cómo conviertes $\dfrac{\sin(kx)}{x}$ en un notable usando un factor constante?
??x
$$\frac{\sin(kx)}{x}=\frac{\sin(kx)}{kx}\cdot k \xrightarrow[x\to0]{}1\cdot k=k.$$
x??

---

#### Descomposición en producto: parte trigonométrica y parte polinómica

**Descripción:** Expresiones del tipo $\dfrac{p(x)}{\sin(qx)}$ pueden reescribirse como $$\frac{p(x)}{qx}\cdot\frac{qx}{\sin(qx)}$$ o $$\frac{\sin(qx)}{qx}\cdot\frac{p(x)}{x},$$ según convenga, para aislar un notable y un límite polinómico.
:p ¿Por qué es útil escribir un cociente con seno como producto de dos factores?
??x
Porque un factor se vuelve notable ($\frac{\sin(qx)}{qx}\to1$ o su recíproco) y el otro se reduce a un límite de funciones algebraicas fáciles de evaluar.
x??

---

#### Factorización previa (Ruffini) para hacer aparecer el factor

**Descripción:** Si el numerador es polinómico, se lo factoriza (por ejemplo con Ruffini) para extraer $x$ o $(x-a)$ que permita emparejar con el argumento del seno.
:p ¿Cuál es el objetivo de factorizar el numerador antes de aplicar un notable trigonométrico?
??x
Obtener un factor (como $x$ o $2x$) que coincida con el argumento del seno y así poder formar el cociente notable $\frac{\sin(ux)}{ux}$.
x??

---

#### Límite tipo $1^\infty$: idea general

**Descripción:** Cuando $L=\lim (1+u(x))^{v(x)}$ con $u(x)\to0$ y $v(x)\to\infty$, se usa logaritmo/exponencial: $$L=\exp!\left(\lim v(x),\ln(1+u(x))\right),$$ si el límite del exponente existe (usando $\ln(1+u)\sim u$).
:p ¿Cómo transformas un $1^\infty$ en un límite manejable?
??x
Tomando logaritmo: $$\ln L=\lim v(x)\ln(1+u(x)),$$ evaluar este límite (usando $\ln(1+u)\sim u$) y luego $L=\exp(\ln L)$.
x??

---

#### Definición de $e$ como límite

**Descripción:** Número $e$ definido por $$e=\lim_{n\to\infty}\left(1+\frac1n\right)^n,$$ y más general $$e^{t}=\lim_{n\to\infty}\left(1+\frac{t}{n}\right)^{n}.$$
:p Escribe una forma de límite que defina $e^t$.
??x
$$e^{t}=\lim_{n\to\infty}\left(1+\frac{t}{n}\right)^{n}.$$
x??

---

#### Patrón clásico: $\left(1+\frac{a}{x}\right)^{bx}$

**Descripción:** Para $x\to\infty$, usar $e^{t}$ con $t=ab$: $$\left(1+\frac{a}{x}\right)^{bx}\to e^{ab}.$$
:p Evalúa $\lim_{x\to\infty}\left(1+\frac{3}{x}\right)^{2x}$.
??x
$$\left(1+\frac{3}{x}\right)^{2x}\to e^{3\cdot2}=e^{6}.$$
x??

---

#### Ajuste del exponente por factores (multiplicar y dividir)

**Descripción:** Si el exponente no es exactamente $x$ o $n$, se puede multiplicar y dividir por una constante para encajar el patrón exponencial.
:p ¿Cómo procedes si tienes $\left(1+\frac{c}{x}\right)^{k x^2}$?
??x
Escribir $$\left(1+\frac{c}{x}\right)^{k x^2}=\left[\left(1+\frac{c}{x}\right)^x\right]^{kx}\ \to\ (e^{c})^{\infty}=+\infty$$ si $c>0$; si $c<0$, tiende a $0$; si $c=0$, a $1$.
x??

---

#### Resumen operativo para senos y $1^\infty$

**Descripción:**

1. Senos: igualar argumento y denominador (sustitución/ajuste), usar $\frac{\sin t}{t}\to1$, y separar en producto.
2. $1^\infty$: logaritmo, pasar a exponente $v\ln(1+u)\sim vu$, y volver con exponencial.
:p ¿Cuál es la secuencia de pasos clave en cada caso?
??x
Senos: sustituir/ajustar $\to$ formar notable $\to$ completar con factor algebraico.
$1^\infty$: tomar $\ln$ $\to$ evaluar $\lim v,\ln(1+u)$ (usando $\ln(1+u)\sim u$) $\to$ aplicar $\exp$.
x??


#### Límite exponencial con exponente dependiente de $x$

**Descripción:**  
El límite es  
$$\lim_{x\to\infty}\left(\frac{2+x}{x+1}\right)^{-x-1}.$$  
Primero se simplifica la fracción:  
$$\frac{2+x}{x+1}=1+\frac{1}{x+1}.$$  
Entonces,  
$$\left(1+\frac{1}{x+1}\right)^{-x-1}=\left[\left(1+\frac{1}{x+1}\right)^{x+1}\right]^{-1}.$$  
Como $\left(1+\frac{1}{n}\right)^n\to e$, el límite tiende a $\frac{1}{e}$.  
:p ¿Cuál es el valor de $\lim_{x\to\infty}\left(\frac{2+x}{x+1}\right)^{-x-1}$?  
??x  
Reescribiendo como $\left[\left(1+\frac{1}{x+1}\right)^{x+1}\right]^{-1}\to e^{-1}=\frac{1}{e}$.  
**Resultado:** $\frac{1}{e}.$  
x??


#### Límite trigonométrico cociente $\sin(5x)/\sin(3x)$
![[Pasted image 20251106193909.png]]
**Descripción:** Usar el notable $\frac{\sin t}{t}\to1$ igualando argumento y denominador: $\dfrac{\sin(5x)}{5x}\cdot\dfrac{5x}{3x}\cdot\dfrac{3x}{\sin(3x)}$.
:p Calcula $\lim_{x\to0}\dfrac{\sin(5x)}{\sin(3x)}$.
??x
$$\lim_{x\to0}\frac{\sin(5x)}{\sin(3x)}=\left(\frac{\sin(5x)}{5x}\right)\left(\frac{5}{3}\right)\left(\frac{3x}{\sin(3x)}\right)\to 1\cdot\frac{5}{3}\cdot1=\frac{5}{3}.$$
x??

---

#### Límite con $\sin^2x$ sobre $3x$
![[Pasted image 20251106193916.png]]
**Descripción:** Escribir $\dfrac{\sin^2x}{3x}=\left(\dfrac{\sin x}{x}\right)\left(\dfrac{\sin x}{3}\right)$ y aplicar $\dfrac{\sin x}{x}\to1$ y $\sin x\to0$.
:p Evalúa $\lim_{x\to0}\dfrac{\sin^2 x}{3x}$.
??x
$$\frac{\sin^2 x}{3x}=\left(\frac{\sin x}{x}\right)\left(\frac{\sin x}{3}\right)\xrightarrow[x\to0]{}1\cdot0=0.$$
x??

---

#### Cociente de senos con distintos coeficientes en x-> 0
![[Pasted image 20251106193922.png]]
**Descripción:** Igualar argumentos: $\dfrac{\sin(3x)}{\sin(4x)}=\dfrac{\sin(3x)}{3x}\cdot\dfrac{3x}{4x}\cdot\dfrac{4x}{\sin(4x)}$.
:p Calcula $\lim_{x\to0}\dfrac{\sin(3x)}{\sin(4x)}$.
??x
Ambos factores notables $\to1$, queda $$\lim_{x\to0}\frac{\sin(3x)}{\sin(4x)}=\frac{3}{4}.$$
x??

---

#### Seno de polinomio sobre polinomio en $x\to2$
![[Pasted image 20251106193931.png]]
**Descripción:** Sea $t=x^2-4=(x-2)(x+2)$. Entonces $\sin t\sim t$ cerca de $0$. Factorizar el denominador $x^2+5x-14=(x-2)(x+7)$.
:p Halla $\lim_{x\to2}\dfrac{\sin(x^2-4)}{x^2+5x-14}$.
??x
$$\frac{\sin(x^2-4)}{x^2+5x-14}=\frac{\sin t}{t}\cdot\frac{t}{(x-2)(x+7)}=\frac{\sin t}{t}\cdot\frac{(x-2)(x+2)}{(x-2)(x+7)}\to 1\cdot\frac{2+2}{2+7}=\frac{4}{9}.$$
x??

---

#### Parámetro $k$ en $\dfrac{\sin(kx)}{x}$ en x->0
![[Pasted image 20251106193941.png]]
**Descripción:** Ajustar por $k$: $\dfrac{\sin(kx)}{x}=\dfrac{\sin(kx)}{kx}\cdot k$, usando el notable.
:p Calcula $\lim_{x\to0}\dfrac{\sin(kx)}{x}$ con $k\in\mathbb{R}$.
??x
$$\lim_{x\to0}\frac{\sin(kx)}{x}=\left(\lim_{x\to0}\frac{\sin(kx)}{kx}\right),k=1\cdot k=k.$$
x??


---

#### Hallar $b$ en $\displaystyle \lim_{x\to0}\frac{\sin(3bx)}{\sin(4x)}=12$
![[Pasted image 20251106194225.png]]
**Descripción:** Cerca de $0$, vale el notable $\frac{\sin(kx)}{kx}\to1$. Así, el cociente se comporta como $\frac{3b}{4}$.
:p Encuentra $b\in\mathbb{R}$ tal que $\lim_{x\to0}\frac{\sin(3bx)}{\sin(4x)}=12$.
??x
Usando $\frac{\sin(3bx)}{3bx}\to1$ y $\frac{\sin(4x)}{4x}\to1$, queda $$\lim_{x\to0}\frac{\sin(3bx)}{\sin(4x)}=\frac{3b}{4}.$$
Imponiendo $\frac{3b}{4}=12\Rightarrow b=16.$
**Resultado:** $b=16$.
x??

---

#### Límite exponencial tipo $1^\alpha$: $\displaystyle \left(\frac{1+5x}{3+5x}\right)^{2x-1}$

**Descripción:** Es de la forma $(1+u_x)^{v_x}$ con $u_x\to0$, $v_x\to\infty$. Usamos $(1+u_x)^{v_x}\to e^{\lim u_x v_x}$ si $\lim u_x v_x$ existe.
:p Calcula $\lim_{x\to\infty}\left(\frac{1+5x}{3+5x}\right)^{2x-1}$.
??x
$$\frac{1+5x}{3+5x}=1-\frac{2}{3+5x}=1+u_x,\quad u_x\sim -\frac{2}{5x}.$$
Entonces $$(2x-1)u_x\sim 2x\left(-\frac{2}{5x}\right)=-\frac{4}{5}.$$
Por el límite exponencial: resultado $=e^{-4/5}$.
x??

---

#### Límite exponencial: $\displaystyle \left(\frac{2x-1}{2x+3}\right)^{x+5}$

**Descripción:** Misma idea; reescribir la base como $1$ más un término pequeño y multiplicar por el exponente grande.
:p Calcula $\lim_{x\to\infty}\left(\frac{2x-1}{2x+3}\right)^{x+5}$.
??x
$$\frac{2x-1}{2x+3}=1-\frac{4}{2x+3}=1+u_x,\quad u_x\sim -\frac{2}{x}.$$
$$(x+5)u_x\sim x\left(-\frac{2}{x}\right)=-2.$$
Resultado: $e^{-2}$.
x??

---

#### Límite exponencial: $\displaystyle \left(\frac{1+3x}{3x+4}\right)^{2x+1}$

**Descripción:** Base $\to1$, exponente $\to\infty$; usar $e^{\lim u_x v_x}$.
:p Calcula $\lim_{x\to\infty}\left(\frac{1+3x}{3x+4}\right)^{2x+1}$.
??x
$$\frac{1+3x}{3x+4}=1-\frac{3}{3x+4}=1+u_x,\quad u_x\sim -\frac{1}{x}.$$
$$(2x+1)u_x\sim 2x\left(-\frac{1}{x}\right)=-2.$$
Resultado: $e^{-2}$.
x??

---

#### Límite exponencial: $\displaystyle \left(\frac{-1+4x}{4x+1}\right)^{x+4}$

**Descripción:** Otra vez $(1+u_x)^{v_x}$ con $u_x\to0$.
:p Calcula $\lim_{x\to\infty}\left(\frac{-1+4x}{4x+1}\right)^{x+4}$.
??x
$$\frac{-1+4x}{4x+1}=1-\frac{2}{4x+1}=1+u_x,\quad u_x\sim -\frac{1}{2x}.$$
$$(x+4)u_x\sim x\left(-\frac{1}{2x}\right)=-\frac{1}{2}.$$
Resultado: $e^{-1/2}$.
x??

