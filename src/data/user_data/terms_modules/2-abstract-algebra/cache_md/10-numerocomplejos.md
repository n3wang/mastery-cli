#### Necesidad de los Números Complejos

El conjunto de los números reales no tiene solución para ecuaciones como $x^2 = -1$, ya que ningún número real elevado al cuadrado da un resultado negativo.
Para resolver esto, se introdujo una nueva entidad matemática: **la unidad imaginaria**.

Se define como:
$$i^2 = -1 \quad \text{o equivalentemente} \quad i = \sqrt{-1}$$

Esta extensión permite crear un nuevo conjunto numérico que incluye raíces de números negativos: los **números complejos**.
:p ¿Por qué se introdujo la unidad imaginaria $i$ en matemáticas?
??x
Porque las ecuaciones como $x^2 = -1$ no tienen solución en los números reales.
Se define $i = \sqrt{-1}$ para poder representar soluciones de raíces negativas.
x??

---

#### Definición de Número Complejo

Un **número complejo** es una combinación de un número real y uno imaginario.
Se expresa en la forma:
$$z = a + bi$$
donde:

* $a$ es la **parte real**, $Re(z) = a$
* $b$ es la **parte imaginaria**, $Im(z) = b$
* $i$ es la unidad imaginaria, con $i^2 = -1$

El conjunto de todos los números complejos se denota por **$\mathbb{C}$**.
:p ¿Cómo se define un número complejo y qué representan sus partes?
??x
Un número complejo se escribe como $z = a + bi$.

* Parte real: $a$
* Parte imaginaria: $b$
* $i$ es la unidad imaginaria tal que $i^2 = -1$
x??

---

#### Ejemplos de Números Complejos

1. $3 + 2i$ → Parte real: $3$, Parte imaginaria: $2$
2. $-5i$ → Parte real: $0$, Parte imaginaria: $-5$
3. $\pi$ → Parte real: $\pi$, Parte imaginaria: $0$

Estos ejemplos muestran que los números reales son un **caso particular** de los números complejos cuando $b = 0$.
:p ¿Qué ejemplos muestran la relación entre números reales e imaginarios en $\mathbb{C}$?
??x

* $3 + 2i$: tiene parte real $3$ y parte imaginaria $2$.
* $-5i$: tiene parte real $0$ y parte imaginaria $-5$.
* $\pi$: es un número real visto como $\pi + 0i$.
Los reales son complejos con parte imaginaria $0$.
x??

---

#### Representación en Código (Ejemplo en Python)

Los lenguajes modernos permiten trabajar directamente con números complejos.
Ejemplo:

```python
z = 3 + 2j  # Python usa 'j' en lugar de 'i'
print(z.real)  # 3.0
print(z.imag)  # 2.0
```

:p ¿Cómo se representa y manipula un número complejo en Python?
??x
En Python se usa `j` para representar la unidad imaginaria:

```python
z = 3 + 2j
print(z.real)  # Parte real → 3
print(z.imag)  # Parte imaginaria → 2
```

x??
#### Suma y Resta de Números Complejos

Sean $z_1 = a + bi$ y $z_2 = c + di$.
En forma binómica, se suman o restan **las partes reales** y **las partes imaginarias** por separado.

$$
z_1 + z_2 = (a + c) + (b + d)i
$$
$$
z_1 - z_2 = (a - c) + (b - d)i
$$
:p ¿Cómo se realiza la suma y resta de números complejos en forma binómica?
??x
Se suman o restan por separado las partes reales y las partes imaginarias:

* Parte real: $a \pm c$
* Parte imaginaria: $b \pm d$
Ejemplo: $(2 + 3i) + (4 + 5i) = 6 + 8i$.
x??

---

#### Multiplicación de Números Complejos

Sean $z_1 = a + bi$ y $z_2 = c + di$.
Usando la propiedad distributiva:

$$
z_1 \cdot z_2 = (a + bi)(c + di) = (ac - bd) + (ad + bc)i
$$

Se aplica $i^2 = -1$ para simplificar.
:p ¿Qué fórmula se usa para multiplicar dos números complejos en forma binómica?
??x
$$
z_1 \cdot z_2 = (ac - bd) + (ad + bc)i
$$
donde las partes reales e imaginarias se combinan según la distributiva y usando $i^2 = -1$.
x??

