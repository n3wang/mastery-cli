# High-Quality Flashcards: Materials-Science-and-Engineering-An-Introduction_processed (Part 18)


**Starting Chapter:** 7.4 Slip Systems

---


#### Strain Fields Around Dislocations

Background context: In metals, dislocations play a crucial role in plastic deformation. The presence of dislocations causes lattice distortion around them, leading to different strain fields that affect their mobility and interaction.

Strain fields are important as they determine how easily dislocations can move through the crystal lattice. For an edge dislocation, regions of compressive and tensile strains exist around it.

:p What is a strain field in the context of dislocations?
??x
A strain field refers to the distortions in the atomic lattice that surround a dislocation, including regions of compressive and tensile strains.
x??

---


#### Slip Systems for Face-Centered Cubic (FCC) Metals

Background context: For metals with an FCC crystal structure like copper, aluminum, nickel, etc., slip occurs along specific planes called the slip plane and in specific directions within these planes known as the slip direction. This combination is referred to as a slip system.

For example, for FCC crystals, the {111} family of planes has the densest atomic packing, making it a preferred slip plane. Within this plane, dislocation motion occurs along 〈110

---


#### Slip System for Simple Cubic Crystal
Background context: In a simple cubic crystal structure, slip occurs along specific planes and directions. The resolved shear stress determines which system is most favorable to operate.

:p Which of the following is the correct slip system for a simple cubic crystal?
??x
The slip systems are typically defined by the combination of the slip plane and the slip direction. For a simple cubic crystal, the slip plane and direction can be represented as {100} 〈110, which means that a dislocation can move along the [110] direction within the (100) plane.

The other options are not valid for a simple cubic structure:
- {110} 〈110: This does not form a proper slip system in simple cubic.
- {100} 〈010: This is an incorrect combination.
- {110} 〈111: This is also not valid for simple cubic.

The correct answer is:
{100} 〈110.
x??

---


#### Resolved Shear Stress and Slip
Background context: The resolved shear stress (𝜏R) is a critical component in understanding how slip occurs. It depends on the applied stress, orientation of the slip plane normal, and the slip direction relative to the stress.

Formula:
$$\tau_R = \sigma \cos\phi \cos\lambda$$:p What is the formula for resolved shear stress (𝜏R)?
??x
The formula for resolved shear stress (𝜏R) is given by:
$$\tau_R = \sigma \cos\phi \cos\lambda$$

Where:
- $\sigma$ is the applied stress,
- $\phi$ is the angle between the normal to the slip plane and the direction of the applied stress,
- $\lambda$ is the angle between the slip direction and the direction of the applied stress.

This formula helps in determining which orientation of the slip system will have the maximum resolved shear stress, thus initiating plastic deformation.
x??

---


#### Critical Resolved Shear Stress
Background context: The critical resolved shear stress (𝜏crss) represents the minimum shear stress required to initiate slip. It is a material property and determines when yielding occurs.

Formula:
$$\sigma_y = \tau_{crss} (\cos\phi \cos\lambda)_{max}$$

:p What is the formula for yield strength ($\sigma_y$) in terms of critical resolved shear stress (𝜏crss)?
??x
The yield strength ($\sigma_y$) can be expressed as:

$$\sigma_y = \tau_{crss} (\cos\phi \cos\lambda)_{max}$$

Where:
- $\tau_{crss}$ is the critical resolved shear stress,
- $(\cos\phi \cos\lambda)_{max}$ represents the maximum value of the product of the cosines involved.

This formula indicates that the applied stress required to initiate yielding depends on both the critical resolved shear stress and the orientation of the slip system.
x??

---


#### Slip in a Single Crystal
Background context: In single crystals, deformation occurs along preferred slip systems. The most favorable slip system has the highest resolved shear stress, which initiates plastic deformation when it reaches the critical value.

:p What happens to a metal single crystal when the maximum resolved shear stress ($\tau_{R(max)}$) equals the critical resolved shear stress (𝜏crss)?
??x
When the maximum resolved shear stress ($\tau_{R(max)}$) equals the critical resolved shear stress (𝜏crss), the metal single crystal starts to plastically deform or yield. This means that yielding occurs, and the magnitude of the applied stress required to initiate this deformation is given by:

$$\sigma_y = \tau_{crss} (\cos\phi \cos\lambda)_{max}$$

This condition indicates that the material has reached its yield point.
x??

---


#### Slip Lines in Single Crystals
Background context: Macroscopically, slip in a single crystal manifests as small steps on the surface of the specimen. These steps are called slip lines and form due to dislocation movement along preferred slip planes and directions.

:p What are slip lines in the context of single crystals?
??x
Slip lines are the observable features on the surface of a single crystal that result from plastic deformation. They appear as small, parallel steps and occur when dislocations move along the most favorable slip planes and directions. These steps are formed due to the movement of many dislocations together, creating distinct lines or steps on the surface.

Slip lines can be visualized macroscopically and provide evidence of how single crystals deform under applied stress.
x??

---


