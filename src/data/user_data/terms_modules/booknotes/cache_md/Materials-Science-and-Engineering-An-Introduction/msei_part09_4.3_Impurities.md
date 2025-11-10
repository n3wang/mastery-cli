# High-Quality Flashcards: Materials-Science-and-Engineering-An-Introduction_processed (Part 9)


**Starting Chapter:** 4.3 Impurities in Solids

---


#### Calculation of Vacancies in Copper at 1000 °C
Background context: The problem involves calculating the equilibrium number of vacancies per cubic meter for copper at a specified temperature. Key steps include determining the atomic sites per volume and using the Arrhenius equation to find the vacancy concentration.

Formula used:
\[ N_{Cu} = \frac{N_A \rho}{A_{Cu}} \]
Where \( N_A \) is Avogadro's number, \( \rho \) is density, and \( A_{Cu} \) is atomic weight of copper.
Also,
\[ N_\gamma = N Cu e^{-Q_\gamma / kT} \]

:p What is the formula used to calculate the number of atomic sites per cubic meter for a metal like copper?
??x
The formula used is:
\[ N_{Cu} = \frac{N_A \rho}{A_{Cu}} \]
where \( N_A \) (Avogadro's number), \( \rho \) (density of copper), and \( A_{Cu} \) (atomic weight of copper).

This helps in determining the atomic sites per volume for calculating vacancies.
x??

---


#### Impurities and Solid Solutions
Background context: Impurities are always present in pure metals, even when refined to high purity. These impurities can form solid solutions or new phases depending on their nature.

Key concepts:
- Solute: element or compound present in minor concentration.
- Solvent: element or compound present in the greatest amount (also called host atoms).

:p What terms are commonly used to describe elements or compounds that are present in a minor concentration in alloys?
??x
The term "solute" is commonly used to describe elements or compounds that are present in a minor concentration in alloys.
x??

---


#### Substitutional and Interstitial Solid Solutions
Background context: In solid solutions, impurity atoms can occupy substitutional or interstitial sites. These types of impurities affect the properties of metals by altering their lattice structure.

Key rules for substitutional solutes:
1. Atomic size factor
2. Crystal structure
3. Electronegativity factor
4. Valences

:p What are the four Hume–Rothery rules governing the degree of solid solubility?
??x
The four Hume-Rothery rules governing the degree of solid solubility are:
1. Atomic size factor: Appropriate quantities of a solute may be accommodated only when the difference in atomic radii is less than about ±15%.
2. Crystal structure: Both metals must have the same crystal structure for significant solid solubility.
3. Electronegativity factor: The more electropositive one element and the more electronegative the other, the greater the likelihood of forming an intermetallic compound instead of a substitutional solid solution.
4. Valences: Other factors being equal, a metal tends to dissolve another metal of higher valency than one of lower valency.

For example, copper and nickel can form a substitutional solid solution because they have similar atomic radii, FCC crystal structures, and are both electropositive with similar valencies.
x??

---


#### Interstitial Solid Solutions in FCC and BCC Structures
Background context: Interstitial impurities occupy interstices among host atoms. In FCC and BCC crystals, there are specific types of interstitial sites based on coordination numbers.

:p What are the two types of interstitial sites in FCC structures?
??x
In FCC structures, there are two types of interstitial sites:
1. Tetrahedral: with a coordination number of 4.
2. Octahedral: with a coordination number of 6.

The representative coordinates for these sites in an FCC unit cell are given as follows:
- For tetrahedral sites: \( \left( \frac{1}{4}, \frac{3}{4}, \frac{1}{4} \right) \)
- For octahedral sites: \( \left( 0, \frac{1}{2}, \frac{1}{2} \right) \) and \( \left( \frac{1}{2}, \frac{1}{2}, 0 \right) \)

x??

---


#### Interstitial Atom Placement in BCC Unit Cell
Background context: This section explains how an interstitial atom is positioned within a body-centered cubic (BCC) unit cell, touching two adjacent corner atoms. The edge length of the unit cell is derived using both geometric and atomic radius relationships.

:p What is the relationship between the interstitial atom's radius \( r \) and the host atom's radius \( R \)?
??x
The relation can be found by equating the unit cell edge lengths calculated from two different methods: 
1. The distance between the centers of the corner atoms, which equals \( 4R\sqrt{3} \).
2. Twice the sum of the radii of a host atom and an interstitial atom positioned at the cube edge, i.e., \( 2(R + r) \).

Equating these two expressions:
\[ 2(R + r) = 4R\sqrt{3} \]

Solving for \( r \):
\[ 2r = 4R\sqrt{3} - 2R \]
\[ 2r = 2(2\sqrt{3} - 1)R \]
\[ r = (2\sqrt{3} - 1)R \approx 0.155R \]

This derivation shows the precise relationship between the host atom radius and the interstitial atom radius in a BCC structure.
??x
The answer explains how to derive the size of an interstitial atom based on the atomic radius of the host atoms in a body-centered cubic crystal structure.

```java
// Pseudocode for calculating r given R
public double calculateInterstitialRadius(double R) {
    return (2 * Math.sqrt(3) - 1) * R;
}
```
x??

---


#### Specification of Composition
Background context: The text discusses the two common ways to specify composition—weight percent and atom percent. It explains how these methods are used in alloy composition.

:p What is the formula for calculating weight percent (wt%) of an element in a binary alloy?
??x
The weight percent \( C_1 \) of element 1 is calculated as:
\[ C_1 = \frac{m_1}{m_1 + m_2} \times 100 \]
where \( m_1 \) and \( m_2 \) are the weights (or masses) of elements 1 and 2, respectively.

For a binary alloy containing more than two elements:
\[ C_1 = \frac{m_1}{\sum m_i} \times 100 \]
where \( \sum m_i \) is the total weight of all components.
??x
The formula explains how to determine the weight percent composition of an element in a binary alloy.

```java
// Pseudocode for calculating weight percent
public double calculateWeightPercent(double massElement, double totalMassAlloy) {
    return (massElement / totalMassAlloy) * 100;
}
```
x??

---


#### Atom Percent Calculation
Background context: The text explains the basis of atom percent calculations, which are based on the number of moles or atoms relative to the total moles or atoms in an alloy.

:p What is the formula for calculating atom percent (at%) of element 1 in a binary alloy?
??x
The atom percent \( C_1' \) of element 1 is calculated as:
\[ C_1' = \frac{n_{m1}}{n_{m1} + n_{m2}} \times 100 \]
where \( n_{m1} \) and \( n_{m2} \) are the number of moles of elements 1 and 2, respectively.

For a binary alloy containing more than two elements:
\[ C_1' = \frac{n_{m1}}{\sum n_{m_i}} \times 100 \]
where \( \sum n_{m_i} \) is the total number of moles of all components.
??x
The formula describes how to determine the atom percent composition of an element in a binary alloy.

```java
// Pseudocode for calculating atom percent
public double calculateAtomPercent(double moleElement1, double totalMolesAlloy) {
    return (moleElement1 / totalMolesAlloy) * 100;
}
```
x??

---


#### Conversions Between Composition Schemes
Background context: The text explains how to convert between weight percent and atom percent, including formulas for both schemes.

:p What is the formula for converting from weight percent to atom percent?
??x
The conversion equations are:
\[ C_1' = \frac{C_1 A_2}{C_1 A_2 + C_2 A_1} \times 100 \]
\[ C_2' = \frac{C_2 A_1}{C_1 A_2 + C_2 A_1} \times 100 \]

For a binary alloy, the simplifications are:
\[ C_1' = \frac{C_1 A_2}{(C_1 A_2 + C_2 A_1) \times 100} \]
\[ C_2' = \frac{C_2 A_1}{(C_1 A_2 + C_2 A_1) \times 100} \]

Where \( C_1, C_2 \) are the weight percent concentrations and \( A_1, A_2 \) are the atomic weights.
??x
The formulas explain how to convert weight percent concentration of elements in a binary alloy to atom percent.

```java
// Pseudocode for converting from weight percent to atom percent
public double[] convertWeightToAtomPercent(double C1, double C2, double A1, double A2) {
    double total = C1 * A2 + C2 * A1;
    return new double[]{(C1 * A2 / total), (C2 * A1 / total)};
}
```
x??

---


#### Concept Check Questions
Background context: The text includes concept check questions to test understanding of the material.

:p Can three or more elements form a solid solution? Explain.
??x
Yes, three or more elements can form a solid solution. A solid solution is a homogeneous mixture where one component (the solvent) has some solubility for another component (the solute). In alloys with multiple components, each element can dissolve in the others, creating a complex solid solution. The ability of elements to form solid solutions depends on factors like crystal structure compatibility and interatomic interactions.
??x
The answer explains that more than two elements can indeed form a solid solution, as long as they are compatible at an atomic level.

:p Why does complete solid solubility occur for substitutional solid solutions but not necessarily for interstitial solid solutions?
??x
Complete solid solubility occurs in substitutional solid solutions because the atoms of one element can replace those of another in the crystal lattice without significant distortion. However, in interstitial solid solutions, additional atoms fit into gaps between the host atoms, which might cause significant distortion and limit solubility.

For example, in a BCC structure, adding too many interstitial atoms can disrupt the regular packing arrangement, leading to reduced solubility.
??x
The answer explains that substitutional solutions allow complete solid solubility due to atom replacement without lattice disruption, whereas interstitial solutions are limited by atomic space availability and potential lattice distortion.

---


#### Dislocation in Solids
Background context: This section explains the concept of dislocations, which are linear defects in crystalline materials where some atoms are misaligned around a defect line. Two types of dislocations are discussed: edge and screw.

:p What is an edge dislocation?
??x
An edge dislocation is a type of dislocation represented by an extra half-plane of atoms that terminate within the crystal, as shown in Figure 4.4. The dislocation line is perpendicular to the plane of the page, and it causes localized lattice distortion around itself.

- **Local Lattice Distortion:** Atoms above the dislocation line are squeezed together, while those below are pulled apart.
- **Edge Symbol Representation:** An edge dislocation can be denoted by the symbol ⊥.

Example:
```java
public class DislocationExample {
    public static void main(String[] args) {
        // This example demonstrates how to conceptually identify an edge dislocation in a material.
        String edgeDislocationSymbol = "⊥";
        System.out.println("Edge dislocation represented by: " + edgeDislocationSymbol);
    }
}
```
x??

---


#### Mixed Dislocations
Background context: Most dislocations found in crystalline materials are mixed, meaning they have components of both edge and screw dislocations.

:p What is a mixed dislocation?
??x
A mixed dislocation combines characteristics of both edge and screw dislocations. The lattice distortion away from the two faces is mixed, having varying degrees of screw and edge character. As shown in Figure 4.6, at point A it can be pure screw, while at point B it is pure edge. In between, there can be a mix of both types.

Example:
```java
public class MixedDislocationExample {
    public static void main(String[] args) {
        // This example demonstrates how to conceptually identify mixed dislocations in a material.
        String mixedDislocationSymbol = "Mixed";
        System.out.println("Mixed dislocation represented by: " + mixedDislocationSymbol);
    }
}
```
x??

---

---

