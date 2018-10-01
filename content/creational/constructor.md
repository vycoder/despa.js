## The Constructor Pattern
Constructors are used to create specific types of objects, they both prepare the object for use and can also accept parameters to initialize the values of member variables.

Constructors are so prevalent in programming languages that some might argue that it's not a pattern anymore but an OOP language intrinsic feature.

### Basic Constructors
Javascript is not inherently a pure OO language but it does support creating object instances via constructor functions.

```javascript
function Car(model, year, miles) {
    this.model = model
    this.year = year
    this.miles = miles
    
    this.toString = function() {
        return this.model + ' has done ' + this.miles + ' miles';
    }
}
```
`Car` will then behave as a function construtor when the keyword `new` is prefixed upon invocation. It will return a new object populated by the properties we defined inside the body via `this`.
```javascript
var nissan = new Car('Nissan Juke', 2017, 1000);
var mazda = new Car('Mazda 3', 2018, 3000);

console.log(nissan.toString());
console.log(mazda.toString());
```
It does perform the job really well, although it has some problems. It isn't very optimal, methods defined inside the function constructor like `toString` will be recreated per instance. Ideally we want this to be shared between all of the instances of the Car type.
```javascript
console.log(nissan.toString === mazda.toString)
```
```
false
```

### Constructors with Prototypes
Defining the function outside the function constructor but directly to the prototype we ensure that each instance gets the same function definition.
```javascript
function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

Person.prototype.greet = function() {
    return `Hi, I'm ${this.firstname} ${this.lastname}`;
}

const tesla = new Person('Nikola', 'Tesla');
const feynman = new Person('Richard', 'Feynman');

console.log(tesla.greet());
console.log(feynman.greet());
console.log(tesla.greet === feynman.greet);
```
```
Hi, I'm Nikola Tesla
Hi, I'm Richard Feynman
true
```