# Flashcards: Contract-Law-For-Dummies_processed (Part 7)

**Starting Chapter:** The Doctrine of Reliance Looking for a Promise That Induced Action

---

#### Claim Based on Restitution
Background context: In the absence of a contract, restitution arises when one party confers a benefit on another without intending it as a gift or forcing it on the other party. If the person who received the benefit was unjustly enriched, then the law requires that she disgorge (relinquish) the benefit, returning each party to their position before the benefit was conferred.
The Restatement of Contracts provides guidance for these situations through promissory estoppel, which is discussed later in this chapter.

:p What is restitution and how does it work in cases without a formal contract?
??x
Restitution arises when one party confers a benefit on another without intending it as a gift or forcing it. If the recipient is unjustly enriched by receiving this benefit, they must return the benefit to its rightful owner to avoid injustice. This principle can be enforced even if no formal contract exists.

In legal terms:
- The recipient of the benefit was unjustly enriched.
- Disgorgement (relinquishing) the benefit is required to prevent unjust enrichment and restore both parties to their original positions.

Example: If Party A mistakenly pays money intended for a third party, Party B, and Party B keeps the money, they are unjustly enriched. The law requires Party B to return the money to its rightful owner (Party A).

```java
public class Example {
    public void restitutionExample() {
        // Party A mistakenly sends $100 to Party B.
        int originalAmount = 100;
        
        // Party B receives and keeps the money.
        boolean unjustEnrichment = true; // Party B is enriched without a contract.
        
        if (unjustEnrichment) {
            // Party B must return the $100 to Party A.
            int restitutionAmount = originalAmount;
            
            System.out.println("Party B must return $" + restitutionAmount);
        }
    }
}
```
x??

---

#### Reliance and Restitution as Remedies
Background context: Reliance fits uncomfortably in the Restatement of Contracts, which primarily deals with enforceable bargained-for contracts. The Restatement acknowledges that courts may enforce promises even without a formal contract under certain conditions.

Restatement § 90(1) provides elements for claims based on reliance (promissory estoppel). It states: "A promise which the promisor should reasonably expect to induce action or forbearance on the part of the promisee or a third person and which does induce such action or forbearance is binding if injustice can be avoided only by enforcement of the promise. The remedy granted for breach may be limited as justice requires."

:p What are the key elements of promissory estoppel according to Restatement § 90(1)?
??x
The key elements of promissory estoppel (reliance) under Restatement § 90(1) include:
- The promise should reasonably induce action or forbearance.
- It must actually induce such action or forbearance.
- Enforcement is necessary to avoid injustice.

Formula: 
$$\text{Promissory Estoppel} = (\text{Inducement of Action/Forbearance}) \land (\text{Reasonable Expectation by Promisor}) \implies \text{Binding Promise if Injustice Averted Only by Enforcement}$$

Example:
- If Party X promises to sell goods to Party Y, and Party Y acts on this promise (e.g., pays a deposit), but no formal contract exists.
- Party X breaches the promise; enforcing the promise would avoid injustice to Party Y.

```java
public class PromissoryEstoppelExample {
    public boolean enforcePromise(String actionInduced) {
        // Induce action or forbearance by the party
        String inducedAction = "Pay Deposit";
        
        if (inducedAction.equals(actionInduced)) {
            return true; // Reasonable expectation and induces action
        } else {
            return false;
        }
    }
}
```
x??

---

#### Flexible Nature of Reliance Claims
Background context: The Restatement is designed to provide guidance rather than rigid rules. Section 90 acknowledges that even if all conditions for reliance are met, the remedy may still be limited based on justice requirements.

:p How does the Restatement handle cases where all elements of promissory estoppel are present but a remedy might be limited?
??x
The Restatement allows flexibility in granting remedies by stating that just because all elements of promissory estoppel (reliance) are met, it doesn't necessarily mean an unlimited or full remedy will be granted. The court may limit the remedy based on what justice requires.

Formula:
$$\text{Remedy} = (\text{All Elements Met}) \implies \text{Limited as Justice Requires}$$

Example: 
- Party X promises to pay a sum of money to Party Y for services rendered, but no formal contract exists.
- Party Y relies on this promise and incurs costs in preparation.
- Party X breaches the promise. The court might order Party X to pay part of the incurred costs rather than full compensation due to limited justice requirements.

