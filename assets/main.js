// main.js
let display = document.getElementById('display');

function clearDisplay() {
    display.textContent = '0';
}

function appendToDisplay(value) {
    if (display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function calculate() {
    try {
        let expression = display.textContent;
        
        // Reemplazar operadores lógicos con sus equivalentes en JavaScript
        expression = expression
            .replace(/¬/g, '!') // Negación
            .replace(/∧/g, '&&') // AND
            .replace(/v/g, '||') // OR
            .replace(/⊕/g, '^'); // XOR
            
        // Crear un contexto para evaluar las variables p, q, r, s
        let p = true;
        let q = true;
        let r = true;
        let s = true;
        
        // Evaluar la expresión
        let result = eval(expression);
        
        // Mostrar el resultado
        display.textContent = result ? 'Verdadero' : 'Falso';
    } catch (error) {
        display.textContent = 'Error';
        console.error('Error en el cálculo:', error);
    }
}

// Asegurarse de que el display esté disponible cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    display = document.getElementById('display');
    clearDisplay();
});