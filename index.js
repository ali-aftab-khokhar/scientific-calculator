const PI = 3.1415
const e = 2.7182

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
    temp = isNull(temp, array)
    temp = isSpecialCase(temp, array)
    console.log(array)
    var calculation = switchCases(0, "+", parseInt(temp))
    while (array.length != 0){
        var sign = array.shift();
        var num = array.shift();
        num = isNull(num, array)
        num = isSpecialCase(num, array)
        calculation = switchCases(calculation, sign, parseInt(num))
    }
    var old = x.value;
    description = old + " = " + calculation;
    x.value = description
    displayHistory(description)
}

function isSpecialCase(num, array){
    if (num === 'sqrt' || num === 'sin' || num === 'cos' || num === 'tan'){
        temp = array.shift();
        num = specialSwitchCase(num, parseInt(temp))
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
    switch (oper){
        case 'sqrt':
            console.log(Math.sqrt(num))
            return Math.sqrt(num).toFixed(4)

        case 'sin':
            return parseFloat(Math.sin(num).toFixed(4))
        
        case 'cos':
            return Math.cos(num)

        case 'tan':
            console.log(Math.tan(num))
            return Math.tan(num)

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