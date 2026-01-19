# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 12)


**Starting Chapter:** 5.5 Comparison of Rotational Representations

---


#### Overview of Rotational Representations
Background context: The text introduces that rotations can be represented in various ways and discusses the pros and cons of different representations.

:p What are some common ways to represent rotations mentioned in the text?
??x
Common ways to represent rotations include Euler Angles, Quaternion, and Matrix. Each representation has its own advantages and disadvantages.
x??

---


#### Euler Angles Representation
Background context: The text provides an overview of Euler angles as a way to represent rotations.

:p What are Euler angles and their benefits according to the provided text?
??x
Euler angles represent a rotation with three scalar values: yaw, pitch, and roll. Their benefits include simplicity (three floating-point numbers), small size, and intuitive nature because yaw, pitch, and roll are easy to visualize. They also allow for simple interpolation along single axes.
x??

---


#### Interpolation Challenges in Euler Angles
Background context: The text highlights the challenges of interpolating rotations using Euler angles.

:p What is a significant challenge when interpolating rotations with Euler angles?
??x
A significant challenge is that Euler angles cannot be easily interpolated when the rotation is about an arbitrarily oriented axis. Additionally, Euler angles are prone to gimbal lock, where a 90-degree rotation causes one of the principal axes to collapse onto another.
x??

---


#### Gimbal Lock in Euler Angles
Background context: The text explains the condition known as "gimbal lock" and its implications for Euler angles.

:p What is gimbal lock, and what does it cause according to the provided text?
??x
Gimbal lock occurs when a 90-degree rotation causes one of the three principal axes (yaw, pitch, roll) to collapse onto another. This prevents further rotations about that original axis because they become equivalent to rotations around other axes.
x??

---


#### Axis + Angle Representation
Background context explaining the concept. The axis+angle representation uses a unit vector (the rotation axis) and an angle of rotation. This format is denoted by the four-dimensional vector [a q] = [ax ay az q], where 'a' represents the axis of rotation, and 'q' is the angle in radians.

:p What does the term "axis+angle representation" refer to?
??x
The term "axis+angle representation" refers to a method of representing rotations using a unit vector (the axis of rotation) and an angle. This format uses a four-dimensional vector [a q] = [ax ay az q], where 'a' represents the direction of the axis, and 'q' is the angle in radians.
x??

---


#### Quaternions
Background context explaining the concept. A unit-length quaternion can represent 3D rotations similar to the axis+angle representation but with some differences. The main advantage of quaternions over axis+angle representations includes their ability to concatenate rotations via multiplication and interpolate them easily.

:p What are the key benefits of using quaternions for rotation?
??x
The key benefits of using quaternions for rotation include:
- They allow rotations to be concatenated directly through quaternion multiplication.
- Quaternions enable easy interpolation, which can be done with simple linear or spherical linear interpolation (LERP and SLERP operations).
- They are compact in size, requiring only four floating-point numbers compared to the nine required by a 3×3 matrix.

These benefits make quaternions particularly useful for applications that require smooth animation and efficient computation.
x??

---


#### Translation Vector and Scale Factor Interpolation via LERP
Background context: The translation vector and scale factor are interpolated using Linear interpolation (LERP). This method is straightforward for handling translations but does not account for the shortest path or constant speed required for rotations.

:p How is the translation vector and scale factor typically interpolated?
??x
The translation vector and scale factor are interpolated linearly, which means that the change in position or scaling happens at a constant rate. This is done using the Linear interpolation (LERP) function.
```java
// Pseudocode for LERP
vec3 lerp(vec3 v0, vec3 v1, float t) {
    return v0 + t * (v1 - v0);
}
```
x??

---


#### Quaternion Interpolation with LERP and SLERP
Background context: Quaternions can be interpolated using either Linear interpolation (LERP) or Spherical Linear interpolation (SLERP). LERP is used for non-rotational transformations, while SLERP is preferred for rotations to ensure smooth and constant-speed transitions.

