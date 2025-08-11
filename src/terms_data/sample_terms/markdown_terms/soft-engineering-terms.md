# Software Engineering Terms

#### Business Logic Modules Overview
Business logic modules are independent code components that multiple business logic units use. Code reuse eases the maintenance of the business logic. Reuse eliminates code duplication and enables you to apply system-wide logic changes quickly and easily.
The system uses two of the metrics to describe the helpdesk performance:
Metric name:  Successful Ticket resolution on time.
Objective statement:  
No less than 99% of the tickets should be resolved within 4 hours.
Business logic: 
Resolution should be calculated from Open to Closed.

:p Create an example of a business logic.

??x ??

#### Tech bus terms I
:p Explain any of the following

??x (a) An enterprise application is an application that aims at automating or assisting an organizations inner processes. It can take many forms, but usually the characteris- tics of an enterprise software are  High business logic complexity  Long project lifespan  Moderate amounts of data  Low or moderate performance requirement
(b)  when a feature stops working as intended after a cer- tain event (usually, a code modification). The terms regression and software bug are synonyms and can be used interchangeably.
(c) To calculate the branch coverage metric, you need to sum up all possible branches in your code base and see how many of them are visited by tests.
(d)  a method in the SUT called by the test. The terms MUT and SUT are often used as synonyms, but normally, MUT refers to a method while SUT refers to the whole class -> NAME the class under test using variable sut
(e) A mock is a special kind of test double that allows you to examine interactions between the system under test and its collaborators.
(f) an overarching term that describes all kinds of non-production-ready, fake dependencies in a test
(g) System Under Test ??

#### Interpreted vs Compiled
:p Summarize Adv/Disadvantages using compiled vs Interpreted?

??x Java can be considered both a compiled and an interpreted language because its source code is first compiled into a binary byte-code. This byte-code runs on the Java Virtual Machine (JVM), which is usually a software-based interpreter.
Java is a statically typed and compiled language, and Python is a dynamically typed and interpreted language. This single difference makes Java faster at runtime and easier to debug, but Python is easier to use and easier to read. ??

#### Concurrent Computing
In concurrent computing, multiple calculations are made within overlapping time frames. It takes advantage of the concept that multiple threads or processes can make progress on a task without waiting for others to complete. This general approach to writing and executing computer programs is called concurrency.  Concurrent computing is different than synchronous (sequential) computing, where calculations are made one after the other, with each waiting for the previous to complete. It's not the same as parallel computing, where calculations are made simultaneously on separate processors.  The three main types of concurrent computing are threading, asynchrony, and preemptive multitasking. Each method has its own special precautions which must be taken to prevent race conditions, where multiple threads or processes access the same shared data in memory in improper order.

:p Whats the difference between different concurrent computing types?

??x yes ??

#### Create Dynamic Frame from Catalog
glue_Context is the , create_dynamic_frame: Creates a dynamic frame from, from_catalog: Creates a dynamic frame from a catalog table, from_options: Creates a dynamic frame from a data source using the specified options, from_jdbc_conf: Creates a dynamic frame from a JDBC connection using the specified options, from_jdbc_ddl_conf: Creates a dynamic frame from a JDBC connection using the specified options, from_jdbc_options: Creates a dynamic frame from a JDBC connection using the specified opti
printSchema: Prints the schema of the dynamic frame.

:p Create a dynamic frame from a catalog in Glue using table database being p_db, and table name is customers and then print it

??x dyf = glueContext.create_dynamic_frame.from_catalog(database='p_db', table_name='customers')
dyf.printSchema() ??

#### Pyspark | convert-display-df
toDF: Converts a dynamic frame to a data frame, display: Displays the content of a data frame

:p Convert a dynamic frame to a data frame and then display it

??x df = dyf.toDF()
display(df) ??

#### Pyspark | select_fields_and_show
select_fields: Selects the specified fields from the dynamic frame, show: Displays the content of a data frame

:p Select the fields first_name, email from the dynamic frame dyf and then show the first 5 rows

??x dyf.select_fields(['first_name', 'email']).show(5) ??

#### Pyspark | renaming-columns
rename_field: Renames a field in the dynamic frame

:p Rename the columns first_name to first and last_name to last

??x dyf = dyf.rename_field('first_name', 'first')
dyf = dyf.rename_field('last_name', 'last') ??

#### Pyspark | drop_columns
drop_fields: Drops the specified fields from the dynamic frame

:p Drop the columns first and last from dyf

??x dyf = dyf.drop_fields(['first', 'last']) ??

