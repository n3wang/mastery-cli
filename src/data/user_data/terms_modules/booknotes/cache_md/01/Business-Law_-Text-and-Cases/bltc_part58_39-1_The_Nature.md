# Flashcards: Business-Law_-Text-and-Cases_processed (Part 58)

**Starting Chapter:** 39-1 The Nature and Classification of Corporations

---

---
#### Nature and Classification of Corporations
Corporations are legal entities created by state law that can have one or more shareholders. They operate under a distinct name from their owners, allowing them to conduct business and incur liability independently.

:p What is a corporation?
??x
A corporation is a legal entity created by state law with the capacity to own assets, incur liabilities, and enter into contracts in its own name.
x??

---
#### Corporate Personnel
In a corporation, the board of directors, elected by shareholders, makes policy decisions and hires corporate officers and employees for day-to-day operations. Shareholders become owners when they purchase shares.

:p Who is responsible for overall management in a corporation?
??x
The responsibility for the overall management of a firm is entrusted to the board of directors.
x??

---
#### Limited Liability of Shareholders
Shareholders generally are not personally liable for corporate obligations beyond their investment amount. However, under certain circumstances, courts can pierce the corporate veil and impose personal liability on shareholders.

:p What does limited liability mean in the context of corporations?
??x
Limited liability means that shareholders are only responsible for the corporation’s debts to the extent they invested money or assets into it; their personal assets are generally protected.
x??

---
#### Corporation as a Legal Entity
A corporation is recognized under U.S. law as an artificial legal person, distinct from its owners. It enjoys many of the same rights and privileges as citizens.

:p How does a corporation differ legally from natural persons?
??x
Legally, a corporation can sue or be sued, enjoy constitutional protections such as due process, free speech, and protection against unreasonable searches, but it is not a natural person like an individual.
x??

---
#### Corporate Structure under U.S. Law
Corporations are recognized as legal entities by state law. They have distinct rights and privileges similar to those of citizens.

:p What distinguishes corporations from other types of business entities in the U.S.?
??x
Corporations, unlike partnerships or sole proprietorships, are separate legal entities with distinct rights and liabilities.
x??

---
#### Model Business Corporation Act (MBCA)
The MBCA is a codification of modern corporation law that has significantly influenced state statutes. The Revised Model Business Corporation Act (RMBCA) is the current version guiding most state statutes.

:p What role does the MBCA play in corporate law?
??x
The MBCA provides a standardized framework for corporate governance and operations, which many states adopt or modify to shape their corporation laws.
x??

---

---
#### Legal Environment Context
The provided text discusses a legal case where Drake, a foreign corporation, attempted to sue Polyflow in Pennsylvania for non-payment of goods delivered from out-of-state. The core issue revolves around whether Drake had obtained the necessary certificate of authority to do business and to file suit in Pennsylvania.
:p What is the primary legal issue discussed in this case?
??x
The primary legal issue is whether a foreign corporation, Drake, required a certificate of authority to conduct business and sue in Pennsylvania despite only having filed suit to collect a debt.
x??
---
#### Certificate of Authority Requirement
The text explains that if a foreign corporation conducts regular, systematic, and extensive business activities in Pennsylvania, it must obtain a certificate of authority. This is irrespective of whether the lawsuit concerns in-state or out-of-state conduct.
:p What conditions trigger the requirement for a certificate of authority according to this case?
??x
A foreign corporation requires a certificate of authority if its conduct in Pennsylvania is regular, systematic, and extensive, even if it primarily commenced suit in Pennsylvania to collect a debt.
x??
---
#### Out-of-State Conduct and Authority
The text clarifies that Drake's out-of-state business activities (shipments from California, Canada, and Holland) must be accounted for when determining whether the certificate of authority is needed. This highlights that the scope of business activity affects the necessity of a certificate.
:p How do out-of-state shipments factor into the need for a certificate of authority?
??x
Out-of-state shipments are considered part of the overall business activities in Pennsylvania, which can trigger the requirement for a certificate of authority if they are regular and extensive enough.
x??
---
#### Appellate Court Decision
The appellate court reversed the trial court's judgment due to Drake's failure to obtain a certificate of authority. This decision emphasizes the importance of compliance with state regulations before filing suit in Pennsylvania.
:p What was the outcome of the appellate court's review?
??x
The appellate court reversed the judgment, indicating that Drake needed a certificate of authority to sue Polyflow in Pennsylvania and failed to obtain one.
x??
---
#### Public vs. Private Corporations
The text provides definitions for public corporations (formed by governments with governmental purposes) and private corporations (formed for profit). It also differentiates these from publicly held corporations, which have shares traded on a stock market.
:p What distinguishes a public corporation from a privately held one in terms of ownership?
??x
A public corporation is typically formed by the government to serve political or governmental purposes and may include entities like cities, towns, federal organizations such as AMTRAK. A private corporation, however, is owned by private individuals for profit.
x??
---

