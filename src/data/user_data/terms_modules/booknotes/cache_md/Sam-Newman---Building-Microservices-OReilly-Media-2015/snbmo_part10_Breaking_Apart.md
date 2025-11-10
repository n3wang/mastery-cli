# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 10)


**Starting Chapter:** Breaking Apart MusicCorp

---


#### Identifying Bounded Contexts as Seams
Background context: The monolithic structure of services often leads to a lack of cohesion and tight coupling, making it difficult to make changes without affecting other parts of the system. Michael Feathers' concept of seams is introduced as a way to address this issue by defining clear boundaries in code that can be worked on independently.

:p What are bounded contexts in the context of identifying seams?
??x
Bounded contexts are defined as cohesive and loosely coupled boundaries within an organization, which make excellent seams for breaking apart monolithic services. They represent areas of functionality that can be separated and treated as distinct units.
x??

---


#### Creating Packages Based on Bounded Contexts
Background context: To effectively use bounded contexts as seams, the first step is to identify them in your codebase by creating packages or namespaces that reflect these contexts.

:p How do you create packages for bounded contexts?
??x
You can create packages using namespace concepts provided by programming languages. For example, in Java, you use `package` statements. In Python, you would use module imports. The goal is to group related code into logical units that align with the identified bounded contexts.
```java
// Example of creating a package for the Catalog context
package com.musiccorp.catalog;
public class Item {
    // Catalog-related methods and classes here
}
```
x??

---


#### Refactoring Code into Bounded Context Packages
Background context: After identifying packages, you need to move existing code into these new packages. Modern IDEs can help automate this process through refactorings.

:p How can modern IDEs aid in moving code between packages?
??x
Modern Integrated Development Environments (IDEs) offer refactoring tools that can automatically move code from one package to another. These tools reduce the manual effort required and minimize potential errors during the reorganization of code.
For example, in a Java IDE like IntelliJ IDEA:
```java
// Before refactoring
package com.musiccorp.backend;

public class FinanceReport {
    // Code here
}

// After refactoring
package com.musiccorp.finance;

public class FinanceReport {
    // Code here
}
```
x??

---


#### Incremental Refactoring Process
Background context: The refactoring process is not a one-time, big-bang event but can be done incrementally over time. It allows for gradual improvement and minimizes disruptions.

:p What are the benefits of incremental refactoring?
??x
Incremental refactoring allows you to make changes in small steps, reducing the risk of introducing bugs or breaking existing functionality. This approach also makes it easier to manage dependencies and integrate new features without overwhelming your development team.
```java
// Example of an incremental change
public class Item {
    private int stockLevel;
    
    public void updateStock(int quantity) {
        // Incremental logic here
    }
}
```
x??

---

---


#### Pace of Change
Background context explaining why the pace of change is a critical factor when deciding to split monoliths. It often involves upcoming changes that will make it beneficial to have separate services for quicker and easier management.

:p How does understanding the pace of change influence decisions on splitting a monolithic application?
??x
Understanding the pace of change can guide the decision-making process by identifying areas where changes are expected to be frequent or significant. For instance, if there is an upcoming overhaul in inventory management, separating that functionality into its own service could facilitate faster development and deployment cycles.

```java
public class InventoryService {
    public void updateInventory() {
        // Logic for updating the inventory system
    }
}
```
x??

---


#### Team Structure
Context around team structure, highlighting geographical distribution as a key driver for splitting monoliths. This can lead to better ownership and autonomy among development teams.

:p How does the geographic split of a delivery team influence decisions on splitting a monolithic application?
??x
Geographic splits in a delivery team can drive the decision to separate parts of the codebase that are frequently worked on by different regions. For example, if one team based in Hawaii works more with warehouse management, separating this functionality could allow them to take full ownership and make changes independently.

```java
public class WarehouseManagementService {
    public void manageInventory() {
        // Logic for managing inventory operations
    }
}
```
x??

---


#### Security Considerations
Discussion on security audits leading to the need for separation of sensitive data handling, ensuring better protection through isolation in a microservices architecture.

:p How can splitting parts of a monolithic application based on security needs improve overall system security?
??x
Splitting parts of a monolithic application that handle sensitive data can enhance security by isolating these components. For instance, if the finance-related code manages sensitive information, separating this into its own service can provide additional protections such as better monitoring and secure handling of data at rest and in transit.

```java
public class FinanceService {
    public void processFinanceData() {
        // Logic for processing financial transactions
    }
}
```
x??

