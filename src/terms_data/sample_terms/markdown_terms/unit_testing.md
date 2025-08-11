# Unit Testing

#### testing upkeeps
 Refactoring the test when you refactor the underlying code  Running the test on each code change  Dealing with false alarms raised by the test  Spending time reading the test when you're trying to understand how the underlying code behaves

:p What to consider before creating our tests?

??x ??

#### (a) Shared, (b) private, and (c) out-of-process dependencies (d) volatile (e) Collaborator, (f) Cyclomatic Complexity
:p Use this definitions on a sentence:

??x (a) A shared dependency is a dependency that is shared between tests and provides means for those tests to affect each other's outcome. A typical example of shared dependencies is a static mutable field. 
(b) A private dependency is a dependency that is not shared
(c) An out-of-process dependency is a dependency that runs outside the application's execution process; it's a proxy to data that is not yet in the memory.
(d) that exhibits one of the following: It introduces a requirement to set up and configure a runtime environment inaddition to what is installed on a developer's machine by default. Databasesand API services are good examples here. They require additional setup andare not installed on machines in your organization by default. It contains nondeterministic behavior. An example would be a random num-ber generator or a class returning the current date and time. These depen-dencies are non-deterministic because they provide different results on eachinvocation
(e) Collaborator: providing access to the database is a collaborator since the database is a shared dependency 
(d) indicates the number of branches in a given program or method. This metric is calculated as 1 + <number of branching points> You can think of it as the amount of tests to reach 100% branch coverage ??

#### Chicago vs London School of TDD
Chicago school: Test changes in the state, then test the return values | Better for Functional Architecture 
London School: Desing from top down, and test the Interactions between. Characterized with ideas of mocks (Just interfaces) | Better for Object oriented architecture.

:p In which situation would you use each of them?

??x ??

#### AAA Pattern
The AAA pattern advocates for splitting each test into three parts: arrange, act, and assert. The advatnage being that following increases readability on the future.

:p Describe when you could use this pattern? (2) What it means if there is more than AAA?, (3) What happens if you find an if? (4) Whats the right length of each section?

??x (2) Means that probably is an integration test and is time to split it into multiple tests. (3) That would be an antipattern. (4) Act should be one line, Assertion if too large means lack of abstraction and is okay for arrange to be large. ??

#### Namings in Testing
Don't follow a rigid naming policy. You simply can't fit a high-level description of a complex behavior into the narrow box of such a policy. Allow freedom of expression.  Name the test as if you were describing the scenario to a non-programmer who is familiar with the problem domain. A domain expert or a business analyst is a good example.  Separate words with underscores. Doing so helps improve readability, especially in long names

:p (1) How should you call this test ? (Sum_TwoNumbers_ReturnsSum, isDateInvalid) 

??x (1) Sum_of_two_numbers, delivery_with_pastdate_is_invalid // More specific why it's invalid, it's okay to be verbose. ??

#### Good Pillars Tests
(1) Protection against Regressions (2) Resistance to refactoring (3) Using mocks to assert intra-system communications leads to fragile tests. Mock- ing is legitimate only when it's used for inter-system communications

:p What mental guidelines to have to create good code?

??x (1) To maximize the metric of protection against regressions, the test needs to aim at exercising as much code as possible.
(2) Aim to keep distance between the actual (current implementation of the class.)  ??

#### mock stub
Mocks help to emulate and examine outcoming interactions. These interactions are calls the SUT makes to its dependencies to change their state.  Stubs help to emulate incoming interactions. These interactions are calls the SUT makes to its dependencies to get input data

:p Describe difference Mock and Stub, when would you use each?

??x ??

#### CQRS Principle
Commoand Query Responsability Segregation It states that every method should either be a command that performs an action, or a query that returns data to the caller, but not both; Useful in event sourcing on the event source. CQRS takes the defining principle of CQS and extends it to specific objects within a system, one retrieving data and one modifying data. CQRS is the broader architectural pattern, and CQS is the general principle of behaviour.

