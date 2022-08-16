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
    mOperator = operators.splice(opening, closing - 1)
    if (mOperator[0] === '('){
        mOperator.shift()
    }
    if (mOperator[mOperator.length - 1] === ')' || mOperator[mOperator.length - 1] === ''){
        mOperator.pop()
    }
    mElments = elements.splice(elemOpenCount, closing - opening)

    //Solving Single Valued Operator
    solvingSingleValuedOperator(mOperator, mElments)

    //By DMAS Law
    calculateByDMAS("^", mOperator, mElments)
    calculateByDMAS("/", mOperator, mElments)
    calculateByDMAS("*", mOperator, mElments)
    calculateByDMAS("+", mOperator, mElments)
    calculateByDMAS("-", mOperator, mElments)

    elements.splice(opening - 1, 0, mElments.shift())
}
