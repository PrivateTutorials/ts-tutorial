const coolHobbies = ['ski', 'hike'];
const hobbies = ['book', 'travel'];

// coolHobbies.push(hobbies); <= can't push array in array of strings. It will be nested array

coolHobbies.push(hobbies[0], hobbies[1]); // can push multiple items

coolHobbies.push(...hobbies); // can push array with spread operator

console.log(coolHobbies);

const combineWhileCreating = ['read', ...hobbies];

console.log(combineWhileCreating);

const person1 = {
    name: 'Igor',
    age: 30
};

const clonedCopy = {...person1};


const addWithAnyAmountOfParameters = (...inputs: number[]) => { // input individual parameters are merged to an array while passing
    return inputs.reduce((currentResult, currentValue) => {
        return currentResult + currentValue;
    }, 0)
};

console.log(addWithAnyAmountOfParameters(1, 2, 3, 4));
