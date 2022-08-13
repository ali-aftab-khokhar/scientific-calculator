const constants = {
    'PI': 3.1415,
    'e' : 2.7182
}
const variable = {}
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
        // else if (Object.keys(constants).includes(elem)){
        //     elements.push(parseFloat(constants[elem]))
        // }
        else{
            operators.push(elem)
        }
    });

    // console.log(elements)
    // console.log(operators)

    while (operators.includes("(")){
        //Solving Paranthesis
        console.log(elements)
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

    // console.log(elements, 'elements')
    // console.log(operators, 'operators')

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
    displayHistory(tempHist + " = " + calculatedAnswer.toFixed(4))

}

function solvingParanthesis(operators, elements){
    var opening = 0
    var closing = 0
    console.log(elements)
    console.log(operators)
    var i
    for (i = 0; i < operators.length; i += 1){
        if (operators[i] === '('){
            opening = i
        }
        if (operators[i] === ')'){
            closing = i
        }
    }
    miniArray(opening, closing)
}

function miniArray(opening, closing){
    mOperator = operators.splice(opening, closing - 1)
    mElments = elements.splice(opening, closing - 2)

    //Solving Single Valued Operator
    solvingSingleValuedOperator(mOperator, mElments)

    //By DMAS Law
    calculateByDMAS("^", mOperator, mElments,closing)
    calculateByDMAS("/", mOperator, mElments,closing)
    calculateByDMAS("*", mOperator, mElments,closing)
    calculateByDMAS("+", mOperator, mElments,closing)
    calculateByDMAS("-", mOperator, mElments,closing)

    elements.splice(opening - 1, 0, mElments.shift())
    console.log(elements)
    console.log(operators)
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

function calculateByDMAS(oper, operators, elements, closing = 2){
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
            elements.splice(i, closing, tempVal)
            operators.splice(i, 1)
        }
    }
}

function displayHistory(description){
    var oldDescription = document.getElementById("hist").innerHTML
    document.getElementById("hist").innerHTML = description + "<br/>" + oldDescription
}

function isNull(temp, array){
    if (!temp){
        temp = array.shift();
        return temp;
    }
    else {
        return temp;
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

function switchCases(calculatedAnswer, oper, num){
    switch (oper){
        case '+':
            return calculatedAnswer + num

        case '-':
            return calculatedAnswer - num

        case '*':
            return (calculatedAnswer * num)

        case '/':
            return (calculatedAnswer / num)

        case '^':
            return calculatedAnswer ** num

        default:
            return calculatedAnswer
    }
}

function clearConsole(el){
    var x = document.getElementById("answer");
    x.value = ''
}