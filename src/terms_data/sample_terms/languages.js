// Language speciifc questions for code interview practice. Such as Python, Swift, Javascript, Dart.
// Mischallaneus Features might be also added ONLY if they are used in the common day.

/* Make sure for all know how to instantiate the specific structures.
 Please dont go very specific into some niche libraries, but focus on the main libraries as well as the 
 focus that will be for refreshing before programming interviews.
 
 Therfore Priority queue should be as follow:
 1. Python: Datastrucutres Libs available. Modern Architecture.
 2. Swift: Requested for Mobile
 3. c# : requested for mantainance. Also quite the beautigul language.
 4. Java: requested for mantainance

 */


const python = [
    {
        term: "set | add, remove, check if contains",
        prompt: "How to create a set of integers? and add, remove, check if contains?",
        example: "set = set()\n\
        set.add(1)\n\
        set.remove(1)\n\
        1 in set",
        description: "The time complexity of set is O(1) for add, remove and check if contains.\n\
        The speciality of set is that it does not allow duplicates. or more like it will not add duplicates."
    },
    {
        "term": "List | append, pop, check if contains",
        "prompt": "How to create a list of integers? and append, pop, check if contains?",
        "example": "my_list = []\n\
    my_list.append(1)\n\
    my_list.pop()\n\
    1 in my_list",
        "description": "The time complexity of a list is O(1) for append, pop, and O(n) for checking if it contains an element (in the worst case, where n is the number of elements).\n\
    Lists are ordered and allow duplicates."
    },
    {
        "term": "Dictionary | add, remove, check if key exists",
        "prompt": "How to create a dictionary of names and ages? and add, remove, check if a key exists?",
        "example": "my_dict = {}\n\
    my_dict['Alice'] = 30\n\
    del my_dict['Alice']\n\
    'Alice' in my_dict",
        "description": "The time complexity of a dictionary is O(1) for adding, removing, and checking if a key exists.\n\
    Dictionaries store key-value pairs, are unordered, and keys are unique."
    },
    {
        "term": "Tuple | create, access elements",
        "prompt": "How to create a tuple of integers and access its elements?",
        "example": "my_tuple = (1, 2, 3)\n\
    element = my_tuple[0]",
        "description": "Tuples are immutable, ordered collections of elements. Once created, you cannot change their content. They are typically used to group related data.\n\
    The time complexity for accessing elements is O(1)."
    },
    {
        "term": "Counter | count elements in iterable",
        "prompt": "How to count the occurrences of elements in a list?",
        "example": "from collections import Counter\n\
      my_list = [1, 2, 2, 3, 3, 3]\n\
      counter = Counter(my_list)\n\
      count = counter[2]",
        "description": "The `Counter` class from the `collections` module is used to count the occurrences of elements in an iterable, such as a list, tuple, or string.\n\
      It returns a dictionary-like object with elements as keys and their counts as values. Accessing the count of an element is done with O(1) time complexity."
    },
    {
        "term": "deque | double-ended queue",
        "prompt": "How to create a double-ended queue and perform operations?",
        "example": "from collections import deque\n\
      my_deque = deque([1, 2, 3])\n\
      my_deque.append(4)\n\
      my_deque.appendleft(0)\n\
      my_deque.pop()\n\
      my_deque.popleft()",
        "description": "A `deque` (double-ended queue) is a versatile data structure that allows efficient append and pop operations from both ends. It is useful for implementing queues and stacks.\n\
      Append and pop operations from either end have O(1) time complexity."
    },
    {
        "term": "defaultdict | dictionary with default value",
        "prompt": "How to create a dictionary with default values for missing keys?",
        "example": "from collections import defaultdict\n\
      my_dict = defaultdict(int)\n\
      my_dict['Alice'] += 1",
        "description": "A `defaultdict` is a subclass of the standard dictionary (`dict`) that provides default values for missing keys. In the example, it initializes missing keys with an integer value of 0.\n\
      Accessing and modifying keys have O(1) time complexity."
    },
    {
        "term": "OrderedDict | ordered dictionary",
        "prompt": "How to create an `OrderedDict` and perform ordered operations?",
        "example": "from collections import OrderedDict\n\
      my_ordered_dict = OrderedDict()\n\
      my_ordered_dict['b'] = 2\n\
      my_ordered_dict['a'] = 1\n\
      keys_in_order = list(my_ordered_dict.keys())",
        "description": "An `OrderedDict` is a dictionary subclass in Python's `collections` module that remembers the order in which items were inserted. This order is maintained when iterating or performing operations on the dictionary.\n\
      Accessing and iterating over items in an `OrderedDict` is done in the order of insertion, making it useful when order matters. Common dictionary operations like key access, insertion, and deletion have O(1) time complexity."
    },
    {
        "term": "Heap (heapq module)",
        prompt: "Create a heap of 3,1, 2 and pop the smallest element",
        "example": "import heapq\n\
        heap = [3, 1, 2]\n\
        heapq.heapify(heap)\n\
        min_element = heapq.heappop(heap)",
        "description": "A heap is a binary tree-based data structure often used to implement priority queues.\n\
         The `heapq` module provides functions to create and manipulate heaps in Python. Operations like insertion \n\
         and removal of the smallest element have O(log n) time complexity."
    },
    {
        term: "Heap Q In Practice",
        prompt: "Use heapq in practice for capturing the next Smallest uggly number to compute the next ugly numbers",
        description: ":m Complete:\n\
        ## [Complete Import]\n\
        \nclass Solution:\n\
            def nthUglyNumber(self, n: int) -> int:\n\
                heap = [1]\n\
                visited = {1}\n\
        \n\
                for t in range(n):\n\
                    ## [Get the smallest Pop]\n\
                    for i in [2, 3, 5]:\n\
                        computed = smallestuggly * i\n\
                        if computed not in visited:\n\
                            visited.add(computed)\n\
                            ## [Psuh into the heap the smallest]\n\
                return smallestuggly",
        example:
            "import heapq\n\
        \nclass Solution:\n\
            def nthUglyNumber(self, n: int) -> int:\n\
                heap = [1]\n\
                visited = {1}\n\
        \n\
                for t in range(n):\n\
                    smallestuggly= heapq.heappop(heap)\n\
                    for i in [2, 3, 5]:\n\
                        computed = smallestuggly * i\n\
                        if computed not in visited:\n\
                            visited.add(computed)\n\
                            heapq.heappush(heap, computed)\n\
                return smallestuggly"



    },
    {
        "term": "Linked List",
        "example": "class Node:\n\
      def __init__(self, data):\n\
        self.data = data\n\
        self.next = None\n\
    \n\
    # Create and manipulate linked lists with Node instances.",
        "description": "A linked list is a linear data structure made up of nodes, where each node stores a value and a reference to the next node. Linked lists are used for dynamic data storage and often implemented using classes in Python."
    },
    {
        "term": "Queue (list or deque-based)",
        prompt: "How to create a queue using a list or a deque? (Python)",
        "example": "from collections import deque\n\
            queue = deque()\n\
            queue.append(1)\n\
            front_element = queue.popleft()",
        "description": "A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Like stacks, queues can be implemented using lists or the `deque` data structure. Queues are used for tasks like managing tasks in a print queue."
    },
    {
        "term": "Trie",
        "example": "class TrieNode:\n\
      def __init__(self):\n\
        self.children = {}\n\
        self.is_end_of_word = False\n\
    \n\
    # Create and manipulate tries with TrieNode instances.",
        prompt: "How to create a trie using Python?",
        "description": "A trie is a tree-like data structure used for storing a dynamic set of strings. It's particularly useful for string manipulation and searching, such as autocomplete and spell-checking."
    },
    {
        "term": "Range basic",
        "prompt": "Create a range from 1 to 10",
        "example": "my_range = range(1, 11)",
    },
    {
        term: "Range | Iterate on three",
        prompt: "Print left right left being always 3 less than right starting from 0 to 10",
        example: "left = 0\n\
        for right in range(3, 10, 3):\n\
            print(left, right)\n\
            left = right",
        description: "The range function can be used to iterate on a range of numbers. The first argument is the start, the second argument is the end and the third argument is the step."

    },
    {
        term: "Create 2D list",
        prompt: "Create a 2D list of 3 rows and 4 columns where elements are not linked",
        example: "[[0] * len(matrix[0]) for x in range(height)]"
    },
    {
        term: "Math FLoor and Ceil",
        prompt: "How to get the floor and ceil of a number?",
        example: "import math\n\
        math.floor(1.5)\n\
        math.ceil(1.5)"

    },
    {
        term: "Floor vs Truncate",
        prompt: "What is the difference between floor e.g. (a//b) and truncate? int(a/b)",
        example: "floor(-1.5) = -2\n\
        truncate(-1.5) = -1"

    },
    {
        term: "Infinite",
        prompt: "How to create an infinite number (very large number)?",
        example: "float('inf')"
    },
    {
        term: "Non local variable",
        prompt: "How to create a non local variable?",
        example: "nonlocal a",
        description: "For example you want to use a variable thats on the parent function"
    },
    {
        term: "Using Bit mask to figure out if it was either even or only one repetition",
        prompt: "Knowing that python supports up to 32 bit integers complete teh following, using bitmask strategy so that in the base case returns 1 if numbers on the sequence were repeated odd times or is there is only one digit repeated once",
        description: ":m ```py\n\
        class Solution:\n\
            def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:\n\
                \n\
                def dfs(node, pathmask=0):\n\
                    # Base case\n\
                    count = 0\n\
                    ### TODO \n\
                    if not node.left and not node.right:\n\
                        if ### TODO:\n\
                            return 1\n\
                        return 0\n\
                                \n\
                    if node.left:\n\
                        count += dfs(node.left, pathmask)\n\
                    if node.right:\n\
                        count += dfs(node.right, pathmask)\n\
                    return count\n\
                \n\
                if not root:\n\
                    return 0\n\
                return dfs(root)\n\
        ```\n\
        ",
        example: "pathmask ^= (1 << node.val)\n\
        pathmask == 0 or (pathmask & (pathmask - 1)) == 0\n\
        Example run \n\
        1000 & 0111 = 0000\n\
        1100 & 1011 = 1000\n\
        "
    },
    {
        term: "Character to int and int to char",
        prompt: "How to convert in python int to char and char to int?",
        example: "ord('a')\n\
        chr(97)"
    },
    {
        term: "heapq",
        prompt: "Use heapq to create a list, add and pop the smallest element",
        example: "import heapq\n\
        heap = [3, 1, 2]\n\
        heapq.heapify(heap)\n\
        heapq.heappush(heap, 4)\n\
        min_element = heapq.heappop(heap)"
    }
]

