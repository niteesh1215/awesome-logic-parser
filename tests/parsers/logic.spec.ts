/* eslint-disable no-template-curly-in-string */
import { Element, type ILogicGroup, LogicParser, LogicalOperator, RelationalOperator } from '../../src'

describe('Logic Parser', () => {
  // Sample data
  const data = {
    age: 25,
    name: 'John',
    hobbies: ['reading', 'swimming'],
    city: 'New York',
    text: 'Hello, World'
  }

  it('it should return true', () => {
    // Define variables for testing
    const minAge = 18
    const maxAge = 30
    const targetCity = 'New York'
    const startsWith = 'Jo'
    const hobby = 'swimming'
    const endsWith = 'World'

    // Sample rules
    const logicGroup: ILogicGroup = {
      type: Element.GROUP,
      rules: [
        // Relational operators
        {
          type: Element.EXPRESSION,
          left: '${age}',
          operator: RelationalOperator.GTE,
          right: `${minAge}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '${city}',
          operator: RelationalOperator.EQ,
          right: `${targetCity}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '${name}',
          operator: RelationalOperator.STARTSWITH,
          right: `${startsWith}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '${hobbies}',
          operator: RelationalOperator.INCLUDES,
          right: `${hobby}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '${text}',
          operator: RelationalOperator.ENDSWITH,
          right: `${endsWith}`
        },
        {
          type: Element.LOGIC,
          operator: LogicalOperator.AND
        },
        {
          type: Element.EXPRESSION,
          left: '${age}',
          operator: RelationalOperator.BETWEEN,
          right: {
            start: `${minAge}`,
            end: `${maxAge}`
          } as any
        }
      ]
    }

    const logicParser = new LogicParser({
      resultWhenEmpty: false,
      returnFalseWhenError: true
    })

    const result = logicParser.parse(logicGroup, data)
    expect(result).toBe(true)
  })
})
