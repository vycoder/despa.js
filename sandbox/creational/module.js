const Person = (() => {
  let firstName = 'John';
  let lastName = 'Smith';

  function getFirstName() {
    return firstName;
  }

  function getLastName() {
    return lastName;
  }

  function getFullName() {
    return firstName + ' ' + lastName;
  }

  return {
    getFirstName: getFirstName,
    getFullName: getFullName
  }

})();

console.log(Person.getFirstName());
console.log(Person.getFullName());

// console.log('overriding getFullName()');
// This thing will throw an error. `firstName` and `lastName` are only accessible within its closure.
// Person.getFullName = function() {
//   return 'Mr. ' + firstName + lastName;
// }

// console.log(Person.getFullName());

Person.getFormalFullName = function() {
  return 'Mr. ' + this.getFullName();
}

console.log(Person.getFormalFullName());