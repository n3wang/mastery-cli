# Flashcards: Business-Law_-Text-and-Cases_processed (Part 26)

**Starting Chapter:** Terms and Concepts. Issue Spotters. Business Scenarios and Case Problems

---

---
#### Discharge by Performance
Contracts are discharged when both parties have fully performed their obligations. If one party has not yet begun to perform, they can typically call off the deal unless specific conditions prevent it.

:p Can Ready Foods and Stealth Distributors cancel their contract before performance?
??x
Yes, if neither party has started performing, either party can cancel the contract without breaching it. However, once Stealth has shipped the pizzas, cancellation may not be possible without breaching the contract.
```java
// Pseudocode to illustrate non-performance scenario
if (readyFoods.hasPerformed || stealth.hasPerformed) {
    throw new ContractException("Cannot cancel after performance");
} else {
    // Both parties can agree on cancellation
}
```
x??
---

#### Discharge by Agreement
An agreement between the contracting parties to substitute a new contract for an old one, or to terminate an existing contract, is called discharge by agreement. This involves mutual consent and often results in the original obligations being discharged.

:p What type of agreement did C&D Services enter into with Ace Concessions, Inc.?
??x
This agreement was a novation. A novation occurs when all parties agree to replace the old contract with a new one, effectively discharging the original debtor (C&D Services) from its obligations under the old contract.
```java
// Pseudocode for Novation Agreement
if (aceConsentsToNovation && deanVendingServicesAgrees && cAndDServicesTerminatesObligations) {
    dischargeOldContract();
    createNewContract(deanVendingServices);
}
```
x??
---

#### Conditions of Performance
Conditions in a contract are events or actions that must occur before performance is due. A condition precedent requires the occurrence of an event before the duty to perform arises, while a condition subsequent can release the duty to perform if it ceases.

:p Discuss Faithful Construction’s obligations to the Caplans given the specifications and their actions.
??x
Faithful Construction's obligation to use Crane brand plumbing fixtures was a condition precedent. By substituting Kohler brand fixtures, which are equivalent in the industry, they fulfilled this condition. However, the Caplans may still refuse acceptance because the substitution is not in line with their expectations set by the specifications. This dispute could be resolved if the contract explicitly stated that failure to use Crane brand would result in non-acceptance.
```java
// Pseudocode for Condition Precedent Handling
if (!faithfulUsedCraneFixtures) {
    // Check contract terms for acceptance conditions
    if (caplansAcceptNonCraneFixtures || equivalentFixturesAccepted(caplans, fixtures)) {
        acceptHouse();
    } else {
        refuseHouse();
    }
}
```
x??
---

#### Discharge by Agreement: Novation vs. Accord and Satisfaction
Discharge by agreement can take the form of a novation or an accord and satisfaction. A novation involves replacing the original contract with a new one, while an accord and satisfaction occurs when parties agree to substitute performance for existing obligations.

:p Is Junior's arrangement with Iba a novation or an accord and satisfaction?
??x
This transaction is an accord and satisfaction. An accord and satisfaction requires mutual agreement on a new performance that discharges the original debt. In this case, Fred offered a new payment plan (accord) to discharge Junior’s liability for the $1,000 debt.
```java
// Pseudocode for Accord and Satisfaction
if (ibaAgreesToForgiveDebt && juniorCannotPayOriginalAmount) {
    acceptNewPaymentPlan();
    dischargeOriginalDebt();
}
```
x??
---

#### Impossibility of Performance
Impossibility of performance refers to a situation where the contract becomes impossible to perform due to external events. This can include commercial impracticability, which occurs when performance has become excessively difficult or expensive.

:p Which concept might allow Val's to refuse to perform the basil contract if the basil does not pass the chemical-residue inspection?
??x
Commercial impracticability could be used by Val’s to refuse performance. If the basil fails a critical quality check (chemical residue), and continuing with the contract would make it commercially impracticable, Val’s might argue that they can terminate or modify the contract.
```java
// Pseudocode for Commercial Impracticability
if (basilFailsInspection && continuesPerformanceWouldBeExcessivelyDifficult) {
    terminateContract();
}
```
x??
---

#### Frustration of Purpose and Impossibility of Performance
Frustration of purpose occurs when an event outside the control of either party makes it impossible to achieve the contract's underlying purpose. This is similar to impossibility of performance but focuses on the outcome rather than the physical impossibility.

