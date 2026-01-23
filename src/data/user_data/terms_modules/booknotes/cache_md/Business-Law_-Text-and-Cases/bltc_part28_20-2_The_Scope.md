# Flashcards: Business-Law_-Text-and-Cases_processed (Part 28)

**Starting Chapter:** 20-2 The Scope of Articles 2 Sales and 2A Leases

---

---
#### Uniform Commercial Code (UCC)
Background context explaining the concept. The UCC was developed to provide a uniform set of laws for commercial transactions across the United States, aiming to simplify and streamline these processes.

The UCC has been adopted by all states except Louisiana, which has not adopted Articles 2 and 2A.
:p What is the Uniform Commercial Code (UCC)?
??x
The Uniform Commercial Code (UCC) is a set of laws designed to standardize commercial transactions across the United States. It aims to simplify and streamline these processes by providing uniform standards that businesses can follow when engaging in sales or lease contracts.

```java
// Pseudocode for understanding UCC adoption
if (state != "Louisiana") {
    adoptUCC();
} else {
    // Louisiana has not adopted Articles 2 and 2A
}
```
x??

---
#### Role of the UCC in Contracts
Explanation on how the UCC applies to sales and lease contracts, including online transactions.
:p How does the UCC apply to modern commercial transactions?
??x
The UCC applies to sales and lease contracts, even those entered into online. It allows for greater flexibility in contract formation compared to common law principles by reducing the need for formalities typically required in other types of contracts.

```java
// Pseudocode illustrating application of UCC
public boolean isUccApplicable(String contractType) {
    if (contractType.equals("Sales") || contractType.equals("Lease")) {
        return true; // Applies to sales and lease contracts
    } else {
        return false; // Does not apply to other types of contracts
    }
}
```
x??

---
#### Goal of the UCC
Explanation on simplifying and streamlining commercial transactions.
:p What is the main goal of the Uniform Commercial Code (UCC)?
??x
The main goal of the Uniform Commercial Code (UCC) is to simplify and streamline commercial transactions. This means making it easier for businesses to engage in sales and lease contracts without unnecessary formalities.

```java
// Pseudocode illustrating simplification through UCC
public void simplifyTransaction() {
    if (isContractUnderUcc()) {
        reduceFormalities();
    }
}
```
x??

---
#### International Sales Contracts and CISG
Explanation on the role of the United Nations Convention on Contracts for the International Sale of Goods (CISG).
:p How do international sales contracts differ from domestic ones?
??x
International sales contracts are governed by the United Nations Convention on Contracts for the International Sale of Goods (CISG), which is a model uniform law that applies only when a nation has adopted it. This differs from domestic sales, where the UCC typically governs such transactions.

```java
// Pseudocode to determine applicable law
public String getApplicableLaw(String contractType, boolean isInternational) {
    if (isInternational) {
        return "CISG"; // United Nations Convention on Contracts for the International Sale of Goods
    } else {
        return "UCC"; // Uniform Commercial Code
    }
}
```
x??

---
#### Articles of UCC
Explanation on the structure and purpose of different articles within the UCC.
:p What is the structure of the UCC?
??x
The UCC consists of eleven articles, each focusing on a particular aspect of commercial transactions. For instance, Article 1 sets forth definitions and general principles applicable to commercial transactions.

```java
// Pseudocode for UCC Articles
public void processUccArticle(int articleNumber) {
    switch (articleNumber) {
        case 1:
            // Process General Provisions
            break;
        case 2:
            // Process Sales
            break;
        case 3:
            // Process Leases
            break;
        default:
            // Handle other articles
            break;
    }
}
```
x??

---
#### Good Faith Obligation in UCC
Explanation on the concept of good faith as applied by the UCC.
:p What does the UCC’s duty of good faith entail?
??x
The UCC includes an obligation to perform contracts with "good faith." This means that parties must act honestly and fairly when entering into or performing a contract under the UCC. However, this obligation does not apply to contracts that do not fall under the UCC.

```java
// Pseudocode for Good Faith Obligation
public void checkGoodFaith(String contractType) {
    if (isUccApplicable(contractType)) {
        ensureGoodFaith();
    }
}
```
x??

---
#### Application of UCC in Specific Cases
Explanation on the application and limitations of the UCC, using the case of a university student.
:p How is the UCC’s good faith obligation applied?
??x
The UCC's duty of good faith applies to commercial transactions but does not apply to non-commercial agreements like contracts between a university and its students. In Peter Amaya's case, his contract with the university did not fall under the UCC, so the university was not required to adhere to the obligation of good faith.

