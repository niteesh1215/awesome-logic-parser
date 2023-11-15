/* eslint-disable no-template-curly-in-string */
import { EqualExpression } from '../../src/expressions/equal'

describe('EqualExpression', () => {
  // Should return true when left and right are equal
  it('should return true when left and right are equal', () => {
    const expression = new EqualExpression('{value}', 'hello')
    const result = expression.parse({ value: 'hello' })
    expect(result).toBe(true)
  })

  it('should return true for array of objects', () => {
    const expression = new EqualExpression('{arr.$.value}', String(5))
    const result = expression.parse({ arr: [{ value: 5 }, { value: 15 }] })
    expect(result).toBe(true)
  })

  it('should return false for array of objects', () => {
    const expression = new EqualExpression('{arr.$.value}', String(15))
    const result = expression.parse({ arr: [{ value: 10 }, { value: 1 }] })
    expect(result).toBe(false)
  })
})
