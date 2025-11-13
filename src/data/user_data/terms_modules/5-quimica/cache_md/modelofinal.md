![[SmartSelect_20251110_081940_Samsung Notes.jpg]]


![[Pasted image 20251110082432.png]]


![[Pasted image 20251110082519.png]]

![[Pasted image 20251110082531.png]]



#### Equilibrio gaseoso: cálculo de $K_c$ y $K_p$ (ejemplo guiado)

En la reacción idealizada $$\text{A} + \text{B} \rightleftharpoons \text{AB}$$ a $T=350\ \text{K}$, en un recipiente de $5\ \text{dm}^3$ se observan a equilibrio: $4$ moles de A, $2.5$ moles de B y $6$ moles de AB.
Para $1:1 \to 1$, $$K_c=\dfrac{[\text{AB}]}{[\text{A}][\text{B}]},\qquad K_p=K_c,(RT)^{\Delta n},\ \ \Delta n=1-(1+1)=-1.$$
Concentraciones: $$[\text{A}]=\tfrac{4}{5}=0.8\ \text{M},\ [\text{B}]=\tfrac{2.5}{5}=0.5\ \text{M},\ [\text{AB}]=\tfrac{6}{5}=1.2\ \text{M}.$$
Entonces $$K_c=\dfrac{1.2}{(0.8)(0.5)}=\dfrac{1.2}{0.4}=3.0.$$
Como $\Delta n=-1$, $$K_p=\dfrac{K_c}{RT}=\dfrac{3.0}{(0.082057)(350)}\approx\dfrac{3.0}{28.72}\approx 0.105.$$
:p Con los datos dados ($V=5\ \text{dm}^3$, $T=350\ \text{K}$, $n_\text{A}=4$, $n_\text{B}=2.5$, $n_{\text{AB}}=6$) para $\text{A}+\text{B}\rightleftharpoons\text{AB}$, calcula $K_c$ y $K_p$.
??x
$$K_c=3.0,\qquad K_p\approx 0.105\ \ (\text{usando }R=0.082057\ \text{L·atm·mol}^{-1}\text{·K}^{-1}).$$
x??

---

#### Relación $K_p$–$K_c$ y cómo usarla

Para reacciones gaseosas $$\sum_i \nu_i^\prime \text{A}*i \rightleftharpoons \sum_j \nu_j^{\prime\prime} \text{B}*j,$$ la relación entre constantes es
$$K_p=K_c,(RT)^{\Delta n},\quad \Delta n=\Big(\sum_j \nu_j^{\prime\prime}\Big)-\Big(\sum_i \nu_i^\prime\Big).$$
Interpretación: si hay menos moles gaseosos en productos que en reactivos ($\Delta n<0$), entonces $K_p<K_c$ a la misma $T$; si hay más ($\Delta n>0$), $K_p>K_c$. Para convertir moles a concentraciones usa $[\text{X}]=n*\text{X}/V$ y luego sustituyes en la expresión de $K_c$.
:p ¿Cuál es la fórmula general que conecta $K_p$ con $K_c$ y cómo influye el signo de $\Delta n$ en su comparación?
??x
$$K_p=K_c,(RT)^{\Delta n},\quad \Delta n=n*\text{gas, productos}-n_\text{gas, reactivos}.$$
Si $\Delta n<0\Rightarrow K_p<K_c$; si $\Delta n=0\Rightarrow K_p=K_c$; si $\Delta n>0\Rightarrow K_p>K_c$.
x??

---

#### Cálculo de la constante de velocidad $k$

La reacción $$\text{A} + \text{B} \to \text{AB}$$ es de primer orden con respecto a cada reactivo, por lo tanto:
$$v = k[\text{A}][\text{B}]$$
Datos:
$[\text{A}] = 0.8\ \text{M}$, $[\text{B}] = 0.3\ \text{M}$, $v = 5.6\times10^{-3}\ \text{mol·L}^{-1}\text{s}^{-1}$