```java
// Pseudocode for Case Application
public void checkUccApplication(String agreementType) {
    if (agreementType.equals("Commercial")) {
        ensureGoodFaith();
    } else {
        // University agreements are exempt from UCC's good faith obligation
    }
}
```
x??

---

#### Irrevocable Lessee Obligations under Finance Leases (Article 2A)
Background context: Under Article 2A of the Uniform Commercial Code, lessees' obligations under a finance lease are irrevocable and independent from the financier's obligations. This means that even if the leased equipment is defective, the lessee must continue to make lease payments.
:p What does Article 2A of the UCC state about lessee obligations in a finance lease?
??x
Article 2A makes the lessee’s obligations under a finance lease irrevocable and independent from the financier's obligations. The lessee must perform and continue to make lease payments regardless of any defects or poor performance of the leased equipment, with recovery looking almost entirely to the supplier.
x??

---

#### Formation of Sales and Lease Contracts (UCC 20–3)
Background context: The UCC modifies common law contract rules in several ways for sales and lease contracts. This includes modifications regarding when a binding agreement is formed, terms that can be left open, and how courts determine the existence and enforceability of a contract.
:p How does the UCC modify the formation of sales and lease contracts?
??x
The UCC modifies common law by stating that an agreement sufficient to constitute a contract can exist even if the moment of its making is undetermined. Additionally, it allows for terms in a sales or lease contract to be left open as long as both parties intended to make a contract and there is a reasonably certain basis for the court to grant an appropriate remedy.
x??

---

#### Open Terms (UCC 20–3a)
Background context: In common law, offers must be definite enough for the parties to ascertain essential terms when accepted. The UCC relaxes this requirement by stating that sales or lease contracts will not fail for indefiniteness as long as both parties intended to make a contract and there is a reasonably certain basis for a court to grant an appropriate remedy.
:p What does the UCC state about open terms in sales and lease contracts?
??x
The UCC states that a sales or lease contract will not fail due to open terms if two conditions are met: 1. The parties intended to make a contract, and 2. There is a reasonably certain basis for the court to grant an appropriate remedy.
x??

---

#### Example of Irrevocable Lessee Obligations
Background context: McKessen Company leases surgical ophthalmic equipment to Vasquez, who stops making lease payments when the equipment turns out to be defective. Under Article 2A, despite the defect, Vasquez is obligated to make all payments due under the lease.
:p What happened in Example 20.6 and what was the outcome?
??x
In Example 20.6, McKessen Company leases surgical ophthalmic equipment to Vasquez for use at his medical eye center. When the equipment turns out to be defective, Vasquez stops making the lease payments. Despite this defect, because the lease qualifies as a finance lease under Article 2A, a court will hold in favor of McKessen. Vasquez is obligated to make all payments due under the lease regardless of the condition or performance of the leased equipment.
x??

---

#### Formation of Contracts: Determining When an Agreement Exists
Background context: In commercial sales transactions, determining when a binding contractual obligation arises can be challenging through verbal exchanges and actions. The UCC states that even if the moment of making the agreement is undetermined, an agreement sufficient to constitute a contract can exist.
:p How does the UCC address the timing of forming a binding agreement?
??x
The UCC addresses the timing by stating that an agreement sufficient to constitute a contract can exist even if the exact moment of its formation is not determined. This flexibility accommodates commercial transactions where precise timing might be hard to establish through verbal exchanges and actions.
x??

---

#### Open Terms: Contractual Gaps (UCC 2A-204(3))
Background context: The UCC provides numerous open-term provisions that can fill gaps in a contract, ensuring the existence of a contract even if one or more terms are left open. This is as long as both parties intended to make a contract and there is a reasonably certain basis for a court to grant an appropriate remedy.
:p How does the UCC handle open terms in contracts?
??x
The UCC handles open terms by stating that a sales or lease contract will not fail due to open terms if: 1. The parties intended to make a contract, and 2. There is a reasonably certain basis for the court to grant an appropriate remedy. This allows gaps in the contract to be filled using open-term provisions.
x??

---

#### Determining Contractual Intent
Background context: If too many terms are left open or if the quantity of goods involved is not expressly stated, a court may find that the parties did not intend to form a contract. The UCC provides guidance on proving the existence of a contract through indications like purchase orders and presumed reasonable intentions.
:p What factors might prevent a court from finding an agreement?
??x
A court may find that parties did not intend to form a contract if too many terms are left open or if the quantity of goods involved is not expressly stated in the contract. The UCC provides evidence and presumptions to help prove the existence of a contract, but excessive gaps can negate the intention to form a binding agreement.
x??

