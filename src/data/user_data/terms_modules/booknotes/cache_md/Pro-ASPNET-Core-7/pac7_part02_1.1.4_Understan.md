# High-Quality Flashcards: Pro-ASPNET-Core-7_processed (Part 2)


**Starting Chapter:** 1.1.4 Understanding the utility frameworks

---


#### ASP.NET Core Design Patterns
Background context: The author discusses design patterns, highlighting their importance and flexibility. He emphasizes that while these patterns are valuable, they should be adapted as necessary to fit specific project needs.

:p What is the author's stance on design patterns?
??x
The author advises using patterns freely, adapting them when needed, and ignoring those who treat them like commandments. He notes that patterns can help make projects manageable but warns against following them blindly.
x??

---


#### Razor Pages Overview
Background context: The text explains that one drawback of the MVC framework is its extensive setup before an application starts producing content. However, Razor Pages aim to speed up development by combining code and content into self-contained pages.

:p How does Razor Pages compare to traditional MVC?
??x
Razor Pages offer a more streamlined approach compared to MVC by mixing code and content within the same files, similar to Web Forms but with better platform support. This reduces setup time and speeds up initial development.
x??

---


#### Understanding Blazor
Background context: The text explains that the rise of JavaScript client-side frameworks can be a challenge for C# developers. Blazor aims to bridge this gap by allowing C# to be used on the client side.

:p What does Blazor aim to solve?
??x
Blazor aims to allow developers familiar with C# to create client-side applications without having to learn a new programming language like JavaScript, thus bridging the gap between server-side and client-side development.
x??

---


#### Two Versions of Blazor: Server vs. WebAssembly
Background context: The text details two versions of Blazor—Blazor Server and Blazor WebAssembly. Blazor Server uses persistent HTTP connections to execute C# code on the server, while Blazor WebAssembly runs C# code directly in the browser.

:p What are the key differences between Blazor Server and Blazor WebAssembly?
??x
Blazor Server relies on a persistent HTTP connection to an ASP.NET Core server where C# code is executed. In contrast, Blazor WebAssembly executes C# code natively within the browser.
x??

---


#### Limitations of Both Versions of Blazor
Background context: The text notes that neither version of Blazor is suitable for every project due to specific limitations.

:p What are some limitations of using Blazor in a project?
??x
Blazor Server may face issues with scalability and server resource usage, while Blazor WebAssembly might have limitations in terms of performance and compatibility with older browsers.
x??

---

---


---
#### Entity Framework Core Overview
Entity Framework Core is Microsoft’s object-relational mapping (ORM) framework, which translates data from a relational database into .NET objects. This allows developers to work with databases using strongly typed .NET objects instead of writing raw SQL queries.

:p What does Entity Framework Core do?
??x
Entity Framework Core maps entities (.NET objects) to database tables and performs operations like insert, update, delete, and query on the database through these mapped entities.
x??

---


#### ASP.NET Core Identity Overview
ASP.NET Core Identity is a framework provided by Microsoft for handling authentication and authorization in ASP.NET Core applications. It provides mechanisms for user validation, role-based access control, and password management.

:p What is ASP.NET Core Identity used for?
??x
ASP.NET Core Identity is primarily used to validate user credentials (e.g., username and password) and manage their roles and permissions within the application.
x??

---


#### Understanding the ASP.NET Core Platform
The ASP.NET Core platform includes low-level features necessary for handling HTTP requests and responses, such as an integrated HTTP server, middleware components, URL routing, and the Razor view engine. These core functionalities support higher-level frameworks like ASP.NET Core MVC.

:p What does the ASP.NET Core platform provide?
??x
The ASP.NET Core platform provides essential services needed to process incoming HTTP requests and generate appropriate responses. It includes a built-in web server, middleware for handling request pipelines, URL routing mechanisms, and a templating engine (Razor) for generating HTML content.
x??

---


#### SignalR Overview
SignalR is a library developed by Microsoft that simplifies adding real-time web functionality to applications. It enables bidirectional communication between the client and server over HTTP. While it isn’t covered in detail in this book, it’s worth noting as it provides the foundation for Blazor Server applications.

:p What is SignalR used for?
??x
SignalR is used to implement real-time push notifications or live updates on web pages without requiring continuous polling from the client.
x??

---


#### Blazor Server Framework Overview
Blazor is a framework for building interactive web UIs with .NET. The server framework in particular enables the execution of C# code on the server and pushes updates directly to the browser. While SignalR forms its foundation, it isn’t covered extensively here.

:p What does Blazor Server provide?
??x
Blazor Server allows you to write C# code for your web application and uses SignalR under the hood to push changes from the server to the client in real-time.
x??

---

---


#### Prerequisites for Following Examples
To understand and follow the examples in this book, you should have a basic understanding of web development concepts, familiarity with HTML and CSS, and knowledge of C#. No prior experience with client-side development like JavaScript is required as the focus is on server-side development using ASP.NET Core.
:p What background knowledge is necessary to start reading this book?
??x
You need to be familiar with the basics of web development, understand how HTML and CSS work, and have a working knowledge of C#. Knowledge of client-side languages like JavaScript is not required as the emphasis in the book is on server-side technologies.
x??

---

