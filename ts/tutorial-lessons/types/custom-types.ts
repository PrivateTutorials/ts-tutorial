type Combinable = string | number;
type Specificable = 'aaaa' | 'bbb';

function consoleItem (input: Combinable) { // the same as: string | number;
    console.log(input);
}

function consoleSpecific (input: Specificable) { // the same as: string | number;
    console.log(input);
}

consoleItem(2);
consoleItem('asdas');
consoleSpecific('aaaa'); // 'dddd' <= can't do it
