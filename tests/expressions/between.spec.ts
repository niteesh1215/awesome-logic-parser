import { RelationalOperator } from '../../src'
import { BetweenExpression } from '../../src/expressions/between'

describe('BetweenExpression', () => {
  // Should return true if left value is between start and end values
  it('should return true if left value is between start and end values', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('5', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(true)
  })

  // Should return false if left value is less than start value
  it('should return false if left value is less than start value', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('0', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })

  // Should return false if left value is greater than end value
  it('should return false if left value is greater than end value', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('15', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })

  // Should throw an error if left side of expression is not a string
  it('should throw an error if left side of expression is not a string', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression(5 as any, RelationalOperator.BETWEEN, data as any)
    expect(() => {
      expression.parse(data)
    }).toThrowError('Left side of expression must be a string')
  })

  // Should throw an error if right side of expression is not an IBetween object
  it('should throw an error if right side of expression is not an IBetween object', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('5', RelationalOperator.BETWEEN, 'invalid' as any)
    expect(() => {
      expression.parse(data)
    }).toThrowError('Right side of expression must be an IBetween object')
  })

  // Should return false if start value is not a number
  it('should return false if start value is not a number', () => {
    const data = { start: 'one', end: 10 }
    const expression = new BetweenExpression('5', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })

  // Should return false if left value is not a number
  it('should return false if left value is not a number', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('abc', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })

  // Should return false if end value is not a number
  it('should return false if end value is not a number', () => {
    const data = { start: 1, end: 'ten' }
    const expression = new BetweenExpression('5', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })

  // Should return false if start value is greater than end value
  it('should return false if start value is greater than end value', () => {
    const data = { start: 10, end: 5 }
    const expression = new BetweenExpression('7', RelationalOperator.BETWEEN, data as any)
    const result = expression.parse(data)
    expect(result).toBe(false)
  })
})