const swift = [
    {
        term: "Using Regex",
        description: "Check the following regex example.\
        import Foundation\n\
        \n\
        func timeConversion(s: String) -> String {\n\
            do {\n\
                let pattern = \"^(\\d{2}):(\\d{2}):(\\d{2})([APap][Mm])$\"\n\
                let regex = try NSRegularExpression(pattern: pattern, options: [])\n\
                if let match = regex.firstMatch(in: s, options: [], range: NSRange(s.startIndex..., in: s)) {\n\
                    let hoursRange = Range(match.range(at: 1), in: s)!\n\
                    let minutesRange = Range(match.range(at: 2), in: s)!\n\
                    let secondsRange = Range(match.range(at: 3), in: s)!\n\
                    let ampmRange = Range(match.range(at: 4), in: s)!\n\
                    \n\
                    var hours = Int(s[hoursRange])!\n\
                    let minutes = String(s[minutesRange])\n\
                    let seconds = String(s[secondsRange])\n\
                    let ampm = String(s[ampmRange])\n\
                    \n\
                    if (ampm.uppercased() == \"PM\" && hours != 12) {\n\
                        hours += 12\n\
                    } else if (ampm.uppercased() == \"AM\" && hours == 12) {\n\
                        hours = 0\n\
                    }\n\
                    \n\
                    return String(format: \"%02d:%@:%@\", hours, minutes, seconds)\n\
                }\n\
            } catch {\n\
                print(\"Error: \(error)\")\n\
                return \"Error \\(error)\"\n\
            }\n\
            \n\
            return \"\"\n\
        }\n\
        \n\
        let stdout = ProcessInfo.processInfo.environment[\"OUTPUT_PATH\"]!\n\
        FileManager.default.createFile(atPath: stdout, contents: nil, attributes: nil)\n\
        let fileHandle = FileHandle(forWritingAtPath: stdout)!\n\
        \n\
        guard let s = readLine() else { fatalError(\"Bad input\") }\n\
        \n\
        let result = timeConversion(s: s)\n\
        fileHandle.write(result.data(using: .utf8)!)\n\
        fileHandle.write(\"\\n\".data(using: .utf8)!)",
        prompt: "Create regex to match time in 12 hour format. e.g. 07:05:45PM",
        example: "^(\\d{2}):(\\d{2}):(\\d{2})([APap][Mm])$"
    },
    {
        term: "Using Regex II",
        description: "Check the following regex example.\
        import Foundation\n\
        \n\
        func timeConversion(s: String) -> String {\n\
            do {\n\
                let pattern = \"^(\\d{2}):(\\d{2}):(\\d{2})([APap][Mm])$\"\n\
                let regex = try NSRegularExpression(pattern: pattern, options: [])\n\
                if let match = regex.firstMatch(in: s, options: [], range: NSRange(s.startIndex..., in: s)) {\n\
                    let hoursRange = {TODO #1}\n\
                    let minutesRange = Range(match.range(at: 2), in: s)!\n\
                    let secondsRange = Range(match.range(at: 3), in: s)!\n\
                    let ampmRange = Range(match.range(at: 4), in: s)!\n\
                    \n\
                    var hours = {TODO #2}\n\
                    let minutes = String(s[minutesRange])\n\
                    let seconds = String(s[secondsRange])\n\
                    let ampm = String(s[ampmRange])\n\
                    \n\
                    if (ampm.uppercased() == \"PM\" && hours != 12) {\n\
                        hours += 12\n\
                    } else if (ampm.uppercased() == \"AM\" && hours == 12) {\n\
                        hours = 0\n\
                    }\n\
                    \n\
                    return String(format: \"%02d:%@:%@\", hours, minutes, seconds)\n\
                }\n\
            } catch {\n\
                print(\"Error: \(error)\")\n\
                return \"Error \\(error)\"\n\
            }\n\
            \n\
            return \"\"\n\
        }\n\
        \n\
        let stdout = ProcessInfo.processInfo.environment[\"OUTPUT_PATH\"]!\n\
        FileManager.default.createFile(atPath: stdout, contents: nil, attributes: nil)\n\
        let fileHandle = FileHandle(forWritingAtPath: stdout)!\n\
        \n\
        guard let s = readLine() else { fatalError(\"Bad input\") }\n\
        \n\
        let result = timeConversion(s: s)\n\
        fileHandle.write(result.data(using: .utf8)!)\n\
        fileHandle.write(\"\\n\".data(using: .utf8)!)",
        prompt: "Complete the code to match the hour as an integer",
        example: "Range(match.range(at: 1), in: s)!\n\
        Int(s[hoursRange])!\n"
    },
    {
        term: "Declaring Type Variable",
        prompt: "Can you declare a float variable?",
        example: "var a: Float = 1.0"
    },
    {
        term: "For Loop on Swift",
        prompt: "How to iterate over a range in Swift? (1..5)",
        example: "for i in 1...5 { print(i) }"
    },
    {
        term: "For Loop on Swift II",
        prompt: "How to iterate over an array\n\ e.g let numbers = [1, 2, 3, 4, 5]",
        example: "for i in numbers { print(i) }"
    },
    {
        term: "For Loop enumerate",
        prompt: "How to iterate over an array and get the index and value?",
        example: "for (index, value) in numbers.enumerated() { print(index, value) }"
    },
    {
        term: "Format decimals",
        prompt: "How to print a double in 6 places after the decimal?",
        example: "String(format: \"%.6f\", 1.0)"
    },
    {
        term: "Dict | Swift",
        prompt: "Create a dictionary with key as string and value as int",
        example: "var dict: [String: Int] = [:]"
    },
    {
        term: "Dict | Add, , update",
        prompt: "How to add, update a dictionary?",
        example: "dict[\"a\"] = 1\n\
        dict[\"b\"] = 2"
    },
    {
        term: "Dict | Remove",
        prompt: "How to remove a key from a dictionary?",
        example: "dict.removeValue(forKey: \"a\")"
    },
    {
        term: "Set | init",
        prompt: "How to initialize a set of Integers?",
        example: "var set: Set<Int> = []\n\
        var set: Set<Int> = [1, 2, 3]\n\
        "
    },
    {
        term: "Set | Add, check if contains",
        prompt: "How to add an element to a set and check if it contains an element?",
        example: "set.insert(1)\n\
        set.contains(1)"
    },
    {
        term: "Set | Remove & Remove All",
        prompt: "How to remove an element from a set and remove all elements?",
        example: "set.remove(1)\n\
        set.removeAll()"
    },
    {
        term: "For loop from 2 to count",
        prompt: "How to iterate from 2 to count?",
        example: "for i in 2..<count { print(i) }"
    },
    {
        term: "Get first and second half array",
        prompt: "How to get the first and second half of an array? from middle = nums.count - ( k % nums.count )",
        example: "let firstHalf = nums[0..<middle]\n\
        let secondHalf = nums[middle..<nums.count]"
    }
]