---

#### Illinois Law on Oral Agreements
Under Illinois law, oral agreements are enforceable as long as there is an offer, acceptance, and a meeting of the minds regarding the terms. The agreement must be sufficiently definite as to its material terms for it to be enforceable. 
:p What does Illinois law state about the enforceability of oral agreements?
??x
Illinois law allows for the enforcement of oral agreements so long as there is an offer, acceptance, and a meeting of the minds regarding the terms. These agreements must also be sufficiently definite concerning their material aspects.
x??

---

#### Material Terms in the Agreement
The duration of Kastalon's obligation to store the rolls was identified as a material term of the agreement between Kastalon and Toll Processing.
:p Which part of the agreement is considered a material term?
??x
The duration of Kastalon’s obligation to store the rolls. This term was disputed by the parties, with Toll Processing arguing for indefinite storage until a purchase order was issued, while Kastalon insisted it would only be for three or four months.
x??

---

#### Mutual Understanding and Dispute
The district court found that there was no mutual understanding as to the duration of the storage agreement due to the discrepancy between the parties' statements. Toll Processing argued that the parties' conduct established an agreement, but Kastalon countered with the lack of a specific timeframe.
:p Did the district court find mutual understanding between the parties?
??x
No, the district court found no mutual understanding regarding the duration of the storage agreement due to the discrepancy in their statements and expectations.
x??

---

#### Consideration for the Agreement
Kastalon’s expectation that Toll Processing would hire it to repair and refurbish the rolls was considered as consideration supporting the contract. However, this did not settle the dispute over the indefinite duration of storage.
:p What constitutes the consideration in this case?
??x
The consideration is based on Kastalon's expectation that Toll Processing would eventually hire them to repair and refurbish the rolls. This expectation supported the contract but was insufficient to resolve the disagreement over the indefinite storage term.
x??

---

#### Appeal Arguments by Toll Processing
Toll Processing argued that their conduct established a mutual agreement with Kastalon, and that there were undisputed facts supporting this agreement. However, the district court disagreed, finding no clear intent for an indefinite period of storage.
:p What arguments did Toll Processing present on appeal?
??x
Toll Processing argued that their conduct showed a mutual agreement with Kastalon, and they presented undisputed facts to support this claim. They also contended that the duration was tied to the reinstallation of the pickle line or represented a genuine dispute regarding mutual intent.
x??

---

#### District Court's Ruling
The district court ruled in favor of Kastalon on the breach of contract claim because there was no mutual understanding that Kastalon would store the rolls indefinitely. The storage period was contingent upon Toll Processing issuing a purchase order for refurbishment within a reasonable timeframe, which Toll Processing conceded might not have occurred.
:p What did the district court rule?
??x
The district court ruled in favor of Kastalon on the breach of contract claim because there was no mutual understanding that Kastalon would store the rolls indefinitely. The storage agreement's duration depended on Toll Processing issuing a purchase order for refurbishment, which Toll Processing admitted might not have occurred.
x??

---

#### Appellate Court Decision
The appellate court affirmed the district court’s decision on the breach of contract claim, agreeing with the lower court that there was no mutual understanding for indefinite storage. The period of storage was tied to when Toll Processing would issue a purchase order for refurbishment.
:p What did the appellate court decide?
??x
The appellate court upheld the district court's ruling in favor of Kastalon on the breach of contract claim, agreeing that there was no mutual agreement for indefinite storage. The storage obligation ended based on Toll Processing issuing a purchase order for the rolls' refurbishment.
x??

---

#### Prejudgment Interest Calculation
Background context: The court awarded damages plus prejudgment interest to H. Daya International against Do Denim and Reward Jean based on a New York statute which specifies that interest begins accruing from “the earliest ascertainable date the cause of action existed.” Since payment is due at the time the buyer receives the goods, the court held that interest started accruing from receipt of the final shipment.
:p What is the basis for calculating prejudgment interest in this case?
??x
The basis for calculating prejudgment interest is based on New York's statute, which states that 9% interest accrues from "the earliest ascertainable date the cause of action existed." In this context, since payment is due upon receipt of goods and the final shipment was received, the court determined that interest began accruing from when the last shipment was delivered.
??x

---

