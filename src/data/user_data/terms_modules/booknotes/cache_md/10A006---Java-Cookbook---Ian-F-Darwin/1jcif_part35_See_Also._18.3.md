# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 35)


**Starting Chapter:** See Also. 18.3 Calling Other Languages via javax.script. Problem. Solution. Discussion

---


#### Running Java Programs from Within Another Program
Background context: In many cases, you might want to run a Java program from within another Java program. However, this is generally not recommended due to performance overheads associated with starting a new JVM process.

:p How does running one Java program from another typically differ in terms of speed and efficiency?
??x
Running one Java program from another can be slower because it involves the overhead of starting a new JVM process. This includes loading libraries, initializing the JVM, and other startup tasks which are avoided when using threads within the same JVM.

```java
// Example of creating a thread to run a method in another class
public class Main {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
    }
}

class MyRunnable implements Runnable {
    @Override
    public void run() {
        // Code to be executed in a separate thread
    }
}
```
x??

---

#### Using javax.script for Invoking Other Languages from Java
Background context: The `javax.script` package allows you to invoke scripts written in various languages (such as Python, Perl, Ruby) directly from within your Java program. This can be useful when integrating functionalities from different scripting languages into a Java application.

:p How can you use the `javax.script` API to run a script in JavaScript?
??x
You can use the `ScriptEngineManager` and `ScriptEngine` classes to find and execute scripts written in supported languages, such as JavaScript. The following steps outline how to do this:

```java
public class ScriptEnginesDemo {
    public static void main(String[] args) throws ScriptException {
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        
        // List the installed engines
        scriptEngineManager.getEngineFactories().forEach(factory -> 
            System.out.println(factory.getLanguageName()));
        
        // Run a JavaScript script
        String lang = "JavaScript";
        ScriptEngine engine = scriptEngineManager.getEngineByName(lang);
        if (engine == null) {
            System.err.println("Could not find engine");
            return;
        }
        engine.eval("print(\"Hello from \" + lang);");
    }
}
```
x??

---

#### Calling Python from Java Using Jython
Background context: Jython is a Python implementation that runs on the JVM, allowing you to use Python scripts within your Java applications. The `javax.script` API facilitates this integration.

:p How can you call Python from Java using the `javax.script` package?
??x
You can call Python from Java using Jython by finding and executing a script engine named "python". Here's an example:

```java
public class PythonFromJava {
    private static final String PY_SCRIPTNAME = "pythonfromjava.py";
    
    public static void main(String[] args) throws Exception {
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        
        // Get the Python engine
        ScriptEngine engine = scriptEngineManager.getEngineByName("python");
        if (engine == null) {
            final String message = 
                "Could not find 'python' engine; add its jar to CLASSPATH";
            System.out.println(message);
            System.out.println("Available script engines are: ");
            scriptEngineManager.getEngineFactories().forEach(factory -> 
                System.out.println(factory.getLanguageName()));
            
            throw new IllegalStateException(message);
        }
        
        // Set a variable in the Python environment
        final Bindings bindings = engine.getBindings(ScriptContext.ENGINE_SCOPE);
        bindings.put("meaning", 42);
        
        // Run a Python script from within your Java application
        InputStream is = PythonFromJava.class.getResourceAsStream("/" + PY_SCRIPTNAME);
        if (is == null) {
            throw new IOException("Could not find file " + PY_SCRIPTNAME);
        }
        engine.eval(new InputStreamReader(is));
        System.out.println("Java: Meaning is now " + bindings.get("meaning"));
    }
}
```
x??

---


#### Background on Java Script Engines Before Oracle Dismantled java.net
Background context explaining the historical availability of script engines before Oracle dismantled java.net. The site used to list many languages and allowed downloading of script engines directly.

:p What was the state of script engine availability before Oracle removed support for it?
??x
The Java platform used to provide a diverse range of scripting capabilities through the java.net project, which hosted various script engines that could be easily downloaded and integrated into Java applications. However, after Oracle's dismantling of this project, official direct access to these resources was no longer available.

x??

---

#### Downloading Script Engines Indirectly
Background context explaining how one can still access script engines indirectly through unofficial sources like GitHub repositories.

:p How can one still obtain and use script engines for Java applications?
??x
One can still obtain and use script engines by accessing unofficial repositories. For example, the javax-scripting project maintains a list of available engines which can be accessed via an unofficial source code repository on GitHub at https://github.com/scijava/javax-scripting.

```java
// Example of how to use javax.script API to evaluate a script
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

public class ScriptEvaluator {
    public static void main(String[] args) throws ScriptException {
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");
        
        Object result = engine.eval("2 + 2");
        System.out.println(result); // Prints: 4
    }
}
```

x??

---

#### Using Python with GraalVM
Background context explaining how to use different languages within a single VM using GraalVM.

:p How can one install and use the Python language pack in GraalVM?
??x
To use the Python language pack in GraalVM, you need to install it via the `gu` utility. Here's an example of how to do this:

```sh
$ gu install python
```

This command will download and install the necessary components for running Python within your GraalVM environment.

x??

---

#### Mixing Languages with GraalVM
Background context explaining the concept of mixing languages in a single VM using GraalVM, including an example scenario.

