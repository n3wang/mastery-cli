# High-Quality Flashcards: Materials-Science-and-Engineering-An-Introduction_processed (Part 6)


**Starting Chapter:** CRYSTALLOGRAPHIC POINTS DIRECTIONS AND PLANES. 3.8 Point Coordinates

---


#### Lattice Position Coordinates
Background context explaining how lattice position coordinates are used to specify points within a unit cell. The concept of fractional lengths and their relation to indices is introduced.

:p What are lattice position coordinates, and how do they relate to point indices?
??x
Lattice position coordinates (P<sub>x</sub>, P<sub>y</sub>, P<sub>z</sub>) represent the positions within a unit cell in terms of fractional multiples of the unit cell edge lengths. These coordinates are defined by three point indices (q, r, s), which indicate how far along each axis a particular lattice site is located.

For example:
$$P_x = qa$$
$$

P_y = rb$$
$$

P_z = sc$$

Where $a $,$ b $, and$ c$ are the lengths of the unit cell edges along the x, y, and z axes respectively. The indices q, r, s can be fractional numbers.

```java
// Example code to calculate lattice position coordinates in a unit cell.
public class LatticePosition {
    private double a; // edge length along x axis
    private double b; // edge length along y axis
    private double c; // edge length along z axis
    
    public LatticePosition(double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    
    public void calculateCoordinates(double q, double r, double s) {
        double px = q * a;
        double py = r * b;
        double pz = s * c;
        System.out.println("P_x: " + px);
        System.out.println("P_y: " + py);
        System.out.println("P_z: " + pz);
    }
}
```
x??

---


#### Point Indices and Unit Cell Edge Lengths
This section explains how to determine the point indices (q, r, s) based on the fractional multiples of the unit cell edge lengths.

:p Given a set of unit cell dimensions and point indices, how do you calculate the lattice position coordinates?
??x
Given the unit cell dimensions $a $, $ b $, and$ c$for edges along the x, y, and z axes respectively, and the point indices q, r, s, the lattice position coordinates can be calculated as follows:
$$P_x = qa$$
$$

P_y = rb$$
$$

P_z = sc$$

For example, if you have a unit cell with edge lengths $a = 0.48 \text{ nm}$,$ b = 0.46 \text{ nm}$, and $ c = 0.40 \text{ nm}$and point indices $ q = 1/4$,$ r = 1 $, and$ s = 1/2$:

$$P_x = (1/4) * 0.48 \text{ nm} = 0.12 \text{ nm}$$
$$

P_y = 1 * 0.46 \text{ nm} = 0.46 \text{ nm}$$
$$

P_z = (1/2) * 0.40 \text{ nm} = 0.20 \text{ nm}$$

This calculation determines the exact position of a point within the unit cell.

```java
public class CalculateCoordinates {
    public void calculate(double qa, double ra, double sa, double a, double b, double c) {
        double px = qa * a;
        double py = ra * b;
        double pz = sa * c;
        
        System.out.println("P_x: " + px);
        System.out.println("P_y: " + py);
        System.out.println("P_z: " + pz);
    }
}
```
x??

---


#### Location of Point with Specified Coordinates
This part explains how to locate a point within the unit cell given its point indices and the unit cell edge lengths.

:p How do you locate a specific point in the unit cell using its point indices?
??x
To locate a specific point in the unit cell, you use the point indices (q, r, s) along with the unit cell edge lengths $a $, $ b $, and$ c$ to calculate the lattice position coordinates. The steps are as follows:

1. Identify the point indices q, r, and s.
2. Use the formulae:
$$P_x = qa$$$$P_y = rb$$$$P_z = sc$$

For example, if you have a unit cell with edge lengths $a = 0.48 \text{ nm}$,$ b = 0.46 \text{ nm}$, and $ c = 0.40 \text{ nm}$and point indices $ q = 1/4$,$ r = 1 $, and$ s = 1/2$:

- Calculate the x-coordinate:
   $$P_x = (1/4) * 0.48 \text{ nm} = 0.12 \text{ nm}$$- Calculate the y-coordinate:
$$

P_y = 1 * 0.46 \text{ nm} = 0.46 \text{ nm}$$- Calculate the z-coordinate:
$$

P_z = (1/2) * 0.40 \text{ nm} = 0.20 \text{ nm}$$

Once you have these coordinates, move from the origin of the unit cell along the respective axes by these distances to locate the point.

```java
public class LocatePoint {
    public void findLocation(double qa, double ra, double sa, double a, double b, double c) {
        double px = qa * a;
        double py = ra * b;
        double pz = sa * c;
        
        System.out.println("Point location: (" + px + ", " + py + ", " + pz + ")");
    }
}
```
x??

---


---
#### Defining Crystallographic Directions
Background context: A crystallographic direction is defined as a line directed between two points or a vector. The process involves determining three directional indices to describe the orientation of this vector within a unit cell.

:p How are crystallographic directions determined?
??x
To determine crystallographic directions, you first construct a right-handed x-y-z coordinate system (often with its origin at a unit cell corner). Then, identify two points on the direction vector: tail point coordinates $(x_1, y_1, z_1)$ and head point coordinates $(x_2, y_2, z_2)$. The next step is to compute the coordinate differences between these points:

$$x_2 - x_1, \; y_2 - y_1, \; z_2 - z_1$$

These differences are then normalized by dividing them with their respective lattice parameters $a $,$ b $, and$ c$:

$$u = \frac{x_2 - x_1}{a}, \quad v = \frac{y_2 - y_1}{b}, \quad w = \frac{z_2 - z_1}{c}$$

If necessary, these indices are reduced to the smallest integers by multiplying or dividing them by a common factor. The final indices, without commas and enclosed in square brackets, represent the direction:
$$[uvw]$$

It's important to maintain consistency with positive-negative conventions.
??x
The process involves identifying two points on the vector (tail and head), computing their coordinate differences, normalizing these differences using lattice parameters, and then reducing them to integers. The indices are represented in square brackets.

```java
// Pseudocode for determining directional indices
public class CrystalDirection {
    public double[] determineIndices(double x1, double y1, double z1,
                                     double x2, double y2, double z2,
                                     double a, double b, double c) {
        // Compute differences
        double u = (x2 - x1) / a;
        double v = (y2 - y1) / b;
        double w = (z2 - z1) / c;

        // Reduce to integers if necessary
        int[] indices = reduceToIntegers(u, v, w);

        return indices;
    }

    private int[] reduceToIntegers(double u, double v, double w) {
        int[] result = new int[3];
        result[0] = (int) Math.round(u);
        result[1] = (int) Math.round(v);
        result[2] = (int) Math.round(w);

        // Adjust for negative indices
        if (result[0] < 0) {
            result[0] *= -1;
        }
        if (result[1] < 0) {
            result[1] *= -1;
        }
        if (result[2] < 0) {
            result[2] *= -1;
        }

        return result;
    }
}
```
x??

---


#### Normalizing to Lattice Parameters
Background context: After computing the coordinate differences between two points on a vector, these values are normalized by dividing them with their respective lattice parameters $a $, $ b $, and$ c$. This yields the directional indices.

:p How is normalization performed?
??x
Normalization involves dividing each of the coordinate differences by the corresponding lattice parameter:

$$u = \frac{x_2 - x_1}{a}, \quad v = \frac{y_2 - y_1}{b}, \quad w = \frac{z_2 - z_1}{c}$$

This step transforms the raw coordinate differences into a more useful form for describing crystallographic directions.

```java
// Pseudocode for normalizing coordinates
public class NormalizeCoordinates {
    public double[] normalize(double xDiff, double yDiff, double zDiff,
                              double a, double b, double c) {
        double u = xDiff / a;
        double v = yDiff / b;
        double w = zDiff / c;

        return new double[] {u, v, w};
    }
}
```
x??

---