---


#### Tangled Dependencies
Discussion on identifying tangled dependencies, particularly with the database, as a critical step in splitting monoliths. Highlighting the importance of understanding how code interacts with the database to avoid complex refactoring.

:p How does analyzing dependencies help in deciding which parts of the application should be split?
??x
Analyzing dependencies is crucial for understanding which parts of the application can be separated without causing significant disruptions. By examining how different components interact with the database, you can identify seams that are less entangled and easier to split out.

```java
public class RepositoryLayer {
    private final EntityManagerFactory entityManagerFactory;

    public RepositoryLayer(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    // Methods for interacting with the database
}
```
x??

---


#### Database Splitting
Explanation of how to split out database access code, particularly focusing on the repository layer and tools like SchemaSpy for visualizing database relationships.

:p How can you use SchemaSpy to visualize database dependencies when splitting a monolithic application?
??x
SchemaSpy is a useful tool for generating graphical representations of database relationships. By using it, you can better understand the coupling between tables that span different bounded contexts and identify which parts of the database are used by specific code components.

```java
// Example usage of SchemaSpy
new SchemaSpy(new File("output"), "jdbc:mysql://localhost/database", "username", "password").execute();
```
x??

---

---


#### Breaking Foreign Key Relationships
Background context: In the example, there's a foreign key relationship between the catalog and finance packages where the finance code uses data from the line item table stored in the catalog package. This creates a dependency that needs to be addressed when these become separate services.

:p What is the issue with having the finance code reach into the line item table?
??x
The issue is that database integration happens between different parts of the application, which can lead to coupling and potential performance issues as services are separated. To address this, the solution involves exposing data via an API call in the catalog package, making sure the finance code interacts through a service boundary rather than directly accessing the database.

```java
// Example of an API method in the CatalogService
public class CatalogService {
    public String getAlbumTitleBySku(String sku) {
        // Logic to fetch album title by SKU from the line item table
        return "Bruce Springsteen’s Greatest Hits";
    }
}
```
x??

---


#### Exposing Data via API Call
Background context: To avoid direct database access and ensure loose coupling between services, an API call is introduced. This allows the finance package to request necessary information from the catalog package.

:p How does exposing data through a service boundary help in managing foreign key relationships?
??x
Exposing data through a service boundary helps by decoupling the finance code from direct database access. It ensures that changes or updates in the line item table managed by the catalog do not affect the finance package directly. This separation also allows for better performance and scalability as services can manage their own databases more efficiently.

```java
// Example of how the finance package might make an API call to CatalogService
public class FinanceService {
    private final CatalogService catalogService;

    public FinanceService(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public String generateReport() {
        // Assuming some ledger data is available here
        String sku = "12345";
        String albumTitle = catalogService.getAlbumTitleBySku(sku);
        return "We sold 400 copies of " + albumTitle + " and made $1,300.";
    }
}
```
x??

---


#### Performance Considerations in Service Separation
Background context: While separating services, performance is a critical concern. The objective is to determine whether the trade-off of slower direct database access for better service independence and scalability is acceptable.

:p How do you evaluate the impact on performance when considering separation of services?
??x
To evaluate the impact on performance, you should first measure the current performance of your system. Understand what constitutes good performance based on testing and user needs. If these requirements are met, separating services by using API calls can be a reasonable trade-off. It ensures that each service is self-contained and scalable.

```java
// Example of profiling code to measure current performance
public class PerformanceProfiler {
    public long getCurrentPerformanceMetrics() {
        // Logic to fetch current performance metrics (e.g., response time, throughput)
        return 500; // Example latency in ms
    }
}
```
x??

---


#### Handling Inconsistencies Across Services
Background context: After separating services and removing foreign key constraints, inconsistencies can arise if one service deletes data that another service references. This requires implementing custom logic to maintain data integrity.

:p What steps are necessary to handle data inconsistencies across separated services?
??x
Handling data inconsistencies involves implementing custom consistency checks or triggers for cleanup actions in the services. For instance, if a catalog item is deleted, related orders should be updated or cleaned up to prevent invalid references.

```java
// Example of handling item deletion and updating related order service
public class CatalogService {
    public void deleteItem(Long id) {
        // Delete logic
        for (OrderService os : getAllOrderServices()) {
            os.updateOrdersForRemovedItem(id);
        }
    }

    private void updateOrdersForRemovedItem(Long id) {
        // Logic to check and update orders referencing the removed item
    }
}
```
x??

---

---

