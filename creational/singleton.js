// Simple but naive singleton

const Singleton = {
    prop1: 'yo',
    prop2: 'yeah',
    toString: () => {
        return this.prop1 + this.prop2;
    }
}

// While we can use it only once, we are exposing all the props publicly. We could use closures to control this and produce a coherent blackbox object that clients would work with.

const AnotherSingleton = function() {
    const privateProp = 'private';
    const privateMethod = () => {
        console.log(privateProp);
    }

    return {
        publicMethod: () => {
            // do something
            privateMethod();
        },
        publicProp: 'public'
    };
}

const anotherSingleton = AnotherSingleton();
anotherSingleton.publicMethod();

// We made use of function factory to create this. The above example is great, but we want a true singleton where we want it to get instantiated only once.

const TrueSingleton = (() => {
    let instantiated;
    const privateMethod = () => {
        console.log('This is a private method');
    }

    function init() {
        return {
            publicMethod() {
                // do something
                privateMethod();
            },
            publicProperty: 'public property'
        }
    }

    return {
        getInstance: function() {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    }
})();

TrueSingleton.getInstance().publicMethod();

// The above example is much better. `TrueSingleton` returns an object that has a `getInstance` method which manages the creation of the instance by deciding when to call the `init()` function. Note that the target instance that what you actually want to expose is `init()`'s return object. That's what we expose to the world, so that's what you need to take time to think about in the real world, the rest of the code is the actual pattern.

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