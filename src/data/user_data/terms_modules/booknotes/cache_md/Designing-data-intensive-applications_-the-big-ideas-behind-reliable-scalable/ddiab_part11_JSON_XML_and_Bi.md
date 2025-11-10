# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 11)


**Starting Chapter:** JSON XML and Binary Variants

---


#### Evolvability: Making Change Easy
Background context explaining that applications change over time, requiring modifications to both features and data storage. The idea of building systems that facilitate easy adaptation is introduced as evolvability.

:p What does evolvability refer to in the context of software development?
??x
Evolvability refers to designing systems such that they can adapt easily to changes in requirements or business circumstances, without significant disruption.
x??

---


#### Schema Flexibility in Relational Databases vs. "Schemaless" Databases
Background context explaining how relational databases assume a single schema at any given time and require schema migrations for changes, while "schemaless" databases like document models can contain mixed data formats.

:p What are the differences between traditional relational databases and "schemaless" databases in terms of handling data schemas?
??x
In traditional relational databases, all stored data conforms to one schema, which can be changed through schema migrations (ALTER statements). By contrast, "schemaless" databases like document models do not enforce a schema, allowing them to contain mixed data formats written at different times.
x??

---


#### Rolling Upgrade and Server-Side Applications
Background context explaining the process of rolling upgrades where new versions are deployed gradually across multiple nodes.

:p What is a rolling upgrade in server-side applications?
??x
A rolling upgrade (also known as a staged rollout) involves deploying new application versions to a few nodes at a time, checking for smooth operation, and then progressively moving to other nodes. This approach minimizes service downtime.
x??

---


#### Backward Compatibility and Forward Compatibility
Background context explaining the need for both backward compatibility (new code reading old data) and forward compatibility (old code reading new data).

:p What are the definitions of backward compatibility and forward compatibility in the context of software evolution?
??x
Backward compatibility means newer versions can read data written by older versions. Forward compatibility ensures that older versions can read data written by newer versions.
x??

---


#### Schema Evolution in Avro
Background context explaining how Avro handles schema evolution, supporting both backward and forward compatibility.

:p How does Avro manage schema changes?
??x
Avro supports schema evolution through versioning. When writing a new schema, you can specify dependencies on older schemas. Reading code can ignore or handle the additional fields gracefully, ensuring both backward and forward compatibility.
x??

---


#### RESTful Services and Data Exchange Formats
Background context explaining how data is exchanged in web services using Representational State Transfer (REST) and remote procedure calls (RPC).

:p How do JSON and XML play a role in web service communication?
??x
JSON and XML are commonly used to exchange structured data between client and server in RESTful web services. They provide a standard way for representing and transmitting complex data structures over HTTP.
x??

---


#### Message-Passing Systems: Actors and Message Queues
Background context explaining the use of actors and message queues as communication mechanisms.

:p How do actors and message queues facilitate communication in distributed systems?
??x
Actors are programming entities that encapsulate state and behavior, communicating through messages. Message queues allow for asynchronous communication between actors, providing decoupling and flexibility in handling data exchange.
x??

---

---


#### Binary Encoding Formats

:p What are some reasons to consider binary encoding formats over text-based ones like JSON and XML?
??x
Binary encoding formats can offer advantages such as smaller file sizes, faster parsing times, and better performance in terms of CPU usage. However, they require more complex handling due to the need for precise byte-level control.

Code Example:
```java
// Pseudocode for binary encoding
public void encodePerson(Person person) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    DataOutputStream dos = new DataOutputStream(baos);
    
    try {
        dos.writeUTF(person.getName());
        dos.writeInt(person.getAge());
        dos.writeBoolean(person.isMarried());
    } catch (IOException e) {
        e.printStackTrace();
    }
    
    byte[] encodedData = baos.toByteArray();
}
```
x??

---


#### CSV Format
Background context that CSV is a popular language-independent format but has limitations.

:p What are some strengths of CSV?
??x
CSV's strength lies in its simplicity and wide compatibility across different programming languages. It is easy to read and write, making it useful for data interchange where no complex schema is needed.
x??