#### Calculation of Crystallographic Direction Indices

Background context explaining how to determine direction indices for a crystal. The process involves calculating the differences between coordinates and then scaling these differences by an appropriate integer value $n$ to ensure that the resulting direction vectors have integer values.

:p How do you calculate the direction indices for a given vector in a unit cell?
??x
To calculate the direction indices, follow these steps:

1. Determine the difference in coordinates:$(\Delta x = x_2 - x_1)$,$(\Delta y = y_2 - y_1)$, and $(\Delta z = z_2 - z_1)$.
2. Scale these differences by an integer $n$ such that the resulting indices are integers.
3. The direction vector can then be represented as:$[u, v, w]$ where $u = n(\Delta x / a)$,$ v = n(\Delta y / b)$, and $ w = n(\Delta z / c)$.

For example, if the differences in coordinates are fractional, you might need to choose an appropriate value for $n $. In the provided text, it is noted that if these values are not integers, another value of $ n$ should be chosen.

```java
// Pseudocode for calculating direction indices
public class DirectionIndices {
    public static int[] calculateDirectionIndices(double dx, double dy, double dz, double a, double b, double c) {
        int u = (int)((dx / a) * 2); // Example scaling by 2 to ensure integer values
        int v = (int)((dy / b) * 2);
        int w = (int)((dz / c) * 2);
        return new int[]{u, v, w};
    }
}
```

x??

---


#### Construction of a Specified Crystallographic Direction

Background context explaining the process of constructing a crystallographic direction within a unit cell. This involves determining the coordinates of the vector head based on the tail coordinates and the calculated direction indices.

:p How do you construct a specified crystallographic direction in a unit cell?
??x
To construct a specified crystallographic direction, follow these steps:

1. Identify the tail coordinates $(x_1, y_1, z_1)$ of the vector.
2. Determine the calculated values of $u $, $ v $, and$ w$ using the formulae: 
   -$u = n(x_2 - x_1 / a)$-$ v = n(y_2 - y_1 / b)$-$ w = n(z_2 - z_1 / c)$3. Set $ n$ to 1 if the direction indices are already integers.
4. Calculate the head coordinates $(x_2, y_2, z_2)$ using the formulae:
   -$x_2 = u * a + x_1 $-$ y_2 = v * b + y_1 $-$ z_2 = w * c + z_1 $For example, if the tail coordinates are$(0, 0, 0)$ and the direction indices are $[u, v, w] = [1, -1, 0]$, then:
- $x_2 = 1*a + 0 = a $-$ y_2 = -1*b + 0 = -b $-$ z_2 = 0*c + 0 = 0$```java
// Pseudocode for constructing the vector head coordinates
public class VectorConstruction {
    public static void constructDirection(double a, double b, double c, int u, int v, int w) {
        double x1 = 0; // Tail coordinate x
        double y1 = 0; // Tail coordinate y
        double z1 = 0; // Tail coordinate z
        
        double x2 = u * a + x1;
        double y2 = v * b + y1;
        double z2 = w * c + z1;
        
        System.out.println("Head coordinates: (" + x2 + ", " + y2 + ", " + z2 + ")");
    }
}
```

x??

---


#### Crystallographic Direction Equivalence in Cubic Crystals

Background context explaining that certain crystallographic directions are equivalent if they represent the same spacing of atoms, regardless of their direction. In cubic crystals, all directions represented by indices like $[100]$,$[100]$,$[010]$, etc., are considered equivalent.

:p How do you determine the equivalence of crystallographic directions in a cubic crystal?
??x
In a cubic crystal system, certain crystallographic directions are considered equivalent if they represent the same spacing of atoms. This means that directions with the same set of indices, regardless of order or sign, are equivalent. For example, in a cubic crystal:
- $[100]$ is equivalent to $[100]$,$[-100]$, and so on.
- All such sets of indices are grouped together into a family.

The equivalence can be represented using angle brackets: 
$$\text{Equivalent directions} = \langle 100 \rangle$$

