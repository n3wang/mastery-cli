

04 - 0560_APU_MapasDeKarnaugh_232Q_V1-0

#### ¿Qué es un mapa de Karnaugh?

Un mapa de Karnaugh (K-map) es una disposición bidimensional de $2^n$ celdas (para $n$ variables) que reordena la tabla de verdad en código Gray para que celdas adyacentes difieran en un solo bit. Sirve para visualizar agrupaciones y obtener una expresión mínima equivalente a la función booleana original.  
![[Pasted image 20251104092744.png]]
:p ¿Para qué se usa el mapa de Karnaugh y por qué las celdas están en orden Gray?  
??x  
Se usa para simplificar funciones booleanas identificando términos comunes; el orden Gray garantiza que celdas adyacentes difieran en un solo bit, permitiendo cancelar variables y reducir la expresión.  
x??

---

#### Tamaño del mapa para 3 variables

Con $n=3$ variables (por ejemplo $A,B,C$) el K-map tiene $2^3=8$ celdas. Usualmente se colocan dos valores de $A$ en filas (0 y 1) y las cuatro combinaciones $BC$ (00, 01, 11, 10) en columnas, en orden Gray. Los rótulos de los bordes (izquierdo y superior) son fijos para mantener la adyacencia.  
![[Pasted image 20251104092806.png]]
:p ¿Cuántas celdas tiene un K-map de 3 variables y cómo se rotulan filas/columnas?  
??x  
Tiene 8 celdas. Filas: $A=0$ y $A=1$; columnas: $BC=00,01,11,10$ (orden Gray).  
x??

---

#### De la tabla al K-map (coordenadas)

Cada fila de la tabla de verdad se ubica como una coordenada: el valor de $A$ selecciona la fila y $BC$ la columna Gray. Por ejemplo, la fila $001$ (esto es $A=0,B=0,C=1$) cae en $A=0$ y columna $BC=01$ (segunda columna).  
:p ¿Cómo ubicas la combinación $A=0,B=0,C=1$ en el K-map de 3 variables?  
??x  
Fila $A=0$; columna $BC=01$ ⇒ segunda columna de la fila superior.  
x??

---

#### Minitérminos (unos) vs. Maxitérminos (ceros)

Simplificar por minitérminos coloca $1$ en celdas donde la función vale $1$ y produce una Suma de Productos (SOP). Simplificar por maxitérminos coloca $0$ en celdas donde la función vale $0$ y produce un Producto de Sumas (POS).  
![[Pasted image 20251104093643.png]]
:p ¿Qué diferencia hay entre minimizar por minitérminos y por maxitérminos?  
??x  
Minitérminos: agrupar 1s ⇒ SOP. Maxitérminos: agrupar 0s ⇒ POS.  
x??

---

#### Reglas de agrupación (potencias de 2)

Se agrupan celdas contiguas en rectángulos de tamaño $2^n$ (1,2,4,8,…) cubriendo todos los $1$ (o $0$) con el menor número de grupos y del mayor tamaño posible. Grupos pueden solaparse si ayuda a maximizar tamaños y reducir literales.  
![[Pasted image 20251104093745.png]]
:p ¿Qué tamaños pueden tener los grupos válidos en un K-map y cuál es el objetivo?  
??x  
Tamaños potencia de 2 (1,2,4,8,…). Objetivo: cubrir con el menor número de grupos y del mayor tamaño para minimizar literales.  
x??

---

#### Adyacencia con “wrap-around”

En K-maps, los bordes opuestos son adyacentes (se “envuelven”): la primera y última columna son vecinas, y lo mismo con la primera y última fila. Esto permite formar grupos que crucen el borde.  
:p ¿Las celdas en bordes opuestos pueden agruparse como adyacentes?  
??x  
Sí. Hay “wrap-around”: primera/última columna y fila son adyacentes y pueden formar un mismo grupo.  
x??

---

#### Leer un grupo ⇒ término (SOP)

Para SOP (minitérminos), en cada grupo se toman las variables que NO cambian: si esa variable vale $1$ en el grupo, va sin negar; si vale $0$ en todo el grupo, va negada. Las variables que cambian se eliminan.  
:p ¿Cómo se obtiene el término de un grupo en SOP a partir de un K-map?  
??x  
Se conservan solo las variables constantes en el grupo: $1$ ⇒ literal directo; $0$ ⇒ literal negado. Variables que cambian se omiten.  
x??

