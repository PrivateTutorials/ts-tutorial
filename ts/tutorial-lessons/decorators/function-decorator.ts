// If decorator is added to property, then it receives 2 arguments
// It executes when you define the class. You dont even need to create an object
// and it's not run when you call a f90. Ony once, when class is defined

function LogClassProperty(target: any, propertyName: string | Symbol) { // target for instance property will be the prototype Object - class itself
    console.log('Class property decorator running');
    console.log(target);
    console.log(propertyName);
}

function LogAccessor(target: any, accessorName: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator running');
    console.log(target);
    console.log(accessorName);
    console.log(descriptor);
}

function LogMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log('Method decorator running');
    console.log(target);
    console.log(methodName);
    console.log(descriptor);
}

function LogParameter(target: any, nameOfMethodWhereParameterIs: string, positionOfArgument: number) {
    console.log('Parameter decorator running');
    console.log(target);
    console.log(nameOfMethodWhereParameterIs);
    console.log(positionOfArgument);
}

class Product {
    @LogClassProperty
    _price: number;

    constructor(private title: string, price: number) {
        this._price = price;
    }

    @LogAccessor
    set price (price: number){
        if(price > 0){
            this._price = price;
        } else {
            throw new Error('Invalid price - it should be positive');
        }
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax: number) {
        return this._price * (1 + tax);
    }
}

// Output for @LogClassProperty
// Property decorator running
// Product {}
// '_price'

// Output for @LogAccessor
// Accessor decorator
// Product {}
// price
// { get: undefined,
//   set: [Function: set price],
//   enumerable: false,
//   configurable: true }

// Output for @LogParameter
// Parameter decorator
// Product {}
// getPriceWithTax
// 0

// Output for @LogMethod
// Method decorator
// Product {}
// getPriceWithTax
// { value: [Function: getPriceWithTax],
//   writable: true,
//   enumerable: false,
//   configurable: true }
