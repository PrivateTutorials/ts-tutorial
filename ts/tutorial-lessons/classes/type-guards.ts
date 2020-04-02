type Combinable1 = string | number; // | <- union type
type Numeric = boolean | number;

type Universal = Combinable1 & Numeric; // type will be numeric, as only 1 common of them both

function add4(a: Combinable1, b: Combinable1) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}


class Car2 {
    drive() {
        console.log('Drive car');
    }
}

class Truck {
    drive() {
        console.log('Drive truck');
    }

    loadCargo(amount: number) {
        console.log('Loaded ' + amount);
    }
}

type Vehicle = Car2 | Truck;

const v1 = new Car2();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) { // instead of checking property 'loadCargo' in vehicle. instanceof NOT applicable for Interfaces because vanilla JS not supports Interfaces, only classes
        vehicle.loadCargo(200);
    }
}

useVehicle(v1);
useVehicle(v2);
