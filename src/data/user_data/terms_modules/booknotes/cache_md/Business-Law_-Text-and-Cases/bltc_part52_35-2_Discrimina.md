# Flashcards: Business-Law_-Text-and-Cases_processed (Part 52)

**Starting Chapter:** 35-2 Discrimination Based on Age

---

#### Same-Gender Harassment
Background context: In Oncale v. Sundowner Offshore Services, Inc., the U.S. Supreme Court held that Title VII protection extends to individuals who are sexually harassed by members of the same gender. Proving that such harassment is "based on sex" can be challenging.
:p What does the Oncale v. Sundowner Offshore Services case establish regarding Title VII protections?
??x
The Oncale v. Sundowner Offshore Services case established that Title VII protection extends to individuals who are sexually harassed by members of the same gender, effectively recognizing same-gender sexual harassment as a form of sex discrimination.
x??

---

#### Sexual-Orientation Harassment
Background context: Although Title VII does not explicitly prohibit discrimination or harassment based on a person's sexual orientation, some federal courts and states have recognized such protections. Many organizations also have voluntary policies to address this issue.
:p Can you explain the legal stance on sexual orientation in Title VII?
??x
While Title VII does not explicitly protect individuals from discrimination or harassment based on their sexual orientation, at least one federal court has ruled that sexual orientation is protected under Title VII. Additionally, many states and organizations have enacted policies to prohibit such discrimination.
x??

---

#### Online Harassment
Background context: Employees' online activities can contribute to a hostile work environment. This includes offensive comments or images shared via e-mail, text messages, blogs, or social media platforms.
:p How can employers mitigate liability for online harassment?
??x
Employers can avoid liability for online harassment by taking prompt remedial action. This could involve creating clear policies against such behavior and ensuring that employees are aware of the consequences if they violate these policies.
x??

---

#### Remedies under Title VII
Background context: If an employee successfully proves unlawful discrimination, they may be awarded reinstatement, back pay, retroactive promotions, and damages. However, there are limits to the amount of compensatory and punitive damages that can be recovered based on the size of the employer.
:p What types of damages are available under Title VII?
??x
Under Title VII, compensatory damages are only available in cases of intentional discrimination. Punitive damages may be recovered against private employers if they acted with malice or reckless indifference to an individual's rights. The total amount of damages is limited based on the size of the employer.
x??

---

#### Discrimination Based on Age
Background context: Age discrimination can affect anyone regardless of race, color, national origin, or gender. The Age Discrimination in Employment Act (ADEA) prohibits employment discrimination against individuals 40 years of age or older and also forbids mandatory retirement for non-managerial workers.
:p What does the ADEA protect against?
??x
The Age Discrimination in Employment Act (ADEA) protects employees aged 40 or older from employment discrimination based on age, including prohibitions against mandatory retirement for non-managerial workers.
x??

---

#### Employment Discrimination
Background context: The passage discusses various aspects of employment discrimination, particularly focusing on disability-related discrimination under the Americans with Disabilities Act (ADA). It explains that state employers are generally immune from private suits under certain acts like the Age Discrimination in Employment Act (ADEA), the Americans with Disabilities Act (ADA), and the Fair Labor Standards Act.

If applicable, add code examples with explanations.
:p What is the immunity status of state employers regarding discrimination lawsuits?
??x
State employers are generally immune from private suits brought by employees under the ADEA, ADA, and the Fair Labor Standards Act. This immunity is based on the Eleventh Amendment in the case of the ADA.

This immunity means that individuals cannot directly sue their state employers for violating these acts without going through administrative procedures first.
x??

---

#### The Americans with Disabilities Act (ADA)
Background context: The ADA prohibits disability-based discrimination in all workplaces with fifteen or more workers. It requires employers to reasonably accommodate the needs of persons with disabilities unless doing so would cause undue hardship.

If applicable, add code examples with explanations.
:p What is required under the ADA for employees with disabilities?
??x
Under the ADA, employers are required to "reasonably accommodate" the needs of individuals with disabilities unless such accommodations would result in an "undue hardship." This means that employers must make changes or adjustments to the workplace to support employees with disabilities.

For example:
```java
public class AccommodationRequest {
    public void requestAccommodation(Employee employee, Workplace workplace) {
        if (workplace.canProvideReasonableAccommodations(employee.getDisability())) {
            workplace.provideAccommodations(employee);
        } else {
            System.out.println("Undue hardship. No accommodations can be provided.");
        }
    }
}
```
x??

---

#### Procedures under the ADA
Background context: To prevail on a claim under the ADA, a plaintiff must show that they have a disability, are otherwise qualified for the employment in question, and were excluded from the employment solely because of the disability. The EEOC can pursue the case if an employee files a complaint.

If applicable, add code examples with explanations.
:p How does a plaintiff proceed to file a claim under the ADA?
??x
A plaintiff must first show that they have a disability, are otherwise qualified for the job, and were excluded from employment solely because of their disability. They must also pursue the claim through the Equal Employment Opportunity Commission (EEOC) before filing an action in court.