---

#### División de Números Complejos

Para dividir $z_1 = a + bi$ por $z_2 = c + di$, se multiplica numerador y denominador por el **conjugado** del denominador:

$$
\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)} = \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}
$$

El denominador se vuelve real.
:p ¿Por qué se multiplica por el conjugado al dividir números complejos?
??x
Porque al multiplicar por el conjugado $(c - di)$, el denominador se transforma en $c^2 + d^2$, un número real, permitiendo expresar el resultado en forma binómica $x + yi$.
x??

---

#### Conjugado de un Número Complejo

El **conjugado** de $z = a + bi$ se define como:

$$
\overline{z} = a - bi
$$

Se obtiene cambiando el signo de la parte imaginaria.

Propiedades:

1. $\overline{\overline{z}} = z$
2. $\overline{z_1 + z_2} = \overline{z_1} + \overline{z_2}$
3. $\overline{z_1 \cdot z_2} = \overline{z_1} \cdot \overline{z_2}$
4. $z + \overline{z} = 2a = 2\operatorname{Re}(z)$
5. $z - \overline{z} = 2bi = 2i\operatorname{Im}(z)$
6. $z \cdot \overline{z} = a^2 + b^2$ (siempre real y positivo)

:p ¿Qué es el conjugado de un número complejo y qué propiedades cumple?
??x
El conjugado de $z = a + bi$ es $\overline{z} = a - bi$.
Sus propiedades principales incluyen:

* $z \cdot \overline{z} = a^2 + b^2$
* $z + \overline{z} = 2\operatorname{Re}(z)$
* Cambia el signo de la parte imaginaria pero conserva la parte real.
x??

#### Módulo de un Número Complejo

El **módulo** de un número complejo $z = a + bi$ representa su distancia al origen $(0,0)$ en el plano de Argand.
Se define como:

$$
|z| = \sqrt{a^2 + b^2}
$$

Propiedades fundamentales:

1. $|z| \ge 0$ y $|z| = 0 \Leftrightarrow z = 0$
2. $|z| = |\overline{z}|$
3. $|z_1 \cdot z_2| = |z_1| \cdot |z_2|$
4. $\left|\frac{z_1}{z_2}\right| = \frac{|z_1|}{|z_2|}$ (con $z_2 \ne 0$)
5. Desigualdad triangular: $|z_1 + z_2| \le |z_1| + |z_2|$
6. $z \cdot \overline{z} = |z|^2$

:p ¿Qué representa el módulo de un número complejo y cómo se calcula?
??x
El módulo $|z|$ representa la distancia del punto $(a,b)$ al origen en el plano complejo, y se calcula como:
$$
|z| = \sqrt{a^2 + b^2}
$$
Por ejemplo, si $z = 3 + 4i$, entonces $|z| = \sqrt{3^2 + 4^2} = 5$.
x??

---

#### Raíz Cuadrada de un Número Complejo

Todo número complejo no nulo tiene **dos raíces cuadradas** opuestas.
Buscamos $w = x + yi$ tal que:
$$
w^2 = z = a + bi
$$
Desarrollo paso a paso:
1. $(x + yi)^2 = a + bi$
2. $x^2 + 2xyi + y^2i^2 = a + bi$
3. $(x^2 - y^2) + (2xy)i = a + bi$
Se igualan las partes real e imaginaria:
$$
\begin{cases}
x^2 - y^2 = a \
2xy = b
\end{cases}
$$
Además, se cumple:
$$
x^2 + y^2 = \sqrt{a^2 + b^2}
$$
De ahí:
$$
x^2 = \frac{\sqrt{a^2 + b^2} + a}{2}, \quad y^2 = \frac{\sqrt{a^2 + b^2} - a}{2}
$$
Los signos de $x$ e $y$ se eligen según el signo de $b$ (si $b>0$, ambos tienen el mismo signo; si $b<0$, signos opuestos).

Ejemplo importante:
Las raíces de $-1$ son $i$ y $-i$, porque
$$
i^2 = (-i)^2 = -1
$$

