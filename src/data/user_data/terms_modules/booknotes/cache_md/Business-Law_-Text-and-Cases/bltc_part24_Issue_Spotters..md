# Flashcards: Business-Law_-Text-and-Cases_processed (Part 24)

**Starting Chapter:** Issue Spotters. Business Scenarios and Case Problems

---

#### Statute of Frauds and E-Contracts
Background context: The Statute of Frauds is a law requiring certain contracts to be in writing. In many countries, including the United States, real estate sales are an exception where written evidence may not always be required.

:p What happens when many countries have eliminated the Statute of Frauds except for sales of real estate?
??x
In countries that have eliminated the Statute of Frauds, contracts other than those involving the sale or transfer of real estate do not need to be in writing. However, this is an exception in some jurisdictions like the United States, where specific types of agreements still require a written contract.
x??

---
#### Written Agreement after Oral Contract
Background context: The Statute of Frauds requires certain contracts to be in writing. An e-mail containing terms might suffice as a writing but must meet specific requirements.

:p Is an e-mail sent by Lang sufficient under the Statute of Frauds if Vollmer did not respond?
??x
An e-mail alone may not be sufficient because it lacks a clear indication that both parties agreed to the written terms. The Statute of Frauds typically requires mutual assent, and since Lang did not receive any response from Vollmer, there is no evidence of agreement.

To satisfy the Statute of Frauds:
```plaintext
- Must show mutual assent.
- Lack of response could indicate disagreement or silence.
```
x??

---
#### Exceptions to the Statute of Frauds for Oral Contracts
Background context: The Statute of Frauds has various exceptions, such as those involving suretyship and acknowledgment. These can provide Vollmer with a chance to enforce an oral contract.

:p Which exception would be most beneficial for Vollmer in this situation?
??x
The suretyship exception might be the best choice because it involves a promise by one party (Vollmer) to guarantee the debt of another party (Lang). If Vollmer promises to pay if Lang defaults, this could fit within the suretyship exception and allow the court to enforce the oral agreement.
x??

---
#### GamesCo and Midstate Plastic, Inc. Issue
Background context: The Statute of Frauds requires certain contracts to be in writing, particularly those involving the sale of goods over a specified value.

:p Can Midstate Plastic, Inc. enforce a deal for the full $800 with GamesCo?
??x
No, Midstate Plastic, Inc. cannot enforce an oral agreement for the full $800 because such agreements are subject to the Statute of Frauds, which requires written evidence for contracts involving the sale of goods over a certain value (typically$500 or more in most states).

To enforce the deal:
```plaintext
- Midstate would need a written contract.
- Oral agreements may not be sufficient.
```
x??

---
#### Paula and Next Corporation Issue
Background context: The Statute of Frauds also applies to contracts involving personal services, such as employment for an indefinite period.

:p Can Next Corporation enforce the oral agreement with Paula?
??x
No, Next Corporation cannot enforce the oral agreement because it falls under the Statute of Frauds. Employment agreements for more than one year must be in writing according to most state laws.

To enforce the contract:
```plaintext
- Written employment contracts are required.
- Oral agreements may not suffice.
```
x??

---
#### One-Year Rule Issue (Business Scenario)
Background context: The Statute of Frauds requires certain personal service contracts to be in writing, particularly those for more than one year.

:p Does a one-year contract between Yu and Benson fall under the Statute of Frauds?
??x
Yes, a one-year employment contract falls under the Statute of Frauds because it involves providing services for an extended period (more than one year). Therefore, this agreement must be in writing to be enforceable.

To determine enforceability:
```plaintext
- Contracts for personal services over one year need to be written.
- Oral agreements may not be sufficient.
```
x??

---
#### Collateral Promises Issue
Background context: The Statute of Frauds also applies to contracts that involve a collateral promise, such as agreeing to pay another's debt.

:p Does Mallory’s promise to the hardware store need to be in writing?
??x
No, Mallory’s promise is not required to be in writing because it involves a collateral contract. If Mallory promises to pay for her brother’s lawn mower purchase if he fails to do so, this can be enforced without needing a written agreement.

To enforce the contract:
```plaintext
- Collateral contracts do not always require a writing.
- Oral agreements may suffice.
```
x??

---
#### Parol Evidence Rule Issue
Background context: The parol evidence rule prevents parties from introducing oral or written statements that contradict a written contract.

:p What is the parol evidence rule, and how does it apply in this scenario?
??x
The parol evidence rule generally prohibits the introduction of oral agreements that contradict the terms of a valid and enforceable written contract. In the context provided, if there was a written agreement between parties, any attempt to introduce oral statements that modify or contradict the written terms would be precluded by the parol evidence rule.

