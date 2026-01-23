# Flashcards: Business-Law_-Text-and-Cases_processed (Part 25)

**Starting Chapter:** Terms and Concepts. Issue Spotters. Business Scenarios and Case Problems

---

---
#### Assignment and Delegation - Brian's Case
Background context: In this scenario, Brian owes Jeff $1,000. Ed tells Brian to give him the money, and Ed will pay Jeff. However, Ed does not follow through with his promise. This case deals with assignments and delegations.
:p Can Jeff successfully sue Ed for the $1,000 in this scenario?
??x
Jeff cannot successfully sue Ed because he is not a party to the original agreement between Brian and Ed. The money transfer from Brian to Ed was an assignment of debt, but the original debtor (Brian) did not obtain any benefit from Ed's promise to pay Jeff. Since Jeff is not mentioned in this agreement, his standing as a third party beneficiary or assignee is not established.
```java
// Pseudocode for understanding the concept
public class DebtAssignment {
    public void handleDebtTransfer(String debtor, String newPayee, String originalCreditor) {
        // Check if the new payee (Ed) fulfills the debt to the original creditor (Jeff)
        if (!newPayee.hasPaid(originalCreditor)) {
            System.out.println("Original creditor cannot sue for payment.");
        }
    }
}
```
x??
---

#### Assignment and Delegation - Eagle Company's Case
Background context: In this case, Eagle Company contracts with Frank to build a house. The contract explicitly states that any assignment of the contract renders it void. Later, Eagle assigns its right to payment to Good Credit Company.
:p Can Good Credit enforce the contract against Frank?
??x
Good Credit cannot enforce the contract against Frank because the original contract was assigned in a manner that rendered the contract void according to the terms set by the original agreement between Eagle and Frank. This is an example of a restriction on assignment, where the debtor (Eagle) has agreed not to allow its rights under the contract to be transferred.
```java
// Pseudocode for understanding the concept
public class ContractAssignment {
    public boolean canAssignContract(String assignor, String assignee, String originalCreditor) {
        if (!originalCreditor.contractAllowsAssignment()) {
            return false;
        }
        // Check other conditions such as notice and consent from the creditor
        return true;
    }
}
```
x??
---

#### Third Party Rights - Hensley's Mortgage Sale
Background context: In this scenario, Hensley sells her house to Sylvia, assuming the mortgage debt still owed to Thrift Savings and Loan. The mortgage contract did not prohibit the assignment of the mortgage.
:p Can Jackson delegate her duty to maintain the buildings to Dunn?
??x
Jackson can delegate her duty to maintain the buildings to Dunn because delegation allows a party to transfer their contractual duties to another party, provided it does not violate any terms or conditions in the original agreement. In this case, there is no restriction mentioned in the contract that would prevent Jackson from delegating her maintenance duties.
```java
// Pseudocode for understanding the concept of delegation
public class BuildingMaintenance {
    public void delegateMaintenanceTo(String maintainer) {
        if (!originalAgreementAllowsDelegation()) {
            throw new Exception("Cannot delegate maintenance.");
        }
        assignMaintainer(maintainer);
    }
}
```
x??
---

#### Third Party Rights - Hensley's Maintenance Duty
Background context: Jackson delegates her duty to maintain the buildings to Dunn, but Dunn fails to perform his task.
:p Who can be held liable for Dunn’s failure to fix the ceiling, Jackson or Dunn?
??x
Jackson can be held liable because she is the party who delegated the maintenance duties to Dunn. Even though Dunn failed to perform his assigned tasks, he was acting on Jackson's behalf, and Jackson remains responsible under the original agreement.
```java
// Pseudocode for understanding liability in delegation scenarios
public class MaintenanceLiability {
    public void assignMaintainerAndCheckResponsibility(String maintainer) {
        if (!maintainer.hasPerformedMaintenance()) {
            System.out.println("The original party (Jackson) is liable.");
        }
    }
}
```
x??
---

#### Third Party Rights - Third Party Beneficiaries
Background context: Faught, a customer in the restaurant, seeks to sue Jackson for failing to ensure that the lease provision requiring insurance was enforced.
:p Was Faught an intended third party beneficiary of the lease between Jackson and McCall?
??x
Faught cannot be considered an intended third party beneficiary because the lease specifically states that tenants are responsible for securing necessary insurance policies. The terms do not indicate that Jackson has any duty to ensure the tenant obtains or enforces this provision.
```java
// Pseudocode for understanding third party beneficiaries
public class ThirdPartyBeneficiaries {
    public boolean isIntendedThirdPartyBeneficiary(String beneficiary, String leaseProvision) {
        if (!leaseProvision.includesBenevolentObligationTo(beneficiary)) {
            return false;
        }
        // Check other conditions to confirm intent
        return true;
    }
}
```
x??
---

