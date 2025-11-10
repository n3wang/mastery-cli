0560_APU_FuncionesLogicasConAlgebraDeBoole_232Q_V2-0


#### Funciones lógicas

Una **función lógica** es una expresión booleana formada por **variables binarias** (0 o 1) combinadas mediante **operaciones lógicas** como AND (·), OR (+) y NOT (‾). Estas funciones representan el comportamiento de sistemas digitales.
![[Pasted image 20251104095548.png]]
:p ¿Qué es una función lógica en álgebra de Boole?
??x
Es una expresión que combina variables binarias (0 o 1) mediante operaciones lógicas como AND, OR y NOT.
x??

---

#### Ejemplo de función lógica

Dada la función $f(A,B,C)=(A+B̅)!̅+ A(B+C)+B(B+C̅)$, las variables son $A,B,C$. Cualquier función puede expresarse en distinto orden de variables, como $f(C,B,A)$.
![[Pasted image 20251104095622.png]]
:p En la función $f(A,B,C)=(A+B̅)!̅+A(B+C)+B(B+C̅)$, ¿cuáles son las variables lógicas?
??x
Las variables son $A$, $B$ y $C$.
x??

---

#### Circuito lógico de una función

Un **circuito lógico** representa gráficamente la función mediante **compuertas lógicas**. Cada operación booleana se traduce a una compuerta:
* AND → producto ($·$)
* OR → suma ($+$)
* NOT → negación ($‾$)
:p ¿Cómo se representa una función lógica mediante un circuito?
??x
Usando compuertas: AND (·), OR (+) y NOT (‾), conectadas según la expresión booleana.
x??

---

#### Minimización con álgebra de Boole

Usando las **propiedades del álgebra de Boole** (De Morgan, distributiva, idempotencia, absorción, etc.), se pueden reducir expresiones para usar menos compuertas. Una expresión es **mínima** cuando ya no puede simplificarse.
:p ¿Para qué sirve la minimización en álgebra de Boole?
??x
Para obtener una expresión equivalente más simple, reduciendo el número de compuertas y el costo lógico.
x??

---

#### Ejemplo paso a paso de simplificación

Para $f(A,B,C)=(A+B̅)!̅ + A(B+C)+B(B+C̅)$:

1. **De Morgan:** $f=A̅B + A(B+C)+B(B+C̅)$
2. **Distributiva:** $f=A̅B + AB + AC + BB + BC̅$
3. **Idempotencia:** $BB=B$ → $f=A̅B + AB + AC + B + BC̅$
4. **Absorción:** $AB$ absorbido por $B$ → $f=A̅B + AC + B$
5. **Absorción adicional:** $A̅B$ absorbido por $B$ → $f=AC + B$
:p ¿Cuál es la expresión mínima obtenida del ejemplo?
??x
$f(A,B,C)=AC+B.$
x??

---

#### Circuito lógico minimizado

La expresión $f=AC+B$ usa solo **dos AND**, **una OR**, y **ningún NOT** extra. Es más eficiente que el circuito original.
:p ¿Por qué el circuito minimizado es más eficiente?
??x
Porque reduce la cantidad de compuertas lógicas necesarias, simplificando el diseño y disminuyendo el costo lógico.
x??


---

---

#### Implementación con una sola compuerta (visión general)
Usar un único tipo de compuerta (NAND o NOR) simplifica el inventario y la tecnología: ambas son **funcionalmente completas**, es decir, pueden implementar **cualquier** función booleana reproduciendo NOT, AND y OR con combinaciones adecuadas.
:p ¿Qué significa que NAND y NOR sean “funcionalmente completas”?
??x
Que con **solo** NAND o **solo** NOR se puede implementar **cualquier** función lógica (se pueden construir NOT, AND y OR a partir de ellas).
x??

---

#### Construir NOT, AND, OR usando solo NAND
Con NAND: $X'$ se obtiene como $X ,\text{NAND}, X$; $X\cdot Y$ es $(X,\text{NAND},Y)'$; $X+Y$ es $(X'\cdot Y')'$, que con NAND queda $((X,\text{NAND},X),\text{NAND},(Y,\text{NAND},Y)),\text{NAND},((X,\text{NAND},X),\text{NAND},(Y,\text{NAND},Y))$.
:p ¿Cómo obtienes $X'$ usando solo compuertas NAND?
??x
Conectar $X$ a **ambas** entradas de una NAND: $X' = X ,\text{NAND}, X$.
x??

---

#### Ejemplo NAND a partir de forma mínima
Dada $f(A,B,C)=AC+B$, por involutiva y De Morgan se reescribe para forzar negaciones y productos: $f=(\overline{\overline{A},\overline{C}}),\overline{\vphantom{C}\overline{B}}$ en estructura de **productos de salidas negadas**, lo que permite cablear como red de **NAND** (cada punto donde se necesite NOT se realiza con una NAND con entradas unidas).
:p ¿Por qué conviene reescribir $f=AC+B$ antes de implementarla solo con NAND?
??x
Para introducir negaciones y formas equivalentes que calcen con la topología **NAND–NAND**, reemplazando NOT con “NAND de entrada duplicada”.
x??

---