#### Pyspark | apply mapping
apply_mapping: Applies a mapping to the dynamic frame

:p Apply the mapping to the dynamic frame dyf where you convert fullname into name, both as string types

??x mapping = [('fullname', 'string', 'name', 'string')]
dyf = dyf.apply_mapping(mapping) ??

#### Pyspark | filter
filter: Filters the dynamic frame

:p Filter the dynamic frame dyf where the name is equal to John

??x dyf = dyf.filter(lambda x: x['name'] == 'John') ??

#### Pyspark | join
join: Joins the dynamic frame with another dynamic frame

:p Join the dynamic frame dyf with the dynamic frame dyf2 on the key name

??x dyf = dyf.join(dyf2, keys=['name']) ??

#### Pyspark | write dynamic frame
write_dynamic_frame: Writes a dynamic frame to a data source using the specified options

:p Write the dynamic frame dyf to a table in the database p_db with the table name customers

??x glueContext.write_dynamic_frame.from_options(frame = dyf, connection_type = "s3", connection_options = {"path": "s3://pyspark-dyf/"}, format = "parquet", transformation_ctx = "datasink4") ??

#### Pyspark | write dynamic frame to Spark Dataframe
toDF: Converts a dynamic frame to a data frame

:p Write the dynamic frame dyf to a Spark Dataframe

??x df = dyf.toDF() ??

#### Pyspark | Selct columns in Spark Dataframe
select: Selects a set of column expressions

:p Select the columns first_name and last_name from the Spark Dataframe df

??x df = df.select('first_name', 'last_name') ??

#### Pyspark | Columns in a Spark Dataframe
columns: Returns all column names as a list

:p Show the columns in the Spark Dataframe df

??x df.columns ??

#### Pyspark | Add a column to a Spark Dataframe
withColumn: Returns a new DataFrame by adding a column or replacing the existing column that has the same name

:p Add a column called full_name to the Spark Dataframe df

??x df = df.withColumn('full_name', concat(df.first_name, lit(' '), df.last_name)) ??

#### Pyspark | Drop a column from a Spark Dataframe
drop: Returns a new DataFrame omitting the specified column

:p Drop the column full_name from the Spark Dataframe df

??x df = df.drop('full_name') ??

#### Pyspark | Rename a column in a Spark Dataframe
withColumnRenamed: Returns a new DataFrame by renaming an existing column

:p Rename the column full_name to fullname in the Spark Dataframe df

??x df = df.withColumnRenamed('full_name', 'fullname') ??

#### Pyspark | Groupby in a Spark Dataframe
groupBy: Groups the DataFrame using the specified columns, so we can run aggregation on them

:p Group the Spark Dataframe df by the column first_name and show the count

??x df.groupBy('first_name').count().show() ??

#### Pyspark | Filter in a Spark Dataframe
filter: Filters rows using the given condition

:p Filter the Spark Dataframe df where the first_name is equal to John

??x df.filter(df.first_name == 'John').show() ??

#### Pyspark | Sort in a Spark Dataframe
sort: Returns a new DataFrame sorted by the specified column(s)

:p Sort the Spark Dataframe df by the column first_name

??x df.sort('first_name').show() ??

#### Pyspark | Join in a Spark Dataframe
join: Joins with another DataFrame, using the given join expression

:p Join the Spark Dataframe df with the Spark Dataframe df2 on the column first_name

??x df.join(df2, df.first_name == df2.first_name).show() ??

#### Pyspark | Sum
sum: Aggregate function: returns the sum of all values in the expression

:p Sum the column amount in the Spark Dataframe df

??x df.select(sum('amount')).show() ??

#### Pyspark | Create a Spark Session
SparkSession is the entry point to programming Spark with the Dataset and DataFrame API

:p Create a Spark Session

??x from pyspark.sql import SparkSession ??

#### Data Record
A data record is a unit of data stored in a Kinesis data stream. Each data record consists of a sequence number, a partition key, and a data blob.

:p What is a data record? Where can you find it?

??x A data record is a unit of data stored in a Kinesis data stream. Each data record consists of a sequence number, a partition key, and a data blob.
You can find it in the Kinesis console, in the Data tab of the stream. ??

#### Shard
A shard is a uniquely identified group of data records in a Kinesis data stream. Each shard is composed of a hash key range and an associated sequence number range.

:p What is a shard? Where can you find it?

??x A shard is a uniquely identified group of data records in a Kinesis data stream. Each shard is composed of a hash key range and an associated sequence number range.
You can find it in the Kinesis console, in the Data tab of the stream. ??