#### Delivery Term Default
Background context: The UCC specifies default delivery terms if none are specified in a sales contract. When no delivery terms are specified, the buyer normally takes delivery at the seller's place of business unless the seller has no such place or both parties know that goods are located elsewhere.
:p What is the default delivery term under the UCC when no delivery terms are specified?
??x
The default delivery term under the UCC is that the buyer will take delivery at the seller’s place of business, provided the seller has a business location. If not, then the seller's residence is used as the delivery point.
??x

---

#### Duration of an Ongoing Contract
Background context: An ongoing contract might specify successive performances but fail to indicate how long the parties are required to deal with each other. In such cases, either party may terminate the ongoing contractual relationship, provided they give reasonable notification so that the other party can seek a substitute arrangement.
:p What principle should guide termination of an ongoing contract?
??x
The principle guiding the termination of an ongoing contract is that both parties must act in good faith and follow sound commercial practice. This means giving sufficient notice to the other party to allow them time to find alternative arrangements.
??x

---

#### Options and Cooperation with Regard to Performance
Background context: When a sales contract omits terms regarding shipping arrangements, the seller has the right to make these arrangements. However, the seller must do so in good faith using commercial reasonableness.
:p What rights does the seller have if the shipping arrangements are not specified in the contract?
??x
If the shipping arrangements are not specified in the sales contract, the seller retains the right to arrange for shipment. The seller is required to make these arrangements in good faith and with commercial reasonableness.
??x

---

#### Open Quantity Terms
Background context: When a contract does not specify quantity, no contract is formed unless it fits into one of two exceptions under the UCC—requirements or output contracts. However, if no such terms are specified, the court cannot determine an objective remedy because there's no clear way to define a reasonable quantity.
:p What happens when a sales contract omits specifying the quantity?
??x
When a sales contract omits specifying the quantity, no contract is formed unless it falls under one of the two exceptions: requirements or output contracts. Otherwise, the court cannot determine an objective remedy because there's no clear way to define what constitutes a reasonable quantity.
??x

---

These flashcards cover key concepts from the provided text, ensuring clarity and understanding through detailed explanations and relevant context.

---
#### Merchant's Firm Offer
A merchant's firm offer is irrevocable without consideration for a specified period or a reasonable period (not exceeding three months) if no definite period is stated. This concept is governed by UCC 2-205 and 2A-205.
:p What defines a merchant's firm offer?
??x
A merchant's firm offer is irrevocable without consideration for the specified or reasonable period (not exceeding three months) if no definite period is stated, as per UCC 2-205 and 2A-205. This means that once the offeror makes a clear and certain promise to be bound by such an offer for a set period, they cannot revoke it without the offeree's consent.
x??

---
#### Example of Merchant's Firm Offer
Osaka, a used-car dealer, e-mails Gomez on January 1 stating, "I have a used Toyota RAV4 on the lot that I’ll sell you for $22,000 any time between now and January 31." This creates a firm offer.
:p Does this example illustrate an instance of a merchant's firm offer?
??x
Yes, this example illustrates an instance of a merchant's firm offer. Osaka clearly states his intention to be bound by the offer for a specific period (until January 31), making it irrevocable without consideration during that time.
x??

---
#### Requirements for a Firm Offer
To qualify as a firm offer, it must meet certain criteria: it must be in writing or electronically recorded, signed by the offeror. If contained in an offeree's form contract, the offeror must also sign a separate assurance of the firm offer.
:p What are the requirements for a firm offer?
??x
For a firm offer to be valid, it must:
1. Be written or electronically recorded.
2. Be signed by the offeror.
3. If contained in an offeree's form contract, require the offeror to sign a separate assurance of the firm offer.

This ensures that the offeror is aware of their commitment and cannot easily revoke the offer without proper notice.
x??

---
#### Acceptance of Offer
Acceptance of an offer may be made by any reasonable manner or means. For offers to buy goods, it can be done either by a prompt promise to ship or by the prompt shipment of conforming or nonconforming goods.
:p How is acceptance defined in terms of buying goods?
??x
Acceptance of an offer to buy goods can be achieved:
1. By a prompt promise to ship (if the offeror requests this).
2. By promptly shipping conforming goods.
3. By promptly shipping nonconforming goods, which constitutes both acceptance and a breach of contract.

The UCC allows for these methods as long as they are reasonable.
x??

---
#### Accommodation Shipment
If a seller ships nonconforming goods without notifying the buyer that it is an accommodation, then the shipment is considered both an acceptance (creating a contract) and a breach. However, if the seller notifies the buyer properly, the shipment does not constitute an acceptance.
:p What happens when a seller ships nonconforming goods?
??x
When a seller ships nonconforming goods without notifying the buyer that it is an accommodation:
1. The shipment constitutes both an acceptance (creating a contract) and a breach of that contract.

