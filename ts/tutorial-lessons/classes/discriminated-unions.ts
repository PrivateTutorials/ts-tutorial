interface Bird {
    type: 'bird';
    flySpeed: number;
}

interface Horse {
    type: 'horse'
    runSpeed: number;
}

type Animall = Bird | Horse;

function moveAnimal(animal: Animall) {
    let speed: number;
    switch (animal.type) { // we definitely know that this property exists
        case "bird":
            speed = animal.flySpeed;
            break;
        case "horse":
            speed = animal.runSpeed;
    }
    console.log('Moving with speed ' + speed);
}

moveAnimal({type: 'bird', flySpeed: 12});
