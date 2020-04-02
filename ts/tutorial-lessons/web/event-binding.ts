class Printer {
    message = 'Simple message';

    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage.bind(p)); // because initially we call f() by event itself, not by 'p'
