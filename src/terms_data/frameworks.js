const react_terms = [
    {
        term: "Compilers", prompt: "What is a compiler in JS in OTerms? Whats their function?",
        description: "A JavaScript compiler takes JavaScript code, transforms it and returns JavaScript code in a different format. The most common use case is to take ES6 syntax and transform it into syntax that older browsers are capable of interpreting. Babel is the compiler most commonly used with React.",
        example: "A compiler is a special program that translates a programming language's source code into machine code, bytecode or another programming language."
    },
    {
        term: "Bundlers", prompt: "What are Bundlers in JS and CSS? and whats their function?",
        description: "Bundlers take JavaScript and CSS code written as separate modules (often hundreds of them), and combine them together into a few files better optimized for the browsers. Some bundlers commonly used in React applications include Webpack and Browserify.",
        example: "Similar to Linking, which means creating a single executable file from several multiple object files. In this step, it is common that the linker will complain about undefined functions which are commonly main themselves."

    },
    {
        term: "Package Managers", prompt: "What are Package Managers?",
        description: "Package managers are tools that allow you to manage dependencies in your project. npm and Yarn are two package managers commonly used in React applications. Both of them are clients for the same npm package registry."
    },
    {
        term: "(a) Components, (b) Props (c) props.children  (d) State (e) Controlled Component",
        prompt: "Describe (1+) the meaning on own words",
        description: "\n\
        (a) React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element\n\n\
        (b) props are inputs to a React component. They are data passed down from a parent component to a child component.\n\n\
        (c) props.children is available on every component. It contains the content between the opening and closing tags of a component. For example\n\n\
        (d) A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.\n\n\
        (e) An input form element whose value is controlled by React is called a controlled component. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.\n\n\
        "
    },
    {
        term: "Promise Complete | code",
        prompt: "Complete the following code to resolve the promise, and rekect it as well",
        description: "\
        export function setStoredCities(cities: string[]): Promise<void> {\n\
            return COMPLETE HERE => {\n\
                const data: LocaStorage = {\n\
                    cities\n\
                }\n\
                chrome.storage.local.set(data, () => {\n\
                    if (chrome.runtime.lastError) {\n\
                        ### COMPLETE HERE\n\
                    } else {\n\
                        ### COMPLETE HERE\n\
                    }\n\
                })\n\
            })\n\
        }",
        example: "return new Promise((resolve, reject) => {\n\
            reject(chrome.runtime.lastError)\n\
            resolve()"
    }
];

const react_typescript = [
    {
        term: "create react app named bases using typescript template",
        example: "npx create-react-app bases --template typescript",
        description: "Create the react app remember that you can use --template typescript to create the app with typescript"
    },
    {
        term: "interface design: CounterState",
        description: ":m\
        interface Props {\n\
            initialValue: number;\n\
        }\n\
        \n\
        ### CREATE an interface named CounterState with the following properties\n\
        \n\
        \n\
        export const CounterBy = ({ initialValue = 5 }: Props) => {\n\
        \n\
            const [counter, setCounter] = useState<CounterState>({\
                counter: initialValue,\n\
                clicks: 0,\n\
            });\n\
        \n\
        const handleClick = (value:number ) => {\n\
            setCounter(({clicks, counter}) => ({\n\
                counter: counter + value,\n\
                clicks: clicks + 1,\n\
            }));\n\
        };\n\
        \n\
        return (\n\
            <>\n\
            \n\
            <h1> Counter: {counter.counter} </h1>\n\
            <h1>Clicks: {counter.clicks}</h1>\n\
        \n\
            <button onClick={() => handleClick(1)}>+1</button>\n\
                <button onClick={() => handleClick(2)}>+2</button>\n\
            </>\n\
        );\n\
        };",
        prompt: "Create a interface named CounterState with the following properties: counter: int and clicks as well.",
        example: "\n\
        interface CounterState {\n\
        counter: number;\n\
        clicks: number;\n\
        }"
    },
    {
        term: "defaulted class",
        description: ":m\
        interface Props {\n\
            initialValue: number;\n\
        }\n\
        \n\
        interface CounterState {\n\
            counter: number;\n\
            clicks: number;\n\
        }\n\
        \n\
        ### Complete with the header CounterBy exported by defaultand props with initiatedValue as 5\n\
        \n\
            const [counter, setCounter] = useState<CounterState>({\
                counter: initialValue,\n\
                clicks: 0,\n\
            });\n\
        \n\
        const handleClick = (value:number ) => {\n\
            setCounter(({clicks, counter}) => ({\n\
                counter: counter + value,\n\
                clicks: clicks + 1,\n\
            }));\n\
        };\n\
        \n\
        return (\n\
            <>\n\
            \n\
            <h1> Counter: {counter.counter} </h1>\n\
            <h1>Clicks: {counter.clicks}</h1>\n\
        \n\
            <button onClick={() => handleClick(1)}>+1</button>\n\
                <button onClick={() => handleClick(2)}>+2</button>\n\
            </>\n\
        );\n\
        };",
        prompt: "Complete with the header CounterBy exported by defaultand props with initiatedValue as 5",
        example: "export const CounterBy = ({ initialValue = 5 }: Props) => {"
    },
    {
        term: "useState with typescript",
        description: ":m\
        interface Props {\n\
            initialValue: number;\n\
        }\n\
        \n\
        interface CounterState {\n\
            counter: number;\n\
            clicks: number;\n\
        }\n\
        \n\
        export const COunterBy = ({initialValue = 5}: Props) => {\n\
        \n\
        ### Complete with the useState hook with the type CounterState\n\
        \n\
        const handleClick = (value:number ) => {\n\
            setCounter(({clicks, counter}) => ({\n\
                counter: counter + value,\n\
                clicks: clicks + 1,\n\
            }));\n\
        };\n\
        \n\
        return (\n\
            <>\n\
            \n\
            <h1> Counter: {counter.counter} </h1>\n\
            <h1>Clicks: {counter.clicks}</h1>\n\
        \n\
            <button onClick={() => handleClick(1)}>+1</button>\n\
                <button onClick={() => handleClick(2)}>+2</button>\n\
            </>\n\
        );\n\
        };",
        prompt: "Create a useState hook with the type CounterState with counter valu as initialValue and clicks as 0",
        example: "[counter, setCounter] = useState<CounterState>({\n\
            counter: initialValue,\n\
            clicks: 0,\n\
        });"
    },
    {
        term: "useEffect",
        prompt: "Create an hook that load everytime counter is modified that checks if counter",
        example: "\n\
        useEffect(() => {\n\
          \n\
          // code\n\
        }, [counter])",
    },
    {
        term: "animation effect",
        prompt: "Create an animation effect that when counter (h2) is equal to 3 it moves the h2 element 10px up and then down for 0.1 seconds both with ease out effect.",
        description: "\
        import React, { useEffect } from 'react';\n\
        import { gsap } from 'gsap';\n\
        \n\
        const MAXIMUM_COUNT = 3;\n\
        \n\
        export const CounterEffect = ({ initialValue = 0 }) => {\n\
          const [counter, setCounter] = React.useState(initialValue);\n\
        \n\
          const handleClick = () => {\n\
            setCounter((prev) => Math.min(prev + 1, MAXIMUM_COUNT));\n\
          };\n\
        \n\
          useEffect(() => {\n\
            if (counter < MAXIMUM_COUNT) return;\n\
        \n\
        ### Create the animation effect\n\
          }, [counter]);\n\
        \n\
          // ... rest of the component\n\
        };",
        example: "\
        gsap.to('h2', {\n\
          y: -10,\n\
          duration: 0.1,\n\
          ease: 'ease.out',\n\
        }).then(() => {\n\
          gsap.to('h2', {\n\
            y: 0,\n\
            duration: 0.1,\n\
            ease: 'ease.out',\n\
          });\n\
        });"
    }

]


