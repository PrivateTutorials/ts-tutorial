function generateError(message: string, code: number): never {
    throw {
        message: message,
        code: code
    } // you can throw any Object ar any value as an error
    // throw  new Error('message');
}

const result = generateError('teasdasd', 200);
console.log(result); // logs nothing. Not even 'undefined', as an usual empty f() would do
