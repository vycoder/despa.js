## Modules

Modules are an integral part of independent and cohesive application structure and makes things organized and prevent namespace collisions.

In most cases, languages comes with the capability to declare modules. Some might even argue that it's not a pattern anymore but an integral language feature. But that's not the case with JavaScript.

An object literal is the simplest module that we could conjure up in JavaScript.
```javascript
const objectLiteral = {
  variable: 'a value',
  aFunction: function() {
    // some function
  }
}
```

By using closures, we could again hide or expose some properties.

```javascript
const counterModule = (() => {
  // private members
  const counter = 0;
  return {
    // public members
    increment: () => {
      counter++;
    },
    reset: () => {
      counter = 0;
    }
  };
})();
counterModule.increment();
counterModule.reset();
```
### Advantages
It introduces a form of encapsulation. It gives us the ability to declare private data which is not exposed outside our api.

### Disadvantages
As you can see, JavaScript does not have some sort of access modifiers like the other language. We decide private or public memebers depending on where will write them, inside the enclosing function or the return of object of the function. Which means, if we want to change a member's visibility, we'll have to rewrite to its appropriate place.

## The Revealing Module Pattern
We could define all function as private members and just expose the ones we like as public by constructing our return object.

```javascript
const revealModule = (() => {
  let name = 'John Smith';
  let age = 20;

  function getName() {
    return name;
  }

  function getAge() {
    return age;
  }

  function setName(newName) {
    name = newName;
  }

  return {
    set: setName,
    get: getName
  }

})();
revealModule.get();
revealModuel.set('New name');
revealModule.get();
```

### Advantages
Aside from the consistency of the syntax, our previous problem with future changes on a member's privacy would only take removing or adding them on the return value to solve.

### Disadvantages
The problem with this and the above code is that, since closures is only accessible within the function where you write it, it won't be possible to access them when it comes to overriding its original functionality.

Given the above code, the code below will throw an error.
```javascript
revealModule.get = function() {
  return 'Mr. ' + name;
}
```

We can however extend it:
```javascript
revealModule.getFormalName = function() {
  return 'Mr. ' + this.get();
}
```

Modules are really like makeshift classes where we could have some semblance of encapsulation. By using the Revealing Module Pattern and thinking about how to compose your functions, while we can't override members, we can extend them.

In modern JavaScript, it's no longer necessary to implement modules like this manually, `require` or `import` are now available.