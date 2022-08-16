function solvingSingleValuedOperator(operators, elements){
    var i
    for (i = 0; i < operators.length; i++){
        if (operators[i] === 'sqrt' || operators[i] === 'sin' || operators[i] === 'cos' || operators[i] === 'tan'){
            var tempVal = 0;
            tempVal = specialSwitchCase(operators[i], elements[i])
            elements[i] = tempVal
            operators.splice(i, 1)
        }
    }
}

function specialSwitchCase(oper, num){
    console.log(oper, num)
    switch (oper){
        case 'sqrt':
            return parseFloat(Math.sqrt(num).toFixed(4))

        case 'sin':
            return parseFloat(Math.sin(num).toFixed(4))
        
        case 'cos':
            return parseFloat(Math.cos(num).toFixed(4))

        case 'tan':
            return parseFloat(Math.tan(num).toFixed(4))

        default:
            return num
    }
}