---

#### Ejemplo dado: función y tabla

Para $f(A,B,C)$ con la tabla de verdad provista (o equivalente), se llenan las celdas con $1$ donde $f=1$ y con $0$ donde $f=0$. Luego se agrupan los unos en rectángulos máximos (por ejemplo, un grupo de cuatro y otro de dos) siguiendo adyacencias Gray.  
:p ¿Qué información necesitas de la tabla para llenar un K-map de $f(A,B,C)$?  
??x  
Las filas donde $f=1$ (para minitérminos) o donde $f=0$ (para maxitérminos) para marcar las celdas correspondientes.  
x??

---

#### Simplificación por minitérminos (resultado SOP)

En el ejemplo, al agrupar $m_2,m_3,m_6,m_7$ se obtiene el término $B$ (porque $B=1$ es constante y $A,C$ varían), y al agrupar $m_5,m_7$ se obtiene $AC$ (porque $A=1$ y $C=1$ son constantes, $B$ varía). Sumando ambos: $f=AC+B$.  
:p ¿Cuál es la expresión mínima SOP obtenida en el ejemplo?  
??x  
$f(A,B,C)=AC+B.$  
x??

---

#### Simplificación por maxitérminos (resultado POS)

Agrupando los ceros del mismo ejemplo y leyendo en forma de sumas (variable constante $0$ ⇒ sin negar en la suma; constante $1$ ⇒ negada), se llega a un POS equivalente: $(A+B)(B+C)$.  
:p ¿Cuál es la expresión mínima POS obtenida en el ejemplo?  
??x  
$f(A,B,C)=(A+B)(B+C).$  
x??

---

#### Equivalencia SOP–POS

Las dos expresiones mínimas del ejemplo son equivalentes: $AC+B \equiv (A+B)(B+C)$. Aplicando distributiva se puede transformar una en la otra, confirmando que representan la misma función.  
:p ¿Cómo verificas que $AC+B$ y $(A+B)(B+C)$ son equivalentes?  
??x  
Expando $(A+B)(B+C)=AB+AC+B^2+BC=AB+AC+B+BC=B+AC$, usando idempotencia $B^2=B$ y absorción $AB\le B,,BC\le B$.  
x??

---

#### Interpretación de constantes en grupos (POS)

Para POS (maxitérminos), en cada grupo se toman variables constantes, pero a la inversa de SOP: si la variable es constante en $0$, entra sin negar en la suma; si es constante en $1$, entra negada. Las que cambian se eliminan.  
:p En POS, ¿cómo se forma el sumando de un grupo a partir del K-map?  
??x  
Se toman variables constantes: constante $0$ ⇒ literal directo; constante $1$ ⇒ literal negado; variables que cambian se omiten.  
x??

#### Generalización de mapas de Karnaugh

El tamaño del mapa depende del número de variables $m$. Cada mapa tiene $2^m$ celdas:
![[Pasted image 20251104094542.png]]
- 2 variables → $2\times2$
- 3 variables → $2\times4$
- 4 variables → $4\times4$

Se usa hasta 4 variables en la práctica.  
:p ¿Cómo se calcula la cantidad de celdas en un mapa de Karnaugh según el número de variables?  
??x  
El número de celdas es $2^m$, donde $m$ es la cantidad de variables.  
x??

---

#### Celdas adyacentes

Dos celdas son adyacentes cuando solo cambia el valor de **una variable** entre ellas. En el mapa, esto ocurre cuando comparten un lado. En mapas 4×4 también puede haber adyacencia entre bordes opuestos.  
![[Pasted image 20251104094604.png]]
:p ¿Cuándo se considera que dos celdas son adyacentes en un mapa de Karnaugh? 
??x  
Cuando solo cambia una variable entre ellas; en el diagrama, comparten lado (incluyendo bordes opuestos).  
x??

---

#### Agrupaciones válidas

Las agrupaciones se hacen de celdas contiguas, siempre de tamaño $2^n$ (1, 2, 4, 8, 16,…). No están permitidas agrupaciones de 3 o 5 celdas. Cada grupo debe ser **rectangular o cuadrado** (no en forma de T o L).  
:p ¿Qué forma y tamaños deben tener las agrupaciones en un mapa de Karnaugh?  
??x  
Deben ser rectangulares o cuadradas y contener $2^n$ celdas (1,2,4,8,…). No se permiten agrupaciones irregulares.  
x??

