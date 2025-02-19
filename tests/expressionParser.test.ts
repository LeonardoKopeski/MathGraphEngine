import { describe, it, expect } from 'bun:test'
import { Expression } from '../core/expression'

describe('Expression parser', () => {
  it('should parse 1 + 2 correctly and convert back to string', () => {
    const expression = Expression.fromString('1 + 2')
    expect(expression.toString()).toBe('1 + 2')
  })
  it('should parse 2 + 4 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 + 4')
    expect(expression.toString()).toBe('2 + 4')
  })

  it('should parse 2 * 3 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 * 3')
    expect(expression.toString()).toBe('2 * 3')
  })

  it('should parse 2 / 3 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 / 3')
    expect(expression.toString()).toBe('2 / 3')
  })

  it('should parse 0.5 correctly and convert back to string as 1 / 2', () => {
    const expression = Expression.fromString('0.5')
    expect(expression.toString()).toBe('1 / 2')
  })

  it('should parse 3^2 correctly and convert back to string', () => {
    const expression = Expression.fromString('3^2')
    expect(expression.toString()).toBe('3 ^ 2')
  })

  it('should parse 2^3 correctly and convert back to string', () => {
    const expression = Expression.fromString('2^3')
    expect(expression.toString()).toBe('2 ^ 3')
  })

  it('should parse 3√8 correctly and convert back to string', () => {
    const expression = Expression.fromString('3√8')
    expect(expression.toString()).toBe('3 √ 8')
  })

  it('should parse 2√9 correctly and convert back to string', () => {
    const expression = Expression.fromString('2√9')
    expect(expression.toString()).toBe('2 √ 9')
  })

  it('should parse √9 correctly and convert back to string', () => {
    const expression = Expression.fromString('√9')
    expect(expression.toString()).toBe('2 √ 9')
  })
})