const apex = [
    {
        term: "len-substr-concatenate",
        description: ":m given: \n\
            ```java\n\
             String message = 'Hello, world!';\n\
             ```",
        prompt: "get the length of the message, get the first 5 characters of the message, concatenate the message with `Apex`",
        example: "int length = message.length();\n\
        String sub = message.substring(0, 5);\n\
        String newMessage = sub + 'Apex';\n\
        System.debug(newMessage);"
    },
    {
        term: "contains-trim-charAt",
        description: ":m given: \n\
            ```java\n\
             String message = '  Hello, world!  ';```",
        prompt: "check if message contains `world`, trim the message (remove any leading and trailing white space), and get the first character",
        example: ":m ```java\n\
        boolean contains = message.contains('world');\n\
        String trim = message.trim();\n\
        char first = trim.charAt(0);\n\
        System.debug(first);```"
    },
    // Datetime
    {
        term: "now-format-addDays",
        description: ":m given: \n\
            ```java\n\
                Datetime now = Datetime.now();```",
        prompt: "format the date to `yyyy-MM-dd`, and add 5 days to the date",
        example: ":m ```java\n\
        String format = now.format('yyyy-MM-dd');\n\
        Datetime newDate = now.addDays(5);\n\
        System.debug(newDate);```"

    },
    {
        term: "timzone-difference-parse",
        description: ":m given: \n\
            ```java\n\
                Datetime now = Datetime.now();\n\
                Datetime dt1 = Datetime.newInstance(2019, 1, 1, 0, 0, 0);\n\
                ```",
        prompt: "get the millisecond difference between dt1 and now and parse the date to `yyyy-MM-dd`",
        example: ":m ```java\n\
        Integer difference = now - dt1;\n\
        String parse = now.parse('yyyy-MM-dd');\n\
        System.debug(parse);```"
    },
    // Collections
    {
        term: "list-initialize-size-add-remove-sort",
        prompt: "initialize a list of size 5, add `Hello` to the list, remove `Hello` from the list, and sort the list",
        example: ":m ```java\n\
        List<String> list = new List<String>{'Hello', 'World', 'Apex'};\n\
        list.add('Hello');\n\
        list.remove('Hello');\n\
        list.sort();\n\
        System.debug(list);```"
    },
    {
        term: "query-records-into-list",
        description: "Givena a table Account with columns: id, name, email, phone, createddate, createdbyid, lastmodifieddate, lastmodifiedbyid",
        prompt: "query all records (id, name) from the table and store them in a list",
        example: ":m ```java\n\
        List<Account> accounts = [SELECT Id, Name FROM Account];\n\
        System.debug(accounts);```"

    },
    {
        term: "set-methods",
        prompt: "create  set of animals of 'dog', 'cat', 'bird' initizialization, get the size, add element, remove elemnt,  addAll, clone, retainAll(intersection), removeAll(difference)",
        example: ":m\n\
        ```js\n\
        // Initialization\nSet<String> animals = new Set<String>{'dog', 'cat', 'bird'};\nSystem.debug(animals); // Output: (dog, cat, bird)\n\n// Size\nInteger size = animals.size();\nSystem.debug(size); // Output: 3\n\n// Add Elements\nanimals.add('fish');\nSystem.debug(animals); // Output: (dog, cat, bird, fish)\n\n// Remove Elements\nanimals.remove('bird');\nSystem.debug(animals); // Output: (dog, cat, fish)\n\n// Contains\nBoolean containsDog = animals.contains('dog');\nSystem.debug(containsDog); // Output: true\nBoolean containsBird = animals.contains('bird');\nSystem.debug(containsBird); // Output: false\n\n// Union\nSet<String> pets = new Set<String>{'dog', 'cat', 'hamster'};\nSet<String> allAnimals = animals.clone();\nallAnimals.addAll(pets);\nSystem.debug(allAnimals); // Output: (dog, cat, fish, hamster)\n\n// Intersection\nSet<String> commonAnimals = animals.clone();\ncommonAnimals.retainAll(pets);\nSystem.debug(commonAnimals); // Output: (dog, cat)\n\n// Difference\nSet<String> differentAnimals = animals.clone();\ndifferentAnimals.removeAll(pets);\nSystem.debug(differentAnimals);\
        ```\
        ",
        description: ":m\n\
        ```js\n\
        // Initialization\nSet<String> animals = new Set<String>{'dog', 'cat', 'bird'};\nSystem.debug(animals); // Output: (dog, cat, bird)\n\n// Size\nInteger size = animals.size();\nSystem.debug(size); // Output: 3\n\n// Add Elements\nanimals.add('fish');\nSystem.debug(animals); // Output: (dog, cat, bird, fish)\n\n// Remove Elements\nanimals.remove('bird');\nSystem.debug(animals); // Output: (dog, cat, fish)\n\n// Contains\nBoolean containsDog = animals.contains('dog');\nSystem.debug(containsDog); // Output: true\nBoolean containsBird = animals.contains('bird');\nSystem.debug(containsBird); // Output: false\n\n// Union\nSet<String> pets = new Set<String>{'dog', 'cat', 'hamster'};\nSet<String> allAnimals = animals.clone();\nallAnimals.addAll(pets);\nSystem.debug(allAnimals); // Output: (dog, cat, fish, hamster)\n\n// Intersection\nSet<String> commonAnimals = animals.clone();\ncommonAnimals.retainAll(pets);\nSystem.debug(commonAnimals); // Output: (dog, cat)\n\n// Difference\nSet<String> differentAnimals = animals.clone();\ndifferentAnimals.removeAll(pets);\nSystem.debug(differentAnimals);\
        ```\
        "
    },
    {
        term: "set-vs-list",
        prompt: "What is the difference between set and list in Apex?",
        example: "    Elements:     A List can contain duplicate elements, while a Set cannot. Each element in a Set must be unique.      Order:     A List maintains the order in which elements were added, while a Set does not guarantee any specific order of its elements.      Lookup Time:     A Set provides faster lookup time compared to a List because it uses hashing algorithms to determine whether an element exists in the Set or not. On the other hand, a List has to traverse each element sequentially to find a specific element.      Performance:     Since Sets do not allow duplicates, they require extra processing to prevent duplicate elements from being added. As a result, adding elements to a Set can be slightly slower than adding elements to a List. However, Sets can be much faster than Lists when it comes to checking if an element is present or removing duplicates."

    },
    {
        term: "map-methods",
        example: ":m\n\
        ```js\n\
        // Initialization\nMap<String, Integer> ages = new Map<String, Integer>{'John' => 35, 'Mary' => 42, 'Bob' => 28};\nSystem.debug(ages); // Output: {Bob=28, John=35, Mary=42}\n\n// Size\nInteger size = ages.size();\nSystem.debug(size); // Output: 3\n\n// Put Elements\nages.put('Alice', 20);\nSystem.debug(ages); // Output: {Alice=20, Bob=28, John=35, Mary=42}\nages.put('Bob', 29);\nSystem.debug(ages); // Output: {Alice=20, Bob=29, John=35, Mary=42}\n\n// Remove Elements\nages.remove('Bob');\nSystem.debug(ages); // Output: {Alice=20, John=35, Mary=42}\n\n// Contains Key\nBoolean containsJohn = ages.containsKey('John');\nSystem.debug(containsJohn); // Output: true\nBoolean containsAlice = ages.containsKey('Alice');\nSystem.debug(containsAlice); // Output: true\nBoolean containsBob = ages.containsKey('Bob');\nSystem.debug(containsBob); // Output: false\n\n// Get Values\nList<Integer> allAges = new List<Integer>(ages.values());\nSystem.debug(allAges); // Output: (20, 35, 42)\
        ```\
        ",
        description: ":m\n\
        ```js\n\
        // Initialization\nMap<String, Integer> ages = new Map<String, Integer>{'John' => 35, 'Mary' => 42, 'Bob' => 28};\nSystem.debug(ages); // Output: {Bob=28, John=35, Mary=42}\n\n// Size\nInteger size = ages.size();\nSystem.debug(size); // Output: 3\n\n// Put Elements\nages.put('Alice', 20);\nSystem.debug(ages); // Output: {Alice=20, Bob=28, John=35, Mary=42}\nages.put('Bob', 29);\nSystem.debug(ages); // Output: {Alice=20, Bob=29, John=35, Mary=42}\n\n// Remove Elements\nages.remove('Bob');\nSystem.debug(ages); // Output: {Alice=20, John=35, Mary=42}\n\n// Contains Key\nBoolean containsJohn = ages.containsKey('John');\nSystem.debug(containsJohn); // Output: true\nBoolean containsAlice = ages.containsKey('Alice');\nSystem.debug(containsAlice); // Output: true\nBoolean containsBob = ages.containsKey('Bob');\nSystem.debug(containsBob); // Output: false\n\n// Get Values\nList<Integer> allAges = new List<Integer>(ages.values());\nSystem.debug(allAges); // Output: (20, 35, 42)\
        ```\
        ",
        prompt: "create a map of ages: {John: 35, Mary: 42, Bob: 28}, get the size, add element, remove elemnt,  addAll, clone, retainAll(intersection), removeAll(difference)"
    },
    {
        term: "select-or",
        prompt: "Get Accounts where Industry is Technology or Annual Revenue is greater than 1 million",
        example: ":m\n\
       ```js\n\
       List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM Account WHERE Industry = 'Technology' OR AnnualRevenue > 1000000];\nSystem.debug(accounts)\n\
       ```\
       ",
    },
    {
        term: "select-in",
        prompt: "Get Accounts where Industry is Technology or Finance",
        example: ":m\n\
        ```js\n\
        List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM Account WHERE Industry IN ('Technology', 'Finance')];\nSystem.debug(accounts);\n\
        ```\
        ",
        description: "List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM Account"
    },
    {
        term: "select-like",
        prompt: "Get Accounts where email ends with gmail.com",
        example: ":m\n\
        ```js\n\
        List<Contact> contacts = [SELECT Name, Email FROM Contact WHERE Email LIKE '%gmail.com'];\nSystem.debug(contacts);\n\
        ```\
        ",
        description: "List<Contact> contacts = [SELECT Name, Email FROM Contact "
    },
    {
        term: "select-order",
        prompt: "Get Accounts where Annual Revenue is greater than 1 million and order by Annual Revenue",
        example: ":m\n\
        ```js\n\
        List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM Account WHERE AnnualRevenue > 1000000 ORDER BY AnnualRevenue DESC];\nSystem.debug(accounts)\n\
        ```\
        ",
        description: "List<Account> accounts = [SELECT Name, Industry, AnnualRevenue FROM "
    },
    {
        term: "select-next-n-days",
        prompt: "Get Opportunities where Close Date is in the next 7 days",
        example: ":m\n\
        ```js\n\
        List<Account> accounts = [SELECT Name, CloseDate FROM Opportunity WHERE CloseDate = NEXT_N_DAYS:7];\
        ```\
        ",
        description: "List<Account> accounts = [SELECT Name, CloseDate FROM Opportunity..."
    },
    {
        term: "select-last-month",
        prompt: "Get Accounts where Created Date is in the last month",
        example: ":m\n\
        ```js\n\
        List<Account> accounts = [SELECT Name, CreatedDate FROM Account WHERE CreatedDate = LAST_MONTH];\
        ```\
        ",
        description: "List<Account> accounts = [SELECT Name, CreatedDate FROM Account... "
    },
    {
        term: "buffer-vs-cache",
        prompt: "What is the difference between Buffer and Cache? When would you use one over the other?",
        description: "Buffer and cache are two concepts that are often used in computer science and can sometimes be confusing.  A buffer is a temporary storage area in memory or a file that is used to hold data temporarily while it is being moved from one place to another. Buffers are commonly used in computer networking, where data is transmitted in packets that are too large to be processed at once. The data is stored in a buffer and then transmitted in smaller packets. Buffers can also be used to store data that is being read from or written to a file or other input/output device.  A cache, on the other hand, is a type of memory that is used to store frequently accessed data so that it can be accessed more quickly. Caches are used in many different areas of computing, such as web browsers, operating systems, and databases. In a web browser, for example, the cache stores frequently accessed web pages and images so that they can be loaded more quickly the next time they are accessed. In an operating system, the cache may store recently used files or applications so that they can be accessed more quickly.  In summary, buffers are used to temporarily store data during a transfer or processing, while caches are used to store frequently accessed data to improve performance. Buffers are typically used for data that is being transferred, while caches are typically used for data that is being accessed repeatedly.",
        example: "Buffer when building a instant message app, while you texting, Cache when you have a web and cahces some data."
    },
    {
        term: "parent get child records",
        attachment: "./img/2023-04-18-11-03-34.png",
        description: ":m\n\
        One of the limitations is that you can only get one level deep of records\n\
        Note how you have to use plural form for the child column\n\
        ```java\n\
        SELECT Name, Phone, Website, [...] FROM Account\n\
        ```\n",
        prompt: "Complete missing snippet to get Name, Department, Email of Contacts related to the Account like on the image\n\
        Account (1) [parent] ——> Contacts (n) [child]",
        example: "SELECT Name, Phone, Website, (SELECT Name, Department, Email FROM Contacts) FROM Account"
    },
    {
        term: "child get parent records",
        attachment: "./img/2023-04-18-11-40-43.png",
        description: ":m\n\
        One of the limitations is that you can only get one level deep of records\n\
        ```java\n\
        SELECT Name, Phone, Department, [...] FROM Contact\n\
        ```\n",
        prompt: "Complete missing snippet to get Parents model: Account's Name and Website\n\
        Account (1) [parent] ——> Contacts (n) [child]",
        example: ":m `SELECT Name, Phone, Department, Account.Name, Account.Website FROM Contact`"

    },
    {
        term: "Retrieve all Cases |CaseNumber, Subject| raised by the contact",
        attachment: "./img/2023-04-18-12-00-25.png",
        description: ":m\n\
        ```java\n\
        SELECT Name, Department, Title, [...] FROM Contact\n\
        ```\n",
        example: "SELECT Name, Department, Title, (SELECT CaseNumber, Subject FROM Cases) FROM Contact",
        prompt: "Complete missing snippet to get CaseNumber, Subject of Cases related to the Contact like on the image"
    },
    // Map examples
    {
        term: "map create map",
        prompt: "Create a map with key as String and value as Integer where maps one to 1",
        example: ":m\n\
        ```java\n\
        Map<String, Integer> map = new Map<String, Integer>{\
            'one' => 1\n\
        };\n\
        ```\n",
    },
    {
        term: "iterate map values",
        prompt: "Iterate over map values and print them as `value: x`",
        description: ":m\n\
        ```java\n\
        Map<String, Integer> map = new Map<String, Integer>{\
            'one' => 1\n\
        };\n\
        ```\n",
        example: ":m\n\
        ```java\n\
        for (Integer value : map.values()) {\n\
            System.debug('value: '+value);\n\
        }\n\
        ```\n",
    },
    {
        term: "List methods I ",
        description: ":m\n\
        ```java\n\
        List<String> myList = new List<String>();\n## 1. Add Apple\nmyList.add('banana');\nmyList.add('cherry');\n\n## 2. Get the first fruit\nSystem.debug('Second fruit: ' + fruit);\n\nmyList.set(0, 'orange');\nSystem.debug('New first fruit: ' + myList.get(0));\n\nmyList.remove(2);\nSystem.debug('List after removing cherry: ' + myList);\n\n## 3. Check if we have bananas\n{\n System.debug('We have bananas!');\n}\n\nmyList.clear();\nSystem.debug('List is empty: ' + myList.isEmpty());",
        prompt: "Complete the ## 1. Add Apple, ## 2. Get the first fruit, ## 3. Check if we have bananas",
        example: ":m\n\
        ```java\n\
        1. myList.add('apple');\n\
        2. String fruit = myList.get(0);\n\
        3. if (myList.contains('banana'))\n\
        ```\n",
    },
    {
        term: "List methods Part II",
        description: ":m\n\
        ```java\n\
        List<String> myList = new List<String>();\nmyList.add('apple');\nmyList.add('banana');\nmyList.add('cherry');\n\nString fruit = myList.get(1);\nSystem.debug('Second fruit: ' + fruit);\n\n## 1. Change the first fruit to orange\nSystem.debug('New first fruit: ' + myList.get(0));\n\n## 2. Remove the cherry\nSystem.debug('List after removing cherry: ' + myList);\n\nif (myList.contains('banana')) {\n System.debug('We have bananas!');\n}\n\n## 3. Check if the list is empty\nSystem.debug('List is empty: ' + myList.isEmpty());",
        prompt: "Complete the ## 1. Change the first fruit to orange, ## 2. Remove the cherry, ## 3. Check if the list is empty",
        example: ":m\n\
        ```java\n\
        myList.set(0, 'orange');\n\
        myList.remove(2);\n\
        myList.clear();\n\
        ```\n",
    },
    {
        term: "BIND queries I",
        description: "String accountName = 'Acme Corporation';\n\
        List<Account> matchingAccounts = Database.query('SELECT Id, Name, Industry FROM Account WHERE [COMPLETE]');",
        prompt: "Complete the query to get all Accounts with name equals to `Acme Corporation` using the variable `accountName`",
        example: ":m\n\
        ```java\n\
        String accountName = 'Acme Corporation';\n\
        List<Account> matchingAccounts = Database.query('SELECT Id, Name, Industry FROM Account WHERE Name = :accountName');\n\
        ```\n",
    },
    {
        term: "BIND queries II | using Maps",
        description: "Map<String, Object> acctBinds = new Map<String, Object>{'acctName' => 'Acme Corporation'};\n\
        List<Account> accts =Database.queryWithBinds('SELECT Id FROM Account WHERE [...]');",
        prompt: "Complete the query to get all Accounts with name equals to `Acme Corporation` using the map variable `acctBinds`",
        example: ":m\n\
        ```java\n\
        List<Account> accts =      Database.queryWithBinds('SELECT Id FROM Account WHERE Name = :acctName',     acctBinds,      AccessLevel.USER_MODE);\n\
        ```\n",

    },
    {
        "term": "DML | insert-records",
        "prompt": "Insert two new records into the Account object",
        "example": ":m\n\\```js\nAccount newAccount1 = new Account(Name = 'Acme Corporation', Industry = 'Technology');\nAccount newAccount2 = new Account(Name = 'Globex Inc.', Industry = 'Finance');\ninsert newAccount1;\ninsert newAccount2;\n\\```\\",
        "description": "Insert two new records into the Account object."
    },
    {
        "term": "DML | update-records",
        "prompt": "Update the Industry field of an existing Account record",
        "example": ":m existingAccount.Industry = 'Manufacturing';\nupdate existingAccount;\n\n\
        \n\\```js\nAccount existingAccount = [SELECT Id, Name, Industry FROM Account WHERE Name = 'Acme Corporation' LIMIT 1];\nexistingAccount.Industry = 'Manufacturing';\nupdate existingAccount;\n\\```\\",
        "description": ":m\n\\```js\nAccount existingAccount = [SELECT Id, Name, Industry FROM Account WHERE Name = 'Acme Corporation' LIMIT 1];\n\
        ## TODO\n\\```\
        \nUpdate the Industry field of an existing Account record."
    },
    {
        "term": "DML | delete-records",
        "prompt": "Delete an existing Account record",
        "example": ":m\n\\```js\nAccount accountToDelete = [SELECT Id FROM Account WHERE Name = 'Globex Inc.' LIMIT 1];\ndelete accountToDelete;\n\\```\\",
        "description": "Delete an existing Account record."
    },
    {
        "term": "insert-multiple-records",
        "prompt": "Insert multiple new records into the Account object Insert Acme Corporation, Globex Inc., and Initech Corp. into the Account object",
        "descrition": ":m\n\\```js\nList<Account> accountsToInsert = new List<Account>();\naccountsToInsert.add(new Account(Name = 'Acme Corporation', Industry = 'Technology'));\naccountsToInsert.add(new Account(Name = 'Globex Inc.', Industry = 'Finance'));\naccountsToInsert.add(new Account(Name = 'Initech Corp.', Industry = 'Manufacturing'));\ninsert accountsToInsert;\n\\```\\",
        "example": ":m\n\\```js\nList<Account> accountsToInsert = new List<Account>();\n\
        ## ADD THEM\n\
        insert accountsToInsert;\n\\```\\",
    },
    // Annotations
    {
        "term": "Annotations - aura-enabled | TestVisible ",
        "prompt": "What is and when would you use @AuraEnabled or @TestVisibible?",
        "description": "AuraEnabled: \n\
        This annotation is used to expose an Apex method as a Aura-enabled Apex method, which means it can be called from an Aura component.\
        \n\
        TestVisible: \n\
        This annotation is used to make a private method or variable visible to test methods.\
        \n\
        ",
    },
    {
        "term": "Annotations - deprecated | future ",
        "prompt": "What is and when would you use @deprecated or @future?",
        "description": "Deprecated: \n\
        This annotation is used to indicate that the method is deprecated.\n\
        Use: \
        \n\
        Future: \n\
        This annotation is used to identify methods that are executed asynchronously. Methods with the future annotation must be static methods, and can only return a void type.\
        \n\
        ",
    },
    {
        "term": "Annotations - invocableMethod | invocableVariable ",
        "prompt": "What is and when would you use @invocableMethod or @invocableVariable?",
        "description": "InvocableMethod: \n\
        This annotation is used to identify methods that can be run as invocable actions. Invocable methods are called with the REST API and used to invoke a single Apex method.\
        \n\
        InvocableVariable: \n\
        This annotation is used to identify variables that can be used as part of invocable actions.\n\
        \n\
        ",

    },
    {
        "term": "Annotations - isTest | NamespaceAccessible() ",
        "prompt": "What is and when would you use @isTest or @NamespaceAccessible?",
        "description": "isTest: \n\
        This annotation is used to define classes and individual methods that only contain code used for testing your application.\
        \n\
        NamespaceAccessible: \n\
        This annotation is used to identify classes that are accessible to the namespace.\
        \n\
        ",
    },

]

