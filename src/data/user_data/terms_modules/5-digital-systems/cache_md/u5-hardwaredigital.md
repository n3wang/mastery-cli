#### Señales analógicas

Las señales analógicas son continuas y pueden tomar infinitos valores. Se usan, por ejemplo, para representar fenómenos naturales como el sonido o la temperatura.  
:p ¿Qué caracteriza a una señal analógica y cómo se representa gráficamente?  
?x  
Una señal analógica es continua, toma infinitos valores dentro de un rango y su gráfica es una curva suave sin saltos.

---

#### Señales digitales

Las señales digitales son discretas y pueden tomar solo un número finito de valores. Se utilizan en dispositivos como celulares, computadoras y calculadoras.  
:p ¿Qué caracteriza a una señal digital y cómo se representa gráficamente?  
?x  
Una señal digital es discontinua, toma valores finitos (como enteros) y su gráfica aparece como escalones o saltos.

---

#### Señales digitales binarias

Son un caso particular de las señales digitales, donde solo existen dos valores posibles: 0 y 1. Se usan como base en la electrónica digital y en la informática.  
:p ¿Qué son las señales digitales binarias y cuáles son sus dos estados posibles?  
?x  
Las señales digitales binarias son aquellas que solo pueden tomar dos valores: `0` (bajo/apagado/abierto) y `1` (alto/encendido/cerrado).

---

#### Niveles lógicos de tensión

En los circuitos digitales, los valores **0 y 1 no son un único valor fijo de tensión**, sino que representan **rangos de tensión**.

- El **0 lógico (Low, VL)** corresponde a un rango de valores de tensión bajos (ejemplo: entre 0 V y 1,5 V).

- El **1 lógico (High, VH)** corresponde a un rango de valores de tensión altos (ejemplo: entre 3,3 V y 5 V).

Entre esos dos rangos existe una **zona indeterminada o de transición**, donde no está definido si la señal corresponde a un 0 o a un 1.

:p ¿Qué representan los estados bajos (0) y los estados altos (1) en un sistema digital?  
??x

1. Representan rangos de valores de tensión que se interpretan como 0 lógico o 1 lógico.

2. El 0 lógico → voltajes bajos, como 0 a 1,5 V.

3. El 1 lógico → voltajes altos, como 3,3 a 5 V.

4. Entre ambos hay un rango de transición en el cual el nivel lógico es indefinido.  
x??


---

#### Escala de integración de circuitos integrados
Los circuitos integrados (chips) se clasifican según la **cantidad de compuertas lógicas** que contienen. Cuantas más compuertas integren, mayor es su complejidad y capacidad de procesamiento.

:p Clasifica los circuitos integrados según la cantidad de compuertas lógicas que integran.  
??x
- **SSI (Small Scale Integration)**: hasta 10 compuertas → funciones simples.
- **MSI (Medium Scale Integration)**: 10 a 100 compuertas → sumadores, multiplexores.
- **LSI (Large Scale Integration)**: 100 a 10.000 compuertas → microcontroladores, memorias.
- **VLSI (Very Large Scale Integration)**: 10.000 a 100.000 compuertas → microprocesadores, memorias.
- **ULSI (Ultra Large Scale Integration)**: más de 100.000 compuertas → microcomputadoras, memorias avanzadas.  
x??


---

#### Retardo de propagación
Cuando una señal digital pasa por una compuerta lógica, el cambio de estado (de 0 a 1 o de 1 a 0) **no ocurre de manera instantánea**, sino que hay un pequeño retraso. A este se lo llama **tiempo de propagación**.

:p ¿Qué es el retardo de propagación en un circuito integrado?  
??x
1. Es el tiempo que tarda la señal de salida en cambiar después de que cambia la señal de entrada.
2. Se debe a que los circuitos físicos no responden instantáneamente.
3. Es un dato característico que los fabricantes incluyen en la hoja técnica (datasheet).  
x??

---

#### Familias Lógicas TTL vs CMOS
Las familias lógicas se diferencian según la tecnología usada para fabricar sus transistores. Esto impacta directamente en velocidad, consumo y compatibilidad. TTL (Transistor-Transistor Logic) emplea transistores bipolares, mientras que CMOS (Complementary Metal-Oxide-Semiconductor) usa transistores de efecto de campo.
TTL fue muy popular en la electrónica clásica, mientras que CMOS domina hoy por su eficiencia energética.
\:p Explica en qué se diferencian principalmente las familias lógicas TTL y CMOS.
??x
TTL: usan transistores bipolares → mayor velocidad, mayor consumo.
CMOS: usan transistores MOSFET → menor consumo, alta densidad de integración.
x??

---