However, if the seller notifies the buyer properly:
2. The shipment does not constitute an acceptance, as the notice clearly indicates to the buyer that no contract has been formed.
3. This protects the buyer from entering into an unwanted contract.

Example: If Halderson ships black watches without notifying Mendez of the accommodation, it is both an acceptance and a breach. If they notify Mendez properly, then no contract is formed.
x??

---

#### Forum-Selection Clause Bindingness
Background context: In this case, National filed a motion to dismiss for lack of personal jurisdiction, arguing that the forum-selection clause on the invoices was not binding because its president never signed the terms and conditions. The court agreed with National's argument based on UCC 2–207(2) and found the clause non-binding without an express agreement from National.

:p What is Mahendra’s best argument to show that the forum-selection clause was binding on National?
??x
Mahendra would argue that even though the forum-selection clause was not signed by National's president, it still forms part of the contract as per UCC 2–207(2). Specifically, Mahendra could assert that:
- The terms were part of the commercial transaction and were discussed during negotiations.
- The invoices served as confirmatory documents for the oral agreements reached over the phone, making the forum-selection clause binding due to its nature as an additional term in a contract between merchants.

Mahendra might also argue that if National accepted the diamonds and services under these terms, it implicitly agreed to the forum-selection clause. However, based on the lower court's decision, Mahendra would face challenges proving this argument without clear evidence of consent.
x??

---

#### UCC 2-207(2) Application
Background context: The relevant section from UCC 2–207(2) states that additional terms in a contract between merchants are to be construed as proposals for addition to the contract. These terms become part of the contract unless they materially alter it.

:p How does UCC 2-207(2) apply to this case?
??x
UCC 2–207(2) applies by stating that additional terms in a merchant contract are merely proposals for addition and only become part of the contract if they do not materially alter its terms. In this case, National argued that the forum-selection clause was an additional term which materially altered the oral agreements made over the phone. The lower court agreed with National, noting that without explicit consent, the clause was non-binding.

To apply UCC 2-207(2) in Mahendra's favor:
- Mahendra would need to argue that despite not being signed by National's president, the terms were discussed and accepted during negotiations.
- The invoices served as confirmatory documents for the oral agreements made over the phone, making the forum-selection clause binding.

However, given the court's decision, Mahendra must provide strong evidence of implicit consent or explicit agreement to make a compelling argument.
x??

---

#### Personal Jurisdiction
Background context: The lower court found that because National did not sign the invoices and there was no express agreement, the forum-selection clause was non-binding. However, the appellate court reversed this decision on personal jurisdiction grounds, finding sufficient contacts in New York for suit.

:p How does the appellate court justify its decision regarding personal jurisdiction?
??x
The appellate court justified its decision by concluding that National's phone calls with Mahendra were sufficient to subject it to personal jurisdiction in New York under the state’s long-arm statute. Specifically:
- The court noted that though the invoices were not signed, the extensive telephone discussions and business dealings established a substantial connection between National and New York.
- These contacts provided enough presence for the court to exercise jurisdiction over National.

To further justify this decision:
- The appellate court likely cited relevant state statutes defining personal jurisdiction.
- It may have referenced prior case law that similar phone-based negotiations can establish sufficient contacts even without physical presence in the state.

Given these considerations, the appellate court found that New York had jurisdiction over National despite the forum-selection clause issue.
x??

---

#### Contract Formation Through Forms
Background context: The lower court found that the invoices were confirmatory documents and not part of a primary agreement, thus making the forum-selection clause non-binding. UCC 2-207(2) addresses situations where parties exchange forms like purchase orders and invoices without discussing all terms.

:p What does UCC 2–207(2) suggest about contract formation through forms?
??x
UCC 2–207(2) suggests that when merchants exchange forms such as purchase orders and invoices, the additional terms in these forms are to be construed as proposals for addition to the existing contract. These terms become part of the contract only if they do not materially alter it.

For Mahendra’s argument:
- Mahendra would need to show that the oral agreements made over the phone were sufficient to form a primary agreement.
- The invoices, while confirmatory, should be considered as adding terms that did not significantly change the original agreements. Without explicit consent to such changes, the forum-selection clause remains non-binding.

The key is demonstrating that the terms in the invoices did not substantially alter the oral contracts and thus were merely proposals rather than binding additions.
x??

---

