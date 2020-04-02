function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() { // getter. extra logic when user tries to access this property, but not directly executing its initial descriptor.value (calling the f())
            const boundFunction = originalMethod.bind(this); // this - refers to everything that is responsible for triggering the method. It will be triggered by specific class Object instance
            return boundFunction;
        }
    };

    return adjustedDescriptor;
}

class Printer {
    message = 'Simple message';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
