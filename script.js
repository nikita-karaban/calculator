  class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = null;
    this.previousOperandTextElement.innerText = '';
    cal_done = false;
  }

  delete() {
  if(this.currentOperand.toString()[0] ==='-' && this.currentOperand.toString().length === 2){
    this.currentOperand = this.currentOperand.toString().slice(0,-2);
  } else this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  appendNumber(number) {
    if(cal_done) {
      if(!this.operation){
        this.clear();
      }
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {

    if (operation === '-' && this.currentOperand === '') {
      this.currentOperand = `-`;
      this.currentOperandTextElement.innerText = '-';
      this.appendNumber();
    }
    if (operation === '-' && this.currentOperandTextElement.innerText === '-') {
        this.currentOperand = ``;
        this.operation = '-';
        this.appendNumber();
    }
    if(!this.currentOperandTextElement.innerText) return; 
  
    this.compute();
    this.previousOperandTextElement.innerText = `${this.currentOperand} ${this.operation}`;

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    
  }



  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case '+':
        computation = prev + current;
        
        break;

      case '-':
        computation = prev - current;
        
        break;

      case '*':
        computation = prev * current;
        
        break;

      case '÷':
        computation = prev / current;
       
        break;

      case '^':
        computation = Math.pow(prev,current);
        
        
        break;

      case '√':
        
        computation = isNaN(Math.sqrt(prev,current)) ? 'Error' : Math.sqrt(prev, 2);
        
        break;

      default:
        
        return;
    }
    
    function isNumber(num) {
      return typeof num === 'number' && !isNaN(num);
    }
    if (isNumber(computation)) {
      computation = computation.toFixed(6);
      computation = parseFloat(computation);
    }else {
      computation = computation;
    }

    cal_done = false;
    this.currentOperand = computation;
    this.operation = null;
    this.previousOperand = '';
  }

  updateDisplayEqual(){
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = ``;
    
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    ); 
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else if (this.currentOperand === 'Error') {
      this.currentOperandTextElement.innerText = this.currentOperand;
      cal_done = true;
    } else {
  
      this.previousOperandTextElement.innerText = '';
    }
  }
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
);
let cal_done = false;

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplayEqual();
    calculator.updateDisplay();
    
  });
});

equalsButton.addEventListener('click', button => {
  
  calculator.compute();
  calculator.updateDisplayEqual();
  calculator.updateDisplay();
  cal_done = true;
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});