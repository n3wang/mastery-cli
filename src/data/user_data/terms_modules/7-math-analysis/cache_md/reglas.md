
## **Tabla de reglas de derivadas (organizada por tipo de función)**

| Tipo de regla                  | Función                        | Derivada                       | Comentario útil                                      |
| ------------------------------ | ------------------------------ | ------------------------------ | ---------------------------------------------------- |
| **Constante**                  | $c$                            | $0$                            | La derivada de una constante es cero.                |
| **Potencia**                   | $x^n$                          | $nx^{n-1}$                     | Funciona para $n$ real (entero, racional, negativo). |
| **Raíz**                       | $\sqrt[n]{x}$ = $x^{1/n}$      | $\frac{1}{n}x^{\frac{1}{n}-1}$ | Convierte raíces en potencias.                       |
| **Producto**                   | $u\cdot v$                     | $u'v + uv'$                    | Muy usada: derivada de $(2x+6x^2)(\ln x+2)$.         |
| **Cociente**                   | $\frac{u}{v}$                  | $\frac{u'v-uv'}{v^2}$          | Usada en funciones racionales.                       |
| **Exponencial base e**         | $e^x$                          | $e^x$                          | Invariante.                                          |
| **Exponencial compuesta**      | $e^{g(x)}$                     | $e^{g(x)}g'(x)$                | Aplica regla de la cadena.                           |
| **Exponencial general**        | $a^x$                          | $a^x\ln a$                     | Para $a>0$.                                          |
| **Exponencial compuesta**      | $a^{g(x)}$                     | $a^{g(x)}\ln(a),g'(x)$         | Muy frecuente en $2^x$, $3^{-x}$, etc.               |
| **Logaritmo natural**          | $\ln x$                        | $\frac{1}{x}$                  | Dominio $x>0$.                                       |
| **Logaritmo compuesto**        | $\ln(g(x))$                    | $\frac{g'(x)}{g(x)}$           | Caso usado en $\ln(4x)$.                             |
| **Constante sobre función**    | $\frac{k}{g(x)} = k g(x)^{-1}$ | $-k, g'(x), g(x)^{-2}$         | Regla usada en $\frac{\ln 2}{x+\sqrt{5}}$.           |
| **Suma y resta**               | $u \pm v$                      | $u' \pm v'$                    | Linealidad.                                          |
| **Función seno**               | $\sin x$                       | $\cos x$                       |                                                      |
| **Función coseno**             | $\cos x$                       | $-\sin x$                      |                                                      |
| **Función compuesta (cadena)** | $f(g(x))$                      | $f'(g(x))g'(x)$                | Fundamental.                                         |

|Ejemplo concreto usado|Regla aplicada|
|---|---|
|$e^{-x}$|Cadena: derivada = $-e^{-x}$|
|$4x^{e+1}$|Potencia: $(e+1)x^e$ y luego multiplicación por 4|
|$\frac{\ln 2}{x+\sqrt{5}}$|Es decir $(\ln 2)(x+\sqrt{5})^{-1}$, se usa la potencia con cadena|
|$x^{\sin x}$|Derivación logarítmica: $\ln f = \sin x \ln x$|
|$\ln(4x)$|$\frac{1}{x}$ porque el 4 es constante|
|$3 - 2^x$ en una raíz|Potencia compuesta y cadena|
|Normal y tangente|Pendiente normal = $-\dfrac{1}{m_t}$|


---

# **Tabla ampliada de la Regla de L’Hôpital (con ejemplos útiles)**

| Caso                                       | Forma del límite               | ¿Se puede aplicar?                  | Ejemplo típico (completo y claro)                                                                                                  |
| ------------------------------------------ | ------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Cociente con indeterminación**           | $\dfrac{0}{0}$                 | **Sí**                              | $\displaystyle \lim_{x\to 0}\frac{\sin x}{x} = \frac{0}{0}$                                                                        |
|                                            | $\dfrac{\infty}{\infty}$       | **Sí**                              | $\displaystyle \lim_{x\to\infty}\frac{e^x}{x^5} = \frac{\infty}{\infty}$                                                           |
| **Otras indeterminaciones transformables** | $0\cdot \infty$                | **Sí**, reescribiendo como cociente | $\displaystyle \lim_{x\to 0^+} x\ln x = 0\cdot (-\infty) = \frac{\ln x}{1/x}$                                                      |
|                                            | $\infty - \infty$              | **Sí**, tras convertir a cociente   | $\displaystyle \lim_{x\to\infty}\left(\sqrt{x^2+1}-x\right)$                                                                       |
|                                            | $0^0$                          | **Sí**, usando logaritmos           | $\displaystyle \lim_{x\to 0^+} x^x$                                                                                                |
|                                            | $\infty^0$                     | **Sí**, usando logaritmos           | $\displaystyle \lim_{x\to\infty} x^{1/x}$                                                                                          |
|                                            | $1^\infty$                     | **Sí**, usando logaritmos           | $\displaystyle \lim_{x\to 0}(1+x)^{1/x}$                                                                                           |
| **Casos en los que NO se puede aplicar**   | $\dfrac{a}{b}$ (bien definido) | **No**                              | $\displaystyle \lim_{x\to 2}\frac{x^2-4}{x-2}$ da $0/0$ sí permite, pero $\lim_{x\to 2}\frac{x+1}{3}$ da $3/3$ y **no** se aplica. |
|                                            | $0/5$, $3/7$, etc.             | **No**                              | $\displaystyle \lim_{x\to 0} \frac{\sin x}{5} = 0/5$                                                                               |
|                                            | Funciones que no son cociente  | **No**, salvo reescritura           | $\displaystyle \lim_{x\to\infty} e^{-x}$ no usa L’Hôpital                                                                          |


|Forma del límite|¿Se puede aplicar L’Hôpital?|Ejemplo clásico|Conversión necesaria para aplicar L’Hôpital|
|---|---|---|---|
|$\infty - \infty$|**Sí**, tras convertir a cociente|$\displaystyle \lim_{x\to\infty}(\sqrt{x^2+1} - x)$|Multiplicar por el conjugado: $$\sqrt{x^2+1} - x = \frac{1}{\sqrt{x^2+1} + x}$$ → ya no es indeterminado.|
|$0^0$|**Sí**, usando logaritmos|$\displaystyle \lim_{x\to 0^+} x^x$|Tomar logaritmo: $$L = x^x \implies \ln L = x\ln x$$ Se transforma en $0\cdot(-\infty)$ → luego en $$\frac{\ln x}{1/x}$$ → aplicar L’Hôpital.|
|$\infty^0$|**Sí**, usando logaritmos|$\displaystyle \lim_{x\to\infty} x^{1/x}$|Tomar logaritmo: $$\ln L = \frac{\ln x}{x}$$ Es $\frac{\infty}{\infty}$ → aplicar L’Hôpital.|
|$1^\infty$|**Sí**, usando logaritmos|$\displaystyle \lim_{x\to 0}(1+x)^{1/x}$|Tomar logaritmo: $$\ln L = \frac{\ln(1+x)}{x}$$ Es $\frac{0}{0}$ → L’Hôpital.|
![[Pasted image 20251112204655.png]]