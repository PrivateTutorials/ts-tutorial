function mergeWithContraints<T extends object, U extends string | number>(objA: T, objB: U) {  // parameters have to by of type Object and number | string
    return Object.assign(objA, objB);
}

const resObj5 = mergeWithContraints({name: 'AAAA', hobbies: ['Read']}, 30);
console.log(resObj5); // { name: 'AAAA', hobbies: [ 'Read' ] } <= no '30', because Object.assign merges only object types
