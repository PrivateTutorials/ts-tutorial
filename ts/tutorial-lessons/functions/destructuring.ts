const fruits = ['apple', 'banana', 'orange'];

const [firstValueInArrayAsVariable, ...remaining] = fruits;

console.log(firstValueInArrayAsVariable); // apple
console.log(remaining); // [ 'banana', 'orange' ] <= as array


const person4 = {
    name1: 'Igor',
    age: 30
};

const {name1, age: newAlias} = person4; // 2 separate variables
console.log(newAlias); // 30
