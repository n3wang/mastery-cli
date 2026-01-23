# Flashcards: Business-Law_-Text-and-Cases_processed (Part 59)

**Starting Chapter:** 39-4 Corporate Financing

---

#### Corporate Formation and Liability

Delta and Sackett were inadequately capitalized, transactions were not properly documented, funds were commingled, and corporate formalities were not observed. Maniscalco had consistently treated both companies as his alter ego.

:p What did the court find regarding the liability of Maniscalco?

??x
The court found that Maniscalco was personally liable for the actions of Delta and Sackett due to their inadequate capitalization, improper documentation of transactions, commingling of funds, and failure to observe corporate formalities. This indicates a lack of separation between personal and business affairs, leading to the conclusion that he treated both companies as his alter ego.

x??

---

#### Corporate Financing

The process of forming a corporation involves financing through the issuance and sale of securities, specifically stocks and bonds.

:p What are the two main types of securities corporations can issue for financing?

??x
Corporations can issue two main types of securities: stocks (equity) and bonds (debt).

- **Stocks** represent ownership in a corporation.
- **Bonds** evidence a borrowing of funds, representing a promise to repay debt.

x??

---

#### Bonds

Bonds are debt securities issued by corporations and governments as evidence of borrowed funds. They typically have a maturity date and fixed interest payments.

:p What are the key features of bonds?

??x
The key features of bonds include:

- **Maturity Date**: The date when the principal (face amount) is repaid to the bondholder.
- **Fixed-Dollar Interest Payments**: Usually paid semi-annually, making them fixed-income securities.
- **Lending Agreement**: Specifies various terms and conditions for the particular bond issue.

Example of a lending agreement feature:
```java
// Pseudocode example
public class Bond {
    private double principal;
    private double interestRate;
    private Date maturityDate;

    public void payInterest() {
        // Calculate semi-annual interest payment
        double interestPayment = (principal * interestRate) / 2;
        // Pay the interest to bondholder
    }

    public void repayPrincipal() {
        // Repay the principal amount on maturity date
    }
}
```

x??

---

#### Stocks

Issuing stocks is another way for corporations to obtain financing. Common stock and preferred stock are the two major types of equity securities.

:p What are the differences between common stock and preferred stock?

??x
The key differences between common stock and preferred stock include:

- **Common Stock**: 
  - True ownership interest in the corporation.
  - Provides control, earnings, and net assets.
  - One vote per share for electing board of directors.
  - No guaranteed dividend or return of principal.

- **Preferred Stock**:
  - Generally provides a higher claim on assets than common stock during liquidation.
  - Usually includes a fixed dividend rate.
  - Priority in receiving dividends before common shareholders.

Example code to illustrate voting rights and dividend distribution:

```java
// Pseudocode example
public class Share {
    private int type; // 0 for common, 1 for preferred
    private double amount;

    public void distributeDividend() {
        if (type == 0) { // Common Stock
            System.out.println("Common shareholders receive dividend: " + amount);
        } else if (type == 1) { // Preferred Stock
            System.out.println("Preferred shareholders receive dividend: " + (amount * 1.5));
        }
    }

    public void voteOnBoard() {
        if (type == 0) { // Common Stock
            System.out.println("Common shareholder votes on board of directors.");
        } else if (type == 1) { // Preferred Stock
            System.out.println("Preferred stockholders do not have voting rights.");
        }
    }
}
```

x??

---

---
#### Double Taxation Avoidance for Northwest Brands, Inc.
Corporations are typically subject to corporate-level taxes on their income, followed by individual shareholder taxes when dividends are distributed. This double taxation can be avoided through certain structures like S corporations or other tax-exempt entities.

In the case of Northwest Brands, it is a Minnesota corporation with one class of stock owned by twelve family members. To avoid double taxation, Northwest Brands could qualify as an S corporation (Subchapter S corporation) under IRS regulations. For an S corporation to be recognized, it must meet specific criteria and file for this status with the IRS.

:p Can Northwest Brands avoid corporate-level taxes?
??x
Northwest Brands can avoid corporate-level taxes by applying for Subchapter S corporation status, provided they meet all IRS requirements.
x??
---

---
#### Authority of Consumer Investments, Inc.
Corporate powers are defined in the articles of incorporation or bylaws. By default, corporations have limited authority unless specifically granted broader powers.

Consumer Investments, Inc., can grant their firm the authority to transact nearly any type of business by explicitly stating this in their articles of incorporation or by amending these documents post-incorporation with shareholder approval.

:p Can Consumer Investments, Inc. grant broad business authority?
??x
Yes, Consumer Investments, Inc. can grant broad business authority by including such provisions in their articles of incorporation or through subsequent amendments with shareholder approval.
x??
---

---
#### Preincorporation Contracts Liability

