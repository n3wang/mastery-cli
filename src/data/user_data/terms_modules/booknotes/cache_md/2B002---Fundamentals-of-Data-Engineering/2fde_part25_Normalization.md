# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 25)


**Starting Chapter:** Normalization

---


#### Streaming Data Joins Complexity
Background context explaining the concept. When streaming data is joined, different streams may arrive at varying latencies, leading to complications. For example, one stream might have a five-minute delay compared to another. Events like session close or offline events can be significantly delayed due to network conditions.
:p What challenges do streaming data joins face regarding latency and event timing?
??x
Streaming data joins face significant challenges because different streams may arrive at the join point with varying latencies. This means that one stream might lag behind others, leading to potential delays in processing related events. For instance, an ad platform's data might have a five-minute delay compared to other streams.
In addition, certain events can be delayed due to network conditions or other factors. A user's session close event could be delayed if the device is offline and only comes back online after the user regains mobile network access.

For example:
- Stream A: Ad Data (5-minute delay)
- Stream B: User Session Data

These delays mean that by the time a relevant event from Stream B arrives, it might not match with events in Stream A due to latency.
x??

---

#### Streaming Buffer Retention Interval
Background context explaining the concept. To manage these latencies and ensure timely processing of related events, streaming systems often use buffers. The buffer retention interval is configurable; setting a longer retention interval requires more storage but allows for joining more delayed events. Events in the buffer are eventually evicted after the retention period has passed.
:p What is a key factor in streaming joins that uses buffering to manage latency?
??x
A key factor in streaming joins that uses buffering to manage latency is the configurable buffer retention interval. This interval determines how long events remain in the buffer before being processed or removed. A longer retention interval allows for joining more delayed events but requires additional storage and resources.
For example, if an event from Stream B (a user session close) arrives after a five-minute delay due to network conditions, setting a longer buffer retention interval ensures that it can still be joined with corresponding events in Stream A (ad data).
x??

---

#### Data Modeling Importance
Background context explaining the concept. Data modeling is crucial for organizing and structuring data in a way that supports business needs. It involves choosing a coherent structure for data to ensure effective communication and workflow within an organization. Poor or absent data models can lead to redundant, mismatched, or incorrect data.
:p Why is data modeling important?
??x
Data modeling is important because it ensures that data is structured coherently to support the business logic and goals of an organization. A well-constructed data model captures how communication and work naturally flow within the organization, making data more useful for decision-making.

Poor or absent data models can lead to several issues:
1. **Redundant Data**: Duplicates and inconsistencies that complicate analysis.
2. **Mismatched Data**: Inaccurate data leading to incorrect business decisions.
3. **Incorrect Data**: Data that does not accurately reflect the real-world processes, causing confusion.

For example, a poorly modeled database might have redundant fields or inconsistent naming conventions, making it difficult for analysts and engineers to understand and work with the data effectively.
x??

---

#### Data Model Definition
Background context explaining the concept. A data model represents how data relates to the real world, reflecting the structured and standardized way data should be organized to best support organizational processes, definitions, workflows, and logic. It captures natural communication flows within an organization.
:p What is a data model?
??x
A data model is a representation of how data relates to the real world. It reflects how data must be structured and standardized to best represent an organization's processes, definitions, workflows, and business logic. A good data model should correlate with impactful business decisions by capturing how communication and work naturally flow within the organization.

For example:
- In an e-commerce system, a customer data model might include fields like `customer_id`, `name`, `email`, and `order_history`. This structure helps in efficiently managing and querying customer-related data to support sales and marketing strategies.
x??

---

#### Data Model in Streaming and ML
Background context explaining the concept. As the importance of data grows, so does the need for coherent business logic through data modeling. The rise of data management practices such as data governance and quality has highlighted the critical role that well-constructed data models play. New paradigms are needed to effectively handle streaming data and machine learning.
:p How do modern practices like data governance affect data modeling?
??x
Modern practices like data governance emphasize coherent business logic, which drives the need for well-structured data models. Data governance ensures that data is managed consistently across an organization, adhering to rules and standards.

