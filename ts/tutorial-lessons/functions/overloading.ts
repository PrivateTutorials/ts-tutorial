type Combinable2 = number | string;

function add2(a: string, b: string): string;
function add2(a: number, b: number): number;
function add2(a: Combinable2, b: Combinable2): Combinable2 {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const res10 = add2('aaa', 'vvvv');
res10.toUpperCase(); // toUpperCase f() is now applicable because TS knows return type from overload
console.log(typeof res10); // string
const res11 = add2(4, 4);
console.log(typeof res11); // number
