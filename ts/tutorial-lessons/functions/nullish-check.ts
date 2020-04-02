const userInput3 = null;
const userInput4 = '';
const storedData = userInput3 || 'Default'; // '' will be also treated as falsy
const storedData1 = userInput4 ?? 'Default'; // ?? <- only for 'null' and 'undefined'

console.log(storedData); // Default
console.log(storedData1); // ''
