# NovaScript Builtins

NovaScript has many builtin functions that offer easier usage of general functions in everyday programming.

> All outputs displayed here are outputs in Release print. If you are creating outputs in Debug print, then the outputs will
> be the entire runtime value object. See the below output example for `print("hello world")`.
> 
> ### Debug Output
> ```text
> { value: 'hello world', type: 'string' }
> ```
> ### Release Output
> ```text
> hello world
> ``` 

---

## General

- ### `print(foo, bar, ...)`

Writes data to `stdout` or the console. Takes any number of args.

```javascript
print("hello world", 1, 2)
```

**Output:**

```text
hello world 1 2
```

- ### `datetime()`

Returns String Literal of current date and time from the system clock.

```javascript
print(datetime())
```

**Output:**

```text
Sat Jan 11 2025 16:01:04 GMT+0100 (Central European Standard Time)
```

---

## Math

- ### `sum(numA, numB, ...)`

The `sum()` function returns the calculated sum of all args passed in the function.
Works only for numeric literals. When arrays are supported in NovaScript, the function definition
will be modified.

```javascript
print(sum(1,2,3,4))
```
**Output:**
```text
10
```

- ### `pow(base, power)`

The `pow()` function returns the exponentiation of the `base` arg raised to the power of the `power` arg.

```javascript
print(pow(3, 4))
```
**Output:**
```text
81
```

- ### `randInt(min, max)`

This function takes two params of `min` and `max`, both of which are numeric literals and returns a random integer between the two number.
This function takes exactly 2 args.

```javascript
print(randInt(3, 10))
```
**Output:**
```text
6
```

---

## Strings

- ### `concat(strA, strB, ...)`

Concatenates all string literals passed in via its arguments. Works on numeric literals as well but the program converts it to a string literal.

```javascript
print(concat("foo", "bar", 123))
```
**Output:**
```text
foobar123
```