Sustituyendo:
$$k = \frac{v}{[\text{A}][\text{B}]} = \frac{5.6\times10^{-3}}{(0.8)(0.3)} = 0.0233\ \text{L·mol}^{-1}\text{s}^{-1}$$
:p Dada una reacción de primer orden en A y B con $v = 5.6\times10^{-3}$, $[\text{A}] = 0.8$ y $[\text{B}] = 0.3$, calcula la constante de velocidad $k$.
??x
$$k = 0.0233\ \text{L·mol}^{-1}\text{s}^{-1}$$
x??

---

#### Cálculo de la velocidad para nuevas concentraciones

Con $k=0.0233$, $[\text{A}] = 0.5$ y $[\text{B}] = 0.05$:
$$v = k[\text{A}][\text{B}] = 0.0233\times(0.5)(0.05) = 5.83\times10^{-4}\ \text{mol·L}^{-1}\text{s}^{-1}$$
:p Calcula la velocidad de reacción cuando $[\text{A}] = 0.5$ y $[\text{B}] = 0.05$.
??x
$$v = 5.83\times10^{-4}\ \text{mol·L}^{-1}\text{s}^{-1}$$
x??

---

#### Determinación del orden de reacción

De la ecuación general $$v=k[\text{A}]^x[\text{B}]^y,$$ se comparan velocidades experimentales.
Si duplicar $[\text{A}]$ (con $[\text{B}]$ constante) duplica la velocidad → primer orden en A.
Si triplicar $[\text{B}]$ aumenta la velocidad nueve veces → segundo orden en B.
El orden global es la suma $x+y$.
:p ¿Cómo se determina experimentalmente el orden de reacción de cada reactivo?
??x
Se comparan experimentos donde solo cambia una concentración:

* Si al duplicar $[\text{A}]$ la velocidad también se duplica → primer orden en A.
* Si al duplicar $[\text{B}]$ la velocidad se cuadruplica → segundo orden en B.
  El orden global es $x+y$.
  x??

---

#### Relación entre concentración y velocidad inicial

La velocidad inicial depende de las concentraciones de reactivos según la ley de velocidad:
$$v_0 = k[\text{A}]^x[\text{B}]^y.$$
En un gráfico log–log de $\log v_0$ vs. $\log[\text{A}]$ o $\log[\text{B}]$, la pendiente da el orden parcial.
:p ¿Qué representa la pendiente en una gráfica $\log v_0$ vs. $\log[\text{A}]$?
??x
Representa el orden de reacción parcial con respecto a A ($x$) en la ecuación $v=k[\text{A}]^x[\text{B}]^y$.
x??

---
#### Determinación de órdenes parciales y constante de velocidad

La reacción:
$$\text{A} + 2\text{B} \rightarrow \text{C}$$
tiene la ley de velocidad:
$$v = k[\text{A}]^x[\text{B}]^y$$

| v (mol/L·s) | [A] (M) | [B] (M) |
| ----------- | ------- | ------- |
| 4.60×10⁻⁴   | 0.4     | 0.1     |
| 5.32×10⁻³   | 0.3     | 0.3     |
| 1.38×10⁻³   | 0.4     | 0.3     |
| 1.10×10⁻²   | 0.8     | 0.6     |

**Paso 1: Determinar el orden en B (manteniendo A constante)**
Comparar exp 1 y exp 3:
$$\frac{v_3}{v_1} = \frac{1.38\times10^{-3}}{4.60\times10^{-4}} = 3.0,$$
$$\frac{[\text{B}]_3}{[\text{B}]_1} = \frac{0.3}{0.1} = 3.$$
Entonces $3.0 = 3^y \Rightarrow y = 1.$

**Paso 2: Determinar el orden en A (manteniendo B constante)**
Comparar exp 3 y exp 4:
$$\frac{v_4}{v_3} = \frac{1.10\times10^{-2}}{1.38\times10^{-3}} \approx 8.0,$$
$$\frac{[\text{A}]_4}{[\text{A}]_3} = \frac{0.8}{0.4} = 2.$$
Entonces $8.0 = 2^x \Rightarrow x = 3.$

