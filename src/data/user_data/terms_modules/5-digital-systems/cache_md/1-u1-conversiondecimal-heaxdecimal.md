### **Ejercicio 1 – Conversión decimal a hexadecimal**

:p _El número 16 en decimal, ¿cuál es su equivalente en hexadecimal?
- Opciones:  
    A) 10  
    B) FF  
    C) 16  
    D) F
?x
👉 Respuesta correcta: **10**  
Porque en hexadecimal, la base es 16. Entonces:

#### Conversión de base decimal a binario
a) Convierte el número decimal 25 a su equivalente en sistema binario.
??x
a)
Dividimos sucesivamente entre 2 hasta que el cociente sea 0 , $y$ luego tomamos los restos en orden inverso:

$$
\begin{gathered}
25 \div 2=12 \text { resto } 1 \\
12 \div 2=6 \text { resto } 0 \\
6 \div 2=3 \text { resto } 0 \\
3 \div 2=1 \text { resto } 1 \\
1 \div 2=0 \text { resto } 1
\end{gathered}
$$


Por lo tanto:

$$
25_{10}=11001_2
$$
x??

#### 2. Conversión de base decimal a octal
2. Conversión de base decimal a octal
b) Convierte el número decimal 75 a sistema octal.
??x
b)

Dividimos sucesivamente entre 8:

$$
\begin{gathered}
75 \div 8=9 \text { resto } 3 \\
9 \div 8=1 \text { resto } 1 \\
1 \div 8=0 \text { resto } 1 \\
75_{10}=113_8
\end{gathered}
$$
x??

#### 3. Expansión posicional
c) Expresa el número decimal 528 en forma de suma de potencias de base 10 . 
??x
c)

$$
528=5 \times 10^2+2 \times 10^1+8 \times 10^0
$$
x??


#### 4. Verificación de número binario
d) Verifica si el número 10112 es un número válido en sistema binario.
?x
d)En binario los únicos símbolos permitidos son 0 y 1 . Como el número tiene un 2 , no es válido en sistema binario.


#### 1. Conversión de decimal a binario
a) Convierte el número decimal 50 a binario.
??x
a)Dividimos sucesivamente entre 2 :
$$
\begin{gathered}
50 \div 2=25 \text { resto } 0 \\
25 \div 2=12 \text { resto } 1 \\
12 \div 2=6 \text { resto } 0 \\
6 \div 2=3 \text { resto } 0 \\
3 \div 2=1 \text { resto } 1 \\
1 \div 2=0 \text { resto } 1
\end{gathered}
$$


Ordenando de abajo hacia arriba:

$$
50_{10}=110010_2
$$
x??

#### 2. Conversión de decimal a octal
b) Convierte el número decimal 200 a octal.
??x
b)

Dividimos sucesivamente entre 8:

$$
\begin{gathered}
200 \div 8=25 \text { resto } 0 \\
25 \div 8=3 \text { resto } 1 \\
3 \div 8=0 \text { resto } 3
\end{gathered}
$$


Ordenando de abajo hacia arriba:

$$
200_{10}=310_8
$$
x??

#### 3. Conversión de decimal a hexadecimal
c) Convierte el número decimal 255 a sistema hexadecimal.
??x
c)

Dividimos sucesivamente entre 16 :

$$
\begin{aligned}
255 \div 16 & =15 \text { resto } 15(F) \\
15 \div 16 & =0 \text { resto } 15(F)
\end{aligned}
$$


Por lo tanto:

$$
255_{10}=F F_{16}
$$

x??

---

#### 4. Conversión de binario a decimal
d) Convierte el número $101101_2$ a decimal.
??x
d)

$$
\begin{gathered}
101101_2=1 \times 2^5+0 \times 2^4+1 \times 2^3+1 \times 2^2+0 \times 2^1+1 \times 2^0 \\
=32+0+8+4+0+1=45 \\
101101_2=45_{10}
\end{gathered}
$$
x??

---

#### 1. Conversión de binario a decimal
a) Convierte el número $101011_2$ a decimal.
??x
a)

$$
\begin{gathered}
101011_2=1 \times 2^5+0 \times 2^4+1 \times 2^3+0 \times 2^2+1 \times 2^1+1 \times 2^0 \\
=32+0+8+0+2+1=43 \\
101011_2=43_{10}
\end{gathered}
$$
x??

#### 2. Conversión de decimal a binario
b) Convierte el número $37_{10}$ a binario.
??x
b)

División sucesiva entre 2 :

$$
\begin{gathered}
37 \div 2=18 \text { resto } 1 \\
18 \div 2=9 \text { resto } 0 \\
9 \div 2=4 \text { resto } 1 \\
4 \div 2=2 \text { resto } 0 \\
2 \div 2=1 \text { resto } 0 \\
1 \div 2=0 \text { resto } 1
\end{gathered}
$$


Leyendo restos de abajo hacia arriba:

$$
37_{10}=100101_2
$$

x??

---

