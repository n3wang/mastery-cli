# Flashcards: Business-Law_-Text-and-Cases_processed (Part 17)

**Starting Chapter:** 11-3 Types of Contracts

---

---
#### Voluntary Consent Requirement
Background context: When forming a contract, both parties must provide their voluntary consent. If this is not met due to external factors such as fraud, undue influence, mistake, or duress, the contract may be unenforceable.

:p How does the concept of voluntary consent apply in contract formation?
??x
Voluntary consent means that both parties agree freely and without coercion. If a party enters into a contract under false pretenses, through undue pressure, due to a mutual mistake, or against their will (due to duress), then this consent is not considered voluntary. For example, if one party threatens the other with physical harm unless they sign a contract, that agreement would likely be unenforceable.

Code examples are less relevant here, but you could illustrate the concept through a simple scenario:

```java
public class ConsentExample {
    public static void main(String[] args) {
        boolean validConsent = true; // Assume initially voluntary

        if (!isValidOffer()) { // Check for fraud or undue influence
            validConsent = false;
        }

        if (isDuressPresent()) { // Check for duress
            validConsent = false;
        }

        if (!validConsent) {
            System.out.println("The contract may not be enforceable due to lack of voluntary consent.");
        }
    }

    private static boolean isValidOffer() {
        // Logic to check for fraud or undue influence
        return true; // For simplicity, assume no such issues initially
    }

    private static boolean isDuressPresent() {
        // Logic to check if duress was applied
        return false; // Assume no duress in this example
    }
}
```
x??

---
#### Form Requirement for Contracts
Background context: Some contracts must be in a specific form to be enforceable. For instance, certain types of contracts need to be in writing.

:p What does the "form requirement" entail in contract law?
??x
The form requirement means that a contract must meet specific legal criteria regarding its documentation or recording for it to be valid and enforceable. For example, real estate transactions often require written agreements to comply with statutory requirements.

Code examples are less relevant here, but you could illustrate the concept through a simple scenario:

```java
public class FormRequirementExample {
    public static void main(String[] args) {
        boolean isFormValid = true; // Assume initially valid

        if (!isWrittenContract()) { // Check if contract is in writing
            isFormValid = false;
        }

        if (isFormValid) {
            System.out.println("The contract is valid and can be enforced.");
        } else {
            System.out.println("The contract may not be enforceable due to a lack of proper form.");
        }
    }

    private static boolean isWrittenContract() {
        // Logic to check if the contract is in writing
        return true; // For simplicity, assume it is written initially
    }
}
```
x??

---
#### Bilateral vs. Unilateral Contracts
Background context: Bilateral contracts involve mutual promises (one party offers something and the other accepts), while unilateral contracts require one party to perform an act for the contract to be formed.

:p What distinguishes a bilateral contract from a unilateral contract?
??x
A bilateral contract involves both parties making reciprocal promises. For example, if A agrees to buy B's car for $1,000 and B agrees to sell it, both have made promises that are binding once accepted. In contrast, a unilateral contract requires one party to perform an act in exchange for the other’s promise. For instance, if C offers a reward of$500 for finding their lost dog, D finds the dog but does not claim the reward; no contract is formed.

```java
public class BilateralContractExample {
    public static void main(String[] args) {
        boolean isBilateral = true; // Assume initially bilateral

        if (isPromiseForAct()) { // Check if it’s a unilateral contract
            isBilateral = false;
        }

        if (isBilateral) {
            System.out.println("This is a bilateral contract.");
        } else {
            System.out.println("This is not a bilateral contract, but a unilateral one.");
        }
    }

    private static boolean isPromiseForAct() {
        // Logic to check if the offer is for an act
        return false; // For simplicity, assume it’s not initially
    }
}
```
x??

---
#### Contests, Lotteries, and Prizes
Background context: Offers involving contests, lotteries, and prizes are often unilateral contracts. These involve accepting a reward upon completion of a specified task.

:p What types of events or activities can be considered as forming unilateral contracts?
??x
Contests, lotteries, and other competitions with prizes typically form unilateral contracts because they require participants to perform an act (e.g., submit entries, find the prize, etc.) in exchange for the reward. For example, if a company offers a cash prize of $10,000 to anyone who can solve their puzzle first, this is a unilateral contract.