:p ¿Cómo se determinan las raíces cuadradas de un número complejo $z = a + bi$?
??x
Se busca $w = x + yi$ tal que $w^2 = z$.
1. Se plantean $x^2 - y^2 = a$ y $2xy = b$.
2. Se usa $x^2 + y^2 = \sqrt{a^2 + b^2}$ para despejar:
$$
x^2 = \frac{\sqrt{a^2 + b^2} + a}{2}, \quad y^2 = \frac{\sqrt{a^2 + b^2} - a}{2}
$$
3. Se eligen los signos de $x$ e $y$ según el signo de $b$.
x??
#### Forma polar y exponencial — definición breve (contexto)

Escribimos un complejo como $$z=r(\cos\theta+i\sin\theta)=re^{i\theta}$$ donde $$r=|z|\ge 0,\quad \theta=\arg(z).$$ En productos y cocientes se usan: $$r_{1}e^{i\theta_{1}}\cdot r_{2}e^{i\theta_{2}}=(r_{1}r_{2})e^{i(\theta_{1}+\theta_{2})},\qquad \frac{r_{1}e^{i\theta_{1}}}{r_{2}e^{i\theta_{2}}}=\left(\frac{r_{1}}{r_{2}}\right)e^{i(\theta_{1}-\theta_{2})}.$$
:p ¿Cómo se expresa un número complejo en forma polar y exponencial y qué reglas siguen producto y cociente?
??x
En forma polar/exponencial: $$z=r(\cos\theta+i\sin\theta)=re^{i\theta},; r=|z|,; \theta=\arg z.$$
Reglas: $$z_1z_2:(r_1r_2,;\theta_1+\theta_2),\qquad \frac{z_1}{z_2}:\left(\frac{r_1}{r_2},;\theta_1-\theta_2\right).$$
x??

---

#### Conversión a forma polar y exponencial (Ejercicio 1)

Para $$z=-1+i\sqrt{3}$$: $$r=|z|=\sqrt{(-1)^2+(\sqrt{3})^2}=\sqrt{4}=2.$$ El punto $$(-1,\sqrt{3})$$ está en el II cuadrante y cumple $$\tan\theta=\frac{\sqrt{3}}{-1}=-\sqrt{3}\Rightarrow \theta=\frac{2\pi}{3}.$$ Entonces $$z=2!\left(\cos\frac{2\pi}{3}+i\sin\frac{2\pi}{3}\right)=2e^{i\frac{2\pi}{3}}.$$
:p Convierte $$z=-1+i\sqrt{3}$$ a forma polar y exponencial.
??x
$$r=2,\quad \theta=\frac{2\pi}{3}.$$
Polar: $$z=2!\left(\cos\frac{2\pi}{3}+i\sin\frac{2\pi}{3}\right).$$
Exponencial: $$z=2e^{i\frac{2\pi}{3}}.$$
x??

---

#### Producto en forma polar (Ejercicio 2 — producto)

Dados $$z_1=3e^{i\pi/6},\quad z_2=2e^{i\pi/4},$$ el producto suma argumentos y multiplica módulos: $$z_1z_2=6e^{i(\pi/6+\pi/4)}=6e^{i\frac{5\pi}{12}}=6!\left(\cos\frac{5\pi}{12}+i\sin\frac{5\pi}{12}\right).$$ Aproximando: $$\cos\frac{5\pi}{12}\approx0.258819,;\sin\frac{5\pi}{12}\approx0.965926,$$ $$z_1z_2\approx 6(0.258819+i,0.965926)\approx 1.5529+5.7956,i.$$
:p Calcula $$z_1z_2$$ (exponencial y binómica) para $$z_1=3e^{i\pi/6},; z_2=2e^{i\pi/4}.$$
??x
Exponencial: $$z_1z_2=6e^{i\frac{5\pi}{12}}.$$
Binómica: $$z_1z_2=6!\left(\cos\frac{5\pi}{12}+i\sin\frac{5\pi}{12}\right)\approx 1.5529+5.7956,i.$$
x??

---

#### Cociente en forma polar (Ejercicio 2 — cociente)

