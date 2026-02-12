# High-Quality Flashcards: 2B004-Data-Governance_processed (Part 8)


**Starting Chapter:** Scorecard. Prioritization. Profiling

---


#### Data Source Scorecard

Background context: The creation of a scorecard for data sources is essential for data pipeline builders to make informed decisions about how and where to use the data, as well as for what purpose. This involves assessing various aspects such as origin, accuracy, completeness, timeliness, administrative ownership, and who requested the data.

:p What are the key elements that should be included in a scorecard for data sources?
??x
Key elements include:
- Origin of the data (where it comes from)
- Accuracy of the data
- Completeness of the data
- Timeliness of the data
- Administrative owner of the data
- Who asked for the data

This information helps data pipeline builders to make informed decisions about the use and integration of different data sources.
x??

---

#### Prioritization of Data Sources

Background context: Prioritizing data sources is crucial because each source may have a different purpose, such as driving healthcare actions or creating graphics for heat maps. The prioritization should align with the business goals.

:p How does prioritization help in managing data sources?
??x
Prioritization helps by focusing resources on the most critical data sources first, ensuring that high-priority tasks are addressed before lower-priority ones. This approach is beneficial when there are limited resources and time constraints.

For example:
- Healthcare actions might require more accurate and timely data.
- Graphics for heat maps might need less stringent accuracy but must be timely.

By aligning with business goals, the organization can make strategic decisions on which data sources to invest in first.
x??

---

#### Lineage Tracking

Background context: Monitoring the lineage of data is important for backtracking the origin and repurposing the data. This helps in understanding how the data has been used over time and can be crucial for compliance and quality assurance.

:p Why is monitoring data lineage important?
??x
Monitoring data lineage is important because it provides a historical trail of the data, which is useful for:
- Backtracking the origin of the data.
- Repurposing the data for different business purposes.
- Ensuring compliance with regulations and standards.
- Understanding how the data has been transformed over time.

This helps in maintaining the integrity and quality of the data throughout its lifecycle.
x??

---

#### Annotation of Data Sources

Background context: Annotations are crucial to standardize the way "quality information" is attached to data sources. This can be as simple as indicating whether the data has been vetted or not, which can significantly impact how it is used.

:p How does annotation contribute to a better understanding of data quality?
??x
Annotation contributes by:
- Providing a standardized way to mark the trustworthiness and reliability of data.
- Allowing users to "vote" on or "star" data based on its quality through usage.
- Practicing fair data quality management, even if detailed scoring is not yet available.

For example, you can start with a default assumption that all data is untrusted until it is reviewed by a curator and then rated. This helps in maintaining transparency and fairness in the evaluation of data quality.
x??

---

#### Tribal Knowledge Issues

Background context: Reliance on tribal knowledge, where information is passed down informally within teams or departments, can be problematic when key personnel leave and there is no documented system for managing this knowledge.

:p Why is it problematic to rely solely on tribal knowledge in a growing organization?
??x
It is problematic because:
- Key personnel who possess critical knowledge may leave the organization.
- New employees may not have access to or understand the information.
- Lack of documentation can lead to inconsistencies and errors in data management practices.

For example, in a healthcare company with recent acquisitions, relying on tribal knowledge means that important metadata and data quality management were either nonexistent or underdeveloped, leading to significant challenges when integrating new data sources.
x??

---


#### Data Profiling
Data profiling involves generating a data profile that includes information about a range of data values, such as minimum and maximum values, cardinality, missing values, out-of-bounds values, and outliers. This process helps determine the legal values within the dataset and their meanings.

:p What is the primary goal of data profiling?
??x
The primary goal of data profiling is to generate a comprehensive understanding of the data characteristics, such as identifying valid value ranges, handling outliers, and determining missing or invalid data points. This information helps in making informed decisions about data quality and cleaning.
x??

---

#### Data Deduplication - Quantitative Systems
In quantitative systems, each record should be unique, but due to various issues like transmission errors, the same transaction can appear multiple times, leading to data redundancy.

:p How can you handle duplicate transactions that might occur due to transmission issues?
??x
To handle duplicate transactions due to transmission issues, you can use a unique identifier such as a transaction ID. By comparing these IDs, you can deduplicate records and ensure each transaction is counted only once.
x??

---