Before a corporation is formed, actions taken by the incorporators (persons forming the corporation) are generally personal and not on behalf of the corporation. Once the corporation is formed, it can be held liable for contracts entered into after its formation.

In the scenario with Cummings, Okawa, Taft, Peterson, Owens, and Babcock:
- **Contract with Owens:** Since the contract was signed before incorporation, both Peterson (acting as an incorporator) and potentially any co-conspirators are personally liable.
- **Contract with Babcock:** Once the corporation is formed and capitalization secured, it would be automatically liable for contracts entered into after its formation.

:p Who or what is liable for the contracts in this scenario?
??x
Peterson (acting as an incorporator) and potentially any co-conspirators are personally liable for the contract with Owens. The newly formed corporation will be automatically liable for the contract with Babcock.
x??
---

---
#### Ultra Vires Doctrine

The ultra vires doctrine states that a corporation can only engage in activities that fall within its stated business purpose as specified in the articles of incorporation or bylaws.

In the case involving Oya Paka and her actions:
- When Oya cosigned a loan on behalf of the corporation, she exceeded her authority because the corporation was formed for selling computer services. Cosigning a personal loan is outside the scope of the corporation's stated business purpose.
- The defense that Oya had exceeded her authority should hold, as cosigning a personal loan is not within the ultra vires powers of the corporation.

:p Did Oya exceed her corporate authority?
??x
Yes, Oya exceeded her corporate authority by cosigning a loan on behalf of the corporation, which was outside the scope of the corporation's stated business purpose.
x??
---

---
#### Piercing the Corporate Veil

The concept of piercing the corporate veil involves treating the corporation as if it were merely an alter ego of its shareholders. This can happen when:
- The corporation is a mere facade to avoid personal liability
- Shareholders have acted fraudulently or improperly in controlling the corporation
- There has been a failure to observe formalities required for maintaining corporate separateness

In the case with Smart Inventions, Inc., if the company had used corporate funds improperly or failed to maintain proper separation between its business and personal affairs, it could potentially face piercing of the corporate veil.

:p Can the court pierce the corporate veil in Smart Inventions?
??x
Yes, the court can pierce the corporate veil in Smart Inventions if it is proven that the company used corporate funds improperly or failed to maintain proper separation between its business and personal affairs.
x??
---

---
#### Piercing the Corporate Veil - Scott Snapp Case

Background context: In this case, Scott Snapp contracted with Castlebrook Builders, Inc., owned by Stephen Kappeler. The project cost more than estimated, and Snapp filed a suit against Castlebrook for breach of contract and fraud among other things. It was revealed that Castlebrook had issued no shares of stock and personal and corporate funds were commingled. Corporate meeting minutes looked identical, and there was no accounting provided for the Snapp project.

:p Are these sufficient grounds to pierce the corporate veil?
??x
Yes, these are sufficient grounds to pierce the corporate veil. The evidence presented suggests that Castlebrook Builders, Inc., engaged in actions indicative of a closely held company where personal and business affairs were not properly separated. This includes no issuance of shares, commingling of funds, identical meeting minutes, lack of financial records, double and triple billing, and inability to account for the funds received.

In this scenario, the court would likely find that there was an effort to use the corporate form as a facade to evade personal liability or improperly shift assets. The presence of these facts can support piercing the veil to hold Kappeler personally liable for the obligations incurred through the company.
x??

---
#### Piercing the Corporate Veil - Jennifer Hoffman Case

Background context: Jennifer Hoffman took her cell phone to R&K Trading, Inc., for repairs and later filed a lawsuit against R&K, Verizon Wireless, and others. She claimed that an employee of R&K, Keith Press, accessed private photos on her phone without authorization and disseminated them publicly. This led to emotional distress and other damages.

:p Can R&K be held liable for the torts of its employees?
??x
Yes, R&K can be held liable for the torts committed by its employee Keith Press. The principle of respondeat superior holds that an employer is responsible for the actions of their employees while they are performing job duties, unless the employee was acting outside the scope of employment.

In this case, since Keith Press was an employee of R&K and his actions were likely within the course and scope of his employment (repairing phones), R&K can be held liable for the torts committed by him. This includes negligence in hiring or supervising if it could be shown that R&K failed to take reasonable steps to prevent such behavior.

```java
public class Employee {
    private String name;
    private boolean isWithinScopeOfEmployment;

    public Employee(String name) {
        this.name = name;
    }

    public void performAction() {
        // Action performed by the employee
        if (isWithinScopeOfEmployment()) {
            // Action within scope of employment, R&K liable
        } else {
            // Action outside scope, individual liability
        }
    }

    private boolean isWithinScopeOfEmployment() {
        return this.isWithinScopeOfEmployment;
    }
}
```
x??

---
#### Piercing the Corporate Veil - 2406-12 Amsterdam Associates Case

