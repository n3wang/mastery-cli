# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 11)


**Starting Chapter:** Example Shared Static Data

---


#### Duplicating Shared Static Data Tables
Background context: One approach to address the inconsistency issue mentioned earlier is to duplicate the shared static data table for each package or service. This ensures that every service has its own copy, reducing the risk of inconsistent updates.

:p What are the potential challenges with duplicating a shared static data table across different services?
??x
The primary challenge with duplicating shared static data tables is maintaining consistency:
1. **Maintenance Overhead**: Each service would need to be updated independently whenever changes occur.
2. **Complexity in Updates**: Ensuring that all instances of the duplicated table are kept synchronized can be complex and error-prone.

For example, if a new country code needs to be added, this change must be manually propagated to each instance of the duplicated table across all services.

x??

---


#### Treating Shared Static Data as Code
Background context: Another approach is to treat shared static data as part of the application’s code or configuration. This could involve storing it in a property file or using enums within the codebase, making changes easier and more controlled compared to altering a live database table.

:p How might you implement treating shared static data (like country codes) as code?
??x
You can implement this by:
1. **Using Property Files**: Store the data in a properties file that is deployed with each service.
2. **Enums or Constants**: Define enums or constants within your application code for easy access and maintainability.

Example using property files:

```properties
# config.properties
countryCodes=AU,US,CA
```

Example using Java enums:

```java
public enum CountryCode {
    AUSTRALIA("AU"),
    UNITED_STATES("US"),
    CANADA("CA");

    private final String code;

    CountryCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
```

In both cases, changes are easier to manage and less prone to database-related issues.

x??

---


#### Shared Data and Implicit Models
Background context explaining shared mutable data, where both finance and warehouse systems update a common customer record table. This leads to potential issues like race conditions and inconsistent states.

:p What is the problem with shared mutable data in this scenario?
??x
The problem arises from having multiple parts of the system (finance and warehouse) updating the same piece of data (customer records). This can lead to race conditions, where one part of the system might overwrite changes made by another, or inconsistencies if both parts read outdated data.

Code examples:
```java
// Pseudocode for finance code update
void updatePayment(Customer customer) {
    // Read current payment status from database
    String currentStatus = getPaymentStatusFromDatabase(customer.id);
    
    // Update the payment status in the database
    setPaymentStatusInDatabase(customer.id, "PAID");
}

// Pseudocode for warehouse code update
void dispatchOrder(Customer customer) {
    // Read current order status from database
    String currentStatus = getOrderStatusFromDatabase(customer.id);
    
    // Dispatch the order and update its status in the database
    setOrderStatusInDatabase(customer.id, "DISPATCHED");
}
```
x??

---


#### Domain Concepts and Code Organization
Background context about needing to model domain concepts explicitly rather than implicitly. The current setup where both finance and warehouse systems use a generic customer record table without clear boundaries leads to confusion.

:p Why is it important to model the Customer as a distinct entity in this scenario?
??x
It is crucial because modeling the Customer as a distinct entity helps clarify ownership and responsibility of data, making the code more modular and maintainable. By doing so, we can better encapsulate logic related to customers within specific services or packages.

Code examples:
```java
// Pseudocode for creating a new Customer service
package com.example.customer;

public class CustomerService {
    public void updatePayment(Customer customer) {
        // Specific logic for updating payments
    }
    
    public void dispatchOrder(Customer customer) {
        // Specific logic for dispatching orders
    }
}

// Example of how to use the Customer Service in another package
package com.example.finance;

import com.example.customer.CustomerService;

public class FinanceSystem {
    private final CustomerService customerService;
    
    public FinanceSystem(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    void processPayment() {
        // Use customer service to update payment status
        customerService.updatePayment(customer);
    }
}
```
x??

---


#### Bounded Contexts and Service Layer Separation
Background context about recognizing bounded contexts as distinct domains with their own rules and models. The example illustrates how separating the Customer domain into its own service helps in managing changes and responsibilities.

:p What is a bounded context, and why is it important to recognize them?
??x
A bounded context refers to a specific part of a larger system where certain rules apply and are meaningful. Recognizing bounded contexts is important because different parts of the system might have different views on the same data or processes. By separating these contexts into distinct services or packages, we can ensure that each service operates within its own defined scope, reducing complexity and making the codebase more manageable.

Code examples:
```java
// Example of a Customer bounded context
package com.example.customer;

public class CustomerService {
    public void updatePayment(Customer customer) {
        // Specific logic for updating payments
    }
    
    public void dispatchOrder(Customer customer) {
        // Specific logic for dispatching orders
    }
}

// Example of a Finance system using the Customer service
package com.example.finance;

import com.example.customer.CustomerService;

public class FinanceSystem {
    private final CustomerService customerService;
    
    public FinanceSystem(CustomerService customerService) {
        this.customerService = customerService;
    }
    
    void processPayment() {
        // Use customer service to update payment status
        customerService.updatePayment(customer);
    }
}
```
x??

---

---


#### Refactoring Databases
Background context: The example discusses the need to refactor a database schema by separating concerns that were previously conflated. This is part of a broader process of breaking down monolithic applications into microservices, each with its own bounded context and database schema.

:p What is the primary reason for refactoring databases in this scenario?
??x
The primary reason for refactoring databases is to separate concerns that were previously conflated within a single table. By doing so, it becomes clear that different parts of the application have distinct needs, which can be better served by separate tables or schemas.
x??

---


#### Splitting Tables into Separate Entities
Background context: The example suggests splitting a shared line item table into two separate entities—one for catalog details and another for warehouse inventory. This separation helps in managing data more effectively within different contexts.

:p Why is it beneficial to split the shared line item table?
??x
Splitting the shared line item table benefits the application by allowing each context (e.g., catalog and warehouse) to manage its specific requirements independently. This leads to cleaner, more maintainable code and databases that better reflect real-world relationships and responsibilities.
x??

---


#### Staging the Break for Schema Separation
Background context: After refactoring the database schema, it is recommended to keep the application code together before fully separating the services into microservices. This staged approach helps in managing potential issues arising from breaking transactional integrity.

:p Why is it advised to stage the separation of schemas before splitting the service?
??x
It is advised to stage the separation of schemas by keeping the application code together because this allows for easier testing and troubleshooting without affecting consumers of the service. If problems arise, the change can be reverted or adjusted more easily.
x??

---


#### Transactional Boundaries in Monolithic Schema vs. Separated Schemas
Background context: The example illustrates how transactions work within a monolithic schema versus when schemas are separated. In a monolithic schema, all operations can be performed within a single transaction; however, once the schemas are separated, this safety is lost.

:p How does separating database schemas affect transactional integrity?
??x
Separating database schemas affects transactional integrity because operations that were previously contained within a single transaction now span multiple schemas. This means that if one part of an operation succeeds and another fails, it can leave the system in an inconsistent state unless special measures are taken.
x??

---


#### Example of Transactional Boundaries
Background context: The example uses a MusicCorp scenario to illustrate how transactions work when separating database schemas. It shows that operations that need to be atomic across different databases now span two separate transaction boundaries, which can lead to partial failures.

:p What happens if the insert into the order table succeeds but the insert into the picking table fails?
??x
If the insert into the order table succeeds but the insert into the picking table fails, the system will leave the order in a partially completed state. This inconsistency could result in an incorrect inventory count and possible delays in order fulfillment.

To handle this, you might need to implement compensating transactions or other mechanisms to ensure that either both operations succeed or neither does.
x??

---

---