const IDE_S = [
    // Android Studio Shortcuts
    {
        term: "Android Studio | navigation keys | class search",
        description: "     Ctrl+N — Navigate to Class     Ctrl+Shift+N — Navigate to a File     Ctrl+B — Jump to Declarations     Alt+ ↑ — Jump to the Previous Method     Alt+↓ — Jump to Next Method     Ctrl+G — Jump to Line     Ctrl+E — Recent Files     Ctrl+Shift+Backspace — Jump to Last Edited Location     Ctrl+B — Find Declarations     Ctrl+Left Mouse(or)Ctrl+Alt+F7— Show Usage     Alt + F7 / Ctrl + F7 — Find usages /Find usages in file     Ctrl+Shift+B — Find Implementations     F3 — Find Next     Shift+F3 — Find Previous ",
        prompt: "Find a class named `Mock` | How to navigate to a file? ",
        example: "Ctrl+N Mock — Navigate to Class\n\n\
        Ctrl + Shift + N — Navigate to a File\n"
    },
    {
        term: "Android Studio | navigation keys | recent",
        description: "     Ctrl+N — Navigate to Class     Ctrl+Shift+N — Navigate to a File     Ctrl+B — Jump to Declarations     Alt+ ↑ — Jump to the Previous Method     Alt+↓ — Jump to Next Method     Ctrl+G — Jump to Line     Ctrl+E — Recent Files     Ctrl+Shift+Backspace — Jump to Last Edited Location     Ctrl+B — Find Declarations     Ctrl+Left Mouse(or)Ctrl+Alt+F7— Show Usage     Alt + F7 / Ctrl + F7 — Find usages /Find usages in file     Ctrl+Shift+B — Find Implementations     F3 — Find Next     Shift+F3 — Find Previous ",
        prompt: "Go to the recent file score.dart",
        example: "Ctrl+E score.dart — Recent Files"
    },
    {
        term: "Android Studio | navigation keys | declaration",
        description: "     Ctrl+N — Navigate to Class     Ctrl+Shift+N — Navigate to a File     Ctrl+B — Jump to Declarations     Alt+ ↑ — Jump to the Previous Method     Alt+↓ — Jump to Next Method     Ctrl+G — Jump to Line     Ctrl+E — Recent Files     Ctrl+Shift+Backspace — Jump to Last Edited Location     Ctrl+B — Find Declarations     Ctrl+Left Mouse(or)Ctrl+Alt+F7— Show Usage     Alt + F7 / Ctrl + F7 — Find usages /Find usages in file     Ctrl+Shift+B — Find Implementations     F3 — Find Next     Shift+F3 — Find Previous ",
        prompt: "Go to the declaration of a method, you are now hovering over response",
        example: "Ctrl Left mouse or Ctrl+B — Jump to Declarations => This will take you to the declaration of the method"
    },
    {
        term: "Android Studio | navigation keys | navigate to file",
        description: "     Ctrl+N — Navigate to Class     Ctrl+Shift+N — Navigate to a File     Ctrl+B — Jump to Declarations     Alt+ ↑ — Jump to the Previous Method     Alt+↓ — Jump to Next Method     Ctrl+G — Jump to Line     Ctrl+E — Recent Files     Ctrl+Shift+Backspace — Jump to Last Edited Location     Ctrl+B — Find Declarations     Ctrl+Left Mouse(or)Ctrl+Alt+F7— Show Usage     Alt + F7 / Ctrl + F7 — Find usages /Find usages in file     Ctrl+Shift+B — Find Implementations     F3 — Find Next     Shift+F3 — Find Previous ",
        prompt: "Navigate to a file named score.dart",
        example: "Ctrl+Shift+N score.dart — Navigate to a File => This will take you to the file, the difference with recent is that it will take longer to search"
    },

    {
        term: "Android Studio | navigation keys | find usage",
        description: "     Ctrl+N — Navigate to Class     Ctrl+Shift+N — Navigate to a File     Ctrl+B — Jump to Declarations     Alt+ ↑ — Jump to the Previous Method     Alt+↓ — Jump to Next Method     Ctrl+G — Jump to Line     Ctrl+E — Recent Files     Ctrl+Shift+Backspace — Jump to Last Edited Location     Ctrl+B — Find Declarations     Ctrl+Left Mouse(or)Ctrl+Alt+F7— Show Usage     Alt + F7 / Ctrl + F7 — Find usages /Find usages in file     Ctrl+Shift+B — Find Implementations     F3 — Find Next     Shift+F3 — Find Previous ",
        prompt: "Find the usage of a method, you are now hovering over response",
        example: "Ctrl+Alt+F7— Show Usage => This will show you all the places where the method is used"
    },
    // Selection Keys
    {
        term: "Android Studio | selection keys | select next occurence",
        description: "     Ctrl + W — Extend selection (selects a word->line->method->Class )     Ctrl +Shift+ W — Decrease Selection     Alt + J — Select next occurrence     Ctrl + Alt + Shift + J — Select all occurrences     Alt + Shift + J — Unselect occurrence     Ctrl+Shift+V — Paste from recent buffers (from a History of Copied Contents) ",
        prompt: "Select the next occurence of a word, you are now hovering over response How to all and how to unselect?",
        example: "Alt + J — Select next occurrence => This will place a cursor on the same next word\n\n\
        Ctrl + Alt + Shift + J — Select all occurrences => This will place a cursor on all the same words\n\n\
        Alt + Shift + J — Unselect occurrence => This will remove the cursor on the same word\n\n"
    },
    {
        term: "Android Studio | selection keys | Paste from recent clipboard",
        description: "     Ctrl + W — Extend selection (selects a word->line->method->Class )     Ctrl +Shift+ W — Decrease Selection     Alt + J — Select next occurrence     Ctrl + Alt + Shift + J — Select all occurrences     Alt + Shift + J — Unselect occurrence     Ctrl+Shift+V — Paste from recent buffers (from a History of Copied Contents) ",
        prompt: "Paste from recent clipboard",
        example: "Ctrl+Shift+V — Paste from recent buffers (from a History of Copied Contents) => This will show you all the recent clipboard"
    },
    // Editing Keys
    {
        term: "Android Studio | Editing keys | duplicate line",
        description: "     Ctrl+F6 — Refactor Code     Ctrl+D — Duplicate a Line/Selected part     Ctrl+Y — Delete a Line/Selected part     Ctrl+Q — Quick Documentation     Ctrl + Space — Code completion     Ctrl+Shift+Space — Smart code completion (by expected type removes unrelated suggestions)     Alt+Insert — Generate Code     Ctrl+J — Insert Live template     Ctrl + O — Override methods     Ctrl + I — Implement methods     Ctrl + Alt + T — Surround with…     Ctrl + / — Comment / uncomment with line comment     Ctrl + Shift + / — Comment / uncomment with block comment     Ctrl+Alt+L — Reformat code ",
        prompt: "Duplicate a line",
        example: "Ctrl+D — Duplicate a Line/Selected part => This will duplicate the line"
    },
    {
        term: "Android Studio | Editing keys | delete line",
        description: "     Ctrl+F6 — Refactor Code     Ctrl+D — Duplicate a Line/Selected part     Ctrl+Y — Delete a Line/Selected part     Ctrl+Q — Quick Documentation     Ctrl + Space — Code completion     Ctrl+Shift+Space — Smart code completion (by expected type removes unrelated suggestions)     Alt+Insert — Generate Code     Ctrl+J — Insert Live template     Ctrl + O — Override methods     Ctrl + I — Implement methods     Ctrl + Alt + T — Surround with…     Ctrl + / — Comment / uncomment with line comment     Ctrl + Shift + / — Comment / uncomment with block comment     Ctrl+Alt+L — Reformat code ",
        prompt: "Delete a line",
        example: "Ctrl+Y — Delete a Line/Selected part => This will delete the line"
    },
    {
        term: "Android Studio | Editing keys | quick documentation",
        description: "     Ctrl+F6 — Refactor Code     Ctrl+D — Duplicate a Line/Selected part     Ctrl+Y — Delete a Line/Selected part     Ctrl+Q — Quick Documentation     Ctrl + Space — Code completion     Ctrl+Shift+Space — Smart code completion (by expected type removes unrelated suggestions)     Alt+Insert — Generate Code     Ctrl+J — Insert Live template     Ctrl + O — Override methods     Ctrl + I — Implement methods     Ctrl + Alt + T — Surround with…     Ctrl + / — Comment / uncomment with line comment     Ctrl + Shift + / — Comment / uncomment with block comment     Ctrl+Alt+L — Reformat code ",
        prompt: "Quick documentation",
        example: "Ctrl+Q — Quick Documentation => This will show you the documentation of the method"
    },
    {
        term: "Android Studio | Editing keys | code completion",
        description: "     Ctrl+F6 — Refactor Code     Ctrl+D — Duplicate a Line/Selected part     Ctrl+Y — Delete a Line/Selected part     Ctrl+Q — Quick Documentation     Ctrl + Space — Code completion     Ctrl+Shift+Space — Smart code completion (by expected type removes unrelated suggestions)     Alt+Insert — Generate Code     Ctrl+J — Insert Live template     Ctrl + O — Override methods     Ctrl + I — Implement methods     Ctrl + Alt + T — Surround with…     Ctrl + / — Comment / uncomment with line comment     Ctrl + Shift + / — Comment / uncomment with block comment     Ctrl+Alt+L — Reformat code ",
        prompt: "Code completion",
        example: "Ctrl + Space — Code completion => This will show you the suggestions"
    },
    {
        term: "Android Studio | Editing keys | Override and Implement Methods",
        description: "     Ctrl+F6 — Refactor Code     Ctrl+D — Duplicate a Line/Selected part     Ctrl+Y — Delete a Line/Selected part     Ctrl+Q — Quick Documentation     Ctrl + Space — Code completion     Ctrl+Shift+Space — Smart code completion (by expected type removes unrelated suggestions)     Alt+Insert — Generate Code     Ctrl+J — Insert Live template     Ctrl + O — Override methods     Ctrl + I — Implement methods     Ctrl + Alt + T — Surround with…     Ctrl + / — Comment / uncomment with line comment     Ctrl + Shift + / — Comment / uncomment with block comment     Ctrl+Alt+L — Reformat code ",
        prompt: "Override and Implement Methods",
        example: "Ctrl + O — Override methods => This will show you the methods that you can override\n\n\
        Ctrl + I — Implement methods => This will show you the methods that you can implement"
    },
    // Running and Debugging
    {
        term: "Android Studio | Running and Debugging | run",
        description: "     Ctrl + F9 — Compile and Run Make a project     Ctrl + Shift + F9 — Compile selected file, package or module     Shift + F10 — Run     Shift + F9 — Debug     Ctrl + Shift + F10 — Run context configuration from editor \n\
        F8 / F7 — Step over / into     Shift + F7 / Shift + F8 — Smart step into/Step out     Alt + F9 — Run to cursor     Alt + F8 — Evaluate expression     F9 — Resume program     Ctrl + F8 — Toggle breakpoint     Ctrl + Shift + F8 — View breakpoints ",
        prompt: "Compile and Run Make a project, what is the difference between run and compile-run?",
        example: "Ctrl + F9 — Compile and Run Make a project => This will compile and run the project\n\
        Shift + F10 — Run => This will run the project\n\n\
        The difference between the two is that the first one will compile the project and then run it, while the second one will just run the old project"
    }
];


