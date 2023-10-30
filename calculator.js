// Variables to keep track of the input and calculations
let display = document.getElementById('display');
let input = '';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

// Function to update the display
function updateDisplay() {
    display.value = input;
}

// Add event listeners to the buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        // Get the button's value
        const buttonValue = button.textContent;

        // Handle digit buttons and decimal point
        if (!isNaN(buttonValue) || buttonValue === '.') {
            if (waitingForSecondValue) {
                input = buttonValue;
                waitingForSecondValue = false;
            } else {
                input += buttonValue;
            }
        }

        // Handle operator buttons
        if ('+-*/'.includes(buttonValue)) {
            if (operator && !waitingForSecondValue) {
                calculate();
            }
            firstValue = parseFloat(input);
            operator = buttonValue;
            waitingForSecondValue = true;
        }

        // Handle equals button
        if (buttonValue === '=') {
            if (operator) {
                calculate();
                operator = null;
            }
        }

        // Handle clear button
        if (buttonValue === 'C') {
            input = '';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        }

        // Update the display
        updateDisplay();
    });
});

// Function to perform the calculation
function calculate() {
    const secondValue = parseFloat(input);
    switch (operator) {
        case '+':
            input = (firstValue + secondValue).toString();
            break;
        case '-':
            input = (firstValue - secondValue).toString();
            break;
        case '*':
            input = (firstValue * secondValue).toString();
            break;
        case '/':
            if (secondValue !== 0) {
                input = (firstValue / secondValue).toString();
            } else {
                input = "Error";
            }
            break;
        default:
            return;
    }
    waitingForSecondValue = false;
}
