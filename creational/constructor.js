// Function Constructors
function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;

    this.hello = () => {
        return `Hi!, I'm ${this.firstname} ${this.lastname}`;
    }
}

const nikola = new Person('Nikola', 'Tesla');
const feynman = new Person('Richard', 'Feynman');

console.log(nikola.hello());
console.log(feynman.hello());
console.log(nikola.__proto__)

console.log('are both hello() the same:', nikola.hello === feynman.hello)


// Function constructors with Protoypes
function Name(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

Name.prototype.hello = function() {
    return `Hi!, I'm ${this.firstname} ${this.lastname}`;
}

const nye = new Name('Bill', 'Nye');
const tyson = new Name('Neil', 'Tyson');

console.log(nye.hello());
console.log(tyson.hello());

console.log('are both hello() the same:', nye.hello === tyson.hello)
console.log(nye.__proto__)