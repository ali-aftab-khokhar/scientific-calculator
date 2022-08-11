function values(el){
    let x = document.getElementById("answer");
    var old = x.value;
    if (!parseInt(el.value)){
        x.value = old + " " + el.value + " ";
    }
    else{
        x.value = old + el.value
    }
}

function calculate(){
    var x = document.getElementById("answer").value;
    var array = x.split(" ")
    var temp = array.shift()
    var temp2 = null
    if (!temp){
        temp = array.shift();
    }
    if (temp === 'sqrt' || temp === 'sin' || temp === 'cos' || temp === 'tan'){
        temp2 = array.shift();
        temp = specialSwitchCase(temp, parseInt(temp2))
    }
    console.log(array)
    var calculation = switchCases(0, "+", parseInt(temp))
    while (array.length != 0){
        var sign = array.shift();
        var num = array.shift();
        if (!num){
            num = array.shift();
        }
        if (num === 'sqrt' || num === 'sin' || num === 'cos' || num === 'tan'){
            temp = array.shift();
            num = specialSwitchCase(num, parseInt(temp))
        }
        calculation = switchCases(calculation, sign, parseInt(num))
    }
    var y = document.getElementById("answer");
    var old = y.value;
    description = old + " = " + calculation;
    y.value = description

    // var historyHandler = document.getElementById("hist")
}

function specialSwitchCase(oper, num){
    console.log(num)
    switch (oper){
        case 'sqrt':
            console.log(Math.sqrt(num))
            return Math.sqrt(num)

        case 'sin':
            return Math.sin(num)
        
        case 'cos':
            return Math.cos(num)

        case 'tan':
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
            return calculatedAnswer * num

        case '/':
            return calculatedAnswer / num

        case '^':
            return calculatedAnswer ** num

        default:
            return calculatedAnswer
    }
}

function clear(){
    
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