const flutter_dart = [
    {
        term: "flutter | create",
        description: "Create a new flutter project",
        prompt: "Create a new flutter project",
        example: "flutter create myapp"
    },
    {
        term: "flutter | run",
        description: "Run the flutter project",
        prompt: "Run the flutter project",
        example: "flutter run"
    },
    {
        term: "dart | string | interpolation",
        description: "To put the value of an expression inside a string, use ${expression}. If the expression is an identifier, you can omit the {}.",
        prompt: "What will the following print? \n\
        (1) print('${3 + 2}');\n\
        (2) print('${\"word\".toUpperCase()}');\n\
        (3) print('$myObject');\n\
        ",
        example: "1. 5\n\
        2. WORD\n\
        3. The value of myObject.toString()"
    },
    {
        term: "dart | nullable variable",
        description: "When creating a variable in Dart 2.12 or higher, you can add ? to the type to indicate that the variable can be null:     int? a = null; // Valid in null-safe Dart.  ",
        prompt: "simplify that code:",
        example: "int? a; // The initial value will be null"
    },
    {
        term: "dart | null-aware",
        description: ":m Dart offers some handy operators for dealing with values that might be null. One is the ??= assignment operator, which assigns a value to a variable only if that variable is currently null:\n\n\
        ```js\n\
        int? a; // = null\na ??= 3;\nprint(a); // <-- Prints 3.\na ??= 5;\nprint(a); // <-- Still prints 3.\n```\n\n",
        prompt: "What will be the output of the following code?\n\
        ```js\n\
        print(1 ?? 3);\nprint(null ?? 12);.\n```\n\n",
        example: "1\n\
        12"
    },
    {
        term: "dart | list, set, map | map",
        description: "Dart’s type inference can assign types to these variables for you. In this case, the inferred types are List<String>, Set<String>, and Map<String, int>.\n\
        Or you can specify the type yourself:  \n\
        final aListOfInts = <int>[];    final aSetOfInts = <int>{};     final aMapOfIntToDouble = <int, double>{};\n\
        \nSpecifying types is handy when you initialize a list with contents of a subtype, but still want the list to be List<BaseType>:  \n\n\
        final aListOfBaseType = <BaseType>[SubType(), SubType()];  ",
        prompt: "// Assign this a map of String to int so that aMapOfStringsToInts['myKey'] returns 12:\n\
        final aMapOfStringsToInts = ",
        example: "final aMapOfStringsToInts = <String, int>{'myKey': 12};"
    },
    {
        term: "dart | list, set, map assignation | List doubles",
        description: "Dart’s type inference can assign types to these variables for you. In this case, the inferred types are List<String>, Set<String>, and Map<String, int>.\n\
        Or you can specify the type yourself:  \n\
        final aListOfInts = <int>[];    final aSetOfInts = <int>{};     final aMapOfIntToDouble = <int, double>{};\n\
        \nSpecifying types is handy when you initialize a list with contents of a subtype, but still want the list to be List<BaseType>:  \n\n\
        final aListOfBaseType = <BaseType>[SubType(), SubType()];  ",
        prompt: "Assign this an empty List<double>:\n\
        final anEmptyListOfDouble = ",
        example: "final anEmptyListOfDouble = <double>[];"
    },
    {
        term: "dart | list, set, map assignation | double",
        description: "Dart’s type inference can assign types to these variables for you. In this case, the inferred types are List<String>, Set<String>, and Map<String, int>.\n\
        Or you can specify the type yourself:  \n\
        final aListOfInts = <int>[];    final aSetOfInts = <int>{};     final aMapOfIntToDouble = <int, double>{};\n\
        \nSpecifying types is handy when you initialize a list with contents of a subtype, but still want the list to be List<BaseType>:  \n\n\
        final aListOfBaseType = <BaseType>[SubType(), SubType()];  ",
        prompt: "// Assign this an empty Set<String>:\n\
        final anEmptySetOfString = ",
        example: "final anEmptyListOfDouble = <String>{};"
    },
    {
        term: "dart | cascade | null cascade",
        description: ":m Here’s the same expression with a cascade:\n\
        ```js\n\
        myObject..someMethod()\n\
        ```\n\
        Although it still invokes someMethod() on myObject, the result of the expression isn’t the return value—it’s a reference to myObject!  Using cascades, you can chain together operations that would otherwise require separate statements. For example, consider the following code, which uses the conditional member access operator (?.) to read properties of button if it isn’t null:\n\
        ```js\n\
        var button = querySelector('#confirm');\nbutton?.text = 'Confirm';\nbutton?.classes.add('important');\nbutton?.onClick.listen((e) => window.alert('Confirmed!'));\nbutton?.scrollIntoView();\n\
        ```\n\
        ",
        prompt: "Convert the latter example into a null shorting cascade (?..)",
        example: "```js\n\
        querySelector('#confirm') ?..text = 'Confirm'..classes.add('important')..onClick.listen((e) => window.alert('Confirmed!'))..scrollIntoView();\n\
        ```"
    },
    {
        term: "dart | optional parameters | positional ",
        prompt: "change the header of the following so that the second and third parameters are optional:\n\
        int sumUp(int a, int b, int c)\n\n\
        so that these works:\n\
        int total = sumUpToFive(1, 2);\n\
        int total_2 = sumUpToFive(1, 2, 3);\n",
        example: "int sumUp(int a, [int? b, int? c])\n\
        or: int sumUp(int a, [int b = 0, int c = 0])"
    },
    {
        term: "dart | optional parameters | named",
        prompt: "change the header of the following so that the third parameters is optional and is named:\n\
        int sumUp(int a, int b, int c)\n\n\
        so that these works:\n\
        (Suppose that we want to assign: a => 1, b => 2, c => 3)\n\
        int total = sumUpToFive(1, c:3, 2);\n",
        example: "int sumUp(int a, int b, {int? c})"
    },
    {
        term: "dart | exceptions | catching",
        description: ":m\n\
        ```js\n\
        class OutOfLlamasException implements Exception {\n String errorMessage() {\n return 'Out of Llamas!';\n }\n}\n\n\
        throw OutOfLlamasException();\n\
        throw Exception('Something bad happened.');\n\
        throw 'Waaaaaaah!';\n\
        ```",
        prompt: ":m complete the missing snippet so that both exceptions and errors are caught:\n\
        ```js\n\
        try {\n breedMoreLlamas();\n} on [#1] {\n // A specific exception\n buyMoreLlamas();\n} [#2] {\n // Anything else that is an exception\n print('Unknown exception: $e');\n} [#3] {\n // No specified type, handles all\n print('Something really unknown: $e');\n}\n\
        ```",
        example: "#1 OutOfLlamasException\n\
        #2 on Exception catch (e)\n\
        #3 catch (e)\n\
        "
    },
    {
        term: "dart | exceptions | rethrow",
        description: ":m If you can’t completely handle the exception, use the rethrow keyword to propagate the exception:\n\
        ```js\n\
        try {\n breedMoreLlamas();\n} catch (e) {\n print('I was just trying to breed llamas!');\n rethrow;\n}\n\
        ```\n\
        To execute code whether or not an exception is thrown, use finally:\n\
        ```js\n\
        try {\n breedMoreLlamas();\n} catch (e) {\n // ... handle exception ...\n} finally {\n // Always clean up, even if an exception is thrown.\n cleanLlamaStalls();\n}\n\
        ```",
        prompt: "Whats the difference between finally and rethrow?",
        example: "finally is always executed, rethrow is used to propagate the exception"
    },
    {
        term: "dart | this | constructor",
        description: ":m\n\
        ```js\n\
        class MyColor {\n int red;\n int green;\n int blue;\n\n MyColor(this.red, this.green, this.blue);\n}\n\nfinal color = MyColor(80, 80, 128);\n\
        ```",
        prompt: "Modify the constructor of My Class Color so that red, green and blue are optional and default to 0",
        example: "MyColor([this.red = 0, this.green = 0, this.blue = 0]);"
    },
    {
        term: "dart | this | constructor",
        description: ":m\n\
        ```js\n\
        class MyColor {\n int red;\n int green;\n int blue;\n\n MyColor(this.red, this.green, this.blue);\n}\n\nfinal color = MyColor(80, 80, 128);\n\
        ```",
        prompt: "Modify the constructor of My Class Color so that red, green and blue are named (mandatroy) properties",
        example: "MyColor({required this.red, required this.green, required this.blue});"
    },
    {
        term: "dart | named constructors",
        description: ":m\n\
        ```js\n\
        class Point {\n double x, y;\n\n Point(this.x, this.y);\n\n Point.origin()\n : x = 0,\n y = 0;\n}\n\
        ```",
        prompt: "Used the named constructor to create a point at the origin",
        example: "final origin = Point.origin();"
    },
    {
        term: "dart | factory constructors",
        description: ":m\n\
        ```js\n\
        class Square extends Shape {}\nclass Circle extends Shape {}\nclass Shape {\n Shape();\n\n ## Complete HERE {\n if (typeName == 'square') return Square();\n if (typeName == 'circle') return Circle();\n\n throw ArgumentError('Unrecognized $typeName');\n }\n}\n\
        ```",
        prompt: "Complete the factory constructor so that it returns a Square or a Circle depending on the typeName",
        example: "factory Shape.fromTypeName(String typeName)"
    },
    {
        term: "flutter | stateful widget | set state",
        description: ":m\n\
        ```js\n\
        class BasePage extends StatefulWidget {\n State<StatefulWidget> createState() {\n return _BasePageState();\n }\n}\n\nclass _BasePageState extends State<BasePage> {\n int _value = 0;\n void _increment() {\n ## TODO\n }\n}\n\
        ```",
        prompt: "Complete the missing _increment method sot that _value is increased when the method is called",
        example: "setState(() {\n _value++;\n });\n"
    },
    {
        term: "flutter | stateful widget | inistate theory",
        description: ":m\n\
        ```js\n\
        @override\n\
        void initState() {\n\
        super.initState()\n\
        // add here what to do, e.g. fetch data from remote\n\
        }\n\
        ```",
        prompt: "What is the purpose of initState?",
        example: "It is called when the widget is inserted in the widget tree"
    },
    {
        term: "flutter | stateful widget | initstate",
        description: ":m\n\
        ```js\n\
        // add here what to do, e.g. fetch data from remote\n\
        }\n\
        ```",
        prompt: "Write the three missing lines for creating an initstate override?",
        example: "\n\
        @override\n\
        void initState() {\n\
        super.initState()\n"
    },
    {
        term: "Flutter | stateful | didUpdateWidget",
        description: ":m\n\
        ```js\n\
        @override\n\
        void didUpdateWidget(covariant oldWidget) {\n\
        ## MISSING\n\
        // add here what to do, e.g. fetch data from remote\n\
        }\n\
        ```",
        prompt: "Write the missing line for creating a didUpdateWidget override?",
        example: "super.didUpdateWidget(oldWidget);\n"
    },
    {
        term: "Flutter | stateful | Stateful Classes",
        description: ":m\n\
        ```js\n\
        class BasePage extends [##1] {\n [##2] createState() {\n return _BasePageState();\n }\n}\n\nclass _BasePageState extends [##3]{\n int _value = 0;\n void _increment() {\n setState(() {\n _value++;\n });\n }\n}\n\
        ```",
        prompt: "Complete the missing parts of the code so that BasePage is a stateful widget",
        example: "1: StatefulWidget\n2: State<StatefulWidget>\n3: State<BasePage>"
    },
    {
        term: "Widget | GestureDetector | properties",
        attachment: "https://blog.codemagic.io/uploads/2022/10/gesturewidget-1.png#center",
        description: ":m\n\
        ```js\n\
        GestureDetector(\n [##1]: () {\n const snackBar = SnackBar(content: Text('Tap'));\n ScaffoldMessenger.of(context).showSnackBar(snackBar);\n },\n child: Container(\n ## COMPLETE HERE\n,\n child: const Text('My Button'),\n ),\n)\n\
        ```",
        prompt: "Complete the missing code, so  hat it creates the figure above, with edges paddings of 12 (all) and a circular border radius of 8",
        example: ":m\n\
        padding: const EdgeInsets.all(12.0),\n decoration: BoxDecoration(\n color: Colors.lightBlue,\n borderRadius: BorderRadius.circular(8.0), \n\
        ```js\n\
        GestureDetector(\n onTap: () {\n const snackBar = SnackBar(content: Text('Tap'));\n ScaffoldMessenger.of(context).showSnackBar(snackBar);\n },\n child: Container(\n padding: const EdgeInsets.all(12.0),\n decoration: BoxDecoration(\n color: Colors.lightBlue,\n borderRadius: BorderRadius.circular(8.0),\n ),\n child: const Text('My Button'),\n ),\n)\n\
        ```",

    },
    {
        term: "Widget | GestureDetector | onTap",
        attachment: "https://blog.codemagic.io/uploads/2022/10/gesturewidget-1.png#center",
        description: ":m\n\
        ```js\n\
        GestureDetector(\n onTap: () {\n ## COMPLETE HERE \n },\n child: Container(\n padding: const EdgeInsets.all(12.0),\n decoration: BoxDecoration(\n color: Colors.lightBlue,\n borderRadius: BorderRadius.circular(8.0),\n ),\n child: const Text('My Button'),\n ),\n)\n\
        ```",
        prompt: "Complete it so that it shows a snackbar with the text 'Tap' when the button is tapped\n\
        Color: lightblue",
        example: ":m\n\
        const snackBar = SnackBar(content: Text('Tap'));\n ScaffoldMessenger.of(context).showSnackBar(snackBar);\n\n\
        ```js\n\
        GestureDetector(\n onTap: () {\n const snackBar = SnackBar(content: Text('Tap'));\n ScaffoldMessenger.of(context).showSnackBar(snackBar);\n },\n child: Container(\n padding: const EdgeInsets.all(12.0),\n decoration: BoxDecoration(\n color: Colors.lightBlue,\n borderRadius: BorderRadius.circular(8.0),\n ),\n child: const Text('My Button'),\n ),\n)\n\
        ```",
    },
    {
        term: "widget | Alert Dialog | alert ",
        attachment: "https://blog.codemagic.io/dialogwidget_13619648723351944144_huebb6c3db760e71da697d69c329e419e5_0_1280x1800_fit_linear_3.png",
        description: ":m\n\
        ```js\n\
        Future<void> _showMyDialog() async {\n return showDialog<void>(\n context: context,\n ## [0], // user must tap button!\n builder: (BuildContext context) {\n return ### [1](\n title: const Text('Cheat Sheet'),\n content: SingleChildScrollView(\n child: ListBody(\n children: const <Widget>[\n Text('This is a demo alert dialog.'),\n Text('Would you like to approve of this message?'),\n ],\n ),\n ),\n actions: <Widget>[\n TextButton(\n child: const Text('Approve'),\n\
        onPressed: () {\n\n },\n ),\n ],\n );\n },\n );\n}\n\
        ```",
        prompt: "Complete the following so that it displays an aprove action button, and is not dismissible in any other way\n\
        [0]: Se it as undismissable by clicking away\n\
        [1]: The class of the alert object",
        example: "[0]: barrierDismissible: false, [1] AlertDialog   "

    },
    {
        term: "widget | Alert Dialog | List Body",
        attachment: "https://blog.codemagic.io/dialogwidget_13619648723351944144_huebb6c3db760e71da697d69c329e419e5_0_1280x1800_fit_linear_3.png",
        description: ":m\n\
        ```js\n\
        ## 1\n\
         _showMyDialog() async {\n return showDialog<void>(\n context: context,\n barrierDismissible: false, // user must tap button!\n builder: (BuildContext context) {\n return AlertDialog(\n title: const Text('Cheat Sheet'),\n\
        ## [1] \n\
        (\n child: ListBody(\n children: const <Widget>[\n Text('This is a demo alert dialog.'),\n Text('Would you like to approve of this message?'),\n ],\n ),\n ),\n actions: <Widget>[\n TextButton(\n child: const Text('Approve'),\n onPressed: () {\n Navigator.of(context).pop();\n },\n ),\n ],\n );\n },\n );\n}\n\
        ```",
        prompt: "Complete the following so that it contains a list boyd of text (listBody) from an array of texts, in a scrollable manner\n\
        [0] the return type: should be a promise\n\
        [1] the content: should be a scrollable list body",
        example: "[0]  Future<void> \n\
        [1] content: SingleChildScrollView"

    },
    {
        term: "widget | Dismissable | list creation",
        description: ":m\n\
        ```\n\
        List<String> items = <String>['banana', 'strawberry', 'apple', 'orange', 'cat', 'bobcat'];\n## [1] (\n\
            ## [2], \n\
            ## [3], \n\
            ## [4] \n\
             {return Dismissible(background: Container(color: Colors.green,), key: Key(items[index]), onDismissed: (DismissDirection direction) {setState(() {items.removeAt(index);});}, child: ListTile(title: Text('Item ${items[index]}',),),);},),\n\
        ```\n\
        ",
        prompt: "Complete the following: to create a list view of dismissable items, with a green background when dismissed to the right, with a space of 16 between each item\n\
        [1] the list view builder class\n\
        [2] the number of items in the list\n\
        [3] the padding between each item: 16 in vertical\n\
        [4] the item builder asiignation with the respective parameters that will be passed down.",
        example: "[1] ListView.builder\n\
        [2] itemCount: items.length \n\
        [3] padding: const EdgeInsets.symmetric(vertical: 16),\n\
        [4] itemBuilder: (BuildContext context, index) "
    },
    {
        term: "widget | Dismissable | dismissable methods",
        description: ":m\n\
        ```\n\
        List<String> items = <String>['banana', 'strawberry', 'apple', 'orange', 'cat', 'bobcat'];\nListView.builder(itemCount: items.length, padding: const EdgeInsets.symmetric(vertical: 16), itemBuilder: (BuildContext context, index) {return Dismissible(background: Container(color: Colors.green,), ## [1], \n\
            ## [2] {setState(() {items.removeAt(index);});}, child: \n\
            ## [3](title: Text('Item ${items[index]}',),),);},),\n\
        ```\n\
        ",
        prompt: "Complete the following: to create a list view of dismissable items, with a green background when dismissed to the right\n\
        Add the keys,\n on dismissing method hook, \nand the child tile to be rendered on.\n\
        [1] assigne the key\n\
        [2] assigne the onDismissed method, capture the direction and remove the item from the list\n\
        [3] assign the tile to the children with title as item {name}\n",
        example: "[1] key: Key(items[index]),\n\
        [2] onDismissed: (DismissDirection direction) {setState(() {items.removeAt(index);});},\n\
        [3] child: ListTile(title: Text('Item ${items[index]}',),),"
    },
    {
        term: "widget | InteractiveViewer | zoom",
        description: ":m\n\
        If you have a big picture that doesn’t fit on the screen, you can use the InteractiveViewer widget to enable it to fit on the screen by allowing the user to zoom in and out of the picture.\n\
        ```js\n\
        ##[1]\n\
        (boundaryMargin: const EdgeInsets.all(20.0), child: Container(decoration: const BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: <Color>[Colors.blue, Colors.yellow], stops: <double>[0.0, 1.0],),),),),\n\
        ```",
        prompt: "Complete the following: to create a zoomable view of a gradient background",
        example: "[1] InteractiveViewer"
    },
    {
        term: "Flutter | Navigation | named and pop",
        description: ":m\n\
        ```js\n\
        void main() {\n runApp(MaterialApp(\n initialRoute: '/',\n routes: {\n '/': ((context) => const FirstScreen()),\n\
        ##[1]\n\
        },\n\
        ##[2]\n\
        ,\n ));\n}\n\nclass MyApp extends StatelessWidget {\n const MyApp({Key? key}) : super(key: key);\n\n @override\n Widget build(BuildContext context) {\n return Scaffold(\n appBar: AppBar(\n title: const Text('Navigation'),\n ),\n body: const FirstScreen(),\n );\n }\n}\n\nclass FirstScreen extends StatelessWidget {\n const FirstScreen({Key? key}) : super(key: key);\n\n @override\n Widget build(BuildContext context) {\n return Center(\n child: ElevatedButton(\n child: const Text('Go to SecondScreen'),\n\
        ## [3],\n\
        ),\n );\n }\n}\n\n// can add this in a new file\n\nclass SecondScreen extends StatelessWidget {\n const SecondScreen({Key? key}) : super(key: key);\n\n @override\n Widget build(BuildContext context) {\n return ElevatedButton(\n child: const Text('Go back!'),\n onPressed: () => Navigator.pop(context),\n );\n }\n}\n\
        ```",
        prompt: "Complete the following: to create a navigation from one screen to another, and back\n\
        [1] second screen route under '/second'\n\
        [2] initialize home to MyApp()\n\
        [3] add the onPressed method to the button to navigate to the second screen",
        example: "[1] '/second': ((context) => const SecondScreen()),\n\
        [2] home: const MyApp()\n\
        [3] onPressed: () => Navigator.pushNamed(context, '/second'),"

    },
    {
        term: "FLutter | KOptions | autocomplete",
        description: ":m\n\
        ```js\n\
        const List<String> _kOptions = <String>['aardvark', 'bobcat', 'chameleon'];\n\
        ## [1]\n\
        (optionsBuilder: (TextEditingValue textEditingValue) {if (textEditingValue.text == '') {return const Iterable<String>.empty();}\nreturn _kOptions.where((String option) {return option.contains(textEditingValue.text.toLowerCase());});},onSelected: (String selection) {debugPrint('You just selected $selection');},);\n\
        ```",
        prompt: "Complete the following: to create an autocomplete widget with the following options: aardvark, bobcat, chameleon",
        example: "[1] Autocomplete<String>"
    },
    {
        term: "Flutter | Navigation | named and pop",
        description: ":m\n\
        ```js\n\
        ## [1]\n\
        (obscureText: true, decoration: InputDecoration(border: \n\
            ## [2], \n\
            labelText: 'Password',),),\n\
        ```",
        prompt: "Complete the following: to create a password field with a border and label\n\
        [1] Input Class Name\n\
        [2] border type",
        example: "[1] TextField\n\
        [2] OutlineInputBorder()"

    },
    // Alignment and Layout Fields
    {
        term: "Widget | Centering",
        prompt: "Wrap and center: Text('Center me')",
        example: "Center(child: Text('Center me'))"
    },
    {
        term: "widget | expanded",
        attachment: "./img/2023-04-11-13-04-49.png",
        description: "Expanded(               child: Container(                 color: Colors.amber,                 width: 100,               ),             ),",
        prompt: "Create a widget that expands vertically with width constraint of 100 and color amber",
        example: "Expanded(child: Container(color: Colors.amber, width: 100,),)"
    },
    {
        term: "widget | Align",
        description: "Align this child in the following container (at the top and Right):\n\
        Center(child: Container(height: 120.0, width: 120.0, color: Colors.blue[50], child: ),)\n\n\
        children: F",
        example: "const Align(alignment: Alignment.topRight, child: F,)\n\n\
        Center(child: Container(height: 120.0, width: 120.0, color: Colors.blue[50], child: const Align(alignment: Alignment.topRight, child: FlutterLogo(size: 60,),),),)"
    },
    {
        term: "widget | column",
        description: "The Column widget allows you to arrange a list of widgets vertically, similar to how the Row widget aligns them horizontally.\n\
        ```js\n\
        Column(children: [Text('Deliver features faster'), Text('Craft beautiful UIs'), Expanded(child: FittedBox(fit: BoxFit.contain, child: FlutterLogo(),),),],)\n\
        ```",
        prompt: "Create a column with the following children:",
        example: "Column(children: <Widget>[...],)"
    },
    {
        term: "widget | SizedBox",
        description: "If given a child, this widget forces it to have a specific width and/or height. These values will be ignored if this widget's parent does not permit them. For example, this happens if the parent is the screen (forces the child to be the same size as the parent), or another SizedBox (forces its child to have a specific width and/or height). This can be remedied by wrapping the child SizedBox in a widget that does permit it to be any size up to the size of the parent, such as Center or Align.",
        prompt: "Wrap the following widget with a SizedBox with width 200 and height 300: Card(child: Text('Size me!')) [you can denote the card as ...]",
        example: "const SizedBox(width: 200.0, height: 300.0, child: Card(child: Text('Size me!')),)"
    },
    {
        term: "widget | Baseline",
        description: "This widget shifts the child down such that the child's baseline (or the bottom of the child, if the child has no baseline) is baseline logical pixels below the top of this box, then sizes this box to contain the child.",
        prompt: "Wrap the following widget with a Baseline with baselineType: TextBaseline.alphabetic and baseline: 80.0: Text('Baseline')",
        example: "const Baseline(baseline: 80.0, baselineType: TextBaseline.alphabetic, child: Text('Baseline'),)"
    },
    {
        term: "widget | LimitedBox",
        description: "A box that limits its size only when it's unconstrained. If the maximum width or height is not null, this widget will try to be that size, within the limits of its own constraints. If either is null, this widget will size itself to match the child's size in that dimension.",
        prompt: "Wrap the following widget with a LimitedBox with maxWidth: 150.0 and maxHeight: 150.0: Text('Limited Box')",
        example: "const LimitedBox(maxWidth: 150.0, maxHeight: 150.0, child: Text('Limited Box'),)"
    },
    {
        term: "widget | Padding",
        description: "Use the Padding widget to provide space around its child. The padding widget adds space around its child using the abstract EdgeInsetsGeometry class.",
        prompt: "Wrap the following widget with a Padding with padding: of all edges of 20: Text('Padding')",
        example: "const Padding(padding: EdgeInsets.all(20.0), child: Text('Padding'),)"
    },
    {
        term: "widget | AspectRatio",
        description: "A widget that attempts to size the child to a specific aspect ratio. The widget first tries the largest width permitted by the layout constraints. If the resulting height is too large, it then tries the largest height permitted by the layout constraints. If the resulting width is too large, it uses the original width. If the resulting height is still too large, it takes whatever space is available.",
        prompt: "Wrap the following widget with an AspectRatio with aspectRatio: 16/9: Text('Aspect Ratio')",
        example: "const AspectRatio(aspectRatio: 16/9, child: Text('Aspect Ratio'),)"
    },
    {
        term: "widget | Scaffold",
        description: "Implements the basic Material Design visual layout structure.  This class provides APIs for showing drawers and bottom sheets.  To display a persistent bottom sheet, obtain the ScaffoldState for the current BuildContext via Scaffold.of and use the ScaffoldState.showBottomSheet function.",
        prompt: "Wrap the following widget with a Scaffold: Text('Scaffold'), and create and appbar with title: 'sample'",
        example: "Scaffold(appBar: AppBar(title: Text('sample'),), body: Text('Scaffold'),)"
    },
    {
        term: "Flutter | loaders",
        description: ":m\n\
        ```js\n\
        class SomeWidget extends StatefulWidget {\n @override\n _SomeWidgetState createState() => _SomeWidgetState();\n}\nclass _SomeWidgetState extends State<SomeWidget> {\n late Future future;\n @override\n void initState() {\n\
            ##[1]\n\
            super.initState();\n }\n @override\n Widget build(BuildContext context) {\n\
            return FutureBuilder(\n future: future,\n\
            builder: (context, snapshot) {\n\
            return ##[2] \n\
            ? const Text('Loaded')\n : const CircularProgressIndicator();\n },\n );\n }\n}\n\
        ```",
        prompt: "Complete the following code to show a CircularProgressIndicator while the future is not done, and show 'Loaded' when the future is done\n\
        [1] create the artificial delay using future.\n\
        [2] check if the future is done using using the snapshot state",
        example: "[1] future = Future.delayed(const Duration(seconds: 8));\n\
        [2] snapshot.connectionState == ConnectionState.done"
    },
    // Buttons
    {
        term: "Flutter | button | TextButton",
        description: "A Material Design text button. Text buttons are typically used for less-pronounced actions, including those located in dialogs and cards. Text buttons are also a good choice for inline actions, such as in rows of data.",
        prompt: "Create a TextButton with onPressed: () => print('Pressed'), color of the text is white and child: Text('Text Button')",
        example: "TextButton(onPressed: () => print('Pressed'), child: Text('Text Button'), style: TextButton.styleFrom(primary: Colors.white),)"

    }, {
        "term": "Flutter | loaders",
        "description": ":m\n\
          ```js\n\
          class SomeWidget extends StatefulWidget {\n @override\n _SomeWidgetState createState() => _SomeWidgetState();\n}\nclass _SomeWidgetState extends State<SomeWidget> {\n late Future future;\n @override\n void initState() {\n\
              ##[1]\n\
              super.initState();\n }\n @override\n Widget build(BuildContext context) {\n\
              return FutureBuilder(\n future: future,\n\
              builder: (context, snapshot) {\n\
              return ##[2] \n\
              ? const Text('Loaded')\n : const CircularProgressIndicator();\n },\n );\n }\n}\n\
          ```",
        "prompt": "Complete the following code to show a CircularProgressIndicator while the future is not done, and show 'Loaded' when the future is done\n\
          [1] create the artificial delay using future.\n\
          [2] check if the future is done using the snapshot state",
        "example": "[1] future = Future.delayed(const Duration(seconds: 8));\n\
          [2] snapshot.connectionState == ConnectionState.done"
    },



];