:p What is the problem statement when working with multiple languages in GraalVM?
??x
The goal is to use different programming languages within a single GraalVM instance. This can be useful for integrating various language features or tools into your application.

x??

---

#### Discussion on Mixing Languages
Background context explaining why and how one might want to mix languages, including the current state of supported languages in GraalVM.

:p Why is it important to support multiple languages within a single VM like GraalVM?
??x
Supporting multiple languages within a single VM allows for greater flexibility in application design. You can leverage the strengths of different programming paradigms and tools without the overhead of separate processes or virtual machines. As of now, while the number of supported languages is small but growing, this capability opens up opportunities for hybrid applications that benefit from diverse language ecosystems.

x??

---

#### Custom Script Engines
Background context explaining how to create custom script engines if a specific language is not available via the standard APIs.

:p How can one roll their own scripting engine?
??x
Creating your own scripting engine involves defining the behavior and semantics of the new scripting language. This typically includes writing an interpreter or compiler, as well as integrating it with the Java Scripting API (`javax.script`) to enable interaction between Java and the custom script.

One resource for guidance on implementing a custom script engine is available at: https://darsw.com/java/scriptengines.html

x??

---


---
#### Java Native Interface (JNI) Overview
Background context: The Java Native Interface (JNI) is a standard mechanism for calling native methods from Java. It allows Java programs to call C or C++ code directly, providing access to system resources and performing low-level operations that are not possible with pure Java.

:p What is JNI and how does it enable interaction between Java and C/C++?
??x
JNI enables the integration of Java applications with C/C++ code by providing a standard interface. It allows Java programs to call native methods, thereby accessing system resources or executing performance-critical operations that are not feasible in pure Java.

For example:
- Accessing hardware directly.
- Performing low-level data processing.
- Integrating with legacy systems written in C/C++.

The JNI provides functions and data types to bridge the gap between Java and native code. Here’s a brief overview of some key functions:

```c
#include <jni.h>

int main(int argc, char *argv[]) {
    // Code for starting JVM and calling Java methods.
}
```
x??

---
#### Starting the Java Virtual Machine (JVM) via JNI
Background context: To use JNI, you need to start a JVM from native code. The `JNI_CreateJavaVM` function initializes the JVM and starts its execution.

:p How do you start the JVM using JNI?
??x
To start the JVM, you use the `JNI_CreateJavaVM` function. This function takes pointers to arguments for initialization and returns pointers to the JavaVM and JNIEnv structures.

```c
#include <jni.h>

int main(int argc, char *argv[]) {
    JavaVM *jvm;
    JNIEnv *myEnv;
    JDK1_1InitArgs jvmArgs;

    // Initialize the arguments structure
    JNI_GetDefaultJavaVMInitArgs(&jvmArgs);

    // Start the JVM
    if (JNI_CreateJavaVM(&jvm, &myEnv, &jvmArgs) < 0) {
        fprintf(stderr, "CreateJVM failed");
        exit(1);
    }
}
```
x??

---
#### Finding and Calling Java Methods Using JNI
Background context: Once the JVM is started, you can find and call Java methods using the `FindClass`, `GetMethodID`, and `CallStaticVoidMethodA` functions.

:p How do you locate and invoke a Java method using JNI?
??x
To locate and invoke a Java method in a class, follow these steps:

1. Use `FindClass` to get the class object.
2. Use `GetMethodID` to find the specific method ID.
3. Call the method using `CallStaticVoidMethodA`.

Here’s an example of how to do this:

```c
jclass myClass = (*myEnv)->FindClass(myEnv, argv[1]);
if (myClass == NULL) {
    fprintf(stderr, "FindClass failed");
    exit(1);
}

jmethodID myMethod = (*myEnv)->GetStaticMethodID(
    myEnv, myClass, "main", "([Ljava/lang/String;)V"
);

if (myMethod == NULL) {
    fprintf(stderr, "GetMethodID failed");
    exit(1);
}
```
x??

---
#### Managing Java Exceptions in JNI
Background context: When calling Java methods from native code, you need to handle exceptions that may be thrown by the Java method. The `ExceptionOccurred`, `ExceptionDescribe`, and `ExceptionClear` functions are used for this purpose.

:p How do you manage exceptions when invoking a Java method using JNI?
??x
To manage exceptions, use the following steps:

1. Check if an exception has occurred with `ExceptionOccurred`.
2. If an exception is present, describe it with `ExceptionDescribe` and clear it with `ExceptionClear`.

Here’s how to do this in code:

```c
if ((tossed = (*myEnv)->ExceptionOccurred(myEnv)) != NULL) {
    fprintf(stderr, "Exception detected: ");
    (*myEnv)->ExceptionDescribe(myEnv);
    (*myEnv)->ExceptionClear(myEnv);
}
```
x??

---
#### Clean Up the JVM
Background context: After completing interactions with the JVM, it’s important to clean up by destroying the Java VM using `DestroyJavaVM`.

:p How do you properly shut down the JVM after your JNI operations?
??x
To properly shut down the JVM, use the `DestroyJavaVM` function. This ensures that all resources are released and the JVM is terminated.

```c
(*jvm)->DestroyJavaVM(jvm);
```
x??

---