---
#### S Corporation Overview
Background context: The passage discusses S corporations, which are a type of business structure that can avoid double taxation. A corporation qualifies as an S corporation if it meets certain requirements specified in Subchapter S of the Internal Revenue Code.

:p What is an S corporation and what benefits does it offer?
??x
An S corporation allows shareholders to avoid double taxation by having corporate income pass through to the individual shareholders, who then pay personal income tax on it. This avoids the imposition of income taxes at both the corporate and shareholder levels while retaining many of the advantages of a corporation, such as limited liability.

This treatment is particularly beneficial when corporations want to accumulate earnings for future business purposes without incurring additional corporate-level taxes.
??x
The benefits include avoiding double taxation, allowing shareholders to pay personal income tax on profits, and maintaining limited liability. The S election also allows shareholders to use their share of the corporation's losses to offset other income.

```java
// Example Code: Basic Structure of an S Corporation Election
public class SCorporation {
    private String name;
    private int numberOfShareholders;

    public SCorporation(String name, int numberOfShareholders) {
        this.name = name;
        this.numberOfShareholders = numberOfShareholders;
    }

    // Method to check if the corporation can maintain S status
    public boolean canMaintainSStatus() {
        return numberOfShareholders <= 100; // Example condition for one of the requirements
    }
}
```
x??

---
#### Important Requirements for S Corporation Status
Background context: The passage outlines several important requirements for a corporation to qualify as an S corporation, such as domestic status, limited number of shareholders, and specific types of shareholders.

:p What are some key requirements that a corporation must meet to be classified as an S corporation?
??x
A corporation can choose to operate as an S corporation if it meets the following important requirements:
1. The corporation must be a domestic corporation.
2. It must not be part of an affiliated group of corporations.
3. Shareholders must be individuals, estates, certain trusts, or tax-exempt organizations; partnerships and nonqualifying trusts cannot be shareholders, but corporations can under specific circumstances.
4. The corporation must have no more than 100 shareholders.
5. It must have only one class of stock, though not all shareholders need to have the same voting rights.

These requirements ensure that an S corporation maintains the appropriate tax status and benefits while avoiding potential issues with ownership structure and liability.
??x
For example, a domestic company seeking S corporation status would need to verify its shareholder count does not exceed 100 individuals or entities. Additionally, ensuring shareholders are not non-resident aliens is crucial.

```java
// Example Code: Checking S Corporation Requirements
public class SCorporationRequirements {
    private String name;
    private int numberOfShareholders;

    public SCorporationRequirements(String name, int numberOfShareholders) {
        this.name = name;
        this.numberOfShareholders = numberOfShareholders;
    }

    // Method to check if the corporation meets key requirements
    public boolean meetsSStatusRequirements() {
        return isDomestic() && !isAffiliatedGroup() && hasAcceptableShareholderCount();
    }

    private boolean isDomestic() {
        // Check domestic status logic here
        return true;
    }

    private boolean isAffiliatedGroup() {
        // Check affiliation with other corporations logic here
        return false;
    }

    private boolean hasAcceptableShareholderCount() {
        return numberOfShareholders <= 100; // Example condition for one of the requirements
    }
}
```
x??