Code examples are less relevant here, but you could illustrate the concept through a simple scenario:

```java
public class PrizeContractExample {
    public static void main(String[] args) {
        boolean hasCompletedTask = false; // Assume initially uncompleted

        if (isPrizeOffered()) { // Check if participant has completed the task
            System.out.println("The participant is entitled to the prize.");
        } else {
            System.out.println("No contract formed as the task was not completed.");
        }
    }

    private static boolean isPrizeOffered() {
        // Logic to check if the task is completed
        return hasCompletedTask; // For simplicity, assume it's uncompleted initially
    }
}
```
x??

---

---
#### Quasi Contract and Actual Contracts
When an actual contract exists, a party cannot recover using the doctrine of quasi contract. If a breach occurs, the non-breaching party can sue for breach of the existing contract instead.

:p What is the difference between a quasi contract and an actual contract in this context?
??x A quasi contract arises when there is no formal agreement but one party has been unjustly enriched at another's expense. An actual contract exists when parties have entered into a formal agreement covering the matter in controversy.
x??
---

---
#### Example of Quasi Contract and Actual Contract
Example 11.11 illustrates that if Fung contracts with Cameron to deliver a furnace, and Cameron breaches by not paying, Fung cannot sue Grant (the building owner) for unjust enrichment because there is an actual contract between Fung and Cameron.

:p How does the example of Example 11.11 illustrate the difference between quasi contract and actual contract?
??x In the example, Fung delivers a furnace to Cameron's building owned by Grant but never gets paid. Although Grant has been unjustly enriched (by receiving the furnace without payment), Fung cannot sue Grant because there is an existing contract between Fung and Cameron for the delivery of the furnace. Therefore, Fung should sue Cameron for breach of their actual contract.

Exhibit 11-3: Rules of Contract Interpretation
The plain meaning rule states that if a contract's writing is clear, courts will enforce it according to its obvious terms.
:p What is the plain meaning rule?
??x The plain meaning rule dictates that when a contract’s written document is unambiguous and clear, courts will interpret the contract based on the words used in their ordinary sense. If the intent of the parties can be clearly determined from the language, the court enforces the contract as written.
x??
---

---
#### Interpretation of Contracts
Parties may disagree on the meaning or legal effect of a contract due to unfamiliarity with legal terminology or unclear expressions.

:p How do plain language laws help in contract interpretation?
??x Plain language laws aim to make contracts more understandable by using simpler and clearer terms. However, disputes can still arise if the rights or obligations are not expressed clearly, regardless of how straightforward the language is.
x??
---

---
#### Ambiguity in Contracts
A court considers a contract ambiguous when it cannot determine the parties' intent from the written words.

:p What does it mean for a contract to be ambiguous?
??x A contract is considered ambiguous if its terms are unclear and subject to more than one reasonable interpretation. This can happen due to missing provisions, uncertain language, or multiple interpretations of a term.
x??
---

---
#### Extrinsic Evidence in Contract Interpretation
Extrinsic evidence may be used by courts to interpret ambiguous contracts against the party that drafted them.

:p What is extrinsic evidence in contract interpretation?
??x Extrinsic evidence includes any information not contained within the document itself, such as the testimony of parties involved or other external documents. Courts can use this evidence to clarify ambiguities.
x??
---

---
#### Specific vs. General Words in Contract Interpretation
Specific wording takes precedence over general wording when interpreting contracts.

:p How does a court interpret specific and general words in a contract?
??x When there is both specific and general wording, courts generally give greater weight to the specific terms. The general wording might be considered to provide context or background but will not override specific details.
x??
---

These flashcards cover key concepts related to quasi contracts, actual contracts, ambiguity in contracts, extrinsic evidence, and rules of interpretation for contract disputes.

---
#### Bilateral Contract
A bilateral contract is a type of agreement where both parties exchange promises. Each party makes a commitment, and these commitments are interdependent. For instance, if Party A agrees to deliver goods to Party B in exchange for payment from Party B, this creates a mutual obligation.
:p What is the definition of a bilateral contract?
??x
A bilateral contract involves two parties making reciprocal promises where each promise depends on the other's performance. Each party has both a right and an obligation.
x??