const chrome_extensions = [
    {
        term: "manifest_reading",
        description: ':m \n\
        ```js\n\
        {"manifest_version": 3,\n"name": "Timer Extension",\n"version": "1.0.0",\n"description": "Hello Chrome World!",\n"icons": {"16": "icon.png","48": "icon.png","128": "icon.png"},\n"action": {"default_icon": {"16": "icon.png","48": "icon.png","128": "icon.png"},"default_title": "Timer Extension Action Title","default_popup": "popup.html"},\n"options_page": "options.html",\n"permissions": ["storage", "alarms", "notifications", "unlimitedStorage"],\n"background": {"service_worker": "background.js"}}\
        ```',
        attachment: "./img/2023-05-02-13-07-50.png",
        prompt: "What is the name of the extension?, what will be the description?",
        example: "Timer Extension\n\
        Hello Chrome World!"
    },
    {
        term: "manifest | add a background script",
        description: ':m \n\
        ```js\n\
        {"manifest_version": 3,\n"name": "Timer Extension",\n"version": "1.0.0",\n"description": "Hello Chrome World!",\n"icons": {"16": "icon.png","48": "icon.png","128": "icon.png"},\n"action": {"default_icon": {"16": "icon.png","48": "icon.png","128": "icon.png"},"default_title": "Timer Extension Action Title","default_popup": "popup.html"},\n"options_page": "options.html",\n"permissions": ["storage", "alarms", "notifications", "unlimitedStorage"],\n### TERM_TODO HERE\
        ```',
        attachment: "./img/2023-05-02-13-07-50.png",
        prompt: "Add a background script (background.js)  to the manifest.json",
        example: "background: {service_worker: background.js}"

    },
    {
        term: "manifest | add a an options page",
        description: ':m \n\
        ```js\n\
        {"manifest_version": 3,\n"name": "Timer Extension",\n"version": "1.0.0",\n"description": "Hello Chrome World!",\n"icons": {"16": "icon.png","48": "icon.png","128": "icon.png"},\
        \n"action": {"default_icon": {"16": "icon.png","48": "icon.png","128": "icon.png"},"default_title": "Timer Extension Action Title",\
        "default_popup": "popup.html"},\n### TERM_TODO HERE\
        \n"permissions": ["storage", "alarms", "notifications", "unlimitedStorage"],\n"background": {"service_worker": "background.js"}}\
        ```',
        attachment: "./img/2023-05-02-13-07-50.png",
        prompt: "Add an options page (options.html) to the manifest.json",
        example: "options_page: options.html,"
    },
    {
        term: "manifest | add a popup page",
        description: ':m \n\
        ```js\n\
        {"manifest_version": 3,\n"name": "Timer Extension",\n"version": "1.0.0",\n"description": "Hello Chrome World!",\
        \n"icons": {"16": "icon.png","48": "icon.png","128": "icon.png"},\n"action": {"default_icon": {"16": "icon.png","48": "icon.png","128": "icon.png"},\
        "default_title": "Timer Extension Action Title",\n\
        ### TERM_TODO HERE    \
        },\n"options_page": "options.html",\n"permissions": ["storage", "alarms", "notifications", "unlimitedStorage"],\n"background": {"service_worker": "background.js"}}\
        ```',
        attachment: "./img/2023-05-02-13-07-50.png",
        prompt: "Add a popup page (popup.html) to the manifest.json",
        example: "default_popup: popup.html"
    },
    {
        term: "manifest | add a permission",
        description: ':m \n\
        ```js\n\
        {"manifest_version": 3,\n"name": "Timer Extension",\n"version": "1.0.0",\n"description": "Hello Chrome World!",\
        \n"icons": {"16": "icon.png","48": "icon.png","128": "icon.png"},\n"action": {"default_icon": {"16": "icon.png","48": "icon.png","128": "icon.png"},\
        "default_title": "Timer Extension Action Title",\n\
        },\n"options_page": "options.html",\n\
        ### TERM_TODO HERE\
        ,\n"background": {"service_worker": "background.js"}}\
        ```',
        attachment: "./img/2023-05-02-13-07-50.png",
        prompt: "Add permissions: for storage and alarms to the manifest.json",
        example: 'permissions: ["storage", "alarms"],'
    },
    {
        term: "storage | local vs sync",
        description: ":m | | chrome.storage.local | chrome.storage.sync |\n| ----------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |\n| Storage Mechanism | Local on the user's machine | Synchronized across all devices |\n| Storage Limit | Approx. 5 MB | Approx. 100 KB in total, 8 KB per item |\n| Sync Behavior | N/A (local storage only) | Syncs automatically in the background when online, stores data locally when offline |\n| Use Case | Storing larger amounts of data that are specific to the user's machine | Storing smaller amounts of data that need to be synced across devices |\n| Performance | Faster read/write operations compared to chrome.storage.sync | Slower read/write operations due to network requests |",
        prompt: "Describe when you would use chrome.storage.local vs chrome.storage.sync and why",
        example: "I would use storage for communication between temporal process, while sync data mostly for records keeping such as settings, bookmarks"
    },
    {
        term: "alarms | Chrome Alarms",
        description: "Use the chrome.alarms API to schedule code to run periodically or at a specified time in the future.",
        prompt: "Create an alarm that every 1 second",
        example: "chrome.alarms.create({\n periodInMinutes: 1 / 60,\n});\n\nchrome.alarms.onAlarm.addListener((alarm) => {\n // Do stuff.\n})"
    },
    {
        term: "notifications | Chrome Notifications",
        description: "Use the chrome.notifications API to create rich notifications using templates and show these notifications to users in the system tray.",
        prompt: "Create a notification with title: 'Hello World', message: 'This is a notification', iconUrl: 'icon.png'",
        example: "this.registration.showNotification('Hello World', {\n body: 'This is a notification',\n icon: 'icon.png',\n});"
    },
    {
        term: "storage | local | get",
        description: "Gets one or more items from storage.",
        prompt: "Get the value of the key 'name' and 'card' from local storage",
        example: "chrome.storage.local.get(['name', 'card'], (result) => {\n console.log(result.key, result.card);\n});"
    },
    {
        term: "Add a listener to dom element",
        prompt: "Add a listener to element with id 'start-timer-btn' that listens for a click event and runs the code (template) in the callback",
        description: "Add a listener to element with id 'start-timer-btn' that listens for a click event and runs the code (template) in the callback",
        example: "const startTimerBtn = document.getElementById('start-timer-btn')\nstartTimerBtn.addEventListener('click', () => {\n // Run code\n});"
    },
    {
        term: "log the details on application being installed",
        description: "Log the details on application being installed by using the requirements: contextMenus and background",
        prompt: "Log the details on application being installed by using the requirements: contextMenus and background",
        example: "chrome.runtime.onInstalled.addListener((details) => {\n console.log('previousVersion', details.previousVersion);\n});"
    },
    {
        term: "context-menu-adding",
        description: ":m Exercise: Fill create a context menu that activates in contexts `page` and `selection` and has the title `Read This Text` and the id `contextMenu2`\n\
        chrome.runtime.onInstalled.addListener((details) => {\n chrome.storage.local.set({\n shows: [],\n });\n\n // TODO: Add the context menu here\n \n chrome.contextMenus.onClicked.addListener((event) => {\n if (event.menuItemId === 'contextMenu1') {\n // Do Stuff for the first context menu\n } else if (event.menuItemId === 'contextMenu2') {\n // Do Stuff for the Context menu 2\n }\n })\n})",
        prompt: "Fill create a context menu that activates in contexts `page` and `selection` and has the title `Read This Text` and the id `contextMenu2`",
        example: ":m ```js\n\
        chrome.contextMenus.create({\n title: 'Search TV Show',\n id: 'contextMenu1',\n contexts: ['page', 'selection']\n});\n\
        ````\n\
        "
    },
    {
        term: "content script | add a listener",
        prompt: ":m Create a `content_script` that matches => `https://*.google.com/*` and runs the `contentScript.js` file",
        description: ':m This is how you match all urls:\n\
        content_scripts": [\n {\n "matches": ["<all_urls>"],\n "js": ["contentScript.js"]\n }\n]',
        example: ':m\n\
        ```js\n\
        content_scripts": [\n {\n "matches": ["https://.google.com/"],\n "js": ["contentScript.js"]\n }\n]\n\
        ```\
        '
    },
    {
        term: "content script | listener to message",
        description: ":m Create a listener for the following code at `contentScript.js` that gets activated when the website is matched\n\
        ```js\n\
        const message = 'Hello from content script';\n\
        chrome.runtime.sendMessage(message, (response) => {\n\
             console.log('Received response from background script: ' + response); \n\
        });\n\
        ```",
        prompt: "Create a listener for the code in your file that logs the message `background.js`",
        example: ":m\n\
        ```js\n\
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n console.log('Received message from content script: ' + message);\n const response = 'Hello from background script';\n sendResponse(response);\n})\n\
        ```\
        "
    }
]


