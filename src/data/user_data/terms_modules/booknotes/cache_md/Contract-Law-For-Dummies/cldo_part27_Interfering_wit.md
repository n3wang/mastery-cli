# Flashcards: Contract-Law-For-Dummies_processed (Part 27)

**Starting Chapter:** Interfering with Someone Elses Contract A Big No-No

---

#### Changing a Third-Party Beneficiary’s Rights
Background context explaining the concept. Parties to a contract are generally free to modify their duties, including changing the beneficiary of a contract. However, exceptions occur when rights vest, meaning they cannot be changed without the beneficiary's consent.

:p How can the parties to a contract typically change the beneficiary?
??x
The parties to a contract can generally change the beneficiary unless the rights have vested in the beneficiary. Vested rights usually occur if:
1. There is an express agreement that the beneficiary’s rights cannot be changed.
2. The beneficiary changes their position based on reliance on the promise.

For example, if Midtown Motors was intended as a third-party beneficiary but you intend to change this to another party without their consent, it might not be allowed due to vested rights.

x??

---
#### Life Insurance Policy Beneficiaries
Background context explaining the concept. The insured may not be able to change the beneficiary named in a life insurance policy if the beneficiary has relied on the promise. This is because the right of the beneficiary can vest, making any changes difficult without their consent.

:p Can an insured person always change the beneficiary of a life insurance policy?
??x
No, an insured person cannot always change the beneficiary without restriction. In many jurisdictions, courts have found that if the beneficiary has relied on the promise, the insured may not be able to change the beneficiary unless they reserved such power in the policy.

For example:
```java
public class Policy {
    private String beneficiaryName;
    
    public void updateBeneficiary(String newName) {
        // Code to check if the beneficiary has changed their position based on reliance.
        // If so, only allow changes with consent or reserved power.
        if (newName != null && !beneficiaryName.equals(newName)) {
            this.beneficiaryName = newName;
        }
    }
}
```
x??

---
#### Tortious Interference with a Contract
Background context explaining the concept. A third party can induce one of the parties to breach a contract, which gives rise to tortious interference claims. This can result in both breach of contract and tortious interference lawsuits.

:p What is an example of tortious interference?
??x
An example of tortious interference is when a third party induces one of the contracting parties to break their contract, causing loss to the other party. For instance:
- A company might threaten another with legal action if they don’t stop doing business with a competitor.
- In The Insider movie, Brown & Williamson Tobacco threatened to sue CBS for airing sensitive information, thereby interfering with CBS’s contract.

x??

---
#### Elements of Tortious Interference
Background context explaining the concept. To establish tortious interference, four main elements must be proven: (1) a valid contract between two parties; (2) an intentional and improper act by the defendant to interfere with that contract; (3) causation; and (4) damages.

:p How can a defendant defend against a claim of tortious interference?
??x
A defendant can defend against a claim of tortious interference by arguing that their interference was justified. For example:
- In the case of long-distance service calls, the company might argue that offering services is part of free enterprise and thus justified.
- Brown & Williamson defended themselves by claiming CBS’s news business had a right to air the information.

x??

---
#### Contract to Marry
Background context explaining the concept. A contract to marry is exempt from tortious interference because marriage is at its core a contract, with annulment or divorce serving as breaches of this contract. Traditional torts related to interfering with marriage (alienation of affections) are now largely obsolete due to statutory protections.

:p Why is the contract to marry excluded from tortious interference?
??x
The contract to marry is excluded because it is fundamentally a contract like any other, and grounds for annulment or divorce are considered breaches. This means that interfering with such a contract would be more appropriately treated as a breach of contract rather than a tort.

x??

---
#### Interference with Formation of Contract
Background context explaining the concept. Tortious interference can also apply to the formation of a contract, not just its performance. For example, inducing one party to make a new contract with someone else at the expense of an existing agreement could be considered improper.

:p Can tortious interference occur during the formation of a contract?
??x
Yes, tortious interference can occur during the formation of a contract. For instance, if a third party induces one party to break off an engagement or marriage proposal and enter into a new relationship with someone else, this might be considered improper interference.

x??

---