Para el cociente se restan argumentos y se dividen módulos: $$\frac{z_1}{z_2}=\frac{3}{2}e^{i(\pi/6-\pi/4)}=\frac{3}{2}e^{-i\frac{\pi}{12}}=\frac{3}{2}!\left(\cos\frac{\pi}{12}-i\sin\frac{\pi}{12}\right).$$ Aproximando: $$\cos\frac{\pi}{12}\approx0.965926,;\sin\frac{\pi}{12}\approx0.258819,$$ $$\frac{z_1}{z_2}\approx \frac{3}{2}(0.965926- i,0.258819)\approx 1.4489-0.3882,i.$$
:p Calcula $$\frac{z_1}{z_2}$$ (exponencial y binómica) para $$z_1=3e^{i\pi/6},; z_2=2e^{i\pi/4}.$$
??x
Exponencial: $$\frac{z_1}{z_2}=\frac{3}{2}e^{-i\frac{\pi}{12}}.$$
Binómica: $$\frac{z_1}{z_2}=\frac{3}{2}!\left(\cos\frac{\pi}{12}-i\sin\frac{\pi}{12}\right)\approx 1.4489-0.3882,i.$$
x??
#### Radicación en $\mathbb{C}$ — Fórmula general

Calcular las raíces $n$-ésimas de $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$ equivale a resolver $w^n=z$. Las $n$ soluciones (todas distintas si $r>0$) son
$$
w_k=\sqrt[n]{r}\Big(\cos\frac{\theta+2k\pi}{n}+i\sin\frac{\theta+2k\pi}{n}\Big)
=\sqrt[n]{r},e^{i\frac{\theta+2k\pi}{n}},\quad k=0,1,\dots,n-1.
$$
:p ¿Cuál es la fórmula de las raíces $n$-ésimas de un complejo $z=re^{i\theta}$?
??x
$$
w_k=\sqrt[n]{r},e^{i\frac{\theta+2k\pi}{n}},\quad k=0,1,\dots,n-1.
$$
x??

---

#### Geometría de las raíces $n$-ésimas

Las $n$ raíces de $z=re^{i\theta}$ están igualmente espaciadas en un círculo de radio $\sqrt[n]{r}$: sus argumentos difieren en $$\frac{2\pi}{n}$$ formando un polígono regular en el plano complejo (Plano de Argand).
:p ¿Cómo se distribuyen geométricamente las raíces $n$-ésimas de $z$?
??x
Se ubican sobre la circunferencia de radio $\sqrt[n]{r}$, separadas por ángulos de $$\frac{2\pi}{n}$$ (polígono regular).
x??

---

#### Raíces de la unidad — definición

Las raíces $n$-ésimas de la unidad resuelven $$z^n=1.$$ En forma polar/exponencial:
$$
z_k=\cos\frac{2k\pi}{n}+i\sin\frac{2k\pi}{n}=e^{i\frac{2k\pi}{n}},\quad k=0,1,\dots,n-1.
$$
Están sobre la circunferencia unitaria y dividen el círculo en $n$ partes iguales.
:p ¿Cómo se describen las raíces $n$-ésimas de la unidad?
??x
$$
z_k=e^{i\frac{2k\pi}{n}},\quad k=0,1,\dots,n-1,
$$
todas con módulo $1$ y espaciadas por $$\frac{2\pi}{n}.$$
x??

---

#### Raíces primitivas de la unidad — caracterización

Una raíz $n$-ésima de la unidad $e^{i\frac{2k\pi}{n}}$ es **primitiva** si su potencia genera todas las $n$ raíces; equivale a que $$\gcd(k,n)=1.$$ (Hay exactamente $\varphi(n)$ raíces primitivas, donde $\varphi$ es la función totiente de Euler.)
:p ¿Cuándo una raíz $n$-ésima de la unidad es primitiva?
??x
Cuando $$\gcd(k,n)=1$$ para $z_k=e^{i\frac{2k\pi}{n}}$ (genera todas las raíces al elevar potencias).
x??

---

#### Forma exponencial y fórmula de Euler

La fórmula de Euler $$e^{i\theta}=\cos\theta+i\sin\theta$$ permite escribir
$$
z=r(\cos\theta+i\sin\theta)=re^{i\theta},
$$
facilitando el cálculo y la interpretación geométrica (radio $r$ y ángulo $\theta$).
:p ¿Cómo se expresa un complejo en forma exponencial usando Euler?
??x
$$
z=re^{i\theta}\quad\text{con}\quad e^{i\theta}=\cos\theta+i\sin\theta.
$$
x??

