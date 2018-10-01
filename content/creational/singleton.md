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