:p Under which legal theory might Sun Farms claim that its obligation under the contract has been discharged by operation of law?
??x
Sun Farms could argue frustration of purpose or commercial impracticability as a legal theory for discharge. If Sun Farms was unable to deliver the required amount due to an unforeseeable event, such as a global shortage, they might claim their obligations are discharged.
```java
// Pseudocode for Frustration of Purpose and Commercial Impracticability
if (globalShortage || inabilityToDeliverRequiredAmount) {
    dischargeObligationByFrustration();
}
```
x??
---

#### Impossibility of Performance in a Limited Scenario
Impossibility of performance can also apply if the original terms cannot be met, but a partial performance is still possible. This would depend on whether 1,475 pounds of basil is sufficient for Val's needs.

:p Would Sun Farms fulfill its obligations to Val’s by shipping only 1,475 pounds?
??x
Whether this fulfills Sun Farms’ obligations depends on the terms of the contract and their purpose. If 1,475 pounds are not enough to meet Val’s requirements or expectations, then it would likely be considered a breach. However, if this quantity is sufficient for Val’s needs, it might discharge Sun Farms from further obligations.
```java
// Pseudocode for Partial Performance Evaluation
if (1475PoundsSatisfyRequirements) {
    fulfillObligation();
} else {
    continueNegotiationsForAdditionalSupply();
}
```
x??

---
#### Breach of Contract and Remedies

Background context: When one party breaches a contract, the nonbreaching party can choose from several remedies. These remedies are aimed at providing relief to the innocent party when the other party has breached the contract.

:p What is a remedy in the context of breach of contract?
??x
A remedy is the relief provided for an innocent party when the other party breaches the contract. It serves as a means employed to enforce a right or redress an injury.
x??

---
#### Common Remedies

Background context: The most common remedies available to a nonbreaching party include damages, rescission and restitution, specific performance, and reformation.

:p What are the four main types of remedies in contract law?
??x
The four main types of remedies are:
1. Damages
2. Rescission and restitution
3. Specific performance
4. Reformation
x??

---
#### Types of Damages

Background context: In contract law, damages serve to compensate the nonbreaching party for the loss of the bargain. There are four broad categories of damages: compensatory, consequential, punitive, and nominal.

:p What are the four types of damages in contract law?
??x
The four types of damages are:
1. Compensatory (to cover direct losses and costs)
2. Consequential (to cover indirect and foreseeable losses)
3. Punitive (to punish and deter wrongdoing)
4. Nominal (to recognize wrongdoing when no monetary loss is shown)
x??

---
#### Compensatory Damages

Background context: Compensatory damages are designed to compensate the nonbreaching party for the loss of the bargain caused by the breach of contract.

:p What are compensatory damages in contract law?
??x
Compensatory damages are those that compensate the nonbreaching party for the loss of the bargain caused by the breach of contract. These damages replace what was lost due to the wrong or damage, aiming to "make the person whole."
x??

---
#### Case in Point 19.1

Background context: This case involves Janet Murley and Hallmark Cards, Inc., where Murley breached her non-compete agreement by taking a job with another company and disclosing confidential information.

:p What was Janet Murley's breach of contract?
??x
Janet Murley breached her contract by:
- Working in the greeting card industry after 18 months (violating a non-compete clause)
- Disclosing Hallmark's confidential information to Recycled Paper Greetings.
x??

---

#### Minority Rule in Contractual Disputes
Background context: The minority rule refers to a legal approach that does not grant purchasers of goods or services the benefit of the bargain if they fail to complete the transaction. Instead, it restores them to their original position.

:p What is the impact of the minority rule on buyers who do not fulfill contractual obligations?
??x
The minority rule effectively returns purchasers to the positions they occupied prior to the sale, rather than giving them the benefit of the bargain. This means that if a buyer breaches a contract, they are generally only required to return any benefits received and may not claim any additional compensation.
x??

---

#### Measure of Damages in Construction Contracts
Background context: The measure of damages in construction contracts varies depending on which party breaches the contract and when the breach occurs.

:p In what situations can the owner of a construction project recover damages from the contractor?
??x
The owner can recover damages if they breach the contract at different stages:
- Before performance begins, the contractor can recover profits (total contract price less cost of materials and labor).
- During performance, the contractor can recover profits plus costs incurred in partially constructing the building.
- After completion, the contractor can recover the entire contract price plus interest.

In each case, the goal is to return the non-breaching party to their original position.
x??

---

#### Measure of Damages for Contractor Breach
Background context: If a construction contractor breaches the contract by failing to begin or stop work partway through the project, the measure of damages is typically the cost of completion.

