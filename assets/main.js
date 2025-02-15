function clearDisplay() {
  document.getElementById("display").innerText = "0";
}
function appendToDisplay(value) {
  let display = document.getElementById("display");
  if (display.innerText === "0") {
      display.innerText = value;
  } else {
      display.innerText += value;
  }
}
function calculate() {
  try {
      let expr = document.getElementById("display").innerText;
      let values = { p: 1, q: 0, r: 1, s: 0 }; // Valores de ejemplo, puedes hacerlos dinámicos
      expr = expr.replace(/¬/g, '!')
                .replace(/∧/g, '&&')
                .replace(/∨/g, '||')
                .replace(/⊕/g, '^')
                .replace(/[pqrs]/g, match => values[match]);
      let result = eval(expr);
      document.getElementById("display").innerText = result ? 1 : 0;
  } catch {
      document.getElementById("display").innerText = "Error";
  }
}