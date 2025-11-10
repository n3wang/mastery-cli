# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 10)


**Starting Chapter:** Avro

---


#### Avro Schema Compatibility and Evolution Rules
Background context: In Apache Avro, ensuring that writer's schema and reader's schema can coexist without breaking compatibility is crucial. The Avro specification defines rules for maintaining forward and backward compatibility through careful addition or removal of fields with default values.

:p What are the key concepts related to Avro schema compatibility?
??x
The key concepts include:
- Forward compatibility: allowing a new writer schema with an old reader schema.
- Backward compatibility: using an old writer schema with a new reader schema.
- Rules for adding or removing fields, especially those with default values.
- Using union types and default values to handle nullable fields explicitly.

x??

---
#### Field Addition and Removal
Background context: Adding or removing fields in Avro schemas must follow specific rules to maintain compatibility. Fields added should have default values; otherwise, it breaks backward or forward compatibility.

:p How can you ensure adding a new field with no default value does not break backward compatibility?
??x
To ensure that adding a new field without a default value does not break backward compatibility, the reader's schema must handle missing fields gracefully. Specifically:
- Fields added in the writer's schema but not present in the reader’s schema are ignored.
- If the reader expects a field that is missing from the writer's data, it uses the default value declared in its own schema.

Example of handling this in Java code:
```java
// Pseudocode to read a record with a potential new field
public void readRecord(Object data) {
    if (data instanceof MyDataWithNewField) {
        // Use the new field's default value if not present
        int newValue = ((MyDataWithNewField) data).getFavoriteNumber() != null ? 
                       ((MyDataWithNewField) data).getFavoriteNumber() : 0;
    } else {
        // Fallback to old schema handling
        int defaultValue = 0; // Default value in the reader's schema
    }
}
```
x??

---
#### Field Name Changes and Union Types
Background context: Changing field names or adding branches to union types must be handled carefully. Field name changes are only backward compatible, while adding a branch to a union type is backward compatible but not forward compatible.

:p How does Avro handle changes in field names?
??x
Avro handles changes in field names by allowing the reader’s schema to include aliases for old field names. This means that when reading data written with an old schema, the new schema can match old field names using these aliases:
```java
// Pseudocode example of aliasing fields
public class OldSchema {
    String oldFieldName;
}

public class NewSchema {
    @Alias("oldFieldName")
    String fieldName;
}
```
x??

---
#### Using Null as a Default Value in Unions
Background context: In Avro, using `null` as a default value for nullable fields involves defining the field with a union type that includes `null`.

:p How does one define a field that can be null in Avro?
??x
To define a field that can be null in Avro, you use a union type:
```java
// Example of a nullable string field in Avro schema
public class NullableField {
    union { 
        null,
        string
    } nullableString;
}
```
This allows the field to either hold a `null` value or a string. Using this structure ensures that fields can be handled gracefully when reading data, even if they are missing.

x??

---
#### Data Type Changes in Schemas
Background context: Changing data types of existing fields must also follow specific rules to maintain compatibility with both old and new schemas. Avro allows changing the type as long as it can convert between types seamlessly.

:p What conditions allow changing a field's data type in an Avro schema?
??x
Changing a field’s data type is possible if:
- The new type can be converted from the existing type.
For instance, converting `int` to `long` or vice versa without losing information is allowed because Avro can handle such conversions.

Example of changing a field's type in Java code:
```java
// Pseudocode example for changing data types
public class SchemaChange {
    long oldIntField; // Old type

    @Convert(oldType = int.class, newType = long.class)
    public void convertIntToLong(int oldValue) {
        this.oldIntField = (long) oldValue;
    }
}
```
x??

---


#### Code Generation and Dynamically Typed Languages

Background context: Thrift and Protocol Buffers rely on code generation, which is useful for statically typed languages like Java or C++. However, this approach may not be as beneficial or even necessary in dynamically typed languages such as Python.

:p What are the challenges of using code generation in dynamically typed languages?
??x
Code generation can sometimes act as an obstacle to quickly accessing data when the schema is dynamically generated. For instance, with Avro, if a schema is derived from a database table and then used to generate code for statically typed languages, it may complicate working directly with the data without that generated code.

```python
# Example of using Avro in Python without code generation
from avro.datafile import DataFileReader
from avro.io import DatumReader

with open('example.avro', 'rb') as file:
    reader = DataFileReader(file, DatumReader())
    for record in reader:
        print(record)
```
x??

