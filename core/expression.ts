import { RationalNumber } from './number'

const operators = {
  '+': {
    precedence: 1
  },
  '-': {
    precedence: 1
  },
  '*': {
    precedence: 2
  },
  '/': {
    precedence: 2
  },
  '^': {
    precedence: 3
  },
  '√': {
    precedence: 3
  }
} as const satisfies {
  [key: string]: {
    precedence: number
  }
}

type Term = RationalNumber | keyof typeof operators | Expression

function isOperator(input: unknown): input is keyof typeof operators {
  return typeof input === 'string' && input in operators
}

function isOperand(input: unknown): input is RationalNumber {
  return input instanceof RationalNumber
}

function isOperation(input: unknown): input is Expression {
  return input instanceof Expression
}

export class Expression {
  constructor(public terms: Term[]) {

  }

  static fromString(str: string) {
    const terms: Term[] = []

    let remaining = str
    while (remaining.length !== 0) {
      if (remaining[0] === ' ') {
        remaining = remaining.slice(1)
        continue
      }

      const operandMatch = remaining.match(/^\d+(\.\d+)?/)
      if (operandMatch) {
        terms.push(RationalNumber.fromFloatString(operandMatch[0]))
        remaining = remaining.slice(operandMatch[0].length)
        continue
      }

      if (remaining[0] === '√' && !isOperand(terms.at(-1))) {
        terms.push(RationalNumber.fromInteger(2))
        terms.push('√')
        remaining = remaining.slice(1)
        continue
      }

      if (isOperator(remaining[0])) {
        terms.push(remaining[0])
        remaining = remaining.slice(1)
        continue
      }

      const parentesisMatch = remaining.match(/^\((.*)\)/)
      if (parentesisMatch) {
        terms.push(Expression.fromString(parentesisMatch[1]))
        remaining = remaining.slice(parentesisMatch[0].length)
        continue
      }
      
      throw new Error(`Unexpected character: "${remaining[0]}"`)
    }

    return new Expression(terms)
  }

  toString(): string {
    return this.terms.map(term => {
      if (isOperator(term)){
        return term
      } else {
        return term.toString() 
      }
    }).join(' ')
  }

  private determineHighestPrecedence() {
    const precedences = this.terms.map((term, index) => {
      if (isOperator(term)) {
        return [index, operators[term].precedence]
      } else if (isOperation(term)) {
        return [index, Infinity]
      } else {
        return [index, 0]
      }
    })
    const highestPrecedence = Math.max(...precedences.map(([, precedence]) => precedence))
    return {
      highestPrecedence,
      highestPrecedenceIndex: precedences.find(([, precedence]) => precedence === highestPrecedence)![0]
    }
  }

  solve() {
    while (true){
      const {highestPrecedence, highestPrecedenceIndex} = this.determineHighestPrecedence()

      if (highestPrecedence === 0) break
        
      const highestPrecedenceElement = this.terms[highestPrecedenceIndex]

      let result: RationalNumber
      if (isOperation(highestPrecedenceElement)) {
        result = highestPrecedenceElement.solve()
        this.terms.splice(highestPrecedenceIndex, 1, result)
      } else {
        const leftOperand = this.terms[highestPrecedenceIndex - 1]
        const rightOperand = this.terms[highestPrecedenceIndex + 1]

        if (
          !isOperand(leftOperand) ||
          !isOperator(highestPrecedenceElement) || 
          !isOperand(rightOperand)
        ) throw new Error('Invalid Expression')

        switch (highestPrecedenceElement) {
          case '+':
            result = leftOperand.add(rightOperand)
            break
          case '-':
            result = leftOperand.subtract(rightOperand)
            break
          case '*':
            result = leftOperand.multiply(rightOperand)
            break
          case '/':
            result = leftOperand.divide(rightOperand)
            break
          case '^':
            result = leftOperand.pow(rightOperand)
            break
          case '√':
            result = rightOperand.root(leftOperand)
            break      
        }
        this.terms.splice(highestPrecedenceIndex - 1, 3, result)
      }

    }

    const remainingTerm = this.terms[0]
    if (!isOperand(remainingTerm)) throw new Error('Invalid Expression')
    return remainingTerm
  }
}