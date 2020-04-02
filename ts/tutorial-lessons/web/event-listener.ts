const button = document.querySelector('button')!; // ! <= makes TS think that button will be html button, and document really exists. strictNullChecks

button.addEventListener('click', ()=> {
    console.log('button clicked because we are listening to CLICK event');
});


function clickHandler(message: string) {
    console.log('Clicked: ' + message);
}

button.addEventListener('click', clickHandler.bind(null, 'test message')); // null - for omitting 'this' keyword


// the same as: functionName: Function(input: string) returns void
const arrowFunctionWithoutBrackets: (input: string) => void = message => console.log(message);

// pass event in click f()
button.addEventListener('click', (event) => { // Click result: MouseEvent {isTrusted: true, screenX: 156, screenY: 144, clientX: 156, clientY: 10, …}
    console.log(event)
});
