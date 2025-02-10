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

type Term = RationalNumber | keyof typeof operators 

function isOperator(input: unknown): input is keyof typeof operators {
  return typeof input === 'string' && input in operators
}

function isOperand(input: unknown): input is RationalNumber {
  return input instanceof RationalNumber
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
      
      throw new Error(`Unexpected character: "${remaining[0]}"`)
    }

    return new Expression(terms)
  }

  toString() {
    return this.terms.map(term => {
      if (isOperator(term)){
        return term
      } else {
        return term.toString() 
      }
    }).join(' ')
  }

  private determineHighestPrecedence() {
    const precedences = this.terms.map(term => {
      if (isOperator(term)) {
        return operators[term].precedence
      } else {
        return 0
      }
    })
    const highestPrecedence = Math.max(...precedences)
    return highestPrecedence
  }

  solve() {
    while (true){
      const highestPrecedence = this.determineHighestPrecedence()

      if (highestPrecedence === 0) break

      const operatorIndex = this.terms.findIndex(term => {
        if (isOperator(term)) {
          return operators[term].precedence === highestPrecedence
        } else {
          return false
        }
      })
      if (operatorIndex === -1) throw new Error('Expected operator')
        
      const leftOperand = this.terms[operatorIndex - 1]
      const operator = this.terms[operatorIndex]
      const rightOperand = this.terms[operatorIndex + 1]

      if (
        !isOperand(leftOperand) ||
        !isOperator(operator) || 
        !isOperand(rightOperand)
      ) throw new Error('Invalid Expression')

      let result: RationalNumber
      switch (operator) {
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

      this.terms.splice(operatorIndex - 1, 3, result)
    }

    const remainingTerm = this.terms[0]
    if (!isOperand(remainingTerm)) throw new Error('Invalid Expression')
    return remainingTerm
  }
}