---

#### Operaciones en forma exponencial

En forma exponencial los módulos se multiplican/dividen y los argumentos se suman/restan:
$$
z_1z_2=(r_1r_2)e^{i(\theta_1+\theta_2)},\qquad
\frac{z_1}{z_2}=\Big(\frac{r_1}{r_2}\Big)e^{i(\theta_1-\theta_2)}\ (r_2\ne0).
$$
:p ¿Qué reglas siguen producto y cociente en forma exponencial?
??x
Producto: $$(r_1r_2,\ \theta_1+\theta_2),$$
Cociente: $$\big(\frac{r_1}{r_2},\ \theta_1-\theta_2\big).$$
x??

---

#### Fórmula de De Moivre (potencias)

Para $z=re^{i\theta}$ y $n\in\mathbb{Z}$,
$$
(re^{i\theta})^{n}=r^{n}e^{in\theta}.
$$
Esto simplifica potencias y, al invertir el proceso, conduce a la radicación en $\mathbb{C}$.
:p ¿Cuál es la fórmula de De Moivre para $(re^{i\theta})^{n}$?
??x
$$
(re^{i\theta})^{n}=r^{n}e^{in\theta}.
$$
x??

---

#### Ejemplo aplicado — raíces cuartas de un número

Para $$-16=16e^{i\pi},$$ sus $4$ raíces son
$$
w_k=16^{1/4}e^{i\frac{\pi+2k\pi}{4}}=2,e^{i\left(\frac{\pi}{4}+\frac{k\pi}{2}\right)},\quad k=0,1,2,3.
$$
En binómica:
$$
2\Big(\cos\frac{\pi}{4}+i\sin\frac{\pi}{4}\Big),;
2\Big(\cos\frac{3\pi}{4}+i\sin\frac{3\pi}{4}\Big),;
2\Big(\cos\frac{5\pi}{4}+i\sin\frac{5\pi}{4}\Big),;
2\Big(\cos\frac{7\pi}{4}+i\sin\frac{7\pi}{4}\Big).
$$
:p ¿Cuáles son las raíces cuartas de $-16$ en forma exponencial?
??x
$$
w_k=2,e^{i\left(\frac{\pi}{4}+\frac{k\pi}{2}\right)},\quad k=0,1,2,3.
$$
x??
#### Operaciones básicas con números complejos

(a) $$(3 + 2i) + (5 − 4i) = (3+5) + (2−4)i = 8 − 2i$$
(b) $$(1 − i) − (2 + 3i) = (1−2) + (−1−3)i = −1 − 4i$$
(c) $$(2 + i)(3 − 2i) = 6 − 4i + 3i − 2i^2 = 6 − i + 2 = 8 − i$$
(d) $$\frac{1 + 2i}{3 − i} = \frac{(1 + 2i)(3 + i)}{(3 − i)(3 + i)} = \frac{3 + 7i − 2}{10} = \frac{1 + 7i}{10} = \frac{1}{10} + \frac{7}{10}i$$

:p Realiza las siguientes operaciones y da el resultado en forma binómica:
(a) $(3 + 2i) + (5 − 4i)$
(b) $(1 − i) − (2 + 3i)$
(c) $(2 + i)(3 − 2i)$
(d) $\frac{1 + 2i}{3 − i}$
??x
(a) $8 − 2i$
(b) $−1 − 4i$
(c) $8 − i$
(d) $\frac{1}{10} + \frac{7}{10}i$
x??

---

#### Conjugado y módulo

Para $z = 4 − 3i$:

* Conjugado: $$\overline{z} = 4 + 3i$$
* Módulo: $$|z| = \sqrt{4^2 + (-3)^2} = \sqrt{16 + 9} = 5$$

:p Encuentra el conjugado y módulo de $z = 4 − 3i$.
??x
$$\overline{z} = 4 + 3i,\quad |z| = 5.$$
x??

---

#### Verificación de la propiedad $z \cdot \overline{z} = |z|^2$

Sea $z = 2 + i$:
$$z \cdot \overline{z} = (2 + i)(2 − i) = 4 − i^2 = 4 + 1 = 5$$
y
$$|z|^2 = (\sqrt{2^2 + 1^2})^2 = (\sqrt{5})^2 = 5$$
Por tanto, $$z \cdot \overline{z} = |z|^2.$$

