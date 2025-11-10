# High-Quality Flashcards: Contract-Law-For-Dummies_processed (Part 1)


**Starting Chapter:** Forming a Contract Promises Offers and Mutual Assent

---


#### Contract Performance vs Formation
Background context: The text distinguishes between contract formation and performance. Formation occurs when Joe makes an offer, and Mary accepts it; performance happens later when Joe tries to retrieve the bicycle the next day.
:p How does a breach of contract occur?
??x
A breach of contract occurs if Mary changes her mind after accepting the offer and refuses to perform (i.e., she says "Ha-ha. I changed my mind. I’m not selling you my bicycle"). This refusal constitutes a breach of the formed contract.
x??

---


#### Acceptance by Promise or Performance
Background context: In some cases, an offer can be accepted either by a promise (bilateral contract) or through performance alone. The key point is that once an offeree begins performing, both parties are bound as if they had formed a bilateral contract.

:p What happens when an offer can be accepted by either promise or performance?
??x
When an offer can be accepted by either promise or performance, and the offeree starts to perform, both parties are immediately bound as if they had entered into a bilateral contract. This means that even if acceptance was originally by performance alone, starting the act of performing binds both parties.

Explanation: The moment you begin performing (e.g., painting the garage), a contract is formed, making it binding on both sides. If one party stops before completing the task, they would be in breach of the agreement.
x??

---


#### Determining Consideration Presence
Background context explaining that determining whether a promise is enforceable involves identifying consideration, which is what each party stands to gain from the exchange. This concept helps distinguish formal agreements with mutual benefits (consideration) from informal or social promises without such benefits.

:p How do you detect the presence of consideration in an agreement?
??x
To determine if consideration is present, identify whether both parties have made promises that are interdependent. Each party should have a motive to receive something in return for their promise. For example, one party might offer to sell a car for $10,000, and the other agrees to pay this amount.
```java
public class ConsiderationExample {
    public boolean hasConsideration(String promisorPromise, String promiseePromise) {
        // Check if both parties are promising something in exchange for each other's actions
        return (promisorPromise.contains("sell") && promiseePromise.contains("pay")) ||
               (promisorPromise.contains("give") && promiseePromise.contains("receive"));
    }
}
```
x??

---