const python_frameworks = [
    {
        term: "setup migrations database",
        description: "You are looking for a library to manage your postgresql database in your fastapi application. ",
        prompt: "Describe installation of a useful library for th ecase",
        example: "pip install alembic\n\
        alembic init alembic\n\
        \n\
        then go into the alembic.ini file and change the sqlalchemy.url to your database url\n\\n\e.g.:\n\
        sqlalchemy.url = postgresql://username:password@test-ddanalytics-rds-v2.cpcwi20k2qgg.us-east-1.rds.amazonaws.com/tablename\n\n\
        Then add in alembic/env.py\n\
        from alembic import context\n\
        from logging.config import fileConfig\n\
        etc\n\
        "

    },
    {
        term: "alembic revise and upgrade",
        description: "You have alembic setted up and you made revisions to your models.py file. You want to update your database with the new changes.",
        prompt: "Provide the terminal commands for it",
        example: "alembic revision --autogenerate -m 'added new column to table'\n\
        alembic upgrade head\n\
        "
    },
    {
        term: "Skipping tables",
        description: "You have alembic setted up and you made revisions to your models.py file. You want to update your database with the new changes.",
        prompt: "Is there a way to do it? How? explain, no need to write the code down",
        exmaple: "Yes, HERE I AM SKIPPING event table: \
            def include_name(name, type_, parent_names):\n\
                \"\"\"\n\
                Skips the tables indicated\n\
                \"\"\"\n\
                if name in ['event']:\n\
                    return False\n\
                return True\n\
            \n\
            \n\
            def run_migrations_online() -> None:\n\
                \"\"\"Run migrations in 'online' mode.\n\
            \n\
                In this scenario we need to create an Engine\n\
                and associate a connection with the context.\n\
            \n\
                \"\"\"\n\
                connectable = engine_from_config(\n\
                    config.get_section(config.config_ini_section),\n\
                    prefix='sqlalchemy.',\n\
                    poolclass=pool.NullPool,\n\
                )\n\
            \n\
                with connectable.connect() as connection:\n\
                    context.configure(\n\
                        connection=connection,\n\
                        target_metadata=target_metadata,\n\
                        include_schemas=True,\n\
                        include_name=include_name\n\
                    )\n\
            \n\
                    with context.begin_transaction():\n\
                        context.run_migrations()"
    }
]