---


#### Optimizing Encoding

There are ways to achieve even better compression and efficiency that can reduce the record to just 32 bytes.

:p How can we further optimize the JSON record's binary representation?
??x
Further optimization techniques involve custom encodings or more advanced formats like Protocol Buffers, which allow for schema specification, thus avoiding including field names in the encoded data.
x??

---

---


#### Avro Schema Evolution
Avro supports schema evolution by distinguishing between the writer’s and reader’s schemas. This ensures that data can be correctly decoded even if there are changes in the schema over time.

:p How does Avro handle schema evolution during encoding and decoding?
??x
In Avro, applications use their own version of the schema to encode (writer’s schema) or decode (reader’s schema) data. If both schemas match exactly, the data can be decoded correctly. Any mismatch would lead to incorrect decoding.

Example:
```java
// Writer's Schema
record Person {
    string userName;
    union { null, long } favoriteNumber = null;
    array<string> interests;
}

// Reader's Schema (potentially different)
record Person {
    string userName;
    union { null, int } favoriteNumber = null; // Different from writer's schema
    array<string> interests;
}
```

If the `favoriteNumber` in the reader’s schema is an integer instead of a long, it will lead to incorrect decoding.
x??

---


#### Schema Compatibility in Avro

Avro is a data serialization system that allows for flexible schema evolution, meaning that writers and readers of data do not need to use exactly the same schema. The Avro library resolves differences between schemas when reading data by comparing the writer’s and reader’s schemas.

:p What does compatibility mean in the context of Avro?
??x
Compatibility in Avro refers to the ability to read and write data using different versions of a schema without errors. Specifically, it means that you can have a new version of the schema as the writer and an old version as the reader (forward compatibility), or vice versa (backward compatibility). This is achieved through predefined rules for adding, removing, or changing fields in schemas.
x??

---


#### Field Order Irrelevance

In Avro, when data is encoded, the order of fields in the schema does not matter. The Avro library resolves differences by matching fields based on their names.

:p How do field orders affect schema compatibility in Avro?
??x
Field order in schemas doesn't impact compatibility in Avro because the system matches fields by name rather than position. This means that if a reader encounters a field that is present in the writer's schema but not in its own, the field will be ignored. Conversely, if a reader expects a field that isn’t present in the writer’s schema, it will use a default value defined in the reader’s schema.

:p Can you provide an example of how Avro resolves differences in field order?
??x
Sure! Consider this scenario: 

```java
// Writer's schema
{
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"}
  ]
}

// Reader's schema
{
  "fields": [
    {"name": "name", "type": "string"},
    {"name": "id", "type": "int"}
  ]
}
```

When the reader encounters a record written by the writer, it will match the fields based on their names. If `name` exists in both schemas but is out of order, or if `id` is missing from the reader’s schema, these discrepancies are handled gracefully.

```java
// Example Java code for reading data
RecordReader reader = new RecordReader();
Record record = reader.readNextRecord(); // This will handle field name matching and default values.
```
x??

---


#### Schema Inference for Avro Data Encoding
Background context: When encoding data using Apache Avro, it is crucial to know how the writer's schema was used to encode a particular piece of data. However, embedding the entire schema with every record would be inefficient because schemas are typically larger than the records themselves.

:p How does Avro handle schema information when encoding large files containing millions of records?
??x
Avro addresses this issue by allowing the schema to be stored at the beginning of the file once, rather than with each individual record. This is particularly useful in contexts like Hadoop where there are numerous records encoded using a single schema.

For example:
```java
// Pseudocode for writing an Avro file
public class FileWriter {
    private Schema writerSchema;
    
    public void writeToFile(String filePath) throws IOException {
        // Define the writer's schema once
        writerSchema = new Schema.Parser().parse(new File("schema.avsc"));
        
        // Use the writer's schema to encode records in a large file
        DatumWriter<MyRecord> datumWriter = new SpecificDatumWriter<>(MyRecord.getSchema());
        Encoder encoder = EncoderFactory.get().binaryEncoder(new FileOutputStream(filePath), null);
        datumWriter.write(record, encoder);
        encoder.flush();
    }
}
```
x??

