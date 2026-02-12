# Flashcards: Business-Law_-Text-and-Cases_processed (Part 36)

**Starting Chapter:** 25-1 Types of Negotiable Instruments

---

---
#### Demand Instruments
Background context: A demand instrument is payable on demand—that is, it is payable immediately after it is issued and for a reasonable period of time thereafter. This type of instrument provides immediate payment upon request.

:p What are examples of demand instruments?
??x
Demand instruments include checks, as they are defined to be payable on demand by their nature. Checks are delivered by the drawer (the person who writes the check) to give rights on the instrument to any person.
x??

---
#### Time Instruments
Background context: A time instrument is payable at a future date. This means that it specifies a certain time in the future when payment will be made.

:p What distinguishes a time instrument from a demand instrument?
??x
A time instrument differs from a demand instrument because it specifies a future date for payment, whereas a demand instrument can be paid immediately upon issuance.
x??

---
#### Drafts and Checks: Orders to Pay
Background context: A draft is an unconditional written order that involves three parties. The drawer (the party creating the draft) issues the order, the drawee (the person who promises to pay), and the payee (the person entitled to receive payment).

:p What are drafts?
??x
Drafts are negotiable instruments that are unconditional written orders. They involve three parties: the drawer, who creates the order; the drawee, who is responsible for paying at a specified or implied place; and the payee, who is entitled to receive the payment.
x??

---
#### Checks as Demand Instruments
Background context: All checks are demand instruments because they must be payable on demand. This means that when you write a check, it can be cashed immediately.

:p How do checks function?
??x
Checks function as immediate payment instruments. When a drawer writes a check, the payee (the person receiving the check) can present it for payment at any time, and the bank will honor the check based on the drawer's account balance.
x??

---
#### Notes: Promises to Pay
Background context: A note is a promise to pay that is payable at a future date. Unlike drafts, which are orders to pay, notes involve a promise to pay by one party (the maker) to another (the payee).

:p What characterizes a promissory note?
??x
A promissory note is characterized as a promise to pay an amount of money from one person (the maker or issuer) to another (the payee). It typically includes terms like the amount, due date, and sometimes interest.
x??

---
#### Types of Negotiable Instruments: Summary
Background context: The UCC specifies four types of negotiable instruments: drafts, checks, notes, and certificates of deposit (CDs). These are further divided into orders to pay (drafts and checks) and promises to pay (notes and CDs).

:p What are the main categories of negotiable instruments?
??x
The main categories of negotiable instruments are orders to pay (drafts and checks) and promises to pay (notes, which are sometimes called promissory notes, and certificates of deposit or CDs).
x??

---
#### Functionality of Negotiable Instruments
Background context: Negotiable instruments act as either a substitute for cash or an extension of credit. They can be easily transferred without the risk of becoming uncollectible.

:p How do negotiable instruments function?
??x
Negotiable instruments function by providing immediate payment (as substitutes for cash) or extending credit. For example, checks serve as cash substitutes, while promissory notes and CDs extend credit.
x??

---
#### Legal Framework: UCC 3-104
Background context: The Uniform Commercial Code (UCC) defines a negotiable instrument as an unconditional written order to pay that is payable on demand or at a specific future time. This framework provides the legal basis for transactions involving these instruments.

:p What does UCC 3-104 define?
??x
UCC 3-104(b) defines a negotiable instrument as an unconditional written order to pay an exact amount, either on demand or at a specific future time. This definition is fundamental in understanding the legal context of these instruments.
x??

---

#### Certificates of Deposit (CDs)
Background context: A certificate of deposit (CD) is a financial instrument that provides an interest-bearing account for the depositor. The bank issues this note when funds are deposited, promising to repay the principal amount along with interest on a specific date. CDs are time deposits, meaning they require a fixed term during which withdrawals may be restricted unless certain conditions are met.
:p What is a certificate of deposit?
??x
A certificate of deposit (CD) is a financial instrument issued by a bank when funds are deposited, promising to repay the principal amount along with interest on a specific date. It is essentially an interest-bearing time deposit.

---

#### Example 25.5
Background context: This example demonstrates how a CD works in practice. Sara Levin deposits $5,000 into First National Bank of Whiteacre, and the bank promises to repay the principal plus interest by August 15.
:p What is described in Example 25.5?
??x
Example 25.5 describes a scenario where Sara Levin deposits $5,000 with the First National Bank of Whiteacre. The bank agrees to return the funds along with 1.85 percent annual interest by August 15.
 
