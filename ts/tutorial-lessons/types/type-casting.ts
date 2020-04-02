const htmlParagraphElement = document.querySelector('p');
const htmlElement = document.getElementById('message-output');

const userInputElement = <HTMLInputElement>document.getElementById('user-input')!; // OR the same below. "!" <= says the expression will not yield 'null'
const userInputElement2 = <HTMLInputElement>document.getElementById('user-input') as HTMLInputElement;

userInputElement.value = 'Test value';

if(userInputElement) {
    (userInputElement as HTMLInputElement).value = 'Test value 2';
}
