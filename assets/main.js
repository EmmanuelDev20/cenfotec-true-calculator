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
    let table = document.querySelector('.table-container');
    table.classList.remove('dnone');

    try {
        let expression = display.textContent;
        
        // Función para evaluar el condicional (→)
        function conditional(p, q) {
            return !p || q;
        }
        
        // Función para evaluar el bicondicional (↔)
        function biconditional(p, q) {
            return p === q;
        }
        
        // Reemplazar operadores lógicos con sus equivalentes en JavaScript
        expression = expression
            .replace(/¬/g, '!') // Negación
            .replace(/∧/g, '&&') // AND
            .replace(/v/g, '||') // OR
            .replace(/⊕/g, '^') // XOR
            .replace(/→/g, '?conditional:') // Condicional
            .replace(/↔/g, '?biconditional:'); // Bicondicional
            
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







// function clearDisplay() {
//   document.getElementById("display").innerText = "0";
// }
// function appendToDisplay(value) {
//   let display = document.getElementById("display");
//   if (display.innerText === "0") {
//       display.innerText = value;
//   } else {
//       display.innerText += value;
//   }
// }
// function calculate() {
//   try {
//       let expr = document.getElementById("display").innerText;
//       let values = { p: 1, q: 0, r: 1, s: 0 }; // Valores de ejemplo, puedes hacerlos dinámicos
//       expr = expr.replace(/¬/g, '!')
//                 .replace(/∧/g, '&&')
//                 .replace(/∨/g, '||')
//                 .replace(/⊕/g, '^')
//                 .replace(/[pqrs]/g, match => values[match]);
//       let result = eval(expr);
//       document.getElementById("display").innerText = result ? 1 : 0;
//   } catch {
//       document.getElementById("display").innerText = "Error";
//   }
// }