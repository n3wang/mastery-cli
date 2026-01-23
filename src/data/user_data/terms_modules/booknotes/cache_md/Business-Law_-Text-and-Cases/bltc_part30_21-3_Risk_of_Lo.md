# Flashcards: Business-Law_-Text-and-Cases_processed (Part 30)

**Starting Chapter:** 21-3 Risk of Loss

---

---
#### Risk of Loss
Background context explaining that risk of loss does not necessarily pass with title. It is generally determined by the contract between parties, and when no provision indicates passage, UCC rules apply based on delivery terms.

:p What determines who bears the financial loss if goods are damaged or lost in transit?
??x
The risk of loss is generally determined by the contract between the seller and buyer/lessor and lessee. If there's no explicit provision, courts use UCC rules to determine when risk passes based on delivery terms.
??
---

---
#### Case in Point 21.8: Ownership and Liability
Background context explaining that Herring owned Toby despite not having its registration papers because the contract clearly showed ownership.

:p How did the court determine who owned Toby at the time of the accident?
??x
The court determined ownership based on the clear terms of the contract, which indicated that Herring had ownership over Toby.
??
---

---
#### Shipment Contracts and Delivery Terms
Background context explaining that in a shipment contract, the seller is required or authorized to ship goods by carrier but not to deliver them to a specific destination. Risk passes when the goods are delivered to the carrier.

:p In what type of contract does the risk of loss pass when the goods are delivered to the carrier?
??x
In a shipment contract, the risk of loss passes to the buyer or lessee when the goods are delivered to the carrier.
??
---

---
#### Delivery Terms in Contracts
Background context explaining that specific delivery terms such as "shipped FOB shipping point" and "shipped FOB destination" determine who bears the costs and risk of loss.

:p What does "FOB shipping point" mean in a contract?
??x
"FOB shipping point" means that the seller is responsible for delivering the goods to the carrier, and the buyer bears the risk of loss from that point onward.
??
---

---
#### C/Java Code Example - Determining Delivery Terms
Background context explaining how specific terms like "shipped FOB shipping point" or "shipped FOB destination" can be implemented in a code snippet for clarity.

:p How can we use code to represent the term "FOB shipping point"?
??x
Here is an example of how you might implement this concept in Java:

```java
public class Contract {
    private String deliveryTerm;

    public void setDeliveryTerm(String term) {
        if ("shipped FOB shipping point".equals(term)) {
            this.deliveryTerm = "Seller bears the risk and cost";
        } else if ("shipped FOB destination".equals(term)) {
            this.deliveryTerm = "Buyer bears the risk and cost";
        } else {
            throw new IllegalArgumentException("Invalid delivery term");
        }
    }

    public String getDeliveryTerm() {
        return deliveryTerm;
    }
}

// Example usage
Contract contract = new Contract();
contract.setDeliveryTerm("shipped FOB shipping point");
System.out.println(contract.getDeliveryTerm()); // Seller bears the risk and cost
```
??
---

