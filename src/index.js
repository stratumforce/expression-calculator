function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const operators = {
    "*": 2,
    "/": 2,
    "+": 1,
    "-": 1
  };

  // Operators stack and output
  let opStack = [];
  let output = [];

  // Since we reading string we gonna compose each operand in
  // a single variable and when it's ready push to the output
  let operand = "";
  for (let token of expr) {
    // Skip spaces
    if (token === " ") continue;

    // If token is num add it to operand variable
    if (/\d/.test(token)) {
      operand += token;
      continue;
    }

    // If current token is not num - push operand to the stack and clear it
    if (operand) {
      output.push(+operand);
      operand = "";
    }

    // If token is an operator
    if (token in operators) {
      // While there's an operator on top of opStack and it's precedence is greater
      // than token's operator or it is left associative - push it to the stack
      // (for this exercise we only have left associative operators)
      while (
        opStack.length &&
        operators[opStack[opStack.length - 1]] >= operators[token]
      ) {
        output.push(opStack.pop());
      }

      // Push new operator to the stack
      opStack.push(token);
      continue;
    }

    // If token is "(" push it to the stack
    if (token === "(") {
      opStack.push(token);
      continue;
    }

    // If token is ")" - move operators from stack to output
    // If no ")" in stack - throw an error
    if (token === ")") {
      while (opStack.length && opStack[opStack.length - 1] !== "(") {
        output.push(opStack.pop());
      }

      if (!opStack.length)
        throw new Error("ExpressionError: Brackets must be paired");

      // Remove "(" from stack
      opStack.pop();
      continue;
    }
  }

  // If operand still not empty - push it to the output
  if (operand) output.push(+operand);

  // While opStack is not empty - push everything from it to the output
  // If there's still an opening bracket in the stack - throw an error
  while (opStack.length) {
    if (opStack[opStack.length - 1] === "(")
      throw new Error("ExpressionError: Brackets must be paired");

    output.push(opStack.pop());
  }

  // Loop the output, push numbers to the result stack
  // If item is an operator - pop 2 numbers from result, calculate the product
  // and push the product to the result stack
  let result = [];
  output.forEach(val => {
    if (!operators[val]) {
      result.push(val);
      return;
    }

    let operand2 = result.pop();
    let operand1 = result.pop();
    let res;

    if (val === "+") res = operand1 + operand2;
    if (val === "-") res = operand1 - operand2;
    if (val === "*") res = operand1 * operand2;
    if (val === "/") {
      if (!operand1 || !operand2)
        throw new Error("TypeError: Division by zero.");
      res = operand1 / operand2;
    }
    result.push(res);
  });

  return result[0];
}

module.exports = {
  expressionCalculator
};
