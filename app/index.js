import { Observable, timer } from 'rx';

console.log(timer);

const button = document.getElementById('enter-text');
const input = document.getElementById('typed-text');
const outputTarget = document.getElementById('output');

const buttonClicked = Observable.fromEvent(button, 'click');

function typeValue(value) {
    if (value !== undefined) {
        const writeValue = Observable
            .from(value.split(''))
            .delay(1000);
            

        outputTarget.innerText = '';
        writeValue.subscribe(
            (letter) => {
                console.log(letter);
                outputTarget.innerText += letter;
            }
        )
    }
}

buttonClicked.subscribe(
    (event) => {
        event.preventDefault();
        typeValue(input.value);
    },
    (err) => console.error(`An error occurred: ${err}`)
);