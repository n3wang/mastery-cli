# High-Quality Flashcards: Business-Law_-Text-and-Cases_processed (Part 4)


**Starting Chapter:** 28-6 Online Banking and E-Money

---


#### Substitute Checks
Background context: Substitute checks are created from digital images of original checks and contain all necessary information for automated processing. They can be used in place of physical checks, reducing paper usage.

:p What is a substitute check?
??x
A substitute check is a digital reproduction of the front and back of an original check that includes all required information for automatic processing. Banks generate these from digital images of original checks.
x??

---


#### Intermediary Bank
An intermediary bank is a financial institution that acts as a bridge between the customer and the final destination of funds in an EFT process. It may be involved in processing, confirming, or transferring funds.

:p What does an intermediary bank do?
??x
An intermediary bank's role includes:
1. **Processing**: Handling the transfer of funds through its network.
2. **Validation**: Ensuring that transactions are valid and comply with regulations.
3. **Settlement**: Facilitating the final transfer of funds to the correct destination.

This function ensures that transactions are completed efficiently, reducing risks and streamlining processes.

```java
// Pseudocode for an intermediary bank's process
public class IntermediaryBank {
    public void processTransaction(Transaction transaction) throws InsufficientFundsException {
        // Verify the transaction details and ensure sufficient funds
        if (!isValidTransaction(transaction)) {
            rejectTransaction(transaction);
            return;
        }
        
        // Process the transaction through its network
        sendTransactionToDestination(transaction.getReceiver());
    }
}
```
x??

---


---
#### Issue Spotting 1: Contract Enforcement for Services Rendered

Background context: Jorge contracts with Larry of Midwest Roofing to fix his roof, and pays half the contract price upfront. After completing the job, Jorge refuses to pay the remaining balance.

:p What can Larry and Midwest do if Jorge refuses to pay the remaining balance?
??x
Larry and Midwest can sue Jorge for breach of contract or seek to enforce the terms of their contract in court. They can also take steps such as sending a demand letter or consulting with an attorney to explore collection options, including filing a lawsuit to recover the outstanding payment.

In many jurisdictions, they may be able to use a mechanic's lien if any work was performed on real property (though this scenario is more relevant for construction projects and not explicitly mentioned here).

```java
// Pseudocode for sending a demand letter
public void sendDemandLetter(Customer customer, Amount owed) {
    System.out.println("Sending demand letter to " + customer.getName());
    // Code to log the attempt and any responses from the customer
}
```
x??

---

