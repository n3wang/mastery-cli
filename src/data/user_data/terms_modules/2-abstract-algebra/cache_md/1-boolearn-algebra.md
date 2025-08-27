

---

:d Que es la Tautologias, Contradiccion en algebra abstracta?
Definición 1.8 (Contradicción) Son proposiciones siempre falsas.

Que es conjuncion y como se describe matematicamente?
??x
Definición 1.4 ( $\mathbf{Y}$ lógico o conjunción) La proposición $p \wedge q$ se lee " $p$ y $q$ ". Tal como se aprecia en la siguiente tabla de verdad, si se afirma que se tiene $p \wedge q$, lo que se está diciendo es que ambas proposiciones son verdaderas.

| $p$ | $q$ | $p \wedge q$ |
| :-: | :-: | :----------: |
| $V$ | $V$ |     $V$      |
| $V$ | $F$ |     $F$      |
| $F$ | $V$ |     $F$      |
| $F$ | $F$ |     $F$      |
x??

#### Tautologias basicas practicas I
Proposición 1.9 (Tautologías básicas) Las siguientes son tautologías:
Complete the following:
- Dominancia: $p \vee V \Longleftrightarrow ..., \quad p \wedge F \Longleftrightarrow ...$.
- Identidad: $p \wedge V \Longleftrightarrow p, \quad p \vee F \Longleftrightarrow p$.
- Idempotencia: $p \wedge p \Longleftrightarrow ..., \quad p \vee p \Longleftrightarrow ...$.
- Doble negación: $\neg(\neg p) \Longleftrightarrow ...$ (recuerde que $\neg p$ es lo mismo que $\bar{p}$ ).
??x
- Dominancia: $p \vee V \Longleftrightarrow V, \quad p \wedge F \Longleftrightarrow F$.
- Identidad: $p \wedge V \Longleftrightarrow p, \quad p \vee F \Longleftrightarrow p$.
- Idempotencia: $p \wedge p \Longleftrightarrow p, \quad p \vee p \Longleftrightarrow p$.
- Doble negación: $\neg(\neg p) \Longleftrightarrow p$ (recuerde que $\neg p$ es lo mismo que $\bar{p}$ ).
x??


#### Tautologias basicas practicas II
Proposición 1.9 (Tautologías básicas) Las siguientes son tautologías:
Complete the following:

- Tercio excluso: $p \vee \bar{p} \Longleftrightarrow ...$.
- Consistencia: $p \wedge \bar{p} \Longleftrightarrow ...$.
- Absorción: $p \vee(p \wedge q) \Longleftrightarrow ..., \quad p \wedge(p \vee q) \Longleftrightarrow ...$.
- Relajación: $p \wedge q \Longrightarrow ..., \quad p \Rightarrow p \vee q$.
- Caracterización de la implicancia: $(p \Rightarrow q) \Longleftrightarrow ... \vee ...$.
??x
- Tercio excluso: $p \vee \bar{p} \Longleftrightarrow V$.
- Consistencia: $p \wedge \bar{p} \Longleftrightarrow F$.
- Absorción: $p \vee(p \wedge q) \Longleftrightarrow p, \quad p \wedge(p \vee q) \Longleftrightarrow p$.
- Relajación: $p \wedge q \Longrightarrow p, \quad p \Rightarrow p \vee q$.
- Caracterización de la implicancia: $(p \Rightarrow q) \Longleftrightarrow \bar{p} \vee q$.
x??


Proposición 1.10 Las siguientes son tautologías:

Leyes de De Morgan: Mostra un ejemplo de ley de morgan en los siguientes caos
- $\overline{p \wedge q} \Longleftrightarrow ...., \quad \overline{p \vee q} \Longleftrightarrow ...$.
:p completa lo faltante dando ejemplo la ley de Morgan
?x
- $\overline{p \wedge q} \Longleftrightarrow \bar{p} \vee \bar{q}, \quad \overline{p \vee q} \Longleftrightarrow \bar{p} \wedge \bar{q}$.


- Conmutatividad.
:p completa lo faltante dando ejemplo la ley de commutatividad
?x
$$
\begin{aligned}
& -\operatorname{del} \vee: p \vee q \Longleftrightarrow q \vee p . \\
& -\operatorname{del} \wedge: p \wedge q \Longleftrightarrow q \wedge p .
\end{aligned}
$$



- Asociatividad.

$$
\begin{aligned}
& -\operatorname{del} \vee: p \vee(q \vee r) \Longleftrightarrow(p \vee q) \vee r . \\
& -\operatorname{del} \wedge: p \wedge(q \wedge r) \Longleftrightarrow(p \wedge q) \wedge r .
\end{aligned}
$$

#### Distributividad.
:p completa lo faltante dando ejemplo la ley de Distributividad
- del $\wedge$ con respecto al $\vee$ :
$$
p \wedge(q \vee r) \Longleftrightarrow...., \quad(q \vee r) \wedge p \Longleftrightarrow.... .
$$
- del $\vee$ con respecto al $\wedge$ :
$$
p \vee(q \wedge r) \Longleftrightarrow..., \quad(q \wedge r) \vee p \Longleftrightarrow.....
$$
??x
- del $\wedge$ con respecto al $\vee$ :
$$
p \wedge(q \vee r) \Longleftrightarrow(p \wedge q) \vee(p \wedge r), \quad(q \vee r) \wedge p \Longleftrightarrow(q \wedge p) \vee(r \wedge p) .
$$
- del $\vee$ con respecto al $\wedge$ :
$$
p \vee(q \wedge r) \Longleftrightarrow(p \vee q) \wedge(p \vee r), \quad(q \wedge r) \vee p \Longleftrightarrow(q \vee p) \wedge(r \vee p) .
$$
x??