---
#### Effects of S Election on Taxation
Background context: The passage explains how an S corporation is taxed differently than a regular corporation, passing corporate income through to shareholders and avoiding double taxation.

:p What are the key effects of an S election on corporate taxation?
??x
The key effect of an S election is that an S corporation avoids double taxation by having its corporate income pass through to the individual shareholders, who then pay personal income tax on it. This treatment enables the S corporation to avoid the imposition of income taxes at both the corporate and shareholder levels while retaining many of the advantages of a corporation.

Benefits include:
- Shareholders' tax brackets may be lower than the tax bracket that the corporation would have been in if the tax had been imposed at the corporate level.
- The resulting tax savings are particularly attractive when the corporation wants to accumulate earnings for future business purposes.
- If the corporation has losses, shareholders can use these losses to offset other income.

These benefits make S corporations an attractive option despite competition from newer limited liability business forms like LLCs and LPs.
??x
For example, if a shareholder's personal income tax rate is lower than the corporate income tax rate, passing through income can result in significant savings. Additionally, using accumulated losses to offset other income provides flexibility.

```java
// Example Code: S Corporation Tax Pass-Through
public class STaxation {
    private int corporationIncome;
    private int shareholderTaxBracket;

    public STaxation(int corporationIncome, int shareholderTaxBracket) {
        this.corporationIncome = corporationIncome;
        this.shareholderTaxBracket = shareholderTaxBracket;
    }

    // Method to calculate tax savings
    public int calculateTaxSavings() {
        return corporationIncome * (1 - shareholderTaxBracket / 100); // Simplified calculation for illustration
    }
}
```
x??

---
#### Professional Corporations Overview
Background context: The passage introduces professional corporations, which are business structures specifically for professionals such as physicians, lawyers, dentists, and accountants. These corporations offer similar tax advantages to S corporations but with some differences in liability.

:p What is a professional corporation, and how does it differ from an ordinary business corporation?
??x
A professional corporation is a business structure that allows professionals like physicians, lawyers, dentists, and accountants to incorporate their practices. Typically identified by the letters P.C., S.C., or P.A., these corporations offer similar tax advantages as S corporations but with some differences in liability.

Key differences include:
- Shareholders are held to a higher standard of conduct due to their professional nature.
- For liability purposes, some courts treat professional corporations somewhat like partnerships and hold each professional liable for malpractice committed within the scope of the business by others in the firm.
- A shareholder generally cannot be held liable for torts committed by other professionals at the firm except those related to malpractice or breach of duty to clients.

These differences reflect the specialized nature of professional practices while maintaining the benefits of limited liability and tax advantages associated with corporation structures.
??x
Professional corporations offer similar tax benefits but differ in how they handle professional liability. For example, a physician in a professional corporation can be held personally liable for malpractice committed by other physicians within the firm.

```java
// Example Code: Professional Corporation Liability Structure
public class ProfessionalCorporation {
    private String name;
    private int numberOfShareholders;

    public ProfessionalCorporation(String name, int numberOfShareholders) {
        this.name = name;
        this.numberOfShareholders = numberOfShareholders;
    }

    // Method to check liability structure
    public boolean hasProfessionalLiability() {
        return true; // Example condition for illustration
    }
}
```
x??

---

#### Simplified Corporate Formation Process
Today, corporate formation is much simpler and faster compared to two decades ago. Many states allow businesses to incorporate via the internet, making it easier for entrepreneurs to form a corporation without the need for extensive paperwork or formal meetings.

:p How has the process of forming a corporation changed over the past 20 years?
??x
The process has become significantly more streamlined and accessible due to advancements in technology. Previously, forming a corporation involved numerous steps and often required physical documents and in-person meetings. Today, entrepreneurs can incorporate their business online, reducing both time and cost.
x??

---

#### Personal Liability for Preincorporation Contracts
Even though many businesses now choose not to engage in preliminary promotional activities before incorporation, individuals involved in the process may still be personally liable for any preincorporation contracts made on behalf of the future corporation. This personal liability continues until the newly formed corporation assumes these obligations through a legal agreement known as novation.