---

#### Self-Describing Avro Files

Background context: Avro files are self-describing because they include the necessary metadata within them. This makes them particularly useful with dynamically typed languages and data processing frameworks like Apache Pig.

:p How do Avro files ensure that their schema is always up-to-date?
??x
Avro includes the schema directly in the file, making it inherently self-describing. When you open an Avro file using a library like `avro`, you can read both the data and its corresponding schema without needing to separately manage or load schemas.

```java
// Example of reading an Avro file with Apache Avro in Java
import org.apache.avro.io.Decoder;
import org.apache.avro.specific.SpecificData;
import org.apache.avro.data.JsonEncoder;

Decoder decoder = ... // Initialize the decoder using the schema and data
SpecificDatumReader<MyClass> reader = new SpecificDatumReader<>(MyClass.class);
MyClass record = reader.read(null, decoder);

// You can directly access the fields of 'record' without needing to know the schema beforehand.
```
x??

---

#### Schema Evolution in Protocol Buffers, Thrift, and Avro

Background context: These systems support schema evolution using tag numbers or similar mechanisms. This allows for flexibility in changing schemas over time without breaking compatibility.

:p How does schema evolution benefit data systems?
??x
Schema evolution provides a mechanism to modify the structure of data stored in files or databases while maintaining backward and forward compatibility. It ensures that older versions of software can still read newer versions of data, and vice versa, which is crucial for long-term storage and evolving requirements.

```java
// Example of adding a new field in Protocol Buffers (Java syntax)
message MyMessage {
  // Old fields...
  
  optional string newField = 2; // Adding a new field with tag number 2
}

// Schema change is handled by increasing the version or tag numbers, ensuring that older systems can still read newer data.
```
x??

---

#### Merits of Schemas

Background context: While protocols like ASN.1 exist, more modern and simpler binary encoding formats based on schemas have gained popularity due to their simplicity and broad language support.

:p Why are schema-based binary encodings preferable over textual formats?
??x
Schema-based binary encodings offer several advantages:
- They can be much more compact than text formats because they omit field names.
- The schema acts as valuable documentation, ensuring it stays up-to-date with the data.
- A database of schemas allows for checking compatibility before deployment.
- For statically typed languages, code generation from schemas provides type safety and autocompletion.

```java
// Example of generating Java classes from a Protocol Buffers schema
protoc --java_out=. mymessage.proto
```
x??

---

#### Compactness of Binary Encodings

Background context: Binary encodings can be more compact than textual formats like JSON, as they avoid including field names in the encoded data.

:p How does binary encoding differ from text-based formats in terms of space efficiency?
??x
Binary encoding is generally more compact because it doesn't include human-readable labels for each field. Instead, it uses tags and lengths to encode the field values directly.

For example:
- JSON: `{"name": "John", "age": 30}`
- Binary: Encoded bytes representing `"name"`, followed by `length(5)`, then `"John"`, then encoded bytes for `age` (e.g., `30`).

This reduces the overhead and increases efficiency, especially when dealing with large datasets.
x??

---

#### Tooling and Schema Evolution

Background context: Schemas allow tools to check compatibility between different versions of data. This is particularly useful in evolving systems where both backward and forward compatibility are essential.

:p How do schemas facilitate tooling for compatibility checks?
??x
Schemas provide a way to define the structure of data, which can be used by tools to validate that new data conforms to expected structures or that older data remains compatible with newer versions. This ensures consistency and reduces errors in evolving systems.

For example:
- Version 1 schema: `{"name": string, "age": int}`
- Version 2 schema: `{"name": string, "age": int, "address": string}`

Tools can compare these schemas to ensure that data from version 1 can be converted or validated against the new schema.
x??

---


#### Dataflow Through Databases
Background context: In a database, one process encodes data and writes it to the database, while another process decodes and reads from it. Backward compatibility is crucial because older versions of processes need to be able to read data written by newer versions. Forward compatibility might also be necessary in environments where multiple versions of applications or services access the same database.

:p How does backward compatibility ensure that future processes can decode old data?
??x
Backward compatibility ensures that a process running an older version of code can still decode and use data that was encoded by a newer version of the code. This is critical because old processes might continue to read from the database even after new versions are deployed.

