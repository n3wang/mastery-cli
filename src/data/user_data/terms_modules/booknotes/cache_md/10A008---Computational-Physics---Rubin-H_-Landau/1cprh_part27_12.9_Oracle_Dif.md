# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 27)


**Starting Chapter:** 12.9 Oracle  Diffuser equals Grovers Search Algorithm

---


#### Oracle + Diffuser = Grover's Search Algorithm
Background context: The goal is to search through a database of \(N = 2^n\) elements using quantum computing. This involves initializing the system, applying an oracle, and then using a diffuser (amplifier) to increase the amplitude of the target state.

:p What are the steps in Grover's Search Algorithm?
??x
Grover's Search Algorithm involves the following steps:
1. Initialize the \(n\)-qubit system into the ground state.
2. Apply Hadamard gates to create a superposition state.
3. Use an oracle to mark the target state by flipping its phase.
4. Apply a diffuser (amplifier) to increase the amplitude of the marked state.

Example: The implementation in Qiskit involves:

```python
# Pseudocode for Grover's Search Algorithm using Qiskit
def grovers_search(num_qubits, oracle):
    qc = QuantumCircuit(num_qubits)
    
    # Step 1: Apply Hadamard gates to create a superposition state
    for qubit in range(num_qubits):
        qc.h(qubit)
    
    # Step 2: Apply the oracle to mark the target state
    qc.append(oracle, range(num_qubits))
    
    # Step 3: Apply the diffuser (amplifier) multiple times
    for _ in range(int(np.pi/4 * np.sqrt(2**num_qubits))):
        qc.h(range(num_qubits))
        qc.x(range(num_qubits))
        qc.append(oracle, range(num_qubits))
        qc.x(range(num_qubits))
        qc.h(range(num_qubits))

    # Step 4: Measure the state
    qc.measure_all()
    
    return qc
```
x??

--- 

Each flashcard should cover a single concept or step from the provided text. The objective is to understand the context, formulas, and logic behind each topic without pure memorization. Use code examples where relevant to illustrate the concepts clearly.

---


#### Period Finding in Shor's Algorithm
Period finding is essential for determining the period \( T \) of a function \( f(x) = r^x \mod N \).

:p What is the goal of period finding?
??x
The goal of period finding is to determine the smallest positive integer \( T \) such that \( f(x + T) = f(x) \), i.e., \( r^T \equiv 1 \mod N \). This is crucial for factoring large numbers using Shor's Algorithm.

By determining the period, we can factorize \( N \).
x??

---


#### Entangled Quantum States Calculation
Background context: This section explains how to calculate entangled quantum states using numpy and eigenvalue decomposition. The Hamiltonian for entangled quantum states is calculated, along with its eigenvalues and eigenvectors.

:p How does the code compute the Hamiltonian for entangled quantum states?
??x
The code computes the Hamiltonian by first defining the interaction terms between qubits (σA·σB). It then constructs the full Hamiltonian matrix `SASB` using these interactions. The eigenvalues and eigenvectors of this Hamiltonian are computed to understand the energy levels and corresponding quantum states.

```python
# Define interaction terms
XAXB = array([[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]]) # sigmA . sigmxB
YAYB = array ([[0 ,0 ,0 , -1],[0,0,1,0],[0,1,0,0],[-1,0,0,0]]) # sigyA . sigyB
ZAZB = array([[1,0,0,0],[0,-1,0,0],[0,0,-1,0],[0,0,0,1]]) # sigmA . sigmxB

# Construct the Hamiltonian
SASB = XAXB + YAYB + ZAZB - 3 * ZAZB
```

x??

#### Qiskit Quantum Fourier Transform (QFT) for 2-Qubits
Background context: This section demonstrates how to implement a 2-qubit quantum Fourier transform using Qiskit. The QFT is crucial in many quantum algorithms, such as Shor's algorithm and Grover's search.