:p Verifica que $z \cdot \overline{z} = |z|^2$ para $z = 2 + i$.
??x
$$z \cdot \overline{z} = (2 + i)(2 − i) = 5,\quad |z|^2 = 5.$$
Se cumple la igualdad.
x??
#### Representación gráfica de un número complejo y su conjugado

El número complejo $z = 3 + 2i$ se representa en el **plano complejo (Argand)** con:
* parte real: $3$
* parte imaginaria: $2$

Su **conjugado** $\overline{z} = 3 - 2i$ está en el punto reflejado respecto del eje real.
![[Pasted image 20251022062919.png]]
Eje Re → horizontal
Eje Im → vertical

| Punto          | Coordenadas | Ubicación           |
| :------------- | :---------- | :------------------ |
| $z$            | $(3, 2)$    | arriba del eje real |
| $\overline{z}$ | $(3, -2)$   | abajo del eje real  |

:p ¿Cómo se representan gráficamente $z = 3 + 2i$ y su conjugado?
??x
$z = (3, 2)$ se ubica en el primer cuadrante y $\overline{z} = (3, -2)$ es su reflejo respecto al eje real.
x??

---

#### Raíces cuadradas de $z = -5 + 12i$
Buscamos $w = x + yi$ tal que $w^2 = -5 + 12i$.
Sistema:
$$
\begin{cases}
x^2 - y^2 = -5 \
2xy = 12
\end{cases}
$$
De $2xy=12 \Rightarrow y=\frac{6}{x}$, se sustituye en la primera:
$$
x^2 - \frac{36}{x^2} = -5 \Rightarrow x^4 + 5x^2 - 36 = 0
$$
Sea $u = x^2$:
$$
u^2 + 5u - 36 = 0 \Rightarrow u = \frac{-5 \pm \sqrt{25 + 144}}{2} = \frac{-5 \pm 13}{2}
$$
Luego $x^2 = 4$ o $x^2 = -9$ (se descarta).
Entonces $x = \pm 2$, y de $y = 6/x$:
* Si $x = 2$, $y = 3$
* Si $x = -2$, $y = -3$
✅ Raíces:
$$
w_1 = 2 + 3i, \quad w_2 = -2 - 3i
$$

:p Encuentra las raíces cuadradas de $z = -5 + 12i$.
??x
$$
w_1 = 2 + 3i, \quad w_2 = -2 - 3i.
$$
x??

---

#### Resolución de ecuación cuadrática en $\mathbb{C}$
Resolver $z^2 + 4z + 13 = 0$:
$$
z = \frac{-4 \pm \sqrt{16 - 52}}{2} = \frac{-4 \pm \sqrt{-36}}{2} = \frac{-4 \pm 6i}{2} = -2 \pm 3i
$$ Soluciones:
$$
z_1 = -2 + 3i, \quad z_2 = -2 - 3i
$$

:p Resuelve $z^2 + 4z + 13 = 0$ en el conjunto de los números complejos.
??x
$$
z = -2 + 3i \quad\text{y}\quad z = -2 - 3i.
$$
x??
#### Potencias de (i) — patrón cíclico

Las potencias de $$i$$ siguen un ciclo de periodo 4: $$i^1=i,; i^2=-1,; i^3=-i,; i^4=1,; i^{4k+r}=i^r.$$ Para hallar $$i^{2023}$$, divide por 4: $$2023=4\cdot 505+3\Rightarrow i^{2023}=i^{4\cdot505+3}=(i^4)^{505}i^3=1^{505}\cdot(-i)=-i.$$
:p Calcula $$i^{2023}$$ usando el patrón cíclico de las potencias de $$i$$.
??x
$$i^{2023}=-i.$$
x??

---

#### Potencia de un complejo sencillo — atajo con (z^2)

Para $$z=1+i,$$ conviene elevar primero al cuadrado: $$z^2=(1+i)^2=1+2i+i^2=2i.$$ Luego $$z^4=(z^2)^2=(2i)^2=4i^2=4(-1)=-4.$$
:p Si $$z=1+i,$$ calcula $$z^4.$$
??x
$$z^4=-4.$$
x??

---

