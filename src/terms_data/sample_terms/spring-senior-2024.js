
const analysisAlgorithmClass = [
    {
        term: "logarithms practice",
        description: "logarithms are the inverse of exponentials. They are used to solve exponential equations.",
        prompt: "What is x = log2(8) ?",
        example: "x = 3"
    },
    {
        term: "Logarithms practice 2",
        description: "logarithms are the inverse of exponentials. They are used to solve exponential equations.",
        prompt: "What is x = log3(27) ?",
        example: "x = 3"
    },
    {
        term: "Logarithms practice 4",
        description: "logarithms are the inverse of exponentials. They are used to solve exponential equations.",
        prompt: "What is 10 = logx(1024) ?",
        example: "x = 2"
    },
    {
        term: "Logarithms practice 5",
        prompt: "b ^ (logb(x)) = ?",
        example: "x"
    },
    {
        term: "Logarithms practice 5.b",
        prompt: "3 ^ (log3(6)) = ?",
        example: "6"
    },
    {
        term: "Logarithms practice 6",
        prompt: "log2(n) = whats the notation of this?",
        example: "log2(n) = Θ(logn)"
    },
    {
        term: "Logarithms practice 7",
        prompt: "loge(n) = whats the notation of this?",
        example: "loge(n) = Θ(logn)"
    },
    {
        term: "Logarithms practice 8",
        prompt: "lg^k(n) = whats the notation of this in log2(n) terms?",
        example: "lg^k(n) = (lg2(N))^k",
    },
    {
        term: "Logarithms practice 9",
        prompt: "lg lg(n) = whats the notation of this in log2(n) terms?",
        example: "lg lg(n) = log2(log2(n))"
    },
    {
        term: "Logarithms practice 10",
        description: "65536 = 2^16",
        prompt: "lg lg 65536 = ?",
        example: "lg lg 65536 = 4"
    },
    {
        term: "Logarithms practice 6",
        prompt: "logb(b^x) = x",
        example: "x"
    },
    {
        "term": "Logarithms Practice 6.c",
        "prompt": "log10(100) = ?",
        "example": "2"
    },
    {
        "term": "Logarithms Practice 6.b",
        "prompt": "log2(32) = ?",
        "example": "5"
    },
    {
        "term": "Logarithms Practice 7.c",
        "prompt": "loge(e^3) = ?",
        "example": "3"
    },
    {
        "term": "Logarithms Practice 7.b",
        "prompt": "loge(e^5) = ?",
        "example": "5"
    },
    {
        "term": "Logarithms Practice 8",
        "description": "Given lg(n) = log2(n)",
        "prompt": "If lg(n) = 3, what is n?",
        "example": "8, because lg(n) = log2(n), and 2^3 = 8"
    },
    {
        "term": "Logarithms Practice 9",
        "description": "Given lg(n) = log2(n)",
        "prompt": "If lg(lg(n)) = 2, what is n?",
        "example": "16, because lg(lg(n)) = log2(log2(n)), and 2^2 = 4, so lg(n) = 4, thus n = 2^4 = 16"
    },
    {
        "term": "Logarithms Practice 10",
        "description": "65536 = 2^16",
        "prompt": "lg(65536) = ?",
        "example": "16, because lg(65536) = log2(2^16) = 16"
    },
    {
        "term": "Logarithms Practice 6.d",
        "prompt": "log5(5^7) = ?",
        "example": "7"
    },
    {
        term: "Logarithms practice 3",
        description: "logarithms are the inverse of exponentials. They are used to solve exponential equations.",
        prompt: "What is 2 = log4(x) ?",
        example: "x = 16"
    },
    {
        term: "Exponent logarithms",
        prompt: "How much is ? in log2(5)^3 = ? * log2(5)",
        example: "3. Since it is 3 * log2(5)",
    },
    {
        term: "logarihthm sums",
        prompt: "How much is ? in log2(5) + log2(5) = ?",
        example: "2 * log2(5)"
    },
    {
        term: "logarithm products",
        prompt: "How much is ? in log2(5) * log2(10) = ?",
        example: "log2(50)"
    },
    {
        term: "logarithm division",
        prompt: "How much is ? in log2(5) / log2(10) = ?",
        example: "log10(5)"
    },
    {
        term: "logarithm division II",
        prompt: "How much is ? in log3(8) / log3(2) = ?",
        example: "3 because log2(8) = 3"
    },
    {
        term: "logarithm division III",
        prompt: "How much is ? in log2(16) / log2(4) = ?",
        example: "2 because log4(16) = 2"
    },
    {
        term: "How many operations per second?",
        description: "Consider an algorithm that demands 23 ∗ n^2 per n input operation. The  amount of operations per second to complete an input size of 100 in 10 minutes",
        prompt: "How many operations per second?",
        example: "383 1/3 operations per second"
    },
    {
        term: "What does asymptotic mean",
        description: "Asymptotic means that the function is approaching a limit.",
        prompt: "What does asymptotic mean? Provide an example",
        example: "f(x) = 1/x is asymptotic to 0"
    },
    {
        term: 'Big O',
        description: "O(g(n)) = \{f(n): there exist positive constants c and n_0 such that 0 \le f(n) \le cg(n) for all n \ge n_0\}.\n\
        So \pmb{O(g(n))} is a set of functions that are, after \pmb{n_0}, smaller than or equal to \pmb{g(n)}. The function’s behavior before n_0 is unimportant since big-O notation (also little-o notation) analyzes the function for huge numbers. As an example, let’s have a look at the following figure:",
        prompt: "What does it mean that a function belongs to big O of another?",
        example: "means that when we divide f(n) / g(n), the result is less than or equal to a constant\n\
        f(n) = O(g(n)) means that f(n) grows slower than g(n) or at the same rate"
    },
    {
        term: 'little o',
        description: "Formally defined as: o(g(n)) = \{f(n): for any positive constant c, there exists positive constant n_0 such that 0 \le f(n) < cg(n) for all n \ge n_0\}.\n\n\
        Note that in this definition, the set of functions \pmb{f(n)} are strictly smaller than \pmb{cg(n)}, meaning that little-o notation is a stronger upper bound than big-O notation. In other words, the little-o notation does not allow the function f(n) to have the same growth rate as g(n). \n\
        Intuitively, this means that as the n approaches infinity, f(n) becomes insignificant compared to g(n). In mathematical terms.",
        prompt: "What doe sit mean that a function belongs to little o of another?",
        example: "f(n) = o(g(n)) means that f(n) grows slower than g(n)"
    },
    {
        "term": "Big Omega",
        "description": "Formally defined as: Ω(g(n)) = {f(n): there exist positive constants c and n_0 such that 0 ≤ c*g(n) ≤ f(n) for all n ≥ n_0}.",
        "prompt": "What does it mean that a function belongs to big Omega of another?",
        "example": "f(n) = Ω(g(n)) means that f(n) grows at least as fast as g(n)"
    },
    {
        "term": "Little Omega",
        "description": "Formally defined as: ω(g(n)) = {f(n): for any positive constant c, there exists positive constant n_0 such that 0 ≤ c*g(n) < f(n) for all n ≥ n_0}.",
        "prompt": "What does it mean that a function belongs to little Omega of another?",
        "example": "f(n) = ω(g(n)) means that f(n) grows strictly faster than g(n)"
    },
    {
        "term": "Theta",
        "description": "Formally defined as: Θ(g(n)) = {f(n): there exist positive constants c1, c2, and n_0 such that 0 ≤ c1*g(n) ≤ f(n) ≤ c2*g(n) for all n ≥ n_0}.",
        "prompt": "What does it mean that a function belongs to Theta of another?",
        "example": "f(n) = Θ(g(n)) means that f(n) grows at the same rate as g(n), within constant factors, for large n"
    },
    {
        term: 'Big Omega Concrete Example',
        description: 'f(x) = =2x^2+3x+1 \n\
        g(x) = x^2\n\
        statement: f(x) = Ω(g(x))',
        prompt: "Is the statement true or false?",
        example: "True\n\
        : The statement f(x)=Ω(g(x))f(x)=Ω(g(x)) means that f(x)f(x) grows at least as fast as g(x)g(x) for sufficiently large xx. Here, 2x22x2 dominates the growth of f(x)f(x), and since 2x2≥x22x2≥x2 for all xx, we can conclude that f(x)f(x) is at least as fast as g(x)g(x). A possible choice of constants satisfying the definition of Big Omega could be c=2c=2 and n0=1n0​=1, ensuring 2x2≥2x22x2≥2x2 for all x≥n0x≥n0​."
    },
    {
        "term": "Little Omega Concrete Example",
        "description": "f(x) = 3x^3 + 2x + 1\n\
        g(x) = x^2\n\
        statement: f(x) = ω(g(x))",
        "prompt": "Is the statement true or false?",
        "example": "True\n\
        : The statement f(x) = ω(g(x)) means that f(x) grows strictly faster than g(x) for all sufficiently large x. Here, 3x^3 dominates the growth of f(x), and since x^3 grows faster than x^2 for all x, we can conclude that f(x) is strictly faster than g(x)."
    },
    {
        "term": "Theta Concrete Example",
        "description": "f(x) = 4x^2 + 10x + 5\n\
        g(x) = x^2\n\
        statement: f(x) = Θ(g(x))",
        "prompt": "Is the statement true or false?",
        "example": "True\n\
        : The statement f(x) = Θ(g(x)) means that f(x) grows at the same rate as g(x), within constant factors, for sufficiently large x. The leading term 4x^2 in f(x) and x^2 in g(x) determine their growth rates. Since these are both quadratic terms, f(x) and g(x) grow at comparable rates."
    },
    {
        "term": "Big Omega Concrete Example | 2",
        "description": "f(x) = x + 100\n\
        g(x) = x^2\n\
        statement: f(x) = Ω(g(x))",
        "prompt": "Is the statement true or false?",
        "example": "False\n\
        : The statement f(x) = Ω(g(x)) implies that f(x) grows at least as fast as g(x) for sufficiently large x. However, since x + 100 grows linearly and x^2 grows quadratically, f(x) does not satisfy the condition to be at least as fast as g(x) for large x."
    },
    {
        "term": "Little Omega Example | 2",
        "description": "f(x) = x^2\n\
        g(x) = x^2 + x\n\
        statement: f(x) = ω(g(x))",
        "prompt": "Is the statement true or false?",
        "example": "False\n\\n\
        : The statement f(x) = ω(g(x)) means that f(x) grows strictly faster than g(x) for sufficiently large x. However, both functions have the leading term of x^2, meaning they grow at similar rates, not strictly one faster than the other."
    },
    {
        "term": "Theta Example | 2",
        "description": "f(x) = 2^x\n\
        g(x) = x^10\n\
        statement: f(x) = Θ(g(x))",
        "prompt": "Is the statement true or false?",
        "example": "False\n\
        : The statement f(x) = Θ(g(x)) indicates that f(x) grows at the same rate as g(x), within constant factors, for sufficiently large x. However, 2^x grows exponentially, whereas x^10 grows polynomially, so their growth rates are not comparable, making the statement false."
    },
    {
        term: "explain why doesnt make sense",
        prompt: "Why does it not make sense to say that the runing time of an algorithm A is at least O(n^2)",
        example: "Because O(n^2) is an upper bound, so it makes no sense to say that the running time of an algorithm is at least faster than slower than n^2."
    }
]


module.exports = {
    analysisAlgorithmClass
}






