#### Límite con radical: indeterminación $0/0$

Para $$\lim_{x\to 4}\frac{x^2-2x-8}{2-\sqrt{x}}$$ aparece $0/0$. Factorizamos $x^2-2x-8=(x-4)(x+2)$ y usamos $$x-4=(\sqrt{x}-2)(\sqrt{x}+2).$$ Al simplificar con el denominador $$2-\sqrt{x}=-(\sqrt{x}-2),$$ queda $$-(x+2)(\sqrt{x}+2)\xrightarrow[x\to4]{}-24.$$

:p Calcula $$\lim_{x\to 4}\frac{x^2-2x-8}{2-\sqrt{x}}$$ indicando el truco para eliminar la indeterminación.
??x
Usar $x-4=(\sqrt{x}-2)(\sqrt{x}+2)$ y simplificar:
$$\frac{(x-4)(x+2)}{2-\sqrt{x}}=-(x+2)(\sqrt{x}+2)\to -24.$$
**Resultado:** $-24$.
x??

---

#### Potencia con base racional y exponente grande negativo

Para $$\lim_{x\to-\infty}\left(\frac{3x-5}{2x+7}\right)^{5x}$$ escribimos como $$\exp!\Big(5x\ln\frac{3x-5}{2x+7}\Big).$$ La base tiende a $$\frac{3}{2}>1\Rightarrow \ln!\frac{3}{2}>0.$$ Como $x\to-\infty$, entonces $5x\ln(\cdot)\to-\infty$ y la exponencial tiende a $0$.

:p Evalúa $$\lim_{x\to-\infty}\left(\frac{3x-5}{2x+7}\right)^{5x}$$ explicando por qué no diverge.
??x
Porque $$5x\ln\frac{3x-5}{2x+7}\to-\infty$$ (ya que $\ln\frac{3}{2}>0$ y $x\to-\infty$), luego
$$\exp(\cdot)\to 0.$$
**Resultado:** $0$.
x??
