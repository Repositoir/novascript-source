# NovaScript Builtins

NovaScript has many builtin functions that offer easier usage of general functions in everyday programming.

> [!WARNING]
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

- ### `sum(numA, numB, ... | numArr[])`

The `sum()` function returns the calculated sum of all args passed in the function.
Works only for numeric literals. Calculates the sum of Numeric Literals in the array if passed
as an arg.

```javascript
print(sum(1,2,3,4))

const foo = [5,5,5,5,5];
print(sum(foo))
```
**Output:**
```text
10
25
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

- ### `max(arr | (valA, valB))`

This function takes either two number parameters and returns the maximum value between the two or takes an array and returns the maximum value.

```javascript
print(max(3, 10))
print(max([1,2,33,4,5]))
```
**Output:**
```text
10
33
```

- ### `min(arr | (valA, valB))`

This function takes either two number parameters and returns the minimum value between the two or takes an array and returns the minimum value.

```javascript
print(min(3, 10))
print(min([1,2,33,4,5]))
```
**Output:**
```text
3
1
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

