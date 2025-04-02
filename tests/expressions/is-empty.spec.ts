import { IsEmptyExpression } from '../../src/expressions/is-empty'

describe('IsEmptyExpression', () => {
  const testCases = [
    {
      description: 'should validate an empty array',
      value: [],
      right: 'true',
      result: true
    },
    {
      description: 'should validate an empty string',
      value: '',
      right: 'true',
      result: false
    },
    {
      description: 'should validate a non-empty array',
      value: [1],
      right: 'true',
      result: false
    },
    {
      description: 'should validate a non-empty string',
      value: 'hello',
      right: 'true',
      result: false
    },
    {
      description: 'should validate a null value',
      value: null,
      right: 'true',
      result: false
    },
    {
      description: 'should validate an undefined value',
      value: undefined,
      right: 'true',
      result: false
    }
  ]

  testCases.forEach(({ description, value, result, right }) => {
    it(description, () => {
      const expression = new IsEmptyExpression('{value}', right)
      const parsedResult = expression.parse({ value })
      expect(parsedResult).toEqual(result)
    })
  })
})
