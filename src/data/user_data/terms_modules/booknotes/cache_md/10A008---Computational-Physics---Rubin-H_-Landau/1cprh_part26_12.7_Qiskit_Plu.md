# High-Quality Flashcards: 10A008---Computational-Physics---Rubin-H_-Landau_processed (Part 26)


**Starting Chapter:** 12.7 Qiskit Plus IBM Quantum

---


#### Comparing Simulation Results on Aer and IBM Quantum
The Qiskit Aer simulator can be used to run circuits and simulate their states. The results from the simulator are compared with those obtained from running the same circuit on an actual quantum device.

:p How do you execute a quantum circuit using the statevector_simulator backend in Qiskit?
??x
Set up the Aer backend for statevector simulation:
```python
from qiskit import Aer

backend = Aer.get_backend("statevector_simulator")
```
Run the job and retrieve the result:
```python
job = backend.run(circuit)
result = job.result()
statevector = result.get_statevector(circuit, decimals=3)
statevector.draw(output="latex")
plot_state_city(statevector)
```
x??

---


#### Quantum Adder Code
Background context on the code provided for constructing the quantum adder circuit.

:p What does this function do?
??x
This function constructs a quantum circuit that adds two bit values x and y using CCX (Toffoli) gates and CNOT gates. It initializes qubits, applies necessary gates, and returns the resulting QuantumCircuit object.
```python
def adder_circuit(x_in: int, y_in : int) -> QuantumCircuit:
    # Initialize qubits for x, y, and c
    s = f"0{y_in:02b}{x_in:02b}"
    qc = QuantumCircuit(5, 3)
    
    # Apply initialization state
    qc.initialize(s)
    
    # Apply CCX gate for main logic
    qc.ccx(0, 2, 4)
    
    # Apply CNOT gate as intermediate step
    qc.cx(0, 2)
    
    # Reset qubit and apply another CCX for carry bit
    qc.reset(0)
    qc.ccx(1, 3, 0)
    
    return qc
```
x??

---


#### Quantum Fourier Transform Overview
The Quantum Fourier Transform (QFT) is a quantum version of the Discrete Fourier Transform, used extensively in quantum algorithms such as Shor's algorithm. It transforms an N-qubit quantum state into its frequency components, which are represented by complex numbers.

:p What is QFT and how does it differ from DFT?
??x
The Quantum Fourier Transform (QFT) is a quantum analog of the Discrete Fourier Transform (DFT). While DFT operates on classical data points in the time domain, transforming them into frequency components, QFT operates on qubits and transforms an N-qubit state into its spectral representation. Unlike classical DFT, which has a complexity of \(O(N^2)\), QFT can be performed using only \(O(N \log N)\) quantum gates.

The QFT is defined as:
\[ \text{QFT} |x\rangle = \frac{1}{\sqrt{N}} \sum_{y=0}^{N-1} e^{-2\pi i x y / N} |y\rangle \]

For a 2-qubit system, the QFT can be implemented using Hadamard and controlled phase gates. The general formula for the QFT of \(n\) qubits is:
\[ \text{QFT}|x\rangle = \frac{1}{\sqrt{N}} \sum_{y=0}^{N-1} e^{-2\pi i x y / N} |y\rangle \]
where \(x\) and \(y\) are binary representations of the qubit state.

```python
from qiskit import QuantumCircuit

def qft(n):
    qc = QuantumCircuit(n)
    for q in range(n):
        qc.h(q)  # Apply Hadamard gates
        for k in range(q+1, n):
            qc.cu1(-np.pi/float(2**(k-q)), q, k)
    return qc
```

x??

---