For example, consider two versions of an application: Version 1 writes a record with fields `A` and `B`. Version 2 adds a new field `C`, so it writes records with all three fields. If older instances of Version 1 need to process data written by both Version 1 and Version 2, they must be able to read the data as if no field was added.

:p How does forward compatibility ensure that newer processes can decode old data?
??x
Forward compatibility ensures that a new version of code can read and handle data encoded by an older version. This is important in environments where different versions of applications or services coexist, reading from the same database. For instance, if Version 1 writes records with fields `A` and `B`, and Version 2 reads these records and needs to add a new field `C`, the schema should allow adding `C` without breaking compatibility.

:p How does a schema change in databases typically affect data encoding?
??x
Schema changes in databases can affect how data is encoded. For example, if you add a new column with a default value of null, existing rows might not have values for this new field. When the older version reads such a row, it should handle the null fields appropriately to maintain backward compatibility.

:p What are some challenges in maintaining forward and backward compatibility in databases?
??x
Challenges include ensuring that data written by newer versions can be read by older versions without loss of information or functionality. For example, adding a new field requires handling cases where the old version encounters this new field but doesn't know how to interpret it.

:p How does LinkedIn's Espresso database handle schema evolution?
??x
LinkedIn’s Espresso database uses Avro for storage and leverages Avro’s schema evolution rules. This allows it to maintain compatibility between different versions of code by preserving unknown fields during encoding and decoding processes, thus ensuring that old data can still be read even if new fields are added.

:p How does a relational database handle simple schema changes without rewriting existing data?
??x
Relational databases often support simple schema changes such as adding a new column with a null default value. When an old row is read, the database fills in nulls for any columns that were missing from the encoded data on disk. This approach ensures backward compatibility by not altering the original data structure but still allowing newer versions to extend it.

---
#### Example of Schema Evolution
Background context: When adding a new field to a schema, ensuring that existing records handle this new field correctly is crucial. Different encoding formats support various strategies for maintaining forward and backward compatibility.

:p How can unknown fields be preserved during encoding and decoding processes?
??x
Unknown fields can be preserved by using encoding formats that support schema evolution. For example, Avro allows adding new fields to the schema without breaking existing encodings. During decoding, older versions of code should handle nulls or default values for newly added fields.

:p Can you provide an example in pseudocode showing how unknown fields are handled during encoding and decoding?
??x
```pseudocode
// Pseudo-code for encoding a record with Avro
function encodeRecord(record) {
    if (schemaVersion >= 2) {
        // Encode all fields including the new field C
        record['A'] = 'valueA';
        record['B'] = 'valueB';
        record['C'] = 'defaultValueC'; // Default value for a new field
    } else {
        // Encode only A and B, C is omitted if schemaVersion < 2
        record['A'] = 'valueA';
        record['B'] = 'valueB';
    }
    return serializeRecord(record);
}

// Pseudo-code for decoding a record with Avro
function decodeRecord(encodedRecord) {
    decodedRecord = deserializeRecord(encodedRecord);
    if (schemaVersion >= 2 && 'C' in decodedRecord) {
        // Handle the new field C, possibly by doing nothing or using default values
    }
}
```
x??
The pseudocode demonstrates how encoding and decoding handle unknown fields. During encoding, a new field is added with a default value if the schema version supports it. During decoding, older versions check for the presence of such fields and can ignore them.

---
#### Data Persistence Across Time
Background context: Databases often store data that outlives application deployments. This means that old data remains in its original format even as new code is deployed.

:p How does data persistence across time affect schema changes?
??x
Data persistence across time affects schema changes because old data needs to remain readable and usable by newer versions of the application. For example, if a record schema changes from version 1 to version 2, older records should still be accessible without breaking compatibility.

:p Can you provide an example of how data might be handled during a rolling upgrade?
??x
During a rolling upgrade, some instances run the old code while others run new code. To maintain backward and forward compatibility:
- Old versions write in their known schema.
- New versions read from and write to both old and new schemas.

For instance:
```pseudocode
// Rolling Upgrade Example
for (instance in allInstances) {
    if (instance.isOldVersion) {
        // Use old code for reading and writing
        handleOldData();
    } else {
        // Use new code, possibly with schema changes
        handleNewData();
    }
}
```
x??
This pseudocode illustrates how a rolling upgrade can manage different versions of code by selectively using old or new logic based on the instance's version.

---


#### Schema Evolution
Schema evolution allows the database to appear as a single schema, despite containing records from various historical schema versions. This is particularly useful for maintaining backward compatibility and ensuring data consistency over time.

