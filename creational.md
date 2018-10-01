# Creational Design Patterns
Forms the basis for a number of other design patterns and could be considered the easiest to understand. It deals with the idea of _creating new things_, specifically new objects. In JavaScript, the three common ways to create new objects are:

```javascript
var newObject = {};
var newObject = Object.create(null);
var newObject = new Object();
```

There are then four ways in which keys and values can then be assigned to an object:

1. Dot Syntax
```javascript
newObject.someKey = 'Hello World';
const value = newObject.someKey;
```

2. Square Bracket Syntax
```javascript
newObject['someKey'] = 'Hello World';
const value = newObject['someKey'];
```

3. via `Object.defineProperty(obj, key, config)`

    Where `config.value` is the value that we want to assign. There are other properties of `config` that we can set but we won't worry about it right now.

```javascript
Object.defineProperty(newObject, "someKey", {
    value: 'Hello World',
    writable: true,
    enumerable: true,
    configurable: true
})

// or a shorthand
const defineProp = function(obj, key, value) {
    config.value = value;
    Object.defineProperty(obj, key, config);
}

defineProp(newObject, 'someKey', 'Hello World');
```

4. via `Object.defineProperties(obj, {key: config}...)`
```javascript
Object.defineProperties(newObject, {
    'someKey': {
        value: 'Hello World',
        writable: true
    },
    'anotherKey': {
        value: 'Hi world',
        writeable: false
    }
})
```

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

## Singleton
A singleton is a pattern where we only want one instance of object to ever exist while our program is running.

With JavaScript, singletons serve as a namespace provider which isolate implementation code from the global namespace so-as to provide a point of access for functions.

We can actually consider an object literal to be the simplest singleton in JavaScript.
```javascript
const SimpleSingleton = {
    prop1: 'prop 1',
    prop2: 'yeah',
    toString: () => {
        return this.prop1 + this.prop2;
    }
}
```
This implementation is fairly limited if we want to add some private properties and is far from how Singletons are usually implemented.

We could introduce private properties by wrapping them inside a closure that returns our desired object.
```javascript
function AnotherSingleton = () => {
    const privateProp = 'private';

    const privateMethod = () => {
        console.log(privateProp);
    }

    return {
        publicProp: 'Public',
        publicMethod: () => {
            // do something
            privateMethod();
        }
    }
}

const anotherSingleton = AnotherSingleton();
anotherSingleton.publicMethod();
console.log(anotherSingleton.publicProp);
```
```
private
public
```

The above example is better but let's now implement an instance checker to ensure that we can only instantiate the object once.

```javascript
const BetterSingleton = (() => {
    let instantiated;
    const privateProp = 'private';

    const privatMethod = () => {
        console.log('private method');
    }

    function init() {
        return {
            publicProp: 'public prop',
            publicMethod: () => {
                // do something
                privateMethod();
            }
        }
    }

    return {
        getInstance: () => {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    }
})();

const theInstance = BetterSingleton.getInstance();
theInstance.publicMethod();
console.log(BetterSingleton.getInstance().publicProp);
```
The above example is even better than the previous one. `BetterSingleton` checks if `instantiated` is `null` before invoking the `init()` function that creates the actual object that we want to expose.

Usually, singletons also have some sort of static properties, properties related to the singleton but not necessarily dependent on actual resulting singleton object. It could be things like: name, version numbers or just general constants.

```javascript
const EvenBetterSingleton = (() => {

    function createInstance(params) {
        const privateProp = 'private';
    
        const privateMethod = () => {
            console.log('private method');
            console.log(this.processedParams);
        }

        this.props = 'a prop';
        this.processedParams = params;
        
        this.publicMethod = () => {
            // do something
            privateMethod();
        }
    }

    let instance;

    const _static = {
        staticProp: 'static',
        version: '1.0',
        getInstance: (props) => {
            if (!instance) {
                instance = new createInstance(props);
            }
            return instance;
        }
    }
    return _static;
})();

console.log(EvenBetterSingleton.version);
EvenBetterSingleton.getInstance({hi: 'yo'}).publicMethod();
console.log(EvenBetterSingleton.getInstance().props);
```
```
1.0
private method
{ hi: 'yo' }
a prop
```

The above code looks complex at first but if we know our JavaScript we'll realize that it's really quite simple. We just structured our code, leveraging closures to come up with our desired singleton.
`_static` is not really necesssary, we could just return it directly, it's a matter of preference.

`createInstance()` is our actual object, but we could also implement it like how we did `BetterSingleton`'s `init` function that returns the object we want. We would just adjust where we put our private variables in our closure scopes.