Data models are crucial in this context because they help align data with business objectives. Poorly modeled data can lead to confusion, redundancy, and incorrect decisions. As data becomes more prominent in companies, there's a growing recognition that robust data modeling is essential for realizing value at higher levels of the Data Science Hierarchy of Needs.

For example:
- In a financial institution, a well-defined data model ensures that customer transactional data is consistent and accurate, supporting compliance and risk management strategies.
x??


---
#### Denormalized OrderDetail Table
In our initial table, `OrderDetail`, we see that it is a denormalized structure. The primary key is `OrderID` and there are nested objects within the `OrderItems` field which contain multiple product details (SKU, Price, Quantity, Name).
:p What does the term "denormalized" mean in this context?
??x
In this context, "denormalized" means that data is stored in a way that doesn't follow normalization rules. Specifically, the table contains nested objects within `OrderItems` field, which makes it difficult to manage and manipulate.
```java
// Pseudocode for adding an order item to the OrderDetail table
public void addOrderItem(Order order) {
    // Nested object is stored as a stringified JSON or similar structure
    String orderItemsJson = "[{ \"sku\": 1, \"price\": 50, \"quantity\" : 1, \"name\":\"Thingamajig\" }, { \"sku\": 2, \"price\": 25, \"quantity\" : 2, \"name\": \"Whatchamacallit\" }]";
    order.setOrderItems(orderItemsJson);
}
```
x??
---

---
#### Moving to First Normal Form (1NF)
To convert the `OrderDetail` table into first normal form (1NF), we need to ensure that each column contains a single value and remove any nested data. We break down the `OrderItems` field into four separate columns: Sku, Price, Quantity, and ProductName.
:p What is First Normal Form (1NF) in database normalization?
??x
First Normal Form (1NF) requires that all the values of each column in a table must be atomic (indivisible), meaning simple and non-repetitive. In other words, no sub-values or arrays can exist within any single cell. Each value should be unique and distinct.
```java
// Pseudocode for transforming OrderDetail to 1NF
public void transformTo1NF(OrderDetail orderDetail) {
    List<OrderItem> items = Json.parse(orderDetail.getOrderItems()); // Parse the nested object
    for (OrderItem item : items) {
        String[] values = { item.getSku(), item.getPrice(), item.getQuantity(), item.getName() };
        // Insert or update each value in separate columns
    }
}
```
x??
---

---
#### Creating a Unique Primary Key
In the transformed `OrderDetail` table, we see that the primary key is not unique because multiple rows share the same `OrderID`. To create a unique primary key, we add a `LineItemNumber` column which numbers each line item in an order.
:p What is meant by "unique primary key"?
??x
A unique primary key means that every row in the table must have a distinct identifier. This unique value helps to uniquely identify each record in the database table and no two rows can share the same primary key value. It ensures that each item is identifiable without any ambiguity.
```java
// Pseudocode for adding LineItemNumber
public void addLineItemNumbers(List<OrderDetail> orderDetails) {
    int lineNumber = 1;
    for (OrderDetail detail : orderDetails) {
        String[] items = detail.getOrderItems();
        for (String item : items) {
            // Parse the item and set the LineItemNumber
            detail.setLineItemNumber(lineNumber++);
        }
    }
}
```
x??
---