---


#### Schema Versioning for Databases with Avro
Background context: In databases where records are written at different times using potentially different schemas, it is essential to keep track of schema versions. This ensures that readers can understand the format of older records even if newer ones have a different structure.

:p How does Avro handle schema versioning in database scenarios?
??x
In such scenarios, Avro suggests including a version number at the beginning of each encoded record and maintaining a list of schema versions. A reader can then fetch the appropriate writer’s schema based on this version number to decode the record correctly.

Example:
```java
// Pseudocode for reading an Avro record with versioning
public class RecordReader {
    private SchemaRegistry schemaRegistry;
    
    public void readRecord(String filePath) throws IOException {
        // Fetch a record and its version number
        byte[] recordData = new FileInputStream(filePath).readAllBytes();
        int version = ByteOrder.getInstance().extractVersion(recordData);
        
        // Retrieve the appropriate writer's schema from the registry based on the version
        Schema writerSchema = schemaRegistry.getSchema(version);
        
        // Decode the record using the correct schema
        Decoder decoder = DecoderFactory.get().binaryDecoder(new ByteArrayInputStream(recordData), null);
        MyRecord record = new SpecificDatumReader<>(writerSchema).read(null, decoder);
    }
}
```
x??

---


#### Schema Negotiation for Network Communication
Background context: When two processes communicate over a network using Avro, they can negotiate the schema version on connection setup. This ensures that both parties are using compatible schemas during communication.

:p How does Avro handle schema negotiation in network scenarios?
??x
In network communications, the schemas can be negotiated at the start of a session. Once agreed upon, both processes use this schema throughout their interaction until they need to change it for some reason (e.g., updates or upgrades).

Example:
```java
// Pseudocode for Avro RPC schema negotiation
public class RpcClient {
    private Schema clientSchema;
    
    public void connectToServer() throws IOException {
        // Establish a connection and negotiate the schema version with the server
        Socket socket = new Socket("server.host", 12345);
        OutputStream out = socket.getOutputStream();
        
        // Send the desired schema version to the server
        byte[] versionData = ByteOrder.getInstance().packVersion(versionNumber);
        out.write(versionData);
        
        // Read the agreed schema from the server
        InputStream in = socket.getInputStream();
        byte[] agreedSchemaData = new DataInputStream(in).readFully();
        clientSchema = new Schema.Parser().parse(new ByteArrayInputStream(agreedSchemaData));
    }
}
```
x??

---


#### Dynamic Schemas and Avro
Background context: One of Avro's advantages is its ability to handle dynamically generated schemas without needing tag numbers. This makes it easier to adapt to changes in the data structure over time.

:p Why are tag numbers not necessary in Avro, and why is this beneficial?
??x
Tag numbers are not necessary in Avro because it relies on field names to identify record fields rather than numerical tags. This approach allows for more flexibility when schemas change dynamically, as new or removed fields can be accommodated by simply updating the schema.

Example:
```java
// Pseudocode for generating an Avro schema from a relational database schema
public class SchemaGenerator {
    public void generateSchemaFromDatabase() throws IOException {
        // Fetch the database schema
        DatabaseSchema dbSchema = fetchDatabaseSchema();
        
        // Convert each table into a record schema in Avro
        Schema writerSchema = new Schema.Parser().parse(generateAvroSchema(dbSchema));
    }
    
    private String generateAvroSchema(DatabaseSchema dbSchema) {
        StringBuilder sb = new StringBuilder("{\n");
        for (Table table : dbSchema.getTables()) {
            sb.append("  \"type\": \"record\",\n" +
                      "  \"name\": \"" + table.getName() + "\",\n" +
                      "  \"fields\": [\n");
            
            for (Column column : table.getColumns()) {
                sb.append("    {\n" +
                          "      \"name\": \"" + column.getName() + "\",\n" +
                          "      \"type\": \"" + column.getType() + "\"\n" +
                          "    },\n");
            }
            
            sb.delete(sb.length() - 2, sb.length());
            sb.append("\n  ]\n}\n");
        }
        
        return sb.toString();
    }
}
```
x??