---

#### Requirements for Negotiability
Background context: For an instrument to be considered negotiable, it must meet specific criteria as outlined in UCC Article 3.
:p What are the requirements for a negotiable instrument?
??x
For a negotiable instrument, the following requirements must be met:
1. Be in writing.
2. Be signed by the maker or drawer.
3. Be an unconditional promise or order to pay.
4. State a fixed amount of money.
5. Be payable on demand or at a definite time.
6. Be payable to order or to bearer.

---

#### Written Form
Background context: The negotiable instrument must be written and portable, and may be evidenced by electronic records under certain conditions.
:p What does the written form requirement entail?
??x
The written form requirement for a negotiable instrument means that the document must be in writing on material suitable for permanence. It can also include electronic records under UCC 3-103(a)(6) and (9). For example, checks and notes have been written on unconventional materials like napkins or menus.
 
---

#### Example 25.6
Background context: This example illustrates that negotiable instruments can be written on non-traditional materials, as long as they are permanent and portable.
:p What is an example of a negotiable instrument on an unconventional material?
??x
Example 25.6 shows that checks and notes have been written on various unconventional materials such as napkins, menus, tablecloths, shirts, etc., and courts will generally enforce them.

---

#### Example 25.7
Background context: This example highlights the requirement for negotiable instruments to be movable.
:p What is required regarding portability of a negotiable instrument?
??x
Example 25.7 emphasizes that while not explicitly stated in the UCC, the negotiable instrument must be portable and movable, as it cannot meet the requirement of being freely transferable and serving as a substitute for cash if it is not.

---

#### Uniform Electronic Transactions Act (UETA)
Background context: The UETA allows electronic records to constitute negotiable instruments under certain circumstances.
:p What does the UETA allow in relation to negotiable instruments?
??x
The Uniform Electronic Transactions Act (UETA) permits an electronic record to be sufficient to constitute a negotiable instrument, as detailed in Section 16. A few states have also adopted amendments to Article 3 that explicitly authorize electronic negotiable instruments.

---

#### Exhibit 25–4
Background context: This exhibit shows an example of a small CD, highlighting the typical structure and content.
:p What is shown in Exhibit 25-4?
??x
Exhibit 25-4 demonstrates an example of a small certificate of deposit, showing its typical structure and content.

---

#### Example Code for Negotiable Instruments
Background context: While not directly related to CDs, this example illustrates how negotiable instruments can be handled programmatically.
:p How might one represent a negotiable instrument in code?
??x
While no specific code is provided in the text, one could represent a negotiable instrument like a CD in Java as follows:

```java
public class CertificateOfDeposit {
    private String payee;
    private double principalAmount;
    private double interestRate;
    private LocalDate maturityDate;

    public CertificateOfDeposit(String payee, double principalAmount, double interestRate, LocalDate maturityDate) {
        this.payee = payee;
        this.principalAmount = principalAmount;
        this.interestRate = interestRate;
        this.maturityDate = maturityDate;
    }

    // Getters and setters

    public void calculateInterest() {
        double interest = principalAmount * (interestRate / 100);
        System.out.println("Interest: " + interest);
    }
}
```
This class represents a CD with attributes for payee, principal amount, interest rate, and maturity date. The `calculateInterest` method demonstrates how to compute the interest based on these parameters.

---

---
#### Unconditional Promises and Negotiability (UCC 3-104(a))
Background context: According to the Uniform Commercial Code, only unconditional promises or orders can be negotiable. A promise or order is considered conditional if it includes any of the following conditions: an express condition to payment, being subject to another writing, or having its rights and obligations stated in another writing.

:p What constitutes a non-negotiable instrument according to UCC 3-104(a)?
??x
A promise or order is not negotiable if:
1. It includes an express condition to payment.
2. It states that the promise or order is subject to or governed by another writing.
3. The rights or obligations with respect to the promise or order are stated in another writing.