#### Conditions Precedent
Background context: In contracts, a condition precedent is an event that must be fulfilled before one party can demand performance from another. If this event does not occur, the contractual obligations are discharged. The Restatement (Second) of Contracts defines a condition as "an event, not certain to occur, which must occur, unless its nonoccurrence is excused, before performance under a contract becomes due."

:p What is a condition precedent?
??x
A condition precedent is an event that must be fulfilled before one party can demand performance from another. If the specified event does not occur, the contractual obligations are discharged.
x??

---

#### Example of Conditions Precedent
Background context: The example provided involves James Maciel leasing an apartment in a university-owned housing facility for Regent University (RU) students. The lease agreement is conditioned on Maciel maintaining his status as a student at RU.

:p What happened when Maciel intended to withdraw from the university?
??x
When Maciel intended to withdraw, the university informed him that he had to move out of the apartment by May 31, which was the final day of the semester. The lease contract included a condition precedent (being enrolled as a student) that ceased to be satisfied upon his withdrawal.
x??

---

#### Discharge Through Performance
Background context: Discharging contractual duties is often achieved through performance. This means that when both parties fulfill their obligations under the contract, it terminates automatically.

:p What are the steps for discharging a contract via performance in the provided example?
??x
In the given example, a buyer and seller entered into an agreement via e-mail to sell a Lexus RX for $48,000. The contract is discharged by performance when the buyer pays$48,000 to the seller, and the seller transfers possession of the Lexus to the buyer.
x??

---

#### Conditions in Contracts
Background context: There are three types of conditions that can be present in contracts: conditions precedent, conditions subsequent, and concurrent conditions. Additionally, these conditions can be classified as express or implied.

:p What does a condition in a contract typically involve?
??x
A condition in a contract is a qualification based on a possible future event. The occurrence or nonoccurrence of this event will either trigger the performance of a legal obligation or terminate an existing one.
x??

---

#### Conditions Subsequent
Background context: Not explicitly mentioned in the provided text, but it's relevant to understand the full scope of conditions within contracts. A condition subsequent is an event that can discharge the obligations of both parties if and when it occurs.

:p Can you describe a scenario for a condition subsequent?
??x
A condition subsequent would be applicable if, after the contract has been entered into, some future event could occur that would allow one or both parties to terminate their contractual obligations. For example, in an employment contract, a clause might state that the employer can terminate the contract if the employee commits a serious violation.
x??

---

#### Concurrent Conditions
Background context: Not explicitly mentioned in the provided text, but important for a complete understanding of conditions within contracts. Concurrent conditions are those where both parties must perform their obligations simultaneously or at least concurrently.

:p Can you provide an example of concurrent conditions?
??x
An example of concurrent conditions might be a real estate transaction where the seller must deliver the property and transfer ownership to the buyer, while the buyer simultaneously pays the agreed-upon purchase price.
x??

---

#### Implied Conditions
Background context: While not explicitly mentioned in the text, implied conditions refer to those that are understood from the nature of the contract without being expressly stated.

:p How do implied conditions differ from express conditions?
??x
Implied conditions are those that are understood from the nature and purpose of the contract without needing explicit mention. Express conditions, on the other hand, are clearly and explicitly written in the contract.
x??

---

#### Case Study: Maciel v. Commonwealth of Virginia
Background context: The case study involves James Maciel's appeal against his conviction for trespassing after he was required to vacate a university-owned apartment.

:p What did the court determine regarding Maciel’s legal authority?
??x
The reviewing court determined that being enrolled as a student at Regent University (RU) was a condition precedent to living in its student housing. Since this condition ceased when Maciel intended to withdraw, he had no "legal authority" to remain and occupy the apartment beyond May 31.
x??

---

---
#### Complete Performance
Background context explaining the concept. When a party performs exactly as agreed, their performance is considered complete. Normally, conditions expressly stated in a contract must fully occur for complete performance to take place. Any deviation from these terms breaches the contract and discharges the other party's obligation to perform.
:p What happens when a builder fails to meet specific construction specifications?
??x
If the builder fails to meet the specified conditions, their performance is not complete, which can result in the other party (e.g., the homeowner) being discharged from their duty to pay. This failure constitutes a breach of contract unless the specifications were not explicitly made a condition.
x??