:p What is schema evolution?
??x
Schema evolution enables the storage of records in different schema versions within the same database while presenting them uniformly to users or applications.
x??

---
#### Archival Storage
Archival storage involves taking periodic snapshots of a database, often for backup or loading into a data warehouse. These snapshots are typically encoded using the latest schema and can be stored in formats like Avro object container files (O CF) or Parquet.

:p How does archival storage benefit from using snapshotting?
??x
Archival storage benefits from snapshotting because it allows creating consistent backups or copies of the database, encoded with the latest schema. This ensures that historical data is preserved and can be processed uniformly in downstream systems like data warehouses.
x??

---
#### Dataflow Through Services: REST and RPC
Dataflow through services involves communication between clients and servers over a network. Clients make requests to servers using APIs, which are exposed as services via protocols like HTTP (REST) or remote procedure calls (RPC). The server responds with data in formats suitable for client processing.

:p How do clients and servers communicate in REST?
??x
In REST (Representational State Transfer), clients send requests to servers using standardized protocols like HTTP. Common methods include GET, POST, PUT, DELETE, etc., which are used to retrieve, create, update, or delete data respectively.
x??

---
#### Service-Oriented Architecture (SOA) and Microservices
Service-oriented architecture decomposes large applications into smaller services based on functionality. These services can act as clients to each other, making requests for specific tasks or data. This approach is also known as microservices.

:p What is the key difference between SOA and microservices?
??x
The key difference lies in granularity: SOA typically refers to larger, more complex applications decomposed into distinct components, whereas microservices focus on decomposing an application into highly autonomous services that can be independently deployed.
x??

---
#### Column Compression Formats
Column compression formats like Parquet are useful for archival storage due to their efficient data layout and compression. These formats store data in a column-oriented manner, which is beneficial for analytical processing.

:p What benefits does using Parquet provide?
??x
Using Parquet provides several benefits such as efficient data locality, support for vectorized operations, and improved query performance by reducing the amount of data read from disk during analysis.
x??

---
#### Data Warehousing
Data warehousing involves extracting, transforming, and loading (ETL) data from operational databases into a centralized repository optimized for analytical queries. This process often uses snapshots or backups taken from production databases.

:p How does ETL play a role in data warehousing?
??x
ETL plays a crucial role by extracting data from various sources, transforming it to fit the warehouse schema, and loading it into the data warehouse. This ensures that data is prepared for analytics and business intelligence purposes.
x??

---


#### Services vs Databases
Services and databases both allow clients to submit and query data, but they differ significantly. Databases use arbitrary queries through languages like SQL (discussed in Chapter 2), while services expose a specific API that is determined by their business logic. This API restricts the inputs and outputs allowed, providing encapsulation.

:p How do services and databases differ in terms of client interaction?
??x
Services offer application-specific APIs with predetermined inputs and outputs based on the business logic. Databases allow more flexible queries using languages like SQL, which are not constrained by the service's internal workings.
x??

---

#### Web Services Overview
Web services use HTTP as the underlying protocol for communication between clients and servers. They can be used in various contexts including applications running on devices (mobile or web), within a single organization’s data center, or across different organizations.

:p What is a web service?
??x
A web service is a software system designed to support interoperable machine-to-machine interaction over a network using HTTP as the underlying protocol. It can be used in various scenarios such as client applications on devices making requests to services, inter-service communication within an organization, or data exchange between different organizations.
x??

---

#### Components of Web Services
Web services can involve three main types of interactions:
1. Client applications (e.g., native apps, JavaScript web apps) making HTTP requests to a service.
2. Interactions within the same organization’s infrastructure.
3. Interactions between services owned by different organizations.

:p What are the common contexts for using web services?
??x
Web services can be used in three main contexts:
1. Client applications on devices (like mobile or web apps) making HTTP requests to a service over the internet.
2. Services communicating with each other within the same organization, often located in the same data center.
3. Services from different organizations exchanging data via the internet, such as credit card processing systems or OAuth for shared access to user data.
x??

---

#### REST vs SOAP
There are two primary approaches to web services: REST and SOAP. They differ significantly philosophically:
- REST is a design philosophy that leverages HTTP principles.
- SOAP requires adherence to specific protocols.