```java
public class LimitedRemedyExample {
    public void calculateRemedy(double incurredCost, double breachAmount) {
        // Assume a partial remedy is more just in this case.
        double limitedRemedy = Math.min(incurredCost, breachAmount);
        
        System.out.println("Limited remedy amount:$" + limitedRemedy);
    }
}
```
x??

---

#### Restatement as a Tool for Understanding Legal Cases
Background context: The Restatement of Contracts is not binding but can be used as a useful tool to understand how courts approach cases involving promissory estoppel and reliance. It provides guidelines that help in determining the criteria for enforceable promises.

:p How can the Restatement be used when analyzing contract law cases?
??x
The Restatement of Contracts, particularly Section 90 on promissory estoppel, offers a framework to understand how courts might approach cases involving reliance without a formal contract. Although not binding as statutory law, it serves as a useful reference for determining the elements required for an enforceable promise based on reliance.

Steps:
1. Check if the promise reasonably induced action or forbearance.
2. Verify that such action or forbearance actually occurred.
3. Determine if injustice can be avoided only by enforcing the promise.
4. Consider whether justice requires limiting the remedy even if all elements are met.

Example: 
- A customer relies on a verbal promise from a business to receive services but no formal contract is in place.
- The court uses Section 90 to assess if reliance justifies enforcement, and potentially limits the remedy based on fairness.

```java
public class AnalyzeCaseExample {
    public boolean analyzePromissoryEstoppel(String actionInduced) {
        // Induce action or forbearance by the party
        String inducedAction = "Relied on verbal promise to receive services";
        
        if (inducedAction.equals(actionInduced)) {
            return true; // Reasonable expectation and induces action
        } else {
            return false;
        }
    }
}
```
x??

---
#### Determining Whether Reliance Applies: Four Conditions
This section outlines the conditions necessary for forming an obligation based on the doctrine of reliance as described by Restatement § 90. The four conditions are:
1. It must include a promise.
2. The promisor must reasonably expect the promise to induce action or forbearance.
3. The promise must be successful in inducing the expected action or forbearance.
4. Enforcement of the promise must be the only way to avoid injustice.

The first step is to identify if there is a promise present.
:p Does the language contain a commitment that can rise to the level of a promise?
??x
To determine this, look for statements where one party (promisor) commits to do or not do something with the expectation that another party (promisee) will take some action or refrain from taking it. For example:
- "I'll set up a trust to cover your law school tuition and expenses" is a promise intended to induce action.
- "I expect to be paying for your law school education someday" is merely an expression of hope, not a promise.

Code Example (Pseudocode):
```pseudocode
function identifyPromise(statement) {
    if (statement.includes("will do") || statement.includes("won't do")) {
        return true;
    }
    return false;
}
```
x??

---
#### Reasonableness to Expect Action or Forbearance
Once a promise is identified, the next step involves determining whether the action or forbearance expected by the promisor is reasonable. Ask: Would a reasonable person in the position of the promisor expect the promisee to act or refrain from acting based on the promise?
:p Is it reasonable for the promisor to expect the promisee to act or forbear due to the promise?
??x
For instance, if your uncle says, "I'll give you $1,000," and you are complaining about not having enough money for law school supplies, a reasonable person would expect your uncle to follow through. However, this expectation might not hold if it’s just pocket money for ice cream.

Code Example (Pseudocode):
```pseudocode
function isReasonableExpectation(context) {
    if (context.includes("law school") && context.includes("$1,000")) {
        return true;
    }
    return false;
}
```
x??

---
#### Inducing Action or Forbearance
The next step involves verifying whether the promisee actually acted or refrained from acting due to the promisor's promise.
:p Did the promisee act or refrain from acting because of the promise?
??x
For example, if your uncle promises to set up a trust for your law school expenses and you prepare for law school based on this promise, it would be reasonable to conclude that the promise induced action. Conversely, if an 10-year-old brother is told he will get $1,000 but has no intention of acting on it due to age, there’s no reliance.

Code Example (Pseudocode):
```pseudocode
function didInduceAction(promise, actions) {
    if (actions.includes("prepared for law school") && promise.includes("trust for tuition")) {
        return true;
    }
    return false;
}
```
x??

