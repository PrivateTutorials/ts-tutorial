interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'No elements';
    if (element.length > 0) {
        description = `Got ${element.length} elements`;
    }
    return [element, description]

}


console.log(countAndDescribe('Hi there')); // [ 'Hi there', 'Got 8 elements' ]
console.log(countAndDescribe(['Read', 'Write'])); // [ [ 'Read', 'Write' ], 'Got 2 elements' ]
console.log(countAndDescribe([])); // [ [], 'No elements' ]
// countAndDescribe(10); <= can't do, because number doesn't have 'length' property
