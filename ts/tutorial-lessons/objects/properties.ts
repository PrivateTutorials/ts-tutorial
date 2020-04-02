const incObj = {
    name: 'Igor',
    age: 30
};

// iterate through properties
for ( let prop in incObj ) {
    console.log( "Property: " + prop );
}
// Property: name
// Property: age


// check property exists
console.log(incObj.hasOwnProperty('name')); // true