:p What are the two methods of interpolating quaternions mentioned in the text?
??x
The two methods of interpolating quaternions mentioned in the text are Linear interpolation (LERP) and Spherical Linear interpolation (SLERP). LERP is used for non-rotational transformations, whereas SLERP is preferred for rotations to ensure smooth and constant-speed transitions.
```java
// Pseudocode for SLERP
quat slerp(quat q0, quat q1, float t) {
    // Implementation of Spherical Linear interpolation (SLERP)
}
```
x??

---


#### Rigid Transformations and Dual Quaternions
Background context: A rigid transformation involves both rotation and translation. To represent such transformations, dual quaternions are used, which offer benefits over the typical vector-quaternion representation, particularly in linear interpolation blending.

:p What is a dual quaternion, and why is it useful for representing rigid transformations?
??x
A dual quaternion is a mathematical object that combines an ordinary quaternion with dual numbers. Dual numbers consist of a non-dual part and a dual part, represented as $\hat{a} = a + #b $, where $#^2 = 0$. This structure allows for the representation of both rotational and translational components of rigid transformations.

Dual quaternions offer benefits such as constant-speed linear interpolation blending, which is similar to using LERP for translations and SLERP for rotations. This makes dual quaternions useful for representing complex rigid transformations in a coordinate-invariant manner.

In code:
```java
// Pseudocode for Dual Quaternion Representation
class DualQuaternion {
    Quaternion realPart;
    Quaternion dualPart;

    // Constructor, methods, etc.
}
```
x??

---


#### Dual Numbers and Dual Quaternions
Background context: Dual numbers are an extension of real numbers, used in the representation of dual quaternions. A dual number $\hat{a} = a + #b $ consists of a non-dual part$a $ and a dual part$ b $, where $#^2 = 0$.

:p What is a dual number, and how is it used in the context of dual quaternions?
??x
A dual number $\hat{a} = a + #b $ consists of a non-dual part$a $ and a dual part$ b $, where $#^2 = 0$. In the context of dual quaternions, these numbers are used to represent both rotational and translational components in a single mathematical object.

A dual quaternion can be represented as:
$$\hat{q} = q_a + #q_b$$where $ q_a $ and $ q_b$ are ordinary quaternions. This structure allows for the representation of rigid transformations, providing benefits such as constant-speed linear interpolation blending.

In code:
```java
// Pseudocode for Dual Quaternion Representation
class DualQuaternion {
    Quaternion realPart;
    Quaternion dualPart;

    // Constructor, methods, etc.
}
```
x??

---

---


#### Degrees of Freedom (DOF) in 3D Rotations
Background context explaining the concept. A three-dimensional object has six degrees of freedom: three for translation and three for rotation. The DOF helps understand how different representations can describe rotations using varying numbers of parameters, but always maintaining three degrees of freedom due to constraints.
Relevant formula:$NDOF = Nparameters - Nconstraints$:p What is the relationship between the number of floating-point parameters and degrees of freedom in 3D rotations?
??x
The relationship is described by the equation $NDOF = Nparameters - Nconstraints$. This means that while different representations use varying numbers of parameters (e.g., Euler angles, axis+angle, quaternions, or a 3×3 matrix), constraints reduce the effective number of degrees of freedom to three.

For example:
- **Euler Angles**: 3 parameters with no constraints.
- **Axis+Angle**: 4 parameters with one constraint on the length of the axis vector.
- **Quaternion**: 4 parameters with one constraint on the unit length of the quaternion.
- **3×3 Matrix**: 9 parameters but with 6 constraints.

This ensures that all representations ultimately describe rotations in three-dimensional space, which inherently has three degrees of freedom: two for rotation and one for scaling or shearing (if present).
x??

---


#### Parametric Equation for a Ray
Background context explaining the concept. A ray is an infinite line extending in one direction from a starting point. The parametric equation differs slightly from that of a line by constraining the parameter $t$ to be non-negative.

Relevant formula:
- For a ray: $P(t) = P_0 + tu, t \geq 0$

:p What is the parametric equation for a ray?
??x
The parametric equation for a ray starting at point $P_0 $ and extending in the direction of unit vector$u$ is given by:
$$P(t) = P_0 + tu, \text{ where } t \geq 0.$$

This means that as $t $ varies from zero to infinity, point$P$ traces out every possible point on the ray.
x??

---


#### Sphere Representation

