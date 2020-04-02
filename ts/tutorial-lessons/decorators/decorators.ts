// Decorator - is just a function, that you apply to a class
// Decorator executes before constructor
// If 2 decorators -> the closer to class, the first will be executed (the function )

// decorators are run even if you don't create an object. Class definition - it's enough

function Logger(constructor: Function) {
    console.log('Simple Logger');
    console.log(constructor);
    console.log(constructor.name);
}

function ExecutableLogger(logString: string) {
    return function (constructor: Function) {
        console.log('Executable logger: ' + logString);
        console.log(constructor);
        console.log(constructor.name);
    }
}

@ExecutableLogger('PERSON TO LOG')
@Logger
class Person {
    name = 'Igor';

    constructor() {
        console.log('Creating a person object');
    }
}

const pers = new Person();
// Simple Logger
// [Function: Person]
// Person
// Executable logger: PERSON TO LOG
// [Function: Person]
// Person
// Creating a person object