---
#### Avoiding Injustice by Enforcing the Promise
The final condition is whether enforcing the promise is necessary to avoid injustice. This means determining if it's in the best interest of justice to enforce the promise even though a formal contract wasn't formed.
:p Is enforcement of the promise necessary to avoid injustice?
??x
For example, if your uncle promises $1,000 for law school expenses and you have already incurred costs based on this promise, enforcing the promise would prevent an unjust outcome. However, if the promisor’s words were vague or conditional, such as "I might help," the court may find it just to not enforce the promise.

Code Example (Pseudocode):
```pseudocode
function avoidInjustice(promise, costs) {
    if (costs > 0 && promise.includes("for law school")) {
        return true;
    }
    return false;
}
```
x??

---

#### Williston’s Tramp Example
Background context: The example illustrates a situation where a wealthy man tells a tramp that he will buy an overcoat if the tramp walks around a corner. Williston concludes that consideration is absent because the man was unlikely to be bargaining for the tramp's performance.
:p What does Williston conclude about the presence of consideration in this scenario?
??x
Williston concludes that there is no consideration present because the wealthy man was very unlikely to be bargaining for the tramp’s performance. The tramp walking around the corner did not involve any significant action or obligation on the part of the tramp.
x??

---

#### Reliance Argument in Contract Law
Background context: This concept explains that if a promise induces someone to take actions, they can rely on the promise even if it does not form a bargained-for contract. The injured party may seek justice by enforcing the promise based on reasonable reliance.
:p Can you explain how the tramp could argue for enforcement of the wealthy man's promise in Williston’s example?
??x
The tramp could argue that he took action (walking around the corner) in reasonable reliance on the promise, and since the man did not expect to get anything from him, enforcing the promise would be just.
x??

---

#### Enforceable Promise Without a Bargained-for Contract
Background context: This concept addresses situations where an enforceable promise is made but no bargained-for contract exists. Courts typically limit remedies to the extent of reliance on the promise.
:p What is the remedy when there is an enforceable promise but no bargained-for contract?
??x
The remedy for breach of an enforceable promise without a bargained-for contract is generally limited to the extent of the reliance. The injured party can recover the monetary value lost due to reasonable reliance, not necessarily the full amount promised.
x??

---

#### Rich Uncle’s Promise Example
Background context: This example involves a rich uncle promising to give money for studying, which induced the nephew to purchase study aids. The court would likely limit recovery to the cost of the study aids purchased in reliance on the promise.
:p How much is the nephew most likely to recover from his uncle?
??x
The nephew is most likely to recover $200, the amount spent on study aids, rather than the full$1,000 promised by his rich uncle.
x??

---

#### Historical Context of Reliance in Contract Law
Background context: Historically, courts equated reliance with consideration and required promisors to honor their promises fully. The modern approach limits remedies to the monetary value of reliance.
:p How did early Restatements view reliance when a promise was breached?
??x
Early Restatements treated reliance as equivalent to consideration, requiring promisors to fulfill their promises in full regardless of how much the injured party relied on them.
x??

---

#### Current Judicial Approach
Background context: Modern judicial approaches limit remedies for breach of an enforceable promise based on reasonable reliance. The court may enforce the promise if enforcing it is just given the circumstances.
:p What does "justice requires" mean in the context of enforcing promises?
??x
"Justice requires" means that courts will consider whether enforcing the promise is fair and appropriate, often focusing on the extent of reliance by the injured party rather than requiring full performance.
x??

---

#### Deciding Whether a Charitable Pledge is Enforceable
Background context: In many cases, courts consider whether to enforce charitable pledges without requiring formal consideration. The Restatement of Contracts § 90 offers special subsections for such pledges, suggesting enforcement based on reliance rather than traditional consideration.
The concept hinges on the idea that even if a charitable pledge lacks formal consideration, it may still be enforceable due to the donor's reasonable reliance on the promise.

:p Can you explain when and why courts might enforce a charitable pledge without formal consideration?
??x
Courts may enforce a charitable pledge based on promissory estoppel, particularly where the promisee reasonably relies on the promise. This is because such pledges are considered good policy to encourage donations.
```java
// Example of enforcement logic in pseudocode
if (charitablePledge) {
    if (relianceOnPromise()) {
        enforcePledge();
    } else {
        denyEnforcement();
    }
}
```
x??

---

