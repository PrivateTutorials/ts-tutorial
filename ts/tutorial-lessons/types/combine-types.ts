type Admin = {
    name: string;
    privileges: string[]
}

type Employee = {
    name: string;
    startDate: Date;
}

type CombinedEmployee = Admin & Employee; // intersection types. Can be done for interfaces also
                                          // the same as: interface ElevatedEmployee extends Admin, Employee

const combinedEmp: CombinedEmployee = {
    name: 'Max',
    privileges: ['read'],
    startDate: new Date()
};

console.log(typeof combinedEmp); // object

type UnknownEmployee = Admin | Employee;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log(emp.name);
    if ('privileges' in emp) { // if(emp.privileges) <= can't do it
                               // checks if it exists as property in 'emp' object
        console.log(emp.privileges);
    }
}

printEmployeeInfo(combinedEmp);
printEmployeeInfo({name: 'Igor', startDate: new Date()});


const mixedTypesArr: (string | number | boolean)[] = [];
const arrOfSpecificType: string[] | number[] | boolean[] = [22]; // will be only an arr of type 'number'

mixedTypesArr.push('asdsad', 213, true);
arrOfSpecificType.push(213, 213, 123);
