abstract class Universe {
}

abstract class Living extends Universe {
    abstract planet: string; // abstract variable
    abstract isLive(): boolean; // abstract f() can't have implementation. Forces developer to override f() in child class
    isOnEarth() {
        return true;
    }
}

class Animal extends Living {
    static counter = 0;

    public planet = 'Earth';
    //  public planet2: Function = () => 'Earth'; <= function as class property

    private readonly name: string;
    private _hobby: string = '';

    constructor(name: string) {
        super();
        this.name = name;
        Animal.counter++;
    }

    isLive(): boolean { // necessary implementation of abstract function
        return true;
    }

    get hobby() {
        if (this._hobby) {
            return this._hobby;
        }
        throw new Error('No hobby found');
    }

    set hobby(hobby: string) {
        if (!hobby) {
            throw new Error('No value was provided');
        }
        this._hobby = hobby;
    }

    logName() {
        console.log(this.name);
    }
}

const dana = new Animal('Dana');
dana.logName();

const danaCopy = {logName: dana.logName}; // object that has only getName() f()
danaCopy.logName(); // will get undefined, because 'this' in getName is now undefined.
                    // It is object, that is not based on Dog class, but just dummy created one
                    // danaCopy object doesn't have 'name' property
                    // workaround - to put use f() in Dog class: getName(this: Dog) - this refers to an object of type Dog
                    // OR - to add name property to cloned O: const danaCopy = {name: 'a', getName: dana.getName};


class Dog extends Animal {
    constructor(name: string, public type: string) { // if modifier indicated -> creates class property with the same name
        super(name)
    }

    logName() {
        super.logName();
    }

    getType() {
        console.log(this.type);
    }
}


const tima = new Dog('Tima', 'Red cat');
tima.logName();
tima.getType();
tima.hobby = 'Eat';  // calls the setter and passes string value
const timaHobby = tima.hobby; //calls the getter
console.log(timaHobby);
console.log(Animal.counter); // 2
console.log(tima.isOnEarth()); // true


class OptionalClassParameter {
    name?: string;

    constructor(name?: string) {
        if (name) {
            this.name = name;
        }
    }
}

const oleg = new OptionalClassParameter();
console.log(oleg.name); // undefined