#### Deciding Whether a Sophisticated Party Can Claim Reliance
Background context: The concept of reliance becomes less applicable in cases involving sophisticated parties, such as businesses. These parties are expected to understand the nature of promises and contracts.
Courts typically do not find reliance where one party is capable of understanding that a promise is likely to be followed by some form of consideration or expectation.

:p In what circumstances might courts find it difficult to enforce a promise between two sophisticated parties?
??x
Courts are less likely to enforce promises between sophisticated parties because such individuals should understand the nature of business transactions and consider the terms carefully. They generally do not rely on simple verbal assurances.
```java
// Example of enforcement logic in pseudocode
if (partiesAreSophisticated) {
    if (relianceOnPromise()) {
        enforcePromise();
    } else {
        denyEnforcementDueToLackOfReliance();
    }
}
```
x??

---

#### The Death and Resurrection of Contracts: Is Consideration Required?
Background context: The concept revolves around the tension between requiring and not requiring consideration for a contract. Grant Gilmore's book discusses how the drafters of the First Restatement of Contracts in the 1920s included rules on both sides, leading to the incorporation of reliance (promissory estoppel) as an alternative theory.
This concept challenges traditional views on contracts by suggesting that sometimes promises should be enforced even if no formal consideration is present.

:p Can you explain how the drafters of the First Restatement of Contracts reconciled their approach to consideration?
??x
The drafters initially included both a rule requiring consideration and one stating that consideration was not necessary, reflecting the complexity of contract law. However, they eventually adopted promissory estoppel as an alternative theory when faced with cases where traditional rules did not apply.
```java
// Example of enforcement logic in pseudocode
if (considerationNeeded) {
    if (promissoryEstoppelApplicable()) {
        enforcePromise();
    } else {
        denyEnforcementDueToNoConsideration();
    }
}
```
x??

---

#### No Contract but Promises Enforceable
Background context: The court found that although no formal contract was formed, franchisees acted in reasonable reliance on certain promises and were able to recover for their losses. However, it’s important to distinguish between reliance and acceptance.

:p What does the case illustrate about enforcing promises without a formal contract?
??x
The case illustrates that even if no formal contract exists, if one party (franchisee) reasonably relied on the other party's promises and incurred significant losses as a result, they may still be able to recover those losses. The key is that reliance alone does not constitute acceptance or enforceability; the franchisee needed to accept the offer by taking actions that indicated agreement.

```java
// Example of how an offeree might act without accepting:
public class FranchiseCase {
    public static void main(String[] args) {
        boolean hasContract = false;
        boolean actedOnPromise = true;
        if (hasContract || !actedOnPromise) {
            System.out.println("No recovery possible.");
        } else {
            System.out.println("Recovery is possible due to reasonable reliance.");
        }
    }
}
```
x??

---

#### Difference Between Offer and Promise
Background context: An offer calls for acceptance and consideration. Relying on an offer alone does not make it enforceable; the offeree must accept by providing the necessary consideration.

:p Explain why you cannot rely on an offer to make it enforceable.
??x
Relying on an offer alone is not enough to make it enforceable. An offer requires acceptance and consideration from the offeree. Simply relying on the offer, as evidenced by actions like opening a store or advertising, does not constitute acceptance. To be enforceable, the offeree must formally accept the offer with the required consideration.

```java
// Example of an offer being revoked:
public class OfferRejection {
    public static void main(String[] args) {
        boolean hasOffer = true;
        if (!hasOffer || !acceptOffer()) {
            System.out.println("Offer cannot be accepted now.");
        } else {
            System.out.println("Acceptance successful, offer can still be enforced.");
        }
    }

    private static boolean acceptOffer() {
        // Simulate acceptance process
        return false; // Offer was revoked before acceptance
    }
}
```
x??

---

#### Doctrine of Restitution: Preventing Unjust Enrichment
Background context: To prevent one party from unfairly gaining a benefit at another's expense, courts use the doctrine of restitution. This can create an implied-in-law contract to enforce fairness.

:p How does the court use the doctrine of restitution?
??x
The court uses the doctrine of restitution to ensure that no party is unjustly enriched. When one party gains a benefit without providing fair compensation, the court may impose an obligation (an implied-in-law contract) on them to compensate or return to their original position.

