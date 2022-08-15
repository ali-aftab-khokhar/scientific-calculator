const constants = {
    'PI': 3.1415,
    'e' : 2.7182
}
const variable = {}
var variableExists = false
var varEntry = null
var elements = []
var operators = []
var mOperator = []
var mElments = []

function values(el){
    let x = document.getElementById("answer");
    var old = x.value;
    if (!parseInt(el.value) && parseInt(el.value) !== 0){
        x.value = old + " " + el.value + " ";
    }
    else{
        x.value = old + el.value
    }
}

function calculate(){
    var x = document.getElementById("answer");
    var array = x.value.split(" ")
    console.log(array)

    //Elements Array
    array.forEach(elem => {
        if (parseInt(elem) / 1 === parseInt(elem)){
            elements.push(parseInt(elem))
        }
        else if (elem === ''){
            console.log("Undefined Entry")
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

function solvingParanthesis(operators, elements){
    var opening = 0
    var closing = 0
    var i
    for (i = 0; i < operators.length; i += 1){
        if (operators[i] === '('){
            opening = i
        }
    }
    for (i = opening; i < operators.length; i += 1){
        if (operators[i] == ')'){
            closing = i
            miniArray(opening, closing)
        }
    }
    // miniArray(opening, closing)
}

function miniArray(opening, closing){
    mOperator = operators.splice(opening, closing - 1)
    console.log(mOperator)
    mOperator.shift()
    mOperator.pop()
    mElments = elements.splice(opening, closing - 2)
    console.log(mOperator, mElments)

    //Solving Single Valued Operator
    solvingSingleValuedOperator(mOperator, mElments)

    //By DMAS Law
    calculateByDMAS("^", mOperator, mElments)
    calculateByDMAS("/", mOperator, mElments)
    calculateByDMAS("*", mOperator, mElments)
    calculateByDMAS("+", mOperator, mElments)
    calculateByDMAS("-", mOperator, mElments)

    console.log(mElments)
    elements.splice(opening, 0, mElments.shift())
    console.log(elements)
    // elements.splice(opening, closing, mElments.shift())
    // console.log(elements)
    // console.log(elements)
    // console.log(operators)
}

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

function calculateByDMAS(oper, operators, elements){
    while(operators.includes(oper)){
        for (i = 0; i < operators.length; i++){
            if (operators[i] === oper){
                if (oper === '/'){
                    tempVal = elements[i] / elements[i+1]
                }
                else if (oper === '*'){
                    tempVal = elements[i] * elements[i+1]
                }
                else if (oper === '+'){
                    tempVal = elements[i] + elements[i+1]
                }
                else if (oper === '-'){
                    tempVal = elements[i] - elements[i+1]
                }
                else if (oper === '^'){
                    tempVal = elements[i] ** elements[i+1]
                }
                elements.splice(i, 2, tempVal)
                operators.splice(i, 1)
    
                console.log(elements)
                console.log(operators)
            }
        }
    }
}

function displayHistory(description){
    var oldDescription = document.getElementById("hist").innerHTML
    document.getElementById("hist").innerHTML = description + "<br/>" + oldDescription
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

function clearConsole(el){
    var x = document.getElementById("answer");
    x.value = ''
}