:p What are the two main approaches to web services?
??x
The two main approaches to web services are REST (Representational State Transfer) and SOAP (Simple Object Access Protocol). REST emphasizes simplicity, using URLs for resource identification and HTTP features like cache control, authentication, and content negotiation. SOAP is a more formal approach with specific protocol requirements.
x??

---

#### REST Principles
REST uses the principles of HTTP to design web services. It focuses on simple data formats, URLs for resources, and leveraging HTTP features such as caching, authentication, and content negotiation.

:p What are some key principles of REST?
??x
Key principles of REST include:
- Using simple data formats (like JSON or XML).
- Identifying resources with URLs.
- Leveraging HTTP methods like GET, POST, PUT, DELETE for CRUD operations.
- Utilizing features such as caching, authentication, and content negotiation through HTTP headers.
```
public class Example {
    public static void main(String[] args) {
        // Example of a simple RESTful API call
        String url = "https://example.com/resource";
        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setRequestMethod("GET");
        int responseCode = conn.getResponseCode();
        if (responseCode == 200) {
            // Handle success
        }
    }
}
```
x??


#### REST vs SOAP
Background context explaining the differences between REST and SOAP. REST is gaining popularity for cross-organizational service integration, especially with microservices. SOAP is an XML-based protocol that uses a sprawling set of standards (WS-*). RESTful APIs typically involve simpler approaches.

:p What are some key differences between REST and SOAP?
??x
REST focuses on simplicity, using HTTP methods like GET, POST, PUT, DELETE for interactions. It relies heavily on stateless clients and servers, making it easier to scale. In contrast, SOAP is more complex, utilizing a wide array of standards and XML-based messaging.
SOAP uses WSDL for description and supports features like transactions and security out-of-the-box, while RESTful APIs use formats like JSON or XML but typically with less formal structure.

---
#### Web Services Description Language (WSDL)
Background on WSDL which describes SOAP web service APIs. Used to generate client code that can interact with remote services via method calls.
:p What is the purpose of WSDL in SOAP-based web services?
??x
The primary purpose of WSDL is to describe the structure and behavior of a web service, enabling automatic code generation for clients. It defines interfaces, messages, bindings, and ports required for interacting with the service.

Example of basic WSDL snippet:
```xml
<wsdl:definitions ...>
  <wsdl:service name="MyService">
    <wsdl:port name="MyPort" binding="tns:MyBinding">
      ...
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>
```
x??

---
#### Code Generation and Dynamically Typed Languages
Background on code generation in SOAP services vs RESTful APIs. SOAP is often used with statically typed languages, allowing for auto-generated client classes.
:p Why might SOAP be less favorable for dynamically typed programming languages?
??x
SOAP relies heavily on WSDL, which involves complex XML schemas that are not easy to read or manually construct. This makes integration more challenging in dynamically typed languages where developers prefer simpler and more flexible approaches.

In contrast, RESTful APIs often use lightweight formats like JSON, making them easier to integrate with dynamically typed languages without extensive code generation.
x??

---
#### OpenAPI (Swagger)
Background on OpenAPI as a format for describing RESTful APIs. It is used to produce documentation and allows generating client-side libraries or API clients.

:p What is the purpose of using OpenAPI in RESTful API development?
??x
OpenAPI, also known as Swagger, provides a structured way to define RESTful APIs. It helps in documenting and managing API specifications, making it easier for developers to understand and use the API.

Example of basic OpenAPI snippet:
```yaml
openapi: 3.0.1
info:
  title: Example API
  version: 1.0.0

paths:
  /items:
    get:
      summary: Returns a list of items.
      responses:
        '200':
          description: A successful response.

components:
  schemas:
    Item:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```
x??

---
#### Remote Procedure Calls (RPC)
Background on RPC models and their limitations. Examples of older technologies like EJB, RMI, DCOM, and CORBA are mentioned as RPC-based systems that have faced significant issues.

:p What is the fundamental issue with Remote Procedure Call (RPC) model?
??x
The core issue with the RPC model is its abstraction of network calls as if they were local procedure calls. This leads to several problems:
- **Predictability**: Local function calls are predictable and controlled, whereas network requests can fail due to network issues or remote system unavailability.
- **Error Handling**: Network failures are common but not under control of the client application, requiring retry mechanisms.

Example of RPC call in pseudocode:
```pseudocode
try {
    result = service.function(param)
} catch (NetworkException) {
    // Retry logic here
}
```
x??

---

