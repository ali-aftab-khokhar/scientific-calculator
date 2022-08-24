function solvingParanthesis(operators, elements){
    let opening = 0
    let elemOpenCount = 0
    let closing = 0
    let i
    let elementOpening = 0
    for (i = 0; i < operators.length; i += 1){
        if (operators[i] === '('){
            opening = i
        }
    }
    for (i = 0; i < opening; i++){
        if (operators[i] != '(' && operators[i] != ')'){
            elementOpening += 1
        }
    }
    for (i = opening; i < operators.length; i++){
        if (operators[i] !== '(' && operators[i] !== ')'){
            elemOpenCount += 1
        }
        if (operators[i] === ')'){
            break
        }
    }
    for (i = opening; i < operators.length; i += 1){
        if (operators[i] == ')'){
            closing = i
            miniArray(opening, elementOpening, closing - opening)
        }
    }
}

function miniArray(opening, elementOpening, elemOpenCount){
    miniOperatorList = operators.splice(opening, elemOpenCount + 1)
    if (miniOperatorList[0] === '('){
        miniOperatorList.shift()
    }
    if (miniOperatorList[miniOperatorList.length - 1] === ')' || miniOperatorList[miniOperatorList.length - 1] === ''){
        miniOperatorList.pop()
    }
    miniElementList = elements.splice(elementOpening, elemOpenCount)

    //Solving Single Valued Operator
    solvingSingleValuedOperator(miniOperatorList, miniElementList)

    //By DMAS Law
    calculateByDMAS("^", miniOperatorList, miniElementList)
    calculateByDMAS("/", miniOperatorList, miniElementList)
    calculateByDMAS("*", miniOperatorList, miniElementList)
    calcAddAndSub(miniOperatorList, miniElementList)
    calcAddAndSub(miniOperatorList, miniElementList)

    elements.splice(elementOpening, 0, miniElementList.shift())
}