---
#### Ensuring Second Normal Form (2NF)
To move to second normal form (2NF), we need to ensure that no partial dependencies exist. In our case, the `OrderID` column partially determines the `CustomerName`, so we split the table into two: `Orders` and `OrderLineItem`.
:p What is a partial dependency?
??x
A partial dependency occurs when non-key columns in a composite key are determined by only part of the primary key. For example, if `CustomerName` can be determined just from `OrderID` (a subset of the primary key), then there is a partial dependency.
```java
// Pseudocode for creating Orders and OrderLineItem tables
public void createNormalizedTables(List<OrderDetail> orderDetails) {
    Map<String, Order> ordersMap = new HashMap<>();
    List<OrderLineItem> itemsList = new ArrayList<>();

    for (OrderDetail detail : orderDetails) {
        String orderId = detail.getOrderID();
        Order order = ordersMap.get(orderId);
        if (order == null) {
            // Create a new Order
            order = new Order(detail.getCustomerID(), detail.getCustomerName(), detail.getOrderDate());
            ordersMap.put(orderId, order);
        }

        List<String> items = detail.getOrderItems();
        for (String item : items) {
            // Parse the item and add it to OrderLineItem
            OrderLineItem itemObj = parseOrderItem(item);
            itemsList.add(itemObj);
        }
    }

    return new Tuple<>(ordersMap.values(), itemsList);
}
```
x??
---

---
#### Transitive Dependencies in 3NF
In our `OrderLineItem` table, the `Sku` determines the `ProductName`, creating a transitive dependency. To remove this, we split the `OrderLineItem` into two tables: `OrderLineItem` and `Skus`.
:p What is a transitive dependency?
??x
A transitive dependency occurs when a non-key field depends on another non-key field, both of which depend on some part or all of the primary key. In our example, `Sku` (a non-key) determines `ProductName`, and this determination indirectly involves other columns.
```java
// Pseudocode for breaking OrderLineItem into two tables
public void breakOrderLineItem(List<OrderLineItem> items) {
    Map<String, Sku> skusMap = new HashMap<>();
    List<OrderLineItem> orderItemsList = new ArrayList<>();

    for (OrderLineItem item : items) {
        String skuId = item.getSku();
        Sku sku = skusMap.get(skuId);
        if (sku == null) {
            // Create a new Sku
            sku = new Sku(skuId, parseProductName(item));
            skusMap.put(skuId, sku);
        }
        // Assign the Sku to OrderLineItem
        item.setSku(sku);
        orderItemsList.add(item);
    }

    return new Tuple<>(orderItemsList, skusMap.values());
}
```
x??
---


#### Transitive Dependencies and 3NF
Background context explaining the concept. In database normalization, third normal form (3NF) aims to eliminate transitive dependencies, which are indirect functional dependencies that violate 3NF. A transitive dependency occurs when a column $X $ functionally depends on another column$Y $, but$ Y$ does not depend on any other columns in the relation.
If applicable, add code examples with explanations:
```java
public class Example {
    // Imagine an Order entity which has a one-to-many relationship with OrderLineItem. 
    // Order(OrderID) -> OrderLineItem(OrderID, LineItemNumber)
    // However, if SkuPriceQuantity depends on OrderID and LineItemNumber but neither of these columns individually determine SkuPriceQuantity.
}
:p What are transitive dependencies in the context of 3NF?
??x
Transitive dependencies occur when a column $X $ functionally depends on another column$Y $, but $ Y$ does not depend on any other columns. In simpler terms, if there is an indirect dependency between columns that violates 3NF.
x??

---

#### Fixing Transitive Dependencies in Orders Table
Background context explaining the concept. If the Orders table contains transitive dependencies and needs to be normalized to 3NF, it might need restructuring. For instance, splitting the table into separate entities can resolve such issues.
If applicable, add code examples with explanations:
```java
public class Example {
    // Imagine the original Order entity which has multiple fields that could lead to transitive dependencies.
    // To normalize Orders to 3NF, we may split it as follows:
    class Order { 
        int orderID; 
        DateTime creationDateTime; 
        Status orderStatus; 
    }
    
    class LineItem { 
        int lineItemNumber; 
        BigDecimal priceQuantity; 
        int orderId; // Foreign key 
    }
}
:p How would you fix transitive dependencies in the Orders table to bring it to 3NF?
??x
To fix transitive dependencies and bring the Orders table to 3NF, you might split it into smaller tables. For example, `Order` could have a primary key of `orderID`, `LineItem` could contain `lineItemNumber`, `priceQuantity`, and `orderId` (as a foreign key), while other attributes like `creationDateTime` and `status` would be moved to the `Order` table.
x??