#### Transitividad.
- del $\Rightarrow$ :
$$
(p \Rightarrow q) \wedge(q \Rightarrow r) \Longrightarrow(p \Rightarrow r)
$$
- de la $\Longleftrightarrow$ :
$$
(p \Longleftrightarrow q) \wedge(q \Longleftrightarrow r) \Longrightarrow(p \Longleftrightarrow r)
$$
??x
del $\Rightarrow$ :
$$
(p \Rightarrow q) \wedge(q \Rightarrow r) \Longrightarrow ....
$$
- de la $\Longleftrightarrow$ :
$$
(p \Longleftrightarrow q) \wedge(q \Longleftrightarrow r) \Longrightarrow ....
$$
x??


#### Preoposiciones
Si la proposicion (p ∧ q) ∨ p es falsa, necesariamente q es falsa.
?x
$(p∧q)∨p(p\land q)\lor p es pp (absorción).$ 
Si es falsa ⇒ pp es falsa; nada fuerza a qq. **Falso**.

La proposici´on p =⇒ F es siempre falsa.
?x
$p⇒F≡¬pp\Rightarrow F \equiv \neg p$. No es “siempre falsa”; es verdadera cuando pp es falsa. **Falso**.
    
29. p⇒¬p≡¬pp\Rightarrow \neg p \equiv \neg p. Verdadera si pp es falsa y falsa si pp es verdadera. No es “siempre falsa”. **Falso**.
    
30. Si pp es falsa, p⇒qp\Rightarrow q es verdadera (regla del antecedente falso). **Verdadero**.
    
31. p⇒qp\Rightarrow q es verdadera y pp es verdadera ⇒ por modus ponens, qq es verdadera. **Verdadero**.
    
32. p⇒(q⇒r)p\Rightarrow (q\Rightarrow r) verdadera y pp verdadera ⇒ q⇒rq\Rightarrow r verdadera. De ahí no se sigue rr (podría ser qq falsa). **Falso**.
    
33. (p⇒q)⇒r(p\Rightarrow q)\Rightarrow r falsa ⇒ antecedente verdadero y rr falsa ⇒ p⇒qp\Rightarrow q verdadera. Con pp verdadera, por modus ponens qq verdadera. **Verdadero**.
    
34. p⇔V≡pp\Leftrightarrow V \equiv p. Tienen el mismo valor. **Verdadero**.
    
35. p⇔F≡¬pp\Leftrightarrow F \equiv \neg p. Y ¬p∨F≡¬p\neg p \lor F \equiv \neg p. Son equivalentes. **Verdadero**.
    
36. (p⇔q)⇒(p⇒q)(p\Leftrightarrow q)\Rightarrow(p\Rightarrow q) es tautología: si pp y qq tienen el mismo valor, p⇒qp\Rightarrow q resulta verdadera; si el antecedente es falso, toda la implicación es verdadera. **Verdadero**.
    
37. (r⇒p)∧(p⇒q)(r\Rightarrow p)\land(p\Rightarrow q) verdadera ⇒ por silogismo hipotético, r⇒qr\Rightarrow q. **Verdadero**.
    
38. (¬q⇒¬p)∧(q⇒r)⇒(r⇒¬p)(\neg q\Rightarrow \neg p)\land(q\Rightarrow r)\Rightarrow(r\Rightarrow \neg p) **no** es tautología. Contraej.: p=T,q=T,r=Tp=T,q=T,r=T: antecedente verdadero y r⇒¬pr\Rightarrow\neg p es T⇒FT\Rightarrow F (falsa). **Falso**.
    
39. (p⇒q)⇔(¬p⇒¬q)(p\Rightarrow q)\Leftrightarrow(\neg p\Rightarrow \neg q) compara con el **inverso** (no con la contraposición). No son equivalentes siempre. Ej.: p=F,q=Tp=F,q=T: p⇒q=Tp\Rightarrow q=T, ¬p⇒¬q=T⇒F=F\neg p\Rightarrow \neg q= T\Rightarrow F=F. **Falso**.
    
40. ¬(p⇒q)≡p∧¬q\neg(p\Rightarrow q)\equiv p\land \neg q, no p∧qp\land q. **Falso**.
    
41. ¬(p⇒q)\neg(p\Rightarrow q) no es ¬q⇒¬p\neg q\Rightarrow \neg p (eso es la contraposición de p⇒qp\Rightarrow q, equivalente al original). La negación es p∧¬qp\land \neg q. **Falso**.
    

**Resumen rápido:**  
27 F, 28 F, 29 F, 30 V, 31 V, 32 F, 33 V, 34 V, 35 V, 36 V, 37 V, 38 F, 39 F, 40 F, 41 F.

---



















