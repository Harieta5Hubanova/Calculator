// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        displayError("Cannot divide by zero!");
        return undefined;
    }
    return a / b;
}

// Display error function


function displayError(message) {
    displayValue = message;
    updateDisplay();
    console.error(message);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            displayError("Invalid operator");
            return undefined;
    }
}

let displayValue = '';
let firstNumber = '';
let operator = '';

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function appendOperator(op) {
    if (firstNumber === '') {
        firstNumber = parseFloat(displayValue);
        displayValue = '';
        operator = op;
    } else {
        calculate();
        operator = op;
    }
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '';
    firstNumber = '';
    operator = '';
    result = '';
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

function calculate() {
    if (operator && firstNumber !== '' && displayValue !== '') {
        let secondNumber = parseFloat(displayValue);
        let currentResult = operate(operator, firstNumber, secondNumber);
        if (currentResult !== undefined) {
            displayValue = currentResult.toString();
            firstNumber = currentResult;
            operator = '';
            result=currentResult
            updateDisplay();
        }
    }
}



function handleEquals() {
    firstNumber=result !=="" ? result : firstNumber
    calculate();
}


function handleButtonClick(value) {
    if (value === '=') {
        handleEquals();
    } else if (value === 'C') {
        clearDisplay();
    } else if (value === '←') {
        backspace();
    } else if (value === '.') {
        appendDecimal();
    } else {
        if (operator && firstNumber !== '') {
            calculate();
        }
        appendNumber(value);
    }
}


document.querySelectorAll('#calculator button').forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
    });
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleButtonClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter') {
        handleEquals();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});