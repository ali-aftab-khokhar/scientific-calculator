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