---

#### Database Normalization Levels
Background context explaining the concept. The levels of normalization include 1NF, 2NF, 3NF, BCNF, 4NF, and 5NF (up to 6NF in some systems). Each level aims to reduce data redundancy and improve integrity by eliminating specific types of anomalies.
If applicable, add code examples with explanations:
```java
public class Example {
    // For instance, moving from 1NF to 3NF would involve:
    class Customer { 
        int customerId; 
        String name; 
        List<Order> orders; // A list of Order objects 
    }
    
    class Order { 
        int orderId; 
        int customerId; // Foreign key 
        DateTime orderDate; 
    }
}
:p What are the different levels of database normalization?
??x
The different levels of database normalization include:
- 1NF: Elimination of repeating groups (rows).
- 2NF: Ensuring that all non-key attributes depend only on the primary key.
- 3NF: Removing transitive dependencies and ensuring that each column is dependent only on the primary key.
- BCNF: Ensuring that functional dependencies are in a "truly" third normal form.
- 4NF and 5NF: Further normalization to avoid complex relationships.
x??

---

#### Data Modeling Techniques for Batch Analytical Data
Background context explaining the concept. In batch analytical data modeling, techniques like Kimball, Inmon, and Data Vault are commonly used. These approaches aim to create a structured data model from raw data that can be queried efficiently for analytics.
If applicable, add code examples with explanations:
```java
public class Example {
    // For instance, in the Kimball approach, a star schema might look like this:
    class FactSales { 
        int saleID; 
        DateTime saleDate; 
        BigDecimal amount; 
        int customerID; 
        int productID; 
    }
    
    class DimCustomer { 
        int customerID; 
        String name; 
        String address; 
    }
    
    class DimProduct { 
        int productID; 
        String productName; 
    }
}
:p What are the key data modeling techniques for batch analytical data?
??x
Key data modeling techniques for batch analytical data include:
- Kimball: Uses a star schema where facts and dimensions are separated.
- Inmon: Emphasizes creating a single, normalized data warehouse.
- Data Vault: A more flexible approach that uses hubs, links, and satellites to model data.
x??

---

