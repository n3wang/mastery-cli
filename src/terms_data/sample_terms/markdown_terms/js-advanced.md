# JavaScript Advanced

#### Difference JIT, Interpreter, Compiler
:p What is the difference between JIT, Interpreter, Compiler?

??x Definition: JIT is a type of compiler that compiles code at runtime, dynamically optimizing it for better performance. Interpreters are programs that read and execute code directly, without first converting it to machine code. Compilers are programs that translate source code into machine code ahead of time.  Compilation: JIT compilers compile code at runtime, as it is executed, and can dynamically optimize the code based on the runtime conditions. Interpreters execute code line-by-line as it is read, without compilation, which can make them slower than compiled code. Compilers translate source code into machine code ahead of time, resulting in faster code execution, but at the cost of longer startup times and reduced portability.  Memory usage: JIT compilers can use more memory than interpreters because they need to store the compiled code and any additional data structures used for optimization. Interpreters can use less memory than compilers because they don't need to store compiled machine code. Compiled code can use less memory than interpreted code because it doesn't need to store the original source code.  Performance: JIT compilation can provide significant performance benefits by dynamically optimizing code at runtime. Interpreted code can be slower than compiled code because it needs to be interpreted line-by-line at runtime. Compiled code is generally faster than interpreted code because it doesn't need to be interpreted at runtime, and can use more aggressive optimization techniques.  Portability: JIT compilation can enable code to be written in a high-level language and still run efficiently on different platforms. Interpreted code can be more portable than compiled code because it doesn't need to be compiled for a specific platform. Compiled code can be less portable than interpreted code because it needs to be compiled for a specific platform, which can limit its ability to run on different platforms without modification. ??

#### inline caching
:p What is inline caching? and how can you create code so that it can be cached?

??x Inline caching happens when a method is re-called, then js engine will check if the object is the same as the previous one, if so, it will use the cached version of the method, if not, it will create a new cache for the new object.  ??

#### Hoisting
:p What is hoisting? 

??x Hoisting is the process of moving all the declarations to the top of the scope before code execution.
function example() {
    console.log(x); // undefined
    console.log(y); // ReferenceError: y is not defined
    
    var x = 1;
    let y = 2;
  }
  
  In this example, the var x = 1; declaration is hoisted to the top of the function scope, so console.log(x); outputs undefined. The let y = 2;
  declaration, however, is not hoisted, so console.log(y);
  throws a ReferenceError because y has not been declared yet. ??

#### var and let
function varScoping() {	var x = 1;
	if (true) {		var x = 2;		console.log(x);	}
	console.log(x);
}

function letScoping() {	let x = 1;
	if (true) {		let x = 2;		console.log(x);	}
	console.log(x);
}

unction varAndLetScoping() {	var x = 1;
	if (true) {		let x = 2;		console.log(x);	}
	console.log(x);
}

:p What is the difference between var and let?

??x The difference between var and let is in their scoping behavior. var declarations are function-scoped, meaning that the variable is only accessible within the function in which it was declared or in the global scope if it is not declared within a function. let, on the other hand, is block-scoped, meaning that the variable is only accessible within the block in which it was declared (including nested blocks) and is not accessible outside of that block. ??

#### Memory Leaks in JS
:p How do memory leaks occur in JavaScript?

??x Memory leaks in JavaScript occur when there is a build-up of unreferenced objects in memory. This can happen when objects are created but not properly released from memory, or when circular references between objects prevent the garbage collector from removing them. ??

#### Garbage Collection in JS
:p How is garbage collection implemented in JavaScript?

??x Garbage collection in JavaScript is automatic and performed by the JavaScript engine. The engine periodically checks the memory heap to identify objects that are no longer referenced and can be safely removed. The garbage collector works by tracing the references between objects and removing any objects that are no longer reachable. ??

#### Event Loop in JavaScript
:p What is the event loop in JavaScript?

??x The event loop in JavaScript is a mechanism that continuously checks the call stack and the callback queue. If the call stack is empty, the event loop takes the next function from the callback queue and adds it to the call stack, where it will be executed. This allows asynchronous functions to be executed in a non-blocking way, without freezing the main thread. ??

