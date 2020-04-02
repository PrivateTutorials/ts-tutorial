const names: Array<string> = []; // the same as:    string[]

const getReturnedValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This string will be return as value');
    }, 1000)
});


getReturnedValue.then(res => console.log(res));
