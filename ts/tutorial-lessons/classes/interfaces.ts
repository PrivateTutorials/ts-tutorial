// Int vs Abstract classes:
// 1. In I you have implementation, in abstract class => overriding due inheritance

interface Carrr {
    readonly brand: string; // brand:string = 'BWM <= cant do initialization in I
    year?: number | string;
    goTo: (city: string) => void;  // considered as property (type Function??)
    goFrom(city: string): void; // as method; optional === goFrom?(city: string): void
}

interface Carrr2 {
    readonly brand: string
    plant: string
}

interface Carrr3 extends Carrr, Carrr2 { // I can extend multiple I because at the end they are just merged together
    mileage: number
}

let bmw: Carrr;
bmw = {
    brand: 'bmw',
    year: 2018,
    goTo(city: string) {
        console.log(city);
    },
    goFrom(city: string) {
        console.log(`On car ${this.brand} from ` + city);
    }
};

bmw.goTo('Amsterdam');
bmw.goFrom('Kyiv');


interface Greetable {
    name: string;
    hello():void;
}

class Person2 implements Greetable {
    name:string;
    age = 35;

    constructor(name: string) {
        this.name = name;
    }

    hello(): void {
        console.log('Hello ' + this.name);
    }
}

const bob: Person2 = new Person2('Bob');
bob.hello();
const tom: Greetable = new Person2('Tom'); // var 'tom' of type Greetable (interface), because class implements it, though class has more parameters
// means var may have any structure, but it definitely has to contain interface f() and parameters
tom.hello();



// Interface vs Function type:
// type addFn = (a: number, b:number) => number; <= OR the same below:
interface addFn {
    (a: number, b:number): number; // anonymous f()
}

let add3: addFn;
add3 = (n1: number, b2: number) => n1 + b2;

const ress = add3(2, 4);
console.log(ress); // 6

