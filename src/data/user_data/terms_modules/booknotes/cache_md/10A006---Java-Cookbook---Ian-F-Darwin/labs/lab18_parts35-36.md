# Lab 18: Java Script Engine Demonstrator

**Book:** Java-Cookbook - Ian-F-Darwin
**Chapters Covered:** Parts 35-36
**Estimated Time:** 4 hours

---

## 📋 Objectives

- Design and implement a Java program that uses javax.script to invoke Python scripts.
- Understand the concept of mixing languages with GraalVM.
- Learn how to use custom script engines and manage Java exceptions in JNI.

## 🔑 Key Concepts

- **javax.script API**
- **GraalVM scripting capabilities**
- **Custom script engines**
- **JNI and Java Virtual Machine (JVM) interaction**

## ✅ Prerequisites

- Familiarity with Java basics, including classes, objects, and methods.
- Understanding of basic Java programming concepts, such as variables, control structures, and functions.

---

## 🧪 Exercises

### Exercise 1: Create a Python Script

Write a simple Python script that prints 'Hello, World!' to the console.

#### Starter Code

```python
import sys
print('Hello, World!')

```

#### 💡 Hints

- Use print() function to output text.
- Import necessary modules.

#### ✓ Validation Criteria

Run the Python script using jython and verify it prints 'Hello, World!' to the console.

---

### Exercise 2: Create a Java Class for Invoking Python Script

Design and implement a Java class that uses javax.script to invoke the Python script written in Exercise 1.

#### Starter Code

```python
import javax.script.ScriptEngineManager;
ScriptEngineManager manager = new ScriptEngineManager();
ScriptEngine engine = manager.getEngineByName("python");
Object result = engine.eval("your_python_script_here");
```

#### 💡 Hints

- Use javax.script API to get a Python script engine.
- Use eval() method to execute the Python script.

#### ✓ Validation Criteria

Run the Java class and verify it prints 'Hello, World!' to the console.

---

### Exercise 3: Integrate GraalVM Scripting

Modify the Java class from Exercise 2 to use GraalVM's scripting capabilities.

#### Starter Code

```python
import org.graalvm.ScriptEngineProvider;
ScriptEngineProvider provider = ScriptEngineProvider instances;
ScriptEngine engine = provider.getEngineByName("python");
```

#### 💡 Hints

- Use GraalVM's ScriptEngineProvider class.
- Specify the script engine name as 'python'.

#### ✓ Validation Criteria

Run the modified Java class and verify it prints 'Hello, World!' to the console.

---

### Exercise 4: Custom Script Engine

Create a custom script engine using javax.script's ScriptEngine interface.

#### Starter Code

```python
public class MyPythonScriptEngine implements ScriptEngine
{
@Override
public Object eval(String script) throws ScriptException {
// Implement Python-like scripting capabilities here.
return null;}
```

#### 💡 Hints

- Implement the eval() method to execute Python scripts.
- Specify the custom script engine name.

#### ✓ Validation Criteria

Run the Java class and verify it executes a Python script correctly.

---

### Exercise 5: JNI and JVM Interaction

Use JNI to start the JVM from within your Java program.

#### Starter Code

```python
import java.langSystem;public class MyJavaProgram
{
static void main(String[] args) 
{
System.out.println("Starting JVM...");
System.loadLibrary('mylibrary');
}}
```

#### 💡 Hints

- Use System.loadLibrary() to load a native library.
- Specify the JNI library name as 'mylibrary'.

#### ✓ Validation Criteria

Run the Java program and verify it starts the JVM correctly.

---

### Exercise 6: Mixing Languages

Combine GraalVM's scripting capabilities with custom script engines to mix languages.

#### Starter Code

```python
import org.graalvm.ScriptEngineProvider;
import java.langSystem;public class MyMixedLanguageProgram
{
static void main(String[] args) 
{
// Use GraalVM's python script engine.
ScriptEngine provider = ScriptEngineProvider instances;
ScriptEngine engine = provider.getEngineByName("python");
Object result = engine.eval("your_python_script_here");
```

#### 💡 Hints

- Use both GraalVM and custom script engines.
- Specify the script engine names as needed.

#### ✓ Validation Criteria

Run the Java program and verify it executes a Python script correctly using GraalVM's scripting capabilities.

---

## 🎯 Bonus Challenges

1. {'number': 7, 'title': 'Add Custom Functionality', 'description': 'Modify one of your Java programs to add custom functionality, such as data validation or error handling.', 'code_template': '', 'hints': ['Use if-else statements or try-catch blocks for conditional logic.', 'Implement custom function signatures.'], 'validation': 'Run the modified Java program and verify it executes correctly.'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A working Java program that invokes a Python script using javax.script.
- Understanding of GraalVM's scripting capabilities and how to integrate them with custom script engines.
- Knowledge of custom script engine implementation using javax.script's ScriptEngine interface.
- Ability to use JNI to start the JVM from within your Java program.

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 35-36 - Java-Cookbook - Ian-F-Darwin*