---
#### Executed Contract
An executed contract is one in which all the obligations under the agreement have been fulfilled by at least one party, meaning that the exchange of value has occurred. For example, if Party A delivers goods to Party B and Party B pays for those goods, the contract is considered executed because both parties have performed their duties.
:p What distinguishes an executed contract from others?
??x
An executed contract is characterized by the completion of all obligations under the agreement. This means that one or more parties have fully performed their part, typically resulting in a mutual exchange of value.
x??

---
#### Executory Contract
An executory contract is one where some obligations remain outstanding and unfulfilled on both sides. Neither party has completed its responsibilities; hence, there are still promises to be kept by both sides.
:p Define an executory contract.
??x
An executory contract exists when neither party has yet fulfilled their contractual duties. There are still pending obligations that need to be completed by all parties involved.
x??

---
#### Express Contract
An express contract is a formal agreement where the terms and conditions are explicitly stated, either verbally or in writing. For example, Dyna's promise to Ed to pay $1,000 if he sets fire to her store would fall under an express contract.
:p What characterizes an express contract?
??x
An express contract involves clear, explicit statements of the terms and conditions agreed upon by the parties involved. These agreements can be oral or written.
x??

---
#### Implied Contract
An implied contract is formed when there are no express terms stated; instead, one party’s actions or words imply an agreement. For instance, in the case of Janine's nursing care, her awareness and acceptance of the services without explicit consent suggest an implied contract.
:p What defines an implied contract?
??x
An implied contract arises from the circumstances under which a contract is entered into; it does not require express terms but rather relies on the conduct or behavior of the parties involved to establish the agreement.
x??

---
#### Quasi Contracts
Quasi contracts are legal constructs that arise when no formal contract exists, yet one party has benefited at the expense of another. For example, if Alison mistakenly pays taxes meant for Jerry's property, a quasi-contract can be used to recover the funds.
:p Explain what constitutes a quasi contract.
??x
A quasi contract is a legal fiction that arises when there is no formal contract between parties but one party has been unjustly enriched at the expense of another. The courts use these constructs to prevent unjust enrichment and ensure fair compensation.
x??

---
#### Unilateral Contract
A unilateral contract involves an offer by one party for specific performance in exchange for something from the other party, such as a prize or reward upon completion of a task. For example, Rocky Mountain Races' advertised first prize is a form of unilateral contract.
:p What is a unilateral contract?
??x
A unilateral contract occurs when there is a promise to pay or give something in return for the performance of an act by another party. The offeror makes a specific commitment if a particular task is completed.
x??

---
#### Void Contract
A void contract is one that lacks legal enforceability due to some defect, such as illegality or lack of capacity. For example, Ed’s promise to set fire to Dyna's store for insurance fraud would be considered a void contract because it violates criminal law.
:p What makes a contract void?
??x
A contract is void if it lacks the essential elements required for enforceability, such as legality and capacity. Contracts involving illegal activities or those entered into by individuals without legal authority are typically considered void.
x??

---
#### Voidable Contract
A voidable contract is one where one party has the right to rescind the agreement due to factors like duress, misrepresentation, or mistake. For example, if Janine were coerced into accepting the nursing services, she might have grounds to void the agreement.
:p What characterizes a voidable contract?
??x
A voidable contract is an agreement that can be legally annulled by one of the parties due to certain issues such as duress, misrepresentation, or mistake. The party wishing to avoid the contract must act within a reasonable time and follow legal procedures.
x??

---
#### Issue Spotter: Dyna's Insurance Fraud
Dyna offers Ed money to set fire to her store so she can collect insurance, but Ed sets the fire and then refuses payment from Dyna.
:p Can Ed recover for breach of contract?
??x
No, Ed cannot recover for a valid contract because the agreement was illegal. The offer to burn down the store for insurance fraud is inherently criminal and therefore makes the entire contract void. Any attempt by Ed to enforce this agreement would be met with legal sanctions.
x??