:p What are the damages in case a contractor fails to complete a construction project?
??x
If a contractor fails to complete a construction project, the measure of damages is the cost of completion. This includes reasonable compensation for any delay in performance. If the contractor finishes late, the measure of damages may also include loss of use.

Example:
```java
public class ConstructionDamageCalculation {
    private double totalContractPrice;
    private double estimatedCostOfCompletion;

    public void calculateDamages() {
        // Calculate costs and delays
        double costOfCompletion = getEstimatedCostOfCompletion();
        double damages = costOfCompletion + delayCompensation();

        System.out.println("Total Damages: " + damages);
    }

    private double getEstimatedCostOfCompletion() {
        return totalContractPrice * 1.2; // Assume 20% increase due to delays
    }

    private double delayCompensation() {
        return estimatedDelayInDays * dailyLossRate;
    }
}
```
x??

---

#### Damages for Breach by Both Parties
Background context: When both the construction contractor and owner fail to meet their obligations, courts attempt to strike a fair balance in awarding damages.

:p How are damages calculated when both parties breach a construction contract?
??x
When both the construction contractor and owner breach the contract, the court aims for a fair balance. This may involve adjusting the damages owed based on the contributions of each party to the breach. The specific calculation will depend on the extent of non-performance by each party.

Example:
```java
public class DualBreachDamageCalculation {
    private double contractorPerformanceRate;
    private double ownerPerformanceRate;

    public void calculateBalancedDamages() {
        // Calculate damages based on performance rates
        double balancedDamages = (contractorPerformanceRate + ownerPerformanceRate) / 2;

        System.out.println("Balanced Damages: " + balancedDamages);
    }
}
```
x??

---

#### Consequential Damages in Breached Contracts
Background context: Consequential damages, or special damages, are damages that arise as a result of the breach and are foreseeable by both parties at the time of contract formation.

:p What are consequential damages in the context of construction contracts?
??x
Consequential damages, also known as special damages, are damages that result from a party’s breach of contract. These damages are foreseeable and typically include indirect costs such as lost profits or additional expenses incurred due to the breach. They must be shown to have been reasonably predictable by both parties at the time the contract was formed.

Example:
```java
public class ConsequentialDamageCalculation {
    private double directLoss;
    private double indirectLoss;

    public void calculateConsequentialDamages() {
        // Calculate total consequential damages
        double totalConsequentialDamages = directLoss + indirectLoss;

        System.out.println("Total Consequential Damages: " + totalConsequentialDamages);
    }
}
```
x??

---

#### Nominal Damages

Nominal damages are awarded when a breach of contract occurs, but there is no actual monetary loss. The amount is typically small (often just one dollar) to establish that the defendant acted wrongfully.

:p What are nominal damages used for?
??x
Nominal damages are used in cases where there has been a technical injury due to a breach of contract, but no real financial harm was suffered by the plaintiff.
x??

---

#### Mitigation of Damages

Mitigation of damages is a principle that requires an injured party to take reasonable steps to minimize their losses after a breach of contract.

:p What is the duty to mitigate in contracts?
??x
The duty to mitigate requires that an injured party takes reasonable actions to reduce the losses caused by a breach of contract. For example, landlords must try to find new tenants if a current tenant abandons the premises.
x??

---

#### Mitigation in Rental Agreements

In rental agreements, if a tenant leaves and fails to pay rent, the landlord has a duty to mitigate damages by finding an acceptable new tenant as quickly as possible.

:p What does a landlord need to do after a tenant vacates?
??x
A landlord must use reasonable means to find a new tenant. If an acceptable tenant is found, the landlord should lease the premises to this new tenant and the original tenant remains liable for the difference between the rent under the original lease and what was received from the new tenant.
x??

---

#### Mitigation in Employment Contracts

In employment contracts, a wrongfully terminated employee has a duty to mitigate damages by taking a similar job if one is available.

:p What is the duty of an employee after wrongful termination?
??x
An employee who has been wrongfully terminated must take reasonable steps to find similar employment. The damages awarded will be equivalent to the former salary less income from a comparable position obtained through reasonable efforts.
x??

---

#### Liquidated Damages vs Penalties

Liquidated damages are predetermined in a contract for future breaches, while penalties are designed to punish the breaching party rather than compensate.

:p What is the difference between liquidated damages and penalties?
??x
Liquidated damages are pre-established amounts agreed upon by both parties in case of a breach. They aim to compensate the injured party. Penalties, on the other hand, are also pre-determined but intended as punishment for breaching the contract.
x??

