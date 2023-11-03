import { RelationalOperator } from '../../src'
import { EqualExpression } from '../../src/expressions/equal'

describe('EqualExpression', () => {
  // Should return true when left and right are equal
  it('should return true when left and right are equal', () => {
    const expression = new EqualExpression('hello', RelationalOperator.EQ, 'hello')
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should return true when left and right are both empty strings
  it('should return true when left and right are both empty strings', () => {
    const expression = new EqualExpression('', RelationalOperator.EQ, '')
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should return true when left and right are both null
  it('should return true when left and right are both null', () => {
    const expression = new EqualExpression(null as any, RelationalOperator.EQ, null)
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should throw an error when left is not a string
  it('should throw an error when left is not a string', () => {
    const expression = new EqualExpression(123 as any, RelationalOperator.EQ, 'hello')
    expect(() => {
      expression.parse({})
    }).toThrow('Left side of expression must be a string')
  })

  // Should throw an error when right is not a string
  it('should throw an error when right is not a string', () => {
    const expression = new EqualExpression('hello', RelationalOperator.EQ, 123)
    expect(() => {
      expression.parse({})
    }).toThrow('Right side of expression must be a string')
  })

  // Should return true when left and right are both undefined
  it('should return true when left and right are both undefined', () => {
    const expression = new EqualExpression(undefined as any, RelationalOperator.EQ, undefined)
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should return true when left and right are both NaN
  it('should return true when left and right are both NaN', () => {
    const expression = new EqualExpression(NaN as any, RelationalOperator.EQ, NaN)
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should return true when left and right are both 0
  it('should return true when left and right are both 0', () => {
    const expression = new EqualExpression(0 as any, RelationalOperator.EQ, 0)
    const result = expression.parse({})
    expect(result).toBe(true)
  })

  // Should return true when left and right are both false
  it('should return true when left and right are both false', () => {
    const expression = new EqualExpression(false as any, RelationalOperator.EQ, false)
    const result = expression.parse({})
    expect(result).toBe(true)
  })
})
