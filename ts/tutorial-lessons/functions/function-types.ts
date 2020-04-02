function add33(one: number, two: number) {
    return one + two;
}

function print() {
    console.log('aaaa');
}

let functionVar: Function;
functionVar = add;
functionVar = print;

let moreVerbose: (a: number, b: number) => number;
moreVerbose = add; // moreVerbose = print <= can't do it because of more specific type of function

const res = functionVar(2, 3);
console.log(res); // 5