:p Whats the principle useful for?

??x ??

#### Encapsulating APIs
Without encapsulation, you have no practical way to cope with ever-increasing code complexity. When the code's API doesn't guide you through what is and what isn't allowed to be done with that code, you have to keep a lot of information in mind to make sure you don't introduce inconsistencies with new code changes

:p What mental guidelines to follow when encapsulating API?

??x ??

#### Hexagonal Architecture Enphasis
Hexagonal architecture emphasizes three important aspects:
- Separation of concerns between the domain and application services layers. The domain layer should be responsible for the business logic, while the application services should orchestrate the work between the domain layer and external applications.
- A one-way flow of dependencies from the application services layer to the domain layer. Classes inside the domain layer should only depend on each other; they should not depend on classes from the application services layer.
- External applications connect to your application through a common inter- face maintained by the application services layer. No one has a direct access to the domain layer 

:p How would you refactor or use this Pattern on your projects?

??x ??

#### (a) Mathematical functions
Methods with no hidden inputs and outputs are called mathematical functions because such methods adhere to the definition of a function in mathematics
Functional functions are easier to mantain as can be wrapped into Chicago Style testing, which abstracts internal workings, while class based functions make this harder.

:p Why identifying this is important?

??x The goal is to cover the functional core exten- sively with output-based tests and leave the mutable shell to a much smaller number of integration tests ??

#### Humble Object Pattern
For example you have a code with logs of logic and time to setup, or also an 

:p When and why would be convenient to use it? What preconditions to test and what not to test?

??x You can break it down into Factory pattern to build the objects, (with those preconditions) ??

#### end to end vs integration test
:p What is the difference between integration and end to end test?

??x ??

#### integration testing
To have in mind: (1) Make the domain model boundaries explicit (2) Reduce the amount of layers (3) Cover one intgegrated Happy path / edge cases are for unit tests (4) Test the controllers

:p Think of how would you design a passable Integration Testing for your current project?

??x ??

#### support, diagnostic
Logging should only be done only if is a business requirement

:p Whats the difference?

??x Support logging produces messages that are intended to be tracked by support staff or system administrators. 
Diagnostic logging helps developers understand what's going on inside the applicatio ??

#### Managaged, Unmanaged
Managed dependencies are dependencies that are directly controlled and managed by a package manager (e.g. npm, pip, gem, etc.). These dependencies are installed and updated automatically when you run a command such as npm install or pip install. 
Unmanaged dependencies are dependencies that are not managed by a package manager and must be installed and updated manually. This can occur, for example, if you're using a library or package that isn't listed in a public repository, or if you've forked a project and made changes to its dependencies. Use real instances of managed dependencies in integration tests; replace unman-
aged dependencies with mocks.

:p Whats the difference? For which should you create a test?

??x ??

#### YAGNI
Interfaces with a single implementation are not abstractions and don't provide loose coupling any more than the concrete classes that implement those inter- faces. Trying to anticipate future implementations for such interfaces violates the YAGNI (you aren't gonna need it) principl
A feature creep is avoided. No bloatware is created, i.e. software with functions that are hardly used or not used at all. Functions that are not implemented do not have to be tested, documented and supported. Thus there is no (unnecessary) effort.

:p Why Yagni is a good principle? Not good? Why would you use an interface with a single implementation?

??x The only legit reason would be to enable mocking. ??

#### Spy
Spy: Spies are used for creating partial or half mock objects. Like mock, spies are also used in large test suites., 
 When using spy objects, the default behavior of the methods (when not stubbed) is the real method behavior

Mock: Mocks are used to create fully mock or dummy objects. It is mainly used in large test suites.
When using mock objects, the default behavior of methods (when not stubbed) is do nothing (performs nothing.) 

:p Whats the difference between Mocks and Spies?

??x ??