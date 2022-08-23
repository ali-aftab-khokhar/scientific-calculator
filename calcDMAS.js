function calculateByDMAS(oper, operators, elements) {
    while (operators.includes(oper)) {
        for (i = 0; i < operators.length; i++) {
            if (operators[i] === oper) {
                switch (oper) {
                    case '/':
                        tempVal = elements[i] / elements[i + 1]
                        break

                    case '*':
                        tempVal = elements[i] * elements[i + 1]
                        break

                    case '^':
                        tempVal = elements[i] * elements[i + 1]
                        break

                    default:
                        tempVal = null
                }

                elements.splice(i, 2, tempVal)
                operators.splice(i, 1)
            }
        }
    }
}

function calcAddAndSub(operators, elements) {
    for (i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            tempVal = elements[i] + elements[i + 1]
        }
        else if (operators[i] === '-') {
            tempVal = elements[i] - elements[i + 1]
        }
        elements.splice(i, 2, tempVal)
        operators.splice(i, 1)
    }
}