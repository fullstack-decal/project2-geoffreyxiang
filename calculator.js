// chained operations should work (but ignore PEMDAS)
let total = 0;
let display = '0';
let operator = null;

function calculate() { // NO PARAMETERS - This should only ever be called when '=' is typed or another operator is used while a current one exists
    intDisplay = parseInt(display)
    if (operator === '+') {
        total += intDisplay;
    }
    else if (operator === '-') {
        total -= intDisplay;
    }
    else if (operator === 'x') {
        total *= intDisplay;
    }
    else if (operator === '÷') {
        total /= intDisplay;
    }
}

function typeNumber(input) { // Takes in a one digit input that is a string--> should be tied to .result-screen
    if (display == '0') {
        display = input.toString();
    }
    else {
        display = display + input;
    }
}

function typeSymbol(symbol) {
    if (symbol === 'C') {
        display = '0';
        operator = null;
        total = 0;
    }
    else if (symbol === '←') {
        if (display === '0') {
            return
        }
        else if (display.length == 1) {
            display = '0';
        }
        else {
            display = display.substring(0, display.length - 1);
        }
    }
    else if (symbol === '=') {
        calculate();
        display = total.toString();
        total = 0; 
    }
    else { //symbol is an operator (keep in mind the input will guaranteed not be a number)
    if (total === 0) {
        total = parseInt(display)
    } else {
        calculate();
    }
    operator = symbol;
    display = '0';
    }
}

// interaction
function setListeners() {
    let buttons = document.querySelectorAll('.buttons')
    for (item of buttons) {
        item.addEventListener('click', function() {
            buttonClicked(event.target.innerText);
        })
    }
}
setListeners()

function buttonClicked(valueClicked) {
    if (isNaN(parseInt(valueClicked))) {
        typeSymbol(valueClicked);
    } 
    else {
        typeNumber(valueClicked);
    }
    document.querySelector('.result-screen').innerText = display;
}