#### parallelism-vs-concurrency
:p What is the difference between parallelism and concurrency?

??x Concurrency is about multiple tasks which start, run, and complete in overlapping time periods, in no specific order. Parallelism is about multiple tasks or subtasks of the same task that literally run at the same time on a hardware with multiple computing resources like multi-core processor. ??

#### promise-vs-callback
:p What is the difference between a promise and a callback?

??x The main difference between a promise and a callback is that a callback is a function that is passed as an argument to another function, while a promise is an object that represents the eventual completion or failure of an asynchronous operation. Promises are more flexible than callbacks because they can be chained, which allows them to be used to handle asynchronous operations that depend on the result of a previous operation. Promises also provide a way to handle errors that occur in asynchronous operations, which is not possible with callbacks.
The benefit of Callback:      You can run another function call after waiting for the outcome of a prior function call.     You can call the parent function from the child function and can also pass data from child to parent.
A Promise has four states:       fulfilled: Action related to the promise succeeded     rejected: Action related to the promise failed     pending: Promise is still pending i.e. not fulfilled or rejected yet     settled: Promise has fulfilled or rejected
Benefits of Promises:      Improves Code Readability     Better handling of asynchronous operations     Better flow of control definition in asynchronous logic     Better Error Handling ??

#### multithreadig-vs-multitasking
:p What is the difference between multithreading and multitasking?

??x Multitasking: Multitasking is when a CPU is provided to execute multiple tasks at a time. Multitasking involves often CPU switching between the tasks, so that users can collaborate with each program together. Unlike multithreading, In multitasking, the processes share separate memory and resources. As multitasking involves CPU switching between the tasks rapidly, So the little time is needed in order to switch from the one user to next.  ??

#### hoisting methods
sing();
sing2();
var sing = function() { console.log("uhhhh la la la"); }; function sing2() { console.log("ohhhh la la la"); }

:p What will the following print?

??x 
undefined
ohhhh la la la ??

#### Function hoist function
function one() { console.log('1', isValid); var isValid = true; two(); console.log('2', isValid); }

function two() { console.log('3', isValid); var isValid; console.log('4', isValid); }

function three(){ console.log('5', isValid); }

var isValid = false;

one();
three();

:p What will the following print?

??x 1 undefined 
3 undefined 
4 undefined 
2 true 
5 false ??

#### Weird global strategy
function weird() {
	height = 50;
	return height;
}

console.log(weird());
console.log(height);

:p What will the following print?

??x 50, 50 => js is weird and it will create a global variable ??

#### Function enclosure
var heyhey = function doodle() {
 // code here
};

heyhey();
// doodle is not accessible outside its scope
// this will result in a ReferenceError
doodle();

:p What will the following print?

??x It will throw an error because doodle is not accessible outside its scope ??

#### IIFE
(function() {
 var a = 'Hello';
})();

console.log(a);

:p What is IIFE?, Why would you use it? What will this print?

??x Immediately Invoked Function Expression, 
is a module scope was implemented just above the function scope. This allowed variables to be shared, by exporting and importing, between the functions without having to go through the global scope.
=>  Undefined, a would be encapsulated into the anonymous function. ??

#### This
var person = {
	firstName: "John",
	lastName : "Doe",
	id     : 5566,
	myFunction : function() {
		return this;
	}
};

console.log(person.myFunction());

:p What does this officially print?

??x This is the object that the function is a property of
 In this case it will print: {firstName: "John", lastName : "Doe", id     : 5566, myFunction : function() { return this; }} ??

#### call
const wizard = {
	name: "Merlin",
	health: 100,
	heal(num1, num2) {
		return (this.health += num1 + num2);
	}
};

const archer = {
	name: "Robin Hood",
	health: 30
};

:p Use Call to steal Wizard's healing and use it into archer for 50 and 60'

??x wizard.heal.call(archer, 50, 60); ??

#### apply
const wizard = {
	name: "Merlin",
	health: 100,
	heal(num1, num2) {
		return (this.health += num1 + num2);
	}
};

const archer = {
	name: "Robin Hood",
	health: 30
};

:p Use apply to steal Wizard's healing and use it into archer for 20 and 30'

