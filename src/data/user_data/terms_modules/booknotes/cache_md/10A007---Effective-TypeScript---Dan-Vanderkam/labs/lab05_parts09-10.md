# Lab 05: Simulating a Flight Control System using TypeScript

**Book:** Effective-TypeScript - Dan-Vanderkam
**Chapters Covered:** Parts 09-10
**Estimated Time:** 4-6 hours

---

## 📋 Objectives

- To understand the importance of type design in representing valid states
- To apply type design principles to create robust and safe interfaces
- To integrate concepts from both chapters to build a functional flight control system

## 🔑 Key Concepts

- **High-Quality Flashcards: 10A007---Effective-TypeScript---Dan-Vanderkam_processed (Part 9)**
- **Valid State Representation**
- **Handling Invalid State in Code**
- **State Transition Examples**
- **Type Design for Valid State**
- **Improved State Representation**
- **RenderPage Function**
- **ChangePage Function**
- **Design Principles for Critical Systems**
- **Robustness Principle (Postel's Law)**

## ✅ Prerequisites

- Basic understanding of TypeScript and object-oriented programming
- Experience with designing and implementing simple state machines or interfaces

---

## 🧪 Exercises

### Exercise 1: Create a Basic Flight Control System

Implement a basic flight control system with two states: LoginPageState and UserState. Use type design to ensure valid state representation.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create a function to render the page
function RenderPage(state: RequestState) {
  // Implement logic to render the page based on the current state
}

// Create a function to change the page
function ChangePage(state: RequestState) {
  // Implement logic to change the page based on the current state
}
```

#### 💡 Hints

- Use type design to ensure that the state is always valid
- Handle invalid states in your code

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state

---

### Exercise 2: Implement State Transitions

Modify the flight control system to include state transitions. Use the RenderPage and ChangePage functions to handle transitions.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create a function to render the page
function RenderPage(state: RequestState) {
  // Implement logic to render the page based on the current state
}

// Create a function to change the page
function ChangePage(state: RequestState) {
  // Implement logic to change the page based on the current state and handle transitions
}
```

#### 💡 Hints

- Use the RenderPage and ChangePage functions to handle transitions
- Ensure that the program correctly handles invalid states

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state after a transition

---

### Exercise 3: Design Interfaces for Simplicity and Safety

Modify the flight control system to include interfaces designed with simplicity and safety in mind. Use type design to ensure that invalid states are handled correctly.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create an interface for the flight control system
interface FlightControlSystem {
  renderPage(state: RequestState): void;
  changePage(state: RequestState): void;
}

// Implement the flight control system
class FlightControlSystem implements FlightControlSystem {
  constructor() {
    this.state = LoginPageState;
  }

  renderPage(state: RequestState) {
    // Implement logic to render the page based on the current state
  }

  changePage(state: RequestState) {
    // Implement logic to change the page based on the current state and handle transitions
  }
}
```

#### 💡 Hints

- Use interfaces to design with simplicity and safety in mind
- Ensure that type design is used to handle invalid states correctly

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state after a transition

---

### Exercise 4: Averaging Input vs. Linked Controls

Modify the flight control system to include averaging input vs. linked controls. Use type design to ensure that invalid states are handled correctly.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create a function to render the page
function RenderPage(state: RequestState) {
  // Implement logic to render the page based on the current state
}

// Create a function to change the page
function ChangePage(state: RequestState) {
  // Implement logic to change the page based on the current state and handle transitions
}
```

#### 💡 Hints

- Use type design to ensure that invalid states are handled correctly
- Consider using averaging input vs. linked controls

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state after a transition

---

### Exercise 5: Design Principles for Critical Systems

Modify the flight control system to include design principles for critical systems. Use type design to ensure that invalid states are handled correctly.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create a function to render the page
function RenderPage(state: RequestState) {
  // Implement logic to render the page based on the current state
}

// Create a function to change the page
function ChangePage(state: RequestState) {
  // Implement logic to change the page based on the current state and handle transitions
}
```

#### 💡 Hints

- Use design principles for critical systems
- Ensure that type design is used to handle invalid states correctly

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state after a transition

---

### Exercise 6: Bonus Challenge: Airbus 330 Flight 447 Accident

Modify the flight control system to include the Airbus 330 flight 447 accident scenario. Use type design to ensure that invalid states are handled correctly.

#### Starter Code

```python
// Import necessary modules
import { LoginPageState, UserState } from './states';

// Create a function to render the page
function RenderPage(state: RequestState) {
  // Implement logic to render the page based on the current state
}

// Create a function to change the page
function ChangePage(state: RequestState) {
  // Implement logic to change the page based on the current state and handle transitions
}
```

#### 💡 Hints

- Use type design to ensure that invalid states are handled correctly
- Consider including the Airbus 330 flight 447 accident scenario

#### ✓ Validation Criteria

Verify that the program runs without errors and displays the correct state after a transition

---

## 🎯 Bonus Challenges

1. {'title': 'Advanced: Implementing a State Machine with Finite Automata', 'description': 'Implement a state machine using finite automata. Use type design to ensure that invalid states are handled correctly.', 'code_template': "// Import necessary modules\nimport { LoginPageState, UserState } from './states';\n\n// Create a function to render the page\nfunction RenderPage(state: RequestState) {\n  // Implement logic to render the page based on the current state\n}\n\n// Create a function to change the page\nfunction ChangePage(state: RequestState) {\n  // Implement logic to change the page based on the current state and handle transitions\n}", 'hints': ['Use finite automata to implement the state machine', 'Ensure that type design is used to handle invalid states correctly'], 'validation': 'Verify that the program runs without errors and displays the correct state after a transition'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A functional flight control system with valid state representation
- Interfaces designed with simplicity and safety in mind
- Robust handling of invalid states using type design

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 09-10 - Effective-TypeScript - Dan-Vanderkam*