#### Data Deduplication - Support Cases in Ticketing Systems
Support cases in ticketing systems might have the same issue reported multiple times with different user input titles, making it challenging to resolve duplicates.

:p How would you approach deduplicating support cases based on similar issues?
??x
To deduplicate support cases, you can use natural language processing (NLP) techniques or keyword-based matching. For example, you might create a list of keywords that are commonly used in related issues and map them to a canonical form. This helps merge different user requests that refer to the same source issue.
x??

---

#### Deduplicating Names and Places
Names and addresses in datasets often need resolution due to variations like Dr., Mrs., or middle names, making it necessary to replace these with consistent identifiers.

:p How can you resolve name inconsistencies in a dataset?
??x
To resolve name inconsistencies, you can use normalization techniques where different variants of the same name are replaced with a canonical version. For example:
```java
public class NameResolver {
    public String normalizeName(String name) {
        // Define mappings for common variations
        Map<String, String> nameMap = new HashMap<>();
        nameMap.put("Dr.", "Doctor");
        nameMap.put("Mrs.", "Mrs.");
        
        // Normalize the input name
        if (nameMap.containsKey(name)) {
            return nameMap.get(name);
        } else {
            return name;
        }
    }
}
```
x??

---

#### Example of Deduplication in Bibliographies
Deduplicating author names can significantly simplify datasets by replacing different variants with a canonical version.

:p How does deduplication of author names in bibliographies work?
??x
Deduplication of author names in bibliographies works by identifying and mapping different name variations to a single, consistent identifier. For example, Robert Spence might be referenced as "Bob Spence" or "R. Spence." By normalizing these names, you can combine all records under one canonical version.

Example:
```java
public class AuthorDeduplicator {
    public String normalizeAuthorName(String name) {
        // Define mappings for common author name variations
        Map<String, String> authorMap = new HashMap<>();
        authorMap.put("Bob Spence", "Robert Spence");
        authorMap.put("R. Spence", "Robert Spence");
        
        if (authorMap.containsKey(name)) {
            return authorMap.get(name);
        } else {
            return name;
        }
    }
}
```
x??

---


#### Deduplicating Names and Locations

Background context: The process of deduplication involves identifying and removing duplicate or near-duplicate records from a dataset. For names, this can be challenging due to variations like "New York Stock Exchange" which could also be written as "11 Wall St," "Wall St. & Broad Street," etc.

If applicable, add code examples with explanations:
```java
public class NameDeduplication {
    private Set<String> canonicalNames = new HashSet<>();

    public void deduplicateNames(Set<String> names) {
        for (String name : names) {
            // Normalize the string by removing punctuation and converting to lowercase
            String normalizedName = normalizeName(name);
            if (!canonicalNames.contains(normalizedName)) {
                canonicalNames.add(normalizedName);
            }
        }
    }

    private String normalizeName(String name) {
        return name.replaceAll("[^a-zA-Z ]", "").toLowerCase();
    }
}
```

:p How can you deduplicate names to ensure consistency in a dataset?
??x
By normalizing the string representations of the names and checking if they exist in a canonical set. This involves removing punctuation, converting to lowercase, and then adding them to a set to avoid duplicates.
```java
public class NameDeduplication {
    private Set<String> canonicalNames = new HashSet<>();

    public void deduplicateNames(Set<String> names) {
        for (String name : names) {
            String normalizedName = normalizeName(name);
            if (!canonicalNames.contains(normalizedName)) {
                canonicalNames.add(normalizedName);
            }
        }
    }

    private String normalizeName(String name) {
        return name.replaceAll("[^a-zA-Z ]", "").toLowerCase();
    }
}
```
x??

---

#### Canonical Representation of Locations

Background context: Consistently representing locations can be challenging due to multiple ways the same place can be referred to. For example, "the New York Stock Exchange" and "11 Wall Street" are different place IDs but geocode to the same location.

:p How do you ensure that multiple representations of a location refer to the same physical address?
??x
By using APIs like Google Places API which returns unique place IDs for locations. These can then be combined with the Google Maps Geocoding API to get the actual location in time.
```java
public class LocationResolver {
    private PlacesApi placesApi;
    private GeocodingApi geocodingApi;

    public String resolveLocation(String address) {
        PlaceResult place = placesApi.findPlaceById(address);
        if (place != null) {
            return place.getPlaceId();
        } else {
            GeoPoint geoPoint = geocodingApi.geocode(address);
            if (geoPoint != null) {
                // Use the coordinates to find a place ID
                PlaceResult closestPlace = placesApi.findClosestPlace(geoPoint);
                return closestPlace.getPlaceId();
            }
        }
        return null;
    }
}
```
x??