---
#### Issue Spotter: Alison's Property Taxes
Alison pays taxes meant for Jerry's property believing it’s her own, unaware of the mistake until afterward.
:p Can Alison recover from Jerry?
??x
Yes, Alison can potentially recover the amount paid under a quasi-contract theory. Since she was unjustly enriched at Jerry's expense due to a misunderstanding, the courts might allow recovery through a quasi-contract to prevent unjust enrichment.
x??

---

#### Why the Appellate Court Reversed the Damages Award to Clarke

Background context: In Lawrence M. Clarke, Inc. v. Draeger, 2015 WL 205182 (Mich.App. 2015), Clarke filed a suit against Draeger for damages based on a theory of quasi contract because the work provided by Draeger and subcontractors was unsatisfactory. The state court initially awarded $900,000 in damages to Clarke.

The appellate court reversed this award because:
- Michigan law requires that a plaintiff seeking relief under a quasi-contract (unjust enrichment) must demonstrate that there is no valid contract between the parties.
- In this case, there was an actual contract between Clarke and Draeger for the project, which means the quasi-contract theory should not have been applied.

:p Why did the appellate court reverse the damages award in Lawrence M. Clarke, Inc. v. Draeger?
??x
The appellate court reversed the damages award because it found that a valid contract existed between Clarke and Draeger, thus disqualifying the use of the quasi-contract theory. The court ruled that Clarke should have pursued its claim under the terms of the actual contract rather than through a quasi-contract.
x??

---

#### Can Extrinsic Evidence Interpret the Meaning of the Bonus Term?

Background context: In Ortegón v. Giddens, 638 Fed.Appx. 47 (2d Cir. 2016), Ortegón accepted LBI’s offer to work as a Business Chief Administrative Officer in its Fixed Income Division with a salary of $150,000 and an annual minimum bonus of$350,000. The letter stated that the bonus was tied to her performance on the job.

The key question is whether extrinsic evidence can be admitted to interpret the meaning of the bonus term if LBI rescinded the offer before Ortegón started work.

:p Can extrinsic evidence be used to interpret the meaning of the bonus term in Ortegón v. Giddens?
??x
Extrinsic evidence can be used to interpret the meaning of the bonus term, as it clarifies the context and intent behind the written terms. The court would likely consider such evidence to determine if there were any specific conditions or understandings between LBI and Ortegón that modified the plain language of the offer.
x??

---

#### Can Newton Medical Center Recover Payment on a Quasi-Contract Theory?

Background context: In Newton Medical Center v. D.B., 452 N.J.Super. 615, 178 A.3d 1281 (App.Div. 2018), an indigent patient named D.B. was admitted to Newton Medical Center on an emergency basis due to a psychotic episode and involuntary commitment. The center did not apply for state financial assistance but instead billed the patient directly.

The key question is whether Newton can recover the unpaid bill from D.B. using a quasi-contract theory, despite admitting him through the regular admissions process that typically requires patients to apply for state assistance.

:p Can Newton Medical Center recover the amount of the unpaid bill from D.B. on a theory of quasi contract?
??x
Newton cannot recover the amount of the unpaid bill from D.B. on a theory of quasi-contract because, as an indigent patient admitted through the regular admissions process, D.B. was responsible for applying to the state for financial assistance. The fact that Newton did not apply for this assistance does not shift the responsibility onto D.B., and thus, it cannot be justified under a quasi-contract theory.
x??

---

#### A Question of Ethics – IDDR Approach and Contract Requirements

Background context: In the case involving Mark Carpenter, he was contracted to recruit investors for GetMoni.com. He collected over $2 million but misused most of the funds, leading to significant financial loss.

The key issue is whether Carpenter could have properly managed these funds based on contract requirements or ethical standards related to investment management and fiduciary duties.

:p Can Mark Carpenter be held accountable under contract requirements and IDDR approach?
??x
Mark Carpenter cannot solely rely on contractual obligations without adhering to the Investment Adviser Duty of Diligence and Reasonableness (IDDR) approach. The IDDR requires advisors to act with due diligence, care, and loyalty in managing client funds. Carpenter's misuse of funds, running a Ponzi scheme, and depositing $1 million into his own account indicate significant breaches of these ethical standards. Therefore, he is not only contractually but ethically accountable for the improper handling of client funds.
x??

---

