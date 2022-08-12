const PI = 3.1415
const e = 2.7182
const variable = {}
const variableExist = false;

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
    var temp = array.shift()
    // variableVal = isVariable(temp, array)
    // if (temp !== variableVal){
    //     variableExist = true;
    //     variable.variableVal = 0
    // }
    temp = isNull(temp, array)
    temp = parseFloat(isSpecialCase(temp, array))
    var calculation = switchCases(0, "+", parseInt(temp))
    while (array.length != 0){
        var sign = array.shift();
        var num = array.shift();
        num = isNull(num, array)
        num = isSpecialCase(num, array)
        calculation = switchCases(calculation, sign, parseInt(num))
    }
    if (variableExist){
        variable.variableVal = calculation;
    }
    var old = x.value;
    description = old + " = " + calculation;
    x.value = description
    displayHistory(description)
}

// function isVariable(temp, array){
//     if (typeof(temp) === String && temp !== 'cos' && temp !== 'tan' && temp !== 'sin' && temp != 'PI' && temp !== 'E'){
//         return temp
//     }
// }

function isSpecialCase(num, array){
    if (num === 'sqrt' || num === 'sin' || num === 'cos' || num === 'tan' || num === "PI" || num ==="E" ){
        temp = array.shift();
        num = specialSwitchCase(num, temp)
        return num;
    }
    else{
        return num;
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
    console.log(num)
    num = parseInt(num)
    switch (oper){
        case 'sqrt':
            return Math.sqrt(num).toFixed(4)

        case 'sin':
            return Math.sin(num).toFixed(4)
        
        case 'cos':
            return Math.cos(num).toFixed(4)

        case 'tan':
            return Math.tan(num).toFixed(4)

        case 'PI':
            return (PI*num).toFixed(4)

        case 'E':
            return (e*num).toFixed(4)

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

// function values(el) {
//     var val = parseInt(el.value)
//     temp = (temp * 10) + val
//     document.getElementById("answer").innerHTML = temp
// }

// function settingValue(){
//     num.push(temp)
//     temp = 0
//     console.log(num)
// }

// function sign(el) {
//     settingValue()
//     if (num.length - 2 === oper.length){
//         oper.push(el.value)
//     }
// }

// function calculate(){
//     console.log(num)
//     console.log(oper)
//     calculatedAnswer = calculatedAnswer + num.shift()
//     while(num.length != 0){
//         calculatedAnswer = switchCases(calculatedAnswer, num.shift(), oper.shift())
//     }
//     console.log(calculatedAnswer)
// }

// function trigno(el){
//     settingValue()
//     if (el.value === "sin")
//         document.getElementById("answer").innerHTML = Math.sin(num.shift())
//     else if (el.value === "cos")
//         document.getElementById("answer").innerHTML = Math.cos(num.shift())
//     else if (el.value === "tan")
//         document.getElementById("answer").innerHTML = Math.tan(num.shift())
// }