#### Construir NOT, AND, OR usando solo NOR
Con NOR: $X'$ es $X,\text{NOR},X$; $X+Y$ es $(X,\text{NOR},Y)'$; $X\cdot Y$ es $(X'+Y')'$, que con NOR queda $((X,\text{NOR},X),\text{NOR},(Y,\text{NOR},Y)),\text{NOR},((X,\text{NOR},X),\text{NOR},(Y,\text{NOR},Y))$.
:p ¿Cómo obtienes $X+Y$ usando solo compuertas NOR?
??x
Hacer NOR y luego negar con otra NOR unaria: $(X+Y)=\big(X,\text{NOR},Y\big)'$, y el NOT se implementa como $Z' = Z,\text{NOR},Z$.
x??

---

#### Ejemplo NOR desde forma POS
Si $f(A,B,C)=(A+B),(B+C)$, conviene partir de **producto de sumas**, aplicar involutiva/De Morgan para que cada suma y negación se traduzca naturalmente a una red **NOR–NOR** (sumas con NOR seguidas de inversión con NOR unaria).
:p ¿Qué forma algebraica favorece una implementación solo con NOR?
??x
La **POS** (producto de sumas), porque las sumas se mapean directo a NOR y las negaciones a NOR unaria.
x??

---

#### Forma canónica: idea general

Una forma canónica obliga a que **cada término** contenga **todas** las variables. Hay dos variantes: **SOP** (suma de productos) y **POS** (producto de sumas). Son útiles para vincular funciones con su tabla de verdad y para síntesis sistemática.
:p ¿Cuál es la diferencia entre formas canónicas SOP y POS?
??x
SOP suma productos completos (minitérminos); POS multiplica sumas completas (maxitérminos).
x??

---

#### Pasar a SOP canónica (técnica)

Dada $f(A,B,C)=AC+B$, completa variables con identidades: $1=X+X'$ y $1=Y\cdot Y'$. Ej.: $AC=AC(B+B')=ABC+AB'C$ y $B=B(A+A')(C+C')=ABC+ABC'+A'BC+A'B C'$; luego combina y ordena.
:p ¿Qué identidades usas para “inyectar” variables faltantes al pasar a SOP?
??x
$1=X+X'$ (suma con complemento) y $1=Y\cdot Y'$ (producto con complemento).
x??

---

#### Minitérmino (definición)

Un **minitérmino** es un producto con **todas** las variables, cada una en forma directa o negada (ej.: $A!B!C'$, con $A=1,B=1,C=0$). En SOP canónica, $f$ es la **suma** de los minitérminos donde $f=1$.
:p ¿Qué representa un minitérmino respecto de la tabla de verdad?
??x
Una **fila** específica donde $f=1$ (una combinación única de las variables).
x??

---

#### Notación de sumatoria de minitérminos

Si $f$ vale $1$ en los índices $2,3,5,6,7$ (para variables en orden $A,B,C$), se escribe $f(A,B,C)=\sum m(2,3,5,6,7)$. El índice es el valor decimal del binario $ABC$.
:p ¿Qué significa $f=\sum m(2,3,5)$?
??x
Que $f=1$ en las filas 2, 3 y 5 de la tabla (minitérminos 2, 3 y 5) y $0$ en las demás.
x??

---

#### Pasar a POS canónica (técnica)

Partiendo de una función (p. ej., $f=(A+B)(B+C)$), agrega variables a cada **suma** usando $0=X\cdot X'$ y $0=Y+Y'$ para expandir a sumas completas, y luego elimina duplicados por idempotencia.
:p ¿Qué identidad usas para inyectar variables faltantes en POS?
??x
$0=X\cdot X'$ (y también $0=Y+Y'$) para expandir cada suma hasta incluir todas las variables.
x??

---

#### Maxitérmino (definición)

Un **maxitérmino** es una suma con **todas** las variables (cada una directa o negada), p. ej. $(A+B+C')$. En POS canónica, $f$ es el **producto** de los maxitérminos donde $f=0$.
:p ¿Qué representa un maxitérmino respecto de la tabla de verdad?
??x
Una **fila** específica donde $f=0$ (una combinación única de variables).
x??

---

#### Notación productoria de maxitérminos

Si $f=0$ en los índices $0,1,4$, se anota $f(A,B,C)=\prod M(0,1,4)$. Cada $M(i)$ es el maxitérmino asociado a esa fila.
:p ¿Qué significa $f=\prod M(0,1,4)$?
??x
Que $f=0$ en las filas 0, 1 y 4 (maxitérminos 0, 1 y 4) y $1$ en las demás filas.
x??

---

#### De canónica a implementación con una sola compuerta

La SOP canónica se traduce naturalmente a redes **OR de ANDs**; para usar **solo NAND**, invierte salidas/entradas (involutiva y De Morgan) para obtener una red **NAND–NAND**. La POS canónica va a **AND de ORs**; para **solo NOR**, reescribe a **NOR–NOR** con negaciones realizadas por NOR unarias.
:p ¿Qué forma canónica elegirías si planeas implementar con solo NOR?
??x
Elegiría **POS**, porque mapea directo a una red **NOR–NOR** tras aplicar De Morgan e involutiva.


---



![[Pasted image 20250909000852.png]]
![[Pasted image 20250909000913.png]]

![[Pasted image 20250909000936.png]]