---

---


#### Merits of Using Schemas

Background context: Using schemas in data formats like Protocol Buffers and Thrift provides several benefits, including better data compactness, improved documentation, and enhanced tooling support.

:p What are some advantages of using schemas for encoding data?
??x
Advantages of using schemas include:
- **Compactness**: Schemas can omit field names from encoded data, making it more compact.
- **Documentation**: The schema acts as valuable documentation that is required for decoding, ensuring its up-to-date status.
- **Compatibility Checks**: Keeping a database of schemas allows checking compatibility before deployment.
- **Type Checking**: For statically typed languages, code generation provides compile-time type checking and autocompletion support in IDEs.

These benefits provide better guarantees about the data and enhance development tools.
x??

---

---


#### Dataflow Through Databases
Data is stored and retrieved through databases, where one process encodes data into a database while another decodes it. This setup often requires both backward and forward compatibility to ensure that old processes can read new data and new processes can handle older formats correctly.

:p What are the two types of compatibility necessary in databases?
??x
Backward compatibility ensures that newer versions of a program can read data written by older versions, while forward compatibility ensures that older programs can read data written by newer versions. Both are crucial for maintaining system evolution without disrupting operations.
x??

---


#### Single vs Multiple Processes Accessing Databases
In some scenarios, a single process might write to the database and later read from it (future self). However, in other cases, multiple processes may simultaneously access a shared database.

:p How does the presence of multiple accessing processes affect data flow?
??x
With multiple processes accessing a database concurrently, backward and forward compatibility are critical. Newer code might update existing records with new fields or structures that older code versions do not understand. Ensuring these older versions can still function without losing functionality is essential.
x??

---


#### Handling Unknown Fields in Databases
When adding new fields to a schema, it's common for newer processes to write data containing unknown fields while older processes might read and update this data, potentially losing the newly added information.

:p How should an application handle unknown fields when writing to a database?
??x
Applications need to ensure that unknown fields are preserved during writes. This can be achieved by encoding formats that support schema evolution, such as Avro. If using model objects in code, developers must explicitly handle cases where new fields might not be recognized and take appropriate action (e.g., keeping the field intact).

```java
public class ExampleModel {
    String knownField;
    
    // Constructor, getters/setters, etc.
}

// Pseudocode for handling unknown fields
public void updateDatabaseRecord(ExampleModel model) {
    // Encode model to byte array with Avro or similar format that supports schema evolution
    byte[] encodedData = encodeWithAvro(model);
    
    // Write encodedData to database
}
```
x??

---


#### Data Lifespan and Code Changes
The context of data storage in databases implies that stored data can outlive the code that created it. This means that when a new version of an application is deployed, old versions might still access older data.

:p Why do databases often retain older data?
??x
Databases store historical data which may be accessed by different versions of applications over time. Retaining this data ensures that older processes can still function even if newer updates have been applied to the database schema or application logic.
x??

---


#### Schema Evolution in Databases
Schema changes, such as adding new columns, are common but need careful handling to avoid rewriting existing data. Relational databases and document-based systems like Avro provide mechanisms for managing these changes.

:p How do modern databases handle schema evolution?
??x
Modern database systems like relational databases (e.g., MySQL) allow simple schema changes without the need to rewrite all existing data. For example, adding a new column with a default value of null allows old rows to remain unaffected until explicitly updated by newer processes.
Document-based databases like LinkedIn’s Espresso use Avro for storage and support schema evolution rules that preserve unknown fields during updates.

```java
// Pseudocode for handling schema evolution in Avro
public void addNewFieldToRecord(ExampleModel model) {
    // Add new field to the model object's schema if necessary
    // Use Avro’s schema evolution rules to ensure backward compatibility
}
```
x??

---

---

