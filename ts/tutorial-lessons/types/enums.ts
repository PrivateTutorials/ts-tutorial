enum Role {
    ADMIN, USER = 4, CLIENT = 'STRING VALUE'
}

enum Car {
    BMW = 5, TOYOTA // incrementation starts from 5 and goes on
}

const person33 = {
    name: 'Igor',
    role: Role.ADMIN
};

console.log(person33); // { name: 'Igor', role: 0 }

