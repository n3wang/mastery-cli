const designing_good_charts = [
    {
        term: "choosing chart",
        prompt: "What chart to se when you see different location based data with frequenccies?",
        example: "Heatmap, choropleth map"
    },
    {
        term: "bar charts",
        prompt: "What to consider when having a bar chart?",
        example: "If it has long names, consider having that on the y axis, sort the numeric values, make sure they have enough space",
        attachment: "./img/2023-03-22-19-54-00.png"
    },
    {
        term: "line charts",
        prompt: "What to consider when having a line chart?",
        example: "They are good for showing trends, but not good for showing the exact values. If you want to show the exact values, consider using a scatter plot, using it implies a varying relationship between the x values",
    }
    ,
    {
        term: "colors",
        prompt: "What to consider when using colors?",
        example: "You can use ColorBrewer to choose the colors, let the intensity make a change.\n\
        You can highlight the story you want to tell.",
    },
    {
        term: "scatter plot",
        prompt: "When can You use Scatter Plots?",
        example: "You can use them when you want to see clustering."
    }
]


// No programming questions, largely be conceptualized on what the things are about.
const numpy = [
    {
        term: "Why is numpy preferred?",
        prompt: "Why is numpy preferred? | How are Numpy arrays better than Python's lists?",
        example: "Suports multi-dimensional arrays. Provides efficien functions for complex computational arrays. Takes the weaknesses of Python such as Dynamically typed.S ",
    },
    {
        term: "What are ndarrays in Numpy?",
        prompt: "What are ndarrays features in Numpy?",
        example: "When the size of ndarrays is changed, it results in a new array and the original array is deleted.\n\
        The ndarrays are bound to store homogeneous data.\n\
        They provide functions to perform advanced mathematical operations in an efficient manner"
    },
    {
        term: "How to reverse a Numpy array",
        prompt: "How to reverse a Numpy array",
        description: "Use flipud() to reverse the order of elements in an array along the first axis",
        example: "np.flipud(arr)"   
    },
    {
        term: "Calgulate frequency",
        prompt: "How to calculate the frequency of a Numpy array",
        description: "Use bincount() to calculate the frequency of a Numpy array\n\
        :m ```py\n\
        import numpy as np\n\
        arr = np.array([1, 2, 1, 3, 5, 0, 0, 0, 2, 3])\n\n\
        [3 2 2 2 0 1]\n\
        ```",
        example: "np.bincount(arr)"
    },
    {
        term: 'arr[:, 0]',
        prompt: "What will the folllowing print?",
        description: "import numpy as np\n\
        \n\
        arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])\n\
        new_arr = arr[:, 0]\n\
        print(new_arr)",
        example: "[1, 5]"
    },
    {
        term: "Multiply 2 numpy array matrices | Multiply 2 numpy array vectors",
        prompt: "Multiply 2 numpy array matrices | Multiply 2 numpy array vectors",
        description: 'A = np.arange(15,24).reshape(3,3)\n\
        B = np.arange(20,29).reshape(3,3)\n\
        print("A: ",A)\n\
        print("B: ",B)\n\
        \n\
        # Multiply A and B\n\
        print("Result: ", result)',
        example: "result = A.dot(B)"
    },
    {
        term: "Verctorized add",
        prompt: "What will the following print?",
        description: "\n\
        Function Vectorization technically means that the function is applied to all elements in the array. Typically, certain python functionalities on arrays (such as loops) are slower in nature because python arrays can contain elements of different data types. Since the C program expects a specific datatype, there are chances of compiler optimisation which makes C code run faster. Since NumPy arrays support storing elements of a single datatype, most of the implementations of the functions written in NumPy meant for arithmetic, logical operations etc have optimised C program code under their hood. Additionally, NumPy also helps developers create their own vectorised functions by following the below steps.\n\
        \n\
        def add(arr1, arr2):\n\
            return (arr1 + arr2)\n\
        \n\
        arr1 = np.array([1,2,3])\n\
        arr2 = np.array([4,5,6])\n\
        \n\
        #vectorize add method\n\
        vectorized_add = np.vectorize(add)\n\
        \n\
        #call vectorized method\n\
        result = vectorized_add(arr1, arr2)\n\n\
        print(result)",
        example: "[5, 7, 9]"
    },
    {
        term: "VStack() in Numpy() || hstack() in Numpy()",
        prompt: "Main difference is that the hstack method combines arrays horizontally whereas the vstack method combines arrays vertically.\n\
        What will the following print?",
        description: '\n\
        ```py \n\
        import numpy as np\n\
        a = np.array([1,2,3])\n\
        b = np.array([4,5,6])\n\
        \n\
        # vstack arrays\n\
        c = np.vstack((a,b))\n\
        print("After vstack: \n",c)\n\
        # hstack arrays\n\
        d = np.hstack((a,b))\n\
        print("After hstack: \n",d)',
        example: "After vstack: \n [[1 2 3]\n\
        [4 5 6]]\n\
        After hstack: \n [1 2 3 4 5 6]"
    },
    {
        term: "Create an 2d matrix with arange",
        prompt: "Create a 2d matri with arange that is 4 rows and 2 columns",
        answer: "```py\n\
        import numpy as np\n\
        \n\
        arr = np.arange(8).reshape(4,2)"
    },
]


