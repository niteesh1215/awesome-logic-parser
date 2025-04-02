import { IsEmptyExpression } from '../../src/expressions/is-empty'

describe('IsEmptyExpression', () => {
  const testCases = [
    {
      description: 'should validate an empty array',
      value: [],
      result: true
    },
    {
      description: 'should validate an empty string',
      value: '',
      result: false
    },
    {
      description: 'should validate a non-empty array',
      value: [1],
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
      const expression = new IsEmptyExpression('{value}', '0')
      const parsedResult = expression.parse({ value })
      expect(parsedResult).toEqual(result)
    })
  })
})