#### Battle of the Forms
Background context explaining the concept. The term "battle of the forms" refers to situations where merchants' acceptances contain terms that add to or conflict with those of the offer, leading to potential disputes over contract terms. This issue is prevalent in commercial settings where standard forms are used for placing and confirming orders.

:p What does the term "battle of the forms" refer to?
??x
The term "battle of the forms" refers to situations where merchants' acceptances contain terms that add to or conflict with those of the offer, leading to potential disputes over contract terms. This issue is prevalent in commercial settings where standard forms are used for placing and confirming orders.
x??

---

#### UCC 2-207(3)
Background context explaining the concept. According to the Uniform Commercial Code (UCC), if the writings of the parties do not establish a contract, "the terms of the particular contract will consist of those terms on which the writings of the parties agree, together with any supplementary terms incorporated under any other provisions of this Act." In such cases, courts can strike from the contract terms on which the parties do not agree.

:p According to UCC 2-207(3), what happens if the writings of the parties do not establish a contract?
??x
According to UCC 2-207(3), if the writings of the parties do not establish a contract, "the terms of the particular contract will consist of those terms on which the writings of the parties agree, together with any supplementary terms incorporated under any other provisions of this Act." In such cases, courts can strike from the contract terms on which the parties do not agree.
x??

---

#### Example 20.18
Background context explaining the concept. This example illustrates a situation where SMT Marketing places an order over the phone with Brigg Sales, Inc., and receives an acknowledgment form confirming the order. Despite some disagreement in the terms, UCC 2-207(3) provides the governing rule for resolving disputes.

:p In Example 20.18, what legal provision applies when there is a dispute over contract terms?
??x
In Example 20.18, UCC 2-207(3) applies when there is a dispute over contract terms. This provision states that if the writings of the parties do not establish a contract but there is no question that a contract exists, any disagreement in the terms can be resolved by considering those on which the writings agree and any supplementary terms incorporated under other provisions of this Act.
x??

---

#### Consideration
Background context explaining the concept. The common law rule that a contract requires consideration also applies to sales and lease contracts. However, unlike the common law, the UCC does not require new consideration for modifying an existing contract.

:p What does the UCC say about modification of sales or lease contracts in terms of consideration?
??x
The UCC states that an agreement modifying a contract for the sale or lease of goods "needs no consideration to be binding" (UCC 2-209(1), 2A-208(1)). However, any contract modification must still be made in good faith (UCC 1-304). This means that while new consideration is not required, the modification must reflect genuine intentions from both parties.
x??

---

#### Statute of Frauds
Background context explaining the concept. The UCC contains provisions similar to the common law Statute of Frauds for sales and lease contracts. Specifically, sales contracts for goods priced at $500 or more and lease contracts requiring total payments of$1,000 or more must be in writing to be enforceable.

:p What does the UCC say about the written requirement for sales and lease contracts?
??x
The UCC states that sales contracts for goods priced at $500 or more and lease contracts requiring total payments of$1,000 or more must be in writing to be enforceable (UCC 2-201(1), 2A-201(1)). This requirement ensures that such significant transactions are documented in a written form to prevent disputes.
x??

---

---
#### Admissions Exception
Background context: In contract law, a party can admit the existence of an oral contract through pleadings, testimony, or other court proceedings. If such an admission is made, the contract is enforceable up to the quantity admitted, even if it was not in writing.

:p What is the admissions exception for enforcing oral contracts?
??x
The admissions exception allows a party to admit the existence of an oral contract through pleadings, testimony, or other court proceedings. If such an admission is made, the contract is enforceable up to the quantity admitted, even if it was not in writing.
??x

---

#### Partial Performance Exception
Background context: In sales law, partial performance can be used as evidence that a valid oral contract exists and should be enforced. Payment for goods or services, or receiving goods, can establish this exception.

:p What is the partial performance exception in sales contracts?
??x
The partial performance exception allows enforcement of an oral contract if one party has made some form of payment or accepted delivery of goods. At least to the extent that performance has taken place, a court will enforce the agreement.
??x

---

#### Differences between Contract Law and Sales Law - Contract Terms
Background context: Contract law requires all material terms be specified in writing, while sales law allows for open terms if the parties intended to form a contract but typically specifies quantity. Contracts beyond the agreed quantity are not enforceable.

:p How do contract terms differ under sales law compared to general contract law?
??x
In sales law, contracts must specify the quantity of goods or services clearly and cannot be enforced beyond that specified. In contrast, general contract law allows open terms if both parties intended to form a contract, but typically requires all material terms, especially quantity, to be explicitly stated.
??x

