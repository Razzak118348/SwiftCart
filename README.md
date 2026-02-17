# Javascript Concept Explanation

## null vs undefine

| Topic       | Undefined                | null                |
| ----------- | ------------------------ | ------------------- |
| Who sets it | JavaScript automatically | Programmer manually |
| Meaning     | value not assigned       | Intentionally empty |
| Type        | undefined                | object              |

### Example

```js
let a;
console.log(a); //undefined
let b = null;
console.log(b); //null
```

## Difference between map() and forEach()

### map()
1) It return a new array
2) Used to transform data

```js
let numbers =[1,2,3]
let result =numbers.map(num =>num*2);
console.log(result); //[2,4,6]
```

### forEach()
1) It doesnot return a new array
2) It used for iteration only

```js
let nums=[1,2,3];
nums.forEach(num=>console.lgo(num*2))
```
## Diffence between == and ===
### ==(loose equality)
1) Compares values only
2) Performs type cocecion
```js
console.log(5=="5");//true
```
### ===(strict equality)
1) Compares both value and type
2) No type conversion
```js
console.log(5==="5")//false
```
## Significance of async/await
when fetching data from an API, the opertion is asynchronous
async/await makes asynchoronus fode easier to read and manage.
```js
async function getData() {
  try {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
```
## Js scope (Global,function,Block)
### Global scope
variables declared outside any function are accessible throughout the program.
```js
let name = "Razzak";

function greet() {
  console.log(name);
}
```
### Function scope
variables declared inside a function are accessible only within that  function
```js
function test() {
  let age = 25;
  console.log(age);
}
```
### Block scope
variables declared with let or const inside {} are accessible only within that block.
```js
if (true) {
  let city = "Dhaka";
  console.log(city);
}
```