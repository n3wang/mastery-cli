---
tags:
  - software-engineer
---
jdbc:h2:~/springboot

### Building a Spring Boot Tutorial Crash Course

Youtube Tutorial: https://www.youtube.com/watch?v=QuvS_VLbGko

Official Repository: https://github.com/marcobehlerjetbrains/photoz-clone
My Repository: https://github.com/NeneWang/photoz-clone

What is Spring Frame˜work? An Unorthodox Guide: https://www.marcobehler.com/guides/spring-framework#_introduction

Where can you start a spring project? Which dependencies should you consider for Having a simple database and Spring?
?x
https://start.spring.io/index.html
> Make sure to set the project package name all with dots and no dashes
x
Dependencies:
- Spring Data JDBC
- Spring Boot
- H2 Database

Howto compile the mvn package and deploy?
?x
```
./mvn clean package
cd target
java -jar ./photoz-clone-0.0.1-SNAPSHOT.jar 
```


### Questions to research

- [ ] What others decorators are there for endpoints
- [ ] What other decorators are there for parameters?


#### Models Decorators

```java
  
@Table("PHOTOZ")  
public class Photo {  
  
    @Id  
    private Integer id;  
  
    @NotEmpty  
    private String fileName;  
  
    private String contentType;  
  
    @JsonIgnore  
    private byte[] data;
```





### Midstone Project

- A monolythic simple service on deployment using Spring Boot
- Develop a simple database where you can have and post screenshots from the clipboard. And store them on somewhere.
	- It should be deployed
	- It should send you the urls and you should be able to quickly save those.


Bonus points:
- 

### Capstone Project