**Paso 3: Calcular la constante $k$**
Usando exp 3 ($v=1.38\times10^{-3}$, $[\text{A}]=0.4$, $[\text{B}]=0.3$):
$$k = \frac{v}{[\text{A}]^x[\text{B}]^y} = \frac{1.38\times10^{-3}}{(0.4)^3(0.3)^1} = \frac{1.38\times10^{-3}}{0.0192} = 0.0719\ \text{L}^3\text{mol}^{-3}\text{s}^{-1}.$$

:p Dada la reacción $\text{A}+2\text{B}\to\text{C}$ con los datos de la tabla, determina los órdenes parciales $x$ y $y$ y la constante $k$.
??x
$$x=3,\quad y=1,\quad k=0.0719\ \text{L}^3\text{mol}^{-3}\text{s}^{-1}.$$
x??


---

#### Expresión de $K_c$ para $,\text{A}_2+2\text{B}\rightleftharpoons 2\text{AB}$  (Serie: equilibrio $A_2+2B\leftrightharpoons2AB$)

Para esta estequiometría, la constante en concentración se construye elevando cada concentración a su coeficiente estequiométrico:
$$K_c=\frac{[\text{AB}]^2}{[\text{A}_2],[\text{B}]^2}.$$
:p ¿Cuál es la expresión correcta de $K_c$ para la reacción $,\text{A}_2+2\text{B}\rightleftharpoons 2\text{AB}$?
??x
$$K_c=\dfrac{[\text{AB}]^2}{[\text{A}_2],[\text{B}]^2}.$$
x??

---

#### Cálculo de concentraciones a partir de moles y volumen  (Serie: equilibrio $A_2+2B\leftrightharpoons2AB$)

En $V=5\ \text{L}$ y moles en equilibrio $n(\text{A}_2)=4$, $n(\text{B})=2.5$, $n(\text{AB})=6$, las concentraciones son
$$[\text{A}_2]=\frac{4}{5}=0.8\ \text{M},\quad [\text{B}]=\frac{2.5}{5}=0.5\ \text{M},\quad [\text{AB}]=\frac{6}{5}=1.2\ \text{M}.$$
:p Con $V=5\ \text{L}$ y moles $4$, $2.5$ y $6$ para $\text{A}_2$, $\text{B}$ y $\text{AB}$, ¿cuáles son $[\text{A}_2]$, $[\text{B}]$ y $[\text{AB}]$?
??x
$[\text{A}_2]=0.8\ \text{M}$, $[\text{B}]=0.5\ \text{M}$, $[\text{AB}]=1.2\ \text{M}$.
x??

---

#### Cálculo de $K_c$ numérico  (Serie: equilibrio $A_2+2B\leftrightharpoons2AB$)

Usando las concentraciones anteriores en $$K_c=\frac{[\text{AB}]^2}{[\text{A}_2][\text{B}]^2},$$
$$K_c=\frac{(1.2)^2}{(0.8)(0.5)^2}=\frac{1.44}{0.8\times0.25}=\frac{1.44}{0.20}=7.2.$$
:p Con $[\text{A}_2]=0.8$, $[\text{B}]=0.5$, $[\text{AB}]=1.2$ (M), calcula $K_c$ para $\text{A}_2+2\text{B}\rightleftharpoons 2\text{AB}$.
??x
$$K_c=7.2.$$
x??

---

#### Conversión $K_c \to K_p$ y signo de $\Delta n$  (Serie: equilibrio $A_2+2B\leftrightharpoons2AB$)

Para gases ideales $$K_p=K_c,(RT)^{\Delta n},\quad \Delta n=2-(1+2)=-1.$$
Con $T=350\ \text{K}$ y $R=0.082057\ \text{L·atm·mol}^{-1}\text{·K}^{-1}$, $$RT\approx28.72\Rightarrow K_p=\frac{7.2}{28.72}\approx0.251.$$
:p Con $K_c=7.2$ a $350\ \text{K}$, calcula $K_p$ para la reacción dada e indica $\Delta n$.
??x
$\Delta n=-1$ y $$K_p\approx0.251.$$
x??