const dotNet = [
    {
        term: "orm",
        prompt: "What is Object Relational Mapping (ORM)?",
        description: "Object Relational Mapping (ORM) is the process of mapping between objects and relational database systems. It is a programming technique that allows us to query and manipulate data from a database using an object-oriented paradigm.",
        example: "Entity Framework is an example of an ORM\n\
        Which features are: \n\
        migrations, querying, caching, Concurrency, Saving, Configrations"
    },
    {
        term: "dotnet | create a new project",
        prompt: "Dotnet check the templates list, then creat new snl (Solution File) + webapi. Then Run it.",
        example: "dotnet new list\n\
        dotnet new sln\n\
        dotnet new webapi-n API\n\
        dotnet run",
    },
    {
        term: "dotnet | add a project to the solution",
        prompt: "Dotnet add the project (API) to the solution file (sln)",
        example: "dotnet sln add API"
    },
    {
        term: "dotnet | add a project to the solution",
        prompt: "How to add entity sqlite framework in vsstudio?",
        example: "Install the NuGet extension, then you can search it."
    },
    {
        term: "dotnet | add a project to the solution",
        prompt: "In vsCode, how to add a class prop shortcut?",
        example: "type prop, then press tab",
        description: "public string UserName { get; set; }"
    },
    {
        term: "dotnet | add a model to api",
        prompt: "Add a model to the api project and create a get request",
        example: "Create the model inside of entities, Then include the dataContext\n\
        dotnet tool install --global dotnet-ef\n\
        cd API\n\
        dotnet add package Microsoft.EntityFrameworkCore.Design\n\
        dotnet ef migrations add InitialCreate -o Data/Migrations and then add the controller with the get request",
        description: "Example model:\n\
        public class AppUser\n\
        {\n\
            public int Id { get; set; }\n\
            public string UserName { get; set; }\n\
            }"
    },
    {
        term: "dotnet | controllers | get users",
        prompt: "Complete the following",
        description: "using API.Entities;\n\
        using Microsoft.AspNetCore.Mvc;\n\
        namespace API.Controllers\n\
        {\n\
            [ApiController]\n\
            [Route(\"api/[controller]\")]\n\
            public class UsersController : ControllerBase\n\
            {\n\
                private readonly DataContext _context;\n\
                public UsersController(DataContext context)\n\
                {\n\
                    _context = context;\n\
                }\n\
        \n\
                [HttpGet]\n\
                ## Create header for method: getUsers()\n\
                {\n\
                    ### Get the users from context\n\
                    return users;\n\
                }\n\
        \n\
                [HttpGet(\"{id}\")]\n\
                public ActionResult<AppUser> GetUser(int id)\n\
                {\n\
                    var user = _context.Users.Find(id);\n\
                    return user;\n\
                }\n\
            }\n\
        }",
        example: "public ActionResult<IEnumerable<AppUser>> GetUsers()\n\
        var users = _context.Users.ToList();\n\
        "
    },
    {
        term: "dotnet | controllers | get user with id",
        prompt: "Complete the following",
        description: "using API.Entities;\n\
        using Microsoft.AspNetCore.Mvc;\n\
        namespace API.Controllers\n\
        {\n\
            [ApiController]\n\
            [Route(\"api/[controller]\")]\n\
            public class UsersController : ControllerBase\n\
            {\n\
                private readonly DataContext _context;\n\
                public UsersController(DataContext context)\n\
                {\n\
                    _context = context;\n\
                }\n\
        \n\
                [HttpGet]\n\
                public ActionResult<IEnumerable<AppUser>> GetUsers()\n\
                {\n\
                    var users = _context.Users.ToList();\n\
                    return users;\n\
                }\n\
        \n\
                ### Http Get \n\
                ### Complete header GetUser\n\
                {\n\
                    ### find the user through the context\n\
                    return user;\n\
                }\n\
            }\n\
        }",
        example: "[HttpGet(\"{id}\")]\n\
        public ActionResult<AppUser> GetUser(int id)\n\
        var user = _context.Users.Find(id);"
    },
    {
        term: "dotnet | watch",
        prompt: "How to run the server while in watch for changes in the api project?",
        example: "dotnet watch"
    },
    {
        term: "async get",
        prompt: "Complete the following (model: AppUser)",
        description: "[HttpGet('/async/{id}')]\n\
        ### Complete header for method GetUserAsync]\n\
            ### Complete method to get the user in async \n\
            return user;]\n\
        }]",
        example: "public async Task<ActionResult<AppUser>> GetUserAsync(int id)\n\
        var user = await _content.Users.FindAsync(id);]"
    },
    {
        term: "POST Request accept in Body",
        prompt: "How to make an endpoint that accepts a POST request with User Data in the body?",
        example: "\n\
        First create an DTO called UserDto\n\
        Then\n\
        [HttpPost]\n\
        public void Post()\n\
        {\n\
        }"
    },
    {
        term: "Create JWT Token",
        prompt: "How to create a JWT Token?",
        example: "Create a new class called TokenService\n\
        using API.Interfaces;\n\
        using Microsoft.IdentityModel.Tokens;\n\
        using System.IdentityModel.Tokens.Jwt;\n\
        using System.Security.Claims;\n\
        \n\
        namespace API.Services\n\
        {\n\
            public class TokenService\n\
            {\n\
              ...\n\
            Add hat service into the startup.cs\n\
            services.AddScoped<ITokenService, TokenService>();\n\
            ",



    }


]

