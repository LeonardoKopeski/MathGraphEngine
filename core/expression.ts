type Term = {
  type: 'operand'
  value: number
} | {
  type: 'operator'
  subtype: '+' | '-' | '*' | '/'
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

      const operandMatch = remaining.match(/^\d+/)
      if (operandMatch) {
        terms.push({ type: 'operand', value: parseInt(operandMatch[0]) })
        remaining = remaining.slice(operandMatch[0].length)
        continue
      }

      if (remaining[0] === '+' || remaining[0] === '-' || remaining[0] === '*' || remaining[0] === '/') {
        terms.push({ type: 'operator', subtype: remaining[0] })
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

  solve() {
    let result = 0
    let currentOperator = '+'
    for (const term of this.terms) {
      if (term.type === 'operand') {
        if (currentOperator === '+') {
          result += term.value
        } else if (currentOperator === '-') {
          result -= term.value
        } else if (currentOperator === '*') {
          result *= term.value
        } else if (currentOperator === '/') {
          result /= term.value
        }
      } else {
        currentOperator = term.subtype
      }
    }

    return result
  }
}