:p What does the `qft2` function do in Qiskit?
??x
The `qft2` function creates a QuantumCircuit for performing a 2-qubit quantum Fourier transform (QFT). It applies Hadamard gates, controlled phase shift gates, and optionally swaps qubits to achieve the desired transformation.

```python
import math

def qft2(inverse=False):
    angle = math.pi/2
    if inverse:
        angle = -angle
    qc = QuantumCircuit(2)
    qc.h(1)  # H gate on qubit -1
    qc.cp(angle, 0, 1)  # Controlled phase gate
    qc.h(0)
    qc.swap(0, 1)
    return qc
```

x??

#### Qiskit Quantum Fourier Transform (QFT) for n-Qubits
Background context: This section generalizes the quantum Fourier transform to `n` qubits. It is essential in many algorithms that require frequency domain analysis.

:p How does the `qft` function generalize the 2-qubit QFT?
??x
The `qft` function creates a QuantumCircuit for an `n`-qubit quantum Fourier transform (QFT). It applies Hadamard gates and controlled phase shift gates to each qubit, with appropriate control levels. Optionally, it performs swaps at the end.

```python
import math

def qft(n: int, inverse=False, skip_swap=False):
    angle = np.pi/2
    if inverse:
        angle = -angle
    qc = QuantumCircuit(n)
    
    for i in reversed(range(n)):
        qc.h(i)
        
        for j in range(i):
            qc.cp(angle / 2 ** (i-j-1), j, i)

    if not skip_swap:
        for i in range(math.floor(n/2)):
            qc.swap(i, n-i-1)
    
    return qc
```

x??

#### Oracle Circuit Implementation for Grover’s Algorithm
Background context: This section illustrates the implementation of an oracle circuit used in Grover's search algorithm. The oracle marks a specific state (|ω⟩) by flipping its sign.

:p What does the `oracle` function do?
??x
The `oracle` function creates a QuantumCircuit for marking a specific state |ω⟩ in Grover’s algorithm. It first converts the integer ω into its binary representation, then applies an X gate to invert qubits corresponding to 0s in the binary string and applies Hadamard gates and a multi-controlled-X (MCX) gate to implement the oracle operation.

```python
def oracle(omega):
    bit_string = "{:04b}".format(omega)
    
    quantum_circuit = QuantumCircuit(4)
    for idx, bit in enumerate(bit_string[::-1]):
        if bit == '0':
            quantum_circuit.x(3 - idx)
    quantum_circuit.h(3)
    quantum_circuit.mcx([0, 1, 2], 3)
    quantum_circuit.h(3)
    
    for idx, bit in enumerate(bit_string[::-1]):
        if bit == '0':
            quantum_circuit.x(3 - idx)

    u_omega = quantum_circuit.to_gate()
    u_omega.name = "$U_\\omega$"
    return u_omega
```

x??

#### Grover's Algorithm Implementation on IBMQ
Background context: This section demonstrates how to implement and run Grover’s algorithm on an actual IBMQ device. It includes transpiling the circuit for execution and handling the job execution.

:p How does the script handle running the quantum circuit on an IBMQ device?
??x
The script loads an account, connects to the IBMQ provider, selects the least busy available device that meets the required number of qubits, and runs the Grover's algorithm circuit. It transpiles the circuit for the selected device, submits the job, waits for completion, and retrieves the results.