```java
// Example of using restitution:
public class RestitutionCase {
    public static void main(String[] args) {
        boolean patientWasComatose = true;
        if (!patientWasComatose || !treatmentGiven()) {
            System.out.println("No implied-in-law contract needed.");
        } else {
            System.out.println("Implying an obligation to prevent unjust enrichment.");
        }
    }

    private static boolean treatmentGiven() {
        // Simulate providing medical services
        return true; // Treatment was given and patient is conscious
    }
}
```
x??

---

#### Implied-In-Law Contract vs. Implied-In-Fact Contract
Background context: An implied-in-law contract, or quasi-contract, is an obligation imposed by the law to prevent unjust enrichment, even without a formal agreement. This differs from an implied-in-fact contract, which is a real, bargained-for agreement found in the conduct of the parties.

:p What distinguishes an implied-in-law contract from an implied-in-fact contract?
??x
An implied-in-law contract (quasi-contract) is not a formal agreement but rather an obligation imposed by law to prevent unjust enrichment. It must meet specific conditions: services were not performed as gifts, they cannot be forced on the party, and it prevents unjust enrichment.

In contrast, an implied-in-fact contract is a real, bargained-for agreement derived from the parties' conduct. It’s based on mutual assent and consideration.

```java
// Example to differentiate:
public class ContractTypes {
    public static void main(String[] args) {
        boolean formalAgreementExists = false;
        if (formalAgreementExists) {
            System.out.println("Implied-in-fact contract.");
        } else {
            System.out.println("Implying an implied-in-law contract to prevent unjust enrichment.");
        }
    }
}
```
x??

---

---
#### Definition of Officious Act
An officious act is one performed without the consent of another person. The law typically does not obligate someone to pay for a benefit conferred when such an act was performed without their permission.

:p What is an officious act and why might it not result in compensation?
??x
An officious act refers to performing a service or action on behalf of someone without their explicit consent. In legal terms, society generally does not expect people to be compensated for services rendered without prior agreement. For example, if you mow someone's lawn without being asked and then demand payment, the law might consider this an officious act, and you would likely not receive compensation.

```java
public class OfficiousActExample {
    public static void main(String[] args) {
        String outcome = "No Compensation";
        // Example: Mowing a neighbor's lawn without permission and demanding payment.
        if (isOfficiousAct()) {
            System.out.println(outcome);
        } else {
            // Calculate compensation based on reasonable value
        }
    }

    private static boolean isOfficiousAct() {
        return true; // This function checks for the lack of consent before action was taken.
    }
}
```
x??

---
#### Restitution and Benefit Conferred
Restitution involves recovering a benefit conferred upon another person. The starting point in measuring restitution is often the reasonable value of the benefit provided, even if no contract existed.

:p What is restitution and how is it used to measure compensation?
??x
Restitution is a legal remedy that allows one party to recover a benefit conferred on another without a formal contractual agreement. It starts by assessing the reasonable value of the benefit provided. For example, if you save someone's life and they promise to compensate you for your actions, the court might evaluate what a fair payment would be based on the specific circumstances.

```java
public class RestitutionExample {
    public static void main(String[] args) {
        double reasonableValue = calculateReasonableValue();
        // Determine whether restitution should be granted.
        if (reasonableValue > 0) {
            System.out.println("Restitution: " + reasonableValue);
        } else {
            System.out.println("No Restitution");
        }
    }

    private static double calculateReasonableValue() {
        // Logic to determine the reasonable value of the benefit.
        return 5000.0; // Placeholder value
    }
}
```
x??

---
#### Webb v. McGowin Case Overview
The case of Webb v. McGowin involves an employee (Webb) who saved his employer (McGowin) from a falling object, resulting in significant injury to himself. Despite no formal contract, the employer promised to pay for life.

:p What was the legal situation in the Webb v. McGowin case?
??x
In the Webb v. McGowin case, an employee named Webb saved his employer (McGowin) from a falling object by throwing himself at it, severely injuring himself in the process. At that time, workers' compensation was non-existent. Despite no formal contract, the employer promised to pay Webb $15 every two weeks for life as a gesture of gratitude. The case revolves around whether such a promise, made after the act of saving someone's life, is legally binding.

```java
public class WebbMcGowinCase {
    public static void main(String[] args) {
        String outcome = determineOutcome();
        System.out.println("Outcome: " + outcome);
    }

    private static String determineOutcome() {
        // Determine whether the promise made after the act of saving someone's life is legally binding.
        return "Legal Binding"; // Placeholder for actual logic
    }
}
```
x??