---
#### Risk of Loss for Merchants and Buyers
Background context: When a merchant sells goods, the risk of loss typically passes to the buyer once they take physical possession. This principle is established under UCC 2-509(3).
:p Under what conditions does the risk of loss pass from the seller to the buyer in a commercial transaction?
??x
The risk of loss passes to the buyer when the buyer actually takes physical possession of the goods, according to UCC 2-509(3). This means that until the buyer picks up or receives the goods, the merchant continues to bear any risks such as theft, damage, or loss.
x??
---
#### Example of Risk Transfer
Background context: The example provided illustrates a scenario where risk transfer in a commercial transaction is clearly defined. James Adams bought a table saw from Bricktown Hardware and was injured when he lost his balance while securing the saw into his truck bed.
:p What legal outcome can we expect if Adams sues Bricktown for negligence?
??x
Adams will most likely lose the lawsuit because there was no duty on Bricktown's part to help him secure the saw. Once the truck was loaded, the risk of loss passed to Adams under UCC 2-509(3) as he had taken physical possession of the goods.
x??
---
#### Risk of Loss in Leases
Background context: In a lease agreement, unless it's a finance lease where the lessor acquires goods for the lessee, the risk of loss typically remains with the lessor. However, this can change based on specific contract terms and whether the lessor is a merchant.
:p When does the risk of loss pass to the lessee in a non-finance lease?
??x
The risk of loss passes to the lessee only if the lease contract explicitly states so and it does not specify when. If the lessor is a merchant, UCC 2A-219 dictates that the risk generally remains with the lessor unless otherwise agreed upon in the contract.
x??
---
#### F.O.B. (Free on Board) Terms
Background context: The term "F.O.B." indicates that the seller's price includes transportation costs to a specified location, and the seller is responsible for bearing any risks up until the goods are loaded at this point.
:p What does an F.O.B. contract entail?
??x
An F.O.B. (Free on Board) contract means the selling price includes transportation costs to a specific named place in the contract. The seller bears the risk of loss and pays the expenses until the goods reach the FOB location. This can be either from the seller’s city or to the buyer's city, defining whether it is a shipment or destination contract.
x??
---
#### C.I.F. (Cost, Insurance, and Freight) Terms
Background context: In a C.I.F. contract, risk of loss does not pass until the goods are properly unloaded at their final destination after being delivered from the ship or other carrier.
:p When does the risk of loss transfer in a C.I.F. agreement?
??x
In a C.I.F. (Cost, Insurance, and Freight) agreement, the risk of loss does not pass to the buyer until the goods are properly unloaded from the ship or other carrier at their final destination.
x??
---

---
#### Identification of Crop under Uniform Commercial Code (UCC)
Background context: Under the Uniform Commercial Code (UCC), a crop becomes identified to a contract when specific goods are set apart for performance under the agreement. This is significant because it determines who owns the property and bears the risk of loss.

:p At what point is a crop of broccoli identified to the contract under the UCC?
??x
A crop of broccoli is identified to the contract at the time the seller sets aside specific goods for performance under the agreement. Identification is significant because it affects ownership rights and the party bearing the risk of loss.
??
---

---
#### Title Transfer in Domestic Sales Contract
Background context: In a domestic sales contract, title generally transfers from the seller to the buyer when the seller performs its obligations and the goods are ready for delivery. The specific terms of the contract, including any conditions precedent, dictate the transfer of title.

:p When does title to the broccoli pass from Willow Glen to Mendoza under the contract terms?
??x
Title to the broccoli passes from Willow Glen to Mendoza when the goods meet all the specified terms and are ready for delivery. In this case, with F.O.B. Willow Glen's field by Falcon Trucking, title likely transfers once the broccoli is loaded onto Falcon’s truck.
??
---

---
#### Risk of Loss in Transit
Background context: The risk of loss generally shifts to the buyer when goods are delivered or have met certain conditions (like loading at a specific location). However, in this scenario, the risk remains with the seller until the goods are actually delivered.

:p Suppose that while in transit, Falcon’s truck overturns and spills the entire load. Who bears the loss?
??x
The loss is borne by Willow Glen since the delivery has not yet occurred, and the risk of loss typically remains with the seller until the goods are loaded onto the transportation vehicle.
??
---

---
#### Insurable Interest in Frozen Broccoli Sale
Background context: In a sale where specific grades of goods (e.g., FreshBest) are promised but not delivered, the buyer can refuse to accept them. The insurable interest here would determine who bears the cost if the goods do not meet quality expectations.

:p Suppose that instead of buying fresh broccoli, Mendoza contracted with Willow Glen to purchase one thousand cases of frozen broccoli from Willow Glen’s processing plant. If Falcon Trucking delivers FamilyPac broccoli instead of FreshBest, and Mendoza refuses to accept it, who bears the loss?
??x
If Mendoza refuses to accept the delivered FamilyPac broccoli, the loss is borne by Willow Glen since they failed to deliver the specified quality (FreshBest) as agreed upon in the contract.
??
---