#### 3. Conversión de decimal fraccionario a binario
c) Convierte el número $12,625_{10}$ a binario.
??x
c) Parte entera:

$$
12_{10}=1100_2
$$
Parte fraccionaria $(0,625)$ :
$$
\begin{gathered}
0,625 \times 2=1,25 \Rightarrow 1 \\
0,25 \times 2=0,5 \Rightarrow 0 \\
0,5 \times 2=1,0 \Rightarrow 1 \\
0,625_{10}=101_2
\end{gathered}
$$Resultado total:

$$
12,625_{10}=1100,101_2
$$
x??


#### 4. Conversión de binario fraccionario a decimal
d) Convierte 101, $101_2$ a decimal.
??x
d)

Parte entera:

$$
101_2=5_{10}
$$


Parte fraccionaria:

$$
\begin{gathered}
0,101_2=1 \times \frac{1}{2}+0 \times \frac{1}{4}+1 \times \frac{1}{8} \\
=\frac{1}{2}+0+\frac{1}{8}=\frac{5}{8}=0,625
\end{gathered}
$$


Resultado total:

$$
101,101_2=5,625_{10}
$$

x??

#### Del sistema binario al decimal con parte fraccionaria
Se quiere pasar el número $110010,011_{\mathrm{b}}$ a decimal
Para realizarlo, se puede separar en dos partes (entera y fraccionaria).
La parte entera se hizo anteriormente y se obtuvo como resultado: $110010_b=50_d$
Para la parte fraccionaria, el procedimiento es el mismo, pero al estar del lado derecho de la coma la posición va disminuyendo en uno de izquierda a derecha, empezando en -1 .

$$
\begin{aligned}
& 0,011_b=0 \times 2^{-1}+1 \times 2^{-2}+1 \times 2^{-3} \\
& 0,011_b=0 \times \frac{1}{2}+1 \times \frac{1}{4}+1 \times \frac{1}{8} \\
& 0,011_b=0+0,25+0,125=0,375_d
\end{aligned}
$$


Uniendo ambos resultados se obtiene como resultado final:

$$
110010,011_b=50,375_d
$$

---

#### 3. Conversión de decimal fraccionario a binario
c) Convierte el número $19,375_d$ a binario.
??x
c)

Parte entera:

$$
19_{10}=10011_b
$$


Parte fraccionaria $(0,375)$ :

$$
\begin{gathered}
0,375 \times 2=0,75 \Rightarrow 0 \\
0,75 \times 2=1,5 \Rightarrow 1 \\
0,5 \times 2=1,0 \Rightarrow 1 \\
0,375_d=011_b
\end{gathered}
$$


Resultado total:

$$
19,375_d=10011,011_b
$$

x??

---

#### 4. Conversión de binario fraccionario a decimal
d) Convierte el número $1110,111_b$ a decimal.
??x
d)

Parte entera:

$$
1110_b=1 \times 2^3+1 \times 2^2+1 \times 2^1+0 \times 2^0=8+4+2+0=14_d
$$


Parte fraccionaria:

$$
0,111_b=1 \times 2^{-1}+1 \times 2^{-2}+1 \times 2^{-3}=0,5+0,25+0,125=0,875_d
$$


Resultado total:

$$
1110,111_b=14,875_d
$$

---

#### Del sistema hexadecimal al octal
Se quiere pasar el número $32,6_{16}$ a octal.
:p Cuanto es en octal? 
??x
1. Pasamos cada dígito hex a 4 bits binarios:

$$
\begin{gathered}
3_{16}=0011_b, \quad 2_{16}=0010_b, \quad 6_{16}=0110_b \\
32,6_{16}=00110010,0110_b
\end{gathered}
$$

2. Agrupamos en grupos de 3 bits (octal):

Parte entera:

$$
\begin{gathered}
00110010_b=0110010_b=110010_b \\
110010_b=62_o
\end{gathered}
$$


Parte fraccionaria:

$$
\begin{gathered}
0110_b=0110_b \\
011_b=3_o
\end{gathered}
$$

3. Resultado final:

$$
32,6_{16}=62,3_o
$$

---

Cuando restás en binario, el procedimiento es columna por columna con "borrow" (préstamos entre bits), pero el resultado en decimal es el mismo que si hubieras hecho la resta directamente en decimal.

En tu ejemplo:

$$
37_{10}-10_{10}=27_{10}
$$


En binario:

$$
\begin{gathered}
37_{10}=100101_2, \quad 10_{10}=1010_2 \\
100101_2-1010_2=11011_2
\end{gathered}
$$


Y al pasar $11011_2$ a decimal:

$$
11011_2=16+8+2+1=27_{10}
$$

* El resultado coincide siempre, porque las operaciones binarias están definidas para que conserven las mismas propiedades que en decimal (solo cambia la base en que trabajamos).
¿Querés que te prepare ejercicios de suma y resta en binario (con verificación en decimal) para que practiques ambos enfoques?


![[Pasted image 20250829201950.png]]


---

Add that to the bio
- Scheduler