For instance:
```java
public class ADACompliance {
    public boolean canFileClaim(Employee employee, Workplace workplace) {
        if (employee.hasDisability() && 
            workplace.isQualified(employee) &&
            !workplace.isExcludedBecauseOfDisability(employee)) {
            return true;
        }
        return false;
    }
}
```
x??

---

#### What Is a Disability?
Background context: The ADA broadly defines disability to include physical or mental impairments that substantially limit major life activities. It covers various health conditions such as alcoholism, AIDS, blindness, cancer, and more.

If applicable, add code examples with explanations.
:p How is "disability" defined under the ADA?
??x
A disability under the ADA includes any of the following:
1. A physical or mental impairment that substantially limits one or more major life activities.
2. A record of having such an impairment.
3. Being regarded as having such an impairment.

For example, alcoholism, AIDS, blindness, cancer, and other conditions have been considered disabilities under federal law. Testing positive for HIV and morbid obesity also qualify as disabilities.
x??

---

#### Association with Disabled Persons
Background context: The ADA includes a provision that prevents employers from taking adverse employment actions based on stereotypes or assumptions about individuals who associate with people who have disabilities.

If applicable, add code examples with explanations.
:p What does the ADA's provision regarding association with disabled persons entail?
??x
The ADA prohibits employers from making adverse employment decisions based on stereotypes or assumptions about individuals associated with people who have disabilities. For example, an employer cannot discriminate against someone because they are perceived to be related to or associated with a person with a disability.

Example code:
```java
public class AssociationPolicy {
    public boolean canMakeEmploymentDecision(Employee employee) {
        if (employee.hasDisabilityAssociation()) {
            return true; // Decision can be made based on actual disability, not stereotypes
        }
        return false; // Stereotypes and assumptions about association are prohibited
    }
}
```
x??

---

---
#### ADA and Disability Discrimination
The Americans with Disabilities Act (ADA) protects individuals with disabilities from discrimination in employment. Under the ADA, an employer cannot make a disability-based distinction in its benefits unless it can justify such actions under the business necessity defense.

:p What does the ADA protect against?
??x
The ADA protects individuals with disabilities from discriminatory practices by employers, ensuring that they have equal opportunities for employment and access to health-care benefits.
x??

---
#### Drug Addiction as a Disability
Drug addiction is considered a disability under the ADA if it is a substantially limiting impairment. The ADA does not protect individuals who are currently using illegal drugs but protects those with former drug addictions who are participating in or have completed supervised rehabilitation programs.

:p How does the ADA view drug addiction?
??x
The ADA views drug addiction as a disability if it significantly limits one or more major life activities. However, the act only provides protection to individuals who have completed or are currently undergoing a supervised drug-rehabilitation program and not to those who are actively using illegal drugs.
x??

---
#### Alcoholism under the ADA
Alcoholism is also protected by the ADA. Employers cannot discriminate against employees suffering from alcoholism but can prohibit on-the-job alcohol use and require sobriety during work hours. Employers may terminate an alcoholic employee if they pose a substantial risk of harm that cannot be mitigated through reasonable accommodation.

:p How does the ADA handle cases of alcoholism in the workplace?
??x
The ADA protects employees with alcoholism from discrimination, including termination for using alcohol at work, unless it poses a substantial and unmitigable risk. Employers can require sobriety during work hours but must provide reasonable accommodations to reduce risks where possible.
x??

---
#### USERRA and Military Discrimination
The Uniformed Services Employment and Reemployment Rights Act (USERRA) prohibits discrimination against individuals who have served in the military, ensuring their right to sue for violations of these rights. This act applies to all employers—public or private—and covers termination only "for cause."

:p What does USERRA protect?
??x
USERRA protects military service members from employment discrimination and ensures their right to reemployment after serving. Employers are prohibited from terminating employees solely because they have served in the military, except for justifiable reasons.
x??

---
#### Prima Facie Case Under USERRA
To establish a prima facie case of discrimination under USERRA, an employee must show that the employer took adverse employment action based on their connection to military service. This can include membership, service, application for service, or providing statements about another’s service.

:p How does one prove a prima facie case of USERRA discrimination?
??x
To prove a prima facie case under USERRA, an employee must demonstrate that the employer took adverse employment action due to their military connection. This includes showing membership in the military, active service, application for service, or providing statements about another's service and comparing them favorably to those without such connections.
x??

---

---
#### Seniority Systems
Background context explaining seniority systems. A fair seniority system promotes or distributes job benefits based on years of service, ensuring that workers with more experience are given priority for promotions or job security.

If applicable, add code examples with explanations:
```java
public class Employee {
    private int yearsOfService;

    public Employee(int yearsOfService) {
        this.yearsOfService = yearsOfService;
    }

    public int getYearsOfService() {
        return yearsOfService;
    }
}

// Example of distributing promotions based on seniority
List<Employee> employees = Arrays.asList(
    new Employee(5),
    new Employee(10),
    new Employee(3)
);

employees.sort(Comparator.comparingInt(Employee::getYearsOfService).reversed());
for (Employee e : employees) {
    System.out.println(e.getYearsOfService());
}
```
:p How can a seniority system be used as a defense against discrimination claims?
??x
A seniority system can be used as a defense against discrimination claims if it is applied fairly and without bias. In the example given, Cathalene Johnson filed a lawsuit against Federal Express Corporation (FedEx) for discrimination based on race and gender, claiming unequal pay. FedEx argued that its seniority system was fair because the male employee had more years of service and thus was paid more.

