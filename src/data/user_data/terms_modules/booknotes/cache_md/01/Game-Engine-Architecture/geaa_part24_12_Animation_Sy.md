# High-Quality Flashcards: Game-Engine-Architecture_processed (Part 24)


**Starting Chapter:** 12 Animation Systems. 12.1 Types of Character Animation

---


#### Run Cycle Animation
Background context: In modern game engines, characters often have multiple looping animations such as idle cycles, walk cycles, and run cycles. A run cycle is an example of a character moving in a repetitive manner to simulate running.

:p What is a run cycle in the context of animation systems?
??x
A run cycle is a looping animation that makes a character appear to be running by repeatedly showing a sequence of frames designed to move the character smoothly.
x??

---


#### Looping Animations
Background context: Looping animations are sequences of frames that repeat indefinitely to create the illusion of continuous motion. They are commonly used in idle cycles (standing still), walk cycles (walking), and run cycles (running).

:p What is a looping animation?
??x
A looping animation is a sequence of frames designed to be repeated continuously, creating an illusion of smooth and repetitive motion without visible artifacts.

Example:
```java
public class LoopingAnimation {
    private int frameIndex;
    private int[] frames;

    public void update(float deltaTime) {
        frameIndex = (frameIndex + 1) % frames.length;
    }

    public Image getCurrentFrame() {
        return frames[frameIndex];
    }
}
```

Explanation: The `update` method increments the frame index and wraps it around using modulo to ensure it stays within the range of available frames. This creates a seamless loop.
x??

---


---
#### Rigid Hierarchical Animation
Rigid hierarchical animation is an early approach used for 3D character animation. It models a character as a collection of rigid pieces, where each piece (like pelvis, torso, arms, legs) is constrained to another in a hierarchy similar to how bones connect in the human body.

This method allows characters to move naturally because moving one part can automatically affect connected parts. For example, moving an upper arm would cause the lower arm and hand to follow suit.

:p What are the key features of rigid hierarchical animation?
??x
Rigid hierarchical animation uses a tree-like structure where each character is broken down into rigid pieces (like pelvis, torso, arms, legs) that are hierarchically constrained. When one part moves, it affects connected parts in a natural way, mimicking real human body mechanics.

Here's an example of how the hierarchy might be structured for a simple humanoid model:
```java
class CharacterAnimation {
    Node pelvis;
    Node torso;
    
    public CharacterAnimation() {
        pelvis = new Node("Pelvis");
        torso = new Node("Torso", pelvis);
        
        // Define other nodes and attach them in the hierarchy
    }
}

class Node {
    String name;
    List<Node> children;
    
    public Node(String name, Node parent) {
        this.name = name;
        if (parent != null) {
            parent.children.add(this);
        }
    }
}
```
x??

---


#### Per-Vertex Animation and Morph Targets
Per-vertex animation allows for more natural movement by moving individual vertices of the mesh. This technique involves animating each vertex independently, producing any possible deformation but requiring significant data storage due to the need to store motion information for every vertex.

Morph target animation is a variation where an animator creates fixed, extreme poses and then blends between these at runtime to produce animations. This approach reduces the amount of stored data compared to full per-vertex animation.

:p How does per-vertex animation differ from rigid hierarchical animation?
??x
Per-vertex animation differs from rigid hierarchical animation in that it allows for more flexible and natural-looking deformations by animating each vertex individually, while rigid hierarchical animation constrains parts of the character based on a predefined hierarchy. This means with per-vertex animation, you can create complex deformations that aren't possible with rigid hierarchies.

Here’s an example of how per-vertex animation might be applied:
```java
class VertexAnimation {
    List<Vector3> vertices;
    
    public void animate(float time) {
        // Animate each vertex based on the current time
        for (Vector3 v : vertices) {
            // Logic to move each vertex
        }
    }
}

// Example of a Vector3 class
class Vector3 {
    float x, y, z;
    
    public Vector3(float x, float y, float z) {
        this.x = x; this.y = y; this.z = z;
    }

    // Methods to manipulate the vector based on animation data
}
```
x??

---


#### Cracking in Rigid Hierarchical Animation
Cracking is a problem that arises from rigid hierarchical animations. Due to the rigidity of the parts, joints can look unnatural or "crack" when certain movements are made.

This issue often appears where parts should naturally move smoothly but instead show sharp angles due to the constraints and rigid nature of the hierarchy.