:p What happens if an individual signs a contract before formally incorporating their business?
??x
The individual signing the contract remains personally liable for it, even after incorporation. The corporation must later assume this responsibility via a process called novation to transfer the liability from the individual to the company.
x??

---

#### Importance of Selecting the State of Incorporation
When choosing where to incorporate a business, individuals should consider factors such as tax benefits and legal provisions that favor corporate management. Delaware is often chosen for its historically less restrictive laws, while others might prefer their home state if they plan to conduct most business there.

:p Why do many businesses choose to incorporate in states like Delaware?
??x
Many businesses incorporate in states like Delaware because it offers advantageous tax provisions and favorable legal conditions that support corporate management. These factors can provide a competitive edge in certain industries.
x??

---

#### Securing an Appropriate Corporate Name
The chosen name of the corporation must be unique and not misleading to avoid conflicts with existing business names within the state. States typically require a search to ensure the selected name is available, and it must include specific terms like "Corporation," "Inc., " "Company," or "Limited" to indicate corporate status.

:p How does a state ensure that a chosen corporate name is unique?
??x
States conduct a search to confirm that the proposed corporate name is not already in use by another business within the state. Additionally, the selected name must include certain terms such as "Corporation," "Inc., " "Company," or "Limited" to clearly indicate its corporate status.
x??

---

#### Preparing Articles of Incorporation
The articles of incorporation are a crucial document required for formalizing the corporation's establishment. This document includes essential information about the business, such as the name, number and type of shares authorized, and other relevant details.

:p What is the primary document needed to formally establish a corporation?
??x
The primary document is the articles of incorporation. It serves as a foundational legal document outlining key aspects of the corporation, including its name, the number of shares it can issue, and other important information.
x??

---

#### Incorporation Procedures in Different States
Each state has unique procedures for incorporating a business, which are usually available on the secretary of state's website. Generally, these procedures involve selecting the state of incorporation based on favorable provisions, securing an appropriate corporate name, and preparing the articles of incorporation.

:p What common steps are typically followed when incorporating a business?
??x
Common steps include:
1. Selecting the state of incorporation.
2. Securing an appropriate corporate name through a search to ensure uniqueness.
3. Preparing the articles of incorporation with essential information about the corporation.
These steps help formalize the establishment of a business entity in compliance with state laws.
x??

---

#### De Jure Corporations
Background context: A corporation is said to have de jure (rightful and lawful) existence if it has substantially complied with all conditions precedent to incorporation. Under most states' laws, the secretary of state’s filing of articles of incorporation serves as conclusive proof that mandatory statutory provisions have been met.

If minor errors occur during incorporation, such as a typographical error in an address, courts typically find that a de jure corporation exists despite these defects.
:p What is a de jure corporation?
??x
A de jure corporation is one that has substantially complied with all conditions precedent to incorporation. In most states, the secretary of state’s filing of articles of incorporation serves as conclusive proof that mandatory statutory provisions have been met, even if there are minor errors in the process.

For example, if an incorporator mistakenly lists a wrong address on the articles of incorporation but otherwise follows all other required steps, this small error is usually overlooked, and the corporation will be considered de jure.
x??

---

#### De Facto Corporations
Background context: If substantial defects occur during the incorporation process, such as failing to hold an organizational meeting to adopt bylaws, courts may still recognize a corporation under certain conditions. This recognition is based on common law doctrines like de facto corporations.

In some states, including Mississippi, New York, Ohio, and Oklahoma, if all three requirements are met—existence of a state statute for incorporation, good faith attempt to comply with the statute, and already undertaking business as a corporation—the court will treat the entity as a legal corporation.
:p What is a de facto corporation?
??x
A de facto corporation is an entity that operates as a corporation despite substantial defects in its formation. This recognition is based on common law doctrines.

For example, if an incorporator fails to hold an organizational meeting but has otherwise substantially complied with the state’s incorporation statutes and has already begun conducting business as a corporation, courts may still recognize this entity as a de facto corporation under certain jurisdictions.
x??

---