---

#### Agrupaciones máximas

Siempre deben elegirse los grupos más grandes posibles. Cuantas más celdas abarque una agrupación, menos variables tendrá el término resultante, logrando una forma más simplificada.  
:p ¿Por qué se prefieren agrupaciones grandes en un mapa de Karnaugh?  
??x  
Porque cuanto más grande sea el grupo, menos variables quedan en el término, reduciendo la función.  
x??

---

#### Implicante

Un **implicante** es cualquier agrupación de $2^n$ celdas (de unos o de ceros). Cada agrupación representa un término simplificado de la función.  
:p ¿Qué es un implicante en el contexto de los mapas de Karnaugh?  
??x  
Es una agrupación de $2^n$ celdas contiguas (de unos o ceros) que representa un término simplificado de la función.  
x??

---

#### Implicante primo (IP)

Un **implicante primo** es un implicante que **no puede ampliarse** incluyendo más celdas sin abarcar ceros (o unos, según el caso). Es una agrupación máxima.  
:p ¿Qué diferencia hay entre un implicante y un implicante primo?  
??x  
El implicante primo es una agrupación máxima: no puede expandirse sin incluir valores opuestos (0 o 1).  
x??

---

#### Implicante primo esencial (IPE)

Un **implicante primo esencial** tiene al menos una celda que **no está incluida** en ningún otro implicante primo. Siempre forma parte de la expresión mínima.  
:p ¿Cuándo se considera que un implicante primo es esencial?  
??x  
Cuando contiene al menos una celda (1 o 0) que no pertenece a ningún otro implicante primo.  
x??

---

#### Expresiones mínimas no únicas

Puede haber **más de una expresión mínima** para una misma función. Todas tienen igual cantidad de términos y de variables por término.  
:p ¿Puede existir más de una expresión mínima en un mapa de Karnaugh?  
??x  
Sí. Puede haber distintas combinaciones de grupos que produzcan expresiones mínimas equivalentes.  
x??

---

#### Ejemplo de 4 variables

Dada $f(A,B,C,D)=\sum m(3,5,7,10,11,13)$, se ubican los minitérminos en un mapa 4×4, se identifican los implicantes primos y luego los esenciales. Los IPE hallados son $BC̅D$ y $AB̅C$, más el implicante $A̅CD$ para cubrir los minitérminos restantes.  
:p ¿Cuál es la expresión mínima obtenida del ejemplo $f(A,B,C,D)=\sum m(3,5,7,10,11,13)$?  
??x  
$f(A,B,C,D)=BC̅D+AB̅C+A̅CD.$  
x??

---

#### Método de Quine-McCluskey

El algoritmo de Quine-McCluskey es un método sistemático (por tabla) que permite identificar implicantes primos y esenciales en funciones con muchas variables, equivalente a usar mapas de Karnaugh pero automatizable.  
![[Pasted image 20251104094725.png]]
![[Pasted image 20251104094743.png]]
:p ¿Qué método puede reemplazar a los mapas de Karnaugh cuando hay muchas variables?  
??x  
El método de Quine-McCluskey.  
x??

---

#### Funciones no totalmente definidas

Cuando ciertos valores de entrada nunca ocurren, se marcan como **“X” (don’t care)**. Estas celdas pueden tomarse como 1 o 0 según convenga para simplificar la función.  
:p ¿Qué representan las “X” en un mapa de Karnaugh?  
??x  
Representan condiciones “don’t care”: combinaciones que no se usan y pueden considerarse 0 o 1 para simplificar.  
x??

---

#### Ejemplo con don’t cares

Para $f(A,B,C,D)=\sum m(1,5,7,9)+d(10,11,12,13,14,15)$, las celdas $X$ se pueden usar como 1 si ayudan a simplificar. En este caso, con los implicantes esenciales $C̅D$ y $BD$ se cubren todos los 1s.  
![[Pasted image 20251104094845.png]]

:p ¿Cuál es la expresión mínima obtenida para el ejemplo con don’t cares?  
??x  
$f(A,B,C,D)=C̅D+BD.$  
x??






![[Pasted image 20250916014105.png]]


![[Pasted image 20250916014125.png]]



