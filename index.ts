import { Expression } from './core/expression'

const expression = Expression.fromString('1 + 2 * 3')
console.log(`${expression.toString()} = ${expression.solve()}`)