---
#### Substantial Performance
Background context explaining the concept. A party who performs substantially all of the terms of a contract can enforce it under the doctrine of substantial performance, even if there are minor defects or omissions.
:p What does the doctrine of substantial performance allow?
??x
The doctrine of substantial performance allows a party to recover payment from another party when they have performed most of their obligations in good faith and the remaining issues are not significant enough to discharge the other party's duty to perform. The key requirements include performing in good faith, ensuring the performance is substantially similar to what was promised, and creating benefits that are substantially the same as those agreed upon.
x??

---
#### Effect on Duty to Perform
Background context explaining the concept. If one party’s performance is substantial, it does not discharge the other party's duty to perform. The other party must still fulfill their obligations under the contract unless there are significant issues that justify withholding payment or performance.
:p What happens if one party substantially performs a contract?
??x
If one party substantially performs a contract, it does not affect the other party’s duty to perform. The other party remains obligated to complete their part of the agreement as long as the substantial performance is in good faith and creates benefits that are similar to those promised.
x??

---
#### Case in Point: Angele Jackson Guient and Borjius Guient
Background context explaining the concept using the case study. In this scenario, Sterling Doucette and Doucette & Associated Contractors were contracted by Angele Jackson Guient and Borjius Guient to build a new home. The contract required certain specifications that were not fully met.
:p What was the outcome of the lawsuit in this case?
??x
The state appellate court held that Doucette was not entitled to recover the remaining $17,700 because the work did not pass inspections and additional work had to be done by other subcontractors. Therefore, Doucette could not claim substantial performance.
x??

---
#### Differentiation of Concepts
Background context explaining the distinction between complete and substantial performance. Complete performance requires exact adherence to contract terms, while substantial performance allows for minor deviations that do not significantly alter the benefits promised in the contract.
:p How does complete performance differ from substantial performance?
??x
Complete performance requires strict adherence to all conditions stated in the contract, with any deviation constituting a breach and discharging the other party's duty to perform. In contrast, substantial performance allows for minor deviations that do not significantly alter the benefits promised, enabling recovery of payment as long as the performance is substantially similar.
x??

---

---
#### Mason's Contract with Jen
Background context: Mason signs a contract to mount a new heat pump on a concrete platform for Jen, which typically requires performance to the satisfaction of a reasonable person. However, if the contract specifies that the work must be satisfactory to a third party with superior knowledge in the subject matter (like an engineer), courts may require personal satisfaction from this third party.
:p What type of contract standard does Mason's agreement with Jen most likely follow?
??x
The typical standard for such contracts is one where performance is required to satisfy a reasonable person. In the absence of specific contractual language, courts generally apply this standard unless there are compelling reasons (such as superior knowledge) to impose a higher satisfaction requirement.
??x
---

---
#### Material Breach of Contract
Background context: A material breach occurs when contract performance is not at least substantial. The nonbreaching party can be excused from their duties and may sue for damages resulting from the breach. This concept differentiates between minor (nonmaterial) breaches, where the nonbreaching party’s duty to perform is suspended but not entirely excused.
:p What defines a material breach in contract law?
??x
A material breach of contract occurs when performance is not at least substantial. In such cases, the nonbreaching party can be excused from their contractual duties and may sue for damages resulting from the breach. The key aspect here is that the performance failure significantly impacts the overall value or purpose of the contract.
??x
---

---
#### Garth Brooks' Donation Case
Background context: Garth Brooks donated $500,000 to a hospital to build a women's health center in his mother’s name. After several years, the health center was not built as promised, leading to a lawsuit where a jury determined that this failure was a material breach of contract.
:p What did the court's decision imply about the nature of Garth Brooks' donation agreement?
??x
The court's decision implied that the hospital’s failure to build the women's health center and name it after Brooks's mother constituted a material breach of the contract. This means the hospital failed in its substantial obligation, entitling Brooks to seek damages.
??x
---

---
#### Material vs Minor Breach - Kohel v. Bergen Auto Enterprises, L.L.C.
Background context: Plaintiffs Marc and Bree Kohel entered into a sales contract with Wayne Mazda for a used 2009 Mazda. After taking possession of the car, they discovered the VIN tag was missing, leading to potential disputes over whether this constituted a material or minor breach.
:p Which party’s breach was considered material in the Kohel case?
??x
In the Kohel case, while both parties might have been at fault for different reasons (e.g., plaintiffs for not ensuring the car’s condition before taking possession and Wayne Mazda for failing to properly secure the VIN tag), the critical question is whether the missing VIN tag constituted a material breach. If the missing VIN tag significantly impacted the contract's core purpose or terms, it would be considered material.
??x
---