---
#### Societal Attitude Towards Compensation for Heroic Acts
Society generally does not allow individuals to recover compensation when they save a person’s life or perform similar heroic acts, viewing such actions as gifts rather than services that should be compensated.

:p What societal view is mentioned regarding heroic acts and compensation?
??x
Society tends to view saving someone's life or performing other heroic acts as a gift. These actions are celebrated for their courage and sacrifice, but society typically does not allow the person being saved to demand payment for such services. This view contrasts with legal obligations, where courts might consider promises made after such acts.

```java
public class SocietalAttitudeExample {
    public static void main(String[] args) {
        boolean isHeroicAct = true; // Placeholder value
        if (isHeroicAct) {
            System.out.println("Societal View: Gift, Not Payment");
        } else {
            System.out.println("Societal View: Service with Value");
        }
    }
}
```
x??

---

#### Implied-in-Law Contract and Restitution
Background context: In cases where a benefit is conferred on another party that is not a gift or officious, courts may find an implied-in-law contract. The measure of recovery for such benefits is based on the value of the benefit conferred rather than what would've been agreed upon in a formal contract.
:p What does the court consider when determining whether to enforce a promise under restitution?
??x
The court considers if the benefit was not a gift or officious, meaning it wasn't forced upon the recipient. The amount recovered is based on the value of the benefit conferred, rather than any agreed-upon price in a formal contract.
x??

---

#### Unjust Enrichment and Restitution
Background context: When one party confers a benefit on another that is not a gift or officious, restitution may be sought to prevent unjust enrichment. This principle aims to restore both parties to their original positions before the contract was formed.
:p How does the court determine if there's unjust enrichment in a given scenario?
??x
The court determines unjust enrichment by assessing whether one party has received a benefit that is not a gift or officious, and then awards restitution to prevent the enriched party from retaining value without providing fair compensation. The measure of recovery is based on the value of the benefit conferred.
x??

---

#### Material Breach and Restitution
Background context: In cases where a material breach occurs (a significant failure by one party that allows the other to not perform), courts may compel restitution if the injured party cannot make a contract claim due to the breach. The restitution amount is often based on the value of the benefit conferred.
:p What happens when a contractor breaches a contract significantly and stops work?
??x
When a contractor breaches a contract significantly by stopping work, they can't recover for the portion of the project completed because it constitutes a material breach. However, if the injured party (the homeowner) receives significant benefits from the incomplete work, the court may order restitution to prevent unjust enrichment.
Example:
Suppose a contractor builds 40% of a house and stops, costing $80,000 in value to the homeowner for that portion. The court would likely order the homeowner to pay the contractor$80,000 to avoid unjust enrichment.
x??

---

#### Prioritizing Damages and Restitution
Background context: In cases involving material breaches, courts must balance restitution claims against other remedies like expectancy damages (damages equivalent to what was bargained for). The priority of recovery depends on which remedy would be more equitable in the given situation.
:p How does a court prioritize damages when both restitution and expectancy damages are available?
??x
A court prioritizes damages by considering which remedy is more equitable. Expectancy damages typically take precedence over restitution if they better align with what was bargained for in the original contract. For example, if a contractor claims $100,000 spent on building 40% of a house and completing it costs only $120,000, the court would order the homeowner to pay $80,000 (the value of the completed work) as restitution because the contractor cannot recover more than what was bargained for.
x??

---

#### Summary of Key Concepts
Background context: This section summarizes key concepts related to implied-in-law contracts and restitution, including scenarios where unjust enrichment occurs due to benefits conferred, material breaches, and the prioritization of damages. Understanding these principles helps in determining appropriate legal remedies.
:p What are the main principles discussed regarding implied-in-law contracts and restitution?
??x
The main principles include:
- When a benefit is not a gift or officious, the enriched party must pay the value of the benefit conferred (implied-in-law contract).
- If the benefit is a gift, no claim for restitution exists.
- If there's a subsequent promise to pay after a benefit has been conferred, the promise may be enforceable in contract to prevent injustice.
- In material breaches, courts often award restitution based on the value of the benefit received, prioritizing other remedies like expectancy damages if they are more equitable.
x??

