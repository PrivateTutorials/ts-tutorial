function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
}

const resObj = merge({name: 'Igor'}, {age: 30});

console.log(resObj); // { name: 'Igor', age: 30 }

// BUT: resObj.age <== can't do it. No property age on type Object

// to fix it - use type casting:
const resObj2 = merge({name: 'Igor'}, {age: 30}) as { name: string, age: number };
console.log(resObj2.name); // Igor


function mergeAdvanced<T, U>(objA: T, objB: U) {  // returned type =>  T & U.
    // We are telling TS that 2 incoming Objects will be of different types
    // Moreover - the types will be set dynamically on Function call
    return Object.assign(objA, objB);
}
const resObj3 = mergeAdvanced({name: 'AAAA', hobbies: ['Read']}, {age: 30});
const resObj4 = mergeAdvanced({name: 'AAAA'}, {age: 30});
console.log(resObj3.name); // AAAA
console.log(resObj4.name); // AAAA