#### Shard Iterator
A shard iterator is a pointer to the data record in a shard from which to start reading data records sequentially. The position is specified by the sequence number of a data record in the shard.

:p What is a shard iterator? Where can you find it?

??x A shard iterator is a pointer to the data record in a shard from which to start reading data records sequentially. The position is specified by the sequence number of a data record in the shard.
You can find it in the Kinesis console, in the Data tab of the stream. ??

#### A Partition Key
A Partition key is used to group data by  shard within a stream. Kinesis Data Streams segregates the data records that belong to a data stream into multiple shards, using the partition key associated with each data record to determine which shard a given data record belongs to.

:p What is a partition key? Where can you find it?

??x A Partition key is used to group data by  shard within a stream. Kinesis Data Streams segregates the data records that belong to a data stream into multiple shards, using the partition key associated with each data record to determine which shard a given data record belongs to.
You can find it in the Kinesis console, in the Data tab of the stream. ??

#### Sequence Number
A sequence number is a unique identifier assigned to each data record in a Kinesis data stream. The sequence number is assigned by Kinesis when a data record is added to a stream, and is used to ensure that data records are processed in the correct order.

:p What is a sequence number in the context of data records? Where can you find it?

??x A sequence number is a unique identifier assigned to each data record in a Kinesis data stream. The sequence number is assigned by Kinesis when a data record is added to a stream, and is used to ensure that data records are processed in the correct order.
You can find it in the Kinesis console, in the Data tab of the stream. ??

#### Producer
A producer is an application that writes data records to a Kinesis data stream. The producer can be any application or service that can make API calls to Amazon Kinesis.

:p What is a producer in the context of Kinesis data streams? Where can you find it?

??x A producer is an application that writes data records to a Kinesis data stream. The producer can be any application or service that can make API calls to Amazon Kinesis.
You can find it in the documentation for the Kinesis API, or in the AWS Management Console when configuring Kinesis data stream permissions. ??

#### Consumer
A consumer is an application that reads data records from a Kinesis data stream. The consumer can be any application or service that can make API calls to Amazon Kinesis, and can process the data records in real time or in batches.

:p What is a consumer in the context of Kinesis data streams? Where can you find it?

??x A consumer is an application that reads data records from a Kinesis data stream. The consumer can be any application or service that can make API calls to Amazon Kinesis, and can process the data records in real time or in batches.
You can find it in the documentation for the Kinesis API, or in the AWS Management Console when configuring Kinesis data stream permissions. ??

#### graphql-advantage-vs-rest
:p Whats the advantage of GRAPHQL vs REST? and when would you use it?

??x Allows more flexibility for the front end, and can have now multiple front ends, and limitation of information we dont need as a response. No more thinking about endpoints, but now as a Schema
You might want when you know that your front end will change. ??

#### graphql-disadvantages-vs-rest
:p Whats the disadvantage of GRAPHQL vs REST? and when would you use it?

??x Security possible, since you dont want to return sensitive information. Also caching becomes more tricky.
Front end also has to be more specific on what it needs.
 GraphQL is not json! ??

#### disadvantages-soap
:p Whats the disadvantage of SOAP vs REST?

??x XML is more verbose than REST, uses more bandwidth, XML can have actions or linked entities that can be nasty ??

#### grcp-characteristics
:p Whats are the characteristics of GRPC?

??x Implements remote procedure calls, allows your code to call servers via compiled function calls, can compile for different languages but work similarly.
Used to exchange data in an uncrashable way but with high performance.
Favored in internal systems, since the interface is complicated. ??

#### Where should your write learning documentation?
Think on an accessible, quickly linkeable site, where speed remains constant as you add in more learning documentation

:p Where should your write learning documentation?

??x In Notion page, as automatically can be linked on github, also better for search ??

#### CASCADE
:p What does cascade deletion option do? When to use it?

??x When a row in the parent table is deleted, all associated rows in the child table are also deleted. It is useful when you want to ensure that child records are always deleted along with the parent record to maintain data integrity. ??

#### SET NULL
:p What does set null deletion option do? When to use it?

??x When a row in the parent table is deleted, the foreign key columns in the child table are set to NULL. It is useful when you want to remove the association between the parent and child records without deleting the child records themselves. ??

#### SET DEFAULT
:p What does set default deletion option do? When to use it?

??x When a row in the parent table is deleted, the foreign key columns in the child table are set to their default values defined in the table schema. It is useful when you want to provide default values for the foreign key columns instead of leaving them NULL. ??

