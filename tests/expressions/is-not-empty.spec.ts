import { IsNotEmptyExpression } from '../../src/expressions/is-not-empty'

describe('IsNotEmptyExpression', () => {
  const testCases = [
    {
      description: 'should validate a non-empty array',
      value: [1],
      result: true
    },
    {
      description: 'should validate a empty array',
      value: [],
      result: false
    },
    {
      description: 'should validate a non-empty string',
      value: 'hello',
      result: false
    },
    {
      description: 'should validate a null value',
      value: null,
      result: false
    },
    {
      description: 'should validate an undefined value',
      value: undefined,
      result: false
    }
  ]

  testCases.forEach(({ description, value, result }) => {
    it(description, () => {
      const expression = new IsNotEmptyExpression('{value}', '0')
      const parsedResult = expression.parse({ value })
      expect(parsedResult).toEqual(result)
    })
  })
})