---

#### Hadley v. Baxendale Case

The principle that limits the recovery of damages to foreseeable losses was first established in this landmark case.

:p What is the significance of the Hadley v. Baxendale case?
??x
Hadley v. Baxendale (1854) set a precedent for limiting recoverable damages to those which were reasonably foreseeable at the time the contract was made.
x??

---

#### Liquidated Damages Provisions in Construction Contracts
Construction contracts often include provisions where a contractor agrees to pay a fixed amount for each day they are late. These clauses are known as liquidated damages provisions.
:p What is an example of a liquidated damages provision used in construction contracts?
??x
An example of a liquidated damages provision would be requiring a construction contractor to pay $300 per day if the project is completed after the agreed-upon deadline. This amount is predetermined and serves as compensation for delays.
x??

---
#### Liquidated Damages Provisions in Employment Contracts
Employment contracts can also include liquidated damages provisions, where an employee agrees to pay a specified sum upon termination under certain conditions.
:p How does the liquidated damages provision work in Johnny Chavis's employment contract with LSU?
??x
Johnny Chavis’s employment contract with LSU had a clause stating that if he quit within 11 months of his contract term remaining, he would owe no damages. If he left after more than 11 months remained, he was required to pay $400,000 in liquidated damages. Despite starting recruitment at Texas A&M before February 1st, Chavis claimed he did not owe any damages and argued for unused vacation pay and performance bonuses.
x??

---
#### Equitable Remedies
Equitable remedies are used when monetary damages (money paid to a party) do not fully compensate the non-breaching party. Courts can order various equitable remedies such as rescission, restitution, specific performance, or reformation.
:p What is an example of an equitable remedy?
??x
An example of an equitable remedy is rescission, which allows the non-breaching party to terminate a contract and return to their pre-contractual position. In the case of Johnny Chavis, if he and LSU could not agree on renewing his contract, rescission would allow either party to terminate the agreement.
x??

---
#### Unilateral Rescission
Unilateral rescission is an action by one party to undo a contract, returning both parties to their pre-contractual positions. It can be available due to factors like fraud, mistake, duress, or misrepresentation.
:p When might unilateral rescission be applicable?
??x
Unilateral rescission may be applicable when there has been fraud, mistake, duress, undue influence, or misrepresentation that affects the contract's validity. For example, if Johnny Chavis and LSU disagreed on terms for renewing his employment contract, either party could seek to rescind the agreement unilaterally.
x??

---
#### Mutual Rescission
Mutual rescission is an agreement between both parties to terminate a contract, which can discharge the contract completely. Unilateral rescission, in contrast, allows one party to undo the contract without the other's consent.
:p How does mutual rescission differ from unilateral rescission?
??x
Mutual rescission involves both parties agreeing to terminate the contract, thereby fully discharging it. In contrast, unilateral rescission is when only one party wants to undo the contract, typically due to issues like fraud or misrepresentation. For instance, in Johnny Chavis's case, mutual rescission would require both LSU and Chavis to agree on terminating his employment.
x??

---
#### Rescission and Restitution
Rescission involves undoing a contract to return parties to their pre-contractual positions. Restitution is another equitable remedy that aims to rectify any unfair benefit gained by one party due to the other's breach.
:p What is restitution in the context of contract breaches?
??x
Restitution aims to restore any unjust enrichment or benefits received by one party as a result of a breach. For example, if Johnny Chavis was improperly compensated during his employment with LSU, restitution could be ordered to correct this imbalance.
x??

---
#### Specific Performance
Specific performance is an equitable remedy where the court orders a party to fulfill their contractual obligations rather than paying damages for non-performance.
:p What does specific performance entail?
??x
Specific performance requires the breaching party to carry out their exact contractual duties, such as delivering specific goods or performing particular services. For instance, if Johnny Chavis had breached his contract by accepting a position with Texas A&M without proper notice, specific performance might compel him to return to LSU and complete his contractual obligations.
x??

---
#### Reformation
Reformation is another equitable remedy where the court orders changes in the terms of an existing contract due to a mutual mistake or legal defect. It aims to correct errors that may have been present during contract formation.
:p Can you give an example of when reformation might be used?
??x
Reformation might be used if both parties had a mutual mistake about key terms in their agreement, such as the scope of work or payment terms. For instance, if Johnny Chavis and LSU had a misunderstanding about his duties that led to discrepancies in the contract, reformation could correct these errors.
x??

---