const angular = [
    {
        term: "angular | create a new project",
        prompt: "Create a new project with the name 'my-app' and run it locally?",
        example: "ng new my-app\n\
        cd my-app\n\
        ng serve --open"
    },
    {
        term: "module | How to make http requests?",
        prompt: "How to make http requests?",
        description: "import { HttpClientModule} from '@angular/common/http';\n\
        \n\
        @NgModule({\n\
            ...\n\
            imports: [\n\
                ...\n\
                HttpClientModule\n\
            ],\n\
            ...\n\
        })\n\
        >>> app.components.ts\n\
        import {HttpClient } from '@angular/common/http';\n\
        export class AppModule {\n\
            constructor(private http: HttpClient) { }\n\
         }",

        example: "go to app.module.ts and add the following import:"

    },
    {
        term: "module | How to allow for cross origin requests?",
        prompt: "How to allow for cross origin requests?",
        description: 'app.UseCors( builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:4200")); ',
        example: "Go to Program.cs and add the following line to the Configure method:"
    },
    {
        term: "html | loop over users in a li in a ul",
        prompt: "Loop over users in a li in a ul printing it's name",
        example: "<ul>\n\
        <li *ngFor='let user of users'>{{user.name}}</li>\n\
        </ul>"
    },
    {
        term: "add Bootstrap",
        prompt: "How to add bootstrap to an angular project (ngx-bootstrap)?",
        example: "ngx add ngx-bootstrap"
    },
    {
        term: "Add ssl loally",
        prompt: "How to add ssl locally?",
        description: '"serve": {\n\
            "options": {\n\
              "ssl": true,\n\
              "sslCert": "./ssl/localhost.pem",\n\
              "sslKey": "./ssl/localhost-key.pem"\n\
            },',
        example: "Install mkcert using brew or choco\n\
        mkdir ssl\n\
        cd ssl\n\
        mkcert localhost\n\
        Add the above to angular.json"


    },
    {
        term: "Create a component",
        prompt: "How to create a component - Create a counter component inside components folder?",
        example: "ng g c components/counter",
    },
    {
        term: "ng class",
        prompt: "Using 'errorExists' varibale from the component, add the class 'error' to the div if the errorExists is true. Otherwise 'success'",
        example: "<div [ngClass]='{error: errorExists, success: !errorExists}'></div>",
        description: "ngClass is a directive that allows you to set more than one CSS class on an element. It can accept an object, a string, or an array of strings. The ngClass directive behaves very similarly to how ngStyle behaves."
    },
    {
        term: "ng style",
        prompt: "using 'size' set font-size to 'x-large' if size is 1, 'large' if size is 2",
        example: "<div [ngStyle]='{fontSize: size === 1 ? 'x-large' : 'large'}'></div>",
    },
    {
        term: "How to creaete a custom directive?",
        prompt: "Create a directive that will change the background color of the element to red",
        example: "ng g d directives/red\n\
        import { Directive, ElementRef, OnInit } from '@angular/core';\n\
        \n\
        @Directive({\n\
          selector: '[appRed]'\n\
        })\n\
        export class RedDirective implements OnInit {\n\
            constructor(private elementRef: ElementRef) {}\n\
            ngOnInit() {\n\
                this.elementRef.nativeElement.style.backgroundColor = 'red';\n\
            }\n\
            }",
        description: "You would use it by having in your component:\n\
            <p appRed>Red Directive</p>"

    },
    {
        term: "ngFor ",
        prompt: "Create a list of users using ngFor",
        example: "<ul>\n\
        <li *ngFor='let user of users'>{{user.name}}</li>\n\
        </ul>",
        description: "Iterate over the users list where each user has a name property"
    },
    {
        term: "ngIf",
        prompt: "Create a div that will show if the errorExists is true",
        example: "<div *ngIf='errorExists'>Error exists</div>",
        description: "ngIf is a directive that allows you to conditionally add or remove an element from the DOM. It can accept an expression that evaluates to true or false. If the expression evaluates to true then the element is added to the DOM, otherwise it is removed."
    },
    {
        term: "ngSwitch",
        prompt: "Create a div that if the 'valorSwitch' is 1, it will show 'one', if 2, 'two', otherwise 'other'",
        example: "<div [ngSwitch]='valorSwitch'>\n\
        <p *ngSwitchCase='1'>one</p>\n\
        <p *ngSwitchCase='2'>two</p>\n\
        <p *ngSwitchDefault>other</p>\n\
        </div>",
        description: "ngSwitch is a directive that conditionally adds or removes an element from the DOM based on an expression. It behaves similarly to the JavaScript switch statement."
    },
    {
        term: "template",
        prompt: "Create a template that will show the name of the user",
        example: "<ng-template #templateRef let-user>\n\
        <p>{{user.name}}</p>\n\
        </ng-template>",
        description: "ng-template is an Angular element for rendering HTML. It is never displayed directly. In fact, before rendering the view, Angular replaces the ng-template and its contents with a comment."
    },
    {
        term: "form and click",
        prompt: "Create a form that will show the name of the user when clicking the button",
        example: "<form (submit)='showUser()'>\n\
        <input type='text' [(ngModel)]='name'>\n\
        <button type='submit'>Show</button>\n\
        </form>",

    },
    {
        term: "one-way",
        prompt: "Create a one-way binding for iamge source using variable 'urlImage'",
        example: "<img [src]='urlImage'>",
    },
    {
        term: "Two-way binding",
        prompt: "Create a two-way binding for input using variable 'name'\n\
        And save the variable when clicking the button",
        example: "<input type='text' [(ngModel)]='name'>\n\
        <button (click)='saveName()'>Save</button>",
        description: "<input type='text' ....>\n\
        <button ...>Save</button>",
    },
    {
        term: "Pipes | date",
        prompt: "Create a pipe that will show the date in the format 'dd/MM/yyyy' for the variable date",
        example: "{{date | date: 'dd/MM/yyyy'}}",
    },
    {
        term: "Pipes | uppercase lowercase",
        prompt: "Create a pipe that will show the name in uppercase and surname in lowercase",
        example: "{{name | uppercase}} {{surname | lowercase}}",
    },
    {
        term: "Create a custom pipe",
        prompt: "Create pipe tha displays 'SENIOR' if year is greater than 3 and 'JUNIOR' otherwise",
        example: "ng g p pipes/seniorJunior\n\
        import { Pipe, PipeTransform } from '@angular/core';\n\
        \n\
        @Pipe({\n\
          name: 'seniorJunior'\n\
        })\n\
        export class SeniorJuniorPipe implements PipeTransform {\n\
          transform(value: number): string {\n\
            return value > 3 ? 'SENIOR' : 'JUNIOR';\n\
          }\n\
        }",
        description: "It would be used as the following: \n\
        {{year | seniorJunior}}\n\
        Complete the following: \n\
        ng g ....\n\n\
        import { Pipe, PipeTransform } from '@angular/core';\n\
        \n\
        @Pipe({\n\
          name: '....'\n\
        })\n\
        export class SeniorJuniorPipe implements PipeTransform {\n\
          .... {\n\
            return value > 3 ? 'SENIOR' : 'JUNIOR';\n\
          }\n\
        }",

    },
    {
        term: "Create a component with input as employee",
        prompt: "Create a component with input as employee",
        example: "ng g c components/employee --skipTests=true\n\
        import { Component, Input, OnInit } from '@angular/core';\n\
        import { Employee } from 'src/app/models/employee';\n\
        \n\
        @Component({\n\
          selector: 'app-employee',\n\
          templateUrl: './employee.component.html',\n\
          styleUrls: ['./employee.component.css']\n\
        })\n\
        export class EmployeeComponent implements OnInit {\n\
            @Input() employee: Employee;\n\
            constructor() { }\n\
            ngOnInit(): void {\n\
            }\n\
        }",
        description: "Complete:\n\
        \n\
        ng g c components/employee --skipTests=true\n\
        import { Component, Input, OnInit } from '@angular/core';\n\
        import { Employee } from 'src/app/models/employee';\n\
        \n\
        @Component({\n\
          selector: 'app-employee',\n\
          templateUrl: './employee.component.html',\n\
          styleUrls: ['./employee.component.css']\n\
        })\n\
        export class EmployeeComponent implements OnInit {\n\
            ...\n\
            constructor() { }\n\
            ngOnInit(): void {\n\
            }\n\
        }\n\
        ... In the component html...\n\
        <div>\n\
        <p>{{employee.name}}</p>\n\
        <p>{{employee.surname}}</p>\n\
        <p>{{employee.age}}</p>\n\
        </div>",

    },
    {
        term: "Output example",
        prompt: "Create a counterChange that will emit the value of the counter on increment button clicked",
        example: "import { Component, EventEmitter, OnInit, Output } from '@angular/core';\n\
        \n\
        export class CounterComponent implements OnInit {\n\
            counter = 0;\n\
            @Output() counterChange = new EventEmitter<number>();\n\
            constructor() { }\n\
            ngOnInit(): void {\n\
            }\n\
            increment() {\n\
                this.counter++;\n\
                this.counterChange.emit(this.counter);\n\
            }\n\
            }",
        description: "import { Component, EventEmitter, OnInit, Output } from '@angular/core';\n\
        \n\
        export class CounterComponent implements OnInit {\n\
            counter = 0;\n\
            ....\n\
            constructor() { }\n\
            ngOnInit(): void {\n\
            }\n\
            increment() {\n\
                this.counter++;\n\
                ......\n\
            }\n\
            }\n\n\
            ... In the component html...\n\
            <button (click)='increment()'>Increment</button>\n\
            \n\
            in App component:\n\
            \n\
            parentCounter: number = 0;\n\
            .... In app html\n\
            <app-counter (counterChange)='onCounterChange($event)'></app-counter>"
    },
    {
        term: "Create a service",
        prompt: "Create a service that will return a list of employees",
        example: "ng g s services/employee\n\
        import { Injectable } from '@angular/core';\n\
        import { Employee } from '../models/employee';\n\
        \n\
        @Injectable({\n\
          providedIn: 'root'\n\
        })\n\
        export class EmployeeService {\n\
            employees: Employee[] = [\n\
                {name: 'John', surname: 'Doe', age: 30},\n\
                {name: 'Jane', surname: 'Doe', age: 25},\n\
                {name: 'Jack', surname: 'Doe', age: 20},\n\
            ];\n\
            constructor() { }\n\
            getEmployees(): Employee[] {\n\
                return this.employees;\n\
            }\n\
        }\n\n\
        ## TO be used\n\
        import { EmployeeService} from '../employeee.service';\n\
        constructor(private employeeService: EmployeeService) { }\n\
        ngOnInit(): void {\n\
            this.employees = this.employeeService.getEmployees();\n\
        }",
        description: "ng g s services/employee\n\
        ### TODO Import the Injectable library\n\
        import { Employee } from '../models/employee';\n\
        \n\
        @Injectable({\n\
          providedIn: 'root'\n\
        })\n\
        export class EmployeeService {\n\
            employees: Employee[] = [\n\
                {name: 'John', surname: 'Doe', age: 30},\n\
                {name: 'Jane', surname: 'Doe', age: 25},\n\
                {name: 'Jack', surname: 'Doe', age: 20},\n\
            ];\n\
            constructor() { }\n\
            getEmployees(): Employee[] {\n\
                return this.employees;\n\
            }\n\
        }\n\n\
        ### TODO Example of how to use it suppose the \n",
    },
    // TODO Add more of NgRx State, Action, Reducer, Effect Problems https://www.youtube.com/watch?v=f97ICOaekNU
    {
        term: "ngrx | State",
        prompt: "What is a State in used for ngrx?",
        description: "Is the container of the state to help writting consistent applications",
    },
    {
        term: "Lazy Loading and Child Routes",
        prompt: "How to add lazy loading and child routes?",
        description: "Here is what you would have int he dashboard.module.ts\n\n\
        const routes: Routes = [\n\
                  {\n\
                    path: 'feature',\n\
                component: FeatureComponent,\n\
                children: [\n\
                      { path: 'child-route-1', component: ChildRoute1Component },\n\
                  { path: 'child-route-2', component: ChildRoute2Component },\n\
                  // Add more child routes as needed\n\
            ],\n\
          },\n\
        ];\n\
            \n\
            @NgModule({\n\
              imports: [RouterModule.forChild(routes)],\n\
              exports: [RouterModule],\n\
        })\n\
        export class FeatureNameRoutingModule {}\n\n\
            Then in the app-routing.module.ts\n\n\
            const routes: Routes = [\n\
                // Other routes\n\
            {\n\
                path: 'feature-name',\n\
                loadChildren: () =>\n\
                import('./path-to-feature-name/feature-name.module').then(\n\
                    (m) => m.FeatureNameModule\n\
                ),\n\
        },\n\
        ];\n\
            \n\
            @NgModule({\n\
            imports: [RouterModule.forRoot(routes)],\n\
            exports: [RouterModule],\n\
        })\n\
        export class AppRoutingModule {}\n\
        ",
        example: "ng generate module dashboard --route dashboard"
    },
    {
        term: "Auth Guard",
        prompt: "How to create an Auth Guard?",
        example: "ng generate guard auth/auth --implements CanActivate",
        description: "An Example of how guard is generated.\n\
        import { Injectable } from '@angular/core';\n\
        import {\n\
              CanActivate,\n\
              ActivatedRouteSnapshot,\n\
              RouterStateSnapshot,\n\
              Router,\n\
        } from '@angular/router';\n\
        import { AuthService } from './auth.services';\n\
        \n\
        @Injectable({\n\
              providedIn: 'root',\n\
    })\n\
        export class AuthGuard implements CanActivate {\n\
              constructor(private authService: AuthService, private router: Router) {}\n\
        \n\
          canActivate(\n\
                route: ActivatedRouteSnapshot,\n\
                state: RouterStateSnapshot\n\
              ): boolean {\n\
                if (this.authService.isAuthenticatedUser()) {\n\
                  return true;\n\
            }\n\
        \n\
            // Redirect to the login page if not authenticated\n\
            this.router.navigate(['/login']);\n\
            return false;\n\
          }\n\
        }\n\n\n\
        Then whenever we want to guard the authentication\n\
        import { NgModule } from '@angular/core';\n\\n\import { RouterModule, Routes } from '@angular/router';\n\import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';\n\import { HomeScreenComponent } from './home-screen/home-screen.component';\n\import { NotAllowedComponent } from './not-allowed/not-allowed.component';\n\import { AuthGuard } from '../auth/auth.guard';\n\\n\const routes: Routes = [\n\  {\n\    path: '',\n\    canActivate: [AuthGuard],\n\\n\    component: DashboardHomeComponent,\n\  },\n\  {\n\    path: 'home',\n\    component: HomeScreenComponent\n\  }\n\];\n\\n\\n\@NgModule({\n\  imports: [RouterModule.forChild(routes)],\n\  exports: [RouterModule],\n\  declarations: [\n\    NotAllowedComponent\n\  ],\n\})\n\export class DashboardModule { }\n\
        "
    },
    {
        term: "Expand Postman mock json server",
        prompt: "add the parameters to: localhost:3000/enrollments to also expand course and students data on the union",
        example: " ?_expand=course&_expand=student",
        description: '\n\
        "students": [\n\
            {\n\
              "name": "Frederik",\n\
              "lastname": "Hettinger",\n\
              "average": 12,\n\
              "minor": "District Division Developer",\n\
              "credits": 59,\n\
              "major": "Corporate Communications Assistant",\n\
              "id": 1\n\
            },\n\n\
            "enrollments": [\n\
                {\n\
                  "id": 1,\n\
                  "courseId": 1,\n\
                  "studentId": 3 \n\
                }\n\
              ]\n\n\
              \n\n\
              "users": [\n\
                {\n\
                  "name": "admin",\n\
                  "lastName": "admin",\n\
                  "email": "fake@mail.com",\n\
                  "password": "123456",\n\
                  "token": "jgfdsSfvcdskjdsfDSF435324ikdsad",\n\
                  "role": "ADMIN",\n\
                  "id": 1\n\
                }\n\
              ]'
    },
    {

    }
]

const npm = [
    {
        "term": "nvm install a version",
        "prompt": "Install node version 14.17.0",
        "example": "nvm install 14.17.0"
    },
    {
        term: "nvm | use a version",
        prompt: "Use node version 14.17.0",
        example: "nvm use 14.17.0"
    },
]

const postgresql = [
    {
        term: "Generate Series",
        prompt: "Generate a series from 1 to 10",
        example: "SELECT generate_series(1, 10);",
    },
    {
        term: "Series get from using series ",
        prompt: "Generate a series from 1 to max user_id in table users",
        example: "SELECT generate_series(1, (SELECT MAX(user_id) FROM users)) AS user_id;"
    },
    {
        term: "Calculating Average Age of Users with a Condition",
        prompt: "Suppose you have a products table with a price column, and you want to find the maximum price for products in a specific category, e.g., 'Electronics':",
        example: "SELECT MAX(price) FILTER (WHERE category = 'Electronics') AS max_price_electronics FROM products;",
        description: "In summary, you use the WHERE clause to filter rows in the table before aggregation, and you use the FILTER clause to filter rows within an aggregate function after aggregation. The choice between them depends on your specific use case. If you need to filter rows before aggregation, use WHERE. If you need to apply an aggregate function to a subset of rows based on a condition, use FILTER. They are complementary features in SQL and serve different purposes."
    },
    {
        term: "Create View and Update",
        prompt: "Let's create a view that joins the students and courses tables to display the names of students and the courses they are enrolled in:",
        example: "-- Create a view to display student names and course names\n\
        CREATE VIEW student_course_view AS\n\
        SELECT\n\
            students.first_name || ' ' || students.last_name AS student_name\n\
            courses.course_name\n\
        FROM\n\
            students\n\
        JOIN\n\
            courses ON students.student_id = courses.course_id;"

    },
    {
        term: "SQL Multiple join example",
        prompt: "Create SQL a join of timeslots and events, and then filter by date of the format: dd-mm-yyyyy from timestamp which is datetime format and user_id in an array of :user_id\n\
        Call it RankedTimeslots and then JOIN it with users fetch for user first_name and rankedTimeslots user id and timeslot_local ",
        example: "/*  */\n\
    WITH RankedTimeslots AS (\n\
        SELECT\n\
            e.user_id,\n\
            e.timestamp_local\n\
        FROM timeslot t\n\
        JOIN event e ON t.event_guid = e.guid\n\
        WHERE\n\
            e.timestamp_local::date = :date\n\
            AND user_id IN :user_id\n\
    )\n\
    SELECT\n\
        rt.user_id,\n\
        rt.timeslot_local,\n\
        u.first_name,\n\
    FROM RankedTimeslots rt\n\
    JOIN users u ON rt.user_id = u.id\n\
    ORDER BY rt.timeslot_local DESC;",
        description: "table: timeslot {event_guid: string, timeslot_local: datetime}\n\
    table: event {guid: string, user_id: int, timestamp_local: datetime}\n\
    table: users {id: int, first_name: string}"
    },
    {
        term: "Find the stores who have sold more units than the average by all stores",
        prompt: "Find the stores who have sold more units than the average by all stores",
        example: "SELECT\n\
        store_id,\n\
        SUM(units_sold) AS total_units_sold\n\
        FROM\n\
            sales\n\
        GROUP BY\n\
            store_id\n\
        HAVING\n\
            SUM(units_sold) > (SELECT AVG(units_sold) FROM sales);",
        description: "table: sales {units_sold: int, store_id: int}"

    }

]

const xcodeIOS = [
    {
        term: "Shortcut Commit Files in XCODE",
        prompt: "(1) Shortcut Commit Files in XCODE \n\
        (2) Adding a component.",
        example: "(1) Command + Option + C\n\
        (2) Shift + Command + L",

    },
    {
        term: "Switch values, changed",
        prompt: "Complete the folloing so that it changes the text color on switch",
        description:"@objc func switchValueChanged() {\\n\
            if ### COMOPLETE {\\n\
                MorePetsTxtField.textColor = UIColor.black\\n\
            } else {\\n\
                MorePetsTxtField.textColor = UIColor.gray\\n\
            }\\n\
            With the followind added into: super.viewDidLoad()\n\
            MorePetsSwitch.addTarget(self, action: #selector(switchValueChanged), for: .valueChanged)\n\
        }",
        example: "MorePetsSwitch.isOn"
    },
    {
        term: "Present Alert Controller",
        prompt: "Create an alert that says hello how are you and show it. with an action that says close",
        description: "let alertController = UIAlertController(title: \"My Introduction\", message: introduction, preferredStyle: .alert)\\n\
        \\n\
        let action = UIAlertAction(title: \"Nice to meet you!\", style: .default, handler: nil)\\n\
        \\n\
        alertController.addAction(action)\\n\
        \\n\
        present(alertController, animated: true, completion: nil)",
        example: "let alertController = UIAlertController(title: \"My Introduction\", message: introduction, preferredStyle: .alert)\\n\
        \\n\
        let action = UIAlertAction(title: \"Nice to meet you!\", style: .default, handler: nil)\\n\
        \\n\
        alertController.addAction(action)\\n\
        \\n\
        present(alertController, animated: true, completion: nil)"
        
    }
]


module.exports = {
    react_terms, apex, flutter: flutter_dart, IDE_S, chrome_extensions, python_frameworks, react_typescript,
    dotNet, angular, xcodeIOS, postgresql, npm
};