#### Right and Duty in Contracts
Background context: Understanding what constitutes each party’s rights and duties under a contract is crucial before determining whether those rights or duties can be assigned to or delegated to third parties. The rights include the promisee's right to performance, while the duty involves the promisor's obligation to perform.
:p What are the key elements that define the rights and duties of the parties in a contract?
??x
The key elements defining the rights and duties of the parties in a contract include:
- Right: As a promisee in a contract, a party has the right to receive performance from the promisor.
- Duty: As a promisor, a party has the duty to perform as agreed.
For instance, in a sale of goods agreement, the buyer’s rights are receiving widgets and paying for them; the seller's duties are receiving payment and tendering the widgets. In construction contracts, the builder receives money and builds the house, while the homeowner gets the house and pays.
??x
The answer with detailed explanations:
In a contract, the key elements that define the rights and duties of the parties include:

- **Right**: As a promisee in a contract, a party has the right to receive performance from the promisor. For example, in a sale of goods agreement, the buyer’s right is receiving widgets and paying for them; similarly, in construction contracts, the builder receives money by building the house.
- **Duty**: As a promisor, a party has the duty to perform as agreed upon. For instance, the seller's duty is to receive payment and tender the widgets, while the homeowner’s duty is to get the house built and pay for it.

Understanding these elements is crucial before considering any assignment or delegation of rights and duties.
x??

---

#### Sale of Goods Contract
Background context: In a contract where one party agrees to sell goods to another at a specified price, both parties’ rights and duties are clearly defined. The buyer has the right to receive the goods and pay for them, while the seller’s duty is to deliver the goods and receive payment.
:p What does the sale of goods contract between Acorn Industries and Hickory, Inc., include in terms of rights and duties?
??x
In a sale of goods contract between Acorn Industries and Hickory, Inc., where Hickory had contracted with Filberts to purchase 3,000 rubber duckies for $1,250:
- **Hickory’s Rights**: Receive the rubber duckies.
- **Hickory’s Duties**: Pay Filberts $1,250.
- **Acorn’s Rights**: Pay Filberts $1,250 and receive the rubber duckies.
- **Acorn’s Duties**: Deliver 3,000 rubber duckies to Hickory.

In this scenario, Acorn assigns its rights and obligations under the contract with Filberts after buying out Hickory. Thus, it receives the right to purchase the rubber duckies and delegates its duty of payment.
??x
The answer with detailed explanations:
In a sale of goods contract between Acorn Industries (buyer) and Hickory, Inc. (seller), where Hickory had contracted with Filberts for 3,000 rubber duckies for $1,250, the rights and duties are as follows:

- **Hickory’s Rights**: Receive the 3,000 rubber duckies.
- **Hickory’s Duties**: Pay Filberts $1,250.

After Acorn Industries buys out Hickory:
- **Acorn's Rights**: Pay Filberts $1,250 and receive the 3,000 rubber duckies.
- **Acorn's Duties**: Deliver the 3,000 rubber duckies to the entity that originally had the right (Filberts).

Acorn assigns its rights and obligations under the contract with Filberts to take over the transaction after the buyout.
x??

---

#### Assignment of Contract Rights
Background context: Contract law generally allows parties to freely assign their rights, but this can be subject to certain limitations. The assignment of a right does not usually change the obligor's duty significantly because they are still responsible for performing as agreed regardless of who receives the right.
:p What is the general rule regarding the assignment of contract rights?
??x
The general rule regarding the assignment of contract rights is that parties may freely assign their rights, provided that:
- The assignment does not materially change the duty of the obligor (the party promised to perform).
- The assignment does not increase significantly the burden or risk imposed on the obligor by his contract.
- The assignment does not impair the obligor's chance of obtaining return performance.

For example, in a sale of goods agreement where the seller is obligated to supply widgets to the buyer as required, an assignment of these rights might be considered valid if it doesn't affect the seller's ability to deliver or create additional costs.
??x
The answer with detailed explanations:
The general rule regarding the assignment of contract rights states that parties may freely assign their rights under a contract, provided certain conditions are met:

