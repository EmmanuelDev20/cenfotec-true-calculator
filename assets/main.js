class TruthTableCalculator {
    constructor() {
        this.expression = '';
        this.screen = document.getElementById('screen');
        this.truthTableContainer = document.getElementById('truthTable');
        this.initializeButtons();
    }

    initializeButtons() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButton(button.textContent));
        });
    }

    handleButton(value) {
        switch(value) {
            case 'AC':
                this.clear();
                break;
            case 'DEL':
                this.delete();
                break;
            case '=':
                this.generateTruthTable();
                break;
            case 'Izquierda':
            case 'Derecha':
                // Funcionalidad para mover el cursor
                break;
            default:
                this.addToExpression(value);
        }
    }

    clear() {
        this.expression = '';
        this.updateDisplay();
        this.truthTableContainer.innerHTML = '';
    }

    delete() {
        this.expression = this.expression.slice(0, -1);
        this.updateDisplay();
    }

    addToExpression(value) {
        this.expression += value;
        this.updateDisplay();
    }

    updateDisplay() {
        this.screen.textContent = this.expression || 'Ejemplo: ~(p∧q)→s';
    }

    evaluateExpression(values) {
        const exp = this.expression.replace(/p|q|r|s/g, match => values[match]);
        
        // Función para evaluar la expresión
        const evaluate = (expr) => {
            expr = expr.trim();
            
            // Evaluar negación
            if (expr.startsWith('~')) {
                return !evaluate(expr.slice(1));
            }

            // Evaluar paréntesis
            while (expr.includes('(')) {
                expr = expr.replace(/\(([^()]+)\)/g, (_, group) => evaluate(group));
            }

            // Evaluar operadores
            if (expr.includes('∧')) {
                const [left, right] = expr.split('∧');
                return evaluate(left) && evaluate(right);
            }
            if (expr.includes('∨')) {
                const [left, right] = expr.split('∨');
                return evaluate(left) || evaluate(right);
            }
            if (expr.includes('→')) {
                const [left, right] = expr.split('→');
                return !evaluate(left) || evaluate(right);
            }
            if (expr.includes('↔')) {
                const [left, right] = expr.split('↔');
                return evaluate(left) === evaluate(right);
            }
            if (expr.includes('⊕')) {
                const [left, right] = expr.split('⊕');
                return evaluate(left) !== evaluate(right);
            }

            return expr === 'true';
        };

        try {
            return evaluate(exp);
        } catch (error) {
            return null;
        }
    }

    generateTruthTable() {
        if (!this.expression) return;

        // Encontrar variables únicas en la expresión
        const variables = [...new Set(this.expression.match(/[pqrs]/g) || [])].sort();
        if (variables.length === 0) return;

        // Generar todas las combinaciones posibles
        const rows = [];
        const combinations = 1 << variables.length;

        for (let i = 0; i < combinations; i++) {
            const values = {};
            variables.forEach((variable, index) => {
                values[variable] = Boolean(i & (1 << (variables.length - 1 - index)));
            });
            
            const result = this.evaluateExpression(values);
            if (result !== null) {
                rows.push({ values, result });
            }
        }

        this.renderTruthTable(variables, rows);
    }

    renderTruthTable(variables, rows) {
        let html = `
            <table>
                <thead>
                    <tr>
                        ${variables.map(v => `<th>${v}</th>`).join('')}
                        <th>${this.expression}</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach(row => {
            html += '<tr>';
            variables.forEach(variable => {
                const value = row.values[variable];
                html += `
                    <td class="${value ? 'true-value' : 'false-value'}">
                        ${value ? 'V' : 'F'}
                    </td>
                `;
            });
            html += `
                <td class="${row.result ? 'true-value' : 'false-value'}">
                    ${row.result ? 'V' : 'F'}
                </td>
            </tr>
            `;
        });

        html += '</tbody></table>';
        this.truthTableContainer.innerHTML = html;
    }
}

// Inicializar la calculadora cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    new TruthTableCalculator();
});