---
#### Risk of Loss in Shipment vs. Destination Contracts
Background context: The distinction between shipment and destination contracts is significant for determining who bears the risk of loss during transit. A shipment contract typically requires the seller to bear the risk until delivery, whereas a destination contract places the risk on the buyer once goods leave the seller's control.

:p The debate suggests eliminating the distinction between shipment and destination contracts in favor of always requiring the buyer to obtain insurance for shipped goods. Discuss this.
??x
The debate centers around streamlining the process by ensuring that buyers are consistently responsible for insuring goods during transit, regardless of whether the contract is a shipment or destination contract. This could simplify logistics but may place an additional financial burden on buyers who might not otherwise insure their shipments.

Pros:
- Simplifies risk allocation.
- Encourages better insurance practices among buyers.

Cons:
- May shift unnecessary costs to buyers.
- Could complicate contracts and require more negotiation over insurance terms.

Ultimately, the effectiveness of this rule depends on how well it is implemented and how it balances the interests of all parties involved in a transaction.
??
---

---
#### Reasonable Time for Delivery of Goods
Background context: The UCC (Uniform Commercial Code) §2-503(1)(a) states that a seller must tender delivery of goods within a reasonable time to enable the buyer to take possession. This typically means all goods called for by a contract should be delivered in one lump sum unless specifically agreed upon otherwise.

If multiple deliveries are agreed, each delivery must still occur reasonably and timely.
:p What is required under UCC 2-503(1)(a) regarding the delivery of goods?
??x
Under UCC 2-503(1)(a), the seller must tender delivery of goods within a reasonable time to enable the buyer to take possession. This generally means all goods should be delivered in one lump sum unless otherwise agreed by both parties.
x??

---
#### Delivery in Several Lots or Installments
Background context: Unless specifically agreed upon, the UCC states that goods called for under a contract must normally be tendered in a single delivery. However, if the parties agree to deliver goods in several lots or installments, this can be acceptable.

Example: An order for 1,000 Under Armour men’s shirts could be delivered in four orders of 250 each as they are produced.
:p Can the seller deliver goods in several lots or installments?
??x
Yes, if both parties agree that the goods will be delivered in several lots or installments. This agreement can specify how and when deliveries will occur, such as producing the shirts for different seasons (summer, fall, winter, and spring).
x??

---
#### Place of Delivery
Background context: The UCC states that buyers and sellers may agree on a specific delivery location where the buyer takes possession. If no such location is specified in the contract, the place of delivery defaults to the seller's place of business or residence if the seller has no business location.

If the seller’s business is located at 123 Main Street, then goods will be delivered there unless otherwise agreed.
:p Where is the default place of delivery according to UCC 2-308(a)?
??x
The default place of delivery under UCC 2-308(a) is the seller's place of business. If the seller has no business location, then it defaults to their residence.
x??

---
#### Obligations of the Seller or Lessor
Background context: The primary obligation of a seller or lessor is to deliver goods that conform to the contract description in every way (conforming goods). This means they must either deliver or tender delivery of such goods. Delivery should occur at a reasonable hour and manner.

Seller obligations include making available and notifying the buyer when the goods are ready for pickup.
:p What is the primary obligation of the seller or lessor?
??x
The primary obligation of the seller or lessor is to deliver conforming goods that meet the contract description in every way. They must make these goods available and notify the buyer at a reasonable hour and manner so the buyer can take possession.
x??

---
#### Tender of Delivery
Background context: Tender of delivery occurs when the seller makes conforming goods available and gives the necessary notification to enable the buyer to take delivery. This must be done in a reasonable manner and at a reasonable time.

Example: If the seller has produced 250 shirts, they can notify the buyer that these are ready for pickup or delivery.
:p What is tender of delivery?
??x
Tender of delivery means the seller makes conforming goods available and provides sufficient notification to enable the buyer to take possession. This should occur in a reasonable manner at a reasonable time.
x??