To apply the rule:
```plaintext
- Written contracts are primary; oral agreements can't change them.
- Any modifications must be in writing.
```
x??

#### Assignment and Delegation
In a bilateral contract, both parties have corresponding rights and duties. One party has a right to require the other to perform some task, while the other has a duty to perform it. The transfer of contractual rights to a third party is known as an assignment, whereas the transfer of contractual duties to a third party is called a delegation.
:p What is an assignment in contract law?
??x
An assignment involves transferring one's contractual rights to a third party. When this happens, the assignor no longer retains those rights and the assignee gains the right to demand performance from the obligor.
```java
// Pseudocode for assigning rights
void assignRights(Contract contract, Assignor assignor, Assignee assignee) {
    // Transfer rights from assignor to assignee
    assignor.transferRightsTo(assignee);
}
```
x??

---

#### Obligors and Obligees
In a contractual relationship, the obligor is the party who has an obligation to perform the duty. The obligee is the party to whom that duty is owed.
:p Who is the obligor in a contract?
??x
The obligor in a contract is the party who is obligated to perform the duty specified in the contract. For example, if Brower is required to pay Horton $1,000, then Brower is the obligor because he has an obligation to make that payment.
```java
// Pseudocode for identifying the obligor
class Contract {
    private Party obligor;
    // Other fields and methods

    public Party getObligor() {
        return this.obligor;
    }
}
```
x??

---

#### Effect of Assignment on the Assignor
When rights under a contract are assigned unconditionally, the assignor's rights are extinguished. The assignee then has the right to demand performance from the other original party in the contract.
:p What happens to the assignor's rights after an unconditional assignment?
??x
After an unconditional assignment, the assignor's rights under the contract are extinguished. This means that once the assignor transfers their rights completely to the assignee, they no longer have any claim or right related to those specific contractual obligations.
```java
// Pseudocode for assigning and extinguishing rights
void unconditionallyAssignRights(Contract contract, Assignor assignor, Assignee assignee) {
    // Transfer all rights from assignor to assignee
    assignor.transferAllRightsTo(assignee);
}
```
x??

---

#### Assignment vs. Delegation
An assignment involves transferring contractual rights to a third party, while a delegation involves transferring contractual duties to a third party.
:p How does an assignment differ from a delegation?
??x
An assignment is the transfer of one's contractual rights to a third party, whereas a delegation is the transfer of one's contractual duties to a third party. For instance, in Example 17.2, Brower (the assignor) assigns his right to pay Horton ($1,000) to an assignee, who then has the right to demand performance from Horton. Conversely, if Brower were delegating his duty to pay Horton instead of assigning his rights, he would be transferring the obligation directly to another party.
```java
// Pseudocode for assignment and delegation
void assignRights(Contract contract, Assignor assignor, Assignee assignee) {
    // Transfer rights from assignor to assignee
    assignor.transferRightsTo(assignee);
}

void delegateDuties(Contract contract, Delegatee delegatee, OriginalParty originalParty) {
    // Transfer duties from assignor (original party) to delegatee
    originalParty.delegateDutyTo(delegatee);
}
```
x??

---

#### Privity of Contract and Exceptions
Traditionally, only the parties directly involved in a contract have rights and liabilities under it. This principle is known as privity of contract. However, there are exceptions where third parties can have legal standing to enforce or sue on a contract, such as product liability laws.
:p What does the concept of privity of contract mean?
??x
Privity of contract refers to the principle that only the parties directly involved in a contract have rights and liabilities under it. This means that typically, a third party who is not a direct party to a particular contract does not have any rights or obligations under that contract.

However, there are exceptions to this rule. For instance, under product liability laws, even though a person may not be the original purchaser of a defective product, they can still recover damages if injured by it.
```java
// Pseudocode for handling privity of contract with an exception
class Contract {
    private Party obligor;
    private Party obligee;

    public void enforceContract(Party party) {
        // Check if the party is within the scope of privity
        if (party == this.obligor || party == this.obligee) {
            // Allow enforcement
        } else {
            // Handle exceptions, such as third-party claims under product liability laws
            handleThirdPartyClaim(party);
        }
    }

    private void handleThirdPartyClaim(Party party) {
        if (party.isProductLiabilityClaimant()) {
            allowRecovery();
        } else {
            denyRecovery();
        }
    }
}
```
x??

---

#### When Duties Are Personal in Nature
Background context: This concept deals with situations where the performance of a contractual duty requires special trust or personal skills. In such cases, duties cannot be delegated without the consent of the obligee.

Example scenario: O'Brien contracts with Brodie for veterinary surgery on her prize-winning stallion, but Brodie later delegates this task to Lopez without O'Brien's consent.