:p What causes cracking in rigid hierarchical animation?
??x
Cracking occurs because of the rigidity constraints applied to parts in a hierarchical structure. When parts need to rotate or bend, they are constrained by their parent-child relationships, which can lead to unnatural movements like sharp angles (cracks) at joints. This is particularly noticeable when rotations are required that would normally be smooth and continuous.

To illustrate this concept:
```java
class Joint {
    float angle;
    
    public void update(float deltaTime) {
        // Update the angle based on motion data
        if (shouldCrack()) {
            angle = MathHelper.wrap(angle + 90 * deltaTime, -180, 180);
        } else {
            angle += 5 * deltaTime; // Normal smooth rotation
        }
    }
    
    private boolean shouldCrack() {
        // Logic to detect if a crack is about to happen due to the current angle and motion
        return Math.abs(angle) > 90;
    }
}
```
x??

---

---


#### Linear Interpolation (LERP) for Vertex Position Calculation
Background context: The position of each vertex is calculated using a simple linear interpolation between the vertex’s positions in each of the extreme poses. This technique is commonly used for morph target animation, especially in facial animation due to the complexity of the human face.
:p What is LERP and how is it used in vertex position calculation?
??x
Linear Interpolation (LERP) is a method used to calculate intermediate values between two known quantities. In the context of vertex positions, LERP interpolates the vertex's position based on its positions in extreme poses. This allows for smooth transitions between different facial expressions.

The formula for LERP can be expressed as:
$$\text{lerp}(a, b, t) = (1 - t) \cdot a + t \cdot b$$

Where $a $ and$b $ are the two known quantities (vertex positions), and $ t$ is the interpolation factor.

In vertex position calculation:
- $v_0 $ and$v_1$ represent the extreme poses.
- $t$ is a value between 0 and 1, representing the progression of time or state in animation.

Example code to apply LERP for vertex positions:
```java
Vector3 v0 = new Vector3(1.0f, 2.0f, 3.0f); // Position in extreme pose 0
Vector3 v1 = new Vector3(4.0f, 5.0f, 6.0f); // Position in extreme pose 1
float t = 0.5f; // Interpolation factor

Vector3 interpolatedPosition = lerp(v0, v1, t);
```
x??

---


#### Morph Target Animation for Facial Expression
Background context: Morph target animation is widely used in facial animation due to the complex nature of human faces driven by approximately 50 muscles. It provides animators full control over every vertex of a facial mesh.
:p What is morph target animation and why is it preferred for facial expressions?
??x
Morph target animation allows animators to manipulate specific vertices on a 3D model, enabling subtle to extreme movements that closely approximate the natural movement of human faces. This method offers fine-grained control over individual features such as mouth shapes, eye movements, and nose contours.

It is preferred for facial expressions because:
- It provides detailed control over each vertex.
- Allows for both subtle and exaggerated facial movements.
- Mimics the complex muscle interactions in the human face.

Example of morph targets for a character's facial expression:
```java
// Define initial mesh (base model)
Mesh baseModel;

// Define target shapes (morph targets)
Vector3[] mouthOpen;
Vector3[] smile;
Vector3[] frown;

// Apply morph targets based on animation state
if (isSmiling) {
    applyMorphTarget(smile);
} else if (isFrowning) {
    applyMorphTarget(frown);
} else if (isEating) {
    applyMorphTarget(mouthOpen);
}

void applyMorphTarget(Vector3[] targetPositions) {
    // Code to interpolate base model vertices with target positions
}
```
x??

---


#### Skinned Animation and Rigid Hierarchical Animation Comparison
Background context: As game hardware capabilities improved, skinned animation was developed as a more efficient alternative or supplement to morph targets. It combines the benefits of vertex and morph target animations while offering better performance.
:p What is the main difference between skinned animation and rigid hierarchical animation?
??x
The primary differences between skinned animation and rigid hierarchical animation are:
- **Rigid Hierarchical Animation**: Uses a bone structure where each bone moves independently, creating a rigid hierarchy. This method allows for complex animations but can be less efficient due to individual transformations on many bones.
  
- **Skinned Animation**: Models are skinned over the skeleton. Vertices track the movements of joints, and they can deform as the joints move, providing more realistic skin and clothing animation.