Background context: A sphere is typically defined by its center point $C $ and radius$r$, packed into a four-element vector. This representation benefits from efficient SIMD (Single Instruction, Multiple Data) vector processing.

:p How can a sphere be represented efficiently?
??x
A sphere can be represented as a 4-element vector containing the coordinates of its center and its radius:

$$[C_x, C_y, C_z, r]$$

This allows for compact storage and efficient computation using SIMD instructions. For example, in C/Java, you might define a `Sphere` class like this:

```java
public class Sphere {
    public float[] position; // [Cx, Cy, Cz]
    public float radius;

    public Sphere(Vector3 center, float radius) {
        this.position = new float[]{center.x, center.y, center.z};
        this.radius = radius;
    }

    public boolean containsPoint(float x, float y, float z) {
        Vector3 point = new Vector3(x, y, z);
        return point.distanceSquared(position).sqrt() <= radius;
    }
}
```
x??

---


#### Plane Representation

Background context: A plane can be represented in two forms: the traditional equation $Ax + By + Cz + D = 0$ or in point-normal form. The normal vector and distance from the origin are key components.

:p How is a plane typically defined mathematically?
??x
A plane can be defined using the equation:
$$Ax + By + Cz + D = 0$$where $ A, B,$and $ C$form a normal vector to the plane. Alternatively, it can also be represented in point-normal form by specifying a point $ P_0 $ on the plane and a unit normal vector $n$.

```java
public class Plane {
    public Vector3 normal; // Normalized vector [a, b, c]
    public float d;        // Distance from origin

    public Plane(Vector3 normal, float distanceFromOrigin) {
        this.normal = normal;
        this.d = distanceFromOrigin;
    }

    public boolean isPointOnPlane(float x, float y, float z) {
        Vector3 point = new Vector3(x, y, z);
        return dotProduct(normal, point.subtract(new Vector3(0, 0, 0))) + d == 0;
    }
}
```
x??

---


#### Homogeneous Coordinates and Plane Transformations
Background context: When a point $P $ is written in homogeneous coordinates with$w=1 $, the equation$(L \cdot P) = 0 $ can be interpreted as$(n \cdot P) = d $. These equations are satisfied for all points$ P $that lie on the plane$ L $. Planes defined in four-element vector form can easily be transformed from one coordinate space to another. Given a matrix$ M_{A,B}$that transforms points and (non-normal) vectors from space A to space B, we use the inverse transpose of this matrix $(M_{A,B}^{-1})^T$ for transforming normal vectors such as the plane’s $n$-vector.

:p What is the equation used to describe a point lying on a plane in homogeneous coordinates?
??x
The equation $(L \cdot P) = 0 $ describes a point$P $ lying on a plane$ L $ when $ w=1 $. This can be rewritten as $(n \cdot P) = d$, where $ n $is the normal vector of the plane and$ d$ is its distance from the origin.
x??

---


#### Axis-Aligned Bounding Boxes (AABB)
Background context: An axis-aligned bounding box (AABB) is a 3D cuboid whose six rectangular faces are aligned with the mutually orthogonal axes of a particular coordinate frame. It can be represented by a six-element vector containing the minimum and maximum coordinates along each of the three principal axes,$[xmin, ymin, zmin, xmax, ymax, zmax]$, or two points $ P_{min}$and $ P_{max}$. This simple representation allows for efficient testing whether a point $ P$ is inside an AABB.

:p How can you test if a point lies within an AABB?
??x
To test if a point $P$ lies within an AABB, check the conditions:
- $Px \geq xmin $-$ Px \leq xmax $-$ Py \geq ymin $-$ Py \leq ymax $-$ Pz \geq zmin $-$ Pz \leq zmax$ If all these conditions are true, the point is inside the AABB.
x??

---


#### Oriented Bounding Boxes (OBB)
Background context: An oriented bounding box (OBB) is a cuboid that has been oriented so as to align with some logical way with the object it bounds. Usually, an OBB aligns with the local-space axes of the object. It acts like an AABB in local space but may not necessarily align with world-space axes.

:p How can you test if a point lies within an OBB?
??x
To test if a point $P$ lies within an OBB, first transform the point into the OBB's "aligned" coordinate system using its transformation matrix. Then use the AABB intersection test as described for testing points inside an AABB.