const pandas = [

    // Ilocs and range selections: https://jakevdp.github.io/PythonDataScienceHandbook/03.02-data-indexing-and-selection.html

    // Operations in pandas: https://jakevdp.github.io/PythonDataScienceHandbook/03.03-operations-in-pandas.html

    // Handling Na values: https://jakevdp.github.io/PythonDataScienceHandbook/03.04-missing-values.html
    // Fillings, strategies and axis, Dropping: Dropping specifics, and axis
    // {
    //     term: ""
    // }

]

const sql = [
    {
        term: "date selections with operation",
        prompt: "Select timestamp and column add_1 which is timestamp + 1 second and another as 1 hour",
        example: "SELECT timestamp, timestamp + INTERVAL 1 SECOND AS add_1, timestamp + INTERVAL 1 HOUR AS add_1_hour",

    }
]


const statistics = [
    {
        term: "Difference descriptive and inferential statistics",
        prompt: "What is the difference between descriptive and inferential statistics?",
        example: "Descriptive statistics is about describing the data, inferential statistics is about making conclusions (generalization) about the data.",
        descriptive: "Techniques used in descriptive statistics include: measures of central tendency (mean, median, and mode), measures of dispersion (standard deviation, variance, percentiles, and quartiles), and measures of association (correlation, regression, and covariance).\n\
        Techniques used in inferential statistics include: hypothesis testing (t-test, chi-square, and ANOVA), and regression analysis.",
    },
    {
        term: "accuracy",
        prompt: "Use accuracy correctly in a setence, or what is it useful for?",
        description: "Accuracy is the relationship between the measurement and the actual truth (Inversely related to bias)",
        example: "The more accurate your model is. The closest it is with providing the truth without any bias"
    },
    {
        term: "Precision",
        prompt: "Use precision correctly in a setence, or what is it useful for?",
        description: "Precision is certaintity of each measurement (Inversely related to variance)",
        example: "Precision is low if it changes everytime I re-measure it."
    },
    {
        term: "Resolution",
        prompt: "Use resolution correctly in a setence, or what is it useful for?",
        description: "The number of data points per unit measurement (time, space, individual, etc.)",
        example: "I am measuring at 100hz which means that I have 100 data points per second of resolution"
    },
    {
        term: "Gaussian distribution",
        prompt: "What does a Gaussian distribution suggest?",
        description: "showing that data near the mean are more frequent in occurrence than data far from the mean.",
        example: "Suggests that the data is normally distributed having a bell curve in the middle"
    },
    {
        term: "T distribution",
        prompt: "What does a T distribution suggest?",
        description: "A T distribution is similar to a Gaussian distribution but has fatter tails",
        example: "Suggests that the data is normally distributed having a bell curve in the middle"
    },
    {
        term: "unimodal and bimodal",
        prompt: "What does a unimodal and bimodal distribution suggest?",
        description: "A unimodal distribution has one peak, a bimodal distribution has two peaks",
    },
    {
        term: "Plot a Gaussian distribution",
        prompt: "Plot a Gaussian distribution from -4 to 4 having 1001 discretizations",
        description: "# import libraries\n\
        import matplotlib.pyplot as plt\n\
        import numpy as np\n\
        import scipy.stats as stats",
        example: "x = np.linspace(-4, 4, 1001)\n\
        y = stats.norm.pdf(x, 0, 1)\n\
        plt.plot(x, y)"
    },
    {
        term: "Plot a Normally distributed Histogram ",
        prompt: "Plot a Normally distributed Histogram (25 bins) of random data using 1000 points using randn shifted by 5",
        description: "# import libraries\n\
        import matplotlib.pyplot as plt\n\
        import numpy as np\n\
        import scipy.stats as stats",
        example: "data = np.random.randn(1000) + 5\n\
        plt.hist(data, bins=25)\n\
        plt.show()"
    },
    {
        term: "Calculate the SAMPLE variance",
        prompt: "Calculate the SAMPLE variance of [ 8, 0, 4, 1, -2, 7] knowing that the mean is 3",
        description: "Variance is the average (divide by n - 1) of the squared differences from the Mean",
        example: "8 - 3 = 5\n\
        0 - 3 = -3\n\
        4 - 3 = 1\n\
        1 - 3 = -2\n\
        -2 - 3 = -5\n\
        7 - 3 = 4\n\
        (5^2 + (-3)^2 + 1^2 + (-2)^2 + (-5)^2 + 4^2) / 5 = 16"
    },
    {
        term: "Larger variance",
        prompt: "What does a larger variance mean?",
        example: "A larger variance means that the data is more spread out",
    },
    {
        term: "diff Sample Variance and Population Variance",
        prompt: "What is the difference between Sample Variance and Population Variance?",
        example: "Sample Variance is the average (divide by n - 1) of the squared differences from the Mean\n\
        Population Variance is the average (divide by n) of the squared differences from the Mean",
        description: "This is given that population mean is a theorical quantity. Whereas the sample mean is an empirircal quantity"
    },
    {
        term: "Standard Deviation",
        prompt: "Whats Standard Deviation, how is it calculated?",
        example: "Standard Deviation is the square root of the variance",
    },
    {
        term: "Fano Factor",
        prompt: "Whats Fano Factor, how is it calculated?",
        example: "Fano Factor is the variance divided by the mean",
        description: "Fano Factor = Variance / Mean"
    },
    {
        term: "Coefficent of Variation",
        prompt: "Whats Coefficent of Variation, how is it calculated?",
        example: "Coefficent of Variation is the standard deviation divided by the mean",
    },
    {
        term: "QQ Plots",
        prompt: "What is a QQ Plot (Quantile Quantile plot)? What is it used for?",
        example: "A QQ plot is a plot of the quantiles of two distributions against each other\n\
        It is used to compare two distributions, For example checking if the observerd theorical distribution is the same as the theorical distribution",
    },
    {
        term: "Statistical moments",
        prompt: "How are Statistical Moment: Mean, Variance, Skewness, Kurtosis used for?",
        example: "Mean: Center of the distribution\n\
        Variance: Spread of the distribution\n\
        Skewness: Symmetry of the distribution. When thre is a positive Skew: ot means the values are pulled to the right. When there is a negativeSkew values are pulled to the left\n\
        Kurtosis: Tailedness of the distribution: High Kurtosis means that the distribution has heavy tails (fatter), Low Kurtosis means that the distribution has light tails (sharper high low change)",
        description: "Skewness is the third moment, Kurtosis is the fourth moment"
    },
    {
        term: "Comming with bins",
        prompt: "What is the formula for comming with bins?",
        example: "Number of bins = (max - min) / width of bins",
        description: "Also calculated as guideneliens:\n\
        Sturges: k = 1 + log2(n)\n\
        Freedman-Diaconis Rule: k = 2 * IQR(x) / n^(1/3)\n\
        Arbitrary: k = 40"
    },
    {
        term: "Violin Plot",
        prompt: "What is a Violin Plot? What is it used for?",
        example: "A violing pinplot is created by rotating an histogram 90 degrees and mirroring it. It is used to show the distribution of the data\n\
        This is useful when you want to show the distribution of the data, but also want to show the mean and standard deviation",
    },
    {
        term: "What does entropy law say?",
        prompt: "What does entropy information theory law say?",
        example: "The less likely an event is, the more information it contains",
        description: "Formula for entropy: \n\
        H = -sum(p(x) * log2(p(x)))"
    },
    {
        term: "high vs low entropy",
        prompt: "What does high vs low entropy mean?",
        example: "High entropy means that the data is more spread out, Low entropy means that the data is more concentrated (That they repeat, and therefore redundant)",
        description: "Entropy differs from variance in entropy is nonlinear and makes no assumption about the distribution\n\n\
        While variance depends on the validity of the mean therefore is appropriate for Gaussian distributions (roughly normal data"
    },
    {
        term: "Z Transform Assumption",
        prompt: "What is the key assumption that makes the z-transform valid?",
        example: "The key assumption is that the data is normally distributed (Gaussian) Since Mean and standard devaitions are valid descriptions of the distribution's center tendency and dispersion",
        description: "zi = (xi - mean) / standard deviation"
    },
    {
        term: "Min Max Scalling",
        prompt: "What is Min Max Scalling? What is it used for?",
        example: "Min Max Scalling is a way to scale data between 0 and 1. It is used to normalize data",
        description: "zi = (xi - min) / (max - min)"
    },
    {
        term: "Outliers",
        prompt: "What are outliers? Where do they come from?",
        example: "Non cooperative, faulty sensors, faulty data, etc\n\
        Outliers must be investigated and evaluated || Never ignore outliers",
        description: "There are two ways to deal with them, either remove them or leave outliers and use robust data"
    },
    {
        term: "Removing outliers: z-score method",
        prompt: "How to remove outliers using z-score method?",
        example: "Remove outliers that are more than 3 standard deviations away from the mean\n\
        Recalculate the devuatuib treshold and remove the outliers and repeat until no more outliers",
        description: "z = (x - mean) / standard deviation"
    },
    {
        term: "Modified Z-score method",
        prompt: "How to calculate the modified z score for non gaussian distributed data?",
        example: "Modified z score = 0.6745 * (x - median) / MAD",
        description: "MAD = Median Absolute Deviation \n\
        MAD = median(|xi - median|)"
    },
    {
        term: "Multivariate Outliers",
        prompt: "How to calculate the zscore for multivariate data?",
        example: "1) Compute the mean\n\
        2) Compute the distance from each data point to the mean\n\
        3) Convert distances to z-score: z = (x - mean) / standard deviation",
    },
    {
        term: "Mass vs density in Proability",
        prompt: "What is the difference between mass and density in probability?",
        example: "Mass is the probability of a specific value | Set of exclusive discrete events\n\
        Density is the probability of a range of values | Continuous events",
        description: "Example of Density probability is the age, whereas you are usually 23.5 age instead of the exact one. The same goes with Salaries. "
    },
    {
        term: "Cumulative Distribution Function",
        prompt: "What is the Cumulative Distribution Function?",
        example: "The Cumulative Distribution Function is the probability that a random variable X will take a value less than or equal to x",
        description: "Example usage to answer: \n\
        What is the probability of getting at least 1 std higher than the mean on the SAT?\n\
        Answer: 1 - CDF(1)\n\
        What is the probability of an elephant weighting less than 2std below the average?\n\
        Answer: CDF(average-2)"
    },
    {
        term: "Creating Sample",
        prompt: "How do you answer to are giraffes taller than slow lorises?",
        example: "1) Create a sample of giraffes and slow lorises\n\
        2) Measure the heights of the animals & calculate the mean\n\
        3) Compare the means of the two samples",
        description: "The sample should be representative of the population, \n\
        The sample can only represent from the population it was drawn from"
    }, {
        term: "Monte Carlo Sampling",
        prompt: "What is Monte Carlo Sampling?",
        example: "Is the same thing as random sampling from a distribution",
        description: "Monte Carlo sampling solves really hard problem sby random sampling the solution space, instead of doing the real work."
    },
    {
        term: "Sampling Variability",
        prompt: "What is Sampling Variability?",
        example: "Sampling Variability is the variability of the sample mean from one sample to another",
        description: "This implies that a single sample mean is not a good estimate of the population parameter"
    }
    
]



// Samples of great difficult queries, and attempt to replicate them. Collected from job exp, interview questions.
const sql_queries = [
    {
        term: "Sample Join",
        prompt: "Get the user id and connector from the users and connectors table, You have the connector guid",
        example: "SELECT c.user_id, u.timezone \n\
        FROM connector AS c \n\
        JOIN users AS u ON u.id = c.user_id \n\
        WHERE c.guid = '196c878d-d63e-41cf-ba9a-0a9b5d74dc7c';"
    }
]



module.export = { designing_good_charts, sql }