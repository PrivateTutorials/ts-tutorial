const person: {
    name: string,
    age: 30 // stands for only possible value (default)
} = {
    age: 30,
    name : 'Igor'
};

console.log(person.age); //if person is of type Object <===> "const person: object" => Property 'age' does not exist on type 'object'