---

#### Differences between Contract Law and Sales Law - Acceptance
Background context: Contract law enforces the mirror image rule where acceptance must match the offer exactly. Adding additional terms creates a counter-offer. In sales law, additional terms do not necessarily negate acceptance if they are not expressly conditional on agreement.

:p How does the acceptance of an oral contract differ between contract and sales law?
??x
In contract law, the mirror image rule applies; any change to the offer through acceptance constitutes a counter-offer. In sales law, additional terms in acceptance generally do not create a new offer unless they are expressly made conditional on acceptance.
??x

---

These flashcards cover the key concepts and differences between contract and sales laws as presented in the provided text. Each card is designed to promote understanding rather than pure memorization, with detailed explanations and relevant examples where appropriate.

#### Usage of Trade

Background context: The usage of trade refers to practices and methods of dealing that are regularly observed within a specific place, vocation, or trade. Parties expect these practices to be adhered to in their transactions. Such usages can influence the interpretation of contracts.

:p What is an example where a usage of trade affects the outcome of a contract?
??x
In Example 20.23, Phat Khat Loans, Inc., hires Fleet Title Review Company for conducting title searches. The industry practice includes limiting liability to the amount of the fee as stated in Fleet's invoice. When Main Street Autos defaults on the loan and another lender has priority due to a previous claim, Phat Khat sues Fleet for breach of contract. However, Fleet’s liability is limited according to the common usage of trade and the parties' course of dealing.

```java
// Pseudocode example
public class UsageOfTradeExample {
    public static void main(String[] args) {
        Company phatKhat = new Company("Phat Khat Loans");
        Company fleetTitleReview = new Company("Fleet Title Review");

        // Fleet's invoice states "Liability limited to amount of fee"
        String invoiceStatement = "Liability limited to amount of fee";
        
        // Fleet conducts a title search and reports no claims
        List<String> report = new ArrayList<>();
        report.add("No claims found for Main Street Autos");
        
        phatKhat.lendTo(MainStreetAutos, 100000, report);
    }
}
```
x??

---

#### Course of Performance

Background context: The course of performance refers to the conduct that occurs under the terms of a particular agreement. It is the actual behavior and transactions between parties that can be used to determine the meaning or intent behind their words.

:p What determines what a "two-by-four" means in Janson's Lumber Company's contract with Lopez?
??x
In Example 20.24, Janson's Lumber Company contracts with Lopez for selling specified two-by-fours. The lumber does not measure exactly 2 inches by 4 inches but rather 1 7⁄8 inches by 33⁄4 inches. Lopez accepts the lumber in three deliveries without objection. On the fourth delivery, Lopez objects that the lumber does not meet the exact dimensions of a "two-by-four." Here, the course of performance—Lopez's acceptance of three deliveries without objection—is relevant to determine that "a two-by-four" means "1 7⁄8 inches by 33⁄4 inches."

```java
// Pseudocode example
public class CourseOfPerformanceExample {
    public static void main(String[] args) {
        Company jansonLumber = new Company("Janson's Lumber");
        Company lopez = new Company("Lopez");

        // Janson's delivers lumber in three deliveries without objection from Lopez
        List<Lumber> deliveries = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Lumber lumber = new Lumber(1.75, 3.25);
            deliveries.add(lumber);
        }
        
        lopez.acceptDeliveries(deliveries);

        // On the fourth delivery, Lopez objects
        Lumber fourthLumber = new Lumber(2, 4);
        lopez.acceptsFourthDelivery(fourthLumber); // Returns false
    }
}
```
x??

---

#### Rules of Construction

Background context: The UCC provides rules for interpreting contracts. These include express terms, course of performance, course of dealing, and usage of trade. The UCC prioritizes these in a specific order when reasonable.

:p How does the UCC prioritize interpretative methods when there is a conflict?
??x
The UCC establishes a priority order to resolve conflicts between different elements in interpreting contracts. When express terms are not clear or ambiguous, the UCC looks at:

1. Express terms
2. Course of performance
3. Course of dealing
4. Usage of trade

For instance, if an express term is unreasonable given the other factors, the course of performance, followed by the course of dealing and usage of trade, come into play.

