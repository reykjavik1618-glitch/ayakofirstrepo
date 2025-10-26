let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.getElementById('result');

function updateDisplay() {
    // 10桁制限
    if (currentInput.length > 10) {
        currentInput = currentInput.substring(0, 10);
    }
    
    // 数値が大きすぎる場合は指数表記
    const num = parseFloat(currentInput);
    if (num > 9999999999) {
        display.textContent = num.toExponential(2);
    } else {
        display.textContent = currentInput;
    }
}

function inputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return; // 小数点は1つだけ
    } else {
        currentInput += num;
    }
    
    updateDisplay();
    addButtonEffect(event.target);
}

function inputOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    addButtonEffect(event.target);
}

function calculate() {
    if (!operator || shouldResetDisplay) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.textContent = 'エラー';
                reset();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // 結果を10桁以内に制限
    if (result.toString().length > 10) {
        result = parseFloat(result.toPrecision(10));
    }
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
    addButtonEffect(event.target);
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
    addButtonEffect(event.target);
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
    addButtonEffect(event.target);
}

function reset() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}

function addButtonEffect(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

// キーボードサポート
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        inputNumber(key);
    } else if (key === '+' || key === '-') {
        inputOperator(key);
    } else if (key === '*') {
        inputOperator('*');
    } else if (key === '/') {
        e.preventDefault();
        inputOperator('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

// 初期表示
updateDisplay();
