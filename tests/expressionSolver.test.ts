import { describe, it, expect } from 'bun:test'
import { Expression } from '../core/expression'

describe('Expression solver', () => {
  it('should solve 1 + 2 correctly', () => {
    const expression = Expression.fromString('1 + 2')
    expect(expression.solve().toNumber()).toBe(3)
  })

  it('should solve 2 + 4 correctly', () => {
    const expression = Expression.fromString('2 + 4')
    expect(expression.solve().toNumber()).toBe(6)
  })

  it('should solve 2 * 3 correctly', () => {
    const expression = Expression.fromString('2 * 3')
    expect(expression.solve().toNumber()).toBe(6)
  })

  it('should solve 6 / 3 correctly', () => {
    const expression = Expression.fromString('6 / 3')
    expect(expression.solve().toNumber()).toBe(2)
  })

  it('should solve 5 - 3 correctly', () => {
    const expression = Expression.fromString('5 - 3')
    expect(expression.solve().toNumber()).toBe(2)
  })

  it('should solve 1 + 2 * 3 correctly', () => {
    const expression = Expression.fromString('1 + 2 * 3')
    expect(expression.solve().toNumber()).toBe(7)
  })

  it('should solve (1 + 2) * 3 correctly', () => {
    const expression = Expression.fromString('(1 + 2) * 3')
    expect(expression.solve().toNumber()).toBe(9)
  })

  it('should solve ((1 + 2) * 3) - 4 correctly', () => {
    const expression = Expression.fromString('((1 + 2) * 3) - 4')
    expect(expression.solve().toNumber()).toBe(5)
  })

  it('should solve 10 / 2 - 3 correctly', () => {
    const expression = Expression.fromString('10 / 2 - 3')
    expect(expression.solve().toNumber()).toBe(2)
  })

  it('should solve 28.62 / 3 correctly', () => {
    const expression = Expression.fromString('28.62 / 3')
    
    expect(expression.solve().toNumber()).toBe(9.54)
  })

  it('should solve 3^2 correctly', () => {
    const expression = Expression.fromString('3^2')
    expect(expression.solve().toNumber()).toBe(9)
  })

  it('should solve 2^3 correctly', () => {
    const expression = Expression.fromString('2^3')
    expect(expression.solve().toNumber()).toBe(8)
  })

  it('should solve 3√8 correctly ', () => {
    const expression = Expression.fromString('3√8')
    expect(expression.solve().toNumber()).toBe(2)
  })

  it('should solve 2√9 correctly ', () => {
    const expression = Expression.fromString('2√9')
    expect(expression.solve().toNumber()).toBe(3)
  })

  it('should solve √9 correctly ', () => {
    const expression = Expression.fromString('√9')
    expect(expression.solve().toNumber()).toBe(3)
  })
})