#### Example Problem: Resolved Shear Stress
Background context: The example problem demonstrates the calculation of resolved shear stress for a specific orientation in BCC iron. It involves using the given angles to compute the stress necessary to initiate yielding.

:p In the example, what is the step-by-step process to calculate the resolved shear stress?
??x
To calculate the resolved shear stress (𝜏R) for a single crystal of BCC iron oriented such that a tensile stress is applied along [010], follow these steps:

1. **Identify the given values:**
   - Tensile stress ($\sigma$) = 52 MPa
   - Slip plane: (110)
   - Slip direction: [1 11]
   - Given $\phi $ and$\lambda$ angles.

2. **Calculate $\phi$:**
   - $\phi$ is the angle between the normal to the (110) slip plane ([110]) and the applied stress direction ([010]).
   - Use Equation 7.6:
$$\phi = \cos^{-1} \left( \frac{(1)(0) + (1)(1) + (0)(0)}{\sqrt{(1)^2 + (1)^2 + (0)^2} \cdot \sqrt{(0)^2 + (1)^2 + (0)^2}} \right) = 45^\circ$$3. **Calculate $\lambda$:**
   - $\lambda$ is the angle between the slip direction ([1 11]) and the applied stress direction ([010]).
   - Use Equation 7.6:
$$\lambda = \cos^{-1} \left( \frac{(1)(0) + (1)(1) + (1)(0)}{\sqrt{(1)^2 + (1)^2 + (1)^2} \cdot \sqrt{(0)^2 + (1)^2 + (0)^2}} \right) = 45^\circ$$4. **Substitute into the resolved shear stress formula:**
   -$\tau_R = \sigma \cos\phi \cos\lambda$- Substitute the values:
$$\tau_R = 52 \, \text{MPa} \times \cos(45^\circ) \times \cos(45^\circ)$$$$\tau_R = 52 \, \text{MPa} \times \left(\frac{\sqrt{2}}{2}\right) \times \left(\frac{\sqrt{2}}{2}\right)$$$$\tau_R = 52 \, \text{MPa} \times \frac{1}{2}$$$$\tau_R = 26 \, \text{MPa}$$

Therefore, the resolved shear stress along the (110) plane in a [1 11] direction is 26 MPa.
x??

---


#### Resolved Shear Stress and Critical Resolved Shear Stress
Background context: The critical resolved shear stress (𝜏crss) is the minimum shear stress required to initiate slip, while the resolved shear stress (𝜏R) depends on the orientation of the applied stress relative to the slip plane and direction.

:p What is the difference between resolved shear stress (𝜏R) and critical resolved shear stress (𝜏crss)?
??x
Resolved shear stress ($\tau_R$) is the actual shear stress experienced by a dislocation moving along a particular slip system, which depends on the orientation of both the applied stress and the slip plane/direction.

Critical resolved shear stress ($\tau_{crss}$) is the minimum value of $\tau_R$ required to initiate plastic deformation (yielding) in a material. It represents the threshold stress needed for dislocation movement, making it a material property that determines when yielding begins.

In summary:
- $\tau_R$: Actual shear stress at any given orientation.
- $\tau_{crss}$: Minimum stress required to start slip and initiate plastic deformation.
x??

---

---


#### Calculation of Yield Strength for a Polycrystalline Material
Background context: The text explains how to calculate the yield strength $\sigma_y$ of a material under slip, using specific crystallographic directions and angles. It includes formulas from Equations 7.2 and 7.4.

:p What is the formula used to compute the resolved shear stress $\tau_R$ for a given orientation in a polycrystalline material?
??x
The formula to compute the resolved shear stress $\tau_R$ is:
$$\tau_R = \sigma \cos \varphi \cos \lambda$$where $\sigma $ is the applied stress,$\varphi $ is the angle between the applied stress and the normal to the slip plane, and$\lambda$ is the angle between the resolved shear vector on the slip plane and the direction of the dislocation.

:p What is the formula used to compute the yield strength $\sigma_y$ for a given orientation in a polycrystalline material?
??x
The formula to compute the yield strength $\sigma_y$ is:
$$\sigma_y = 30 \text{ MPa} (\cos 45^\circ)(\cos 54.7^\circ)$$where $30 \text{ MPa}$ is the applied stress, and $45^\circ$ and $54.7^\circ$ are the angles as defined in part (a).

:p What are slip lines visible on the surface of a deformed polycrystalline specimen?
??x
Slip lines are microscopic ledges produced by dislocations that have exited from a grain and appear as lines when viewed with a microscope. These lines indicate where plastic deformation has occurred.

:p How does deformation affect the structure of polycrystalline metals?
??x
Deformation affects the structure of polycrystalline metals by causing grains to change shape. Before deformation, grains are equiaxed (having approximately the same dimensions in all directions). After deformation, the grains become elongated along the direction in which the specimen was extended.

:p Why are polycrystalline metals stronger than their single-crystal equivalents?
??x
Polycrystalline metals are stronger because greater stresses are required to initiate slip and yield. This is due to geometric constraints imposed on the grains during deformation, where a single grain cannot deform until adjacent less favorably oriented grains can also slip, requiring a higher applied stress level.

---