These conditions make the instrument dependent on external factors, which undermines its ability to be transferred freely without additional documentation or actions. 
x??
---
#### Conditional Promises and Negotiability (UCC 3-104(a) Example)
Background context: The example provided discusses a situation where two individuals, Sam and Odalis Groome, entered into contracts with Alpacas of America, LLC (AOA), to buy alpacas. They signed notes that referred to the contracts but ultimately were ruled negotiable by an appellate court.

:p How did the Groomes' notes fare in terms of negotiability?
??x
The Groomes' notes were found to be unconditional promises to pay and therefore were deemed negotiable despite referencing other writings (contracts).

This decision was based on the fact that the references to contracts did not render the notes conditional, as they merely referenced existing agreements without making them a condition for payment.
x??
---
#### Conditional Promises Based on Future Events
Background context: If a payment is contingent upon future events or if it refers to non-existent funds, the instrument will be non-negotiable. This is because such conditions introduce uncertainty and make the promise dependent on external factors.

:p How would you classify a note that promises payment from a fund yet to exist?
??x
A note promising payment from a trust account established in the future (such as when proceeds are received) is considered conditional and non-negotiable. The conditionality arises because the fund does not currently exist, making it uncertain whether or not the promise can be fulfilled.

For example:
```java
// Pseudocode for conditional payment
public class PaymentPromise {
    private Account trustAccount;

    public void establishTrustAccount() {
        // Code to set up a trust account with expected funds
    }

    public boolean canPay() {
        if (trustAccount == null) return false;
        else return true; 
    }
}
```
x??
---
#### Integrated Writings and Negotiability
Background context: The example involving OneWest Bank, FSB discusses the negotiability of a note that includes references to a mortgage. The defendants argued that this reference made the note non-negotiable.

:p How did the court rule regarding the integration clause in the promissory note?
??x
The court ruled that the promissory note was still considered negotiable even though it referenced and incorporated provisions from a mortgage. This is because the standard language used in such notes does not inherently destroy their negotiability as long as the core promise to pay remains unconditional.

For instance, Section 11 of the promissory note stated:
```java
// Pseudocode for note reference clause
public class PromissoryNote {
    private Mortgage mortgage;

    public void includeMortgageProvisions() {
        // Code to ensure that the note incorporates standard mortgage protections
    }

    public boolean isNegotiable() {
        return true; 
    }
}
```
x??
---

---
#### Fixed Amount Payable in Money
Background context: Under UCC 3–104(a), a negotiable instrument must state a fixed amount payable in money. The UCC defines "money" as a medium of exchange authorized or adopted by a domestic or foreign government as part of its currency. Gold is not considered a medium of exchange adopted by the U.S. government, making notes payable in gold nonnegotiable.

:p What conditions must be met for an amount to be stated as fixed and payable in money under UCC 3–104(a)?
??x
For an amount to be stated as fixed and payable in money under UCC 3–104(a), the instrument must specify a certain, unchanging sum that can be paid using a medium of exchange authorized by the government. Gold is not considered such a medium.

```java
// Example code for checking if an instrument is payable in money
public boolean isNegotiable(String currency) {
    // Assume "USD" (United States Dollar) is a valid, negotiable currency
    return currency.equalsIgnoreCase("USD");
}
```
x??

---
#### Variable or Nonnegotiable Instruments
Background context: Instruments that do not state a fixed amount on their face are considered nonnegotiable. Examples include those tied to variable rates of interest which fluctuate based on market conditions.

:p Can an instrument be negotiable if it does not specify a fixed amount?
??x
No, an instrument must specify a fixed amount on its face to be negotiable under UCC 3–104(a). If the amount is variable or not specified, it cannot be negotiated and may affect legal actions such as statute of limitations.

```java
// Example code for checking if an instrument has a fixed amount
public boolean hasFixedAmount(String description) {
    // Assume "One Hundred Twenty-Five Thousand 00/100 Dollars ($125,000.00)" is fixed
    return description.contains("$");
}
```
x??

---
#### Payable on Demand or at a Definite Time
Background context: A negotiable instrument must be payable either on demand (payable at sight or upon presentment) or at a definite time as specified by the issuer. This requirement helps determine the value of the instrument and when obligations arise.

:p How does the "Payable on Demand" feature affect an instrument's value?
??x
The "Payable on Demand" feature affects an instrument’s value because it specifies that the maker, drawee, or acceptor is required to pay at a specific time. This helps in calculating the exact interval during which interest accrues and when obligations of secondary parties such as indorsers arise.