:p Can duties be delegated when performance depends on special trust or personal skills?
??x
Duties cannot be delegated in such cases unless the obligee consents. The primary reason is that the original terms of the contract rely on a specific individual who has been trusted for their unique abilities.

```java
// Example scenario
class ContractExample {
    public void delegateSurgery(O'Brien, Brodie, Lopez) {
        if (!O'Brien.consentToDelegation()) {
            throw new Exception("Delegation not allowed without consent.");
        }
        // Proceed with delegation
    }
}
```
x??

#### When Performance by a Third Party Will Vary Materially from That Expected by the Obligee
Background context: If performance by a third party significantly differs from what was expected under the original contract, duties cannot be delegated.

Example scenario: Jared contracted Merilyn to select grant recipients but later delegated this task to Donald, whom Jared did not trust. This change materially alters Jared's expectations.

:p Can duties be delegated when the third-party performance will vary materially?
??x
Duties cannot be delegated if it significantly deviates from what was originally expected by the obligee under the contract.

```java
// Example scenario
class TrustExample {
    public void delegateSelection(Jared, Merilyn, Donald) {
        if (!Jared.trustDonald()) {
            throw new Exception("Delegation not allowed as it materially alters expectations.");
        }
        // Proceed with delegation
    }
}
```
x??

#### When the Contract Prohibits Delegation
Background context: If a contract explicitly forbids delegation through an antidelegation clause, duties cannot be delegated to another party.

Example scenario: Stark Ltd. contracted Belisario for annual audits but included an antidelegation clause in the agreement. Belisario cannot delegate this task even if she chooses to do so internally within her firm.

:p Can duties be delegated when a contract prohibits it?
??x
Duties cannot be delegated when a contract includes an explicit antidelegation clause that forbids such actions, regardless of internal arrangements.

```java
// Example scenario
class ContractProhibitionExample {
    public void delegateAudit(SarkLtd, Belisario) {
        if (SarkLtd.contractAntidelegationClause()) {
            throw new Exception("Delegation not allowed as per contract terms.");
        }
        // Proceed with delegation
    }
}
```
x??

#### Effect of a Valid Delegation on Obligations
Background context: When duties are validly delegated, the obligee must accept performance from the delegatee. The delegator remains liable for nonperformance unless there are specific exceptions.

Example scenario: Bryan delegates metal equipment delivery to Liam, and Alicia (the obligee) must accept Liam's performance, even if Liam fails to deliver.

:p What happens when duties are validly delegated?
??x
When duties are validly delegated, the obligee must accept performance from the delegatee. The delegator remains liable for nonperformance unless there are specific exceptions, such as a valid defense or agreement between parties.

```java
// Example scenario
class ValidDelegationExample {
    public void deliverEquipment(Bryan, Liam) {
        if (Bryan.delegateToLiam()) {
            if (!Liam.performDelivery()) {
                throw new Exception("Bryan is still liable for nonperformance.");
            }
        } else {
            throw new Exception("Delegation not valid or allowed.");
        }
    }
}
```
x??

---

---
#### Assignment of "All Rights"
Background context: When a contract specifies an "assignment of all rights," it often implies both an assignment of rights and a delegation of duties. Courts typically interpret such wording to mean that if the assignee fails to perform, the original party (assignor) is still liable.
:p What does the phrase "assignment of all rights" imply in a contract?
??x
The phrase "assignment of all rights" usually implies both an assignment of rights and a delegation of duties. If the assignee fails to perform the contractual obligations, the original party (assignor) remains liable for these duties.
??x

---
#### Third Party Beneficiaries
Background context: Contracts can be structured in such a way that they benefit third parties. When this happens, the third party becomes an intended beneficiary and has legal rights to sue the promisor directly if the contract is breached.
:p Who are third party beneficiaries in a contract?
??x
Third party beneficiaries are individuals or entities who are not part of the original contracting parties but are designated to receive benefits from the agreement. They can sue the promisor directly for breach of contract if their rights under the contract are violated.
??x

---
#### Promisor Identification in Bilateral Contracts
Background context: In a bilateral contract, both parties make promises that could be enforced. The court must determine which party made the promise to benefit a third party. This person is considered the promisor.
:p Who is the promisor in a bilateral contract?
??x
In a bilateral contract, the promisor is the party who makes the promise that benefits a third party. The court must identify this party as the one whose promise can be enforced directly against the other contracting parties or the third party.
??x