#### Inmon's Approach to Data Modeling
Background context explaining the concept. Bill Inmon’s approach defines a data warehouse as "a subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management’s decisions." The goal is to separate source systems from analytical databases for better performance.
If applicable, add code examples with explanations:
```java
public class Example {
    // Inmon's approach might involve creating a single, normalized warehouse:
    class SalesFact { 
        int saleID; 
        DateTime saleDate; 
        BigDecimal amount; 
        int customerID; 
        int productID; 
    }
    
    class CustomerDim { 
        int customerID; 
        String name; 
        String address; 
    }
    
    class ProductDim { 
        int productID; 
        String productName; 
    }
}
:p What is Inmon's approach to data modeling?
??x
Inmon’s approach defines a data warehouse as "a subject-oriented, integrated, nonvolatile, and time-variant collection of data in support of management’s decisions." It emphasizes creating a single, normalized warehouse to separate source systems from analytical databases for better performance.
x??

---


#### Logical Model Focus
Background context explaining that the logical model must focus on a specific area, such as "sales." This ensures all details related to sales are included—business keys, relationships, attributes, etc. The model is integrated into a consolidated and highly normalized data structure.

:p What does the logical model in an Inmon data warehouse need to focus on?
??x
The logical model must focus on a specific area such as "sales," ensuring that all details related to sales are included—business keys, relationships, attributes, etc. This is crucial for maintaining a subject-oriented approach.
x??

---

#### Consolidation and Normalization
Background context explaining how the data from disparate sources is consolidated and normalized into a single, highly normalized (3NF) data model.

:p How is the data integrated in an Inmon data warehouse?
??x
The data from various sources is integrated into a single, highly normalized (3NF) data model. This process ensures that there is minimal data duplication, reducing downstream analytical errors due to redundancies.
x??

---

#### Nonvolatile and Time-Variant Storage
Background context explaining the importance of storing data unchanged in a nonvolatile manner, allowing for historical queries.

:p How is the data stored in an Inmon data warehouse?
??x
Data is stored unchanged (nonvolatility) and can be queried over time ranges. This means you can theoretically query the original data as long as storage history allows.
x??

---

#### Subject-Oriented Data Warehouse
Background context explaining that a subject-oriented approach ensures all details related to the specific area of interest are included in the model.

:p What is a key characteristic of an Inmon data warehouse?
??x
A key characteristic of an Inmon data warehouse is its subject-oriented nature. This means that the logical model contains all details related to a specific area, such as "sales," ensuring comprehensive coverage.
x??

---

#### Integration and Data Transformation
Background context explaining how data from multiple sources is integrated into a single physical corporate image through conversion, reformatting, resequencing, and summarization.

:p How does integration work in an Inmon data warehouse?
??x
Integration in an Inmon data warehouse involves converting, reformating, resequencing, and summarizing data as it is fed from multiple disparate sources. The result is a single physical corporate image that provides a consistent view across the organization.
x??

---

#### Key Source Databases
Background context explaining that key business source systems are ingested into the data warehouse to create a "single source of truth."

:p What role do key source databases play in an Inmon data warehouse?
??x
Key source databases and information systems used in an organization feed their data into the highly normalized (3NF) data warehouse. This ensures that there is a single, accurate representation of the business’s information.
x??

---

#### Data Marts for Department-Specific Information Requests
Background context explaining how data marts are created from the data warehouse to serve specific departmental needs.

:p How are downstream reports and analysis provided in an Inmon data warehouse?
??x
Data marts are created from the granular, highly normalized data warehouse to provide specific departmental information. These marts may be denormalized to optimize access for each department’s unique needs.
x??

---

#### Example of Ecommerce Data Warehouse
Background context explaining how the data warehouse supports ecommerce by integrating orders, inventory, and marketing data.

:p How does an Inmon data warehouse support ecommerce?
??x
An Inmon data warehouse integrates orders, inventory, and marketing data from key business source systems. This integrated data is stored in a 3NF structure, providing a comprehensive view of the organization’s ecommerce operations.
x??

---

#### Star Schema for Data Marts
Background context explaining the use of star schema in downstream data marts.

:p What data model is commonly used in data marts?
??x
A popular option for modeling data in data marts is a star schema, although any data model that provides easily accessible information is suitable. The star schema helps each department have its own optimized data structure.
x??

---


#### Fact Table Structure

Background context: The fact table contains numeric data representing events, such as sales transactions. It references dimension tables to provide detailed information about these events.

:p What is a fact table and what does it contain?

??x
A fact table stores the transactional data and includes measures or facts (such as sales amounts) along with keys that link to corresponding dimensions for additional context. In this example, `OrderID`, `CustomerKey`, `DateKey`, and `GrossSalesAmt` are the key fields.

```java
public class FactTable {
    int orderId;
    int customerKey;
    int dateKey;
    float grossSalesAmount;
}
```
x??

---

#### Dimension Table Overview

Background context: Dimension tables provide descriptive information (attributes) for events recorded in fact tables. They have a smaller and wider shape compared to fact tables.

:p What is the purpose of dimension tables?

??x
Dimension tables store detailed attributes about entities such as customers, dates, products, etc., which help describe the context of transactions stored in fact tables. For instance, a customer dimension can contain fields like first name, last name, zip code, and date-related fields.

```java
public class DimensionTable {
    int key;
    String firstName;
    String lastName;
    String zipCode;
    LocalDate effectiveStartDate;
    LocalDate effectiveEndDate;
}
```
x??

---

#### Date Dimension

Background context: A date dimension is used to store detailed information about dates, enabling complex queries such as aggregating sales by quarters or days of the week.

:p What does a typical date dimension table include?

??x
A date dimension table contains fields like `DateKey`, `YearQuarter`, and `MonthDayOfWeek` that provide granular details about each day. This helps in answering questions related to time periods, such as quarterly sales totals.

```java
public class DateDimension {
    int dateKey;
    LocalDate isoDate;
    int yearQuarter;
    DayOfWeek dayOfWeek;
}
```
x??

---

#### Customer Dimension

Background context: The customer dimension stores detailed information about customers, including their names, addresses, and historical changes in their records. Type 2 slowly changing dimensions are used to track updates without deleting old records.

:p What is a Type 2 slowly changing dimension?

??x
A Type 2 slowly changing dimension retains history by adding new rows for updated customer records rather than updating existing ones. This approach allows tracking of how data changes over time while maintaining the integrity of historical data.

```java
public class CustomerDimension {
    int customerKey;
    String firstName;
    String lastName;
    String zipCode;
    LocalDate effectiveStartDate;
    LocalDate effectiveEndDate;
}
```
x??

---

#### Type 2 Slowly Changing Dimension

Background context: In a Kimball data model, slowly changing dimensions (SCDs) are used to manage changes in dimension attributes over time. A Type 2 SCD adds new records when changes occur instead of updating existing ones.

:p How does a Type 2 SCD handle updates?

??x
A Type 2 SCD handles updates by inserting a new row with the updated data and setting the `effectiveEndDate` for the previous version to the current date. This way, historical data is preserved while new versions are added.

```java
public class CustomerDimension {
    int customerKey;
    String firstName;
    String lastName;
    String zipCode;
    LocalDate effectiveStartDate;
    LocalDate effectiveEndDate;
}
// Example of updating a record
if (oldRecord.getCustomerKey() == currentRecord.getCustomerKey()) {
    oldRecord.setEffectiveEndDate(LocalDate.now());
    newRecord = currentRecord;
    newRecord.setEffectiveStartDate(oldRecord.getEffectiveEndDate().plusDays(1));
    // Insert the new record
}
```
x??

---


#### Data Vault Overview
Data Vault was created by Dan Linstedt in the 1990s. It offers a different approach to data modeling compared to Kimball and Inmon, focusing on keeping data as closely aligned to the business as possible while allowing for agile, flexible, and scalable models.
:p What is Data Vault?
??x
Data Vault is a methodology that separates the structural aspects of source system's data from its attributes. It does not represent business logic through facts or highly normalized tables but instead loads data directly into purpose-built tables in an insert-only manner.
x??

---

#### Hubs, Links, and Satellites
Hubs store unique business keys, links maintain relationships among these keys, and satellites hold the attributes and context of a business key. A user will query a hub to link to relevant satellite tables containing specific details.
:p What are the three main types of tables in Data Vault?
??x
The three main types of tables in Data Vault are:
- Hubs: Store unique business keys.
- Links: Maintain relationships among these keys.
- Satellites: Represent attributes and context of a business key.
x??

---

#### Hub Design Considerations
Identifying the business key is critical when designing a hub. A hub should have fields like hash key, load date, record source, and one or more business keys to uniquely identify records. Once data is loaded into a hub, it's permanent.
:p What are some important considerations when designing a hub in Data Vault?
??x
When designing a hub in Data Vault, the following considerations are important:
- Hash Key: A primary key used to join data between systems (e.g., MD5).
- Load Date: The date the data was loaded into the hub.
- Record Source: The source from which the unique record was obtained.
- Business Key(s): Identifiable business elements that uniquely identify records.

For example, in an ecommerce scenario, you might use `ProductID` as a business key to store product information in a hub.
x??

---

#### Example Hub Schema
The schema for a product hub includes fields like `ProductHashKey`, `LoadDate`, and `RecordSource`. It is insert-only and permanent once data is loaded. This example shows how a populated hub might look.
:p What does the physical design of a product hub in Data Vault include?
??x
The physical design of a product hub in Data Vault includes fields such as:
- ProductHashKey: The primary key used to join data between systems (e.g., MD5).
- LoadDate: The date the data was loaded into the hub.
- RecordSource: The source from which the unique record was obtained.

Here is an example of how a product hub might look when populated with data:
```plaintext
| ProductHashKey | LoadDate       | RecordSource | ProductID |
|----------------|---------------|--------------|-----------|
| 1234567890123  | 2023-10-01    | ERP          | 1         |
| 0987654321098  | 2023-10-02    | ERP          | 2         |
| 5678901234567  | 2023-10-03    | ERP          | 3         |
```
x??

---


#### Wide Tables and Their Benefits

Wide tables are designed to store all related data within a single table, eliminating the need for joins. This approach can lead to faster query performance because fewer operations are required.

Background context: 
In highly normalized databases, queries often require multiple joins between tables to retrieve joined data. This process can be slow due to the overhead of joining tables. Wide tables mitigate this issue by storing all necessary fields in a single table, reducing the number of required operations.

:p What are the benefits of using wide tables for analytics?
??x
Wide tables offer several benefits, including faster query performance and easier querying since joins are eliminated. They can store various data types and handle large volumes of transactional data efficiently.

```sql
-- Example of a wide table structure
CREATE TABLE orders (
    order_id INT,
    customer_id INT,
    order_date DATE,
    product_name VARCHAR(255),
    quantity INT,
    price DECIMAL(10, 2)
);
```
x??

---

#### Criticisms of Wide Tables

While wide tables offer performance benefits, they also come with certain drawbacks. One major criticism is the loss of business logic in analytics when data blending occurs.

Background context: 
The lack of rigorous data modeling can result in a loss of context and business rules that are typically enforced through joins and other relational constraints in normalized databases. Additionally, updating nested data structures within wide tables can be inefficient.

:p What are some criticisms of using wide tables for analytics?
??x
Criticisms include losing business logic when blending data and the difficulty of efficiently performing updates to nested data elements. The absence of rigorous data modeling means that complex relationships and rules may not be preserved, leading to potential errors in analysis.

```java
// Example of an inefficient update in a wide table
List<Order> orders = ...; // Retrieve orders from database
for (Order order : orders) {
    if (order.getProducts().contains(product)) {
        product.setQuantity(newQuantity);
        break;
    }
}
```
x??

---

#### Example Wide Table

Consider the following example of a wide table that combines various data types, represented along a grain of orders for a customer on a date.

Background context: 
The provided example illustrates how a wide table can store all relevant fields in one row. This approach simplifies querying and reduces the need for complex joins.

:p What is an example of a wide table structure?
??x
An example of a wide table could be:

```sql
CREATE TABLE orders (
    order_id INT,
    customer_id INT,
    order_date DATE,
    product_name VARCHAR(255),
    quantity INT,
    price DECIMAL(10, 2)
);
```

This table stores all relevant fields for each order in a single row, reducing the need for joins and potentially improving query performance.

x??

---

#### Flexible Schema and Relaxed Normalization

As data schemas become more adaptive and flexible, wide tables can adapt to this change. This approach is sometimes referred to as "relaxed normalization."

Background context: 
With streaming data and fast-moving schemas, traditional data modeling practices may no longer be sufficient. Wide tables offer a way to handle large volumes of transactional data without strict adherence to normalization rules.

:p What does relaxed normalization mean in the context of data modeling?
??x
Relaxed normalization refers to a less rigid approach to data modeling where wide tables are used to store all necessary fields, allowing for more flexibility and adaptability. This can be particularly useful with streaming data and fast-changing schemas.

```java
// Example of handling dynamic schema changes
public class DataStreamHandler {
    public void handleNewOrder(Order order) {
        // Logic to insert or update the wide table with new order information
    }
}
```
x??

---


#### Denormalized Data and Quick Insights
Background context: The text discusses an approach to managing data where the data is not modeled into a strict schema. This method allows for quick insights by querying data sources directly, often used when companies are just starting or need immediate answers without complex modeling.

:p What is denormalized data in this context?
??x
Denormalized data refers to a structure of storing related data together in a single entity, which can be retrieved more efficiently but may lead to redundancy and potential inconsistencies. In the provided example, an OrderID links multiple order items with customer details without requiring additional joins.

```json
{
  "OrderID": 100,
  "OrderItems": [
    { "sku": 1, "price": 50, "quantity": 1, "name": "Thingamajig" },
    { "sku": 2, "price": 25, "quantity": 2, "name": "Whatchamacallit" }
  ],
  "CustomerID": 5,
  "CustomerName": "Joe Reis",
  "OrderDate": "2022-03-01",
  "Site": "abc.com",
  "Region": "US"
}
```
x??

---

#### Consistency and Business Logic in Non-Modelled Data
Background context: When not modeling data, ensuring consistency and correct business logic is challenging. The text highlights the importance of proper definitions in source systems to avoid false answers.

:p How do you ensure query results are consistent when not modelling data?
??x
Ensuring consistency involves verifying that queries produce truthful answers based on well-defined business rules in the source system. Without a strict model, developers must rely on clear and robust definitions within the source to prevent errors or misinterpretations of data. This can be achieved through rigorous testing and validation processes.

```java
public class DataValidator {
    public boolean validateQueryResults(List<Record> results) {
        for (Record record : results) {
            // Check business logic here, e.g., verifying price calculations, customer IDs, etc.
        }
        return true;
    }
}
```
x??

---

#### Query Load on Source Systems
Background context: Direct querying of source systems can put a heavy load on these systems, impacting their performance and the experience for other users. Balancing between quick insights and maintaining system efficiency is crucial.

:p What are the implications of high query load on source systems?
??x
High query load on source systems can significantly impact performance, leading to slower response times, increased latency, and potential degradation in service quality for all users. This can be mitigated by optimizing queries, caching results, or using a more robust data architecture that offloads some processing to dedicated analytics databases.

```java
public class QueryOptimizer {
    public void optimizeQueries(List<String> queries) {
        // Implement optimization strategies like query tuning, indexing, and caching.
    }
}
```
x??

---

#### Modeling Streaming Data Challenges
Background context: Traditional batch data modeling techniques do not readily translate to streaming environments due to the continuous and unbounded nature of streaming data. The text discusses challenges in updating slowly changing dimensions (SCD) in real-time without overwhelming systems.

:p What are some challenges in modeling streaming data?
??x
Challenges include handling schema changes dynamically, ensuring data integrity, and managing continuous updates while minimizing system load. For example, an IoT device firmware upgrade can introduce new fields that downstream systems need to accommodate. Another challenge is dealing with CDC (Change Data Capture) where data types might change unexpectedly.

```java
public class StreamingDataHandler {
    public void handleStream(Stream stream) {
        // Implement logic to handle schema changes and continuous updates.
    }
}
```
x??

---

#### Flexible Schema for Streaming Data
Background context: Given the dynamic nature of streaming data, flexible schemas are recommended. This approach allows storing both historical and recent data together without a rigid model.

:p Why is a flexible schema important in streaming data?
??x
A flexible schema is crucial because it accommodates unexpected changes in source data while enabling comprehensive analytics on datasets with evolving structures. It ensures that the analytical database can handle various data formats and updates seamlessly, maintaining consistent business logic definitions from the source systems.

```java
public class StreamingDataStorage {
    public void storeData(Stream stream) {
        // Store recent streaming data alongside historical data for comprehensive analysis.
    }
}
```
x??

---

#### Anomaly Detection in Streaming Data
Background context: The text suggests creating automation to respond to anomalies and changes in real-time data streams. This approach allows for proactive management of unexpected events or deviations.

:p How can you implement anomaly detection for streaming data?
??x
Implementing anomaly detection involves monitoring data streams for unusual patterns or outliers. This can be done using statistical methods, machine learning models, or predefined rules to identify anomalies and trigger automated responses.

```java
public class AnomalyDetector {
    public boolean detectAnomalies(Stream stream) {
        // Implement logic to detect anomalies based on historical data or statistical models.
        return true;
    }
}
```
x??

---

