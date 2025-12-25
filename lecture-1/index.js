// Task 1
console.log('Task 1');

console.log('for:');
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

console.log('while:');
let firstIterator = 1;

while (firstIterator <= 10) {
  firstIterator++;
  console.log(firstIterator);
}

// Task 2
console.log(`Task 2`);

const firstArray = [true, 10, 'string', 0, false, 'value', 50, 30, true, 'test'];

console.log('forEach:');
firstArray.forEach((value, index) => console.log(firstArray[index], typeof value));

console.log('for:');
for (let i = 0; i < firstArray.length; i++) {
  console.log(firstArray[i], typeof firstArray[i]);
}

console.log('while:');
let secondIterator = 0;

while (secondIterator < firstArray.length) {
  console.log(firstArray[secondIterator], typeof firstArray[secondIterator]);
  secondIterator++;
}

console.log('do while:');
let thirdIterator = 0;

do {
  console.log(firstArray[thirdIterator], typeof firstArray[thirdIterator]);
  thirdIterator++;
} while (thirdIterator < firstArray.length);

// Task 3
console.log('Task 3');

const petOwners = [
  {
    name: 'John',
    age: 40,
    pets: ['cat'],
  },
  {
    name: 'David',
    age: 36,
    pets: ['cat', 'dog'],
  },
  {
    name: 'Jake',
    age: 29,
    pets: ['dog'],
  },
  {
    name: 'Samuel',
    age: 15,
    pets: ['cat'],
  },
  {
    name: 'Steve',
    age: 19,
    pets: ['dog'],
  },
];

const filteredPetOwners = petOwners.filter((petOwner) => petOwner.age > 20);
console.log(filteredPetOwners);

// Task 4
console.log('Task 4');

petOwners.map((petOwner) => petOwner.pets.push('otter'));
console.log(petOwners);

// Task 5
console.log('Task 5');

const secondArray = Array(10).fill(42);
const word = 'answer';

secondArray.splice(4, 1, word);
const wordValue = secondArray.find((value) => value === word);

console.log(wordValue);

// Task 6
console.log('Task 6');

const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 40,
  email: 'john.doe@email.com',
  number: '+123456890',
};

console.log("keys method returns object's keys as an array of strings:");

const personKeys = Object.keys(person);
console.log(personKeys);

console.log("value method returns objects's values as an array of values:");

const personValues = Object.values(person);
console.log(personValues);

console.log("Using methods mentioned above you can iterate through objects's keys and values:");
for (let i = 0; i < personKeys.length; i++) {
  console.log(`${personKeys[i]}:`, personValues[i]);
}

console.log('hasOwn method checks if the object has the paramater.');
console.log(
  "Let's consider toString method. The person object doesn't have this method but its parent does, so the object inherits the method.",
);
console.log(
  "In this case we will get false, because the object doesn't have this method inside its own structure:",
);
console.log(Object.hasOwn(person, 'toString'));

console.log(
  `Now we will get true, because we passing the object's parent object using __proto__ key:`,
);
console.log(Object.hasOwn(person.__proto__, 'toString'));

console.log(
  'But when we try to check for the key that is inside the object structure we will get true:',
);
console.log(Object.hasOwn(person, 'firstName'));
