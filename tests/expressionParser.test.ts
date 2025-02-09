import { describe, it, expect } from 'bun:test'
import { Expression } from '../core/expression'

describe('Expression parser', () => {
  it('should parse 1 + 2 correctly and convert back to string', () => {
    const expression = Expression.fromString('1 + 2')
    expect(expression.terms).toEqual([{
      type: 'operand',
      value: 1
    }, {
      type: 'operator',
      subtype: '+'
    }, {
      type: 'operand',
      value: 2
    }])

    expect(expression.toString()).toBe('1 + 2')
  })
  it('should parse 2 + 4 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 + 4')
    expect(expression.terms).toEqual([{
      type: 'operand',
      value: 2
    }, {
      type: 'operator',
      subtype: '+'
    }, {
      type: 'operand',
      value: 4
    }])
    
    expect(expression.toString()).toBe('2 + 4')
  })

  it('should parse 2 * 3 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 * 3')
    expect(expression.terms).toEqual([{
      type: 'operand',
      value: 2
    }, {
      type: 'operator',
      subtype: '*'
    }, {
      type: 'operand',
      value: 3
    }])
    
    expect(expression.toString()).toBe('2 * 3')
  })

  it('should parse 2 / 3 correctly and convert back to string', () => {
    const expression = Expression.fromString('2 / 3')
    expect(expression.terms).toEqual([{
      type: 'operand',
      value: 2
    }, {
      type: 'operator',
      subtype: '/'
    }, {
      type: 'operand',
      value: 3
    }])
    
    expect(expression.toString()).toBe('2 / 3')
  })
})