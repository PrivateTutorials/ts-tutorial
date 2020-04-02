function WithTemplate(template: string, hookId: string) {
    console.log('this will run before the below constructor function');
    // return function (_: Function) { // _ - means: I know I het this argument but I don't need it
    return function (constructor: any) {
        const className = constructor.name;

        const hookElement = document.getElementById(hookId);
        const pers = new constructor();
        if (hookElement) {
            hookElement.innerHTML = template; // will convert Text to html element (removing tags from view)
                                              // innerText will put <h1> tags to render
            let nameP = document.createElement('p');
            hookElement.appendChild(nameP);

            hookElement.querySelector('p')!.textContent = pers.name; // The textContent property of the Node interface represents the text content of the node
        }
    }
}

@WithTemplate('<h1>Header from decorator</h1>', 'message-output')
class Person13 {
    name = 'Igor';

    constructor() {
        console.log('Creating a person object');
    }
}

const pers1 = new Person13();