```python
cap_n = 4
qc = QuantumCircuit(cap_n)
qc.h(range(cap_n))

cap_r = math.ceil(math.pi * math.sqrt(cap_n) / 4)

for i in range(cap_r):
    qc.append(oracle(9), range(cap_n))
    qc.append(diffuser(cap_n), range(cap_n))

qc.measure_all()
qc.draw(output="mpl", filename="grover4_circuit.png")

# Run on simulator
backend = Aer.get_backend("aer_simulator")
transpiled_circuit = transpile(qc, backend)
job = backend.run(transpiled_circuit)
result = job.result()

histogram = result.get_counts()
plot_histogram(histogram, filename="grover4_sim_histogram.png")

# Run on IBMQ
provider = IBMProvider(instance="ibm-q/open/main")
device = least_busy(provider.backends(filters=lambda x: int(x.configuration().n_qubits) >= cap_n and not x.configuration().simulator and x.status().operational is True))

print("Running on least busy device:", device)
transpiled_circuit = transpile(qc, device)
job = device.run(transpiled_circuit)
job_monitor(job, interval=2)

result = job.result()
histogram = result.get_counts(qc)
plot_histogram(histogram, filename="grover4_histogram.png")
```

x??

#### Shor’s Algorithm Quantum Circuit
Background context: This section provides an overview of the quantum circuit for implementing Shor's algorithm. Shor’s algorithm is used to factorize integers efficiently using quantum computing.

:p What does a typical Shor’s algorithm quantum circuit look like?
??x
Shor’s algorithm involves several quantum circuits, including a period finding subroutine and a classical post-processing step. The core of the algorithm includes a quantum Fourier transform (QFT) over a register, controlled modular exponentiation operations, and measurements to extract the period.

While the exact implementation details are complex, the circuit generally consists of:
1. Preparing a superposition state.
2. Using controlled modular exponentiation gates.
3. Applying a QFT to find the period.
4. Classical post-processing steps.

```python
# A simplified example of Shor's algorithm quantum circuit
def shors_algorithm(n):
    # Create a QuantumCircuit with n qubits for ancilla and registers
    qc = QuantumCircuit(n)
    
    # Apply Hadamard gates to create superposition
    for i in range(1, n-2):
        qc.h(i)

    # Controlled modular exponentiation (details depend on specific implementation)
    for a in range(2**n):
        # Apply controlled modular exponentiation gate here

    # Apply QFT to find the period
    qft = qft(n-2)  # Generalized n-qubit QFT
    qc.append(qft, range(n-2))

    # Measure and post-process results classically
    return qc
```

x??

--- 

These flashcards cover key concepts from the provided text in a structured format suitable for learning. Each card provides context, relevant code, and detailed explanations to aid understanding without overburdening memory.

---


#### Amod15 Function
This function defines the quantum circuit for modular exponentiation \( a^{2^k} \mod 15 \). The circuits are parameterized based on the value of \( a \) and used in Shor’s algorithm.

Background context:
Modular arithmetic is fundamental to many areas of cryptography, including RSA. In this case, we are specifically dealing with modular exponentiation under modulo 15.

:p What does the `amod15` function do?
??x
The `amod15` function constructs a quantum circuit that performs the operation \( a^{2^k} \mod 15 \) for given values of \( a \). The circuits are used as subroutines in Shor’s algorithm to find the period of the function.

```python
def amod15(a_in: int, p_in: int) -> QuantumCircuit:
    # Check if a is valid
    if a_in not in [2, 4, 7, 8, 11, 13, 14]:
        raise ValueError("a_in must be 2, 4, 7, 8, 11, 13 or 14")

    quantum_circuit = QuantumCircuit(4)
    
    # Based on a's value, swap qubits to prepare the circuit
    for iteration in range(p_in):
        if a_in in [2, 13]:
            quantum_circuit.swap(2, 3)
            quantum_circuit.swap(1, 2)
            quantum_circuit.swap(0, 1)

        elif a_in in [7, 8]:
            quantum_circuit.swap(0, 1)
            quantum_circuit.swap(1, 2)
            quantum_circuit.swap(2, 3)

        elif a_in in [4, 11]:
            quantum_circuit.swap(1, 3)
            quantum_circuit.swap(0, 2)

        if a_in in [7, 11, 13, 14]:
            for i in range(4):
                quantum_circuit.x(i)
    
    # Name the circuit
    quantum_circuit.name = f"percentiˆ{a_in} mod 15"
    return quantum_circuit
```
x??

---

