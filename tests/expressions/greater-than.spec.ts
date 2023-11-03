/* eslint-disable no-template-curly-in-string */

import { GreaterThanExpression } from '../../src/expressions/greater-than'

describe('GreaterThanExpression', () => {
  // Should return true when left and right are equal
  it('should return true when left and right are equal', () => {
    const expression = new GreaterThanExpression('${value}', 5)
    const result = expression.parse({ value: 10 })
    expect(result).toBe(true)
  })

  it('should return true for array of objects', () => {
    const expression = new GreaterThanExpression('${arr.$.value}', 5)
    const result = expression.parse({ arr: [{ value: 5 }, { value: 15 }] })
    expect(result).toBe(true)
  })

  it('should return false for array of objects', () => {
    const expression = new GreaterThanExpression('${arr.$.value}', 15)
    const result = expression.parse({ arr: [{ value: 10 }, { value: 1 }] })
    expect(result).toBe(false)
  })
})