Example code comparing both approaches:
```java
// Rigid Hierarchical Animation (simplified)
class Bone {
    Vector3 position;
    void update() {
        // Update bone's transformation matrix
    }
}

class Skeleton {
    List<Bone> bones;

    void animate(float time) {
        for (Bone bone : bones) {
            bone.update();
        }
    }
}

// Skinned Animation
class Vertex {
    int[] jointIndices;
    float[] weights;
    Vector3 position;

    void update() {
        // Update vertex based on weighted influence of joints
    }
}

class Skin {
    List<Vertex> vertices;
    Skeleton skeleton;

    void animate(float time) {
        for (Vertex vertex : vertices) {
            vertex.update();
        }
    }
}
```
x??

---


#### Skinned Animation as Data Compression
Background context: Skinned animation compresses vertex data by constraining vertices to move along with a small number of skeletal joints. This method balances realism and performance.
:p How does skinned animation achieve data compression?
??x
Skinned animation achieves data compression by attaching a smooth, continuous triangle mesh (skin) to a skeleton. Each vertex on the skin is influenced by multiple joints, allowing it to deform naturally as the joints move.

This approach reduces the complexity compared to animating each vertex individually:
- **Vertices are weighted to multiple joints**.
- **Joint transformations propagate through weights** to affect many vertices simultaneously.

Example of how skinned animation compresses data:
```java
class Skin {
    List<Vertex> vertices;
    Skeleton skeleton;

    void update(float time) {
        for (Vertex vertex : vertices) {
            Vector3[] jointPositions = getJointPositions(skeleton, time);
            Vector3 newVertexPosition = blendWeights(vertex.weights, jointPositions);
            vertex.position = newVertexPosition;
        }
    }

    private Vector3[] getJointPositions(Skeleton skeleton, float time) {
        // Get the current positions of all joints
    }

    private Vector3 blendWeights(float[] weights, Vector3[] jointPositions) {
        // Blend vertex position based on joint positions and weights
    }
}
```
x??

---


#### Crank the Weasel Character Example
Background context: The example character, Crank the Weasel, illustrates how skinned animation combines a smooth skin with hidden skeletal structure. This showcases both the internal rigging and the external mesh.
:p What does the character Crank the Weasel demonstrate?
??x
Crank the Weasel demonstrates how skinned animation works by revealing both the internal skeletal structure and the smooth, continuous triangle mesh (skin) that follows its movements.

- **Internal Structure**: The rigid bones and joints are visible, showing the hierarchical setup.
- **External Mesh**: The outer skin is a mesh of triangles that deforms naturally as the joints move.

Example of how Crank’s character design works:
```java
class Character {
    SkinModel skin;
    Skeleton skeleton;

    void update(float time) {
        // Update skeletal structure
        skeleton.update(time);

        // Update skin based on joint positions and weights
        skin.update(skeleton, time);
    }
}

// Classes for SkinModel and Skeleton would be defined similarly to the examples provided.
```
x??

---

---


#### Hierarchical Structure of Joints
Background context: The text explains that joints form a hierarchical structure within a skeleton. Each joint has one parent (except for the root), creating a tree-like structure.

:p How is a hierarchical structure formed in skeletal modeling?
??x
In skeletal modeling, a hierarchical structure is created by designating one joint as the root and assigning all other joints as its children, grandchildren, etc. This structure can be visualized as a tree where each node (joint) has an index from 0 to N-1. The root joint typically has no parent and is assigned an invalid value such as -1.

Example of code representing this hierarchy:
```java
public class Joint {
    int parentIndex; // -1 if it's the root

    public Joint(int index, int parentIndex) {
        this.index = index;
        this.parentIndex = parentIndex;
    }
}

// Example usage
Joint[] joints = new Joint[5];
joints[0] = new Joint(0, -1); // Root joint
joints[1] = new Joint(1, 0);
joints[2] = new Joint(2, 1);
joints[3] = new Joint(3, 1);
joints[4] = new Joint(4, 2);
```
x??

---


#### Representing a Skeleton in Memory
Background context: The text discusses how skeletons are represented in memory using data structures that store information about each joint. This includes the inverse bind pose transform for joints.

:p How is a skeleton typically stored in memory?
??x
A skeleton is typically stored as a small top-level data structure containing an array of joint data structures. Each joint stores its parent index and the inverse bind pose matrix, which describes the position, orientation, and scale at the time it was bound to the vertices of the skin mesh.