#### RESTRICT
:p What does restrict deletion option do? When to use it?

??x Prevents deletion of a row in the parent table if there are associated rows in the child table. It enforces referential integrity and avoids orphaned child records. It is useful when you want to ensure that the parent record cannot be deleted as long as there are associated child records. ??

#### NO ACTION
:p What does no action deletion option do? When to use it?

??x Similar to RESTRICT, it prevents deletion of a row in the parent table if there are associated rows in the child table. However, it may depend on the database engine's default behavior for handling such cases. It is useful when you want to rely on the default behavior of the database engine for handling referential integrity. ??

#### SET DEFAULT/SET NULL with a default value
:p What does set default/set null with a default value deletion option do? When to use it?

??x In this approach, the foreign key columns are set to a specific default value defined in the table schema when a row in the parent table is deleted. It is useful when you want to maintain referential integrity and still have a valid foreign key value by setting a predefined default value for the foreign key columns. ??

#### Sprint Advantages
:p What are the advantages of sprints?

??x Changing requirements are a normal thing, but when they are changing on a daily basis and changing the requirements in the middle of a sprint then this is not an environment conducive to software being developed in any meaningful and qualitative way. In other words, TDD is the least of your problems here, they are more fundamental.

You mention sprints, meaning that you are performing some kind of Agile development, which is a good thing. Handling development in short quick sprints works well on projects for when priorities and requirements are volatile and could change in the middle of the project. The serious issue is that you have requirements drastically changing on your development and test teams in the middle of a sprint.

The sprint priorities should not change once the sprint has started. The sprint is supposed to be an agreement between the stakeholders and the development team that the following agreed upon features and user stories will be delivered and tested by a specific date. The stakeholders do not uphold their end of the agreement when they start changing their expectations for the sprint after development has begun.

So the stakeholders weren't being careful or thoughtful of what they were asking for, so they will change their expectations immediately. Do the developers then have the luxury of pushing the delivery date for the features? Often not. At best the stakeholders were being negligent or incompetent and the developers pay the price in overtime to meet the date anyway. Sometimes even the stakeholders do this purposely knowing that they can get more work out of their salaried developers.

What should honestly happen when the core requirements change to the point where the current work for the sprint would be useless is to immediately halt sprint development until a new sprint can be planned based on the new requirements. There is certainly no reason to continue on for the next week and a half developing software that the business has already told you that would not in anyway be useful to them at all.

What is happening really is that the business stakeholders are failing the development team by not maintaining or meeting the sprint commitment. They demonstrate either complete lack of competence in determining what they want in software or they have a complete lack of respect for the development team and how quality software is produced. ??

#### Sprints do and donts


Do:
    Make sure the team sets and understands the sprint goal and how success will be measured. This is the key to keeping everyone aligned and moving forward toward a common destination.
    Do ensure you have a well-groomed backlog with your priorities and dependencies in order. This can be a big challenge that could derail the process if it's not properly managed.
    Ensure you have a good understanding of velocity, and that it reflects things like leave and team meetings.
    Do use the sprint planning meeting to flesh out intimate details of the work that needs to get done. Encourage team members to sketch out tasks for all stories, bugs, and tasks that come into the sprint.
    Leave out work where you wont be able to get the dependencies done, like work from another team, designs, and legal sign-off.
    Finally, once a decision or plan is made, make sure someone captures that information in your project management or collaboration tool, like your Jira tickets. That way, both the decision and the rationale are easy for everyone to see later.
While youre working on being a scrum all-star with these "dos," watch out for a few red flags too:



Don't:
    Dont pull in too many stories, overestimate velocity, or pull in tasks that cant be completed in the sprint. You dont want to set yourself or your team up for failure.
    Dont forget about quality or technical debt. Make sure to budget time for QA and non-feature work, like bugs and engineering health.
    Dont let the team have a fuzzy view of what's in the sprint. Nail it down, and dont focus so much on moving fast that you forget to make sure everyones moving in the same direction.
    Also, dont take on a large amount of unknown or high-risk work. Break down stories that are large or have high uncertainty, and don't be afraid to leave some of that work for the next sprint.
    If you hear concerns from the team, whether its about velocity, low-certainty work, or work they think is bigger than what they estimated, dont ignore it. Address the issue, and recalibrate when necessary.

:p Think of your last sprint, what did you do well and what could you improve?

??x I could have determined not only the stories abut also the technical debt stories. 
Avoid adding highrisk work. ??