??x wizard.heal.apply(archer, [20, 30]); ??

#### bind
const wizard = {
	name: "Merlin",
	health: 100,
	heal(num1, num2) {
		return (this.health += num1 + num2);
	}
};

const archer = {
	name: "Robin Hood",
	health: 30
};

:p Use  bind to steal Wizard's healing and use it into archer for 50 and 60'

??x const healArcher = wizard.heal.bind(archer, 50, 60); 
 healArcher(); ??

#### context vs scope
:p What is the difference between context and scope? When you declare an variable of inside an object are you creating the context or the scope?

??x Context is the object that the function is a property of. Scope is the variable environment of the execution context, which consists of any local variables that were in-scope at the time the execution context was created.

When you declare a variable inside an object, you are creating a new variable in the object's scope. This means that the variable is accessible within the object, but not outside of it. However, the context of the variable depends on how it is accessed. If you access the variable using the object's name, the context will be the object itself. If you access the variable using a reference to the object's method or a callback function, the context may be different. ??

#### typeof
typeof 5
typeof '5'
typeof true
typeof undefined
typeof null
typeof {}
typeof []
typeof function(){}

:p What will the following print?

??x number
string
boolean
undefined
object
object
object
function => However in reality is actually an object ??

#### weird functions behaviour on types
function a() {}
a.hi = 'hi'
console.log(a.hi)

:p What will the following print?

??x hi ==> functions are objects ??

#### weird functions behaviour on types 2
true.toString()
typeof Infinity

:p What will the following print?

??x true
number ??

#### Rename variables in Vim
:p How would you rename a variable in Vim?

??x :%s/old/new/g | cgn new_name + escape + . (for each) ??

#### Move lines in Vim
:p How would you move a line in Vim?

??x :m +1 (move down)
:m -1 (move up) ??

#### Create clone of arr
const arr = [1, 2, 3];

:p How would you create a clone of an array? Name the clone, `clone`

??x const clone = [...arr]; | const clone = arr.slice(); | const clone = arr.concat(); ??

#### Create clone of obj
const obj = { a: 1, b: 2, c: 3 };

:p How would you create a clone of an object? Name the clone, `clone`

??x const clone = { ...obj }; | const clone = Object.assign({}, obj); ??

#### function arguments - marry
:m
```js
function marry(person1, person2) {
		console.log(arguments);
		console.log(Array.from(arguments));
		return `${person1} is now married to ${person2}`;

    marry('Tim', 'Tina');
    }
  ```

:p What will the following print?

??x Arguments(2)['Tim', 'Tina', callee: ƒ, Symbol(Symbol.iterator): ƒ]
(2) ["Tim", "Tina"]
Tim is now married to Tina ??

#### Deep Clonning
:m
This will create a shallow clone
```js
let output = let obj = {a: 'a', b: 'b', c: {
	deep: 'try and copy me'
}};
let clone = Object.assign({}, obj);
let clone2 = {...obj}; // ES6

obj.c.deep = 'hahaha';
console.log(clone); // {a: 'a', b: 'b', c: {deep: 'hahaha'}}
console.log(clone2); // {a: 'a', b: 'b', c: {deep: 'hahaha'}};console.log(output);```

:p How would you deep clone an object?

??x let superClone = JSON.parse(JSON.stringify(obj)); ??

#### static-vs-dynamic typed
:p Name example of  (1) static typed: are checked during the compile stage, so all types are known before run-time,
(2) dynamic language: are checked on the fly, during the execution stage.
(3) weakly typed: languages can make type coercions implicitly.
(4) strongly typed: do not allow conversions between unrelated types.

??x 1) Java, C, C++, C#
2) Python, PHP, Ruby, Perl JavaScript
3) JavaScript, PHP, C, C++
4) Java, C#, Python ??

#### creating-quick-tests-mocha
:p How would you create a quick test in Mocha? Create a quick example using assert, describe and it
Remember to improt it.

??x const assert = require('assert');

describe('Problem integrity', function () {
 it('should return true', function () {
 console.log('Hello, welcome to analytics');
 assert.equal(true, true);
 });
}); ??