#### Material Alteration of the Contract
Background context: When one party unilaterally alters a written contract without the other party's consent, and such alteration is material (e.g., changing the quantity or price), the innocent party may be discharged from their contractual obligations. This principle discourages parties from tampering with contracts.

:p What happens when one party unilaterally makes a material alteration to a written contract without the consent of the other party?
??x
The innocent party can treat the contract as discharged because the alteration is material and未经对方同意单方面修改了合同中的重要条款，无辜方可以解除其在合同下的义务。
x??

---

#### Statutes of Limitations
Background context: Statutes of limitations restrict how long a party has to bring legal action for specific types of claims. These periods vary depending on the type of contract and can significantly impact whether a lawsuit can be filed successfully.

:p What is a statute of limitations, and what are some typical timeframes for different types of contracts?
??x
A statute of limitations sets a deadline for filing a lawsuit based on a particular claim. For oral contracts, it's usually two to three years, while for written contracts, it’s four to five years. Lawsuits for contract breaches related to the sale of goods must be filed within four years after the breach occurs.
x??

---

#### Bankruptcy
Background context: A bankruptcy proceeding aims to fairly distribute a debtor's assets among creditors and discharge the debtor from most contractual obligations.

:p What happens during a bankruptcy discharge, and how does it affect contracts?
??x
During a bankruptcy discharge, the debtor is relieved of most contractual obligations. Partial payment after discharge will not revive the debt.
x??

---

#### Impossibility of Performance
Background context: If an event occurs that makes performance impossible (objective impossibility) or if a party cannot perform due to unforeseen circumstances beyond their control, this can lead to the discharge of a contract.

:p How does the doctrine of impossibility of performance work in contract law?
??x
The doctrine applies when it was objectively impossible for the parties to foresee an event that renders performance impossible. For example, if a fire destroys the goods after the contract is made, making delivery impossible. Subjective impossibility (e.g., due to unforeseen personal issues) does not qualify.
x??

---

#### Temporary Impossibility of Performance
Background context: The doctrine of impossibility of performance is applied only when the parties could not have reasonably foreseen, at the time the contract was formed, the event or events that rendered performance impossible. In some cases, courts may seem to go too far in holding that the parties should have foreseen certain events or conditions.

:p What is an example of temporary impossibility of performance?
??x
Hurricane Katrina causing damage to Keefe Hurwitz's home, making it temporarily impossible for him to sell it as originally agreed. The court ruled that this was a temporary impossibility, and Hurwitz was required to repair the house before selling.
x??

---

#### Substantial Burden Due to Change in Circumstances
Background context: Sometimes, changes in circumstances make performance of the contract substantially more burdensome for the parties involved. In such cases, the contract can be discharged.

:p Can you provide an example where a change in circumstances led to discharge of a contract?
??x
In 1942, Gene Autry was drafted into the U.S. Army during his contract with a Hollywood movie company. After World War II ended, performing the contract would have been substantially more burdensome due to inflation. Thus, the contract was discharged.
x??

---

#### Courts' Role in Determining Impossibility of Performance
Background context: The ability to use the impossibility of performance as a defense can vary depending on how courts rule. Historically, courts were reluctant to discharge contracts even when performance appeared impossible.

:p How have courts historically viewed the doctrine of impossibility of performance?
??x
Until the latter part of the nineteenth century, courts were generally reluctant to discharge a contract even if performance appeared impossible. However, today's courts are more likely to allow parties to raise this defense.
x??

---

#### Freedom of Contract vs. Enforcing Contracts
Background context: When applying the doctrine of impossibility of performance, courts must balance the freedom of parties to enter into contracts and assume risks against the potential injustice of enforcing certain obligations.

:p How do courts balance the principles of freedom of contract and enforcement in cases involving impossibility?
??x
Courts balance the freedom of parties to contract (and thereby assume risks) with the potential injustice that may result if certain contractual obligations are enforced. They seek to ensure fairness while not overburdening parties.
x??

---

#### Consequences of Increasingly Acceptance of Impossibility as a Defense
Background context: If courts increasingly accept impossibility of performance as a defense, it could affect the predictability and reliability of contracts.

:p What might be a long-term consequence for those entering into contracts if courts more frequently accept impossibility of performance?
??x
If courts increasingly accept impossibility of performance as a valid defense, individuals and businesses may become less willing to enter into long-term contracts due to the uncertainty. This could lead to reduced economic activity and less risk-taking.
x??

---

