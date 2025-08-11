## Analysis Algorithm Class

#### logarithms practice
logarithms are the inverse of exponentials. They are used to solve exponential equations.

:p What is x = log2(8) ?
??x
x = 3
x??

#### Logarithms practice 2
logarithms are the inverse of exponentials. They are used to solve exponential equations.

:p What is x = log3(27) ?
??x
x = 3
x??

#### Logarithms practice 4
logarithms are the inverse of exponentials. They are used to solve exponential equations.

:p What is 10 = logx(1024) ?
??x
x = 2
x??

#### Logarithms practice 5
:p b ^ (logb(x)) = ?
??x
x
x??

#### Logarithms practice 5.b
:p 3 ^ (log3(6)) = ?
??x
6
x??

#### Logarithms practice 6
:p log2(n) = whats the notation of this?
??x
log2(n) = Θ(logn)
x??

#### Logarithms practice 7
:p loge(n) = whats the notation of this?
??x
loge(n) = Θ(logn)
x??

#### Logarithms practice 8
:p lg^k(n) = whats the notation of this in log2(n) terms?
??x
lg^k(n) = (lg2(N))^k
x??

#### Logarithms practice 9
:p lg lg(n) = whats the notation of this in log2(n) terms?
??x
lg lg(n) = log2(log2(n))
x??

#### Logarithms practice 10
65536 = 2^16

:p lg lg 65536 = ?
??x
lg lg 65536 = 4
x??

#### Logarithms practice 6
:p logb(b^x) = x
??x
x
x??

#### Logarithms Practice 6.c
:p log10(100) = ?
??x
2
x??

#### Logarithms Practice 6.b
:p log2(32) = ?
??x
5
x??

#### Logarithms Practice 7.c
:p loge(e^3) = ?
??x
3
x??

#### Logarithms Practice 7.b
:p loge(e^5) = ?
??x
5
x??

#### Logarithms Practice 8
Given lg(n) = log2(n)

:p If lg(n) = 3, what is n?
??x
8, because lg(n) = log2(n), and 2^3 = 8
x??

#### Logarithms Practice 9
Given lg(n) = log2(n)

:p If lg(lg(n)) = 2, what is n?
??x
16, because lg(lg(n)) = log2(log2(n)), and 2^2 = 4, so lg(n) = 4, thus n = 2^4 = 16
x??

#### Logarithms Practice 10
65536 = 2^16

:p lg(65536) = ?
??x
16, because lg(65536) = log2(2^16) = 16
x??

#### Logarithms Practice 6.d
:p log5(5^7) = ?
??x
7
x??

#### Logarithms practice 3
logarithms are the inverse of exponentials. They are used to solve exponential equations.

:p What is 2 = log4(x) ?
??x
x = 16
x??

#### Exponent logarithms
:p How much is ? in log2(5)^3 = ? * log2(5)
??x
3. Since it is 3 * log2(5)
x??

#### logarihthm sums
:p How much is ? in log2(5) + log2(5) = ?
??x
2 * log2(5)
x??

#### logarithm products
:p How much is ? in log2(5) * log2(10) = ?
??x
log2(50)
x??

#### logarithm division
:p How much is ? in log2(5) / log2(10) = ?
??x
log10(5)
x??

#### logarithm division II
:p How much is ? in log3(8) / log3(2) = ?
??x
3 because log2(8) = 3
x??

#### logarithm division III
:p How much is ? in log2(16) / log2(4) = ?
??x
2 because log4(16) = 2
x??

#### How many operations per second?
Consider an algorithm that demands 23 ∗ n^2 per n input operation. The  amount of operations per second to complete an input size of 100 in 10 minutes

:p How many operations per second?
??x
383 1/3 operations per second
x??

#### What does asymptotic mean
Asymptotic means that the function is approaching a limit.

:p What does asymptotic mean? Provide an example
??x
f(x) = 1/x is asymptotic to 0
x??

#### Big O
O(g(n)) = {f(n): there exist positive constants c and n_0 such that 0 le f(n) le cg(n) for all n ge n_0}.
So pmb{O(g(n))} is a set of functions that are, after pmb{n_0}, smaller than or equal to pmb{g(n)}. The function's behavior before n_0 is unimportant since big-O notation (also little-o notation) analyzes the function for huge numbers. As an example, let's have a look at the following figure:

:p What does it mean that a function belongs to big O of another?
??x
means that when we divide f(n) / g(n), the result is less than or equal to a constant
f(n) = O(g(n)) means that f(n) grows slower than g(n) or at the same rate
x??

#### little o
Formally defined as: o(g(n)) = {f(n): for any positive constant c, there exists positive constant n_0 such that 0 le f(n) < cg(n) for all n ge n_0}.