---
#### Performance Under Sales or Lease Contracts
Background context: The performance required under sales or lease contracts involves fulfilling the duties and obligations each party has according to the contract terms. For sellers, this means delivering conforming goods; for buyers, accepting and paying for those goods.

The UCC provides standards of good faith and commercial reasonableness that apply to all sales and lease contracts.
:p What are the basic obligations under a sales or lease contract?
??x
The basic obligations under a sales or lease contract are:
- For the seller: To deliver conforming goods as per the agreement.
- For the buyer: To accept and pay for the conforming goods in accordance with the contract.
These duties must be performed in good faith and in compliance with commercial reasonableness standards as outlined by the UCC.
x??

---
#### Good Faith and Commercial Reasonableness
Background context: The UCC requires every party to act in good faith and follow reasonable commercial standards of fair dealing. This is an absolute requirement that cannot be waived or disclaimed.

Good faith means honesty in fact, while for merchants, it also includes adherence to reasonable commercial standards.
:p What does the UCC require regarding good faith?
??x
The UCC requires every party under a contract to act with good faith and follow reasonable commercial standards of fair dealing. Good faith means being honest in fact, and for merchants specifically, it involves adhering to reasonable commercial standards as well.

This means that even if there are no specific terms or conditions stated in the contract, both parties must still conduct themselves honestly and fairly.
x??

---

#### Shipment Contract and Risk of Loss
Background context: In a shipment contract, the seller arranges for delivery and transfer of risk to the buyer upon tendering the goods. However, if the seller fails to arrange appropriate transportation (e.g., refrigerated transport), this could lead to material loss.
:p What does the UCC allow regarding the release of goods by the bailee?
??x
The UCC allows the seller to instruct a bailee in writing to release goods to the buyer without requiring the bailee's acknowledgment of the buyer’s rights. However, risk of loss does not pass until the buyer has had a reasonable amount of time to present the document or instructions.
??x

---

#### Destination Contracts
Background context: A destination contract is an agreement where the seller promises to deliver goods at a specific location. The seller must tender the goods at a reasonable hour and hold them for a reasonable length of time, while providing necessary documents and notice for delivery from the carrier.
:p What are the obligations of the buyer in a destination contract?
??x
The buyer is obligated to accept and pay for conforming goods upon their tender at the agreed-upon location. The seller must provide appropriate notice and any necessary documents to facilitate delivery by the carrier.
??x

---

#### Perfect Tender Rule
Background context: Under the perfect tender rule, the seller has an obligation to ship or tender conforming goods that exactly match the contract terms. If there is any failure in conformity, the buyer can accept the goods, reject the entire shipment, or accept part and reject part of it.
:p What happens if the goods do not conform perfectly under the UCC?
??x
If the goods or delivery fails to conform in any respect to the contract, the buyer or lessee may accept the goods, reject the entire shipment, or accept part and reject part. However, if the goods conform in every respect, the buyer does not have a right to reject them.
??x

---

#### Case Example: Perfect Tender Rule
Background context: This case involves U.S. Golf & Tennis Centers, Inc., which ordered golf balls from Wilson Sporting Goods Company. The goods were delivered but not paid for due to a price discrepancy with another buyer.
:p What was the outcome of the court ruling in this case?
??x
The court ruled in favor of Wilson Sporting Goods Company because it was undisputed that the shipment conformed to the contract specifications, and U.S. Golf was obligated to accept the goods and pay the agreed-on price.
??x

---

#### Custom-Built Tow Truck Rejection
Background context: In this scenario, a company ordered a custom-built tow truck from a manufacturer but found it did not function properly upon delivery. The question is whether the seller’s tender of a malfunctioning truck gives the buyer the right to reject the truck under the perfect tender rule.
:p What does the perfect tender rule imply in this context?
??x
Under the perfect tender rule, if goods or their delivery fail to conform to the contract terms, the buyer can accept the goods, reject the entire shipment, or accept part and reject part. In the case of a malfunctioning tow truck, the buyer would need evidence that the defect is significant enough to justify rejection.
??x