- The assignment does not **materially change** the duty of the obligor (the party who promised to perform). For example, in a contract where the seller is obligated to supply widgets as required by the buyer, assigning these rights would be valid if it doesn't significantly alter the seller's obligations.
- The assignment does not increase **significantly** the burden or risk imposed on the obligor. If an assignee demands more than what was initially agreed upon in terms of performance or payment, this could invalidate the assignment.
- The assignment does not impair the obligor’s chance of obtaining return performance. This means that if the assignment significantly diminishes the obligor's prospects for receiving compensation or performance from the counterparty, it may be considered improper.

For instance, consider a scenario where a builder is contracted to build a house for an owner for $300,000. If the original owner assigns this right to another individual who now has no incentive to pay, it could impair the contractor's chance of receiving payment.
x??

---

#### Delegation of Duties in Contract Law
Background context: In contract law, parties have the freedom to delegate their duties under a contract. The party delegating is called the "delegator," and the party receiving the duty is called the "delegatee." A key distinction between assigning rights and delegating duties is that an assignee takes over the position of the original party (assignor), whereas a delegatee does not, making the delegator liable for performance and breach.
If applicable, add code examples with explanations: N/A
:p What is the difference between assigning rights and delegating duties in contract law?
??x
In contract law, the main difference between assigning rights and delegating duties lies in the position of the assignee versus the delegatee. When rights are assigned, the assignee takes over the role of the original party (assignor) in the contract. Conversely, when duties are delegated, the delegatee does not replace the original party (delegator); therefore, the delegator remains liable for performance and breach.
x??

---

#### Freely Delegating Duties
Background context: The general rule in contract law allows parties to freely delegate their duties under a contract. This rule is found in various legal codes, including the UCC § 2-210(1). It specifies that a party may perform through a delegate unless otherwise agreed or if the other party has a substantial interest in having the original promisor perform.
If applicable, add code examples with explanations: N/A
:p How can duties be freely delegated under contract law?
??x
Duties can be freely delegated under contract law when there is no agreement to the contrary and no substantial interest of the other party in having the original promisor perform. The UCC § 2-210(1) in North Carolina states that a party may delegate their duty through a delegate unless otherwise agreed or if the other party has a substantial interest in having the original promisor perform.
x??

---

#### Exceptions to Free Delegation
Background context: While duties can generally be freely delegated, there are exceptions. One such exception occurs when the "other party has a substantial interest in having their original promisor perform or control the acts required by the contract." This is particularly relevant in cases where the performance's source makes a significant difference.
If applicable, add code examples with explanations: N/A
:p What scenario would lead to an exception to free delegation of duties?
??x
An exception to free delegation occurs when the other party has a substantial interest in having their original promisor perform or control the acts required by the contract. For instance, if a famous artist delegates the duty to paint a portrait, even to a reputable artist, the president might object due to a significant interest in having the original artist's specific abilities.
x??

---

#### Subcontracting and Delegatee Liability
Background context: In construction contracts, delegation of duties is common through subcontracting. The prime contractor can delegate some of its duties to a subcontractor, but remains liable for performance and breach. However, if there is a substantial interest in the original promisor's performance, such as specific skills or reputation, free delegation might be limited.
If applicable, add code examples with explanations: N/A
:p Why does the prime contractor remain liable even after delegating duties?
??x
The prime contractor remains liable for performance and breach even after delegating duties because they initially promised to perform under the contract. In subcontracting, while the prime contractor delegates some of its duties to a subcontractor, it retains responsibility for overall performance and any breaches by the subcontractor.
x??

---

#### Case Study: Macke Co. v. Pizza of Gaithersburg
Background context: In the case of Macke Co. v. Pizza of Gaithersburg, Inc., Virginia initially had a contract to install and service vending machines at Pizza’s pizza shops. When Macke purchased Virginia's assets, including its duties, Pizza refused performance from Macke because it had chosen Virginia for specific skills, judgment, and reputation.
If applicable, add code examples with explanations: N/A
:p How did the court rule in Macke Co. v. Pizza of Gaithersburg?
??x
In Macke Co. v. Pizza of Gaithersburg, Inc., the trial court ruled that because Pizza had chosen Virginia for its specific skills, judgment, and reputation, the duties could not be effectively delegated to Macke. However, the appellate court noted that while services were involved, such services often do not involve a substantial difference in source, thus allowing more freedom of delegation.
x??

---