Background context: In this case, 2406-12 Amsterdam Associates, LLC brought an action against Alianza Dominicana and Alianza, LLC to recover unpaid rent. The plaintiff alleged that Alianza Dominicana made promises to pay its rent while discreetly forming Alianza, LLC to avoid liability for it. According to the plaintiff, Alianza, LLC was 90% owned by Alianza Dominicana, had no employees, and existed solely to hold assets away from creditors.

:p Are there sufficient grounds to pierce the corporate veil of Alianza, LLC?
??x
Yes, there are sufficient grounds to pierce the corporate veil of Alianza, LLC. The allegations suggest that Alianza, LLC was formed in a manner intended to evade liability for the rent payments made by Alianza Dominicana. Specifically, the fact that Alianza, LLC is 90% owned by and serves no other function than to hold assets away from creditors raises concerns about the separation of corporate and personal interests.

For a court to pierce the veil, it must be shown that there was an intent to defraud or evade liability through the use of the corporation as a mere alter ego. The lack of employees and the singular purpose of holding assets make it clear that Alianza, LLC is being used as a sham entity. This aligns with common law principles which allow for piercing the corporate veil when there is evidence of fraudulent intent or improper conduct.

```java
public class Corporation {
    private String name;
    private double ownershipPercentage;
    private boolean hasEmployees;

    public Corporation(String name, double ownershipPercentage) {
        this.name = name;
        this.ownershipPercentage = ownershipPercentage;
        this.hasEmployees = false; // Typically set to true if employees exist
    }

    public void validatePiercing() {
        if (this.ownershipPercentage > 75 && !hasEmployees) { // Arbitrary threshold for piercing
            System.out.println("Veil can be pierced due to sham corporate structure.");
        } else {
            System.out.println("No clear evidence to pierce the veil.");
        }
    }
}
```
x??

---

---
#### Minimum Number of Directors
Historically, the minimum number of directors has been three, but many states today permit fewer. The incorporators can appoint the first board of directors through the articles of incorporation or by holding a meeting after incorporation to elect them and handle other necessary business such as adopting bylaws.

:p What is the minimum historical requirement for the number of directors in a corporation?
??x
Historically, the minimum number of directors required was three. However, many states today permit fewer directors.
x??

---
#### Appointment or Election of Initial Directors
If the incorporators do not appoint the initial board of directors through the articles of incorporation, they hold a meeting after incorporation to elect the directors and adopt bylaws. The initial board serves until the first annual shareholders’ meeting, after which subsequent directors are elected by a majority vote of the shareholders.

:p How can incorporators initially select the board of directors?
??x
Incorporators can appoint the initial board of directors through the articles of incorporation or hold a meeting to elect them and adopt bylaws after incorporation.
x??

---
#### Term Length for Directors
A director usually serves for one year, from annual meeting to annual meeting. However, state statutes permit longer terms and staggered terms, where typically one-third of the board members are elected each year for a three-year term.

:p What is the typical term length for directors in a corporation?
??x
Directors typically serve for one year, though states allow for longer terms and staggering elections to elect one-third of the board members every year.
x??

---
#### Removal of Directors
A director can be removed for cause, either as specified in the articles or bylaws or by shareholder action. The board may also remove a director with shareholder review. Generally, removal without cause is not allowed unless shareholders reserved that right at the time of election.

:p Under what circumstances can directors be removed from their position?
??x
Directors can be removed for failing to perform required duties, as specified in articles or bylaws, or through shareholder action. The board may also remove a director with shareholder approval.
x??

---
#### Vacancies on the Board
Vacancies occur when a director dies, resigns, or a new position is created through amendments to the articles or bylaws. In these situations, either the shareholders or the board itself can fill the vacant position based on state law or bylaw provisions.

:p How are vacancies on the board typically addressed?
??x
Vacancies on the board can be filled by either the shareholders or the board itself depending on state laws and bylaw provisions when a director dies, resigns, or a new position is created.
x??

---
#### Role of Directors and Officers
The board of directors is the ultimate authority in every corporation. They are responsible for all policy-making decisions necessary for corporate management, act as a body to carry out routine business, select and remove officers, determine capital structure, and declare dividends.

:p What are the primary responsibilities of the board of directors?
??x
The board of directors has several key responsibilities including making policy decisions, managing daily operations, selecting and removing officers, determining capital structure, and declaring dividends.
x??

---
#### Director Qualifications
Few qualifications are required for directors. Only a handful of states impose minimum age and residency requirements. Directors can be shareholders but this is not necessary unless the articles or bylaws require ownership interest.

:p What qualifications are typically required of directors?
??x
Typically, few qualifications are required for directors except that some states may have minimum age and residency requirements. Shareholding is not a necessity; it depends on the corporation's articles or bylaws.
x??

---

