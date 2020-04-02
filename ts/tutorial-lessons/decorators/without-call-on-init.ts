// Now the whole decorator will work only when we create an object, but not just declare a class
// the below constructor f() will replace an original one

function WithTemplate2(template: string, hookId: string) {

    return function <T extends {new(...args: any[]): {name:string}}> (orginalConstructor: T) {  // : {name:string} <= means we'll produce any object, but definitely with property 'name'
        return class extends orginalConstructor { // based on original constructor f(). Now it will be called only when we create object, but not just declare a class
            constructor(...args: any[]) {
                super();  // because we extend another class. calling super() - saves the original class
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template; // will convert Text to html element (removing tags from view)
                                                      // innerText will put <h1> tags to render
                    let nameP = document.createElement('p');
                    hookElement.appendChild(nameP);

                    hookElement.querySelector('p')!.textContent = this.name; // The textContent property of the Node interface represents the text content of the node
                }
            }
        }
    }
}

@WithTemplate2('<h1>Header from decorator</h1>', 'message-output')
class Person14 {
    name = 'Igor';

    constructor() {
        console.log('Creating a person object');
    }
}

const pers12 = new Person14();
