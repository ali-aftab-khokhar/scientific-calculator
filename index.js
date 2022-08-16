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
    array = array.filter(n => n)
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

    console.log(operators, elements)

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
    var elemOpenCount = 0
    var closing = 0
    var i
    for (i = 0; i < operators.length; i += 1){
        if (operators[i] === '('){
            opening = i
        }
        else if (elemOpenCount < opening && operators[i] !== '(' && operators !== ")"){
            elemOpenCount += 1
        }
    }
    for (i = opening; i < operators.length; i += 1){
        if (operators[i] == ')'){
            closing = i
            miniArray(opening, closing, elemOpenCount - 1)
        }
    }
}

function miniArray(opening, closing, elemOpenCount){
    console.log(opening - 1, closing)
    mOperator = operators.splice(opening, closing - 1)
    console.log(mOperator)
    if (mOperator[0] === '('){
        mOperator.shift()
    }
    if (mOperator[mOperator.length - 1] === ')' || mOperator[mOperator.length - 1] === ''){
        mOperator.pop()
    }
    console.log(elements, 'elements')
    mElments = elements.splice(elemOpenCount, closing - opening)
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
    elements.splice(opening - 1, 0, mElments.shift())
    console.log(elements)
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
    var ul = document.getElementById("list")
    var li = document.createElement("li")
    li.id = description
    li.addEventListener("click", EditData, false)
    li.appendChild(document.createTextNode(description))
    ul.appendChild(li)
}

function EditData(){
    let foo = prompt("Type 1 for edit, 2 for delete")
    if (foo === "1"){
        let x = document.getElementById("answer");
        x.value = this.id
    }
    if (foo === "2"){
        this.remove()
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

function clearConsole(el){
    var x = document.getElementById("answer");
    x.value = ''
}

// Git Added