---

#### Identifying and Handling Data Outliers

Background context: Data outliers are values that differ significantly from other values in the dataset. Identifying and handling these outliers is crucial to maintaining data quality.

:p How do you handle data outliers in a dataset?
??x
Identify outliers early by examining each field's expected range of values. For example, if your system only accepts natural numbers for house numbers, negative or fractional numbers should be treated as outliers and the entire record containing such an outlier might need to be deleted.

For example:
```java
public class DataCleaning {
    public void cleanOutliers(Map<String, Object> data) {
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            // Determine if the field should contain a natural number
            if ("houseNumber".equals(key)) {
                if (!(value instanceof Integer) || (Integer) value < 0) {
                    data.remove(key); // Delete the record with an outlier value
                }
            }
        }
    }
}
```
x??

---

#### Handling Extreme Values

Background context: Not all extreme values are outliers. For example, a perfect SAT score is possible, but unlikely given the typical range of scores.

:p How do you handle extreme values in data?
??x
Analyze the distribution of values and how they shape the curve (e.g., using histograms or other statistical methods). Extreme edges of a "bell" curve should be treated differently than distributions with multiple peak clusters. If an extreme value falls outside expected ranges, consider it suspicious and treat it accordingly.

For example:
```java
public class ValueHandling {
    public void handleExtremeValues(List<Integer> scores) {
        int maxScore = 1600;
        for (int score : scores) {
            if (score > maxScore) {
                System.out.println("Suspicious value detected: " + score);
                // Further investigation or removal of the record
            }
        }
    }
}
```
x??

---


#### Data Quality Overview
Data quality ensures that data is accurate, complete, and timely for a specific business use case. Different business tasks require different levels of these qualities.

:p What does "data quality" ensure?
??x
Data quality ensures that the data's accuracy, completeness, and timeliness are relevant to the business use case in mind.
x??

---

#### Importance of Data Quality
Data quality has real-life impacts. Poor data can lead to incorrect decisions and wasted resources.

:p How does poor data affect businesses?
??x
Poor data can result in incorrect decisions and inefficient processes, leading to financial losses and reputational damage.
x??

---

#### Techniques for Improving Data Quality
Several techniques exist to enhance data quality, including data cleaning, validation, normalization, and enrichment.

:p Name two techniques used to improve data quality.
??x
Two techniques used to improve data quality are data cleaning and validation. 
Data cleaning involves identifying and correcting or removing inaccurate records, while validation ensures that the data meets specific criteria before being stored in a database.
x??

---

#### Handling Data Quality Early
It's recommended to handle data quality issues early, as close to the source of the data as possible.

:p Why is it important to handle data quality early?
??x
Handling data quality early helps prevent errors from propagating through various processes and analytics workloads. It saves time and resources by addressing issues closer to their origin.
x??

---

#### Monitoring Data Products
Regularly monitoring the resultant products of your data sources ensures that they meet the current business needs.

:p What is the importance of monitoring data products?
??x
Monitoring data products is crucial because it helps maintain the accuracy, completeness, and timeliness of data. This process ensures that any changes or issues in the source data are identified early, preventing them from affecting downstream analytics.
x??

---

#### Revisiting Data Sources for New Tasks
When repurposing data for a different analytics workload, it's important to revisit the original sources to ensure they meet the new business task requirements.

:p Why should you revisit data sources when repurposing data?
??x
Revisiting data sources is essential because the same data may need to be adjusted or validated differently depending on its new use. This step helps ensure that the data quality remains high and relevant for the new analytics workload.
x??

---


#### Data Transformations
Data transformations are crucial steps in moving data between systems, often involving processes like extract-transform-load (ETL) or its modern variant, ELT. ETL involves extracting data from sources, transforming it into a desired format, and loading it into a target system. In contrast, ELT extracts the data first but loads it directly into the target system without extensive transformation, which is then handled within the data warehousing solution.