```java
// Example code for determining if an instrument is payable on demand
public boolean isPayableOnDemand(String paymentTerms) {
    // Assume "Payable upon presentment" indicates it's payable on demand
    return paymentTerms.contains("upon presentment");
}
```
x??

---
#### Statute of Limitations and Negociability
Background context: The negotiability of an instrument affects the statute of limitations for filing legal actions. Nonnegotiable instruments, such as those with variable rates or no fixed amount, may have different statutes of limitations compared to negotiable ones.

:p How does the negotiability of a promissory note affect its statute of limitations?
??x
The negotiability of a promissory note affects its statute of limitations. For example, if an instrument is not negotiable because it lacks a fixed amount (such as variable interest rates), then UCC Article 3's six-year statute of limitations does not apply. Instead, the claim may be treated as a breach-of-contract claim, which typically has a four-year statute of limitations.

```java
// Example code for determining applicable statute of limitations based on negotiability
public int getStatuteOfLimitations(String noteDescription) {
    if (noteDescription.contains("variable rate")) {
        return 4; // Four-year limitation period for breach-of-contract claims
    } else {
        return 6; // Six-year limitation period for negotiable instruments
    }
}
```
x??

---

#### Maker or Drawer Agrees to Pay
Background context explaining that when an instrument is drawn, the maker or drawer agrees to pay either the person specified on the instrument or whomever that person might designate. This retains the transferability of the instrument.

:p What does it mean when an instrument states "Payable to the order of James Yung" or "Pay to James Yung or order"?
??x
When an instrument is drawn in such a manner, the maker or drawer has indicated that payment will be made either directly to Yung or to anyone designated by Yung. This makes the instrument negotiable and transferable.
x??

---
#### Indorsement Requirement for Order Instruments
Background context explaining that with order instruments, the payee must be identified with certainty because the transfer of such an instrument requires indorsement or signature.

:p How does the indorsement process work for order instruments?
??x
Indorsement is a signature placed on an instrument (such as on the back of a check) for the purpose of transferring one’s ownership rights in the instrument. For example, if Yung has designated someone else to receive payment from the instrument, that person must sign it over to the new recipient.
x??

---
#### Bearer Instruments
Background context explaining that a bearer instrument does not designate a specific payee and is payable to anyone who presents the instrument for payment.

:p What makes an instrument a bearer instrument?
??x
An instrument is a bearer instrument if it states "Payable to the order of bearer," or any variation thereof, indicating that the maker or drawer agrees to pay anyone presenting the instrument. For example, terms like "Payable to the order of cash" or "Payable to Simon Reed or bearer" make the instrument negotiable as a bearer instrument.
x??

---
#### Case in Point: Amine Nehme
Background context explaining how this case involves a gambling marker that was treated as a negotiable instrument under UCC definitions.

:p How did the court rule in the case of Amine Nehme?
??x
The court ruled that the gambling marker granted to Amine Nehme by the Venetian Resort Hotel Casino was a negotiable instrument because it met the UCC's criteria for payment on demand and unconditional. The court held that the marker could be enforced as a means of payment from Bank of America to the order of the Venetian.
x??

---
#### Negatability Factors
Background context explaining that certain ambiguities or omissions do not affect the negotiability of an instrument.

:p What factors do not affect the negotiability of an instrument?
??x
Ambiguities or omissions in the language of the instrument will not affect its negotiability. For example, an instrument that indicates it is not payable to an identified person can still be a bearer instrument if the payee is not clearly specified.
x??

---
#### Nonexistent Person or Organization
Background context explaining that an instrument cannot be payable to a nonexistent organization.

:p How does the UCC handle instruments payable to nonexistent persons or organizations?
??x
The UCC does not accept instruments issued to nonexistent individuals or organizations as payable to bearer. For example, an instrument "payable to the order of the Camrod Company" would not qualify as a negotiable instrument if no such company exists.
x??

---
#### Summary and Differentiation
Background context summarizing key rules governing negotiability.

:p How can you differentiate between order instruments and bearer instruments?
??x
Order instruments require a specific payee who must be identified with certainty, and the transfer of such an instrument requires indorsement. Bearer instruments do not specify a particular payee; instead, they are payable to anyone who presents them for payment.
x??

---