Example code:
```java
public class Joint {
    public String name;
    public int parentIndex; // -1 if no parent (root)
    public Matrix4x3 invBindPose;

    public Joint(String name, int parentIndex, Matrix4x3 bindPose) {
        this.name = name;
        this.parentIndex = parentIndex;
        this.invBindPose = bindPose.inverse(); // Store the inverse of the bind pose
    }
}

// Example skeleton representation
Joint[] joints = new Joint[5];
joints[0] = new Joint("pelvis", -1, bindPosePelvis);
joints[1] = new Joint("tail", 0, bindPoseTail);
joints[2] = new Joint("spine", 0, bindPoseSpine);
// ... and so on for other joints
```
x??

---


#### Inverse Bind Pose Transform
Background context: The text explains that each joint stores its inverse bind pose transform, which is used to describe the position and orientation of a joint at the time it was bound to the vertices of the skin mesh.

:p What role does the inverse bind pose play in skeletal animation?
??x
The inverse bind pose transform plays a crucial role in skeletal animation by storing the position, orientation, and scale of each joint when it was first bound to the vertices of the skinned mesh. This information is used during rendering to correctly apply transformations back to the original vertex positions.

Example code:
```java
public class Joint {
    public String name;
    public int parentIndex; // -1 if no parent (root)
    public Matrix4x3 invBindPose;

    public Joint(String name, int parentIndex, Matrix4x3 bindPose) {
        this.name = name;
        this.parentIndex = parentIndex;
        this.invBindPose = bindPose.inverse(); // Store the inverse of the bind pose
    }
}
```
x??

---

---


---
#### Bind Pose Definition
Background context: In skeletal animation, the bind pose is a special pose of the skeleton that represents the mesh's initial position before it is skinned to the skeleton. It is also known as the reference or rest pose and often referred to as the T-pose due to common positioning.

:p What is the bind pose in skeletal animation?
??x
The bind pose is the initial, unskinned state of a 3D character's mesh. It represents how the character would look if it were rendered without any skeleton. The typical T-pose involves standing with feet apart and arms outstretched to keep limbs away from each other.

x??

---


#### Local Poses in Skeletal Animation
Background context: A joint’s pose is typically defined relative to its parent joint, allowing natural movement. Local poses are usually stored as SRT (scale, rotation, translation) data structures for easier animation blending and manipulation.

:p What is a local pose in skeletal animation?
??x
A local pose refers to the position, orientation, and scale of a joint relative to its parent joint. This allows for natural movement by allowing rotations at each level without affecting others. Local poses are commonly represented using SRT data structures (scale, rotation, translation).

```cpp
struct JointPose {
    Quaternion m_rot;   // Rotation
    Vector3 m_trans;    // Translation
    F32 m_scale;        // Scale for uniform scaling only
};
```

x??

---


#### Representing Non-Uniform Scale in Local Poses
Background context: While some game engines use uniform scale, non-uniform scale can be represented more compactly using a vector. The scale is applied to each axis independently.

:p How can non-uniform scale be represented in local poses?
??x
Non-uniform scale can be efficiently represented using a three-element vector `[sx, sy, sz]`, where `sx`, `sy`, and `sz` correspond to the scaling factor on the x, y, and z axes respectively. This avoids representing the full 3x3 diagonal scale matrix.

```cpp
struct JointPose {
    Quaternion m_rot;   // Rotation
    Vector4 m_trans;    // Translation (4 elements for homogeneous coordinates)
    Vector3 m_scale;    // Non-uniform scaling factors
};
```

x??

---


#### Global Pose Calculation
Background context: A global pose represents a joint's transformation in model or world space, derived by multiplying local poses along the skeletal hierarchy.

:p How is a global pose calculated for a joint?
??x
A global pose for a joint can be calculated by walking up the skeletal hierarchy and multiplying the local poses from the target joint to the root. The formula used is:
$$P_j.M = \prod_{i=j}^{0} (P_i.p(i))$$

Where `p(i)` returns the parent index of joint `i`.

```cpp
struct SkeletonPose {
    // ... existing members ...
    void CalculateGlobalPoses() {
        for (int i = skeleton->jointCount - 1; i >= 0; --i) {
            m_aLocalPose[i].m_rot *= m_aLocalPose[p(i)].m_rot;
            m_aLocalPose[i].m_trans += m_aLocalPose[p(i)].m_trans * m_aLocalPose[i].m_rot;
        }
    }
};
```

x??

---

---

