let bb: any[];
bb = ['asd', 2, true]; // different types

let aa1 = ['aaa', 'bbb'];
aa1.push('ccc');
// a.push(2) <= cant do because array is already treated as a string one

for (const item of aa1) {
    console.log(item);
}
