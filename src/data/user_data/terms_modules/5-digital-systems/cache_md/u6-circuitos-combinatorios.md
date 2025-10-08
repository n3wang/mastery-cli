

#### Decodificadores y Código BCD

---

:p **Pregunta 1**  
Si se tiene un decodificador binario de 16 salidas, ¿cuántas entradas se necesitan?

??x  
La relación general es:  
$$\text{Número de salidas} = 2^{\text{número de entradas}}$$

Se cumple:  
$$2^n = 16 \implies n = 4$$

**Respuesta:** 4 entradas.  
x??

---

:p **Pregunta 2**  
¿Cómo se representa el número decimal 24 en código BCD (decimal codificado en binario)?
![[Pasted image 20250930112028.png]]
??x  
En BCD cada dígito decimal se escribe en 4 bits
- **2** → $0010$
- **4** → $0100$
Entonces:  
$$24_{10} = 0010 ; 0100_{BCD} = 00100100$$

**Respuesta correcta:** **Opción E (00100100)**.  
x??

---

#### Decodificadores binarios

:p **Pregunta 5**  
El decodificador es un circuito combinacional que transmite datos desde sus entradas hacia sus salidas.

??x  
Un **decodificador binario** toma un número binario de $n$ bits en las entradas y activa **exactamente una salida** de las $2^n$ posibles.  
Esto significa que **solo una salida estará activa a la vez**, y las demás estarán en estado inactivo.

**Respuesta:** **Verdadero (A)**.  
x??

---

:p El decodificador binario activa solo una de sus salidas a la vez, según el código recibido en sus entradas.
??x

x??