```java
// Pseudocode example for prioritization
public class RulesOfConstructionExample {
    public static void main(String[] args) {
        String expressTerm = "Lumber must be exactly 2x4 inches";
        
        // Check if express term is reasonable
        boolean isExpressTermReasonable = true;
        
        if (!isExpressTermReasonable) {
            // If not, consider course of performance
            List<Lumber> deliveries = new ArrayList<>();
            for (int i = 1; i <= 3; i++) {
                Lumber lumber = new Lumber(1.75, 3.25);
                deliveries.add(lumber);
            }
            
            boolean isCourseOfPerformanceReasonable = true;
            if (!isCourseOfPerformanceReasonable) {
                // If not, consider course of dealing
                List<Lumber> previousDeliveries = new ArrayList<>();
                for (int i = 1; i <= 3; i++) {
                    Lumber lumber = new Lumber(1.75, 3.25);
                    previousDeliveries.add(lumber);
                }
                
                boolean isCourseOfDealingReasonable = true;
                if (!isCourseOfDealingReasonable) {
                    // If not, consider usage of trade
                    String industryUsage = "Lumber typically measures 1 7/8 x 3 3/4 inches";
                    
                    // Determine the final meaning based on reasonable interpretation
                }
            }
        }
    }
}
```
x??

---

#### Questionable Contract Terms
Background context: The case discusses whether a freezer unit sold for $900, when its retail value is only$300, constitutes an unconscionable contract. A key factor here is the disparity between the actual cost and the selling price, which may be used to argue that one party took advantage of the other's limited financial resources.
:p What does the court consider in deciding whether a contract is unconscionable?
??x
The court considers several factors:
1. The mathematical disparity between the retail value ($300) and the sale price ($900).
2. Credit charges exceeding the freezer’s retail value by more than $100.
3. The purchaser's limited financial resources, which may indicate that they were taken advantage of.

The court also considers whether there was a gross inequality in bargaining power, which negates meaningful choice.
x??

---

#### Reformation of Contract
Background context: In the case discussed, the court ruled that the contract was not enforceable and reformed it so that no further payments were required. This decision was based on the excessive price and the plaintiff's limited financial resources.

:p How did the court reform the contract in this case?
??x
The court reformed the contract by limiting the application of the payment provision to the amount already paid by the plaintiffs and then amending the contract so that no further payments were required.
x??

---

#### Unconscionability Factors
Background context: The case highlights several factors that can lead to a finding of unconscionability, including:
- Mathematical disparity between retail value and sale price.
- Excessive credit charges.
- Limited financial resources of the purchaser.

These factors are weighed by the court to determine if there was an imbalance in bargaining power or if one party took advantage of another's limited financial means.
:p What factors might support a finding of unconscionability?
??x
Factors that might support a finding of unconscionability include:
- A significant mathematical disparity between the retail value and sale price.
- Excessive credit charges, which can be seen as unreasonable in comparison to the product’s worth.
- The limited financial resources of the purchaser, known by the seller at the time of the sale.

These factors may indicate that one party took advantage of the other's vulnerable position.
x??

---

#### Application of UCC 2–302
Background context: The case uses Section 2–302 of the Uniform Commercial Code (UCC) to determine whether a contract is unconscionable. This section requires courts to consider both substantive and procedural unconscionability.

:p How does Section 2–302 of the UCC help in determining if a contract is unconscionable?
??x
Section 2–302 of the UCC helps by requiring courts to examine both substantive and procedural unconscionability. Substantive unconscionability involves factors such as the disparity between the retail value and sale price, while procedural unconscionability concerns the lack of meaningful choice due to unequal bargaining power.
x??

---

#### International Sales Contracts
Background context: The text introduces the 1980 United Nations Convention on Contracts for the International Sale of Goods (CISG), which governs international sales contracts between firms or individuals located in different countries. The CISG applies if both parties' countries have ratified it and no other law has been agreed upon.

:p What is the CISG and how does it apply to international sales?
??x
The CISG, also known as the Sales Convention, governs international sales contracts involving parties from countries that have ratified it. It is applicable only if:
1. Both parties' countries are signatories.
2. The parties have not agreed on a different governing law.

The CISG applies to over 80 countries and represents a uniform set of rules for international commercial transactions, similar to how Article 2 of the UCC governs domestic sales contracts.
x??

---

#### Example of International Sales Contract
Background context: An example is provided in the text of an actual international sales contract used by Starbucks Coffee Company. The CISG can be seen as analogous to Article 2 of the UCC, which applies when parties fail to specify important terms like price or delivery in a domestic sale.

:p What does the example contract from Starbucks demonstrate?
??x
The example contract from Starbucks demonstrates how the CISG can be applied in international sales. Just as Article 2 of the UCC provides default rules for domestic sales contracts, the CISG offers standardized rules for international sales when no other law governs.
x??

---