This means that the crystal structure is invariant under these equivalent directions, implying that the spacing of atoms along any direction within this family will be identical.

For example, in cubic crystals, all the following indices represent the same set of equivalent directions:
$$[100], [100], [-100], [010], [010], [0-10]$$x??

---

---


#### Miller-Bravais Coordinate System for Hexagonal Crystals
Background context: In hexagonal crystals, some equivalent crystallographic directions do not have the same set of indices as a three-axis system. Therefore, a four-axis or Miller-Bravais coordinate system is used to represent these directions uniquely.

The three $a_1 $, $ a_2 $, and$ a_3 $axes are all contained within a single plane (called the basal plane) at 120° angles to one another. The$ z $axis is perpendicular to this basal plane. Directional indices, denoted by four indices$[uvtw]$, relate to vector coordinate differences in the basal plane and the $ z$ axis.

The conversion from three-index system (using the a1–a2–z axes) to the four-index system as [UVW ]→[uvtw ] is given by:
$$u = \frac{1}{3}(2U - V)$$
$$v = \frac{1}{3}(2V - U)$$
$$t = -(u + v)$$
$$w = W$$

Here,$U $, $ V $, and$ W $are the uppercase indices in the three-index scheme, while$ u $,$ v $,$ t $, and$ w$ are the lowercase indices in the four-index system.

:p What is the Miller-Bravais coordinate system used for?
??x
The Miller-Bravais coordinate system is used to represent crystallographic directions uniquely in hexagonal crystals, where equivalent directions may not share the same set of indices under a three-axis system. It involves four axes:$a_1 $, $ a_2 $,$ a_3 $(in a basal plane) and$ z$ perpendicular to this plane.
x??

---


#### Conversion from Three-Index to Four-Index System
Background context: The conversion is essential when dealing with hexagonal crystals, where the directional indices are represented by four indices $[uvtw]$.

The equations for converting three-index system (using $U $, $ V $, and$ W $) to a four-index system ($ u $,$ v $,$ t $, and$ w$) are:
$$u = \frac{1}{3}(2U - V)$$
$$v = \frac{1}{3}(2V - U)$$
$$t = -(u + v)$$
$$w = W$$

For example, the [010] direction becomes [1 210].

:p How are three-index system indices (U, V, W) converted to four-index system indices (u, v, t, w)?
??x
To convert from a three-index system (using $U $, $ V $, and$ W $) to a four-index system ($ u $,$ v $,$ t $, and$ w$), the following equations are used:
$$u = \frac{1}{3}(2U - V)$$
$$v = \frac{1}{3}(2V - U)$$
$$t = -(u + v)$$
$$w = W$$

For instance, if $U = 0 $,$ V = -2 $, and$ W = 1$:
$$u = \frac{1}{3}(2(0) - (-2)) = \frac{2}{3}$$
$$v = \frac{1}{3}(2(-2) - 0) = -\frac{4}{3}$$
$$t = -(u + v) = -(\frac{2}{3} - \frac{4}{3}) = \frac{2}{3}$$
$$w = W = 1$$

Multiplying these indices by 3 to reduce them to the lowest set yields $u = 2 $,$ v = -4 $,$ t = 2 $, and$ w = 3$. Therefore, the direction [021] converts to [2-423].

```java
// Example Java code for conversion
public class ConversionExample {
    public static void main(String[] args) {
        double U = 0;
        double V = -2;
        double W = 1;
        
        double u = (2 * U - V) / 3;
        double v = (2 * V - U) / 3;
        double t = -(u + v);
        double w = W;
        
        // Convert to lowest integers
        int uInt = (int)Math.round(u * 3);
        int vInt = (int)Math.round(v * 3);
        int tInt = (int)Math.round(t * 3);
        int wInt = (int)w;
        
        System.out.println("u: " + uInt + ", v: " + vInt + ", t: " + tInt + ", w: " + wInt);
    }
}
```
x??

---


