const incObj1 = {
    name: 'Igor',
    age: 30
};

function extractAndConvert <T extends object, U extends keyof T> (obj: T, key: U) { // 2-nd parameter - is any key, that T object has
    return obj[key];
}

const name22 = extractAndConvert(incObj1, 'name'); // Igor
const name23 = extractAndConvert({name: 'Igor', age: 22, sex: 'male'}, 'name'); // Igor
// extractAndConvert({name: 'Igor', age: 22}, 'aaaa'); <= can't do
