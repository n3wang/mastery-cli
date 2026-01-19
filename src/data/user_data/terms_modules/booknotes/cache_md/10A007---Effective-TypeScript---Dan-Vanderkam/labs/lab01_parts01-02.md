# Lab 01: Building a RESTful API with TypeScript

**Book:** Effective-TypeScript - Dan-Vanderkam
**Chapters Covered:** Parts 01-02
**Estimated Time:** 4 hours

---

## 📋 Objectives

- Understand the relationship between TypeScript and JavaScript
- Get comfortable with structural typing in TypeScript
- Design and implement a RESTful API using TypeScript
- Implement type annotations for API endpoints
- Use async/await syntax to handle asynchronous operations

## 🔑 Key Concepts

- **TypeScript file extensions**
- **Migration path from JavaScript to TypeScript**
- **Type system in TypeScript**
- **Type annotations in TypeScript**
- **Async/await syntax in TypeScript**

## ✅ Prerequisites

- Basic knowledge of JavaScript and its ecosystem
- Understanding of HTML, CSS, and a web browser

---

## 🧪 Exercises

### Exercise 1: Step 1: Set up a new Node.js project with TypeScript

Create a new directory for the project, install Node.js and TypeScript, and set up a basic project structure.

#### Starter Code

```python
mkdir my-api && cd my-api && npm init -y &&npm install typescript @types/node --save-dev
```

#### 💡 Hints

- Use 'tsc' to compile TypeScript files instead of 'js'

#### ✓ Validation Criteria

Check if the project directory has a 'tsconfig.json' file and a '.gitignore' file

---

### Exercise 2: Step 2: Define API endpoints with type annotations

Create a new file 'api.ts' and define a function for each endpoint, including the request body shape using the 'ShapeKind' interface.

#### Starter Code

```python
interface RequestBody { name: string; age: number };
function GET(req: ShapeKind<RequestBody>, res: LightApiResponse): void;
```

#### 💡 Hints

- Use 'async/await' syntax to handle asynchronous operations

#### ✓ Validation Criteria

Check if the API endpoints have type annotations for the request body

---

### Exercise 3: Step 3: Implement API endpoint logic

Write the logic for each API endpoint, including database interactions and error handling.

#### Starter Code

```python
function GET(req: ShapeKind<RequestBody>, res: LightApiResponse): void { const name = req.body.name; // ... }
```

#### 💡 Hints

- Use 'async/await' syntax to handle asynchronous operations

#### ✓ Validation Criteria

Check if each API endpoint has logic and returns a response

---

### Exercise 4: Step 4: Test the API endpoints

Write tests for each API endpoint using a testing framework like Jest.

#### Starter Code

```python
describe('GET /users', () => { it('should return a user object', async () => { const res = await request.get('/users'); expect(res.body).toEqual({ id: 1, name: 'John Doe' }); }); });
```

#### 💡 Hints

- Use the 'request' package to make HTTP requests

#### ✓ Validation Criteria

Check if each test passes

---

### Exercise 5: Step 5: Deploy the API (bonus)

Deploy the API to a cloud platform like Heroku or AWS using the 'serverless' framework.

#### Starter Code

```python
serverless deploy
```

#### 💡 Hints

- Use the 'serverless' command to deploy the API

#### ✓ Validation Criteria

Check if the API is deployed and can be accessed

---

## 🎯 Bonus Challenges

1. {'title': 'Bonus Challenge: Add authentication using JSON Web Tokens (JWT)', 'description': 'Implement authentication using JWT for each API endpoint.', 'code_template': "const token = req.headers.authorization.split(' ')[1]; const decodedToken = jwt.verify(token, process.env.SECRET_KEY);", 'hints': ["Use the 'jsonwebtoken' package to generate and verify JWTs"], 'validation': 'Check if each API endpoint has authentication'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A working RESTful API with TypeScript that returns a user object when accessed at /users
- Type annotations for API endpoints and request bodies using the 'ShapeKind' interface
- Async/await syntax used to handle asynchronous operations in API endpoint logic

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 01-02 - Effective-TypeScript - Dan-Vanderkam*