#### Lugar geométrico — circunferencia en (\mathbb{C})

La ecuación $|z-2i|=3$ describe todos los complejos a distancia 3 del punto $$2i.$$
En forma cartesiana, con $z=x+yi$: $$|x+(y-2)i|=3;\Rightarrow; \sqrt{x^2+(y-2)^2}=3;\Rightarrow; x^2+(y-2)^2=9.$$ Es una circunferencia de centro $(0,2)$ y radio $3.$
![[Pasted image 20251022063010.png]]
:p ¿Qué conjunto de puntos en el plano complejo satisface $|z-2i|=3$ y cuál es su ecuación cartesiana?
??x
Una circunferencia de centro $(0,2)$ y radio $3$ con ecuación $$x^2+(y-2)^2=9.$$
x??

---

#### Simplificación de cociente de potencias — usando cuadrados

Observa que $$(1+i)^2=2i;\Rightarrow;(1+i)^8=\big((1+i)^2\big)^4=(2i)^4=16i^4=16.$$
También $$(1-i)^2=1-2i+i^2=-2i;\Rightarrow;(1-i)^6=\big((1-i)^2\big)^3=(-2i)^3=-8i^3=8i.$$
Así,
$$
\frac{(1+i)^8}{(1-i)^6}=\frac{16}{8i}=\frac{2}{i}=\frac{2}{i}\cdot\frac{-i}{-i}=\frac{-2i}{-i^2}=\frac{-2i}{1}=-2i.
$$
:p Simplifica $$\dfrac{(1+i)^8}{(1-i)^6}.$$
??x
$$\displaystyle \frac{(1+i)^8}{(1-i)^6}=-2i.$$
x??

#### Cociente de complejos en forma polar (contexto)

Para simplificar potencias de un cociente, conviene pasar cada número a forma polar y usar que al dividir **se restan argumentos** y **se dividen módulos**. Aquí: $$1+i\sqrt3=2!\left(\cos\frac{\pi}{3}+i\sin\frac{\pi}{3}\right),\quad 1-i=\sqrt2!\left(\cos!\left(-\frac{\pi}{4}\right)+i\sin!\left(-\frac{\pi}{4}\right)\right).$$  
:p ¿Cómo se expresan $$1+i\sqrt3$$ y $$1-i$$ en forma polar?  
??x  
$$1+i\sqrt3=2\left(\cos\frac{\pi}{3}+i\sin\frac{\pi}{3}\right),\qquad 1-i=\sqrt2\left(\cos!\left(-\frac{\pi}{4}\right)+i\sin!\left(-\frac{\pi}{4}\right)\right).$$  
x??

---

#### Argumento y módulo del cociente

Dividir en polar: $$\frac{1+i\sqrt3}{1-i}=\frac{2}{\sqrt2}!\left[\cos!\left(\frac{\pi}{3}-!\left(-\frac{\pi}{4}\right)\right)+i\sin!\left(\frac{\pi}{3}-!\left(-\frac{\pi}{4}\right)\right)\right]=\sqrt2!\left(\cos\frac{7\pi}{12}+i\sin\frac{7\pi}{12}\right).$$  
:p ¿Cuál es la forma polar de $$\dfrac{1+i\sqrt3}{1-i}$$?  
??x  
$$\dfrac{1+i\sqrt3}{1-i}=\sqrt2\left(\cos\frac{7\pi}{12}+i\sin\frac{7\pi}{12}\right).$$  
x??

---

#### De Moivre para la potencia 12

Aplicando De Moivre: $$\left(\frac{1+i\sqrt3}{1-i}\right)^{12}=(\sqrt2)^{12}\left(\cos!\left(12\cdot\frac{7\pi}{12}\right)+i\sin!\left(12\cdot\frac{7\pi}{12}\right)\right)=2^{6}\big(\cos 7\pi+i\sin 7\pi\big).$$ Como $$\cos 7\pi=-1,;\sin 7\pi=0,$$ resulta $$2^{6}(-1+0i)=-64.$$  
:p Evalúa $$\left(\dfrac{1+i\sqrt3}{1-i}\right)^{12}$$ usando De Moivre.  
??x  
$$\left(\dfrac{1+i\sqrt3}{1-i}\right)^{12}=-64.$$  
x??

