// tuple - fixed length array with possible different types
let simpleArr = [1, 'two'];

simpleArr.push(21); // but not possible tupleArr.push(false);
simpleArr[1] = 33;

console.log(simpleArr); // [ 1, 33, 21 ]

let tupleArr: [number, string]; // tuple
tupleArr = [2, 'asd']; // tulipArr = [2, 'asd', 41] <= can't do it because of tulip length. BUT:
tupleArr.push(41); // push - an exception allowed in tulips
tupleArr[1] = 'qw'; // tulipArr[1] = 31; - you can't do it as in simple array => 2-nd value has to be only string


console.log(tupleArr); // [ 2, 'qw', 41 ]
