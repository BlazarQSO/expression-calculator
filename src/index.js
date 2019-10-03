function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const oper = [")", "(", "+", "-", "*", "/"];
    let reversExpr = [];

    expr = expr.trim();

    let arrExpr = expr.split(" ");
    while (arrExpr.includes("")) {
        let index = arrExpr.indexOf("");
        arrExpr.splice(index, 1);
    }


    let stack = [];
    for (let i = 0; i < arrExpr.length; i++) {
        if (!oper.includes(arrExpr[i])) {
            reversExpr.push(arrExpr[i]);

        } else if (arrExpr[i] == "(") {
            stack.push(arrExpr[i]);

        } else if (arrExpr[i] == ")") {
            while (true) {
                let pop = "";

                if (stack.length > 0) {
                    pop = stack.pop();
                } else {
                    throw new Error("ExpressionError: Brackets must be paired");
                }

                if (pop != "(") {
                    reversExpr.push(pop);
                } else {
                    break;
                }
            }

        } else if (oper.includes(arrExpr[i])) {
            while (true) {
                if (oper.indexOf(stack[stack.length - 1]) > 1
                    && oper.indexOf(arrExpr[i]) > 1
                    && oper.indexOf(arrExpr[i]) < 4
                    || (oper.indexOf(stack[stack.length - 1]) > 3
                    && oper.indexOf(arrExpr[i]) > 3)) {
                    reversExpr.push(stack.pop());
                } else {
                    stack.push(arrExpr[i]);
                    break;
                }
            }
        }
    }

    while (stack.length > 0) {
        reversExpr.push(stack.pop());
    }

    let stackCount = [];
    for (let i = 0; i < reversExpr.length; i++) {
        if (!oper.includes(reversExpr[i])) {
            stackCount.push(reversExpr[i]);
        } else if (oper.includes(reversExpr[i])) {
            let b = stackCount.pop();
            let a = stackCount.pop();
            switch (reversExpr[i]) {
                case "+": {
                    stackCount.push(Number(a) + Number(b));
                    break;
                }
                case "-": {
                    stackCount.push(Number(a) - Number(b));
                    break;
                }
                case "*": {
                    stackCount.push(Number(a) * Number(b));
                    break;
                }
                case "/": {
                    if (Number(b) != 0) {
                        stackCount.push(Number(a) / Number(b));
                    } else {
                        throw new Error("TypeError: Division by zero.");
                    }
                    break;
                }
            }
        }
    }

    return stackCount.pop();
}

module.exports = {
    expressionCalculator
}