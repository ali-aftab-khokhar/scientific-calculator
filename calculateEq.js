function calculate(){
    var x = document.getElementById("answer");
    var array = x.value.split(" ")
    array = array.filter(n => n)

    //Elements Array
    array.forEach(elem => {
        if (parseInt(elem) / 1 === parseInt(elem)){
            elements.push(parseInt(elem))
        }
        else if (Object.keys(constants).includes(elem)){
                elements.push(parseFloat(constants[elem]))
        }
        else if (Object.keys(variable).includes(elem)){
                elements.push(parseFloat(variable[elem]))
        }
        else if (elem.includes("=")){
            variableExists = true
            varEntry = elem
            varEntry = varEntry.replace(/.$/, '')
            variable.elem = 0
        }
        else{
            operators.push(elem)
        }
    });

    while (operators.includes("(")){
        //Solving Paranthesis
        solvingParanthesis(operators, elements)
    }

    //Solving Single Valued Operator
    solvingSingleValuedOperator(operators, elements)

    //By DMAS Law
    calculateByDMAS("^", operators, elements)
    calculateByDMAS("/", operators, elements)
    calculateByDMAS("*", operators, elements)
    calculateByDMAS("+", operators, elements)
    calculateByDMAS("-", operators, elements)

    //Displaying On Console
    var tempHist = x.value
    var calculatedAnswer = elements.shift()
    if (calculatedAnswer % 1 !== 0){
        x.value = calculatedAnswer.toFixed(4)
    }
    else{
        x.value = calculatedAnswer
    }
    elements = []
    variable[varEntry] = calculatedAnswer
    displayHistory(tempHist + " = " + calculatedAnswer.toFixed(4))

}