const js = [
    {
        term: "Check key in map",
        example: "if ('j' in {'j': 1}) { console.log('j is in the map'); }",
        prompt: "How to check if a key is in a map: e.g. j in {'j': 1}?"
    },
    {
        term: "JS | Min Max Integer",
        example: "Number.MAX_SAFE_INTEGER\n\
        Number.MIN_SAFE_INTEGER",
        prompt: "How to get the max and min integer in JS?"
    },
]

const dart = [
]

const matlab = []

const r = []

const kotlin = []

const php = [
]

const java = []

const csharp = []

const cpp = []

const typescript = [
    {
        term: "Create a tuple",
        prompt: "How to create a tuple? of number, string and last element as boolean | named tuple",
        example: "let tuple: [number, string, boolean] = [1, 'a', true]"
    },
    {
        term: "Create an Enum",
        prompt: "How to create an enum? of Bajo: 10, Normal: 50, Alto: 100",
        example: "enum Priority {\n\
            Bajo = 10,\n\
            Normal = 50,\n\
            Alto = 100\n\
        }"
    },
    {
        term: "Declare a variable of Enum",
        prompt: "How to declare a variable of Enum type Priority which starts as Bajo?",
        example: "let priority: Priority = Priority.Bajo"
    },
    {
        term: "Create an array of String",
        prompt: "How to create an array of String?",
        example: "let array: string[] = []"
    },
    {
        term: "Create an array  II",
        prompt: "How to create an array of String and Numbers",
        example: "let array: (string | number)[] = []"
    },
    {
        term: "Create an array III",
        prompt: "How to create an array of any type?",
        example: "let array: any[] = []"
    },
    {
        term: "Method that returns a String",
        prompt: "How to create a method that returns a String?",
        example: "function sayHello(name: string): string {\n\
            return `Hello ${name}`\n\
        }"
    },
    {
        term: "Create an interface",
        prompt: "How to create an interface of a Person with name and age?",
        example: "interface Person {\n\
            name: string,\n\
            age: number\n\
        }"
    },
    {
        term: "Use Person Interface in an array",
        prompt: "How to create an array of interface Person that has name and age??",
        example: "let people: Person[] = []"
    }
]


module.exports = { python, swift, js, dart, php, java, csharp, cpp, typescript, r, matlab, kotlin };


