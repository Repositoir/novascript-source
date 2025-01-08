# NovaScript Source

Inspired by the [XKCD comic 927](https://xkcd.com/927/), NovaScript is a dynamically-typed and interpreted language with support for objects creation.
The language lexer and parser is written in TypeScript. The syntax for NovaScript is similar to JavaScript and retains most of the keywords.

This project was done with help from the [Tyler Laceby YouTube tutorial](https://www.youtube.com/watch?v=8VB5TY1sIRo&list=PL_2VhOvlMk4UHGqYCLWc6GO8FaPl8fQTh) on creating a programming language from scratch.

This README file contains documentation for the language and of the extent of its support at a given moment.

### Running

NovaScript can be explored by two different modes just like other interpreted languages like JavaScript using Node.js or Python.
As of now running the language requires Node.js to be installed on your system. This is subject to change when the project is compiled to
an executable.

- **Interactive Mode**
  - This can be activated by uncommenting the `repl()` function in the `main.ts` file.
    It executes a single line of NovaScript at a time.
- **Script Mode**
  - This is when an entire file of code is read an executed by the interpreter. All NovaScript files must have a `.nv` extension.
    This is done by passing a NovaScript file to the `run()` function in `main.ts`.

> A `file.nv` is included in this repo for convenience. It usually contains sample code for the latest feature added to NovaScript.

---

## Syntax and Features

> NovaScript already supports some basic features but more support for certain statements and expression are soon
to be added. The features to be included in the future are given in a TODO list below.

> Namespaces in NovaScript works the same way as JavaScript. All statements and expressions that are in a block are of a seperate
> namespace or Environment from the global namespace.
### Variables

Variables can be declared with the `mut` keyword. This makes the variable mutable and re-assignable.

```javascript
mut foo = 23;
foo = 91
print(foo); // 91
```

`mut` variables can be declared without assignment

```javascript
mut foo;
foo = 12;
print(foo) // 12
```

By using the `const` keyword, the variable becomes immutable. `const` variables cannot be declared without a value.

```javascript
const foo = 23;
foo = 34; // Throws error
```

### Binary Expression

NovaScript supports Numeric Binary Expressions of `+`, `-`, `*`, `/` and `%`;

```javascript
const foo = 12 + 45;
print(foo) // 57
```

As an extension of Binary Expressions, comparison expression are also handled such as
`==`, `>=`, `<=`, `>`, `<`.

```javascript
const foo = 1 + 4;
const bar = 2 + 1;

print(foo == bar) // false
print(foo >= bar) // true
print(foo <= bar) // false
print(foo > bar)  // true
print(foo < bar)  // false
```

### Objects

NovaScript supports complex data structs and object creation. There in no current support for classes and all OOP features but
a more C-like structs functionality.

```javascript
const foo = {
  bar: 12,
  firstVar: 13,
  complex : {
    insideVar: 14,
    secondVar: 15
  }
};

print(foo.complex.insideVar)
```
> The above returns the Abstract Syntax Tree (AST) and not the core value yet.
> ```text
> This AST node has not yet been set for interpretation {
> kind: 'MemberExpr',
> object: {
>   kind: 'MemberExpr',
>   object: { kind: 'Identifier', symbol: 'foo' },
>   property: { kind: 'Identifier', symbol: 'complex' },
>   computed: false
> },
> property: { kind: 'Identifier', symbol: 'insideVar' },
> computed: false
> }
> ```

### Boolean Expressions

Boolean Expression are part of global constants and can be assigned to variables.

```javascript
const foo = true;
const bar = false;
print(foo); // true
print(bar); // false
```

### Null Expression

Just like Boolean Expressions, Null Expressions can also be assigned to variables. Using a Binary Expression with a null value returns a null value.

```javascript
const foo = null;
const bar = 2 + foo;

print(foo) // null
print(bar) // null
```

### Native Functions (Builtins)

NovaScript has a builtin function support. Currently, there are two functions from the builtins that
can be called. `print()` and `time()`.

`print()` prints its arguments to the console (`stdout`).

```javascript
const foo = 1234;
print(foo) // 1234
```

`time()` returns current time in milliseconds 

```javascript
print(time()) // time in ms
```

### User-defined Functions

Functions can also be defined by the programmer using the `func` keyword. NovaScript supports taking function arguments and
implementing them. A `return` keyword is unnecessary and simply writing the variable/object to be returned in the last line
of the function is enough.

```javascript
func add(x, y) {
    const value = x + y;
    value // No need for return keyword
}

const res = add(10, 4);

print(res) // 14
```

### If-Else Statements

NovaScript has `if-else` statements functionality similar to those of JavaScript. Since block statements are now simplified,
a block will only be read if the expression passed returns a boolean value of true. If a non-boolean expression is 
entered after the `if` statement then the default value is evaluated as `false`.

```javascript
const foo = 3;
const bar = 2;

if (foo < bar) {
    print(100)
} else if (foo == bar) {
    print(300)
} else {
    print(200)
}

// Prints 200
```

### While Loops

`while` loops are supported in NovaScript. A boolean expression is repeated until a false Runtime Value is returned. The block of code
under a while has its own namespace. 

```javascript
mut foo = 1;

while (foo < 10){
    foo = foo + 1
}

print(foo) // 10
```

### For Loops

`for` loops are counting loops and the iterations of the loop are independent of any other variables outside the
loop scope. For loops are declared in the order of - [var declaration, boolean condition, update statement]. A `for` loop will
iterate with the update as long as the condition remains true.

```javascript
for (mut i = 1; i <= 10; i = i + 1){
    print(i)
}

// Outputs numbers 1 ... 10
```

## TODOs

The below items are TODOs that can be added to the language to increase its support. (Items with strikethrough are completed.)

- ~~Implement a `BooleanExpr` interface and support for more operators like `>`, `<`, `==`.~~
- ~~`if-else` statements.~~
- ~~`while` loop.~~
- ~~`for` loop.~~
- BinaryExpr update for `&&`, `||`, `!`.
- Add support for comments
- Include more native functions for basic math tasks like `sum()` or `pow()`.

