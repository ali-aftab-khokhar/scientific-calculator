function solvingParanthesis(operators, elements){
    let opening = 0
    let elemOpenCount = 0
    let closing = 0
    let i
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
    miniOperatorList = operators.splice(opening, closing - 1)
    if (miniOperatorList[0] === '('){
        miniOperatorList.shift()
    }
    if (miniOperatorList[miniOperatorList.length - 1] === ')' || miniOperatorList[miniOperatorList.length - 1] === ''){
        miniOperatorList.pop()
    }
    miniElementList = elements.splice(elemOpenCount, closing - opening)

    //Solving Single Valued Operator
    solvingSingleValuedOperator(miniOperatorList, miniElementList)

    //By DMAS Law
    calculateByDMAS("^", miniOperatorList, miniElementList)
    calculateByDMAS("/", miniOperatorList, miniElementList)
    calculateByDMAS("*", miniOperatorList, miniElementList)
    calculateByDMAS("+", miniOperatorList, miniElementList)
    calculateByDMAS("-", miniOperatorList, miniElementList)

    elements.splice(opening - 1, 0, miniElementList.shift())
}
