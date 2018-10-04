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