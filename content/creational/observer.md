## Observer

The observer pattern is one of those patterns that's fairly easy to understand. It is a design pattern which allows an object to observe another object for changes. It is also known as "Publish/Subscribe", one object publishes or broadcasts an occurence of an event while other object or objects subscribe or listens to said notification. It's also pretty standard for subscribers to have a way to "unregister" and stop listening for notifications.

> One or more observers are interested in the state of a subject and register their interest with the subject by attaching themselves. When something changes in our subject that the observer may be interested in, a notify message is sent which calls the update method in each observer. When the observer is no longer interested in the subject's state, they can simply detach themselves. - Elements of Reusable Object-Oriented Software (GOF)

Let's check out a very simple example:

```javascript
const Subject = () => {
  const listeners = {};

  const addListener = (prop, callback) => {
    if (!listeners[prop]) {
      listeners[prop] = [];
    }
    const timestamp = Date.now();
    listeners[prop].push({timestamp, callback});
    return timestamp;
  }

  const removeListener = (subscription) => {
    for(let prop in listeners) {
      const listener = listeners[prop];
      const index = listener.findIndex(l => l.timestamp === subscription);
      if (index >= 0) {
        listener.splice(index, 1);
        break;
      }
    }
  }

  const notifyAll = (prop, payload) => {
    if (!listeners[prop]) {
      return
    }
    listeners[prop].forEach(element => element.callback(payload));
  }

  return {
    subscribe(prop, callback) {
      return addListener(prop, callback);
    },
    publish(prop, payload) {
      notifyAll(prop, payload);
    },
    unsubscribe(subscription) {
      removeListener(subscription);
    }
  }
}

const subject = Subject();

const subscription = subject.subscribe('stuff', (payload) => {
  console.log('stuff happened! Metadata: ' + JSON.stringify(payload));
});

subject.subscribe('stuff', (payload) => {
  console.log('another listener for stuff! Metadata: ' + JSON.stringify(payload));
});

subject.subscribe('otherStuff', (payload) => {
  console.log('Other stuff happened');
});

subject.publish('stuff', {hi: 'hey'});
subject.unsubscribe(subscription);

subject.publish('stuff', 'yoyo');
subject.publish('otherStuff');
```
```
stuff happened! Metadata: {"hi":"hey"}
another listener for stuff! Metadata: {"hi":"hey"}
another listener for stuff! Metadata: "yoyo"
Other stuff happened
```

As we see in the code above, registering a listener is fairly straightforward but unregistering a listener is quite tricky. We need to have a way to identify our subscription, I decided to use timestamp to achieve this. Each listener gets its own timestamp so that when I want to unsubscribe I can use it for lookup.

Observer pattern can also be implemented around the context of watching property changes.
```javascript
const Person = function(firstname, lastname) {
  let firstName = firstname;
  let lastName = lastname;
  const listeners = [];

  function notifyListeners() {
    listeners.forEach(callback => callback());
  }

  this.getFullName = function() {
    return firstName + ' ' + lastName;
  }
  this.addPropertyChangeListener = function(callback) {
    listeners.push(callback);
  }
  this.setFirstName = function(firstname) {
    if (firstName !== firstname) {
      firstName = firstname;
      notifyListeners();
    }
  }
  // more code ...
}
```
Observer pattern sits at the core of MV** patterns. The reactivity nature of the major frameworks these days uses the same pattern. It's also prevalent with UI components. Don't even look further, the DOM heavily utilises observers via event listeners.
```javascript
document.getElementById("myBtn").addEventListener("click", function() {
  document.getElementById("demo").innerHTML = "Hello World!";
});
```
But Observer Pattern and Event-driven architecture are not technically synonymous, while you can think of an observer's notification as an event that occurred, pedantic scholars might frown and bash this blog post about how massively wrong I am. There are various semantic differences between the two, you can implement an event-driven architecture via observer or a variation of it. But I don't think I will dig further than that.

To be frank, I don't think design patterns should match rigid implementations, it's more of a concept. A description of the relationship of the elements of your code that will solve a certain problem.

### Advantages
Right of the bat, it's not really hard to realize what the advantages are. Observer pattern encourages loosely coupled and highly extensible code. It makes you think about a different way to think about the relationship of your code. I think this one of the best design pattern to start from if you're a beginner. This is when you graduate from long if-else statements, or from just extracting classes and objects. You start to think about design abstractions and how it could help you write more meaningful code.

## Disadvantages
Consequently, the issues with this pattern stems from its major benefit. Highly decoupled publishers from subscribers can be very difficult to reason about how the code works upon looking at the source code specially for people who are new with your codebase. When the subject publishes a notification you can't really straightforwardly tell what will happen on the system just by looking at the source code. As such, like any other pattern we have to be very aware on how we use this pattern. If your subscribers tend to be dependent on each other or if one subsriber action should happen after another in a certain order, this is not the pattern to use.

###### [<- Back](../creational.md)