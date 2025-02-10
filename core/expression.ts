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
  }
} as const satisfies {
  [key: string]: {
    precedence: number
  }
}

type OperandTerm = {
  type: 'operand'
  value: RationalNumber
}

type OperatorTerm = {
  type: 'operator'
  subtype: keyof typeof operators  
}

type Term = OperandTerm | OperatorTerm

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
        terms.push({
          type: 'operand',
          value: RationalNumber.fromFloatString(operandMatch[0])
        })
        remaining = remaining.slice(operandMatch[0].length)
        continue
      }

      if (remaining[0] in operators) {
        terms.push({ type: 'operator', subtype: remaining[0] as keyof typeof operators })
        remaining = remaining.slice(1)
        continue
      }
      
      throw new Error(`Unexpected character: "${remaining[0]}"`)
    }

    return new Expression(terms)
  }

  toString() {
    return this.terms.map(term => {
      if (term.type === 'operand') {
        return term.value.toString()
      } else {
        return term.subtype
      }
    }).join(' ')
  }

  private determineHighestPrecedence() {
    const precedences = this.terms.map(term => {
      if (term.type === 'operator') {
        return operators[term.subtype].precedence
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
        if (term.type === 'operator') {
          return operators[term.subtype].precedence === highestPrecedence
        } else {
          return false
        }
      })
      if (operatorIndex === -1) throw new Error('Expected operator')
        
      const leftOperand = this.terms[operatorIndex - 1]
      const operator = this.terms[operatorIndex]
      const rightOperand = this.terms[operatorIndex + 1]

      if (
        leftOperand.type !== 'operand' ||
        operator.type !== 'operator' || 
        rightOperand.type !== 'operand'
      ) throw new Error('Invalid Expression')

      let result: RationalNumber
      if (operator.subtype === '+') {
        result = leftOperand.value.add(rightOperand.value)
      } else if (operator.subtype === '-') {
        result = leftOperand.value.subtract(rightOperand.value)
      } else if (operator.subtype === '*') {
        result = leftOperand.value.multiply(rightOperand.value)
      } else if (operator.subtype === '/') {
        result = leftOperand.value.divide(rightOperand.value)
      } else {
        throw new Error('Unexpected operator')
      }

      this.terms.splice(operatorIndex - 1, 3, { type: 'operand', value: result })
    }
    const remainingTerm = this.terms[0]
    if (remainingTerm.type !== 'operand') throw new Error('Invalid Expression')
    return remainingTerm.value
  }
}