:p What are the main steps involved in data transformations (ETL or ELT)?
??x
The main steps involve extracting data from sources, transforming it to meet requirements, and loading it into a destination. ETL processes often include normalization and cleaning during the transformation phase, while ELT focuses on transformation within the target system after initial extraction.
```java
// Pseudocode for ETL process
public void performETL(String sourceSystem) {
    // Extract data from source system
    String extractedData = extractFrom(sourceSystem);
    
    // Validate and transform data
    String transformedData = validateAndTransform(extractedData);
    
    // Load transformed data into destination
    loadIntoDestination(transformedData);
}
```
x??

---

#### Data Validation During Extraction
Data validation is a critical step during the extraction process. It ensures that the retrieved values are as expected, verifying the completeness and accuracy of records against predefined criteria. This helps in maintaining the quality and reliability of data even before it undergoes further processing.

:p What is the purpose of performing data validation during the extraction phase?
??x
The purpose of performing data validation during the extraction phase is to ensure that the retrieved values match expected values, verifying completeness and accuracy. This step helps maintain data quality by identifying and correcting discrepancies early in the process.
```java
// Pseudocode for data validation
public boolean validateData(String extractedData) {
    // Check if records are complete and accurate
    return checkCompletenessAndAccuracy(extractedData);
}
```
x??

---

#### Data Lineage
Lineage, also known as provenance, is the recording of the path that data takes through various stages such as extraction, transformation, and loading. It provides a historical context for datasets, explaining their origins and transformations. This information helps in understanding why certain datasets exist and where they came from.

:p What does lineage record in the context of data transformations?
??x
Lineage records the path that data travels through different stages like extraction, transformation, and loading. It explains how datasets were created, transformed, imported, and used throughout their lifecycle, helping to answer questions about dataset origins and purposes.
```java
// Pseudocode for lineage recording
public void recordLineage(String source, String transformationDetails, String destination) {
    // Record the path data takes from extraction to loading
    log("Data extracted from: " + source);
    log("Transformed using: " + transformationDetails);
    log("Loaded into: " + destination);
}
```
x??

---

#### ETL vs. ELT
ETL and ELT are methods for moving and transforming data between systems. While ETL involves extracting data, transforming it, and then loading it, ELT extracts the data first and loads it directly into a target system without extensive transformation. The decision on which to use depends on the specific requirements and capabilities of the environment.

:p What is the difference between ETL and ELT in terms of data processing?
??x
ETL involves extracting data from sources, transforming it through validation and normalization, and then loading it into a destination system. In contrast, ELT extracts data first, loads it directly into the target system, and performs transformation within that system. The choice depends on whether extensive transformation is needed before loading or can be handled in the target environment.
```java
// Pseudocode for ETL vs. ELT decision
public void decideETLorELT(String requirement) {
    if (requirement.includes("heavy transformation")) {
        performETL();
    } else {
        performELT();
    }
}
```
x??

---

#### Importance of Context in Data Extraction
Maintaining the business context during data extraction is crucial because early normalization and cleaning processes may remove valuable information. It's important to consider what might be needed for future use cases when extracting data, as this can impact the trustworthiness and governance of the data.

:p Why is it important to keep the business context in mind during data extraction?
??x
It is essential to maintain the business context during data extraction because early normalization and cleaning processes can remove valuable information. Considering potential future needs when extracting data ensures that you do not inadvertently lose critical details, which could be necessary for new use cases. This helps maintain the trustworthiness and governance of the data.
```java
// Pseudocode for considering business context in data extraction
public void extractDataWithContext(String source) {
    // Extract data with awareness of future needs
    String extractedData = extractFrom(source, considerFutureNeeds());
    
    // Perform validation and transformation
    String validatedAndTransformedData = validateAndTransform(extractedData);
}
```
x??

---

#### Scorecard for Data Sources
A scorecard is a tool used to evaluate the information context of data sources. It describes what information is present and potentially lost during transformations, helping to ensure that necessary details are not discarded early in the process.

:p What is a scorecard and how does it help in data governance?
??x
A scorecard is a tool for evaluating the information context of data sources, describing what information is present and what might be lost during transformations. This helps in ensuring that critical details are not discarded too early, maintaining the integrity and usefulness of the data.
```java
// Pseudocode for creating a scorecard
public void createScorecard(String source) {
    // Evaluate information context of the source
    String evaluation = evaluateInformationContext(source);
    
    // Log or store the scorecard details
    log("Source: " + source + ", Evaluation: " + evaluation);
}
```
x??
---

