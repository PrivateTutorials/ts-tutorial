function add(one: number, two: number) {
    return one + two;
}

const a = 2;
let b = 4;
b = 7;
// b = 'assad' <= can't do because b is a string, though we use let instead of const

console.log(add(a, b));

function combine(one: number | string, two: number | string) { // union types => OR type operator
    if (typeof one === 'number' && typeof two === 'number') {
        return one + two;
    }

    return one.toString() + two.toString();
}

console.log(combine(1, 4));  // 5
console.log(combine('1', '4')); // 14


function functionsNotAllowedToReturnUndefined(): void { // but can't be undefined, though:
    console.log('aaa');
}

let aa = undefined;

function returnUndefined(): undefined {
    return;
}