Note that in this definition, the set of functions pmb{f(n)} are strictly smaller than pmb{cg(n)}, meaning that little-o notation is a stronger upper bound than big-O notation. In other words, the little-o notation does not allow the function f(n) to have the same growth rate as g(n). 
Intuitively, this means that as the n approaches infinity, f(n) becomes insignificant compared to g(n). In mathematical terms.

:p What doe sit mean that a function belongs to little o of another?
??x
f(n) = o(g(n)) means that f(n) grows slower than g(n)
x??

#### Big Omega
Formally defined as: Ω(g(n)) = {f(n): there exist positive constants c and n_0 such that 0 ≤ c*g(n) ≤ f(n) for all n ≥ n_0}.

:p What does it mean that a function belongs to big Omega of another?
??x
f(n) = Ω(g(n)) means that f(n) grows at least as fast as g(n)
x??

#### Little Omega
Formally defined as: ω(g(n)) = {f(n): for any positive constant c, there exists positive constant n_0 such that 0 ≤ c*g(n) < f(n) for all n ≥ n_0}.

:p What does it mean that a function belongs to little Omega of another?
??x
f(n) = ω(g(n)) means that f(n) grows strictly faster than g(n)
x??

#### Theta
Formally defined as: Θ(g(n)) = {f(n): there exist positive constants c1, c2, and n_0 such that 0 ≤ c1*g(n) ≤ f(n) ≤ c2*g(n) for all n ≥ n_0}.

:p What does it mean that a function belongs to Theta of another?
??x
f(n) = Θ(g(n)) means that f(n) grows at the same rate as g(n), within constant factors, for large n
x??

#### Big Omega Concrete Example
f(x) = =2x^2+3x+1 
g(x) = x^2
statement: f(x) = Ω(g(x))

:p Is the statement true or false?
??x
True
: The statement f(x)=Ω(g(x))f(x)=Ω(g(x)) means that f(x)f(x) grows at least as fast as g(x)g(x) for sufficiently large xx. Here, 2x22x2 dominates the growth of f(x)f(x), and since 2x2≥x22x2≥x2 for all xx, we can conclude that f(x)f(x) is at least as fast as g(x)g(x). A possible choice of constants satisfying the definition of Big Omega could be c=2c=2 and n0=1n0​=1, ensuring 2x2≥2x22x2≥2x2 for all x≥n0x≥n0​.
x??

#### Little Omega Concrete Example
f(x) = 3x^3 + 2x + 1
g(x) = x^2
statement: f(x) = ω(g(x))

:p Is the statement true or false?
??x
True
: The statement f(x) = ω(g(x)) means that f(x) grows strictly faster than g(x) for all sufficiently large x. Here, 3x^3 dominates the growth of f(x), and since x^3 grows faster than x^2 for all x, we can conclude that f(x) is strictly faster than g(x).
x??

#### Theta Concrete Example
f(x) = 4x^2 + 10x + 5
g(x) = x^2
statement: f(x) = Θ(g(x))

:p Is the statement true or false?
??x
True
: The statement f(x) = Θ(g(x)) means that f(x) grows at the same rate as g(x), within constant factors, for sufficiently large x. The leading term 4x^2 in f(x) and x^2 in g(x) determine their growth rates. Since these are both quadratic terms, f(x) and g(x) grow at comparable rates.
x??

#### Big Omega Concrete Example | 2
f(x) = x + 100
g(x) = x^2
statement: f(x) = Ω(g(x))

:p Is the statement true or false?
??x
False
: The statement f(x) = Ω(g(x)) implies that f(x) grows at least as fast as g(x) for sufficiently large x. However, since x + 100 grows linearly and x^2 grows quadratically, f(x) does not satisfy the condition to be at least as fast as g(x) for large x.
x??

#### Little Omega Example | 2
f(x) = x^2
g(x) = x^2 + x
statement: f(x) = ω(g(x))

:p Is the statement true or false?
??x
False
: The statement f(x) = ω(g(x)) means that f(x) grows strictly faster than g(x) for sufficiently large x. However, both functions have the leading term of x^2, meaning they grow at similar rates, not strictly one faster than the other.
x??

#### Theta Example | 2
f(x) = 2^x
g(x) = x^10
statement: f(x) = Θ(g(x))

:p Is the statement true or false?
??x
False
: The statement f(x) = Θ(g(x)) indicates that f(x) grows at the same rate as g(x), within constant factors, for sufficiently large x. However, 2^x grows exponentially, whereas x^10 grows polynomially, so their growth rates are not comparable, making the statement false.
x??

#### explain why doesnt make sense
:p Why does it not make sense to say that the runing time of an algorithm A is at least O(n^2)
??x
Because O(n^2) is an upper bound, so it makes no sense to say that the running time of an algorithm is at least faster than slower than n^2.
x??