#### Corporation by Estoppel
Background context: A business association can be treated as a corporation even if it has not properly incorporated. This treatment is granted when the association holds itself out to others as being a corporation and contracts with third parties in that capacity.

The estoppel doctrine often applies when an entity claims to be a corporation but has not filed articles of incorporation, or when a person acts as an agent for a non-existent corporation.
:p What is a corporation by estoppel?
??x
A corporation by estoppel occurs when a business association holds itself out to others as being a corporation and contracts with third parties in that capacity. Courts may prevent the association from denying corporate status in a lawsuit, especially if justice requires it.

For example, if a company enters into contracts claiming to be a corporation but has not properly incorporated, courts might treat this entity as a corporation for the purpose of determining rights and liabilities.
x??

---

#### Legal Implications
Background context: If there is a substantial defect in complying with incorporation statutes, the corporation does not legally exist. In such cases, incorporators may face personal liability.

This outcome can vary depending on jurisdiction—some states recognize de facto corporations under common law doctrines, while others interpret their state’s version of the RMBCA as abolishing this doctrine.
:p What happens if there is a substantial defect in incorporation?
??x
If there is a substantial defect in complying with incorporation statutes, the corporation does not legally exist. In such cases, incorporators may face personal liability.

For example, if an entity fails to hold organizational meetings and adopt bylaws but has otherwise substantially complied with other state requirements, courts in some states might still recognize it as a de facto corporation. However, in jurisdictions that interpret their RMBCA as abolishing the common law doctrine of de facto corporations, the lack of compliance would render the corporation illegitimate, leaving incorporators personally liable.
x??

---

#### Cloud Computing and Nationality of Data
Background context: The text discusses how cloud computing services store digital data, with major global players like Apple, Amazon, Google, and Microsoft having extensive server infrastructure worldwide. This raises questions about the legal jurisdiction over stored data when it is located in a foreign country.
:p What legal issue does the text highlight regarding the storage of digital data in the "cloud"?
??x
The text highlights the issue of whether the U.S. government can issue a warrant for data stored in a foreign cloud server, such as an Irish Microsoft or Google account.
x??

---
#### Microsoft and Federal Warrants
Background context: The case involves the U.S. government issuing warrants to access e-mails from Hotmail accounts hosted by Microsoft's cloud servers in Ireland. Microsoft refused to comply based on jurisdictional grounds and privacy concerns for U.S. citizens.
:p What was the legal dispute in the Microsoft case?
??x
The legal dispute centered around whether the U.S. government had the authority to issue a warrant for data stored outside the United States, specifically challenging if Microsoft’s Irish servers were subject to U.S. law.
x??

---
#### Google and Federal Warrants
Background context: In a similar case involving Google, the government issued warrants to access e-mails stored overseas. Google made similar arguments as Microsoft but faced a different outcome due to how it managed its cloud data differently from Microsoft.
:p How did Google's handling of cloud data differ from Microsoft’s in this context?
??x
Google separated its cloud data into components and frequently moved it around the globe for network efficiency, while Microsoft stored data exclusively in Ireland. This difference led to a different legal outcome when the government sought access through warrants.
x??

---
#### The CLOUD Act
Background context: In response to these disputes, Congress enacted the Clarifying Lawful Overseas Use of Data Act (CLOUD Act) in 2018. It amended existing law to mandate service providers to preserve, back up, or disclose data regardless of its location.
:p What is the main purpose of the CLOUD Act?
??x
The CLOUD Act aimed to clarify and standardize the legal authority for government access to digital communications and customer information stored outside the United States.
x??

---
#### Impact on Privacy of U.S. Citizens
Background context: With the passage of the CLOUD Act, the government was able to obtain warrants under its new authority, effectively resolving disputes like those in Microsoft and Google cases. The act now requires service providers to preserve data irrespective of location.
:p How might the CLOUD Act affect the privacy of U.S. citizens storing their information in cloud services?
??x
The CLOUD Act could potentially reduce the privacy protections for U.S. citizens' stored digital data, as governments may have greater access to this information without traditional limitations based on geographical storage locations.
x??

---