```java
// P: Point in world space
// OBB: Oriented Bounding Box with transformation matrix T

Vector3 transformedPoint = multiplyMatrixByVector(T, P);
boolean isInAABB = (transformedPoint.x >= xmin && transformedPoint.x <= xmax &&
                    transformedPoint.y >= ymin && transformedPoint.y <= ymax &&
                    transformedPoint.z >= zmin && transformedPoint.z <= zmax);
```

If the transformed point satisfies all conditions of the AABB test, then $P$ lies within the OBB.
x??

---


#### Frustum Definition
Background context: A frustum is a group of six planes that define a truncated pyramid shape. In 3D rendering, frusta are used to conveniently define the viewable region of the 3D world when rendered via a perspective projection from the point of view of a virtual camera.

Four of the planes bound the edges of the screen space, while the other two represent the near and far clipping planes (i.e., they define the minimum and maximum $z$ coordinates possible for any visible point). A convenient representation of a frustum is an array of six planes, each represented in point-normal form.

:p How can you describe a frustum using mathematical objects?
??x
A frustum can be described as a group of six planes. Each plane can be represented in point-normal form, i.e., one point and one normal vector per plane. The frustum includes four planes that bound the edges of screen space (left, right, bottom, top) and two additional planes representing the near and far clipping planes.

Example planes:
- $L_1: n_{x1} \cdot P + d_{x1} = 0 $-$ L_2: n_{y1} \cdot P + d_{y1} = 0 $-$ L_3: n_{z1} \cdot P + d_{z1} = 0$(near plane)
- $L_4: n_{z2} \cdot P + d_{z2} = 0$(far plane)

Where $P = [x, y, z, w]$ is a point in homogeneous coordinates.
x??

---

---


---
#### Testing a Point Inside a Frustum
Background context: To test whether a point lies inside a frustum, you can use dot products to determine if it is on the front or back side of each plane. If the point lies inside all six planes (top, bottom, left, right, near, and far), then it is inside the frustum.

A helpful trick is transforming the world-space point by applying the camera’s perspective projection. This takes the point from world space into homogeneous clip space, where the frustum appears as an axis-aligned cuboid (AABB). In this space, simpler in/out tests can be performed.
:p How do you test if a point lies inside a frustum?
??x
To test if a point is inside a frustum, first transform the world-space point to homogeneous clip space using the camera's perspective projection matrix. Then check if the transformed coordinates satisfy the conditions for all six planes of the frustum: front, back, left, right, near, and far.

For example, in pseudocode:
```java
// Example pseudocode to test a point inside a frustum
Matrix4f projViewMatrix = ...; // Projection-view matrix
Vector3f worldPoint = ...;    // World-space point to test

// Transform the point from world space to homogeneous clip space
Vector4f clipSpacePoint = projViewMatrix.transform(worldPoint);

if (clipSpacePoint.x > -1 && clipSpacePoint.x < 1 &&
    clipSpacePoint.y > -1 && clipSpacePoint.y < 1 &&
    clipSpacePoint.z > -1 && clipSpacePoint.z < 1) {
    // Point is inside the frustum
} else {
    // Point is outside the frustum
}
```
x??

---


#### Convex Polyhedral Regions
Background context: A convex polyhedral region is defined by an arbitrary set of planes, all with normals pointing inward (or outward). The test for whether a point lies inside or outside this volume involves checking if it satisfies conditions for each plane. This test is similar to the frustum test but can involve more planes.

Convex regions are useful for implementing arbitrarily shaped trigger regions in games. For instance, Quake engine brushes are just volumes bounded by planes.
:p What is a convex polyhedral region and how do you check if a point lies inside it?
??x
A convex polyhedral region is defined by an arbitrary set of planes with normals pointing inward (or outward). To check if a point lies inside this volume, you need to verify that the point satisfies conditions for all defining planes.

For example, in pseudocode:
```java
// Example pseudocode to test a point inside a convex polyhedral region
List<Plane> planes = ...; // List of defining planes

for (Plane plane : planes) {
    if (!plane.containsPoint(point)) {
        return false; // Point is outside the region
    }
}
return true; // Point is inside the region
```
x??

---

