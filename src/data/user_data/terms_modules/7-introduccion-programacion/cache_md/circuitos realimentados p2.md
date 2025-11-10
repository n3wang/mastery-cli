

---

#### Contadores con flip-flops

Cada **flip-flop** representa 1 bit, por lo tanto un contador con $n$ flip-flops puede representar:

$$2^n \text{ estados}$$

:p ¿Cuántos estados puede representar un contador de 4 flip-flops?  
??x  
Puede representar **$2^4 = 16$ estados** como máximo.  
x??

---

#### Contador de 4 bits (0000 a 1001)

El contador va desde **0000 (0)** hasta **1001 (9)**, lo que significa que recorre **10 estados**.

:p ¿Cuál es el módulo de un contador de 4 bits que cuenta de 0000 a 1001?  
??x  
El módulo es **10**, ya que tiene 10 estados distintos.  
x??

---

#### Contador de 3 bits con estados omitidos

Un contador de **3 bits** puede tener hasta **8 estados (000–111)**, pero si no pasa por **110 y 111**, esos estados no se utilizan.

:p ¿Cómo se consideran los estados no utilizados (110 y 111) en un contador?  
??x  
Se consideran **estados no válidos** o **inexistentes (X)** dentro del ciclo de conteo.  
x??

---

#### Contador sincrónico

En un **contador sincrónico**, **todos los flip-flops están conectados al mismo reloj (clock)**, es decir, cambian de estado simultáneamente.  
Si solo _algunos_ están conectados, dejaría de ser completamente sincrónico.

:p ¿Es verdadero que en un contador sincrónico solo algunos flip-flops comparten la misma señal de clock?  
??x  
**Falso.**  
En un contador sincrónico **todos** los flip-flops comparten el mismo reloj.  
x??

---

#### Verificación mediante diagrama temporal

El **diagrama temporal** permite visualizar la secuencia de estados de salida del contador y compararla con la esperada. Es una forma válida de **verificar el funcionamiento correcto** del diseño, ya sea en papel o simulador.

:p ¿Realizar el diagrama temporal es una forma válida de verificar un contador?  
??x  
**Verdadero.**  
El diagrama temporal muestra la evolución de los bits y permite confirmar que el contador sigue la secuencia correcta.  
x??