#### Determination of Directional Indices in Hexagonal Crystals
Background context: The directional indices are determined by the subtraction of vector tail point coordinates from head point coordinates. For a hexagonal crystal, this involves using the three-axis coordinate system (a1–a2–z) first and then converting to the four-index system.

The U, V, W indices can be derived as:
$$U = n(a_1'' - a_1' a)$$
$$

V = n(a_2'' - a_2' a)$$
$$

W = n(z'' - z' c)$$

Where $n$ is an integer that helps in reducing the U, V, W to their lowest values.

:p How are directional indices determined for hexagonal crystals?
??x
Directional indices for hexagonal crystals are determined by first calculating the three-index system (U, V, W) using vector coordinates. The U, V, and W indices are derived as follows:
$$U = n(a_1'' - a_1' a)$$
$$

V = n(a_2'' - a_2' a)$$
$$

W = n(z'' - z' c)$$

Here,$a_1'$,$ a_2'$, and $ z'$are the coordinates of the tail point, and $ a_1''$,$ a_2''$, and $ z''$are the coordinates of the head point. The parameter $ n$ is used to facilitate reduction to integer values.

Once U, V, W are determined, they can be converted into u, v, t, w indices using:
$$u = \frac{1}{3}(2U - V)$$
$$v = \frac{1}{3}(2V - U)$$
$$t = -(u + v)$$
$$w = W$$

For example, if $a_1'' = 0a $,$ a_2'' = -a $, and$ z'' = c/2$:
$$U = n(0 - 0) = 0$$
$$

V = n(-1 - 0) = -n$$
$$

W = n(c/2 - 0) = nc/2$$

Assuming $n=2$ for simplicity:
$$U = 0, \quad V = -2, \quad W = c$$

Converting to the four-index system:
$$u = \frac{1}{3}(2(0) - (-2)) = \frac{2}{3}$$
$$v = \frac{1}{3}(2(-2) - 0) = -\frac{4}{3}$$
$$t = -(u + v) = -(\frac{2}{3} - \frac{4}{3}) = \frac{2}{3}$$
$$w = W = c$$

Multiplying by 3:
$$u = 2, \quad v = -4, \quad t = 2, \quad w = 3$$

Thus, the directional index is [2-423].

```java
// Example Java code for determining indices
public class IndexCalculation {
    public static void main(String[] args) {
        double a1PrimeX = 0;
        double a2PrimeX = -1;
        double zPrimeY = 0;
        
        double a1DoublePrimeX = 0;
        double a2DoublePrimeX = -1;
        double zDoublePrimeY = 0.5;
        
        int n = 2; // Example value
        
        double U = n * (a1DoublePrimeX - a1PrimeX);
        double V = n * (a2DoublePrimeX - a2PrimeX);
        double W = n * (zDoublePrimeY - zPrimeY);
        
        double u = (2 * U - V) / 3;
        double v = (2 * V - U) / 3;
        double t = -(u + v);
        double w = W;
        
        // Convert to lowest integers
        int uInt = (int)Math.round(u * 3);
        int vInt = (int)Math.round(v * 3);
        int tInt = (int)Math.round(t * 3);
        int wInt = (int)w;
        
        System.out.println("u: " + uInt + ", v: " + vInt + ", t: " + tInt + ", w: " + wInt);
    }
}
```
x??

---

---


#### Determining Miller Indices for Crystallographic Planes
Background context: In crystallography, Miller indices are used to describe the orientation of planes within a unit cell. This system is crucial for understanding the structure of crystalline solids and determining the properties related to these planes.

The process involves several steps:
1. **Origin and Plane Interaction**: The plane's position relative to the origin.
2. **Intercept Determination**: Finding where the plane intersects each axis (x, y, z).
3. **Reciprocal Calculation**: Taking reciprocals of the intercepts.
4. **Normalization**: Multiplying by lattice parameters (a, b, c) and simplifying.

:p What is the first step in determining Miller indices?
??x
The first step involves checking if the plane passes through the selected origin. If it does, another parallel plane must be constructed within the unit cell or a new origin established at a corner of another unit cell.
x??

---


#### Normalizing Indices
Background context: After finding and reciprocating the intercepts, the next step is to normalize these values. This involves multiplying by the lattice parameters (a, b, c) and simplifying to obtain integer indices.

:p How do you normalize the reciprocal intercepts?
??x
You multiply each reciprocal of the intercepts $\frac{1}{A}$,$\frac{1}{B}$, and $\frac{1}{C}$ by their respective lattice parameters (a, b, c). Then, if necessary, you simplify these values to the smallest set of integers.
x??

---


#### Determining Miller Indices
Background context: The final step is to use the normalized intercept reciprocals to determine the Miller indices. This involves setting up equations that relate the normalized intercepts back to the indices.

:p How are the Miller indices determined?
??x
The Miller indices (h, k, l) are determined by normalizing the intercepts and then using the following equations:
$$h = \frac{n}{A} \cdot a$$
$$k = \frac{n}{B} \cdot b$$
$$l = \frac{n}{C} \cdot c$$where $ n $ is a factor that ensures $ h, k,$and $ l$ are integers. These indices are then simplified to the smallest set of integers.
x??

---


#### Determining New Origins
Background context: When a crystallographic plane intersects an axis or face, you may need to establish a new origin. The rules for this are given in steps 8 and 9.

:p What procedure can be used to select a new origin?
??x
To determine a new origin when the crystallographic plane intersects an axis or face:
1. If the plane lies on one of the unit cell faces, move the origin parallel to the intersecting axis by one unit cell distance.
2. If the plane passes through one of the axes, move the origin parallel to either of the other two axes by one unit cell distance.
3. For all other cases, move the origin parallel to any of the three unit cell axes by one unit cell distance.
x??

---


#### Index Reduction and Crystallographic Planes
Background context: Index reduction is sometimes not performed, especially for certain types of crystallographic planes. For example, (002) might be left as (002), which can affect how ionic arrangements are interpreted in ceramic materials. The Miller indices provide a standardized way to describe crystallographic planes.

:p What is the significance of index reduction in crystallography?
??x
Index reduction involves simplifying the Miller indices by multiplying them with the smallest integer that makes all indices integers. However, sometimes this process is not carried out for specific applications or materials, such as x-ray diffraction studies and certain ceramic materials.
x??

---


#### Planar Directions and Perpendicular Relationships in Cubic Crystals
Background context: In cubic crystals, planes and directions having the same Miller indices are always perpendicular to each other. This relationship does not necessarily hold true for non-cubic crystal systems.

:p How do planes with the same Miller indices relate to each other in a cubic crystal?
??x
In cubic crystals, planes and directions having the same Miller indices are perpendicular to each other due to the symmetry of the cubic structure.
x??

---


#### Determining Miller Indices Using Coordinate Axes
Background context: To determine the Miller indices for a given plane, you need to identify its intercepts with the coordinate axes. The formula used is $\frac{1}{h} = \frac{x_0}{a}, \frac{1}{k} = \frac{y_0}{b}, \frac{1}{l} = \frac{z_0}{c}$, where $(x_0, y_0, z_0)$ are the intercepts and $a, b, c$ are the unit cell parameters.

:p How do you determine the Miller indices for a crystallographic plane?
??x
To determine the Miller indices for a crystallographic plane, identify its intercepts with the coordinate axes (x, y, z). Use these intercepts to calculate $h, k, l $ using the formulae:$\frac{1}{h} = \frac{x_0}{a}, \frac{1}{k} = \frac{y_0}{b}, \frac{1}{l} = \frac{z_0}{c}$, where $(x_0, y_0, z_0)$ are the intercepts and $a, b, c$ are the unit cell parameters.
x??

---


#### Example of Determining Miller Indices
Background context: An example is provided to demonstrate how to determine the Miller indices for a plane that passes through the origin. The new coordinate system must be chosen such that one of the axes (usually y or z) intersects the plane at finite coordinates.

:p How do you handle planes passing through the origin when determining Miller indices?
??x
When a plane passes through the origin, you need to choose a new coordinate system where one of the axes intersects the plane at a finite coordinate. Adjust the formulae for intercepts accordingly and use $\frac{1}{h} = \frac{x_0}{a}, \frac{1}{k} = \frac{y_0}{b}, \frac{1}{l} = \frac{z_0}{c}$ to find the indices.
x??

---


#### Constructing a Specified Crystallographic Plane
Background context: To construct a specified crystallographic plane, you need to identify its intercepts with the coordinate axes and then use these intercepts to determine the Miller indices. This process is essentially the reverse of determining Miller indices from an existing plane.

:p How do you construct a specified crystallographic plane within a unit cell?
??x
To construct a specified crystallographic plane, start by identifying the desired Miller indices (h, k, l). Use these to determine the intercepts with the coordinate axes and then plot the plane in the unit cell. This involves understanding how each index affects the position of the plane relative to the unit cell edges.
x??

---


#### Atomic Arrangements for Crystallographic Planes
Background context: The atomic arrangement on a crystallographic plane can vary based on the crystal structure (e.g., FCC vs BCC). Understanding these arrangements helps in predicting properties like diffraction patterns and mechanical behavior.

:p How does the atomic arrangement of a crystallographic plane differ between cubic crystal structures?
??x
The atomic arrangement on a crystallographic plane differs significantly between different cubic crystal structures. For example, (110) planes have distinct atomic packing for Face-Centered Cubic (FCC) and Body-Centered Cubic (BCC) structures.
x??

---

---


#### Miller Indices and Crystal Planes
Background context: Miller indices are used to describe crystallographic planes within a unit cell. These indices help identify atomic arrangements and packing configurations in crystals, which is crucial for understanding material properties.

:p What do Miller indices represent?
??x
Miller indices represent the orientation of a plane relative to the edges of the unit cell. Each index (h, k, l) corresponds to the intercepts on these axes.
```java
// Example pseudocode for calculating the intercepts
public class CrystalPlane {
    private int h;
    private int k;
    private int l;

    public CrystalPlane(int h, int k, int l) {
        this.h = h;
        this.k = k;
        this.l = l;
    }

    public double getAxialInterceptA() {
        return (double)h; // A = h * a
    }

    public double getAxialInterceptB() {
        return Double.POSITIVE_INFINITY; // B = ∞b
    }

    public double getAxialInterceptC() {
        return (double)l; // C = l * c
    }
}
```
x??

---


#### Planes in Cubic Crystals
Background context: In cubic crystals, planes are indexed using Miller indices. These planes can have different orientations and intersections with the axes of the unit cell.

:p What is the significance of (101) plane in a cubic crystal?
??x
The (101) plane intersects the x-axis at 'a', parallels the y-axis (due to B = ∞b), and intersects the z-axis at 'c'. This configuration helps identify the specific orientation of the plane within the unit cell.
```java
// Example pseudocode for defining a cubic crystal plane
public class CubicPlane {
    private int h;
    private int k;
    private int l;

    public CubicPlane(int h, int k, int l) {
        this.h = h;
        this.k = k;
        this.l = l;
    }

    public boolean intersectsXAxis(double a) {
        return h != 0; // A = h * a
    }

    public boolean parallelsYAxis() {
        return k == 0; // B = ∞b
    }

    public boolean intersectsZAxis(double c) {
        return l != 0; // C = l * c
    }
}
```
x??

---


#### Reducing Redundancy in Hexagonal Crystals
Background context: In hexagonal crystals, redundant information can be reduced by using the Miller–Bravais system. This ensures that equivalent planes are represented with the same set of indices.

:p How does the Miller–Bravais system reduce redundancy?
??x
The Miller–Bravais system uses four indices (h, k, l, i) to describe hexagonal crystal planes. The index 'i' is determined by the sum of h and k: $i = -(h + k)$. This reduces redundancy as it ensures that equivalent planes have identical sets of indices.
```java
// Example pseudocode for calculating redundant index in Miller–Bravais system
public class HexagonalPlane {
    private int h;
    private int k;
    private int l;
    private int i;

    public HexagonalPlane(int h, int k, int l) {
        this.h = h;
        this.k = k;
        this.l = l;
        // Calculate i using the formula
        this.i = - (h + k);
    }

    public boolean isEquivalent(HexagonalPlane other) {
        return (this.h == other.h && this.k == other.k && this.l == other.l && this.i == other.i);
    }
}
```
x??

---


#### Miller–Bravais Indices for Hexagonal Unit Cells
Background context: In crystallography, determining the indices of planes within a crystal unit cell is crucial. For hexagonal systems, we use a different set of indices known as Miller–Bravais indices (h k i l). This method involves taking normalized reciprocals of axial intercepts on the a1, a2, and z axes.

:p How are Miller–Bravais indices determined for planes in a hexagonal unit cell?
??x
To determine the Miller–Bravais indices, follow these steps:
1. Identify the intercepts A, B, and C on the a1, a2, and z axes respectively.
2. Use normalized intercept reciprocals to find $\frac{1}{A}, \frac{1}{B},$ and $\frac{1}{C}$.
3. Assign these values to h, k, and l as follows:
   - $h = nA_{a1}$-$ k = nB_{a2}$-$ l = nC_z$

4. The value of i is found using the equation: 
   $$i = -(h + k)$$5. If any index (like l in this case) is zero, it means the plane is parallel to that axis.

For example, if A = a1, B = -a2, and C = c:
- $h = 1 \cdot a_{A} = 1 $-$ k = 1 \cdot (-a_{B}) = -1 $-$ l = 1 \cdot c_{C} = 1$ Using the equation for i:
$$i = -(h + k) = -(1 - 1) = 0$$

Therefore, the (hkil) indices are (1101).

Example code to calculate these indices in pseudocode:

```pseudocode
function calculateMillerBravaisIndices(A, B, C):
    h = A
    k = -B
    l = C
    i = -(h + k)
    
    return [h, k, l, i]
```
x??

---


#### (1101) Miller–Bravais Indices Interpretation
Background context: The indices (hkil) for a plane in the hexagonal system can be interpreted based on the intercepts and parallelism to axes. When one of these indices is zero, it indicates that the corresponding plane is parallel to that axis.

:p What does an index value of 0 indicate about a crystallographic plane?
??x
An index value of 0 in Miller–Bravais indices (hkil) for a hexagonal unit cell means that the respective plane is parallel to the axis corresponding to that index. For instance, if l = 0, it indicates that the plane is parallel to the z-axis.

In Example Problem 3.12, the calculated indices are (1101). Here, since the third index (l) is zero:
- The plane is parallel to the a3 axis.
- This means the plane does not intersect the a3 axis and runs parallel to it.

Therefore, the plane (1101) has no intercept on the z-axis but intersects the a1 and a2 axes at unit lengths.
x??

---


#### Reduced-Sphere BCC Unit Cell with (110) Plane
Background context: The reduced-sphere BCC unit cell is a simplified representation of the body-centered cubic crystal structure. This unit cell includes specific planes that are often used in crystallographic studies.

:p What does Figure 3.12 illustrate about the BCC (110) plane?
??x
Figure 3.12 illustrates the reduced-sphere BCC (body-centered cubic) unit cell with the (110) plane:
- **(a)** Shows a schematic of the reduced-sphere BCC unit cell, highlighting the positions of atoms.
- **(b)** Provides an atomic packing view for the (110) plane.

In this example, the (110) plane intersects the a1 and a2 axes at specific points:
- The plane runs parallel to the body diagonal direction in the BCC structure.

The diagram helps visualize how atoms are packed on the (110) plane within the unit cell.
x??

---

---

