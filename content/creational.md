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
    const config = { value }
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

##### Table of Contents
* [Constructor Pattern](creational/constructor.md)
* [Singleton Pattern](creational/singleton.md)
* [Module Pattern](creational/module.md)
* [Observer Pattern](creational/observer.md)


###### [<- Back to index](../index.md)