The court ruled in favor of FedEx, stating that the seniority system provided a defense to Johnson's claims. This means that if an employer has a history of discrimination but promotes or distributes job benefits based on a fair seniority system, it can defend against such discrimination lawsuits.

```java
public class Employee {
    private int yearsOfService;
    private String raceGender;

    public Employee(int yearsOfService, String raceGender) {
        this.yearsOfService = yearsOfService;
        this.raceGender = raceGender;
    }

    // Getters and setters for yearsOfService and raceGender
}
```
x??
---

#### After-Acquired Evidence of Employee Misconduct
Background context explaining after-acquired evidence. This refers to information that an employer discovers after a lawsuit has been filed, which could have led to the termination of the employee had it been known earlier.

If applicable, add code examples with explanations:
```java
public class Employee {
    private String jobApplicationDetails;
}

// Example scenario where after-acquired evidence is used
Employee lucy = new Employee("Inconsistent information about education");
String[] discoveredMisrepresentations = {"Misleading degree details"};

if (Arrays.asList(lucy.getJobApplicationDetails()).containsAny(discoveredMisrepresentations)) {
    System.out.println("Lucy's misrepresentation can be used to limit damages.");
} else {
    System.out.println("Lucy's misrepresentation cannot shield the employer from liability for employment discrimination.");
}
```
:p How does after-acquired evidence affect an employer’s liability in employment discrimination cases?
??x
After-acquired evidence of employee misconduct cannot completely shield an employer from liability for employment discrimination. However, it can be used to limit the amount of damages for which the employer is liable.

In Example 35.21, Lucy was fired by Pratt Legal Services and subsequently sued the company for employment discrimination. During pretrial investigation, Pratt discovered that Lucy made material misrepresentations on her job application. If Pratt had known about these misrepresentations earlier, it could have had grounds to fire her. However, this evidence can only be used to limit the damages awarded in the lawsuit.

```java
public class Employer {
    public boolean useAfterAcquiredEvidence(Employee employee) {
        // Check if any after-acquired evidence is relevant
        return false; // Placeholder logic
    }
}
```
x??
---

#### Affirmative Action Programs
Background context explaining affirmative action. These programs aim to "make up" for past patterns of discrimination by providing preferential treatment in hiring or promotion.

If applicable, add code examples with explanations:
```java
public class Employee {
    private String raceGender;
}

// Example of implementing an affirmative action program
List<Employee> candidates = Arrays.asList(
    new Employee("Black Male"),
    new Employee("White Female"),
    new Employee("Asian Male")
);

employees.sort(Comparator.comparing(Employee::getRaceGender, new RaceGenderComparator()));
for (Employee e : employees) {
    System.out.println(e.getRaceGender());
}
```
:p What is the purpose of affirmative action programs?
??x
The purpose of affirmative action programs is to reduce or eliminate discriminatory practices by providing preferential treatment in hiring or promotion. These programs aim to correct past patterns of discrimination and ensure that members of protected classes, such as women and minorities, have equal opportunities.

During the 1960s, federal and state government agencies, private companies with federal contracts, and institutions receiving federal funding were required to implement affirmative action policies. However, most private companies and organizations have not been required to do so by Title VII of the Civil Rights Act, though many have implemented them voluntarily.

```java
public class AffirmativeAction {
    public void hireEmployees(List<Employee> candidates) {
        // Implement affirmative action logic here
    }
}
```
x??
---

#### Equal Protection Issues and Affirmative Action Programs
Background context explaining the equal protection clause of the Fourteenth Amendment. This clause prohibits discrimination by state or federal government entities.

If applicable, add code examples with explanations:
```java
public class Employee {
    private String raceGender;
}

// Example of an affirmative action program potentially violating equal protection
List<Employee> candidates = Arrays.asList(
    new Employee("White Male"),
    new Employee("African American Female")
);

candidates.sort(Comparator.comparing(Employee::getRaceGender, new RaceGenderComparator()));
for (Employee e : candidates) {
    System.out.println(e.getRaceGender());
}
```
:p How can affirmative action programs violate the equal protection clause of the Fourteenth Amendment?
??x
Affirmative action programs can violate the equal protection clause of the Fourteenth Amendment if they result in reverse discrimination against members of a majority group, such as white males. While these programs aim to provide equal opportunities for historically disadvantaged groups, they must not discriminate against individuals from non-protected classes.

For example, in Example 35.21, an affirmative action program that gives preferential treatment to African American women might inadvertently disadvantage white males who are part of the majority group.

```java
public class AffirmativeAction {
    public void promoteEmployees(List<Employee> employees) {
        // Implement logic here, ensuring not to violate equal protection
    }
}
```
x??
---