---
#### Case in Point: Third Party Beneficiaries
Background context: A classic case from 1859 established the right of third-party beneficiaries to sue the promisor. The case involved Holly, Lawrence, and Fox, where Fox promised to pay Holly's debt to Lawrence after borrowing $300 from Holly.
:p What is an example of a case that established the rights of third party beneficiaries?
??x
The classic 1859 case involving Holly, Lawrence, and Fox established the right of third-party beneficiaries to sue the promisor directly. In this scenario, Fox promised to pay Holly's debt to Lawrence after borrowing $300 from Holly.
??x

---
#### Assignments and Delegations - Exceptions
Background context: There are specific scenarios where assignments or delegations cannot be made. These include statutes that prohibit assignment, contracts for personal services, performance depending on the obligor’s personal skills, and prohibitions in the contract itself.
:p What exceptions exist to the rules of assignments and delegations?
??x
Exceptions to the rules of assignments and delegations include:
- Statutes expressly prohibiting assignment.
- Contracts for personal services.
- Performance that depends on the obligor's personal skills or talents.
- Special trust placed in the obligor by the other party.
- Delegation or performance that materially varies from what is expected by the obligee.
??x

---
#### Summary of Assignments and Delegations
Background context: The summary outlines key principles regarding assignments and delegations, specifying which rights can be assigned and which duties can be delegated under different conditions. It provides guidance on when assignments or delegations are permissible or prohibited.
:p Summarize the key principles for assignments and delegations?
??x
The key principles for assignments and delegations include:
- Rights to receive funds cannot be assigned.
- Ownership rights in real estate cannot be assigned without specific legal action (such as a mortgage).
- Rights to negotiable instruments are generally assignable unless prohibited by contract.
- Assignments can be prohibited if they materially alter the obligor's risk or duties.
- Delegation of all duties is allowed, but not if performance depends on personal skills or trust placed in the obligor.
??x

---

#### Legal Dispute and Third-Party Beneficiary Rights

Background context: This section discusses a legal dispute over royalties between individual band members and a record label, focusing on whether Bozzio can sue as a third-party beneficiary when the contracting corporate party (Missing Persons, Inc.) is in a suspended status. The case involves contract law principles related to third-party beneficiaries and corporate incapacity.

:p What is the main issue discussed regarding Bozzio's ability to sue?
??x
Bozzio's ability to sue as a third-party beneficiary of the recording contract when the contracting party (Missing Persons, Inc.) is in a suspended status.
x??

---

#### Contract Suspension and Third-Party Beneficiaries

Background context: The case examines whether the suspension of the promisee (the record label) affects Bozzio's right to sue as a third-party beneficiary. It also touches on the concept that contract suspensions may not necessarily bar actions by third parties.

:p How does the court rule regarding the suspended status of the corporation?
??x
The district court erred in holding that Bozzio cannot bring an action while Missing Persons, Inc. is suspended because California courts do not consider a promisee's incapacity to be an absolute bar to a lawsuit by a third-party beneficiary.
x??

---

#### Waiver and Contractual Agreements

Background context: The text also discusses whether Bozzio waived her right to sue as a third-party beneficiary due to a "look solely to" clause in the contract. This involves interpreting contractual language regarding waiver.

:p What does Capitol argue about Bozzio's ability to sue?
??x
Capitol argues that by agreeing “not to assert any claims against Capitol,” Bozzio waived her right to sue as a third-party beneficiary.
x??

---

#### Third-Party Beneficiary Rights and Contract Language

Background context: The court discusses whether the "look solely to" clause was intended to prohibit an artist from asserting a claim only in specific internal disputes, not broadly.

:p What is Bozzio's interpretation of the "look solely to" clause?
??x
Bozzio interprets the "look solely to" clause as prohibiting claims against Capitol only when there is a dispute among individual band members over the internal allocation and distribution of royalties that have already been properly accounted for and paid by the record label.
x??

---

#### Legal Precedents and Jurisdiction

Background context: The court references the role of state supreme courts in interpreting contract law, particularly in diversity jurisdiction cases. It also mentions guidance from intermediate appellate courts when state supreme courts have not decided an issue.

:p What is the significance of California Supreme Court and intermediate appellate court decisions?
??x
In diversity jurisdiction, this court will follow a state supreme court’s interpretation of contract law if it has decided on an issue. If not, guidance can be found in decisions by intermediate appellate courts. Here, since the California Supreme Court has not addressed whether a promisee corporation's suspended status precludes third-party beneficiary suit, the lower court erred.
x??

---

#### Legal Remand and Further Considerations

Background context: The case is remanded to allow for further development of evidence that can determine if Bozzio was an intended third-party beneficiary and if she has any claims.

:p What action does the court take regarding Bozzio's claim?
??x
The district court’s determination that a third-party beneficiary cannot sue when the promisee (Missing Persons, Inc.) is suspended is reversed. The case is remanded to develop a record that will allow consideration of Bozzio's claim.
x??

---

