# React

React fundamentals and concepts for frontend development.

## Compilers

A JavaScript compiler takes JavaScript code, transforms it and returns JavaScript code in a different format. The most common use case is to take ES6 syntax and transform it into syntax that older browsers are capable of interpreting. Babel is the compiler most commonly used with React.

:p What is a compiler in JS in OTerms? Whats their function?

**Example:** A compiler is a special program that translates a programming language's source code into machine code, bytecode or another programming language.

## Bundlers

Bundlers take JavaScript and CSS code written as separate modules (often hundreds of them), and combine them together into a few files better optimized for the browsers. Some bundlers commonly used in React applications include Webpack and Browserify.

:p What are Bundlers in JS and CSS? and whats their function?

**Example:** Similar to Linking, which means creating a single executable file from several multiple object files. In this step, it is common that the linker will complain about undefined functions which are commonly main themselves.

## Package Managers

Package managers are tools that allow you to manage dependencies in your project. npm and Yarn are two package managers commonly used in React applications. Both of them are clients for the same npm package registry.

:p What are Package Managers?

## (a) Components, (b) Props (c) props.children (d) State (e) Controlled Component

(a) React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element

(b) props are inputs to a React component. They are data passed down from a parent component to a child component.

(c) props.children is available on every component. It contains the content between the opening and closing tags of a component. For example

(d) A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

(e) An input form element whose value is controlled by React is called a controlled component. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

:p Describe (1+) the meaning on own words

## Promise Complete | code

export function setStoredCities(cities: string[]): Promise<void> {
    return COMPLETE HERE => {
        const data: LocaStorage = {
            cities
        }
        chrome.storage.local.set(data, () => {
            if (chrome.runtime.lastError) {
                ### COMPLETE HERE
            } else {
                ### COMPLETE HERE
            }
        })
    })
}

:p Complete the following code to resolve the promise, and rekect it as well

**Example:** ??return new Promise((resolve, reject) => {
    reject(chrome.runtime.lastError)
    resolve()??