/* eslint-disable no-template-curly-in-string */
import { BetweenExpression } from '../../src/expressions/between'

describe('BetweenExpression', () => {
  // Should return true if left value is between start and end values
  it('should return true if left value is between start and end values', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('${value}', data as any)
    const result = expression.parse({ value: 5 })
    expect(result).toBe(true)
  })

  it('should return true for array of objects', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('${arr.$.value}', data as any)
    const result = expression.parse({ arr: [{ value: 5 }, { value: 15 }] })
    expect(result).toBe(true)
  })

  it('should return false for array of objects', () => {
    const data = { start: 1, end: 10 }
    const expression = new BetweenExpression('${arr.$.value}', data as any)
    const result = expression.parse({ arr: [{ value: 15 }, { value: 15 }] })
    expect(result).toBe(false)
  })
})
