

---

#### Regla de la cadena

La **derivada de una función compuesta** se obtiene derivando desde la última función aplicada hasta la primera:
Si $h(x)=f(g(x))$, entonces
$$h'(x)=f'(g(x))\cdot g'(x)$$

📘 Ejemplo:
$$y=\sin(\sqrt{x})$$
Entonces
$$y'=\cos(\sqrt{x})\cdot\frac{1}{2\sqrt{x}}$$

:p ¿Cómo se deriva una función compuesta?
??x
Aplicando la **regla de la cadena**: se deriva la función externa y se multiplica por la derivada de la interna.
$$[f(g(x))]' = f'(g(x))\cdot g'(x)$$
x??

---

#### Derivada de una función potencial-exponencial

Una función potencial-exponencial tiene la forma:
$$y=[f(x)]^{g(x)}$$
Su derivada es:
$$y'=[f(x)]^{g(x)}\left[g'(x)\ln(f(x))+\frac{g(x)f'(x)}{f(x)}\right]$$

:p ¿Cómo se deriva una función del tipo $[f(x)]^{g(x)}$?
??x
Usando:
$$[f(x)]^{g(x)}\left[g'(x)\ln(f(x))+\frac{g(x)f'(x)}{f(x)}\right]$$
Derivando tanto el exponente como la base.
x??

---

#### Derivadas de distintos órdenes

Si una función es derivable varias veces, se pueden hallar sus derivadas sucesivas:
* $f'(x)$: primera derivada
* $f''(x)$: segunda derivada
* $f^{(n)}(x)$: derivada de orden $n$
$$f(x)=2x^6$$
$$f'(x)=12x^5,; f''(x)=60x^4,; f^{(3)}(x)=240x^3,; f^{(4)}(x)=720x^2,; f^{(5)}(x)=1440x,; f^{(6)}(x)=1440$$

:p ¿Qué representa $f^{(n)}(x)$ y cómo se calcula?
??x
Representa la **derivada de orden $n$**, obtenida derivando sucesivamente $n$ veces la función original.
Ejemplo: si $f(x)=2x^6$, entonces $f^{(6)}(x)=1440$.
x??

---
---


#### Derivada de $f(x)=x^{\cos x}$

Usamos la fórmula de la **función potencial–exponencial**:  
$$[f(x)]^{g(x)},' = [f(x)]^{g(x)}\left[g'(x)\ln f(x)+\frac{g(x)f'(x)}{f(x)}\right]$$

Aquí $f(x)=x$ y $g(x)=\cos x$.  
Entonces  
$$f'(x)=1,\quad g'(x)=-\sin x.$$  
Por tanto:  
$$\frac{d}{dx}(x^{\cos x})=x^{\cos x}\left[-\sin x\ln x+\frac{\cos x}{x}\right].$$

✅ El enunciado es **verdadero**, ya que coincide con  
$$f'(x)=-\sin x\ln x+\frac{\cos x}{x}.$$

:p ¿Es verdadero que $\dfrac{d}{dx}(x^{\cos x})=-\sin x\ln x+\dfrac{\cos x}{x}$?  
??x  
**Verdadero.**  
Usando la fórmula $[f(x)]^{g(x)},'=[f(x)]^{g(x)}\left[g'(x)\ln f(x)+\dfrac{g(x)f'(x)}{f(x)}\right]$, el resultado coincide.  
x??

---

#### Pendiente de la tangente en $f(x)=(5x^2-3)^2$ en $x=1$

Primero derivamos:  
$$f'(x)=2(5x^2-3)\cdot(10x)=20x(5x^2-3).$$  
En $x=1$:  
$$f'(1)=20(1)(5(1)^2-3)=20(2)=40.$$  
La pendiente es **40**.

:p ¿Cuál es la pendiente de la recta tangente a $f(x)=(5x^2-3)^2$ en $x=1$?  
??x  
$$f'(x)=20x(5x^2-3)\Rightarrow f'(1)=40.$$  
**Pendiente:** 40 (opción C).  
x??
















