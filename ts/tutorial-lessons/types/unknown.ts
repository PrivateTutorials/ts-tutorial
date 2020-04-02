let userInput: any;
let userName: string;

userInput = false;
userName = userInput; // because of any

userInput = 5;
userInput = 'asdsad';

// BUT
let userInput2: unknown;
let userName2: string;

// userName2 = userInput2; <= can't be done
// string can be assigned to ANY, but not to UNKNOWN
// Unknown requires type checks

userInput2 = 'asdasd';

if(typeof userInput2 === 'string') {
    userName2 = userInput2;
}
