# SQL

## SQL Fundamentals

#### date selections with operation

:p Select timestamp and column add_1 which is timestamp + 1 second and another as 1 hour
??x
SELECT timestamp, timestamp + INTERVAL 1 SECOND AS add_1, timestamp + INTERVAL 1 HOUR AS add_1_hour
x??

## SQL Queries

#### Sample Join

:p Get the user id and connector from the users and connectors table, You have the connector guid
??x
SELECT c.user_id, u.timezone 
FROM connector AS c 
JOIN users AS u ON u.id = c.user_id 
WHERE c.guid = '196c878d-d63e-41cf-ba9a-0a9b5d74dc7c';
x??